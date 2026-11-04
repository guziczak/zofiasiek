/* A reserved hero phone cell replaces collision-driven floating over copy.
   This module intentionally leaves normal scrolling, consent and the existing
   floating/footer control intact. Only one phone is visible in the hero. */
(function () {
  'use strict';

  function initHeroPhoneLayout() {
    const hero = document.querySelector('.hero');
    const actions = hero?.querySelector('.hero__actions');
    const primary = actions?.querySelector('.btn--primary');
    const floating = document.querySelector('.mobile-cta');
    if (!hero || !actions || !primary || !floating ||
        hero.querySelector('.hero__phone-slot')) return;

    const root = document.documentElement;
    const header = document.querySelector('.header');
    const mobile = window.matchMedia('(max-width: 768px)');
    const slot = document.createElement('div');
    slot.className = 'hero__phone-slot';
    const phone = floating.cloneNode(true);
    phone.className = 'hero__phone';
    phone.removeAttribute('id');
    phone.removeAttribute('style');
    phone.removeAttribute('hidden');
    phone.removeAttribute('aria-hidden');
    phone.removeAttribute('inert');
    phone.dataset.contactPlacement = 'hero_phone';
    slot.append(phone);
    primary.after(slot);
    hero.classList.add('hero--phone-layout');

    let inHero = false;
    let frame = 0;

    function update() {
      frame = 0;
      const headerBottom = header?.getBoundingClientRect().bottom || 0;
      const actionsBottom = actions.getBoundingClientRect().bottom;
      const heroTop = hero.getBoundingClientRect().top;
      // Keep the floating phone off the entire hero text/CTA area, including
      // when the CTA row is below the viewport. Preserve the cell when it
      // scrolls away: switching controls must never change document height.
      // Distinct boundaries prevent toggling around the header on slow scroll.
      const boundary = headerBottom + (inHero ? -12 : 12);
      const next = mobile.matches && actionsBottom > boundary &&
        heroTop < window.innerHeight;
      if (next !== inHero) {
        inHero = next;
        root.classList.toggle('hero-phone-in-flow', inHero);
        if (typeof scheduleMobilePhoneCtaPlacement === 'function') {
          scheduleMobilePhoneCtaPlacement();
        }
      }
    }

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    window.addEventListener('pageshow', requestUpdate);
    window.visualViewport?.addEventListener('resize', requestUpdate, { passive: true });
    if (typeof mobile.addEventListener === 'function') {
      mobile.addEventListener('change', requestUpdate);
    } else {
      mobile.addListener(requestUpdate);
    }
    const content = hero.querySelector('.hero__content');
    content?.addEventListener('transitionend', requestUpdate);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(requestUpdate);
      observer.observe(actions);
      if (content) observer.observe(content);
      if (header) observer.observe(header);
    }
    document.fonts?.ready?.then(requestUpdate);
    update();
    // The original cookie routine must measure the FINAL action grid,
    // including the phone cell, rather than the old full-width buttons.
    if (typeof scheduleHeroCookiePlacement === 'function') {
      scheduleHeroCookiePlacement();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroPhoneLayout, { once: true });
  } else {
    initHeroPhoneLayout();
  }
})();
