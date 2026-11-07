/* On homepages, derive consent spacing from the CURRENT natural layout.
   This replaces main.js's one-way compact fallback before DOMContentLoaded.
   Measure both modes synchronously: no intermediate class state is painted. */
initHeroCookiePlacement = function initRecoverableHeroCookiePlacement() {
  'use strict';
  const hero = document.querySelector('.hero');
  const content = hero?.querySelector('.hero__content');
  const primary = content?.querySelector('.hero__actions .btn--primary');
  const banner = document.querySelector('.cookie-banner');
  const header = document.querySelector('.header');
  if (!hero || !content || !primary || !banner) return;

  const root = document.documentElement;
  const mobile = window.matchMedia('(max-width: 768px)');
  const GAP = 12;
  const HEADER_GAP = 8;
  let frame = 0;
  let wasOverscrolling = false;

  function measure() {
    const offset = parseFloat(getComputedStyle(content).top) || 0;
    const scroll = window.scrollY;
    // Remove the CURRENT interpolated parent offset, not its future target.
    // Child copy offsets do not alter the parent or the CTA layout boxes.
    const naturalTop = content.getBoundingClientRect().top - offset + scroll;
    const primaryBottom = primary.getBoundingClientRect().bottom - offset + scroll;
    const bannerInset = parseFloat(getComputedStyle(banner).bottom) || 0;
    const bannerTop = window.innerHeight - bannerInset - banner.offsetHeight;
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    return {
      required: Math.max(0, Math.ceil(primaryBottom + GAP - bannerTop)),
      safe: Math.max(0, Math.floor(naturalTop - headerBottom - HEADER_GAP))
    };
  }

  function update() {
    frame = 0;
    // iOS rubber-band coordinates are transient. Preserve the last settled
    // layout during the pull, then measure again when the document returns.
    if (window.scrollY < -0.5) {
      wasOverscrolling = true;
      return;
    }
    const pending = root.classList.contains('privacy-banner-visible') &&
      banner.classList.contains('visible');
    const previouslyTight = hero.classList.contains('hero--cookie-tight');
    // Always test the normal typography first. Testing the compact layout
    // itself cannot tell us whether the full layout fits again.
    hero.classList.remove('hero--cookie-tight');
    let lift = 0;
    if (pending) {
      let fit = measure();
      if (mobile.matches && fit.required > fit.safe) {
        hero.classList.add('hero--cookie-tight');
        fit = measure();
      }
      lift = Math.min(fit.required, fit.safe);
    }
    const next = lift > 0 ? `${lift}px` : '';
    const changed = content.style.getPropertyValue('--hero-cookie-lift') !== next;
    if (changed) {
      if (next) content.style.setProperty('--hero-cookie-lift', next);
      else content.style.removeProperty('--hero-cookie-lift');
    }
    if (changed || previouslyTight !== hero.classList.contains('hero--cookie-tight')) {
      scheduleMobilePhoneCtaPlacement();
    }
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  scheduleHeroCookiePlacement = requestUpdate;
  content.addEventListener('transitionend', event => {
    if (event.target === content && event.propertyName === 'top') {
      scheduleMobilePhoneCtaPlacement();
    }
  });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('pageshow', requestUpdate);
  window.visualViewport?.addEventListener('resize', requestUpdate, { passive: true });
  // Normal scrolling must not re-center the copy. Only a bounce recovery
  // needs this extra measurement; real size changes have their own hooks.
  window.addEventListener('scroll', () => {
    if (window.scrollY < -0.5) wasOverscrolling = true;
    else if (wasOverscrolling) {
      wasOverscrolling = false;
      requestUpdate();
    }
  }, { passive: true });
  window.addEventListener('scrollend', requestUpdate, { passive: true });
  window.addEventListener('touchend', requestUpdate, { passive: true });
  window.addEventListener('touchcancel', requestUpdate, { passive: true });
  document.fonts?.ready?.then(requestUpdate);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(content);
    observer.observe(primary);
    observer.observe(banner);
    if (header) observer.observe(header);
  }
  requestUpdate();
};

/* Loaded after main.js, before DOMContentLoaded on the homepages only.
   Replace the legacy initializer rather than running a second phone solver.
   No cloned phone, additional CTA cell, or changes to button widths. */
