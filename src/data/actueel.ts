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
    imageSrc: "/01-misset-cafe-keppler-9049.jpg",
    imageAlt: "Interieur van Café Keppler",
    ribbon: "2× per jaar",
    body: [
      "Keppler Klassiek is een laagdrempelige avond met live klassieke muziek, gebracht door studenten van het conservatorium.",
      "We kiezen een programma dat toegankelijk is — ook als je niet ‘in’ klassiek zit — met korte toelichtingen en ruimte om gewoon te luisteren met een drankje erbij.",
      "De avonden zijn er twee keer per jaar. Houd Actueel in de gaten voor de volgende editie.",
    ],
  },
  {
    slug: "keppler-klaverjassen",
    title: "Keppler Klaverjassen",
    dateLabel: "Doorlopend",
    excerpt:
      "Leer het spel bij ons in het café — laagdrempelig, met uitleg en een drankje erbij.",
    imageSrc: "/01-misset-cafe-keppler-9049.jpg",
    imageAlt: "Tafel in Café Keppler",
    ribbon: "Leer het spel",
    body: [
      "Nieuw met klaverjassen, of wil je je spel weer even opfrissen? Schuif aan bij Keppler Klaverjassen.",
      "We leggen de basis rustig uit (spelverloop, punten en afspraken) en spelen vervolgens een paar ontspannen rondes.",
      "Houd Actueel in de gaten voor de eerstvolgende keer — of vraag ernaar aan de bar.",
    ],
  },
  {
    slug: "muziekquiz",
    title: "Muziekquiz bij Keppler",
    date: "2026-02-18",
    excerpt:
      "Een gezellige avond met rondes vol herkenning, verrassingen en een klein prijsje voor de winnaars.",
    imageSrc: "/actueel-muziekquiz.png",
    imageAlt: "Poster van de Muziekquiz-avond bij Café Keppler",
    ribbon: "Elke maand",
    body: [
      "Zin in een gezellige avond met vrienden? Doe mee met onze muziekquiz: rondes vol meezingers, guilty pleasures en verrassende classics.",
      "We spelen in teams, met korte pauzes tussendoor voor een drankje. Er is een klein prijsje voor de winnaars en natuurlijk vooral veel lol.",
      "Wil je meedoen? Kom op tijd binnen zodat je rustig een tafel kunt vinden. Voor grotere groepen: stuur even een bericht via de contactpagina.",
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
    date: "2026-03-15",
    excerpt:
      "Een relaxed moment voor de buurt: borrelhap, lokale drankjes en fijne muziek. Meer info binnenkort.",
    imageSrc: "/01-misset-cafe-keppler-9049.jpg",
    imageAlt: "Interieur van Café Keppler",
    body: [
      "Een laagdrempelige borrel voor de buurt: even bijpraten, een drankje, iets lekkers en fijne muziek op de achtergrond.",
      "We zetten een kleine selectie borrelhappen klaar en zorgen voor een warme, ongedwongen sfeer.",
      "Meer info volgt — houd de website in de gaten of vraag ernaar aan de bar.",
    ],
  },
];

export function getActueelBySlug(slug: string) {
  return ACTUEEL_ITEMS.find((i) => i.slug === slug) ?? null;
}

