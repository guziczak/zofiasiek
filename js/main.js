/* ============================================================
   Zofia Siek-Mlicka — Main JavaScript
   ============================================================ */

/* ----- Teksty interfejsu (PL/EN/DE) — wybór po <html lang> ----- */
const STR = (function () {
  const all = {
    pl: {
      navOpen: 'Otwórz menu nawigacji',
      navClose: 'Zamknij menu nawigacji',
      formRequired: 'To pole jest wymagane.',
      formEmail: 'Wpisz poprawny adres e-mail.',
      formConsent: 'Wymagana jest zgoda na przetwarzanie danych osobowych.',
      formFill: 'Proszę uzupełnić zaznaczone pola.',
      mailSubject: 'Zapytanie ze strony — ',
      mailName: 'Imię i nazwisko',
      mailEmail: 'E-mail',
      mailPhone: 'Telefon',
      mailOpening: 'Otwieram Twój program pocztowy…',
      contactTopics: {
        conservation: {
          subject: 'Zapytanie o konserwację dzieła sztuki',
          message: 'Dzień dobry,\n\nchcę zapytać o konserwację dzieła sztuki.\n\nRodzaj obiektu:\nStan lub uszkodzenia:\nWymiary:\n'
        },
        'painting-copy': {
          subject: 'Zapytanie o kopię obrazu',
          message: 'Dzień dobry,\n\nchcę zapytać o wykonanie kopii obrazu.\n\nTytuł lub autor oryginału:\nPreferowany format:\n'
        }
      },
      mapNeedConsent: 'Aby wyświetlić interaktywną mapę Google, włącz kategorię „Mapa Google” w ustawieniach prywatności.',
      privacyUrl: '/polityka-prywatnosci/',
      learnMore: 'Dowiedz się więcej',
      cookieIntro: 'Używamy niezbędnej pamięci przeglądarki. Możesz osobno zezwolić na Google Analytics 4 i interaktywną Mapę Google.',
      acceptAll: 'Akceptuj wszystkie',
      acceptCompact: 'Akceptuję',
      rejectOptional: 'Odrzuć opcjonalne',
      rejectCompact: 'Odrzucam',
      settings: 'Ustawienia',
      privacyCompact: 'Twoja prywatność',
      privacySettings: 'Ustawienia prywatności',
      privacyDescription: 'Wybierz, na które opcjonalne usługi zezwalasz. Ustawienia możesz później zmienić w stopce strony.',
      essentialTitle: 'Niezbędne',
      essentialDescription: 'Zapamiętują decyzję o prywatności, wybrany motyw i pozycję przewijania. Nie można ich wyłączyć.',
      alwaysActive: 'Zawsze aktywne',
      analyticsTitle: 'Analityka',
      analyticsDescription: 'Google Analytics 4 (G-VFS072VFK9) pomaga nam zrozumieć, jak używana jest strona. Ładuje się dopiero po Twojej zgodzie.',
      mapsTitle: 'Mapa Google',
      mapsDescription: 'Pozwala wyświetlić interaktywną mapę na stronie Kontakt. Bez zgody pozostaje lokalny obraz mapy.',
      saveSettings: 'Zapisz ustawienia',
      cancel: 'Anuluj',
      settingsSaved: 'Ustawienia prywatności zostały zapisane.',
      mapTitle: 'Lokalizacja — Siedlec 3, 32-065 Krzeszowice',
      sliderPlay: 'Włącz automatyczne przewijanie slajdów',
      sliderPause: 'Zatrzymaj automatyczne przewijanie slajdów',
      slide: 'Slajd',
      lightbox: 'Podgląd zdjęcia',
      close: 'Zamknij',
      prev: 'Poprzednie',
      next: 'Następne',
      collapse: 'Zwiń',
      readMore: 'Czytaj więcej',
      searchOpen: 'Szukaj na stronie',
      searchTitle: 'Szukaj',
      searchPlaceholder: 'Wpisz np. Klimt, Vermeer, konserwacja…',
      searchHint: 'Wpisz tytuł obrazu, nazwisko malarza albo nazwę usługi.',
      searchPopular: 'Popularne',
      searchEmpty: 'Brak wyników dla',
      searchEmptyHint: 'Spróbuj inaczej — np. samego nazwiska malarza.',
      searchError: 'Nie udało się wczytać wyszukiwarki. Odśwież stronę i spróbuj ponownie.',
      searchCount: 'Liczba wyników:',
      themeToDark: 'Włącz motyw ciemny',
      themeToLight: 'Włącz motyw jasny'
    },
    en: {
      navOpen: 'Open navigation menu',
      navClose: 'Close navigation menu',
      formRequired: 'This field is required.',
      formEmail: 'Enter a valid email address.',
      formConsent: 'Consent to the processing of personal data is required.',
      formFill: 'Please fill in the highlighted fields.',
      mailSubject: 'Inquiry from the website — ',
      mailName: 'Full name',
      mailEmail: 'E-mail',
      mailPhone: 'Phone',
      mailOpening: 'Opening your e-mail app…',
      contactTopics: {
        conservation: {
          subject: 'Art conservation inquiry',
          message: 'Hello,\n\nI would like to ask about the conservation of a work of art.\n\nType of object:\nCondition or damage:\nDimensions:\n'
        },
        'painting-copy': {
          subject: 'Painting copy inquiry',
          message: 'Hello,\n\nI would like to ask about commissioning a hand-painted copy.\n\nOriginal title or artist:\nPreferred size:\n'
        }
      },
      mapNeedConsent: 'To display the interactive Google map, enable “Google Maps” in the privacy settings.',
      privacyUrl: '/en/privacy-policy/',
      learnMore: 'Learn more',
      cookieIntro: 'We use essential browser storage. You can separately allow Google Analytics 4 and the interactive Google Map.',
      acceptAll: 'Accept all',
      acceptCompact: 'Accept',
      rejectOptional: 'Reject optional',
      rejectCompact: 'Reject',
      settings: 'Settings',
      privacyCompact: 'Your privacy',
      privacySettings: 'Privacy settings',
      privacyDescription: 'Choose which optional services you allow. You can change these settings later in the website footer.',
      essentialTitle: 'Essential',
      essentialDescription: 'Remembers your privacy decision, the chosen theme and your scroll position. It cannot be disabled.',
      alwaysActive: 'Always active',
      analyticsTitle: 'Analytics',
      analyticsDescription: 'Google Analytics 4 (G-VFS072VFK9) helps us understand how the website is used. It loads only after you consent.',
      mapsTitle: 'Google Maps',
      mapsDescription: 'Displays the interactive map on the Contact page. Without consent, a locally hosted map image remains visible.',
      saveSettings: 'Save settings',
      cancel: 'Cancel',
      settingsSaved: 'Your privacy settings have been saved.',
      mapTitle: 'Location — Siedlec 3, 32-065 Krzeszowice, Poland',
      sliderPlay: 'Start automatic slide rotation',
      sliderPause: 'Stop automatic slide rotation',
      slide: 'Slide',
      lightbox: 'Photo preview',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      collapse: 'Collapse',
      readMore: 'Read more',
      searchOpen: 'Search the website',
      searchTitle: 'Search',
      searchPlaceholder: 'Try Klimt, Vermeer, conservation…',
      searchHint: 'Enter a painting title, an artist’s name or a service.',
      searchPopular: 'Popular',
      searchEmpty: 'No results for',
      searchEmptyHint: 'Try a different word — the artist’s surname often works best.',
      searchError: 'The search index could not be loaded. Please refresh the page and try again.',
      searchCount: 'Results:',
      themeToDark: 'Switch to dark theme',
      themeToLight: 'Switch to light theme'
    },
    de: {
      navOpen: 'Navigationsmenü öffnen',
      navClose: 'Navigationsmenü schließen',
      formRequired: 'Dieses Feld ist erforderlich.',
      formEmail: 'Geben Sie eine gültige E-Mail-Adresse ein.',
      formConsent: 'Die Einwilligung in die Verarbeitung personenbezogener Daten ist erforderlich.',
      formFill: 'Bitte füllen Sie die markierten Felder aus.',
      mailSubject: 'Anfrage über die Website — ',
      mailName: 'Name',
      mailEmail: 'E-Mail',
      mailPhone: 'Telefon',
      mailOpening: 'Ihr E-Mail-Programm wird geöffnet…',
      contactTopics: {
        conservation: {
          subject: 'Anfrage zur Restaurierung eines Kunstwerks',
          message: 'Guten Tag,\n\nich möchte mich nach der Restaurierung eines Kunstwerks erkundigen.\n\nArt des Objekts:\nZustand oder Schäden:\nMaße:\n'
        },
        'painting-copy': {
          subject: 'Anfrage zu einer Gemäldekopie',
          message: 'Guten Tag,\n\nich möchte mich nach der Anfertigung einer Gemäldekopie erkundigen.\n\nTitel oder Künstler des Originals:\nGewünschtes Format:\n'
        }
      },
      mapNeedConsent: 'Um die interaktive Google-Karte anzuzeigen, aktivieren Sie „Google Maps” in den Datenschutzeinstellungen.',
      privacyUrl: '/de/datenschutz/',
      learnMore: 'Mehr erfahren',
      cookieIntro: 'Wir verwenden notwendige Browser-Speicherfunktionen. Sie können Google Analytics 4 und die interaktive Google-Karte getrennt zulassen.',
      acceptAll: 'Alle akzeptieren',
      acceptCompact: 'Akzeptieren',
      rejectOptional: 'Optionale Dienste ablehnen',
      rejectCompact: 'Ablehnen',
      settings: 'Einstellungen',
      privacyCompact: 'Ihre Privatsphäre',
      privacySettings: 'Datenschutzeinstellungen',
      privacyDescription: 'Wählen Sie aus, welche optionalen Dienste Sie zulassen. Sie können diese Einstellungen später in der Fußzeile ändern.',
      essentialTitle: 'Notwendig',
      essentialDescription: 'Speichert Ihre Datenschutzentscheidung, das gewählte Design und die Scrollposition. Diese Funktion kann nicht deaktiviert werden.',
      alwaysActive: 'Immer aktiv',
      analyticsTitle: 'Analyse',
      analyticsDescription: 'Google Analytics 4 (G-VFS072VFK9) hilft uns zu verstehen, wie die Website genutzt wird. Der Dienst lädt erst nach Ihrer Einwilligung.',
      mapsTitle: 'Google Maps',
      mapsDescription: 'Zeigt die interaktive Karte auf der Kontaktseite. Ohne Einwilligung bleibt ein lokal gespeichertes Kartenbild sichtbar.',
      saveSettings: 'Einstellungen speichern',
      cancel: 'Abbrechen',
      settingsSaved: 'Ihre Datenschutzeinstellungen wurden gespeichert.',
      mapTitle: 'Standort — Siedlec 3, 32-065 Krzeszowice, Polen',
      sliderPlay: 'Automatischen Bildwechsel starten',
      sliderPause: 'Automatischen Bildwechsel anhalten',
      slide: 'Bild',
      lightbox: 'Bildvorschau',
      close: 'Schließen',
      prev: 'Zurück',
      next: 'Weiter',
      collapse: 'Einklappen',
      readMore: 'Weiterlesen',
      searchOpen: 'Website durchsuchen',
      searchTitle: 'Suche',
      searchPlaceholder: 'z. B. Klimt, Vermeer, Restaurierung…',
      searchHint: 'Geben Sie einen Bildtitel, einen Künstlernamen oder eine Leistung ein.',
      searchPopular: 'Beliebt',
      searchEmpty: 'Keine Treffer für',
      searchEmptyHint: 'Versuchen Sie es anders — oft hilft nur der Nachname des Künstlers.',
      searchError: 'Die Suche konnte nicht geladen werden. Bitte laden Sie die Seite neu.',
      searchCount: 'Treffer:',
      themeToDark: 'Zum dunklen Design wechseln',
      themeToLight: 'Zum hellen Design wechseln'
    }
  };
  const lang = (document.documentElement.lang || 'pl').slice(0, 2);
  return all[lang] || all.pl;
})();

