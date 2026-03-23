/**
 * Same 2-slide rotation on home + Actueel + Lokaal.
 * Each page can start on a different slide where possible (see HERO_START_SLIDE_INDEX).
 */
export type SharedHeroSlide = { src: string; alt: string };

export const SHARED_HERO_BACKGROUND_SLIDES: SharedHeroSlide[] = [
  {
    src: "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.51.46.webp",
    alt: "Café Keppler sfeerbeeld",
  },
  {
    src: "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.52.04.webp",
    alt: "Café Keppler interieur",
  },
];

/** Which slide shows first on each page (then cycles). With 2 slides, indices are 0 or 1. */
export const HERO_START_SLIDE_INDEX = {
  home: 0,
  actueel: 1,
  lokaal: 0,
} as const;
