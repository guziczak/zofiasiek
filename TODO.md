# TODO — zofiasiek.pl / siekart.pl

Backlog z audytów strony (2026-07-08 i 2026-08-11). Priorytety: P0 = robimy teraz, P4 = decyzje/kiedyś.
Uwaga: repo jest deployowane w całości na hosting, więc ten plik będzie publicznie dostępny pod `/TODO.md` — nie wpisywać tu nic wrażliwego.

## P0 — Dostępność (cel: WCAG 2.2 AA bez naruszeń, ocena ≥9,5/10)

Wdrożone 2026-07-08 (niezcommitowane). Kontrasty policzone skryptem — 16/16 par ≥4,5:1.

### Kontrast (WCAG 1.4.3, 1.4.11)
- [x] `--color-muted: #777` → `#666` (5,7:1 na białym, 5,4:1 na `#faf7f2`)
- [x] `--color-accent-dark` przyciemniony `#8b7355` → `#7a6449` (5,6:1; naprawia też wszystkie linki, które miały 4,49:1) + nowy `--color-accent-darker: #66533c` na hovery; tekstowe użycia beżu `#b8976a` przemapowane:
  - [x] `.section-subtitle` + `.about-teaser__subtitle` (eyebrowy)
  - [x] `.about-stat__number`
  - [x] `.art-seo__label` (+ rozmiar 0.66rem → 0.72rem)
  - [x] `.btn--primary` — na jasnym tle ciemne złoto + biały tekst; na ciemnym (`.section--dark`, cookie-banner) jasne złoto + ciemny tekst (6,4:1)
  - [x] `.btn--outline`, podkreślenie nav, focus inputów, checkbox, social hover, mobile-cta, scroll-top, hint mapy
- [x] `.gallery-item__badge` — scrim `.68` → `.8`
- [x] `.toast` — tło `.62` → `.85`
- [x] `.rama-work__hint` — bez `opacity:.55`, zawsze czytelny
- [x] Fokus: zostają domyślne dwukolorowe ringi przeglądarek (przechodzą na każdym tle — jeden własny kolor by nie przeszedł); dodany `:focus-within` na etykietach uploadu (ukryty input)
- [x] Kropki slidera — scrim pod kropkami + cele 24px

### Ruch i autoplay (WCAG 2.2.2, 2.3.3)
- [x] Przycisk pauza/start w hero-sliderze (24px, zmienna etykieta aria)
- [x] `@media (prefers-reduced-motion: reduce)`: reveal/crossfade/animacje off; smooth-scroll tylko pod `no-preference`
- [x] JS: przy redukcji ruchu autoplay nie startuje (guzik pozwala włączyć); scroll-top bez smooth
- [x] Guard na `canvas.animate` w rama.js

### Klawiatura i fokus (WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7)
- [x] Lightbox → natywny `<dialog>` + `showModal()` (focus-trap, Esc, inert, powrót fokusu — natywnie)
- [x] Modal przymiarki ram → j.w.
- [x] Menu mobilne: pętla Tab (toggle + pozycje), Esc zamyka i wraca na hamburger
- [x] Inputy upload: `display:none` → `.sr-only` (fokusowalne; o-mnie, rama-demo, modal ram)
- [x] Skip link „Przejdź do treści" + `<main id="tresc">` (8 stron)
- [x] Cele dotykowe: kropki 24px, hamburger 44×44

### Semantyka / ARIA (WCAG 1.3.1, 4.1.2)
- [x] `<main>` na 8 stronach
- [x] Hamburger: `aria-expanded` + `aria-controls` + zmienna etykieta (ustawiane w JS)
- [x] `aria-current="page"` na aktywnym linku nav (5 podstron)
- [x] Karuzela: `role="region"` + `aria-roledescription="karuzela"` + `aria-label`; aktywna kropka z `aria-current`
- [x] Licznik lightboxa: `aria-live="polite"`
- [x] Nagłówki: o-mnie h3 → h2 (styl zachowany przez `.about-text h2`), stopki h4 → h2 (7 stron)
- [x] SVG: `aria-hidden="true" focusable="false"` + naprawiony markup (domknięte dzieci, usunięte artefakty `"../>`)
- [x] Breadcrumby: `<nav aria-label="Ścieżka nawigacji">` + `<ol>` + `aria-current` (6 podstron)
- [x] `<nav aria-label="Główna nawigacja">` (8 stron)