/* Kod języka strony — wyszukiwarka wybiera po nim gałąź indeksu. */
const SITE_LANG = (document.documentElement.lang || 'pl').slice(0, 2);

/* ----- Prywatność i Google Analytics 4 -----
   Basic Consent Mode: przed zgodą nie pobieramy gtag.js i nie wysyłamy
   żadnych żądań do Google. Stary klucz „cookies-accepted” dotyczył wyłącznie
   Map Google, dlatego nie jest migrowany na zgodę analityczną. */
const GA_MEASUREMENT_ID = 'G-VFS072VFK9';
const PRIVACY_CONSENT_KEY = 'zofiasiek-privacy-consent-v2';
const PRIVACY_CONSENT_VERSION = 2;
const GA_ALLOWED_HOSTS = new Set(['zofiasiek.pl', 'www.zofiasiek.pl']);

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

let privacyConsent = readPrivacyConsent();
let privacyBanner = null;
let privacyDialog = null;
let privacyDialogReturnFocus = null;
let privacyBannerWasVisible = false;
let privacyBannerResizeObserver = null;

/* ----- Zapis pozycji przewijania -----
   Samo PRZYWRACANIE robi mały inline-skrypt na końcu <body> — uruchamia się przed
   pierwszym malowaniem i z wyłączoną płynnością, więc strona od razu jest na właściwej
   pozycji (bez animowanego przewijania z góry). Tu tylko zapisujemy bieżącą pozycję. */
(function () {
  if (!('scrollRestoration' in history)) return;
  const KEY = 'scrollY:' + location.pathname;
  let saveTimer = null;
  const save = () => {
    try { sessionStorage.setItem(KEY, String(Math.round(window.scrollY))); } catch (e) {}
  };
  window.addEventListener('scroll', () => {
    if (saveTimer) return;
    saveTimer = setTimeout(() => { save(); saveTimer = null; }, 150);
  }, { passive: true });
  window.addEventListener('pagehide', save);
})();

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initFooterAccordion();
  initFooterViewportState();
  initTheme();
  initSearch();
  initDeepLinkedWork();
  initCookieConsent();
  initAnalyticsEvents();
  initScrollTop();
  initRevealAnimations();
  initContactForm();
  initContactMap();
  initHeroSlider();
  initLightbox();
  initFaqAccordions();
  initExpandable();
});

/* ----- Sticky Header ----- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const isHomePage = header.classList.contains('header--transparent');

  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.remove('header--transparent');
      header.classList.add('header--solid');
    } else if (isHomePage) {
      header.classList.remove('header--solid');
      header.classList.add('header--transparent');
    }
  }

  if (isHomePage) {
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  } else {
    header.classList.add('header--solid');
  }
}

/* ----- Mobile Navigation ----- */
function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!toggle || !navList) return;

  if (!navList.id) navList.id = 'menu-glowne';
  toggle.setAttribute('aria-controls', navList.id);
  toggle.setAttribute('aria-expanded', 'false');

  const isOpen = () => navList.classList.contains('open');
  const DOUBLE_TAP_DELAY = 350;
  const DOUBLE_TAP_DISTANCE = 32;
  const TAP_MOVE_TOLERANCE = 12;
  const TAP_MAX_DURATION = 500;
  const INTERACTIVE = 'a, button, input, select, textarea, label, summary, [contenteditable="true"], [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';
  let activeTouch = null;
  let lastTap = null;

  const isInteractive = target =>
    target instanceof Element && Boolean(target.closest(INTERACTIVE));

  function resetDoubleTapGuard() {
    activeTouch = null;
    lastTap = null;
  }

  navList.addEventListener('touchstart', event => {
    if (!isOpen() || event.touches.length !== 1 || isInteractive(event.target)) {
      resetDoubleTapGuard();
      return;
    }

    const touch = event.touches[0];
    activeTouch = {
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      startedAt: performance.now()
    };
  }, { passive: true });

  navList.addEventListener('touchmove', event => {
    if (!activeTouch || event.touches.length !== 1) {
      resetDoubleTapGuard();
      return;
    }

    const touch = event.touches[0];
    if (
      touch.identifier !== activeTouch.id ||
      Math.hypot(touch.clientX - activeTouch.x, touch.clientY - activeTouch.y) > TAP_MOVE_TOLERANCE
    ) {
      resetDoubleTapGuard();
    }
  }, { passive: true });

  navList.addEventListener('touchcancel', resetDoubleTapGuard, { passive: true });

  navList.addEventListener('touchend', event => {
    const current = activeTouch;
    activeTouch = null;

    if (!isOpen() || !current || event.touches.length !== 0 || isInteractive(event.target)) {
      lastTap = null;
      return;
    }

    const touch = Array.from(event.changedTouches)
      .find(item => item.identifier === current.id);
    const now = performance.now();

    if (!touch || now - current.startedAt > TAP_MAX_DURATION) {
      lastTap = null;
      return;
    }

    const isDoubleTap = lastTap &&
      now - lastTap.endedAt <= DOUBLE_TAP_DELAY &&
      Math.hypot(touch.clientX - lastTap.x, touch.clientY - lastTap.y) <= DOUBLE_TAP_DISTANCE;

    if (isDoubleTap) {
      if (event.cancelable) event.preventDefault();
      lastTap = null;
      return;
    }

    lastTap = { endedAt: now, x: touch.clientX, y: touch.clientY };
  }, { passive: false });

  function closeNav(returnFocus) {
    resetDoubleTapGuard();
    toggle.classList.remove('active');
    navList.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    document.body.classList.remove('nav-open');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', STR.navOpen);
    if (returnFocus) toggle.focus();
  }

  function openNav() {
    toggle.classList.add('active');
    navList.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    document.body.classList.add('nav-open');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', STR.navClose);
  }

  toggle.addEventListener('click', () => {
    if (isOpen()) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', () => closeNav());
  }

  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => closeNav());
  });

  // Klawiatura: Esc zamyka panel, Tab krąży w jego obrębie (toggle + pozycje menu),
  // żeby fokus nie uciekał na treść zasłoniętą overlayem.
  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      closeNav(true);
      return;
    }
    if (e.key !== 'Tab') return;
    const items = [toggle, ...navList.querySelectorAll('a[href], button, input')];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* ----- Responsive Footer Accordion ----- */
function initFooterAccordion() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const records = [...footer.querySelectorAll('.footer__grid > div')]
    .slice(1)
    .map((group, index) => {
      const heading = group.querySelector('.footer__heading');
      const list = group.querySelector('.footer__links');
      if (!heading || !list) return null;
      if (!list.id) list.id = `footer-panel-${index + 1}`;
      return { group, heading, list, label: heading.textContent.trim(), button: null };
    })
    .filter(Boolean);
  if (!records.length) return;

  const mobileLayout = window.matchMedia('(max-width: 960px)');

  const enable = () => {
    document.documentElement.classList.add('footer-accordion-enabled');
    records.forEach((record) => {
      if (record.button) return;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'footer__toggle';
      button.textContent = record.label;
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', record.list.id);
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        record.list.hidden = expanded;
      });

      record.group.classList.add('footer__group');
      record.heading.replaceChildren(button);
      record.list.hidden = true;
      record.button = button;
    });
  };

  const disable = () => {
    document.documentElement.classList.remove('footer-accordion-enabled');
    records.forEach((record) => {
      record.list.hidden = false;
      record.heading.textContent = record.label;
      record.group.classList.remove('footer__group');
      record.button = null;
    });
  };

  const update = () => {
    if (mobileLayout.matches) enable();
    else disable();
  };

  update();
  if (typeof mobileLayout.addEventListener === 'function') {
    mobileLayout.addEventListener('change', update);
  } else {
    mobileLayout.addListener(update);
  }
}

