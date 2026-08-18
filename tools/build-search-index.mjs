/* ============================================================
   Generator indeksu wyszukiwarki  →  js/search-index.json

   Uruchomienie:  node tools/build-search-index.mjs

   Skąd się biorą dane:
   - kopie obrazów      — tabela ARTWORKS poniżej (tytuły PL/EN/DE, autor, aliasy),
                          a ścieżki i miniatury są sprawdzane względem dysku;
   - konserwacje        — parsowane ze stron konserwacji w trzech językach
                          i łączone po katalogu miniatury (ten sam obraz = ta sama praca);
   - strony działowe    — tabela SECTIONS poniżej.

   Skrypt CELOWO przerywa pracę przy pierwszej niezgodności (brakująca strona,
   brakująca miniatura, rozjazd liczby konserwacji między językami). Lepszy głośny
   błąd tutaj niż wynik wyszukiwania prowadzący na 404.

   Po dodaniu nowej realizacji: dopisz wiersz w ARTWORKS (kopie) albo po prostu
   uruchom skrypt ponownie (konserwacje pobiorą się same) i podbij ?v= przy
   js/main.js w plikach HTML.
   ============================================================ */

import { readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANGS = ['pl', 'en', 'de'];
const OUT = join(ROOT, 'js', 'search-index.json');

/* ----- Strony konserwacji: źródło prac konserwatorskich ----- */
const CONSERVATION_PAGES = {
  pl: 'konserwacja/',
  en: 'en/conservation/',
  de: 'de/restaurierung/'
};

const CONSERVATION_META = {
  pl: 'Konserwacja — przed i po',
  en: 'Conservation — before and after',
  de: 'Restaurierung — vorher und nachher'
};

/* ----- Kopie obrazów -----
   `dir` to katalog zdjęć w img/kopie/ — służy też za klucz łączący wersje językowe.
   `extra` to aliasy wpisywane z palca przez odwiedzających (muzeum, nurt, potoczna nazwa).
   Tytuły z pozostałych języków dopisują się automatycznie, więc "the kiss" znajdzie
   Pocałunek także na polskiej wersji strony. */
const ARTWORKS = [
  {
    dir: 'pocalunek-gustav-klimt',
    artist: 'Gustav Klimt',
    pl: { title: 'Pocałunek', url: 'kopie-obrazow/pocalunek-klimt/' },
    en: { title: 'The Kiss', url: 'en/painting-copies/the-kiss-klimt/' },
    de: { title: 'Der Kuss', url: 'de/gemaeldekopien/kuss-klimt/' },
    extra: ['klimt', 'secesja', 'jugendstil', 'art nouveau', 'zloty okres', 'golden period',
      'belvedere', 'wieden', 'vienna', 'wien', 'zakochani', 'lovers']
  },
  {
    dir: 'kosciol-w-cassone-gustav-klimt',
    artist: 'Gustav Klimt',
    pl: { title: 'Kościół w Cassone', url: 'kopie-obrazow/kosciol-w-cassone-klimt/' },
    en: { title: 'Church in Cassone', url: 'en/painting-copies/church-in-cassone-klimt/' },
    de: { title: 'Kirche in Cassone', url: 'de/gemaeldekopien/kirche-in-cassone-klimt/' },
    extra: ['klimt', 'pejzaz', 'landscape', 'landschaft', 'jezioro garda', 'lago di garda',
      'gardasee', 'wlochy', 'italy', 'italien']
  },
  {
    dir: 'dama-z-gronostajem-leonardo-da-vinci',
    artist: 'Leonardo da Vinci',
    pl: { title: 'Dama z gronostajem', url: 'kopie-obrazow/dama-z-gronostajem/' },
    en: { title: 'Lady with an Ermine', url: 'en/painting-copies/lady-with-an-ermine/' },
    de: { title: 'Die Dame mit dem Hermelin', url: 'de/gemaeldekopien/dame-mit-dem-hermelin/' },
    extra: ['leonardo', 'da vinci', 'cecylia gallerani', 'cecilia gallerani', 'czartoryskich',
      'krakow', 'lasiczka', 'gronostaj', 'ermine', 'hermelin', 'renesans', 'renaissance']
  },
  {
    dir: 'mona-lisa-leonardo-da-vinci',
    artist: 'Leonardo da Vinci',
    pl: { title: 'Mona Lisa', url: 'kopie-obrazow/mona-lisa/' },
    en: { title: 'Mona Lisa', url: 'en/painting-copies/mona-lisa/' },
    de: { title: 'Mona Lisa', url: 'de/gemaeldekopien/mona-lisa/' },
    extra: ['leonardo', 'da vinci', 'gioconda', 'la gioconda', 'la joconde', 'giocondo',
      'luwr', 'louvre', 'paryz', 'paris', 'renesans', 'renaissance', 'portret', 'portrait']
  },
  {
    dir: 'dziewczyna-z-perla-johannes-vermeer',
    artist: 'Johannes Vermeer',
    pl: { title: 'Dziewczyna z perłą', url: 'kopie-obrazow/dziewczyna-z-perla/' },
    en: { title: 'Girl with a Pearl Earring', url: 'en/painting-copies/girl-with-a-pearl-earring/' },
    de: { title: 'Das Mädchen mit dem Perlenohrring', url: 'de/gemaeldekopien/maedchen-mit-dem-perlenohrring/' },
    extra: ['vermeer', 'perla', 'pearl', 'perle', 'kolczyk', 'earring', 'ohrring',
      'mauritshuis', 'haga', 'the hague', 'den haag', 'mona lisa polnocy', 'turban']
  },
  {
    dir: 'gwiazdzista-noc-vincenta-van-gogh',
    artist: 'Vincent van Gogh',
    pl: { title: 'Gwiaździsta noc', url: 'kopie-obrazow/gwiazdzista-noc-van-gogh/' },
    en: { title: 'The Starry Night', url: 'en/painting-copies/the-starry-night-van-gogh/' },
    de: { title: 'Die Sternennacht', url: 'de/gemaeldekopien/sternennacht-van-gogh/' },
    extra: ['van gogh', 'vincent', 'gwiazdy', 'stars', 'sterne', 'moma', 'nowy jork',
      'new york', 'saint remy', 'postimpresjonizm', 'noc', 'night', 'nacht']
  },
  {
    dir: 'krzyk-edvard-munch',
    artist: 'Edvard Munch',
    pl: { title: 'Krzyk', url: 'kopie-obrazow/krzyk-munch/' },
    en: { title: 'The Scream', url: 'en/painting-copies/the-scream-munch/' },
    de: { title: 'Der Schrei', url: 'de/gemaeldekopien/schrei-munch/' },
    extra: ['munch', 'ekspresjonizm', 'expressionism', 'expressionismus', 'oslo',
      'norwegia', 'norway', 'norwegen', 'lek', 'niepokoj']
  },
  {
    dir: 'szal-uniesien-wladyslaw-podkowinski',
    artist: 'Władysław Podkowiński',
    pl: { title: 'Szał uniesień', url: 'kopie-obrazow/szal-uniesien-podkowinski/' },
    en: { title: 'Frenzy of Exultations', url: 'en/painting-copies/frenzy-of-exultations-podkowinski/' },
    de: { title: 'Szał uniesień (Ekstase)', url: 'de/gemaeldekopien/ekstase-podkowinski/' },
    extra: ['podkowinski', 'szal', 'ekstaza', 'ecstasy', 'ekstase', 'symbolizm', 'symbolism',
      'mloda polska', 'muzeum narodowe', 'krakow', 'kon', 'horse', 'pferd']
  },
  {
    dir: 'portret-malzonkow-arnolfinich-jan-van-eyck',
    artist: 'Jan van Eyck',
    pl: { title: 'Portret małżonków Arnolfinich', url: 'kopie-obrazow/portret-malzonkow-arnolfinich/' },
    en: { title: 'The Arnolfini Portrait', url: 'en/painting-copies/the-arnolfini-portrait/' },
    de: { title: 'Die Arnolfini-Hochzeit', url: 'de/gemaeldekopien/arnolfini-hochzeit/' },
    extra: ['van eyck', 'arnolfini', 'national gallery', 'londyn', 'london', 'lustro', 'mirror',
      'spiegel', 'niderlandzkie', 'flamandzkie', 'slub', 'wedding', 'hochzeit', 'gotyk']
  },
  {
    dir: 'pasja-turynska-hans-memling',
    artist: 'Hans Memling',
    pl: { title: 'Pasja Turyńska', url: 'kopie-obrazow/pasja-turynska-memling/' },
    en: { title: 'Scenes from the Passion of Christ', url: 'en/painting-copies/scenes-from-the-passion-of-christ-memling/' },
    de: { title: 'Die Turiner Passion', url: 'de/gemaeldekopien/turiner-passion-memling/' },
    extra: ['memling', 'pasja', 'passion', 'meka panska', 'chrystus', 'christ', 'christus',
      'jerozolima', 'jerusalem', 'turyn', 'turin', 'galleria sabauda', 'sakralne']
  },
  {
    dir: 'matka-boska-wspomozenia-wiernych-lucas-cranach',
    artist: 'Lucas Cranach Starszy',
    pl: { title: 'Matka Boska Wspomożenia Wiernych', url: 'kopie-obrazow/matka-boska-wspomozenia-wiernych-cranach/' },
    en: { title: 'Mary, Help of Christians', url: 'en/painting-copies/mary-help-of-christians-cranach/' },
    de: { title: 'Mariahilf', url: 'de/gemaeldekopien/mariahilf-cranach/' },
    extra: ['cranach', 'lucas cranach', 'mariahilf', 'maryja', 'matka boza', 'madonna',
      'ikona', 'icon', 'innsbruck', 'sakralne', 'religijne', 'dzieciatko']
  },
  {
    dir: 'jozef-krasnowolski-druhny',
    artist: 'Józef Krasnowolski',
    pl: { title: 'Druhny', url: 'kopie-obrazow/druhny-krasnowolski/' },
    en: { title: 'Bridesmaids', url: 'en/painting-copies/bridesmaids-krasnowolski/' },
    de: { title: 'Die Brautjungfern', url: 'de/gemaeldekopien/brautjungfern-krasnowolski/' },
    extra: ['krasnowolski', 'mloda polska', 'stroj ludowy', 'folk', 'wies', 'dziewczeta',
      'polskie malarstwo', 'polish painting']
  },
  {
    dir: 'fruit-and-flowers-orsola-maddalena-cacci',
    artist: 'Orsola Maddalena Caccia',
    pl: { title: 'Fruit and Flowers', url: 'kopie-obrazow/fruit-and-flowers-caccia/' },
    en: { title: 'Fruit and Flowers', url: 'en/painting-copies/fruit-and-flowers-caccia/' },
    de: { title: 'Fruit and Flowers', url: 'de/gemaeldekopien/fruit-and-flowers-caccia/' },
    extra: ['caccia', 'orsola', 'martwa natura', 'still life', 'stillleben', 'owoce', 'fruit',
      'obst', 'kwiaty', 'flowers', 'blumen', 'met', 'metropolitan', 'nowy jork', 'barok']
  },
  {
    dir: 'pablo-picasso-pejzaz-z-lodkami',
    artist: 'Pablo Picasso',
    pl: { title: 'Pejzaż z łódkami', url: 'kopie-obrazow/pejzaz-z-lodkami-picasso/' },
    en: { title: 'Landscape at Juan-les-Pins', url: 'en/painting-copies/landscape-at-juan-les-pins-picasso/' },
    de: { title: 'Landschaft bei Juan-les-Pins', url: 'de/gemaeldekopien/landschaft-bei-juan-les-pins-picasso/' },
    extra: ['picasso', 'kubizm', 'cubism', 'kubismus', 'juan les pins', 'lazurowe wybrzeze',
      'cote d azur', 'lodki', 'boats', 'boote', 'morze', 'pejzaz', 'landscape']
  },
  {
    dir: 'widok-na-kopiec-kosciuszki-w-krakowie-stanislaw-wyspianski',
    artist: 'Stanisław Wyspiański',
    pl: { title: 'Widok na Kopiec Kościuszki', url: 'kopie-obrazow/widok-na-kopiec-kosciuszki-wyspianski/' },
    en: { title: 'View of the Kościuszko Mound in Kraków', url: 'en/painting-copies/view-of-the-kosciuszko-mound-in-krakow-wyspianski/' },
    de: { title: 'Blick auf den Kościuszko-Hügel in Krakau', url: 'de/gemaeldekopien/blick-auf-den-kosciuszko-huegel-wyspianski/' },
    extra: ['wyspianski', 'kopiec kosciuszki', 'krakow', 'kraków', 'cracow', 'krakau',
      'mloda polska', 'pastel', 'pejzaz', 'widok', 'view', 'blick']
  }
];

const ARTWORK_META = {
  pl: 'Kopia obrazu',
  en: 'Painting copy',
  de: 'Gemäldekopie'
};

/* ----- Strony działowe ----- */
const SECTIONS = {
  pl: [
    { url: '', title: 'Strona główna', meta: 'Pracownia', kind: 'info',
      keywords: 'zofia siek mlicka pracownia konserwatorsko artystyczna siedlec krzeszowice krakow malopolska start home' },
    { url: 'kopie-obrazow/', title: 'Kopie obrazów', meta: 'Oferta', kind: 'service',
      keywords: 'kopia obrazu na zamowienie reprodukcja tempera jajeczna olej plotno blejtram format wycena mistrzowie ikona replika' },
    { url: 'konserwacja/', title: 'Konserwacja zabytków i dzieł sztuki', meta: 'Oferta', kind: 'service',
      keywords: 'restauracja renowacja odnawianie obrazu zabytki polichromia werniks dublowanie oczyszczanie retusz rzezba oltarz rama konserwator przed i po' },
    { url: 'o-mnie/', title: 'O mnie', meta: 'Informacje', kind: 'info',
      keywords: 'zofia siek mlicka konserwatorka malarka wyksztalcenie dyplom doswiadczenie pracownia publikacje warsztat' },
    { url: 'kontakt/', title: 'Kontakt', meta: 'Informacje', kind: 'info',
      keywords: 'telefon email adres mapa dojazd wycena zapytanie formularz siedlec krzeszowice godziny' },
    { url: 'polityka-prywatnosci/', title: 'Polityka prywatności', meta: 'Informacje', kind: 'info',
      keywords: 'rodo dane osobowe cookies ciasteczka prywatnosc zgody analityka' }
  ],
  en: [
    { url: 'en/', title: 'Home', meta: 'Studio', kind: 'info',
      keywords: 'zofia siek mlicka studio conservation atelier siedlec krzeszowice krakow poland start' },
    { url: 'en/painting-copies/', title: 'Painting Copies', meta: 'Services', kind: 'service',
      keywords: 'hand painted copy commission reproduction egg tempera oil canvas size quote old masters icon replica' },
    { url: 'en/conservation/', title: 'Conservation & Restoration', meta: 'Services', kind: 'service',
      keywords: 'art conservation restoration painting polychrome sculpture varnish lining cleaning retouching altar frame before and after' },
    { url: 'en/about/', title: 'About', meta: 'Information', kind: 'info',
      keywords: 'zofia siek mlicka conservator painter education diploma experience studio publications' },
    { url: 'en/contact/', title: 'Contact', meta: 'Information', kind: 'info',
      keywords: 'phone email address map directions quote inquiry form siedlec krzeszowice' },
    { url: 'en/privacy-policy/', title: 'Privacy Policy', meta: 'Information', kind: 'info',
      keywords: 'gdpr personal data cookies privacy consent analytics' }
  ],
  de: [
    { url: 'de/', title: 'Startseite', meta: 'Atelier', kind: 'info',
      keywords: 'zofia siek mlicka atelier werkstatt siedlec krzeszowice krakau polen start home' },
    { url: 'de/gemaeldekopien/', title: 'Gemäldekopien', meta: 'Leistungen', kind: 'service',
      keywords: 'gemaeldekopie handgemalt auftrag reproduktion eitempera oel leinwand format preis alte meister ikone replik' },
    { url: 'de/restaurierung/', title: 'Restaurierung von Kunstwerken', meta: 'Leistungen', kind: 'service',
      keywords: 'restaurierung konservierung gemaelde polychrome skulptur firnis doublierung reinigung retusche altar rahmen vorher nachher' },
    { url: 'de/ueber-mich/', title: 'Über mich', meta: 'Informationen', kind: 'info',
      keywords: 'zofia siek mlicka restauratorin malerin ausbildung diplom erfahrung atelier publikationen' },
    { url: 'de/kontakt/', title: 'Kontakt', meta: 'Informationen', kind: 'info',
      keywords: 'telefon email adresse karte anfahrt angebot anfrage formular siedlec krzeszowice' },
    { url: 'de/datenschutz/', title: 'Datenschutzerklärung', meta: 'Informationen', kind: 'info',
      keywords: 'dsgvo personenbezogene daten cookies datenschutz einwilligung analyse' }
  ]
};

/* ----- Pomocnicze ----- */
const problems = [];

function fail(message) {
  problems.push(message);
}

async function exists(relativePath) {
  try {
    await access(join(ROOT, relativePath));
    return true;
  } catch {
    return false;
  }
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Katalog miniatury służy za klucz łączący tę samą pracę w trzech językach. */
function thumbKey(src) {
  const match = src.match(/img\/konserwacje\/([^/]+)\//);
  return match ? match[1] : null;
}

/* Slug w adresie ?work= — powstaje z tytułu w TYM SAMYM języku co strona,
   więc klient dopasowuje go bez żadnej tabeli tłumaczeń. Musi zgadzać się
   ze `slugify()` w js/main.js. */
function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function readConservation(lang) {
  const page = CONSERVATION_PAGES[lang];
  const html = await readFile(join(ROOT, page, 'index.html'), 'utf8');
  const buttons = [...html.matchAll(
    /<button class="gallery-item[^"]*"[^>]*data-title="([^"]*)"[^>]*>([\s\S]*?)<\/button>/g
  )];

  return buttons.map(match => {
    const title = decodeEntities(match[1]);
    const inner = match[2];
    const thumb = inner.match(/src="([^"]*img\/konserwacje\/[^"]+thumb\.jpg)"/);
    if (!thumb) {
      fail(`[${lang}] praca „${title}" nie ma miniatury thumb.jpg`);
      return null;
    }
    return {
      title,
      key: thumbKey(thumb[1]),
      // ścieżki na stronach są względne (../img/...) — indeks trzyma je od korzenia
      thumb: thumb[1].replace(/^(\.\.\/)+/, '')
    };
  }).filter(Boolean);
}

async function build() {
  const index = { version: 1 };
  for (const lang of LANGS) index[lang] = [];

  /* --- Strony działowe --- */
  for (const lang of LANGS) {
    for (const section of SECTIONS[lang]) {
      const target = section.url === '' ? 'index.html' : join(section.url, 'index.html');
      if (!(await exists(target))) fail(`[${lang}] brak strony ${target}`);
      index[lang].push({
        t: section.title,
        s: section.meta,
        u: section.url,
        c: section.kind,
        k: section.keywords
      });
    }
  }

  /* --- Kopie obrazów --- */
  for (const art of ARTWORKS) {
    const thumb = `img/kopie/${art.dir}/thumb.jpg`;
    if (!(await exists(thumb))) fail(`brak miniatury ${thumb}`);

    for (const lang of LANGS) {
      const entry = art[lang];
      if (!(await exists(join(entry.url, 'index.html')))) {
        fail(`[${lang}] brak strony ${entry.url}`);
      }
      // tytuły z pozostałych języków wchodzą jako aliasy — „the kiss" działa też po polsku
      const otherTitles = LANGS.filter(other => other !== lang).map(other => art[other].title);
      index[lang].push({
        t: entry.title,
        s: art.artist,
        u: entry.url,
        i: thumb,
        c: 'copy',
        m: ARTWORK_META[lang],
        k: [...otherTitles, art.artist, ...art.extra].join(' ')
      });
    }
  }

  /* --- Konserwacje --- */
  const conservation = {};
  for (const lang of LANGS) conservation[lang] = await readConservation(lang);

  const counts = LANGS.map(lang => conservation[lang].length);
  if (new Set(counts).size !== 1) {
    fail(`rozjazd liczby prac konserwatorskich: ${LANGS.map((l, i) => `${l}=${counts[i]}`).join(', ')}`);
  }

  const byKey = new Map();
  for (const item of conservation.pl) byKey.set(item.key, { pl: item });
  for (const lang of ['en', 'de']) {
    for (const item of conservation[lang]) {
      const group = byKey.get(item.key);
      if (!group) {
        fail(`[${lang}] praca „${item.title}" (${item.key}) nie ma odpowiednika po polsku`);
        continue;
      }
      group[lang] = item;
    }
  }

  for (const [key, group] of byKey) {
    const missing = LANGS.filter(lang => !group[lang]);
    if (missing.length) {
      fail(`praca ${key} nie ma wersji: ${missing.join(', ')}`);
      continue;
    }
    if (!(await exists(group.pl.thumb))) fail(`brak miniatury ${group.pl.thumb}`);

    for (const lang of LANGS) {
      const otherTitles = LANGS.filter(other => other !== lang).map(other => group[other].title);
      index[lang].push({
        t: group[lang].title,
        s: CONSERVATION_META[lang],
        u: `${CONSERVATION_PAGES[lang]}?work=${slugify(group[lang].title)}`,
        i: group.pl.thumb,
        c: 'conservation',
        m: CONSERVATION_META[lang],
        k: otherTitles.join(' ')
      });
    }
  }

  if (problems.length) {
    console.error('Indeks NIE został zapisany — najpierw napraw:');
    for (const problem of problems) console.error(`  • ${problem}`);
    process.exitCode = 1;
    return;
  }

  await writeFile(OUT, JSON.stringify(index) + '\n', 'utf8');
  const summary = LANGS.map(lang => `${lang}=${index[lang].length}`).join(', ');
  console.log(`Zapisano js/search-index.json (${summary})`);
}

build().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
