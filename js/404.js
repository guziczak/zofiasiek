/* Localized content for the single static 404 page. */
(function () {
  'use strict';

  const root = document.documentElement;
  const context = window.__ZOFIA_404_CONTEXT__ || {
    language: 'pl',
    siteRoot: new URL('/', window.location.href).href
  };
  const language = ['pl', 'en', 'de'].includes(context.language)
    ? context.language
    : 'pl';

  const routes = {
    pl: {
      home: './',
      copies: 'kopie-obrazow/',
      conservation: 'konserwacja/',
      about: 'o-mnie/',
      contact: 'kontakt/',
      privacy: 'polityka-prywatnosci/'
    },
    en: {
      home: 'en/',
      copies: 'en/painting-copies/',
      conservation: 'en/conservation/',
      about: 'en/about/',
      contact: 'en/contact/',
      privacy: 'en/privacy-policy/'
    },
    de: {
      home: 'de/',
      copies: 'de/gemaeldekopien/',
      conservation: 'de/restaurierung/',
      about: 'de/ueber-mich/',
      contact: 'de/kontakt/',
      privacy: 'de/datenschutz/'
    }
  };

  const strings = {
    pl: {
      title: 'Nie znaleziono strony (404) — Zofia Siek-Mlicka',
      meta: 'Nie znaleziono strony. Przejdź do konserwacji dzieł sztuki, kopii obrazów lub skontaktuj się z pracownią Zofii Siek-Mlickiej.',
      skip: 'Przejdź do treści',
      mainNav: 'Główna nawigacja',
      navOpen: 'Otwórz menu nawigacji',
      copies: 'Kopie obrazów',
      conservation: 'Konserwacja',
      about: 'O mnie',
      contact: 'Kontakt',
      notFound: 'Nie znaleziono strony',
      errorTitle: 'Ten adres już tu nie prowadzi',
      errorDescription: 'Strona mogła zostać przeniesiona podczas przebudowy witryny. Najważniejsze treści pracowni nadal są dostępne — wybierz jedną z poniższych sekcji.',
      home: 'Strona główna',
      contactAction: 'Skontaktuj się',
      routesTitle: 'Być może szukasz',
      conservationDescription: 'Prace konserwatorskie oraz fotografie obiektów przed i po zabiegach.',
      copiesDescription: 'Ręcznie malowane kopie dzieł dawnych mistrzów.',
      aboutRoute: 'O pracowni',
      aboutDescription: 'Doświadczenie, twórczość i pracownia Zofii Siek-Mlickiej.',
      callPrompt: 'Nie wiesz, gdzie przejść? Zadzwoń:',
      languagesTitle: 'Wybierz inną wersję językową',
      footerDescription: 'Kopie obrazów, konserwacja zabytków i dzieł sztuki. Pracownia w Siedlcu koło Krzeszowic — Małopolska, pod Krakowem.',
      footerMenu: 'Menu',
      information: 'Informacje',
      privacy: 'Polityka prywatności',
      address: 'Siedlec 3, 32-065 Krzeszowice',
      copyright: '© 2026 Zofia Siek-Mlicka. Wszelkie prawa zastrzeżone.',
      call: 'Zadzwoń',
      scrollTop: 'Wróć na górę',
      mailSubject: 'Zapytanie ze strony — wycena',
      mailBody: 'Dzień dobry,\n\npoproszę o wycenę.\n\nPozdrawiam,'
    },
    en: {
      title: 'Page not found (404) — Zofia Siek-Mlicka',
      meta: 'Page not found. Visit conservation, painting copies or contact the studio of Zofia Siek-Mlicka.',
      skip: 'Skip to content',
      mainNav: 'Main navigation',
      navOpen: 'Open navigation menu',
      copies: 'Painting Copies',
      conservation: 'Conservation',
      about: 'About',
      contact: 'Contact',
      notFound: 'Page not found',
      errorTitle: 'This address no longer leads to a page',
      errorDescription: 'The page may have been moved while the website was being rebuilt. The studio’s main content is still available — choose one of the sections below.',
      home: 'Home',
      contactAction: 'Get in touch',
      routesTitle: 'You may be looking for',
      conservationDescription: 'Conservation work and photographs of objects before and after treatment.',
      copiesDescription: 'Hand-painted copies of works by old masters.',
      aboutRoute: 'About the studio',
      aboutDescription: 'The experience, artistic practice and studio of Zofia Siek-Mlicka.',
      callPrompt: 'Not sure which page you need? Call:',
      languagesTitle: 'Choose another language version',
      footerDescription: 'Hand-painted reproductions, conservation of historic objects and works of art. Studio in Siedlec near Krzeszowice — Małopolska, near Kraków, Poland.',
      footerMenu: 'Menu',
      information: 'Information',
      privacy: 'Privacy Policy',
      address: 'Siedlec 3, 32-065 Krzeszowice, Poland',
      copyright: '© 2026 Zofia Siek-Mlicka. All rights reserved.',
      call: 'Call',
      scrollTop: 'Back to top',
      mailSubject: 'Inquiry from the website — quote request',
      mailBody: 'Hello,\n\nI would like to request a quote.\n\nBest regards,'
    },
    de: {
      title: 'Seite nicht gefunden (404) — Zofia Siek-Mlicka',
      meta: 'Seite nicht gefunden. Besuchen Sie die Bereiche Restaurierung und Gemäldekopien oder kontaktieren Sie das Atelier von Zofia Siek-Mlicka.',
      skip: 'Zum Inhalt springen',
      mainNav: 'Hauptnavigation',
      navOpen: 'Navigationsmenü öffnen',
      copies: 'Gemäldekopien',
      conservation: 'Restaurierung',
      about: 'Über mich',
      contact: 'Kontakt',
      notFound: 'Seite nicht gefunden',
      errorTitle: 'Diese Adresse führt zu keiner Seite mehr',
      errorDescription: 'Die Seite wurde möglicherweise beim Umbau der Website verschoben. Die wichtigsten Inhalte des Ateliers sind weiterhin verfügbar — wählen Sie unten einen Bereich aus.',
      home: 'Startseite',
      contactAction: 'Kontakt aufnehmen',
      routesTitle: 'Vielleicht suchen Sie',
      conservationDescription: 'Restaurierungsarbeiten sowie Fotografien der Objekte vor und nach der Restaurierung.',
      copiesDescription: 'Handgemalte Kopien von Werken alter Meister.',
      aboutRoute: 'Über das Atelier',
      aboutDescription: 'Erfahrung, künstlerisches Schaffen und das Atelier von Zofia Siek-Mlicka.',
      callPrompt: 'Sie sind nicht sicher, welche Seite die richtige ist? Rufen Sie an:',
      languagesTitle: 'Wählen Sie eine andere Sprachversion',
      footerDescription: 'Handgemalte Gemäldekopien, Konservierung und Restaurierung historischer Objekte und Kunstwerke. Atelier in Siedlec bei Krzeszowice — Małopolska, bei Krakau, Polen.',
      footerMenu: 'Menü',
      information: 'Informationen',
      privacy: 'Datenschutz',
      address: 'Siedlec 3, 32-065 Krzeszowice, Polen',
      copyright: '© 2026 Zofia Siek-Mlicka. Alle Rechte vorbehalten.',
      call: 'Anrufen',
      scrollTop: 'Nach oben',
      mailSubject: 'Anfrage über die Website — Kostenvoranschlag',
      mailBody: 'Guten Tag,\n\nich bitte um einen Kostenvoranschlag.\n\nMit freundlichen Grüßen'
    }
  };

  const languageOptions = {
    pl: { code: 'PL', name: 'Polski', action: 'Otwórz polską stronę' },
    en: { code: 'EN', name: 'English', action: 'Open the English website' },
    de: { code: 'DE', name: 'Deutsch', action: 'Deutsche Website öffnen' }
  };

  const siteUrl = path => new URL(path, context.siteRoot).href;

  function renderLanguageNavigation() {
    const container = document.querySelector('[data-language-nav]');
    if (!container) return;
    const fragment = document.createDocumentFragment();

    Object.keys(languageOptions).forEach((code, index) => {
      if (index) {
        const separator = document.createElement('span');
        separator.className = 'nav__lang-sep';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = '/';
        fragment.appendChild(separator);
      }

      if (code === language) {
        const current = document.createElement('span');
        current.className = 'nav__lang-current';
        current.setAttribute('aria-current', 'true');
        current.textContent = languageOptions[code].code;
        fragment.appendChild(current);
        return;
      }

      const link = document.createElement('a');
      link.className = 'nav__lang-link';
      link.href = siteUrl(routes[code].home);
      link.hreflang = code;
      link.lang = code;
      link.textContent = languageOptions[code].code;
      fragment.appendChild(link);
    });

    container.replaceChildren(fragment);
  }

  function renderLanguageCards() {
    const container = document.querySelector('[data-language-cards]');
    if (!container) return;
    const fragment = document.createDocumentFragment();

    Object.keys(languageOptions).filter(code => code !== language).forEach(code => {
      const option = languageOptions[code];
      const link = document.createElement('a');
      const codeLabel = document.createElement('span');
      const copy = document.createElement('span');
      const name = document.createElement('strong');
      const action = document.createElement('span');
      const arrow = document.createElement('span');

      link.className = 'error-page__language';
      link.href = siteUrl(routes[code].home);
      link.hreflang = code;
      link.lang = code;
      codeLabel.className = 'error-page__language-code';
      codeLabel.setAttribute('aria-hidden', 'true');
      codeLabel.textContent = option.code;
      copy.className = 'error-page__language-copy';
      name.textContent = option.name;
      action.textContent = option.action;
      arrow.className = 'error-page__language-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';

      copy.append(name, action);
      link.append(codeLabel, copy, arrow);
      fragment.appendChild(link);
    });

    container.replaceChildren(fragment);
  }

  try {
    const text = strings[language];
    const currentRoutes = routes[language];
    document.title = text.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', text.meta);

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = text[element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const value = text[element.dataset.i18nAria];
      if (typeof value === 'string') element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-route]').forEach(element => {
      const route = currentRoutes[element.dataset.route];
      if (route) element.href = siteUrl(route);
    });
    document.querySelectorAll('[data-mail-link]').forEach(element => {
      element.href = `mailto:zo.siek@interia.pl?subject=${encodeURIComponent(text.mailSubject)}&body=${encodeURIComponent(text.mailBody)}`;
    });

    const skipLink = document.querySelector('.skip-link');
    if (skipLink) skipLink.href = `${window.location.href.split('#')[0]}#tresc`;
    renderLanguageNavigation();
    renderLanguageCards();
    root.lang = language;
    root.dataset.errorLocalized = language;
  } catch (error) {
    root.lang = 'pl';
    root.dataset.errorLocalized = 'pl';
  } finally {
    window.clearTimeout(window.__ZOFIA_404_REVEAL_TIMER__);
    root.classList.remove('error-page--localizing');
  }
}());