### Formularz (WCAG 1.3.5, 3.3.1)
- [x] `autocomplete="name|email|tel"`
- [x] Błędy inline przy polach (`.form__error` + `aria-invalid` + `aria-describedby`), czyszczone przy wpisywaniu; toast jako podsumowanie; fokus na pierwsze błędne pole

### Treść
- [x] Alt-y w konserwacji: „— 1/— 2" → „— po konserwacji / — przed konserwacją" (konwencja zweryfikowana na zdjęciach: `thumb.jpg` = po, `thumb-b.jpg` = przed/kolaż z prac)

### Weryfikacja (definicja „zrobione")
- [x] Statycznie: składnia JS (node --check), balans tagów HTML na 8 stronach, komplet referencji do plików, kontrasty 16/16 ≥4,5:1
- [x] Lighthouse Accessibility (silnik axe-core, headless Chrome): **100/100 na wszystkich 8 stronach, 0 naruszeń** (2026-07-08)
- [ ] Ręczny przejazd klawiaturą: menu mobilne, lightbox, modal ram, formularz, mapa (automat tego nie sprawdzi)
- [ ] Smoke test NVDA (Windows): strona główna + kontakt
- [ ] Emulacja `prefers-reduced-motion` w DevTools: zero animacji, slider stoi

## P1 — Responsywność i interfejs (audyt 2026-08-11)

- [ ] **Hero na niskich ekranach**: zarezerwować pionowe miejsce na fixed header oraz kontrolki slidera. Zweryfikować co najmniej 320×568, 360×640 i landscape 844×390 — obecnie nagłówek wchodzi pod header, a kropki nakładają się na CTA (`css/style.css`, okolice linii 253, 472 i 2049)
- [ ] **Nawigacja 769–960 px**: wcześniej przełączać menu desktopowe na drawer (około 900–960 px), dodać `flex-shrink: 0` dla logo i `white-space: nowrap` dla pozycji menu; sprawdzić PL/EN/DE, szczególnie niemiecką wersję (`css/style.css`, breakpoint około linii 1731)
- [ ] **Modal ustawień prywatności**: przywrócić centrowanie `<dialog>` przez `margin: auto` oraz dodać bezpieczne marginesy i maksymalną wysokość na mobile (`css/style.css`, okolice linii 1235)
- [ ] **Kotwica formularza kontaktowego**: dodać `scroll-margin-top` uwzględniający fixed header albo przenieść `id="contact-form"` na wrapper z nagłówkiem; po wejściu z CTA pierwsza etykieta nie może być schowana pod headerem (`kontakt/index.html`, okolice linii 148)
- [ ] **Długie niemieckie słowa przy 320 px**: usunąć poziomy scroll na `/de/datenschutz/` i wychodzenie kart poza grid na `/de/restaurierung/`; zastosować zależnie od miejsca `hyphens: auto`, `overflow-wrap: anywhere`, `min-width: 0` i `minmax(0, 1fr)`
- [ ] **Linki w zwykłym tekście**: dodać trwałe podkreślenie lub inny niekolorystyczny wyróżnik dla linków w treści, formularzu i polityce prywatności; sam kolor nie zapewnia wystarczającego rozróżnienia (WCAG 1.4.1)

## P1 — Wydajność