function initFooterViewportState() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  const phone = document.querySelector('.mobile-cta');
  const footerSocials = footer.querySelector('.footer__grid > :first-child .social-links');
  const phoneHome = phone ? document.createComment('mobile-cta-home') : null;
  const mobileLayout = window.matchMedia('(max-width: 768px)');
  if (phone && phoneHome) phone.before(phoneHome);

  let footerInView = false;
  let footerSocialsInView = false;

  const restorePhone = () => {
    if (!phone || !phoneHome?.parentNode) return;
    phoneHome.after(phone);
    phone.classList.remove('mobile-cta--docked', 'mobile-cta--footer-hidden');
  };

  const updatePhonePlacement = () => {
    if (!phone || !footerSocials || !mobileLayout.matches || !footerInView) {
      restorePhone();
      return;
    }

    if (footerSocialsInView) {
      footerSocials.append(phone);
      phone.classList.add('mobile-cta--docked');
      phone.classList.remove('mobile-cta--footer-hidden');
    } else {
      restorePhone();
      phone.classList.add('mobile-cta--footer-hidden');
    }
  };

  const setFooterInView = (inView) => {
    footerInView = inView;
    document.documentElement.classList.toggle('footer-in-view', inView);
    updatePhonePlacement();
    requestAnimationFrame(updatePrivacyBannerOffset);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === footer) footerInView = entry.isIntersecting;
        if (entry.target === footerSocials) footerSocialsInView = entry.isIntersecting;
      });
      document.documentElement.classList.toggle('footer-in-view', footerInView);
      updatePhonePlacement();
      requestAnimationFrame(updatePrivacyBannerOffset);
    }, { threshold: 0 });
    observer.observe(footer);
    if (footerSocials) observer.observe(footerSocials);
  } else {
    const update = () => {
      const footerRect = footer.getBoundingClientRect();
      const socialsRect = footerSocials?.getBoundingClientRect();
      footerSocialsInView = Boolean(
        socialsRect && socialsRect.top < window.innerHeight && socialsRect.bottom > 0
      );
      setFooterInView(footerRect.top < window.innerHeight && footerRect.bottom > 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  if (typeof mobileLayout.addEventListener === 'function') {
    mobileLayout.addEventListener('change', updatePhonePlacement);
  } else {
    mobileLayout.addListener(updatePhonePlacement);
  }
}

/* ----- Cookie Consent ----- */
function initCookieConsent() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  privacyBanner = banner;
  if ('ResizeObserver' in window) {
    privacyBannerResizeObserver = new ResizeObserver(() => updatePrivacyBannerOffset());
    privacyBannerResizeObserver.observe(banner);
  }
  window.addEventListener('resize', updatePrivacyBannerOffset, { passive: true });
  window.visualViewport?.addEventListener('resize', updatePrivacyBannerOffset, { passive: true });
  removeLegacyConsent();
  renderPrivacyBanner();
  createPrivacyDialog();
  createPrivacySettingsButton();
  setPrivacyBannerVisible(false);
  window.addEventListener('storage', (event) => {
    if (event.key === PRIVACY_CONSENT_KEY) window.location.reload();
  });

  banner.querySelector('[data-consent-accept-all]')?.addEventListener('click', () => {
    savePrivacyConsent({ analytics: true, maps: true });
  });
  banner.querySelector('[data-consent-reject]')?.addEventListener('click', () => {
    savePrivacyConsent({ analytics: false, maps: false });
  });
  banner.querySelector('[data-consent-settings]')?.addEventListener('click', (event) => {
    openPrivacySettings(null, event.currentTarget);
  });

  if (privacyConsent) {
    applyPrivacyConsent(privacyConsent);
  } else {
    setTimeout(() => setPrivacyBannerVisible(true), 800);
  }
}

function resolveSiteUrl(path) {
  const explicitBase = document.querySelector('base')?.href;
  const siteRoot = explicitBase || new URL('/', window.location.origin).href;
  return new URL(path.replace(/^\/+/, ''), siteRoot).href;
}

function renderPrivacyBanner() {
  if (!privacyBanner) return;
  privacyBanner.setAttribute('role', 'region');
  privacyBanner.setAttribute('aria-label', STR.privacySettings);
  privacyBanner.innerHTML = `
    <div class="cookie-banner__inner">
      <p class="cookie-banner__text">${STR.cookieIntro} <a href="${resolveSiteUrl(STR.privacyUrl)}">${STR.learnMore}</a>.</p>
      <div class="cookie-banner__actions">
        <button type="button" class="btn btn--primary btn--small" data-consent-accept-all><span class="cookie-banner__label cookie-banner__label--full">${STR.acceptAll}</span><span class="cookie-banner__label cookie-banner__label--compact">${STR.acceptCompact}</span></button>
        <button type="button" class="btn btn--outline btn--small" data-consent-reject><span class="cookie-banner__label cookie-banner__label--full">${STR.rejectOptional}</span><span class="cookie-banner__label cookie-banner__label--compact">${STR.rejectCompact}</span></button>
        <button type="button" class="cookie-banner__settings" data-consent-settings><span class="cookie-banner__label cookie-banner__label--full">${STR.settings}</span><span class="cookie-banner__label cookie-banner__label--compact">${STR.privacyCompact}</span></button>
      </div>
    </div>`;
}

function setPrivacyBannerVisible(visible) {
  if (!privacyBanner) return;
  privacyBanner.classList.toggle('visible', visible);
  privacyBanner.setAttribute('aria-hidden', String(!visible));
  privacyBanner.inert = !visible;
  document.documentElement.classList.toggle('privacy-banner-visible', visible);

  if (!visible) {
    document.documentElement.style.setProperty('--privacy-banner-offset', '0px');
    return;
  }

  requestAnimationFrame(updatePrivacyBannerOffset);
}

function updatePrivacyBannerOffset() {
  const root = document.documentElement;
  if (!privacyBanner?.classList.contains('visible')) {
    root.style.setProperty('--privacy-banner-offset', '0px');
    return;
  }

  const bannerStyle = getComputedStyle(privacyBanner);
  const bottomInset = Math.max(0, Number.parseFloat(bannerStyle.bottom) || 0);
  const bannerHeight = Math.ceil(privacyBanner.getBoundingClientRect().height);
  root.style.setProperty('--privacy-banner-offset', `${bannerHeight + bottomInset}px`);
}

function createPrivacyDialog() {
  if (document.querySelector('[data-privacy-dialog]')) {
    privacyDialog = document.querySelector('[data-privacy-dialog]');
    return;
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'privacy-dialog';
  dialog.setAttribute('data-privacy-dialog', '');
  dialog.setAttribute('aria-labelledby', 'privacy-dialog-title');
  dialog.innerHTML = `
    <form class="privacy-dialog__panel" data-privacy-form>
      <div class="privacy-dialog__header">
        <h2 id="privacy-dialog-title">${STR.privacySettings}</h2>
        <button type="button" class="privacy-dialog__close" data-privacy-close aria-label="${STR.close}">&times;</button>
      </div>
      <p class="privacy-dialog__intro">${STR.privacyDescription} <a href="${resolveSiteUrl(STR.privacyUrl)}">${STR.learnMore}</a>.</p>
      <fieldset class="privacy-options">
        <legend class="sr-only">${STR.privacySettings}</legend>
        <label class="privacy-option privacy-option--locked">
          <span class="privacy-option__indicator" aria-hidden="true">&#10003;</span>
          <span class="privacy-option__copy">
            <strong>${STR.essentialTitle}</strong>
            <span>${STR.essentialDescription}</span>
          </span>
          <span class="privacy-option__status">${STR.alwaysActive}</span>
        </label>
        <label class="privacy-option">
          <input type="checkbox" data-consent-category="analytics" aria-describedby="privacy-analytics-description">
          <span class="privacy-option__copy">
            <strong>${STR.analyticsTitle}</strong>
            <span id="privacy-analytics-description">${STR.analyticsDescription}</span>
          </span>
        </label>
        <label class="privacy-option">
          <input type="checkbox" data-consent-category="maps" aria-describedby="privacy-maps-description">
          <span class="privacy-option__copy">
            <strong>${STR.mapsTitle}</strong>
            <span id="privacy-maps-description">${STR.mapsDescription}</span>
          </span>
        </label>
      </fieldset>
      <div class="privacy-dialog__actions">
        <button type="button" class="btn btn--outline btn--small" data-privacy-close>${STR.cancel}</button>
        <button type="submit" class="btn btn--primary btn--small">${STR.saveSettings}</button>
      </div>
    </form>`;
  document.body.appendChild(dialog);
  privacyDialog = dialog;

  dialog.querySelectorAll('[data-privacy-close]').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.querySelector('[data-privacy-form]')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const analytics = dialog.querySelector('[data-consent-category="analytics"]')?.checked || false;
    const maps = dialog.querySelector('[data-consent-category="maps"]')?.checked || false;
    savePrivacyConsent({ analytics, maps }, true);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('privacy-dialog-open');
    if (!privacyConsent && privacyBannerWasVisible) setPrivacyBannerVisible(true);
    if (privacyDialogReturnFocus instanceof HTMLElement) privacyDialogReturnFocus.focus();
    privacyDialogReturnFocus = null;
  });
}

function createPrivacySettingsButton() {
  const footer = document.querySelector('.footer__bottom');
  if (!footer || footer.querySelector('[data-open-privacy-settings]')) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'footer__privacy-button';
  button.setAttribute('data-open-privacy-settings', '');
  button.textContent = STR.privacySettings;
  button.addEventListener('click', (event) => openPrivacySettings(null, event.currentTarget));
  footer.appendChild(button);
}

function openPrivacySettings(focusCategory, trigger) {
  if (!privacyDialog) return;
  const current = privacyConsent || { analytics: false, maps: false };
  const analyticsInput = privacyDialog.querySelector('[data-consent-category="analytics"]');
  const mapsInput = privacyDialog.querySelector('[data-consent-category="maps"]');
  if (analyticsInput) analyticsInput.checked = current.analytics;
  if (mapsInput) mapsInput.checked = current.maps;

  privacyDialogReturnFocus = trigger || document.activeElement;
  privacyBannerWasVisible = privacyBanner?.classList.contains('visible') || false;
  setPrivacyBannerVisible(false);
  document.body.classList.add('privacy-dialog-open');
  if (!privacyDialog.open) privacyDialog.showModal();

  const target = focusCategory === 'maps' ? mapsInput :
    (focusCategory === 'analytics' ? analyticsInput : analyticsInput);
  setTimeout(() => target?.focus(), 0);
}

function readPrivacyConsent() {
  try {
    const stored = JSON.parse(localStorage.getItem(PRIVACY_CONSENT_KEY) || 'null');
    if (!stored || stored.version !== PRIVACY_CONSENT_VERSION) return null;
    if (typeof stored.analytics !== 'boolean' || typeof stored.maps !== 'boolean') return null;
    if (typeof stored.decidedAt !== 'string' || Number.isNaN(Date.parse(stored.decidedAt))) return null;
    return stored;
  } catch (error) {
    return null;
  }
}

function removeLegacyConsent() {
  try { localStorage.removeItem('cookies-accepted'); } catch (error) {}
}

function savePrivacyConsent(selection, announce = false) {
  const previous = privacyConsent;
  const next = {
    version: PRIVACY_CONSENT_VERSION,
    analytics: Boolean(selection.analytics),
    maps: Boolean(selection.maps),
    decidedAt: new Date().toISOString()
  };

  try { localStorage.setItem(PRIVACY_CONSENT_KEY, JSON.stringify(next)); } catch (error) {}
  privacyConsent = next;
  setPrivacyBannerVisible(false);
  if (privacyDialog?.open) privacyDialog.close();

  const analyticsRevoked = previous?.analytics && !next.analytics;
  const mapsRevoked = previous?.maps && !next.maps;
  if (analyticsRevoked) clearGoogleAnalyticsCookies();

  // Przeładowanie usuwa już załadowany skrypt GA lub iframe mapy z dokumentu.
  // Po starcie nowej strony odrzucone usługi nie są w ogóle pobierane.
  if (analyticsRevoked || mapsRevoked) {
    applyPrivacyConsent(next);
    window.location.reload();
    return;
  }

  applyPrivacyConsent(next);
  if (announce) showToast(STR.settingsSaved, 'success');
}

function applyPrivacyConsent(consent) {
  window.gtag('consent', 'update', {
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  if (consent.analytics) loadGoogleAnalytics();
  if (consent.maps) {
    const holder = document.querySelector('.map-container[data-map]');
    if (holder) loadMap(holder);
  }
}

function loadGoogleAnalytics() {
  if (!GA_ALLOWED_HOSTS.has(window.location.hostname)) return;
  if (document.getElementById('google-analytics-tag')) return;

  const script = document.createElement('script');
  script.id = 'google-analytics-tag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  document.head.appendChild(script);
}

/* ----- Pomiar działań kontaktowych -----
   Mierzymy wyłącznie działania interfejsu, nie potwierdzone kontakty. Zdarzenia
   nie zawierają adresów e-mail, numerów telefonów, parametrów mailto ani danych
   wpisanych do formularza. Bez zgody lub poza produkcją nawigacja działa od razu. */
function canSendAnalyticsEvents() {
  return Boolean(
    privacyConsent?.analytics &&
    GA_ALLOWED_HOSTS.has(window.location.hostname)
  );
}

function sendAnalyticsEvent(name, parameters = {}, onComplete) {
  if (!canSendAnalyticsEvents()) return false;

  const payload = {
    ...parameters,
    page_language: (document.documentElement.lang || 'pl').slice(0, 2),
    send_to: GA_MEASUREMENT_ID
  };

  if (typeof onComplete === 'function') {
    payload.event_callback = onComplete;
    payload.event_timeout = 400;
  }

  window.gtag('event', name, payload);
  return true;
}

function navigateAfterAnalytics(name, parameters, destination) {
  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = destination;
  };

  if (!sendAnalyticsEvent(name, parameters, navigate)) {
    navigate();
    return;
  }

  // Blokada reklam lub wolny tag nie mogą zatrzymać telefonu, poczty ani CTA.
  window.setTimeout(navigate, 500);
}

function analyticsPlacement(element) {
  if (element.classList.contains('mobile-cta')) return 'mobile_floating';
  if (element.closest('.header')) return 'header';
  if (element.closest('.footer')) return 'footer';
  if (element.closest('.contact-info')) return 'contact_details';
  if (element.closest('.error-page')) return 'error_page';
  return 'content';
}

function analyticsRouteId(pathname) {
  const id = pathname
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-z0-9]+/gi, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();
  return id || 'home';
}

function analyticsTopic(value) {
  return value === 'conservation' || value === 'painting-copy'
    ? value
    : 'general';
}

function initAnalyticsEvents() {
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element
      ? event.target.closest('a[href]')
      : null;
    if (!link) return;

    const rawHref = link.getAttribute('href') || '';
    let eventName = '';
    let parameters = null;

    if (/^tel:/i.test(rawHref)) {
      const digits = rawHref.replace(/\D/g, '');
      eventName = 'contact_link_click';
      parameters = {
        contact_method: 'phone',
        contact_placement: analyticsPlacement(link),
        contact_id: digits.endsWith('502244629') ? 'secondary' : 'primary'
      };
    } else if (/^mailto:/i.test(rawHref)) {
      eventName = 'contact_link_click';
      parameters = {
        contact_method: 'email',
        contact_placement: analyticsPlacement(link),
        contact_id: 'primary'
      };
    } else if (
      link.matches('[data-analytics-cta][href], a.btn.btn--primary[href]')
    ) {
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      const sourceId = analyticsRouteId(window.location.pathname);
      const destinationId = analyticsRouteId(destination.pathname);
      eventName = 'cta_select';
      parameters = {
        cta_id: (
          link.dataset.analyticsCta || `${sourceId}_to_${destinationId}`
        ).slice(0, 100),
        cta_destination: destinationId,
        cta_placement: analyticsPlacement(link),
        contact_topic: analyticsTopic(
          link.dataset.contactTopic || destination.searchParams.get('topic')
        )
      };
    }

    if (!eventName || !parameters || !canSendAnalyticsEvents()) return;

    const sameContext = !link.hasAttribute('download') &&
      (link.getAttribute('target') || '_self').toLowerCase() === '_self';
    const plainActivation = event.button === 0 &&
      !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

    if (!sameContext || !plainActivation) {
      sendAnalyticsEvent(eventName, parameters);
      return;
    }

    event.preventDefault();
    navigateAfterAnalytics(eventName, parameters, link.href);
  });
}

