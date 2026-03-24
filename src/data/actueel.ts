import { SHARED_HERO_BACKGROUND_SLIDES } from "./sharedHeroBackgroundSlides";

export type ActueelItem = {
  slug: string;
  title: string;
  date?: string; // YYYY-MM-DD
  dateLabel?: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  ribbon?: string;
  showOnHome?: boolean;
  /** Toon poster in tekst + lightbox (bijv. muziekquiz). */
  showPosterLightbox?: boolean;
  body: string[];
};

export function formatNl(dateIso: string) {
  // Minimal, locale-safe formatting without extra deps.
  const d = new Date(`${dateIso}T12:00:00`);
  return d.toLocaleDateString("nl-NL", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export const ACTUEEL_ITEMS: ActueelItem[] = [
  {
    slug: "expositie",
    title: "Wisselende expositie",
    date: "2026-02-13",
    dateLabel: "Doorlopend",
    excerpt:
      "Elke 3 maanden een nieuwe expositie in het café — kom kijken tijdens je borrel, lunch of diner.",
    imageSrc: "/pictures/Generated%20Image%20February%2013,%202026%20-%202_53PM.jpeg",
    imageAlt: "Kunstwerk aan de muur bij Café Keppler",
    ribbon: "Elke 3 maanden",
    showOnHome: false,
    body: [
      "Bij Keppler hangt er doorlopend kunst aan de muur. Elke 3 maanden wisselen we de expositie en geven we nieuw werk een plek in het café.",
      "Kom gerust even rondkijken tijdens je borrel, lunch of diner — en vraag ons aan de bar naar het verhaal achter de werken.",
      "Ben je kunstenaar en lijkt het je leuk om te exposeren? Stuur ons een bericht via de contactpagina met een korte introductie en wat voorbeelden van je werk.",
    ],
  },
  {
    slug: "keppler-klassiek",
    title: "Keppler Klassiek",
    dateLabel: "2× per jaar",
    excerpt:
      "Twee keer per jaar spelen studenten van het conservatorium een toegankelijk klassiek programma bij Keppler.",
    imageSrc: SHARED_HERO_BACKGROUND_SLIDES[0].src,
    imageAlt: SHARED_HERO_BACKGROUND_SLIDES[0].alt,
    ribbon: "2× per jaar",
    body: [
      "Keppler Klassiek is een laagdrempelige avond met live klassieke muziek, gebracht door studenten van het conservatorium.",
      "We kiezen een programma dat toegankelijk is — ook als je niet ‘in’ klassiek zit — met korte toelichtingen en ruimte om gewoon te luisteren met een drankje erbij.",
      "De avonden zijn er twee keer per jaar. Houd Actueel in de gaten voor de volgende editie.",
    ],
  },
  {
    slug: "keppler-klaverjassen",
    title: "Spelletjesavond in Keppler",
    date: "2026-04-02",
    dateLabel: "Do 2 apr · 20:30",
    excerpt:
      "Spelletjesavond in het café — o.a. klaverjassen: laagdrempelig, met uitleg en een drankje erbij. Start om 20:30.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-11%20at%2015.01.28.jpeg",
    imageAlt: "Spelletjesavond in Keppler — klaverjassen bij Café Keppler",
    ribbon: "Leer het spel",
    body: [
      "Spelletjesavond in Keppler draait om gezellig samen spelen — met deze editie de focus op klaverjassen. Nieuw met klaverjassen, of wil je je spel weer even opfrissen? Schuif aan.",
      "We leggen de basis rustig uit (spelverloop, punten en afspraken) en spelen vervolgens een paar ontspannen rondes.",
      "De volgende spelletjesavond is op donderdag 2 april vanaf 20:30. Houd Actueel in de gaten voor volgende edities — of vraag ernaar aan de bar.",
    ],
  },
  {
    slug: "muziekquiz",
    title: "Muziekquiz bij Keppler",
    date: "2026-04-15",
    dateLabel: "Woensdag 15 april · 20:30",
    excerpt:
      "Woensdag 15 april: test je muziekkennis van guilty pleasures tot classics — teams, strijd om roem en een Keppler-voucher. Start 20:30.",
    imageSrc: "/pictures/Poster%20Muziekquiz%20april.jpg",
    imageAlt:
      "Poster Muziekquiz-avond Café Keppler — woensdag 15 april 2026, start 20:30",
    ribbon: "Elke maand",
    showPosterLightbox: true,
    body: [
      "Zin in een gezellige avond met vrienden? Doe mee met onze muziekquiz: rondes vol meezingers, guilty pleasures en verrassende classics.",
      "We spelen in teams, met korte pauzes tussendoor voor een drankje. Er is een klein prijsje voor de winnaars en natuurlijk vooral veel lol.",
      "De eerstvolgende avond is woensdag 15 april; start om 20:30. Wil je meedoen? Kom op tijd binnen zodat je rustig een tafel kunt vinden. Voor grotere groepen: stuur even een bericht via de contactpagina.",
    ],
  },
  {
    slug: "soepfestival",
    title: "Soepfestival: De Gouden Pollepel",
    date: "2026-03-01",
    excerpt:
      "Jaarlijks internationaal soepfestival, georganiseerd met de ondernemersvereniging Van der Pek, buurtorganisaties en scholen.",
    imageSrc: "/actueel-soepfestival.webp",
    imageAlt: "Soepfestival (beeld)",
    body: [
      "In samenwerking met de ondernemersvereniging Van der Pek, buurtorganisaties en scholen organiseren we jaarlijks het internationaal soepfestival ‘De Gouden Pollepel’.",
      "Een feestelijke dag voor de buurt: kom proeven, ontmoet makers uit de wijk en ontdek soepen uit verschillende keukens.",
      "Meer info over datum, tijden en deelnemende partijen volgt dichter op de editie.",
    ],
  },
  {
    slug: "buurtborrel",
    title: "Keppler buurtborrel",
    dateLabel: "Datum volgt binnenkort",
    excerpt:
      "Een relaxed moment voor de buurt: borrelhap, lokale drankjes en fijne muziek. De datum maken we binnenkort bekend.",
    imageSrc: SHARED_HERO_BACKGROUND_SLIDES[1].src,
    imageAlt: SHARED_HERO_BACKGROUND_SLIDES[1].alt,
    body: [
      "Een laagdrempelige borrel voor de buurt: even bijpraten, een drankje, iets lekkers en fijne muziek op de achtergrond.",
      "We zetten een kleine selectie borrelhappen klaar en zorgen voor een warme, ongedwongen sfeer.",
      "De datum van de volgende buurtborrel volgt binnenkort — houd de website in de gaten of vraag ernaar aan de bar.",
    ],
  },
];

export function getActueelBySlug(slug: string) {
  return ACTUEEL_ITEMS.find((i) => i.slug === slug) ?? null;
}

