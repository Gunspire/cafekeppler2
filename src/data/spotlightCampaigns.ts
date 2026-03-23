/**
 * Spotlight pop-ups: date rules + content.
 *
 * - `schedule.kind === "always"` — evergreen: willekeurig één per browser-sessie
 *   (pool van alle “always”-campagnes; bij wijziging van de pool opnieuw trekken).
 * - `schedule.kind === "range"` — alleen tussen start en end (YYYY-MM-DD, inclusive).
 *
 * Prioriteit op een dag:
 * - Als er minstens één **range**-campagne actief is: die winnen (sort op priority,
 *   dan smallere range). **Timed campagnes gaan vóór evergreen.**
 * - Anders: willekeurige keuze uit alle actieve **always**-campagnes.
 */

export type SpotlightSchedule =
  | { kind: "always" }
  | { kind: "range"; start: string; end: string };

export type SpotlightCampaign = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional badge on the image (default “Nieuw” in UI). */
  badgeLabel?: string;
  /**
   * Optioneel: klikbaar belnummer (`tel:`). Gebruik E.164 zonder `tel:` in `tel`, bv. "+31207370838".
   */
  phone?: { tel: string; label: string };
  schedule: SpotlightSchedule;
  /**
   * Higher = wins when multiple campaigns match the same date.
   * If omitted: ranges default to 1000, “always” to 0.
   */
  priority?: number;
};