- [x] Hero: pierwszy slajd jako responsywny `<picture>` z `fetchpriority="high"`; pozostałe slajdy są hydraturowane po idle lub na żądanie, dopiero przed przełączeniem
- [x] Miniatury dla pięciu kopii na stronie głównej: wersjonowane AVIF/WebP o maksymalnym rozmiarze 800×1000 z pełnym JPEG-em pozostawionym wyłącznie jako fallback/lightbox
- [ ] Miniatury dla osieroconej strony `aktualnosci/` — dopiero po decyzji, czy strona ma zostać rozwinięta, czy usunięta
- [ ] WebP/AVIF + `srcset/sizes` dla galerii (60 MB JPG → ~40–50% mniej); wygenerować warianty około 400/800 px i osobne małe miniatury lightboxa, żeby siatki oraz pasek miniaturek nie pobierały pełnych JPG (pełny przebieg audytu: `/o-mnie/` 9,16 MB, `/konserwacja/` 5,62 MB)
- [ ] `<link rel="preload">` dla krytycznych fontów woff2 (latin, 400/700)
- [x] Slider: wersjonowane AVIF/WebP 960 px i pełne rozdzielczości z JPEG fallbackiem; start mobilny spadł z 2,3 MB do ok. 188 KB
- [x] Logo: wersjonowany PNG 526×200 z wymiarami w HTML; 193,6 KB → 22,7 KB
- [x] Apache fallback cache w `.htaccess` dla HTML, CSS/JS/fontów i obrazów
- [ ] Skopiować równoważne nagłówki cache do ustawień Nginx/Plesk — produkcyjny Nginx może omijać `.htaccess` dla plików statycznych

## SEO poza kodem (pilne po deployu — największe dźwignie widoczności)

Weryfikacja live 2026-07-08: zofiasiek.pl serwuje stronę z korzenia domeny ✓, domena w indeksie ✓,
ale Google trzyma stare URL-e z WordPressa, które dziś zwracają 404.

- [x] **Przekierowania ze starych URL-i WP** — zrobione jako stuby w repo (foldery ze starymi nazwami + index.html: meta-refresh 0 + JS + canonical; wtyczka Redirection by nie zadziałała, bo 404 serwuje hosting, nie WP):
  - `/konserwacja-zabytkow-i-dziel-sztuki/` → `/konserwacja/`
  - `/portret-malzonkow-arnolfinich-jana-van-eycka/` → `/kopie-obrazow/`
  - `/vermeer-dziewczyna-z-perla/` → `/kopie-obrazow/dziewczyna-z-perla/`