function clearGoogleAnalyticsCookies() {
  const names = document.cookie.split(';')
    .map((item) => item.split('=')[0].trim())
    .filter((name) => /^(_ga|_gid|_gat|_gac_)/.test(name));
  if (!names.length) return;

  const host = window.location.hostname;
  const rootDomain = host.split('.').slice(-2).join('.');
  const domains = ['', host, `.${host}`, rootDomain, `.${rootDomain}`];
  names.forEach((name) => {
    [...new Set(domains)].forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}; SameSite=Lax`;
    });
  });
}

/* ----- Scroll to Top ----- */
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}

/* ----- Reveal Animations ----- */
function initRevealAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Domyślnie elementy są widoczne. Animację uzbrajamy dopiero, gdy wiemy, że JS
  // i IntersectionObserver działają — awaria skryptu nie może ukryć CTA ani treści.
  if (!('IntersectionObserver' in window)) {
    return;
  }

  document.documentElement.classList.add('reveal-enabled');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  // threshold 0: kluczowe dla wysokich galerii na telefonie — przy 0.15 element
  // wyższy niż ekran nigdy nie osiąga 15% widoczności i zostaje ukryty.

  elements.forEach(el => {
    // Elementy już w polu widzenia lub przewinięte powyżej — pokaż natychmiast,
    // żeby nic nie zostało ukryte (np. po odświeżeniu z zachowaną pozycją).
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

/* ----- Contact Form ----- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const RECIPIENT = 'zo.siek@interia.pl';
  prefillContactForm(form);

  /* Błędy walidacji pokazujemy przy polach (aria-invalid + aria-describedby),
     toast jest tylko podsumowaniem — komunikat nie może żyć wyłącznie 4 sekundy. */
  function setError(field, msg) {
    const wrap = field.closest('.form__group') || field.parentElement;
    let el = wrap.querySelector('.form__error');
    if (!el) {
      el = document.createElement('p');
      el.className = 'form__error';
      el.id = 'err-' + (field.name || 'pole');
      wrap.appendChild(el);
    }
    el.textContent = msg;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', el.id);
  }

  function clearError(field) {
    const wrap = field.closest('.form__group') || field.parentElement;
    const el = wrap.querySelector('.form__error');
    if (el) el.remove();
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  form.addEventListener('input', (e) => {
    if (e.target.matches('.form__input, .form__textarea, [name="consent"]')) clearError(e.target);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    // Pola wymagane (formularz ma novalidate, więc sprawdzamy ręcznie)
    const required = ['name', 'email', 'subject', 'message'];
    let firstInvalid = null;
    required.forEach((k) => {
      const field = form.elements[k];
      if (!field) return;
      if (!String(data[k] || '').trim()) {
        setError(field, STR.formRequired);
        if (!firstInvalid) firstInvalid = field;
      } else if (k === 'email' && field.validity.typeMismatch) {
        setError(field, STR.formEmail);
        if (!firstInvalid) firstInvalid = field;
      } else {
        clearError(field);
      }
    });
    const consent = form.querySelector('[name="consent"]');
    if (consent && !consent.checked) {
      setError(consent, STR.formConsent);
      if (!firstInvalid) firstInvalid = consent;
    } else if (consent) {
      clearError(consent);
    }
    if (firstInvalid) {
      showToast(STR.formFill, 'error');
      firstInvalid.focus();
      return;
    }

    // Brak backendu — składamy wiadomość i otwieramy program pocztowy gościa.
    const subject = STR.mailSubject + data.subject;
    const body =
      `${STR.mailName}: ${data.name}\n` +
      `${STR.mailEmail}: ${data.email}\n` +
      `${STR.mailPhone}: ${data.phone ? data.phone : '—'}\n\n` +
      `${data.message}\n`;
    const href =
      `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    showToast(STR.mailOpening, 'success');
    navigateAfterAnalytics('form_mailto_handoff', {
      contact_method: 'email_client',
      contact_placement: 'contact_form',
      contact_topic: form.dataset.contactTopic || 'general'
    }, href);
    // Celowo NIE czyścimy pól — jeśli program pocztowy nie wystartuje, wpisana treść nie przepada.
  });
}

function prefillContactForm(form) {
  const requestedTopic = new URLSearchParams(window.location.search).get('topic');
  const topic = analyticsTopic(requestedTopic);
  if (topic === 'general') return;
  const preset = STR.contactTopics[topic];

  form.dataset.contactTopic = topic;
  const subject = form.elements.subject;
  const message = form.elements.message;
  if (subject && !subject.value.trim()) subject.value = preset.subject;
  if (message && !message.value.trim()) message.value = preset.message;
}

/* ----- Mapa kontaktowa (mapa Google dopiero po osobnej zgodzie) -----
   Domyślnie statyczny obrazek img/mapa-kontakt.png (z naszego hostingu — zero Google,
   zero cookies) — pełnoprawna, czysta mapa. Na hover/focus przyciemnia się (scrim).
   Klik w mapę bez zgody otwiera ustawienia bez zaznaczania zgody za użytkownika. */
function initContactMap() {
  const holder = document.querySelector('.map-container[data-map]');
  if (!holder) return;

  if (privacyConsent?.maps) {
    loadMap(holder);
    return;
  }
  const placeholder = holder.querySelector('[data-load-map]');
  const coarse = window.matchMedia('(hover: none)'); // ekran dotykowy (bez kursora)

  placeholder?.addEventListener('click', (event) => {
    showToast(STR.mapNeedConsent, 'info');
    // Mobile: tap pokazuje scrim + podpowiedź (na desktopie robi to :hover)
    if (coarse.matches) placeholder.classList.add('is-revealed');
    openPrivacySettings('maps', event.currentTarget);
  });

  // Mobile: tap poza mapą chowa scrim + podpowiedź; ponowny tap w mapę znów je pokaże
  document.addEventListener('click', (e) => {
    if (placeholder && !placeholder.contains(e.target)) {
      placeholder.classList.remove('is-revealed');
    }
  });
}

function loadMap(holder) {
  if (!holder || holder.dataset.loaded) return;
  holder.dataset.loaded = '1';
  const iframe = document.createElement('iframe');
  iframe.src = holder.dataset.map;
  iframe.loading = 'lazy';
  iframe.title = STR.mapTitle;
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.setAttribute('allowfullscreen', '');
  holder.innerHTML = '';
  holder.appendChild(iframe);
}

/* ----- Toast (styl Sonner: zwijane w talię, rozwijane po najechaniu) ----- */
let toastsExpanded = false;
let toastCollapseTimer = null;

function showToast(message, type = 'info', duration = 4000) {
  let stack = document.querySelector('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    stack.setAttribute('role', 'status');
    stack.setAttribute('aria-live', 'polite');
    document.body.appendChild(stack);
    // Tap poza rozwiniętą talią → zwiń ją z powrotem (na dotyku nie ma mouseleave)
    document.addEventListener('click', (e) => {
      if (toastsExpanded && !stack.contains(e.target)) collapseToasts();
    });
  }

  // Podnieś toasty nad baner cookie, gdy jest otwarty
  const cookie = document.querySelector('.cookie-banner.visible');
  stack.style.bottom = cookie
    ? `calc(var(--space-xs) + ${cookie.offsetHeight + 12}px)`
    : '';

  const toast = document.createElement('div');
  toast.className = 'toast toast--' + type;
  toast.textContent = message;
  toast._duration = duration;
  stack.appendChild(toast);

  // Desktop: hover rozwija/zwija talię. Dotyk (brak hovera): pierwszy tap rozwija,
  // kolejny tap w kafelek go usuwa, a tap poza talią ją zwija (listener przy tworzeniu stosu).
  const coarse = window.matchMedia('(hover: none)').matches;
  toast.addEventListener('mouseenter', () => { if (!coarse) expandToasts(); });
  toast.addEventListener('mouseleave', () => { if (!coarse) scheduleCollapseToasts(); });
  toast.addEventListener('click', () => {
    if (coarse && !toastsExpanded) expandToasts();
    else removeToast(toast);
  });

  requestAnimationFrame(layoutToasts); // wjazd + przebudowa talii
  toast._timer = setTimeout(() => removeToast(toast), duration);
}

// Układa stos: zwinięty (talia) lub rozwinięty (lista). 0 = najnowszy = na wierzchu (na dole).
function layoutToasts() {
  const stack = document.querySelector('.toast-stack');
  if (!stack) return;
  const toasts = [...stack.children].filter((t) => !t._removing);
  const n = toasts.length;
  const GAP = 12, PEEK = 16, SCALE_STEP = 0.06;
  const VISIBLE = 3;       // ile kart wystaje w zwiniętej talii
  const VISIBLE_OPEN = 5;  // ile najnowszych pokazujemy po rozwinięciu

  let offset = 0;
  for (let front = 0; front < n; front++) {
    const t = toasts[n - 1 - front];
    if (toastsExpanded) {
      if (front < VISIBLE_OPEN) {
        t.style.transform = `translateY(${-offset}px) scale(1)`;
        t.style.opacity = '1';
        offset += t.offsetHeight + GAP;
      } else {
        t.style.transform = `translateY(${-offset}px) scale(0.96)`;
        t.style.opacity = '0';
      }
    } else {
      const scale = Math.max(0, 1 - front * SCALE_STEP);
      t.style.transform = `translateY(${-front * PEEK}px) scale(${scale})`;
      t.style.opacity = front < VISIBLE ? '1' : '0';
    }
    t.style.zIndex = String(1000 - front);
  }
}

function removeToast(toast) {
  if (!toast || toast._removing) return;
  toast._removing = true;
  clearTimeout(toast._timer);
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(16px) scale(0.9)';
  layoutToasts();
  setTimeout(() => toast.remove(), 300);
}

function expandToasts() {
  clearTimeout(toastCollapseTimer);
  if (toastsExpanded) return;
  toastsExpanded = true;
  document.querySelectorAll('.toast').forEach((t) => clearTimeout(t._timer)); // pauza autoznikania
  layoutToasts();
}

function collapseToasts() {
  clearTimeout(toastCollapseTimer);
  if (!toastsExpanded) return;
  toastsExpanded = false;
  document.querySelectorAll('.toast').forEach((t) => {
    if (!t._removing) t._timer = setTimeout(() => removeToast(t), t._duration || 4000);
  });
  layoutToasts();
}

function scheduleCollapseToasts() {
  clearTimeout(toastCollapseTimer);
  toastCollapseTimer = setTimeout(collapseToasts, 140);
}

