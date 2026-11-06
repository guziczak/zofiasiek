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
  let raisedForCta = false;
  let frame = 0;

  function setLift(lift) {
    const value = lift > 0 ? `${Math.ceil(lift)}px` : '';
    if (phone.style.getPropertyValue('--mobile-cta-lift') === value) return;
    // Let CSS interpolate from the current position, including when a
    // gesture reverses direction. Never disable the bottom transition.
    if (value) phone.style.setProperty('--mobile-cta-lift', value);
    else phone.style.removeProperty('--mobile-cta-lift');
  }

  function update() {
    frame = 0;
    const style = getComputedStyle(phone);
    if (!mobile.matches || style.position !== 'fixed' ||
        style.display === 'none' || style.visibility === 'hidden' ||
        phone.classList.contains('mobile-cta--footer-hidden') ||
        phone.classList.contains('mobile-cta--docked')) {
      raisedForCta = false;
      setLift(0);
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
  }

  function requestUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  scheduleMobilePhoneCtaPlacement = requestUpdate;
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('pageshow', requestUpdate);
  window.visualViewport?.addEventListener('resize', requestUpdate, { passive: true });
  window.visualViewport?.addEventListener('scroll', requestUpdate, { passive: true });
  if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', requestUpdate);
  else mobile.addListener(requestUpdate);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(actions);
    observer.observe(phone);
    if (header) observer.observe(header);
  }
  if ('MutationObserver' in window) {
    new MutationObserver(requestUpdate).observe(phone, { attributes: true, attributeFilter: ['class'] });
  }
  const content = actions.closest('.hero__content');
  content?.addEventListener('transitionend', requestUpdate);
  document.fonts?.ready?.then(requestUpdate);
  requestUpdate();
};