export const SPOTLIGHT_CAMPAIGNS: SpotlightCampaign[] = [
  {
    id: "evergreen-vleesplankje-buitengewone-varkens",
    eyebrow: "Op de kaart",
    title: "Het vleesplankje",
    description:
      "Samen met Johan van Buitengewone Varkens stellen we het vleesplankje samen: het vlees komt van dieren die bij NoordOogst worden verzorgd. Vast op het plankje maken wij de rillettes de porc, ingelegde rode kool en roggecrackers. Wat er verder bij ligt — gedroogde ham, grillworst, sobrasada, Saksische leverworst en meer — wisselt steeds.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.11.08.webp",
    imageAlt:
      "Vleesplankje met charcuterie bij Café Keppler",
    badgeLabel: "Wisselend",
    schedule: { kind: "always" },
  },
  {
    id: "evergreen-shakshuka-avondkaart",
    eyebrow: "Avondkaart",
    title: "Shakshuka",
    description:
      "Een vast gerecht op onze avondkaart: shakshuka van tomaten, geroosterde paprika, spinazie en witte boontjes met tahini en zhoug, met wortelsalade en ons eigen zuurdesembrood. Heerlijk om te delen — kom het proeven.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.18.11.webp",
    imageAlt: "Shakshuka op de avondkaart bij Café Keppler",
    badgeLabel: "Avond",
    schedule: { kind: "always" },
  },
  {
    id: "evergreen-kaasfondue-beemster-stolwijker",
    eyebrow: "Het hele jaar",
    title: "Kaasfondue",
    description:
      "Kaasfondue van Beemster- en Stolwijkerkaas hebben we het hele jaar door. Geserveerd met ons zuurdesembrood, crudités, witlof en een groene salade — ideaal om te delen.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.22.36.webp",
    imageAlt: "Kaasfondue bij Café Keppler",
    badgeLabel: "Fondue",
    schedule: { kind: "always" },
  },
  {
    id: "evergreen-zoet-eigen-bakkerij",
    eyebrow: "Bakkerij",
    title: "Zoet uit eigen oven",
    description:
      "We bakken het hele jaar door al het aangeboden zoet zelf: carrot cake, appeltaart, frangipane met rabarber, cheesecake met lemoncurd, Tarte de Santiago en meer. Vraag aan de bar wat er die dag ligt — of neem een punt mee.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.24.44.webp",
    imageAlt: "Huisgemaakt gebak bij Café Keppler",
    badgeLabel: "Zoet",
    schedule: { kind: "always" },
  },
  // Pasen — bestellen tot vrijdag 3 april 2026
  {
    id: "pasqua-di-colombo-pasen-2026",
    eyebrow: "Pasen · Bakkerij",
    title: "Pasqua di Colombo",
    description:
      "Met Pasen maken we een Pasqua di Colombo in een ronde vorm: qua structuur vergelijkbaar met panettone, maar doorgaans gevuld met gekonfijte sinaasappelschil, amandelen en parelsuiker. Heerlijk bij het ontbijt. Bestellen kan tot en met vrijdag 3 april via de website of bel naar",
    phone: { tel: "+31207370838", label: "020-7370838" },
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.05.47.webp",
    imageAlt:
      "Pasqua di Colombo — ronde Paastaart bij Café Keppler",
    badgeLabel: "Pasen",
    schedule: { kind: "range", start: "2026-03-10", end: "2026-04-03" },
  },
  // Tweede week van april — heeft voorrang boven de placeholder
  {
    id: "keppler-klassiek-kippenbout-april-2026",
    eyebrow: "Keppler Klassiek",
    title:
      "Gestoofde kippenbout in dragon-roomsaus met roseval-aardappelen",
    description:
      "Een echte Keppler-klassieker: malse kippenbout in een romige dragon-roomsaus, met roseval-aardappelen. In de tweede week van april extra in de schijnwerpers — kom proeven aan tafel.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.36.41.webp",
    imageAlt:
      "Gestoofde kippenbout met dragon-roomsaus en roseval-aardappelen bij Café Keppler",
    badgeLabel: "Klassiek",
    schedule: { kind: "range", start: "2026-04-08", end: "2026-04-14" },
  },
  // Koningsdag — Keppler Kapsalon
  {
    id: "koningsdag-keppler-kapsalon-2026",
    eyebrow: "Koningsdag",
    title: "Keppler Kapsalon",
    description:
      "Op Koningsdag zijn we open tot 15:30. Die dag serveren we de Keppler Kapsalon: sla, huisgemaakte friet, zuurvlees en kaasfondue-saus — kom langs vóór sluitingstijd.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2011.34.36.jpeg",
    imageAlt: "Keppler Kapsalon met sla, friet, zuurvlees en kaasfondue-saus",
    badgeLabel: "Koningsdag",
    schedule: { kind: "range", start: "2026-04-27", end: "2026-04-27" },
  },
  // Tweede week van mei — aspergeseizoen
  {
    id: "asperges-dagschotel-mei-2026",
    eyebrow: "Seizoen",
    title: "Asperges als dagschotel",
    description:
      "In mei, als de asperges uit de grond zijn, serveren we ze als dagschotel met krieltjes en hollandaise. In de tweede week van mei extra in de schijnwerpers — kom proeven.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.20.30.webp",
    imageAlt: "Asperges met krieltjes en hollandaise bij Café Keppler",
    badgeLabel: "Mei",
    schedule: { kind: "range", start: "2026-05-08", end: "2026-05-14" },
  },
  // Juli & augustus — zomer op de kaart
  {
    id: "zalm-aardappelsalade-juli-augustus-2026",
    eyebrow: "Zomer op de kaart",
    title: "Wilde koudgerookte zalm",
    description:
      "In juli en augustus serveren we wilde koudgerookte zalm met een frisse aardappelsalade — licht, smaakvol en precies goed voor lange zomeravonden. Een van onze favorieten uit het seizoen; kom proeven aan tafel of op het terras.",
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.28.00.webp",
    imageAlt: "Koudgerookte zalm met aardappelsalade bij Café Keppler",
    badgeLabel: "Zomer",
    schedule: { kind: "range", start: "2026-07-01", end: "2026-08-31" },
  },
  // Kerst — kerstbroden bestellen
  {
    id: "kerstbrood-bakkerij-2026",
    eyebrow: "Kerst · Bakkerij",
    title: "Kerstbroden",
    description:
      "Voor Kerst bakken we kerstbroden, gevuld met o.a. amandelspijs, vijgen en rozijnen. Bestellen kan via de website of bel naar",
    phone: { tel: "+31207370838", label: "020-7370838" },
    imageSrc:
      "/nieuw%20fotos/WhatsApp%20Image%202026-03-23%20at%2010.32.32.webp",
    imageAlt: "Kerstbrood bij Café Keppler",
    badgeLabel: "Kerst",
    schedule: { kind: "range", start: "2026-12-01", end: "2026-12-24" },
  },
];