/* ----- Hero Slider ----- */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.hero-slider__slide')];
  if (slides.length < 2) return;

  const delay = parseInt(slider.dataset.autoplay, 10) || 6000;
  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) index = 0;
  let timer = null;
  let timerRun = 0;
  let navigationRequest = 0;
  let hoverPaused = false;
  let warmTimer = null;

  // WCAG 2.2.2: autoodtwarzanie musi dać się zatrzymać — służy do tego przycisk
  // pauzy poniżej. Pokaz startuje SAM przy każdym wejściu/odświeżeniu. Przy
  // preferencji redukcji ruchu globalny CSS skraca przenikanie do ~0 ms, więc
  // slajdy przełączają się bez animacji (treść leci, ruchu brak).
  let userPaused = false;

  slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
  });

  function waitForImage(image) {
    if (!image) return Promise.resolve(false);

    const decode = () => {
      if (!image.naturalWidth) return Promise.resolve(false);
      if (typeof image.decode !== 'function') return Promise.resolve(true);
      return image.decode().then(() => true, () => Boolean(image.naturalWidth));
    };

    if (image.complete) return decode();
    return new Promise((resolve) => {
      image.addEventListener('load', () => { decode().then(resolve); }, { once: true });
      image.addEventListener('error', () => resolve(false), { once: true });
    });
  }

  function ensureSlideLoaded(slide) {
    if (slide._heroLoadPromise) return slide._heroLoadPromise;

    let image = slide.querySelector('.hero-slider__image');
    if (image) {
      slide._heroLoadPromise = waitForImage(image);
      return slide._heroLoadPromise;
    }

    const template = slide.querySelector('template');
    if (!template) return Promise.resolve(false);

    const fragment = template.content.cloneNode(true);
    image = fragment.querySelector('.hero-slider__image');
    slide.appendChild(fragment);
    template.remove();
    const ready = waitForImage(image);
    slide._heroLoadPromise = ready;
    return ready;
  }

  const ICON_PAUSE = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="2.5" y="1.5" width="4" height="13" rx="1"/><rect x="9.5" y="1.5" width="4" height="13" rx="1"/></svg>';
  const ICON_PLAY = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 1.5l11 6.5-11 6.5z"/></svg>';

  const dots = document.createElement('div');
  dots.className = 'hero-slider__dots';

  const pauseBtn = document.createElement('button');
  pauseBtn.type = 'button';
  pauseBtn.className = 'hero-slider__pause';
  function updatePauseBtn() {
    pauseBtn.innerHTML = userPaused ? ICON_PLAY : ICON_PAUSE;
    pauseBtn.setAttribute('aria-label', userPaused ? STR.sliderPlay : STR.sliderPause);
  }
  updatePauseBtn();
  pauseBtn.addEventListener('click', () => {
    userPaused = !userPaused;
    userPaused ? stop() : start();
    updatePauseBtn();
  });
  dots.appendChild(pauseBtn);

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-slider__dot' + (i === index ? ' is-active' : '');
    dot.setAttribute('aria-label', `${STR.slide} ${i + 1}`);
    if (i === index) dot.setAttribute('aria-current', 'true');
    dot.addEventListener('click', async () => {
      stop();
      await go(i);
      start();
    });
    dots.appendChild(dot);
  });
  slider.appendChild(dots);

  const dotEls = () => [...dots.querySelectorAll('.hero-slider__dot')];

  async function go(i, shouldCommit = () => true) {
    const target = (i + slides.length) % slides.length;
    const request = ++navigationRequest;
    if (target === index) return true;

    const ready = await ensureSlideLoaded(slides[target]);
    if (!ready || request !== navigationRequest || !shouldCommit()) return false;

    const dl = dotEls();
    slides[index].classList.remove('is-active');
    slides[index].setAttribute('aria-hidden', 'true');
    dl[index].classList.remove('is-active');
    dl[index].removeAttribute('aria-current');
    index = target;
    slides[index].classList.add('is-active');
    slides[index].setAttribute('aria-hidden', 'false');
    dl[index].classList.add('is-active');
    dl[index].setAttribute('aria-current', 'true');
    scheduleWarmNext();
    return true;
  }

  function canAutoplay() {
    return !userPaused && !hoverPaused && !document.hidden;
  }

  function stop() {
    clearTimeout(timer);
    timer = null;
    timerRun += 1;
  }

  function start() {
    stop();
    if (!canAutoplay()) return;

    const run = timerRun;
    timer = setTimeout(async () => {
      timer = null;
      const moved = await go(index + 1, () => run === timerRun && canAutoplay());
      if (run === timerRun && canAutoplay()) {
        if (!moved) navigationRequest += 1;
        start();
      }
    }, delay);
  }

  function scheduleWarmNext() {
    clearTimeout(warmTimer);
    warmTimer = setTimeout(() => {
      const warm = () => { void ensureSlideLoaded(slides[(index + 1) % slides.length]); };
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(warm, { timeout: 1200 });
      } else {
        warm();
      }
    }, 900);
  }

  slider.addEventListener('mouseenter', () => {
    hoverPaused = true;
    stop();
  });
  slider.addEventListener('mouseleave', () => {
    hoverPaused = false;
    start();
  });
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });

  void ensureSlideLoaded(slides[index]);
  if (document.readyState === 'complete') {
    scheduleWarmNext();
  } else {
    window.addEventListener('load', scheduleWarmNext, { once: true });
  }
  start();
}

/* ----- Lightbox (galerie + podgalerie) -----
   Natywny <dialog> + showModal(): focus-trap, Escape, inert tła i przywrócenie
   fokusu na kafelek po zamknięciu robi przeglądarka. */