- [ ] Opcjonalny upgrade: prawdziwe HTTP 301 w panelu hostingu (Plesk), jeśli kiedyś będzie dostęp — wtedy stuby można skasować
- [ ] Pełną listę starych 404 pokaże Search Console (indeks może trzymać więcej niż te 3)
- [ ] **Google Search Console**: weryfikacja domeny, zgłoszenie sitemap.xml, prośba o przeindeksowanie (indeks ma jeszcze stary title „Zofia Siek"), raport Strony/404 — zero cookies, zgodne z privacy-first
- [ ] **Po deployu (teraz!)**: w GSC „Sprawdź URL" → „Poproś o zindeksowanie" dla 4 głównych podstron, 3 nowych realizacji i 3 starych URL-i (żeby Google szybciej zobaczył nowe treści oraz przekierowania zamiast czekać na crawl); Test wyników z elementami rozszerzonymi dla schema LocalBusiness/Service/BreadcrumbList
- [ ] **Wersje EN + DE (2026-07-09/10)**: po deployu zgłosić w GSC zaktualizowaną sitemap.xml (18 URL-i: 15 stron PL+EN+DE oraz 3 polskie realizacje; hreflang tylko dla faktycznych odpowiedników) i poprosić o zindeksowanie /en/ i /de/; sprawdzić trójkę / ↔ /en/ ↔ /de/ walidatorem hreflang; przy okazji wizytówki Google rozważyć dodatkowe języki profilu
- [ ] **Bing Webmaster Tools**: weryfikacja + ta sama sitemap.xml (Bing zasila też DuckDuck; import jednym klikiem z GSC) — mały ruch, ale darmowy i 5 minut
- [ ] **Wizytówka Google (Business Profile)** dla pracowni (Siedlec 3, Krzeszowice) + systematyczne zbieranie opinii — dla fraz lokalnych pack mapowy stoi nad wynikami organicznymi
- [ ] **Spójność NAP** (nazwa/adres/telefon identyczne co do znaku wszędzie): strona, wizytówka Google, FB, IG, stare katalogi. Uwaga: strona ma 2 telefony (607 752 370 i 502 244 629) — ustalić JEDEN główny do NAP, żeby Google nie widział rozjazdu. Musi zgadzać się ze schema LocalBusiness (jest tam 607…)
- [ ] Linki zwrotne: strona w bio FB/IG/TikToka, katalogi lokalne, współprace (np. Muzeum w Chrzanowie), prasa lokalna
- [ ] Treść przyrostowa: `aktualnosci/` jako blog realizacji (każda praca = wpis z unikalnym opisem) — powiązane z decyzją w P4
- [ ] Favicon w wynikach Google: dziś jest tylko SVG — Google do wyników wymaga też PNG/ICO (min. 48×48) pod stałym URL-em; powiązane z pozycją favicon w P3
- [x] Rozbudować `/kopie-obrazow/`: naturalny title/H1 i treść lokalno-usługowa, osobna sekcja portfolio, `Service` JSON-LD oraz opisowe linki do realizacji
- Podgląd guziczak.github.io/zofiasiek jest SEO-bezpieczny: absolutne canonicale na zofiasiek.pl skleją kopie w Google (nic nie trzeba robić)

## P2 — Kontakt i pomiar

- [x] Decyzja właściciela: formularz celowo przygotowuje wiadomość i otwiera aplikację pocztową; nie dodajemy backendu ani uploadu plików na stronie
- [ ] Przed uruchomieniem płatnych kampanii ponownie ocenić prosty backend/API formularza: `mailto:` może nie zadziałać bez skonfigurowanego klienta pocztowego i nie daje potwierdzenia dostarczenia. Jeżeli pozostaje `mailto:`, przygotować i przetestować czytelny fallback z adresem e-mail oraz kopią treści do skopiowania
- [x] CTA przekazują rodzaj usługi do formularza, a formularz wstępnie uzupełnia temat i treść wiadomości
- [x] Pomiar rozróżnia kliknięcie CTA, kliknięcie telefonu/e-maila oraz przekazanie poprawnego formularza do aplikacji pocztowej; żadnego z nich nie nazywa potwierdzonym leadem
- [ ] Po wdrożeniu sprawdzić zdarzenia `cta_select`, `contact_link_click` i `form_mailto_handoff` w GA4 Realtime/DebugView po wyrażeniu zgody

## P2B — Opisane realizacje

Pełnych case studies nie publikować na podstawie samych zdjęć. Ogólnego procesu usługi nie wolno przypisywać konkretnemu obiektowi bez potwierdzenia.

- [x] Opublikować ostrożne strony dokumentacji fotograficznej dla „Damy z gronostajem”, „Dziewczyny z perłą” i „Pocałunku”; połączyć je ze stroną usługi, formularzem i sitemapą, bez dopisywania niepotwierdzonych wymiarów, techniki, dat, klienta ani czasu pracy
- [ ] Dla 3–5 konserwacji zebrać: typ/autorstwo/datowanie, materiał i wymiary, stan początkowy, diagnozę, zatwierdzony zakres, wykonane zabiegi, rok/czas, rezultat, zalecenia, opis etapów zdjęć i zgodę na publikację
- [ ] Dla 2–3 kopii zebrać: format, podłoże, technikę, rok/czas, założenia zamówienia, etapy, najtrudniejszy element, wykończenie oraz zgodę klienta na opis kontekstu
- [ ] Po zebraniu danych rozbudować istniejące strony dokumentacji do pełnych, unikalnych case studies; nowe realizacje od razu łączyć z usługą i formularzem z odpowiednim tematem
- [ ] Kandydaci z najbogatszą dokumentacją: Tetmajer, Madonna Sykstyńska, dekoracja ścienna oraz kopie mające po 8 zdjęć

## P2C — Języki

- [x] Poprawić błędy i kalki o wysokiej pewności w PL/EN/DE; ujednolicić angielski do wariantu brytyjskiego (`en_GB`)
- [ ] Przed płatną kampanią EN/DE wykonać końcowy przegląd z native speakerem znającym terminologię konserwatorską

## P2D — FAQ, publikacje, opinie i szkolenia

- [x] Dodać do polskiej strony „O mnie” publikację *Opus vitae: Jan Siek: rzeźba* z rolą opisaną dokładnie jako „przygotowanie” oraz odnośnikiem do wykazu Biblioteki Narodowej
- [x] Dodać po polsku osobne FAQ do stron konserwacji i kopii obrazów; odpowiedzi oparto wyłącznie na informacjach obecnych już w ofercie
- [x] Po akceptacji polskich treści przetłumaczyć publikację i oba FAQ na EN/DE
- [x] Połączyć pierwszą odpowiedź FAQ konserwacji z istniejącą galerią realizacji „przed i po” w PL/EN/DE
- [x] Dodać płynne rozwijanie i zwijanie odpowiedzi FAQ z natywnym fallbackiem oraz obsługą `prefers-reduced-motion`
- [x] Zastąpić znak plus/minus obracanym chevronem zsynchronizowanym z animacją odpowiedzi
- [x] Zidentyfikować publiczny Profil Firmy Google po zgodnych danych: nazwa, Siedlec 3, telefon 607 752 370, domena zofiasiek.pl; Place ID `ChIJK-5dgyn3FkcRWT9VxU1_Rtg`
- [x] Dodać na stronach kontaktowych PL/EN/DE link do właściwego profilu i opinii w Mapach Google
- [ ] Właścicielka profilu: skopiować z panelu bezpośredni link „Więcej opinii” i porównać go z przygotowanym adresem `https://search.google.com/local/writereview?placeid=ChIJK-5dgyn3FkcRWT9VxU1_Rtg`
- [ ] Po zakończonej realizacji wysyłać bez zachęty finansowej: „Dziękuję za powierzenie mi pracy. Jeśli zechce Pani/Pan podzielić się swoim doświadczeniem, opinię można dodać tutaj: [LINK DO OPINII GOOGLE]. Oczywiście nie ma takiego obowiązku.”
- [ ] Po uzyskaniu zgody klientów wybrać 3–6 autentycznych cytatów do pokazania na stronie; nie dodawać własnego `AggregateRating` ani sztucznych gwiazdek
- [ ] Jeśli istnieją dodatkowe szkolenia warte publikacji, zebrać dla każdego: nazwę, organizatora, rok i zakres. Bez tej listy nie tworzyć pustej sekcji ani skanów „dla SEO”

## P3 — Porządki w kodzie

- [ ] Usunąć osierocony duplikat `img/kopie/paysage-de-juan-les-pins-pablo-picasso/` (5 plików; zastąpiony przez `pablo-picasso-pejzaz-z-lodkami/`)
- [ ] `pablo-picasso-pejzaz-z-lodkami/04.jpg` — pominięty w `data-images` (00|01|02|03|05); dodać albo skasować plik — kopie-obrazow/index.html:159
- [ ] Usunąć martwe atrybuty `data-fill="kopie|konserwacje|realizacje"` (nic ich nie czyta)
- [x] Naprawić markup SVG: niedomknięte `<path>` na index.html, artefakty `"../>` na podstronach (zrobione razem z `aria-hidden`)
- [x] main.js — absolutny link do polityki prywatności → relatywny (naprawione przy pakiecie dostępności)
- [x] Link „Ustawienia prywatności" w stopce + osobne, wersjonowane zgody na GA4 i Mapy Google
- [ ] Custom 404 (teraz default hostingu)
- [ ] `apple-touch-icon` + fallback favicon PNG/ICO (jest tylko SVG)
- [ ] Wynieść inline style z HTML do klas (drobne, przy okazji)

## P4 — Architektura / decyzje

- [ ] Header/footer/cookie-banner/inline-skrypt są skopiowane w 8 plikach PL + 6 EN + 6 DE i już wcześniej się rozjechały (nav w `aktualnosci/` ma 5 pozycji, reszta 4) — przy TRZECH językach generator/szablonowanie robi się coraz bardziej zasadne („zmiana menu = 20 plików")
- [ ] Los `aktualnosci/`: albo na produkcję (nav na wszystkich stronach + sitemap + zdjąć noindex), albo usunąć
- [x] Potwierdzić, że zofiasiek.pl serwuje z korzenia domeny — potwierdzone live 2026-07-08 (strona odpowiada z `/`, canonicale poprawne)
- [x] Analityka: GA4 `G-VFS072VFK9` w Basic Consent Mode, ładowana wyłącznie po osobnej zgodzie
