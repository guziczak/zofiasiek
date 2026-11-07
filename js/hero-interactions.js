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
    observer.observe(hero);
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
  const actionGroups = [...document.querySelectorAll('.hero__actions, .portfolio-actions, .cta__actions')];
  const scrollTopButton = document.querySelector('.scroll-top');
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
  let verificationTimer = 0;
  let geometryKey = '';
  let suspended = false;
  let viewportKey = '';
  let returnedFromPull = false;
  let wasAtTop = window.scrollY <= 0.5;

  function watchMotion() {
    motionUntil = Math.max(motionUntil, performance.now() + 500);
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
  // State belongs to each complete group, never to an individual button.
  const guardedGroups = new Set();
  let previousTopVisible = false;
  let frame = 0;

  function setLift(lift) {
    const value = lift > 0 ? `${Math.ceil(lift)}px` : '';
    if (phone.style.getPropertyValue('--mobile-cta-lift') === value &&
        (!scrollTopButton || scrollTopButton.style.getPropertyValue('--phone-controls-lift') === value)) return;
    // Let CSS interpolate from the current position, including when a
    // gesture reverses direction. Never disable the bottom transition.
    if (value) phone.style.setProperty('--mobile-cta-lift', value);
    else phone.style.removeProperty('--mobile-cta-lift');
    // Keep the back-to-top control above the phone rather than colliding
    // with it when the portfolio group pushes the phone upwards.
    if (value) scrollTopButton?.style.setProperty('--phone-controls-lift', value);
    else scrollTopButton?.style.removeProperty('--phone-controls-lift');
    watchMotion();
  }

  function update() {
    frame = 0;
    if (window.scrollY < -0.5) {
      returnedFromPull = true;
      return;
    }
    const key = [window.innerWidth, window.innerHeight,
      root.classList.contains('privacy-banner-visible'),
      scrollTopButton?.classList.contains('visible') || false].join(':');
    const atTop = window.scrollY <= 0.5;
    const reachedTop = atTop && !wasAtTop;
    wasAtTop = atTop;
    // Hysteresis is for scrolling, not for retaining an old viewport state.
    if (key !== viewportKey || returnedFromPull || reachedTop) {
      // A touchend can arrive before the native bounce finishes. The
      // geometry verifier below also observes its eventual return to zero.
      if (returnedFromPull) scheduleHeroCookiePlacement();
      viewportKey = key;
      returnedFromPull = false;
      guardedGroups.clear();
    }
    const style = getComputedStyle(phone);
    if (!mobile.matches || style.position !== 'fixed' ||
        style.display === 'none' || style.visibility === 'hidden' ||
        phone.classList.contains('mobile-cta--footer-hidden') ||
        phone.classList.contains('mobile-cta--docked')) {
      guardedGroups.clear();
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
    const height = phoneRect.height;
    // Recover the resting rectangle from the RENDERED fixed element and
    // its current (possibly interpolated) CSS bottom. innerHeight can lag
    // behind browser chrome/overscroll; it is not our positioning origin.
    // Removing the current offset also prevents animation feedback loops.
    const currentBottom = parseFloat(style.bottom) || 0;
    const normalTop = Math.round((phoneRect.top + currentBottom - baseBottom) * 64) / 64;
    const viewportBottom = Math.max(window.innerHeight, normalTop + height + baseBottom);
    const headerBottom = header?.getBoundingClientRect().bottom || 0;
    // Test the entire VISIBLE stack at its unlifted destination: phone,
    // spacer and back-to-top button. Never derive this from animated bottom
    // values, or the collision would disappear as soon as the stack moves.
    const topStyle = scrollTopButton ? getComputedStyle(scrollTopButton) : null;
    const topVisible = topStyle && topStyle.position === 'fixed' &&
      topStyle.visibility !== 'hidden' && topStyle.display !== 'none';
    // A completed fade changes the stack footprint even without a scroll.
    // Do not retain a collision that belonged only to the vanished arrow.
    if (Boolean(topVisible) !== previousTopVisible) {
      previousTopVisible = Boolean(topVisible);
      guardedGroups.clear();
    }
    let controlsTop = normalTop;
    let controlsBottom = normalTop + height;
    let controlsLeft = phoneRect.left;
    let controlsRight = phoneRect.right;
    if (topVisible) {
      const topRect = scrollTopButton.getBoundingClientRect();
      // Shared with the CSS resting offset; dimensions come from the
      // rendered control, not a guessed total height for two circles.
      const step = parseFloat(topStyle.getPropertyValue('--phone-controls-step')) || 64;
      const topRestingBottom = inset + bannerOffset + step;
      const topOffset = (parseFloat(topStyle.bottom) || 0) - topRestingBottom;
      const topRestingTop = Math.round((topRect.top + topOffset) * 64) / 64;
      controlsTop = Math.min(controlsTop, topRestingTop);
      controlsBottom = Math.max(controlsBottom, topRestingTop + topRect.height);
      controlsLeft = Math.min(controlsLeft, topRect.left);
      controlsRight = Math.max(controlsRight, topRect.right);
    }
    const controlsHeight = controlsBottom - controlsTop;
    // Protect complete action rows throughout this homepage, including the
    // portfolio links and the bottom contact CTA. Empty space between
    // buttons remains inside each exclusion rectangle. No DOM tap overlay.
    const groups = actionGroups.map(element => ({
      element, rect: element.getBoundingClientRect()
    })).filter(({element, rect}) => {
      const groupStyle = getComputedStyle(element);
      return groupStyle.display !== 'none' && groupStyle.visibility !== 'hidden' &&
        rect.width > 0 && rect.height > 0 && rect.bottom > headerBottom &&
        rect.top < viewportBottom &&
        rect.left < controlsRight + ENTER_CLEARANCE &&
        rect.right > controlsLeft - ENTER_CLEARANCE;
    });
    const nextGuarded = new Set();
    let desiredTop = controlsTop;
    // A move above one group must not land inside another. Descending order
    // solves the intervals from the complete stack's resting position upwards.
    groups.sort((a, b) => b.rect.top - a.rect.top);
    for (const {element, rect} of groups) {
      const clearance = guardedGroups.has(element) ? EXIT_CLEARANCE : ENTER_CLEARANCE;
      if (rect.top < desiredTop + controlsHeight + clearance &&
          rect.bottom > desiredTop - clearance) {
        desiredTop = Math.min(desiredTop, rect.top - controlsHeight - ENTER_CLEARANCE);
        nextGuarded.add(element);
      }
    }
    guardedGroups.clear();
    nextGuarded.forEach(element => guardedGroups.add(element));
    const minimumTop = Math.max(8, headerBottom + 8);
    const lift = Math.max(0, Math.ceil(Math.min(Math.max(0, controlsTop - desiredTop),
      Math.max(0, controlsTop - minimumTop)) - 0.05));
    // The combined hitbox and hysteresis choose the destination, not the
    // animation path. Passing briefly over a button is intentional; the
    // gap between buttons is never selected as a resting position.
    setLift(lift);
    clearCopyFromPhone(normalTop - lift, phoneRect, height, headerBottom);
    if (performance.now() < motionUntil) requestUpdate();
  }

  function requestUpdate() {
    if (!suspended && !document.hidden && !frame) frame = requestAnimationFrame(update);
  }

  // Size observers do not detect position-only changes. At rest, compare
  // geometry twice a second and wake the solver only when something moved.
  // This repairs late layout/viewport changes even when iOS sends no final
  // scroll event. No permanent animation loop and no scroll manipulation.
  function verifyGeometry() {
    verificationTimer = 0;
    if (suspended || document.hidden || !mobile.matches) return;
    const viewport = window.visualViewport;
    const values = [window.scrollY, window.innerWidth, window.innerHeight,
      viewport?.offsetTop, viewport?.height, viewport?.scale,
      root.classList.contains('privacy-banner-visible'), phone.className,
      scrollTopButton?.className, phone.style.getPropertyValue('--mobile-cta-lift')];
    for (const element of [phone, scrollTopButton, header, content, ...actionGroups]) {
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      values.push(...[rect.top, rect.bottom, rect.left, rect.right].map(v => Math.round(v * 4)));
    }
    const next = values.join(':');
    if (next !== geometryKey) {
      geometryKey = next;
      requestUpdate();
    }
    verificationTimer = setTimeout(verifyGeometry, 500);
  }

  function settlePlacement() {
    if (suspended || document.hidden) return;
    motionUntil = Math.max(motionUntil, performance.now() + 1200);
    requestUpdate();
    if (!verificationTimer) verifyGeometry();
  }

  function suspendPlacement() {
    suspended = true;
    clearTimeout(verificationTimer);
    verificationTimer = 0;
    cancelAnimationFrame(frame);
    frame = 0;
  }

  function resumePlacement() {
    suspended = false;
    geometryKey = '';
    settlePlacement();
  }

  scheduleMobilePhoneCtaPlacement = requestUpdate;
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', settlePlacement, { passive: true });
  window.addEventListener('load', settlePlacement);
  window.addEventListener('pageshow', resumePlacement);
  window.addEventListener('pagehide', suspendPlacement);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) suspendPlacement();
    else resumePlacement();
  });
  window.addEventListener('scrollend', settlePlacement, { passive: true });
  window.addEventListener('touchend', settlePlacement, { passive: true });
  window.addEventListener('touchcancel', settlePlacement, { passive: true });
  window.visualViewport?.addEventListener('resize', settlePlacement, { passive: true });
  window.visualViewport?.addEventListener('scroll', settlePlacement, { passive: true });
  if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', settlePlacement);
  else mobile.addListener(settlePlacement);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestUpdate);
    actionGroups.forEach(element => observer.observe(element));
    observer.observe(phone);
    if (content) observer.observe(content);
    const hero = actions.closest('.hero');
    if (hero) observer.observe(hero);
    if (scrollTopButton) observer.observe(scrollTopButton);
    copy.forEach(element => observer.observe(element));
    if (header) observer.observe(header);
  }
  if ('MutationObserver' in window) {
    const observer = new MutationObserver(requestUpdate);
    observer.observe(phone, { attributes: true, attributeFilter: ['class'] });
    if (scrollTopButton) observer.observe(scrollTopButton, { attributes: true, attributeFilter: ['class'] });
  }
  // ResizeObserver does not report positional changes caused by 'top'.
  // Sample during consent/copy/phone motion as well as on user scroll.
  function trackTransition(event) {
    if (['top', 'bottom', 'transform'].includes(event.propertyName)) watchMotion();
  }
  content?.addEventListener('transitionrun', trackTransition);
  phone.addEventListener('transitionrun', trackTransition);
  scrollTopButton?.addEventListener('transitionrun', watchMotion);
  scrollTopButton?.addEventListener('transitionend', requestUpdate);
  scrollTopButton?.addEventListener('transitioncancel', settlePlacement);
  // Portfolio groups reveal with a transform. Follow that short movement
  // as well as scroll events, then stop sampling once the transition ends.
  actionGroups.forEach(element => {
    element.addEventListener('transitionrun', watchMotion);
    element.addEventListener('transitionend', requestUpdate);
  });
  content?.addEventListener('transitionend', requestUpdate);
  content?.addEventListener('transitioncancel', settlePlacement);
  phone.addEventListener('transitionend', requestUpdate);
  phone.addEventListener('transitioncancel', settlePlacement);
  document.fonts?.ready?.then(settlePlacement);
  document.fonts?.addEventListener('loadingdone', settlePlacement);
  settlePlacement();
};