function initLightbox() {
  const triggers = [...document.querySelectorAll('.gallery-item[data-images]')];
  if (!triggers.length) return;

  // Build overlay once
  const box = document.createElement('dialog');
  box.className = 'lightbox';
  box.setAttribute('aria-label', STR.lightbox);
  box.innerHTML = `
    <button class="lightbox__close" aria-label="${STR.close}">&times;</button>
    <figure class="lightbox__stage">
      <div class="lightbox__viewport">
        <button class="lightbox__nav lightbox__nav--prev" aria-label="${STR.prev}">&#8249;</button>
        <div class="lightbox__track">
          <div class="lightbox__slide" aria-hidden="true"><img class="lightbox__img" src="" alt="" draggable="false"></div>
          <div class="lightbox__slide"><img class="lightbox__img" src="" alt="" draggable="false"></div>
          <div class="lightbox__slide" aria-hidden="true"><img class="lightbox__img" src="" alt="" draggable="false"></div>
        </div>
        <button class="lightbox__nav lightbox__nav--next" aria-label="${STR.next}">&#8250;</button>
      </div>
      <div class="lightbox__filmstrip-shell">
        <div class="lightbox__filmstrip" role="group" aria-label="${STR.lightbox}"></div>
      </div>
      <figcaption class="lightbox__caption"></figcaption>
      <span class="lightbox__counter" aria-live="polite" aria-atomic="true"></span>
    </figure>`;
  document.body.appendChild(box);

  const viewport = box.querySelector('.lightbox__viewport');
  const track = box.querySelector('.lightbox__track');
  const filmstripShell = box.querySelector('.lightbox__filmstrip-shell');
  const filmstrip = box.querySelector('.lightbox__filmstrip');
  const filmReel = document.createElement('div');
  filmReel.className = 'lightbox__film-reel';
  const thumbWindow = document.createElement('span');
  thumbWindow.className = 'lightbox__thumb-window';
  thumbWindow.setAttribute('aria-hidden', 'true');
  filmstrip.appendChild(filmReel);
  const slideEls = [...box.querySelectorAll('.lightbox__slide')];
  const imageEls = slideEls.map(slide => slide.querySelector('.lightbox__img'));
  const capEl = box.querySelector('.lightbox__caption');
  const countEl = box.querySelector('.lightbox__counter');
  const navButtons = [...box.querySelectorAll('.lightbox__nav')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const imageReady = new Map();
  let slides = [];
  let pos = 0;
  let animating = false;
  let queuedNavigation = null;
  let sessionToken = 0;
  let drag = null;
  let thumbButtons = [];
  let journeyTrack = null;
  let thumbWindowSyncFrame = 0;
  let filmstripScrollFrame = 0;
  let filmstripCueFrame = 0;

  const wrap = index => (index + slides.length) % slides.length;
  const centerTrack = () => {
    track.classList.remove('is-animated', 'is-snapping');
    track.style.transform = 'translate3d(-100%, 0, 0)';
    track.style.removeProperty('--lightbox-slide-duration');
    track.style.removeProperty('--lightbox-slide-easing');
  };

  function updateFilmstripCues() {
    filmstripCueFrame = 0;
    if (!box.open || filmstrip.hidden) {
      filmstripShell.classList.remove('can-scroll-left', 'can-scroll-right');
      return;
    }

    const maxScroll = Math.max(0, filmstrip.scrollWidth - filmstrip.clientWidth);
    const edgeTolerance = 2;
    filmstripShell.classList.toggle(
      'can-scroll-left',
      maxScroll > edgeTolerance && filmstrip.scrollLeft > edgeTolerance
    );
    filmstripShell.classList.toggle(
      'can-scroll-right',
      maxScroll > edgeTolerance && filmstrip.scrollLeft < maxScroll - edgeTolerance
    );
  }

  function scheduleFilmstripCues() {
    if (filmstripCueFrame) return;
    filmstripCueFrame = requestAnimationFrame(updateFilmstripCues);
  }

  function clearFilmstripCues() {
    window.cancelAnimationFrame(filmstripCueFrame);
    filmstripCueFrame = 0;
    filmstripShell.classList.remove('can-scroll-left', 'can-scroll-right');
  }

  function preloadImage(src) {
    if (imageReady.has(src)) return imageReady.get(src);

    const ready = new Promise(resolve => {
      const image = new Image();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (typeof image.decode === 'function') {
          image.decode().catch(() => {}).finally(resolve);
        } else {
          resolve();
        }
      };
      image.addEventListener('load', finish, { once: true });
      image.addEventListener('error', finish, { once: true });
      image.src = src;
      if (image.complete) finish();
    });

    imageReady.set(src, ready);
    return ready;
  }

  function preloadNeighbours() {
    if (slides.length < 2) return;
    void preloadImage(slides[wrap(pos - 1)].src);
    void preloadImage(slides[wrap(pos + 1)].src);
  }

  function renderSlot(slot, slideIndex, isCurrent) {
    const slideEl = slideEls[slot];
    const imageEl = imageEls[slot];
    const slide = slides[slideIndex];
    if (imageEl.getAttribute('src') !== slide.src) imageEl.src = slide.src;

    if (isCurrent) {
      slideEl.removeAttribute('aria-hidden');
      imageEl.alt = slide.title || '';
    } else {
      slideEl.setAttribute('aria-hidden', 'true');
      imageEl.alt = '';
    }
  }

  function renderSlots() {
    renderSlot(0, wrap(pos - 1), false);
    renderSlot(1, pos, true);
    renderSlot(2, wrap(pos + 1), false);
  }

  function stopThumbWindowMotion() {
    window.cancelAnimationFrame(thumbWindowSyncFrame);
    window.cancelAnimationFrame(filmstripScrollFrame);
    thumbWindowSyncFrame = 0;
    filmstripScrollFrame = 0;
    thumbWindow.classList.remove('is-animated');
    filmstrip.classList.remove('is-window-travelling');
    thumbButtons.forEach((button, index) => {
      if (index === pos) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  }

  function setThumbWindowGeometry(index) {
    const button = thumbButtons[index];
    if (!button || !button.offsetWidth) return false;

    thumbWindow.style.width = `${button.offsetWidth}px`;
    thumbWindow.style.height = `${button.offsetHeight}px`;
    thumbWindow.style.transform =
      `translate3d(${button.offsetLeft}px, ${button.offsetTop}px, 0)`;
    thumbWindow.classList.add('is-ready');
    return true;
  }

  function syncThumbWindow(index = pos) {
    stopThumbWindowMotion();
    thumbWindowSyncFrame = requestAnimationFrame(() => {
      thumbWindowSyncFrame = 0;
      if (!box.open || !setThumbWindowGeometry(index)) return;
    });
  }

  function animateFilmstripProgress(fromIndex, targetIndex, targetButton, duration) {
    const maxScroll = Math.max(0, filmstrip.scrollWidth - filmstrip.clientWidth);
    const targetScroll = Math.max(
      0,
      Math.min(
        maxScroll,
        targetButton.offsetLeft - (filmstrip.clientWidth - targetButton.offsetWidth) / 2
      )
    );
    const startScroll = filmstrip.scrollLeft;
    const scrollDistance = targetScroll - startScroll;
    let visibleIndex = fromIndex;

    const startedAt = performance.now();
    const step = now => {
      if (!filmstrip.classList.contains('is-window-travelling')) return;
      const progress = Math.min(1, (now - startedAt) / duration);
      filmstrip.scrollLeft = startScroll + scrollDistance * progress;

      const nextVisibleIndex = Math.round(
        fromIndex + (targetIndex - fromIndex) * progress
      );
      if (nextVisibleIndex !== visibleIndex) {
        visibleIndex = nextVisibleIndex;
        thumbButtons.forEach((button, index) => {
          if (index === visibleIndex) {
            button.setAttribute('aria-current', 'true');
          } else {
            button.removeAttribute('aria-current');
          }
        });
      }

      if (progress < 1) {
        filmstripScrollFrame = requestAnimationFrame(step);
      } else {
        filmstripScrollFrame = 0;
      }
    };
    filmstripScrollFrame = requestAnimationFrame(step);
  }

  function animateThumbWindow(fromIndex, targetIndex, duration, easing = 'linear') {
    const targetButton = thumbButtons[targetIndex];
    if (!targetButton || filmstrip.hidden) return;

    stopThumbWindowMotion();
    if (!setThumbWindowGeometry(fromIndex)) return;
    void thumbWindow.offsetWidth;

    thumbWindow.style.setProperty('--lightbox-window-duration', `${duration}ms`);
    thumbWindow.style.setProperty('--lightbox-window-easing', easing);
    thumbWindow.classList.add('is-animated');
    filmstrip.classList.add('is-window-travelling');
    setThumbWindowGeometry(targetIndex);
    animateFilmstripProgress(fromIndex, targetIndex, targetButton, duration);
  }

  function centerActiveThumbnail(behavior = 'auto') {
    const active = thumbButtons[pos];
    if (!active || filmstrip.hidden) return;

    requestAnimationFrame(() => {
      if (!box.open || thumbButtons[pos] !== active) return;
      const left = active.offsetLeft - (filmstrip.clientWidth - active.offsetWidth) / 2;
      filmstrip.scrollTo({
        left: Math.max(0, left),
        behavior: reduceMotion.matches ? 'auto' : behavior
      });
    });
  }

  function updateFilmstrip(behavior = 'auto', shouldCenter = true) {
    thumbButtons.forEach((button, index) => {
      if (index === pos) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
    syncThumbWindow(pos);
    if (shouldCenter) centerActiveThumbnail(behavior);
  }

  function buildFilmstrip() {
    const fragment = document.createDocumentFragment();
    thumbButtons = slides.map((slide, index) => {
      const button = document.createElement('button');
      const image = new Image();
      button.type = 'button';
      button.className = 'lightbox__thumb';
      button.setAttribute(
        'aria-label',
        `${STR.slide} ${index + 1}${slide.title ? `: ${slide.title}` : ''}`
      );
      image.src = slide.src;
      image.alt = '';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      button.appendChild(image);
      button.addEventListener('click', () => { void goTo(index); });
      fragment.appendChild(button);
      return button;
    });

    thumbWindow.classList.remove('is-ready', 'is-animated');
    thumbWindow.removeAttribute('style');
    filmReel.replaceChildren(fragment, thumbWindow);
    filmstrip.scrollLeft = 0;
    filmstrip.hidden = slides.length < 2;
    filmstripShell.hidden = slides.length < 2;
    clearFilmstripCues();
    box.classList.toggle('has-filmstrip', slides.length > 1);
  }

  function updateMeta() {
    const s = slides[pos];
    capEl.textContent = s.meta ? `${s.title} — ${s.meta}` : (s.title || '');
    countEl.textContent = slides.length > 1 ? `${pos + 1} / ${slides.length}` : '';
  }

  function render(thumbnailBehavior = 'auto', centerThumbnail = true) {
    renderSlots();
    updateMeta();
    updateFilmstrip(thumbnailBehavior, centerThumbnail);
    navButtons.forEach(button => {
      button.style.display = slides.length > 1 ? '' : 'none';
    });
    preloadNeighbours();
  }

  function waitForTrackTransition(duration = 280) {
    return waitForTransformTransition(track, duration);
  }

  function waitForTransformTransition(element, duration) {
    return new Promise(resolve => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(timeout);
        element.removeEventListener('transitionend', onEnd);
        element.removeEventListener('transitioncancel', onCancel);
        resolve();
      };
      const onEnd = event => {
        if (event.target === element && event.propertyName === 'transform') finish();
      };
      const onCancel = event => {
        if (event.target === element && event.propertyName === 'transform') finish();
      };
      const timeout = window.setTimeout(finish, duration + 160);
      element.addEventListener('transitionend', onEnd);
      element.addEventListener('transitioncancel', onCancel);
    });
  }

  function waitForImageDecode(image) {
    if (!image) return Promise.resolve();
    if (typeof image.decode === 'function') {
      return image.decode().catch(() => {});
    }
    if (image.complete) return Promise.resolve();

    return new Promise(resolve => {
      const finish = () => resolve();
      image.addEventListener('load', finish, { once: true });
      image.addEventListener('error', finish, { once: true });
    });
  }

  function waitForPaint() {
    return new Promise(resolve => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
  }

  function cleanupJourney(element = journeyTrack) {
    if (!element) return;
    element.remove();

    if (journeyTrack === element) {
      journeyTrack = null;
      track.classList.remove('is-obscured');
    }
  }

  function runQueuedNavigation() {
    const queued = queuedNavigation;
    queuedNavigation = null;
    if (!queued) return;

    requestAnimationFrame(() => {
      if (queued.type === 'absolute') {
        void goTo(queued.index);
      } else {
        const steps = queued.steps;
        const rawTarget = pos + steps;

        if (rawTarget >= 0 && rawTarget < slides.length && Math.abs(steps) > 1) {
          void rollTo(rawTarget);
        } else {
          const direction = steps < 0 ? -1 : 1;
          const remainingSteps = steps - direction;
          if (remainingSteps) {
            queuedNavigation = { type: 'relative', steps: remainingSteps };
          }
          void move(direction);
        }
      }
    });
  }

  function commitMove(
    targetPosition,
    thumbnailBehavior = 'smooth',
    centerThumbnail = true
  ) {
    pos = targetPosition;
    centerTrack();
    render(thumbnailBehavior, centerThumbnail);
  }

  async function animateStep(
    targetPosition,
    direction,
    {
      duration = 280,
      easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
      thumbnailBehavior = 'smooth',
      centerThumbnail = true
    } = {}
  ) {
    const token = sessionToken;
    await preloadImage(slides[targetPosition].src);

    if (token !== sessionToken || !box.open) return false;

    if (reduceMotion.matches) {
      commitMove(targetPosition, 'auto', centerThumbnail);
      return true;
    }

    renderSlot(direction > 0 ? 2 : 0, targetPosition, false);
    track.style.setProperty('--lightbox-slide-duration', `${duration}ms`);
    track.style.setProperty('--lightbox-slide-easing', easing);
    track.classList.remove('is-snapping');
    track.classList.add('is-animated');
    void track.offsetWidth;
    if (Math.abs(targetPosition - pos) === 1) {
      animateThumbWindow(pos, targetPosition, duration, easing);
    }
    track.style.transform = direction > 0
      ? 'translate3d(-200%, 0, 0)'
      : 'translate3d(0, 0, 0)';

    await waitForTrackTransition(duration);
    if (token !== sessionToken || !box.open) return false;

    commitMove(targetPosition, thumbnailBehavior, centerThumbnail);
    return true;
  }

  async function navigateTo(targetPosition, direction) {
    if (drag) clearDrag(true);
    animating = true;
    const completed = await animateStep(targetPosition, direction);
    if (!completed) return;

    animating = false;
    runQueuedNavigation();
  }

  function move(direction) {
    if (!box.open || slides.length < 2) return;
    const normalizedDirection = direction < 0 ? -1 : 1;

    if (animating) {
      if (queuedNavigation?.type === 'absolute') {
        queuedNavigation.index = wrap(queuedNavigation.index + normalizedDirection);
      } else {
        const steps = (queuedNavigation?.steps || 0) + normalizedDirection;
        queuedNavigation = steps ? { type: 'relative', steps } : null;
      }
      return;
    }

    void navigateTo(wrap(pos + normalizedDirection), normalizedDirection);
  }

  async function rollTo(targetPosition) {
    if (drag) clearDrag(true);
    animating = true;
    const token = sessionToken;
    const startPosition = pos;
    const distance = Math.abs(targetPosition - startPosition);
    const firstPosition = Math.min(startPosition, targetPosition);
    const path = Array.from(
      { length: distance + 1 },
      (_, index) => firstPosition + index
    );

    if (reduceMotion.matches) {
      await preloadImage(slides[targetPosition].src);
      if (token !== sessionToken || !box.open) return;
      commitMove(targetPosition, 'auto', true);
      animating = false;
      runQueuedNavigation();
      return;
    }

    await Promise.all(path.map(index => preloadImage(slides[index].src)));
    if (token !== sessionToken || !box.open) return;

    if (distance === 1) {
      const completed = await animateStep(
        targetPosition,
        targetPosition > startPosition ? 1 : -1
      );
      if (!completed) return;
      animating = false;
      runQueuedNavigation();
      return;
    }

    const element = document.createElement('div');
    const startSlot = path.indexOf(startPosition);
    const targetSlot = path.indexOf(targetPosition);
    const durationPerSlide = window.matchMedia('(max-width: 600px)').matches
      ? 100
      : 110;
    const duration = distance * durationPerSlide;
    element.className = 'lightbox__journey-track';
    element.setAttribute('aria-hidden', 'true');
    element.style.setProperty('--lightbox-journey-duration', `${duration}ms`);
    element.style.transform = `translate3d(${-startSlot * 100}%, 0, 0)`;
    element.style.visibility = 'hidden';

    const fragment = document.createDocumentFragment();
    const journeyImages = [];
    path.forEach(index => {
      const slide = document.createElement('div');
      const image = new Image();
      slide.className = 'lightbox__journey-slide';
      image.className = 'lightbox__img';
      image.src = slides[index].src;
      image.alt = '';
      image.draggable = false;
      journeyImages.push(image);
      slide.appendChild(image);
      fragment.appendChild(slide);
    });
    element.appendChild(fragment);

    journeyTrack = element;
    viewport.appendChild(element);

    await Promise.all(journeyImages.map(image => (
      typeof image.decode === 'function' ? image.decode().catch(() => {}) : Promise.resolve()
    )));
    if (token !== sessionToken || !box.open || journeyTrack !== element) {
      cleanupJourney(element);
      return;
    }

    element.style.visibility = '';
    track.classList.add('is-obscured');
    countEl.setAttribute('aria-live', 'off');

    await waitForPaint();
    if (token !== sessionToken || !box.open || journeyTrack !== element) {
      cleanupJourney(element);
      return;
    }

    element.classList.add('is-animated');
    animateThumbWindow(startPosition, targetPosition, duration, 'linear');
    element.style.transform = `translate3d(${-targetSlot * 100}%, 0, 0)`;

    await waitForTransformTransition(element, duration);
    if (token !== sessionToken || !box.open || journeyTrack !== element) {
      cleanupJourney(element);
      return;
    }

    pos = targetPosition;
    countEl.setAttribute('aria-live', 'polite');
    centerTrack();
    render('smooth', true);

    // The journey layer still covers the viewport while the real centre slot
    // receives and decodes the target image. Revealing that slot immediately
    // can briefly expose its previous bitmap on some browsers.
    await waitForImageDecode(imageEls[1]);
    if (token !== sessionToken || !box.open || journeyTrack !== element) {
      cleanupJourney(element);
      return;
    }

    // Paint the prepared base track behind the journey layer, then remove the
    // covering layer only after the browser has committed the target frame.
    track.classList.remove('is-obscured');
    await waitForPaint();
    if (token !== sessionToken || !box.open || journeyTrack !== element) {
      cleanupJourney(element);
      return;
    }

    cleanupJourney(element);
    animating = false;
    runQueuedNavigation();
  }

  function goTo(index) {
    if (!box.open || slides.length < 2) return;
    const targetPosition = wrap(index);

    if (targetPosition === pos) {
      centerActiveThumbnail('smooth');
      return;
    }

    if (animating) {
      queuedNavigation = { type: 'absolute', index: targetPosition };
      return;
    }

    void rollTo(targetPosition);
  }

  async function snapTrackBack() {
    if (reduceMotion.matches) {
      centerTrack();
      return;
    }

    animating = true;
    const token = sessionToken;
    track.classList.add('is-animated', 'is-snapping');
    void track.offsetWidth;
    track.style.transform = 'translate3d(-100%, 0, 0)';
    await waitForTrackTransition(180);

    if (token !== sessionToken || !box.open) return;
    centerTrack();
    animating = false;
    runQueuedNavigation();
  }

  function clearDrag(resetTrack) {
    if (!drag) return;
    const queuedGesture = drag.queued;
    try {
      if (viewport.hasPointerCapture(drag.id)) viewport.releasePointerCapture(drag.id);
    } catch (error) {}
    drag = null;
    viewport.classList.remove('is-dragging');
    if (resetTrack && !queuedGesture) centerTrack();
  }

  function open(list, start) {
    sessionToken += 1;
    stopThumbWindowMotion();
    cleanupJourney();
    slides = list;
    pos = (start + slides.length) % slides.length;
    animating = false;
    queuedNavigation = null;
    clearDrag(false);
    centerTrack();
    countEl.setAttribute('aria-live', 'polite');
    buildFilmstrip();
    render();
    document.body.style.overflow = 'hidden';
    box.showModal();
    scheduleFilmstripCues();
  }

  function close() { box.close(); }

  // 'close' łapie każdą drogę zamknięcia (przycisk, backdrop, Escape)
  box.addEventListener('close', () => {
    sessionToken += 1;
    stopThumbWindowMotion();
    cleanupJourney();
    animating = false;
    queuedNavigation = null;
    clearDrag(false);
    clearFilmstripCues();
    centerTrack();
    countEl.setAttribute('aria-live', 'polite');
    document.body.style.overflow = '';
  });

  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && !event.isPrimary) {
      clearDrag(true);
      return;
    }
    if (
      event.pointerType !== 'touch' ||
      !event.isPrimary ||
      slides.length < 2
    ) return;

    drag = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastTime: performance.now(),
      deltaX: 0,
      velocity: 0,
      horizontal: false,
      queued: animating
    };
  });

  viewport.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;

    if (!drag.horizontal) {
      if (Math.hypot(deltaX, deltaY) < 10) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        clearDrag(false);
        return;
      }
      drag.horizontal = true;
      viewport.classList.add('is-dragging');
      try { viewport.setPointerCapture(event.pointerId); } catch (error) {}
    }

    if (event.cancelable) event.preventDefault();
    const now = performance.now();
    const elapsed = Math.max(1, now - drag.lastTime);
    drag.velocity = (event.clientX - drag.lastX) / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    drag.deltaX = Math.max(-viewport.clientWidth, Math.min(viewport.clientWidth, deltaX));
    if (drag.queued) return;
    track.classList.remove('is-animated', 'is-snapping');
    track.style.transform = `translate3d(calc(-100% + ${drag.deltaX}px), 0, 0)`;
  }, { passive: false });

  viewport.addEventListener('pointerup', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const completedDrag = drag;
    const width = Math.max(1, viewport.clientWidth);
    const distanceEnough = Math.abs(completedDrag.deltaX) >= width * 0.18;
    const velocityEnough =
      Math.abs(completedDrag.deltaX) >= 24 &&
      Math.abs(completedDrag.velocity) >= 0.45;
    const shouldMove = completedDrag.horizontal && (distanceEnough || velocityEnough);
    const direction = completedDrag.deltaX < 0 ? 1 : -1;
    clearDrag(false);

    if (shouldMove) {
      void move(direction);
    } else if (completedDrag.horizontal && !completedDrag.queued) {
      void snapTrackBack();
    }
  });

  viewport.addEventListener('pointercancel', event => {
    if (!drag || event.pointerId !== drag.id) return;
    clearDrag(true);
  });

  triggers.forEach(item => {
    item.addEventListener('click', () => {
      const imgs = item.dataset.images.split('|').filter(Boolean);
      if (imgs.length > 1) {
        // podgaleria danego obiektu
        open(imgs.map(src => ({ src, title: item.dataset.title, meta: item.dataset.meta })), 0);
      } else {
        // pojedyncze kafelki — przegląd całej siatki
        const grid = item.closest('.gallery-grid') || document;
        const sib = [...grid.querySelectorAll('.gallery-item[data-images]')];
        const list = sib.map(el => ({
          src: el.dataset.images.split('|')[0],
          title: el.dataset.title, meta: el.dataset.meta
        }));
        open(list, sib.indexOf(item));
      }
    });
  });

  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__nav--prev').addEventListener('click', () => { void move(-1); });
  box.querySelector('.lightbox__nav--next').addEventListener('click', () => { void move(1); });
  box.addEventListener('click', e => { if (e.target === box) close(); });
  filmstrip.addEventListener('scroll', scheduleFilmstripCues, { passive: true });
  window.addEventListener('resize', () => {
    if (!box.open || animating) return;
    syncThumbWindow(pos);
    centerActiveThumbnail('auto');
    scheduleFilmstripCues();
  });
  document.addEventListener('keydown', e => {
    if (!box.open) return; // Escape obsługuje natywny <dialog>
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      void move(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      void move(1);
    }
  });

}

