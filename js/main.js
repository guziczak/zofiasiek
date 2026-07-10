/* ============================================================
   Zofia Siek-Mlicka — Main JavaScript
   ============================================================ */

/* ----- Teksty interfejsu (PL/EN) — wybór po <html lang> -----
   Strony EN leżą w /en/ i ładują ten sam plik; ścieżki względne w tekstach
   (np. link do polityki prywatności) działają, bo podstrony obu wersji
   są na tej samej głębokości. */
const STR = (function () {
  const all = {
    pl: {
      navOpen: 'Otwórz menu nawigacji',
      navClose: 'Zamknij menu nawigacji',
      formRequired: 'To pole jest wymagane.',
      formConsent: 'Wymagana jest zgoda na przetwarzanie danych osobowych.',
      formFill: 'Proszę uzupełnić zaznaczone pola.',
      mailSubject: 'Zapytanie ze strony — ',
      mailName: 'Imię i nazwisko',
      mailEmail: 'E-mail',
      mailPhone: 'Telefon',
      mailOpening: 'Otwieram Twój program pocztowy…',
      mapNeedAll: 'Aby wyświetlić interaktywną mapę Google, zaakceptuj wszystkie pliki cookies.',
      mapNeedConsent: 'Najpierw zaakceptuj pliki cookies.',
      mapCookieHtml: 'Interaktywna mapa Google używa plików cookies Google. Zaakceptuj wszystkie, aby ją wyświetlić. ' +
        '<a href="../polityka-prywatnosci/">Dowiedz się więcej</a>.',
      acceptAll: 'Akceptuję wszystkie',
      mapTitle: 'Lokalizacja — Siedlec 3, 32-065 Krzeszowice',
      sliderPlay: 'Włącz automatyczne przewijanie slajdów',
      sliderPause: 'Zatrzymaj automatyczne przewijanie slajdów',
      slide: 'Slajd',
      lightbox: 'Podgląd zdjęcia',
      close: 'Zamknij',
      prev: 'Poprzednie',
      next: 'Następne',
      collapse: 'Zwiń',
      readMore: 'Czytaj więcej'
    },
    en: {
      navOpen: 'Open navigation menu',
      navClose: 'Close navigation menu',
      formRequired: 'This field is required.',
      formConsent: 'Consent to the processing of personal data is required.',
      formFill: 'Please fill in the highlighted fields.',
      mailSubject: 'Inquiry from the website — ',
      mailName: 'Full name',
      mailEmail: 'E-mail',
      mailPhone: 'Phone',
      mailOpening: 'Opening your e-mail app…',
      mapNeedAll: 'To display the interactive Google map, please accept all cookies.',
      mapNeedConsent: 'Please accept cookies first.',
      mapCookieHtml: 'The interactive Google map uses Google cookies. Accept all cookies to display it. ' +
        '<a href="../privacy-policy/">Learn more</a>.',
      acceptAll: 'Accept all',
      mapTitle: 'Location — Siedlec 3, 32-065 Krzeszowice, Poland',
      sliderPlay: 'Start automatic slide rotation',
      sliderPause: 'Stop automatic slide rotation',
      slide: 'Slide',
      lightbox: 'Photo preview',
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      collapse: 'Collapse',
      readMore: 'Read more'
    },
    de: {
      navOpen: 'Navigationsmenü öffnen',
      navClose: 'Navigationsmenü schließen',
      formRequired: 'Dieses Feld ist erforderlich.',
      formConsent: 'Die Einwilligung in die Verarbeitung personenbezogener Daten ist erforderlich.',
      formFill: 'Bitte füllen Sie die markierten Felder aus.',
      mailSubject: 'Anfrage über die Website — ',
      mailName: 'Name',
      mailEmail: 'E-Mail',
      mailPhone: 'Telefon',
      mailOpening: 'Ihr E-Mail-Programm wird geöffnet…',
      mapNeedAll: 'Um die interaktive Google-Karte anzuzeigen, akzeptieren Sie bitte alle Cookies.',
      mapNeedConsent: 'Bitte akzeptieren Sie zuerst die Cookies.',
      mapCookieHtml: 'Die interaktive Google-Karte verwendet Google-Cookies. Akzeptieren Sie alle Cookies, um sie anzuzeigen. ' +
        '<a href="../datenschutz/">Mehr erfahren</a>.',
      acceptAll: 'Alle akzeptieren',
      mapTitle: 'Standort — Siedlec 3, 32-065 Krzeszowice, Polen',
      sliderPlay: 'Automatischen Bildwechsel starten',
      sliderPause: 'Automatischen Bildwechsel anhalten',
      slide: 'Bild',
      lightbox: 'Bildvorschau',
      close: 'Schließen',
      prev: 'Zurück',
      next: 'Weiter',
      collapse: 'Einklappen',
      readMore: 'Weiterlesen'
    }
  };
  const lang = (document.documentElement.lang || 'pl').slice(0, 2);
  return all[lang] || all.pl;
})();

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
  initCookieConsent();
  initScrollTop();
  initRevealAnimations();
  initContactForm();
  initContactMap();
  initHeroSlider();
  initLightbox();
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

  function closeNav(returnFocus) {
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

/* ----- Cookie Consent ----- */
function initCookieConsent() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  banner.querySelector('[data-accept]')?.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    banner.classList.remove('visible');
    // Zgoda na cookies → załaduj interaktywną mapę Google (jeśli jest na stronie)
    const holder = document.querySelector('.map-container[data-map]');
    if (holder) loadMap(holder);
  });

  banner.querySelector('[data-reject]')?.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'essential');
    banner.classList.remove('visible');
  });

  // Baner zostaje w DOM (żeby dało się go pokazać ponownie po kliknięciu w mapę);
  // pokazujemy go tylko, gdy użytkownik jeszcze nie zdecydował.
  if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => banner.classList.add('visible'), 1000);
  }
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

  // Brak wsparcia IntersectionObserver → pokaż wszystko od razu (bezpieczny fallback)
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

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
    window.location.href = href;
    // Celowo NIE czyścimy pól — jeśli program pocztowy nie wystartuje, wpisana treść nie przepada.
  });
}