initMobilePhoneCtaPlacement = function initGroupedPhonePlacement() {
  'use strict';
  const phone = document.querySelector('.mobile-cta');
  const actions = document.querySelector('.hero .hero__actions');
  if (!phone || !actions) return;

  const root = document.documentElement;
  const header = document.querySelector('.header');
  const mobile = window.matchMedia('(max-width: 768px)');
  const ENTER_CLEARANCE = 12;
  const EXIT_CLEARANCE = 32;
  const content = actions.closest('.hero__content');
  // Move only these three text elements. Relative offsets do not change
  // the hero's height, CTA positions, button widths or the consent layout.
  const copy = [...(content?.children || [])].filter(element =>
    element.matches('.hero__subtitle, .hero__title, .hero__description'));
  const textRanges = copy.map(element => {
    element.classList.add('hero__phone-copy');
    const range = document.createRange();
    range.selectNodeContents(element);
    return range;
  });
  let motionUntil = 0;
  let viewportKey = '';
  let returnedFromPull = false;
  let wasAtTop = window.scrollY <= 0.5;

  function watchMotion() {
    motionUntil = performance.now() + 500;
    requestUpdate();
  }

  function setCopyLift(lift) {
    if (!content) return;
    const value = lift > 0 ? `${lift}px` : '';
    if (content.style.getPropertyValue('--hero-phone-copy-lift') === value) return;
    if (value) content.style.setProperty('--hero-phone-copy-lift', value);
    else content.style.removeProperty('--hero-phone-copy-lift');
    watchMotion();
  }

  function clearCopyFromPhone(targetTop, phoneRect, height, headerBottom) {
    if (!copy.length) return;
    const currentOffset = parseFloat(getComputedStyle(copy[0]).top) || 0;
    // Recover the original, unshifted text even during its transition.
    // Measuring the shifted text would repeatedly lift/reset it on scroll.
    const naturalTop = Math.min(...copy.map(element =>
      element.getBoundingClientRect().top - currentOffset));
    const lines = textRanges.flatMap((range, index) => {
      const box = copy[index].getBoundingClientRect();
      // Ranges include text hidden by the existing short-screen line clamp.
      // Only painted lines may request extra space, not the clipped ones.
      return [...range.getClientRects()]
        .filter(rect => rect.top < box.bottom && rect.bottom > box.top)
        .map(rect => ({left: rect.left, right: rect.right,
          top: Math.max(rect.top, box.top) - currentOffset,
          bottom: Math.min(rect.bottom, box.bottom) - currentOffset}));
    });
    // Both the current animated phone and its destination matter. Keep
    // the copy clear until the returning phone actually passes below it.
    const phoneTop = Math.min(phoneRect.top, targetTop);
    const phoneBottom = Math.max(phoneRect.bottom, targetTop + height);
    const nearPhone = lines.filter(line =>
      line.left < phoneRect.right + ENTER_CLEARANCE &&
      line.right > phoneRect.left - ENTER_CLEARANCE);
    const obstructed = nearPhone.some(line =>
      line.bottom > phoneTop - ENTER_CLEARANCE &&
      line.top < phoneBottom + ENTER_CLEARANCE);
    const required = obstructed
      ? Math.ceil(Math.max(...nearPhone.map(line => line.bottom)) + ENTER_CLEARANCE - phoneTop)
      : 0;
    // Bound the lift in document coordinates, like the cookie adjustment.
    // This protects the heading at page top without pinning it to the menu
    // when the user deliberately scrolls the entire section out of view.
    // The parent may still be animating to a new cookie offset. Reserve
    // space for its final position too; otherwise the two lifts can add up
    // and temporarily put the subtitle behind the fixed header.
    const parentOffset = parseFloat(getComputedStyle(content).top) || 0;
    const parentTarget = root.classList.contains('privacy-banner-visible')
      ? -(parseFloat(content.style.getPropertyValue('--hero-cookie-lift')) || 0) : 0;
    const remainingParentLift = Math.min(0, parentTarget - parentOffset);
    const maxLift = Math.max(0, Math.floor(
      naturalTop + window.scrollY + remainingParentLift - headerBottom - 8));
    setCopyLift(Math.max(0, Math.min(required, maxLift)));
  }
  let raisedForCta = false;
  let frame = 0;

  function setLift(lift) {
    const value = lift > 0 ? `${Math.ceil(lift)}px` : '';
    if (phone.style.getPropertyValue('--mobile-cta-lift') === value) return;
    // Let CSS interpolate from the current position, including when a
    // gesture reverses direction. Never disable the bottom transition.
    if (value) phone.style.setProperty('--mobile-cta-lift', value);
    else phone.style.removeProperty('--mobile-cta-lift');
    watchMotion();
  }

  function update() {
    frame = 0;
    if (window.scrollY < -0.5) {
      returnedFromPull = true;
      return;
    }
    const key = [window.innerWidth, window.innerHeight,
      root.classList.contains('privacy-banner-visible')].join(':');
    const atTop = window.scrollY <= 0.5;
    const reachedTop = atTop && !wasAtTop;
    wasAtTop = atTop;
    // Hysteresis is for scrolling, not for retaining an old viewport state.
    if (key !== viewportKey || returnedFromPull || reachedTop) {
      viewportKey = key;
      returnedFromPull = false;
      raisedForCta = false;
    }
    const style = getComputedStyle(phone);
    if (!mobile.matches || style.position !== 'fixed' ||
        style.display === 'none' || style.visibility === 'hidden' ||
        phone.classList.contains('mobile-cta--footer-hidden') ||
        phone.classList.contains('mobile-cta--docked')) {
      raisedForCta = false;
      setLift(0);
      setCopyLift(0);
      return;
    }

    const rootStyle = getComputedStyle(root);
    const space = rootStyle.getPropertyValue('--space-md').trim();
    const inset = space.endsWith('rem')
      ? (parseFloat(space) || 1.5) * (parseFloat(rootStyle.fontSize) || 16)
      : (parseFloat(space) || 24);
    const bannerOffset = parseFloat(rootStyle.getPropertyValue('--privacy-banner-offset')) || 0;
    const baseBottom = bannerOffset + (root.classList.contains('privacy-banner-visible') ? 12 : inset);
    const phoneRect = phone.getBoundingClientRect();
    const height = phone.offsetHeight;
    const normalTop = window.innerHeight - baseBottom - height;
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    // One rectangle covers BOTH buttons AND every pixel of the gap. It is
    // geometry only, not an invisible DOM element that could intercept taps.
    const group = actions.getBoundingClientRect();
    const clearance = raisedForCta ? EXIT_CLEARANCE : ENTER_CLEARANCE;
    const horizontalOverlap = group.left < phoneRect.right + clearance &&
      group.right > phoneRect.left - clearance;
    const groupVisible = group.width > 0 && group.height > 0 &&
      group.bottom > headerBottom && group.top < window.innerHeight;
    const collision = groupVisible && horizontalOverlap &&
      group.top < normalTop + height + clearance &&
      group.bottom > normalTop - clearance;

    raisedForCta = collision;
    const desiredTop = group.top - height - ENTER_CLEARANCE;
    const minimumTop = Math.max(8, headerBottom + 8);
    const lift = collision
      ? Math.ceil(Math.min(Math.max(0, normalTop - desiredTop), Math.max(0, normalTop - minimumTop)))
      : 0;
    // The combined hitbox and hysteresis choose the destination, not the
    // animation path. Passing briefly over a button is intentional; the
    // gap between buttons is never selected as a resting position.
    setLift(lift);
    clearCopyFromPhone(normalTop - lift, phoneRect, height, headerBottom);
    if (performance.now() < motionUntil) requestUpdate();
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  scheduleMobilePhoneCtaPlacement = requestUpdate;
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('pageshow', requestUpdate);
  window.addEventListener('scrollend', requestUpdate, { passive: true });
  window.addEventListener('touchend', requestUpdate, { passive: true });
  window.addEventListener('touchcancel', requestUpdate, { passive: true });
  window.visualViewport?.addEventListener('resize', requestUpdate, { passive: true });
  window.visualViewport?.addEventListener('scroll', requestUpdate, { passive: true });
  if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', requestUpdate);
  else mobile.addListener(requestUpdate);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(actions);
    observer.observe(phone);
    copy.forEach(element => observer.observe(element));
    if (header) observer.observe(header);
  }
  if ('MutationObserver' in window) {
    new MutationObserver(requestUpdate).observe(phone, { attributes: true, attributeFilter: ['class'] });
  }
  // ResizeObserver does not report positional changes caused by 'top'.
  // Sample during consent/copy/phone motion as well as on user scroll.
  function trackTransition(event) {
    if (event.propertyName === 'top' || event.propertyName === 'bottom') watchMotion();
  }
  content?.addEventListener('transitionrun', trackTransition);
  phone.addEventListener('transitionrun', trackTransition);
  content?.addEventListener('transitionend', requestUpdate);
  phone.addEventListener('transitionend', requestUpdate);
  document.fonts?.ready?.then(requestUpdate);
  requestUpdate();
};