/* Recover only a documented attempt to reach page top, never an arbitrary
   small scroll. iOS can settle a completed pull a toolbar-height below zero.
   No touch cancellation, fixed body, snap points or perpetual scroll lock. */
(function initHomeTopRecovery() {
  'use strict';
  function init() {
    if (!document.querySelector('.hero')) return;
    const mobile = window.matchMedia('(max-width: 768px)');
    let gesture = null;
    let armedUntil = 0;
    let settleTimer = 0;
    let expiryTimer = 0;
    let lastY = window.scrollY;

    function canRecover() {
      const focused = document.activeElement;
      return mobile.matches && (window.visualViewport?.scale || 1) <= 1.01 &&
        !location.hash && !document.body.classList.contains('nav-open') &&
        !document.body.classList.contains('privacy-dialog-open') &&
        !document.querySelector('dialog[open], .lightbox.active, .search-overlay.active') &&
        !focused?.matches('input, textarea, select, [contenteditable="true"]');
    }
    function cancel() {
      armedUntil = 0;
      clearTimeout(settleTimer);
      clearTimeout(expiryTimer);
    }
    function checkSettledTop() {
      if (gesture || !armedUntil || performance.now() > armedUntil || !canRecover()) return;
      const y = window.scrollY;
      // Limit correction to a small leftover offset after a witnessed top
      // gesture. A deliberate scroll farther down the page is never reset.
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const limit = Math.min(120, Math.max(80, headerHeight + 32));
      if (y > limit) { cancel(); return; }
      if (y < -0.5) return; // Native bounce is still in progress.
      if (y > 0.5) window.scrollTo({top: 0, left: window.scrollX, behavior: 'instant'});
      if (typeof scheduleHeroCookiePlacement === 'function') scheduleHeroCookiePlacement();
      if (typeof scheduleMobilePhoneCtaPlacement === 'function') scheduleMobilePhoneCtaPlacement();
    }
    function scheduleCheck() {
      if (!armedUntil) return;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(checkSettledTop, 140);
    }
    function nestedScroller(target) {
      for (let node = target instanceof Element ? target : target?.parentElement;
           node && node !== document.body && node !== document.documentElement;
           node = node.parentElement) {
        const style = getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1) return true;
      }
      return false;
    }
    window.addEventListener('touchstart', event => {
      cancel();
      gesture = null;
      if (event.touches.length !== 1 || !canRecover() || nestedScroller(event.target)) return;
      gesture = {startY: event.touches[0].clientY, lastY: event.touches[0].clientY,
        startScroll: Math.max(0, window.scrollY), requestedTop: false, towardTop: false};
    }, {passive: true});
    window.addEventListener('touchmove', event => {
      if (!gesture) return;
      if (event.touches.length !== 1) { gesture = null; cancel(); return; }
      const y = event.touches[0].clientY;
      const delta = y - gesture.lastY;
      if (Math.abs(delta) > 2) gesture.towardTop = delta > 0;
      gesture.lastY = y;
      // A downward finger drag beyond the initial scroll distance expresses
      // the same top intent even if the browser does not report negative Y.
      if (y - gesture.startY > gesture.startScroll + 12 ||
          (gesture.towardTop && window.scrollY <= 0.5 && y - gesture.startY > 12)) {
        gesture.requestedTop = true;
      }
    }, {passive: true});
    window.addEventListener('touchend', event => {
      if (event.touches.length) return;
      const shouldRecover = gesture?.requestedTop && gesture.towardTop;
      gesture = null;
      if (!shouldRecover || !canRecover()) return;
      armedUntil = performance.now() + 1200;
      expiryTimer = setTimeout(cancel, 1250);
      scheduleCheck();
    }, {passive: true});
    window.addEventListener('touchcancel', () => { gesture = null; cancel(); }, {passive: true});
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (gesture && y < lastY && y <= 0.5) gesture.requestedTop = true;
      lastY = y;
      scheduleCheck();
    }, {passive: true});
    window.addEventListener('scrollend', scheduleCheck, {passive: true});
    window.visualViewport?.addEventListener('resize', scheduleCheck, {passive: true});
    window.visualViewport?.addEventListener('scroll', scheduleCheck, {passive: true});
    // Further deliberate input always wins over the short recovery window.
    ['wheel', 'keydown', 'pointerdown'].forEach(type => {
      window.addEventListener(type, cancel, {passive: true});
    });
    window.addEventListener('pagehide', cancel);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once: true});
  } else init();
})();