/* ----- FAQ: płynne rozwijanie natywnego <details> ----- */
function initFaqAccordions() {
  const items = [...document.querySelectorAll('details.faq-item')];
  if (!items.length || typeof Element.prototype.animate !== 'function') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  items.forEach(item => {
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq-item__answer');
    if (!summary || !answer) return;

    let animation = null;
    let direction = null;

    const finish = open => {
      const completedAnimation = animation;
      item.open = open;
      item.style.removeProperty('height');
      item.style.removeProperty('overflow');
      item.classList.remove('faq-item--closing');
      animation = null;
      direction = null;
      if (completedAnimation) completedAnimation.cancel();
    };

    const handleMotionPreference = event => {
      if (event.matches && animation) finish(direction === 'opening');
    };
    if (typeof reduceMotion.addEventListener === 'function') {
      reduceMotion.addEventListener('change', handleMotionPreference);
    } else {
      reduceMotion.addListener(handleMotionPreference);
    }

    summary.addEventListener('click', event => {
      if (reduceMotion.matches) return;

      event.preventDefault();

      const opening = !item.open || direction === 'closing';
      const startHeight = item.getBoundingClientRect().height;
      item.classList.toggle('faq-item--closing', !opening);

      if (animation) {
        animation.onfinish = null;
        animation.cancel();
      }

      item.style.height = `${startHeight}px`;
      item.style.overflow = 'hidden';

      let endHeight;
      if (opening) {
        item.open = true;
        item.style.removeProperty('height');
        endHeight = item.getBoundingClientRect().height;
        item.style.height = `${startHeight}px`;
        direction = 'opening';
      } else {
        const borderHeight = item.offsetHeight - item.clientHeight;
        endHeight = summary.getBoundingClientRect().height + borderHeight;
        direction = 'closing';
      }

      animation = item.animate(
        { height: [`${startHeight}px`, `${endHeight}px`] },
        {
          duration: 260,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'both'
        }
      );
      animation.onfinish = () => finish(opening);
    });
  });
}

/* ----- Rozwijany tekst ----- */
function initExpandable() {
  document.querySelectorAll('.expandable').forEach(box => {
    const toggle = box.querySelector('.expandable__toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const open = box.classList.toggle('is-open');
      toggle.textContent = open ? STR.collapse : STR.readMore;
    });
  });
}

/* ============================================================
   Wyszukiwarka
   Indeks (js/search-index.json) generuje tools/build-search-index.mjs.
   Pobieramy go dopiero przy pierwszym otwarciu okna, więc zwykłe wejście
   na stronę nie płaci za wyszukiwarkę ani bajta.
   ============================================================ */

/* Adresy wyszukiwarki liczymy od ŚCIEŻKI TEGO SKRYPTU, nie od korzenia domeny.
   `resolveSiteUrl()` wymusza adres od korzenia origin — na stronie serwowanej
   z podkatalogu (podgląd GitHub Pages) dawało to 404 na indeksie oraz złe
   adresy wyników i miniatur. main.js leży w <korzeń>/js/, więc korzeń strony
   to katalog wyżej — i to działa niezależnie od miejsca wdrożenia. */
const SEARCH_PATHS = (function () {
  const script = document.currentScript || document.querySelector('script[src*="main.js"]');
  const src = (script && script.src) || '';
  try {
    return {
      index: new URL('search-index.json', src).href,
      root: new URL('../', src).href
    };
  } catch (error) {
    return { index: 'js/search-index.json', root: '' };
  }
})();

function searchUrl(path) {
  try {
    return new URL(path, SEARCH_PATHS.root).href;
  } catch (error) {
    return path;
  }
}

const SEARCH_MAX_RESULTS = 10;
const SEARCH_SUGGESTIONS = 6;
/* Przewaga typów treści: „Klimt" ma dawać obraz, a nie stronę kontaktową. */
const SEARCH_KIND_BOOST = { copy: 14, conservation: 10, service: 8, info: 0 };

let searchIndexPromise = null;

/* Składanie znaków do porównań — „Pocałunek" i „pocalunek" to ma być to samo.
   Uwaga: „ł" NIE rozkłada się w NFD, więc wymaga osobnej podmianki. */
function foldText(value) {
  return String(value)
    .toLowerCase()
    .replace(/ł/g, 'l')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/* Musi dawać ten sam wynik co slugify() w tools/build-search-index.mjs —
   inaczej odnośnik ?work= nie trafi w pracę na stronie konserwacji. */
function slugify(value) {
  return foldText(value).replace(/ /g, '-');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = fetch(SEARCH_PATHS.index, { credentials: 'same-origin' })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(data => (data[SITE_LANG] || data.pl || []).map((entry, order) => ({
        ...entry,
        _o: order, // kolejność z indeksu jest kuratorska — rozstrzyga remisy punktowe
        _t: foldText(entry.t),
        _s: foldText(entry.s || ''),
        _k: foldText(entry.k || ''),
        _u: foldText(entry.u || '')
      })))
      .catch(error => {
        searchIndexPromise = null; // pozwól spróbować ponownie przy kolejnym otwarciu
        throw error;
      });
  }
  return searchIndexPromise;
}

/* Trafienie na początku słowa liczy się mocniej niż w środku:
   „mona" ma wygrać z przypadkowym fragmentem w opisie. */
function matchScore(haystack, token, strong, weak) {
  const at = haystack.indexOf(token);
  if (at < 0) return 0;
  return (at === 0 || haystack[at - 1] === ' ') ? strong : weak;
}

function scoreSearchEntry(entry, tokens) {
  let total = 0;
  for (const token of tokens) {
    const best = Math.max(
      matchScore(entry._t, token, 100, 45),
      matchScore(entry._s, token, 60, 30),
      matchScore(entry._k, token, 40, 20),
      matchScore(entry._u, token, 25, 10)
    );
    if (!best) return 0; // każdy człon zapytania musi trafić
    total += best;
  }
  return total + (SEARCH_KIND_BOOST[entry.c] || 0);
}