/* ----- Mapa kontaktowa (mapa Google dopiero po zgodzie na cookies) -----
   Domyślnie statyczny obrazek img/mapa-kontakt.png (z naszego hostingu — zero Google,
   zero cookies) — pełnoprawna, czysta mapa. Na hover/focus przyciemnia się (scrim).
   Interaktywną mapę Google ładujemy po akceptacji cookies w banerze.
   Klik w mapę bez zgody = toast z prośbą o akceptację + pulsujące guziki banera (mapy NIE ładuje). */
function initContactMap() {
  const holder = document.querySelector('.map-container[data-map]');
  if (!holder) return;

  if (localStorage.getItem('cookies-accepted') === 'true') {
    loadMap(holder);
    return;
  }
  const placeholder = holder.querySelector('[data-load-map]');
  const coarse = window.matchMedia('(hover: none)'); // ekran dotykowy (bez kursora)

  placeholder?.addEventListener('click', () => {
    const banner = document.querySelector('.cookie-banner');
    // Po wyborze „tylko niezbędne" nie pytamy o to ponownie — chodzi już tylko
    // o zgodę na WSZYSTKIE cookies (potrzebną do mapy Google).
    const essentialOnly = localStorage.getItem('cookies-accepted') === 'essential';

    showToast(essentialOnly ? STR.mapNeedAll : STR.mapNeedConsent, 'info');

    // Mobile: tap pokazuje scrim + podpowiedź (na desktopie robi to :hover)
    if (coarse.matches) placeholder.classList.add('is-revealed');

    if (!banner) return;

    // Tryb „tylko wszystkie": chowa guzik „Tylko niezbędne", dopasowuje tekst i etykietę
    banner.classList.toggle('cookie-banner--accept-all', essentialOnly);
    if (essentialOnly) {
      const textEl = banner.querySelector('.cookie-banner__text');
      if (textEl) {
        // Link relatywny — mapa (i ten re-prompt) istnieje tylko na podstronie kontakt/
        textEl.innerHTML = STR.mapCookieHtml;
      }
      const acceptBtn = banner.querySelector('[data-accept]');
      if (acceptBtn) acceptBtn.textContent = STR.acceptAll;
    }

    banner.classList.add('visible');
    // Pulsnij widocznymi przyciskami banera (2×), żeby zwrócić uwagę, gdzie kliknąć
    banner.querySelectorAll('.btn').forEach((b) => {
      b.classList.remove('is-pulsing');
      void b.offsetWidth; // reflow → restart animacji przy kolejnym kliknięciu
      b.classList.add('is-pulsing');
    });
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

  // WCAG 2.2.2: autoodtwarzanie musi dać się zatrzymać — służy do tego przycisk
  // pauzy poniżej. Pokaz startuje SAM przy każdym wejściu/odświeżeniu. Przy
  // preferencji redukcji ruchu globalny CSS skraca przenikanie do ~0 ms, więc
  // slajdy przełączają się bez animacji (treść leci, ruchu brak).
  let userPaused = false;

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
    dot.addEventListener('click', () => { go(i); restart(); });
    dots.appendChild(dot);
  });
  slider.appendChild(dots);

  const dotEls = () => [...dots.querySelectorAll('.hero-slider__dot')];

  function go(i) {
    const dl = dotEls();
    slides[index].classList.remove('is-active');
    dl[index].classList.remove('is-active');
    dl[index].removeAttribute('aria-current');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    dl[index].classList.add('is-active');
    dl[index].setAttribute('aria-current', 'true');
  }
  function next() { go(index + 1); }
  function start() { stop(); if (userPaused) return; timer = setInterval(next, delay); }
  function stop() { clearInterval(timer); }
  function restart() { stop(); start(); }

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stop() : start();
  });
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
    <button class="lightbox__nav lightbox__nav--prev" aria-label="${STR.prev}">&#8249;</button>
    <figure class="lightbox__stage">
      <img class="lightbox__img" src="" alt="">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
    <button class="lightbox__nav lightbox__nav--next" aria-label="${STR.next}">&#8250;</button>
    <span class="lightbox__counter" aria-live="polite"></span>`;
  document.body.appendChild(box);

  const imgEl = box.querySelector('.lightbox__img');
  const capEl = box.querySelector('.lightbox__caption');
  const countEl = box.querySelector('.lightbox__counter');
  let slides = [];
  let pos = 0;

  function render() {
    const s = slides[pos];
    imgEl.src = s.src;
    imgEl.alt = s.title || '';
    capEl.textContent = s.meta ? `${s.title} — ${s.meta}` : (s.title || '');
    countEl.textContent = slides.length > 1 ? `${pos + 1} / ${slides.length}` : '';
    box.querySelectorAll('.lightbox__nav').forEach(n => {
      n.style.display = slides.length > 1 ? '' : 'none';
    });
    // preload neighbour
    if (slides.length > 1) {
      const nx = new Image();
      nx.src = slides[(pos + 1) % slides.length].src;
    }
  }
  function open(list, start) {
    slides = list; pos = start;
    document.body.style.overflow = 'hidden';
    box.showModal();
    render();
  }
  function close() { box.close(); }
  // 'close' łapie każdą drogę zamknięcia (przycisk, backdrop, Escape)
  box.addEventListener('close', () => {
    document.body.style.overflow = '';
  });
  function move(d) { pos = (pos + d + slides.length) % slides.length; render(); }

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
  box.querySelector('.lightbox__nav--prev').addEventListener('click', () => move(-1));
  box.querySelector('.lightbox__nav--next').addEventListener('click', () => move(1));
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.open) return; // Escape obsługuje natywny <dialog>
    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
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