/** sessionStorage: één keer sluiten per tab-sessie (welke campagne dan ook). */
export const SPOTLIGHT_SESSION_DISMISS_KEY = "keppler_spotlight_dismiss_v2";

/**
 * sessionStorage: welke evergreen-campagne (“always”) is voor deze tab gekozen
 * (blijft gelijk tot de pool van ids wijzigt of de tab sluit).
 */
export const SPOTLIGHT_EVERGREEN_PICK_KEY = "keppler_spotlight_evergreen_pick_v1";

export function formatLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseLocalDateString(iso: string): Date {
  const [yy, mm, dd] = iso.split("-").map(Number);
  return new Date(yy, mm - 1, dd);
}

function defaultPriority(schedule: SpotlightSchedule): number {
  return schedule.kind === "range" ? 1000 : 0;
}

function rangeSpanDays(schedule: SpotlightSchedule): number {
  if (schedule.kind === "always") return Number.POSITIVE_INFINITY;
  const a = parseLocalDateString(schedule.start);
  const b = parseLocalDateString(schedule.end);
  const diff = Math.round((b.getTime() - a.getTime()) / 86400000);
  return diff + 1;
}

function isActiveOn(c: SpotlightCampaign, dateStr: string): boolean {
  if (c.schedule.kind === "always") return true;
  return dateStr >= c.schedule.start && dateStr <= c.schedule.end;
}

function pickBestAmongTimed(campaigns: SpotlightCampaign[]): SpotlightCampaign {
  const sorted = [...campaigns].sort((a, b) => {
    const pa = a.priority ?? defaultPriority(a.schedule);
    const pb = b.priority ?? defaultPriority(b.schedule);
    if (pb !== pa) return pb - pa;
    return rangeSpanDays(a.schedule) - rangeSpanDays(b.schedule);
  });
  return sorted[0];
}

function pickRandomEvergreen(campaigns: SpotlightCampaign[]): SpotlightCampaign {
  if (campaigns.length === 1) return campaigns[0];

  const pool = [...campaigns]
    .map((c) => c.id)
    .sort()
    .join("|");

  try {
    if (typeof sessionStorage !== "undefined") {
      const raw = sessionStorage.getItem(SPOTLIGHT_EVERGREEN_PICK_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { pool: string; choice: string };
        if (parsed.pool === pool) {
          const found = campaigns.find((c) => c.id === parsed.choice);
          if (found) return found;
        }
      }
    }
  } catch {
    // ignore
  }

  const idx = Math.floor(Math.random() * campaigns.length);
  const choice = campaigns[idx];

  try {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(
        SPOTLIGHT_EVERGREEN_PICK_KEY,
        JSON.stringify({ pool, choice: choice.id }),
      );
    }
  } catch {
    // ignore
  }

  return choice;
}

/**
 * Welke campagne hoort bij deze kalenderdag (lokale tijd).
 * Timed ranges hebben altijd voorrang; anders willekeurig onder de “always”-campagnes.
 */
export function pickSpotlightForDate(date: Date): SpotlightCampaign | null {
  const d = formatLocalDate(date);
  const active = SPOTLIGHT_CAMPAIGNS.filter((c) => isActiveOn(c, d));
  if (active.length === 0) return null;

  const timed = active.filter((c) => c.schedule.kind === "range");
  if (timed.length > 0) {
    return pickBestAmongTimed(timed);
  }

  const evergreen = active.filter((c) => c.schedule.kind === "always");
  if (evergreen.length === 0) return null;

  return pickRandomEvergreen(evergreen);
}