function searchEntries(entries, query) {
  const folded = foldText(query);
  if (!folded) return [];
  const tokens = folded.split(' ');
  const scored = [];

  for (const entry of entries) {
    let score = scoreSearchEntry(entry, tokens);
    if (!score) continue;
    if (entry._t === folded) score += 60;
    else if (entry._t.startsWith(folded)) score += 20;
    scored.push({ entry, score });
  }

  // Przy równych punktach wygrywa wcześniejszy wpis indeksu (Pocałunek przed Kościołem w Cassone).
  scored.sort((a, b) => b.score - a.score || a.entry._o - b.entry._o);
  return scored.slice(0, SEARCH_MAX_RESULTS).map(item => item.entry);
}

function searchResultMarkup(entry) {
  const meta = entry.c === 'copy' && entry.m ? `${entry.s} · ${entry.m}` : entry.s;
  const media = entry.i
    /* Bez loading="lazy": obrazek wstawiany do świeżo otwartego <dialog> trafia do
       warstwy wierzchniej i przeglądarka potrafi nigdy nie uznać go za widoczny —
       kafelek zostaje pusty. Leniwość i tak nic nie daje, bo wyniki (najwyżej 10
       miniatur) powstają dopiero po otwarciu wyszukiwarki. */
    ? `<img class="search-result__img" src="${escapeHtml(searchUrl(entry.i))}" alt="" width="56" height="56" decoding="async">`
    : `<svg class="search-result__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 15l5-5 4 4 3-3 6 6"/></svg>`;

  return `
    <li class="search-result">
      <a class="search-result__link" href="${escapeHtml(searchUrl(entry.u))}" data-search-result>
        <span class="search-result__media">${media}</span>
        <span class="search-result__text">
          <span class="search-result__title">${escapeHtml(entry.t)}</span>
          <span class="search-result__meta">${escapeHtml(meta || '')}</span>
        </span>
      </a>
    </li>`;
}

function initSearch() {
  const nav = document.querySelector('.header__inner nav');
  if (!nav || nav.querySelector('[data-search-open]')) return;

  /* Guzik wstrzykujemy z JS-a (tak jak „Ustawienia prywatności" w stopce):
     bez JS-a wyszukiwarka i tak by nie działała, więc nie zostawiamy martwej ikony. */
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'nav__search';
  trigger.setAttribute('data-search-open', '');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-label', STR.searchOpen);
  trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5 16 16"/></svg>';
  nav.appendChild(trigger);

  const dialog = document.createElement('dialog');
  dialog.className = 'search-dialog';
  dialog.setAttribute('aria-label', STR.searchTitle);
  dialog.innerHTML = `
    <div class="search-dialog__panel">
      <div class="search-dialog__bar">
        <svg class="search-dialog__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5 16 16"/></svg>
        <input type="search" class="search-dialog__input" data-search-input
               placeholder="${escapeHtml(STR.searchPlaceholder)}" aria-label="${escapeHtml(STR.searchTitle)}"
               autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="search">
        <button type="button" class="search-dialog__close" data-search-close aria-label="${escapeHtml(STR.close)}">&times;</button>
      </div>
      <p class="search-dialog__note" data-search-note></p>
      <ul class="search-results" data-search-results></ul>
      <p class="sr-only" role="status" aria-live="polite" data-search-status></p>
    </div>`;
  document.body.appendChild(dialog);

  const input = dialog.querySelector('[data-search-input]');
  const note = dialog.querySelector('[data-search-note]');
  const list = dialog.querySelector('[data-search-results]');
  const status = dialog.querySelector('[data-search-status]');

  let entries = null;
  let renderTimer = 0;
  let returnFocus = null;

  const resultLinks = () => [...list.querySelectorAll('[data-search-result]')];

  function render() {
    if (!entries) return;
    const query = input.value.trim();
    const results = query
      ? searchEntries(entries, query)
      : entries.filter(entry => entry.c === 'copy').slice(0, SEARCH_SUGGESTIONS);

    list.innerHTML = results.map(searchResultMarkup).join('');

    if (!query) {
      note.textContent = STR.searchHint;
      status.textContent = '';
    } else if (results.length) {
      note.textContent = '';
      status.textContent = `${STR.searchCount} ${results.length}`;
    } else {
      note.textContent = `${STR.searchEmpty} „${query}". ${STR.searchEmptyHint}`;
      status.textContent = `${STR.searchCount} 0`;
    }
    dialog.classList.toggle('has-query', Boolean(query));
  }

  function openSearch(source) {
    returnFocus = source || document.activeElement;
    document.body.classList.add('search-open');
    if (!dialog.open) dialog.showModal();

    if (entries) {
      render();
    } else {
      note.textContent = STR.searchHint;
      loadSearchIndex().then(loaded => {
        entries = loaded;
        render();
      }).catch(() => {
        note.textContent = STR.searchError;
        list.innerHTML = '';
      });
    }
    setTimeout(() => input.focus(), 0);
  }

  function moveFocus(delta) {
    const links = resultLinks();
    if (!links.length) return;
    const current = links.indexOf(document.activeElement);
    if (current < 0) {
      links[delta > 0 ? 0 : links.length - 1].focus();
      return;
    }
    // Pętla domknięta w obie strony: pole → wyniki → pole.
    const next = current + delta;
    if (next < 0 || next >= links.length) input.focus();
    else links[next].focus();
  }

  trigger.addEventListener('click', event => openSearch(event.currentTarget));
  // Rozgrzewka: zanim okno się otworzy, indeks zwykle jest już pobrany.
  ['pointerenter', 'focus'].forEach(type => {
    trigger.addEventListener(type, () => { loadSearchIndex().catch(() => {}); }, { once: true });
  });

  dialog.querySelector('[data-search-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('search-open');
    // Fokus oddajemy po ticku — inaczej własne przywracanie fokusu przez <dialog>
    // potrafi go zaraz potem zabrać na <body>.
    const back = returnFocus;
    returnFocus = null;
    if (back instanceof HTMLElement) {
      setTimeout(() => { if (document.contains(back)) back.focus(); }, 0);
    }
  });

  input.addEventListener('input', () => {
    window.clearTimeout(renderTimer);
    renderTimer = window.setTimeout(render, 120);
  });

  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveFocus(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(-1);
    } else if (event.key === 'Enter' && event.target === input) {
      const first = resultLinks()[0];
      if (first) {
        event.preventDefault();
        first.click();
      }
    }
  });

  /* Mierzymy wyłącznie WYBRANY wynik (zamknięty słownik adresów), nigdy wpisanego
     tekstu — zgodnie z zasadą, że zdarzenia nie niosą treści wpisanych przez
     odwiedzającego. */
  list.addEventListener('click', event => {
    const link = event.target instanceof Element ? event.target.closest('[data-search-result]') : null;
    if (!link) return;
    let route = 'unknown';
    try { route = analyticsRouteId(new URL(link.href).pathname); } catch (error) {}
    sendAnalyticsEvent('search_select', { search_target: route });
  });

  // Ctrl/⌘+K oraz „/" otwierają wyszukiwarkę, o ile nie piszemy właśnie w polu.
  document.addEventListener('keydown', event => {
    if (dialog.open) return;
    const typing = event.target instanceof Element &&
      event.target.closest('input, textarea, select, [contenteditable="true"]');
    const shortcut = (event.key === 'k' || event.key === 'K') && (event.ctrlKey || event.metaKey);
    if (shortcut || (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey)) {
      event.preventDefault();
      openSearch(document.activeElement);
    }
  });
}

/* ----- Wejście z wyszukiwarki na konkretną pracę (?work=…) -----
   Strony konserwacji nie mają osobnych podstron dla poszczególnych prac, więc
   wynik prowadzi do galerii i podświetla właściwy kafelek. */
function initDeepLinkedWork() {
  let wanted = '';
  try {
    wanted = new URLSearchParams(window.location.search).get('work') || '';
  } catch (error) {
    return;
  }
  if (!wanted) return;

  const target = [...document.querySelectorAll('.gallery-item[data-title]')]
    .find(item => slugify(item.dataset.title || '') === wanted);
  if (!target) return;

  target.classList.add('is-search-target');
  window.setTimeout(() => target.classList.remove('is-search-target'), 6000);

  /* Galeria konserwacji ma kilkadziesiąt leniwie ładowanych miniatur bez wymiarów,
     więc wysokość strony rośnie jeszcze długo po DOMContentLoaded i pozycja pracy
     ucieka. Stąd skok natychmiastowy (płynne przewijanie przez tysiące pikseli i tak
     zostałoby przerwane) plus kilka korekt — przerywanych, gdy tylko odwiedzający
     sam sięgnie po kółko, klawiaturę czy ekran dotykowy. */
  let userMoved = false;
  const markUserMoved = () => { userMoved = true; };
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(type => {
    window.addEventListener(type, markUserMoved, { once: true, passive: true });
  });

  /* `behavior: 'auto'` NIE znaczy „natychmiast" — bierze wartość z CSS, a strona ma
     `html { scroll-behavior: smooth }`. Płynność wyłączamy więc na czas skoku, tak samo
     jak robi to skrypt przywracania pozycji przewijania na końcu <body>. */
  const settle = () => {
    if (userMoved) return;
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    target.scrollIntoView({ block: 'center' });
    html.style.scrollBehavior = previous;
  };

  settle();
  target.focus({ preventScroll: true });
  [150, 500, 1200].forEach(delay => window.setTimeout(settle, delay));
  if (document.readyState !== 'complete') window.addEventListener('load', settle, { once: true });
}

/* ============================================================
   Motyw ciemny
   Domyślnie idzie za ustawieniem systemu (czysty CSS, bez migotania).
   Przełącznik nadpisuje wybór i zapamiętuje go — a mały skrypt w <head>
   każdej strony ustawia atrybut przed pierwszym malowaniem, więc osoba,
   która wybrała inaczej niż system, też nie zobaczy przeskoku.
   ============================================================ */

const THEME_KEY = 'zofiasiek-theme';

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return (stored === 'dark' || stored === 'light') ? stored : null;
  } catch (error) {
    return null;
  }
}

function activeTheme() {
  return readStoredTheme() ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function initTheme() {
  const nav = document.querySelector('.header__inner nav');
  if (!nav || nav.querySelector('[data-theme-toggle]')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'nav__theme';
  button.setAttribute('data-theme-toggle', '');
  // Widoczna jest zawsze ikona motywu DOCELOWEGO — przełączaniem zajmuje się CSS.
  button.innerHTML =
    '<svg class="nav__theme-moon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M20.5 14.8A8.6 8.6 0 0 1 9.2 3.5a8.6 8.6 0 1 0 11.3 11.3z"/></svg>' +
    '<svg class="nav__theme-sun" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<circle cx="12" cy="12" r="4.2"/>' +
    '<path d="M12 2.6v2.1M12 19.3v2.1M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5"/></svg>';

  function refreshLabel() {
    const next = activeTheme() === 'dark' ? STR.themeToLight : STR.themeToDark;
    button.setAttribute('aria-label', next);
    button.setAttribute('title', next);
  }

  button.addEventListener('click', () => {
    const next = activeTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (error) {}
    document.documentElement.dataset.theme = next;
    refreshLabel();
  });

  refreshLabel();
  nav.appendChild(button);

  // Póki nikt nie wybrał ręcznie, zmiana ustawienia systemu przestawia stronę.
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemChange = () => { if (!readStoredTheme()) refreshLabel(); };
  if (typeof systemDark.addEventListener === 'function') {
    systemDark.addEventListener('change', onSystemChange);
  } else if (typeof systemDark.addListener === 'function') {
    systemDark.addListener(onSystemChange); // starsze Safari
  }

  // Wybór motywu w innej karcie ma się przenieść i tutaj.
  window.addEventListener('storage', (event) => {
    if (event.key !== THEME_KEY) return;
    const stored = readStoredTheme();
    if (stored) document.documentElement.dataset.theme = stored;
    else delete document.documentElement.dataset.theme;
    refreshLabel();
  });
}
