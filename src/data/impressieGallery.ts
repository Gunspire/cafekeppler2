/**
 * Foto’s voor de homepage “Impressie”-sectie.
 * Meeste bestanden in `public/foto/`; laatste in `public/pictures/`.
 */
const FILES = [
  "WhatsApp Image 2026-03-11 at 18.05.31 (1).webp",
  "WhatsApp Image 2026-03-11 at 18.05.31 (2).webp",
  "WhatsApp Image 2026-03-11 at 18.05.31 (3).webp",
  "WhatsApp Image 2026-03-11 at 18.05.31 (4).webp",
  "WhatsApp Image 2026-03-11 at 18.05.31 (5).webp",
  "WhatsApp Image 2026-03-11 at 18.05.31 (6).webp",
  "WhatsApp Image 2026-03-11 at 18.05.31.webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (1).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (2).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (3).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (4).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (5).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (6).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (7).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (8).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (9).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (10).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (11).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32 (12).webp",
  "WhatsApp Image 2026-03-11 at 18.05.32.webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (1).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (2).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (3).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (4).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (5).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (7).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (8).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33 (9).webp",
  "WhatsApp Image 2026-03-11 at 18.05.33.webp",
] as const;

const LAST_IMPRESSIE = {
  dir: "pictures",
  file: "WhatsApp Image 2026-02-03 at 14.20.00.webp",
} as const;

export type ImpressieImage = {
  src: string;
  alt: string;
};

const FOTO_DIR = "foto";

export const IMPRESSIE_GALLERY_IMAGES: ImpressieImage[] = [
  ...FILES.map((file, i) => ({
    src: `/${encodeURIComponent(FOTO_DIR)}/${encodeURIComponent(file)}`,
    alt: `Café Keppler — sfeerbeeld ${i + 1}`,
  })),
  {
    src: `/${encodeURIComponent(LAST_IMPRESSIE.dir)}/${encodeURIComponent(LAST_IMPRESSIE.file)}`,
    alt: `Café Keppler — sfeerbeeld ${FILES.length + 1}`,
  },
];
