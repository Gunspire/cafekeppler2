export type ActueelItem = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
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
    slug: "muziekquiz",
    title: "Muziekquiz bij Keppler",
    date: "2026-02-18",
    excerpt:
      "Een gezellige avond met rondes vol herkenning, verrassingen en een klein prijsje voor de winnaars.",
    imageSrc: "/actueel-muziekquiz.png",
    imageAlt: "Poster van de Muziekquiz-avond bij Café Keppler",
    body: [
      "Zin in een gezellige avond met vrienden? Doe mee met onze muziekquiz: rondes vol meezingers, guilty pleasures en verrassende classics.",
      "We spelen in teams, met korte pauzes tussendoor voor een drankje. Er is een klein prijsje voor de winnaars en natuurlijk vooral veel lol.",
      "Wil je meedoen? Kom op tijd binnen zodat je rustig een tafel kunt vinden. Voor grotere groepen: stuur even een bericht via de contactpagina.",
    ],
  },
  {
    slug: "soepfestival",
    title: "Soepfestival",
    date: "2026-03-01",
    excerpt:
      "Proef drie seizoenssoepen, kies je favoriet en neem een pot mee naar huis. Details volgen.",
    imageSrc: "/actueel-soepfestival.webp",
    imageAlt: "Soepfestival (beeld)",
    body: [
      "Een middag om te proeven: we zetten meerdere seizoenssoepen klaar en je kunt ze per kom of in een proeverij proberen.",
      "Stem op je favoriet en neem een pot mee naar huis. We delen de exacte tijden en line-up dichter op de datum.",
      "Heb je allergieën of dieetwensen? Laat het ons weten — we denken graag mee.",
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

