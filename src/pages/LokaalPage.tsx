import React from "react";
import { Link } from "react-router-dom";

type LocalPartner = {
  category: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  story: string;
  highlights: string[];
  links?: Array<{ href: string; label: string }>;
};

const LOCAL_PARTNERS: LocalPartner[] = [
  {
    category: "Koffie",
    title: "Koffie van Kees",
    subtitle: "Espresso & filter — ook te koop als bonen (of gemalen)",
    story:
      "Voorheen waren we samen, maar nu kopen we via Kees zijn koffie in: Koffie van Kees. Bijzonder: een aantal soorten zijn ook te koop — als bonen, maar we kunnen ze ook voor je malen.",
    highlights: [
      "Espresso: Noord-blend, Zuid-blend, Sumatra en Peru",
      "Filter: Noord-blend en Panama",
    ],
    links: [{ href: "https://www.koffievankees.nl/", label: "koffievankees.nl" }],
  },
  {
    category: "Bier",
    title: "Brouwerijen",
    subtitle: "Gulpener, Walhalla, Homeland, Oedipus",
    story:
      "Voor onze bieren werken we met brouwerijen die passen bij Keppler: karaktervol, doordrinkbaar en altijd met oog voor kwaliteit.",
    highlights: ["Gulpener", "Walhalla", "Homeland", "Oedipus"],
    links: [
      { href: "https://www.gulpener.nl/", label: "gulpener.nl" },
      { href: "https://www.walhallacraftbeer.nl/", label: "walhallacraftbeer.nl" },
      { href: "https://brouwerijhomeland.nl/?lang=en", label: "brouwerijhomeland.nl" },
      { href: "https://oedipus.com/nl", label: "oedipus.com" },
    ],
  },
  {
    category: "Wijn",
    title: "Margeret Wines",
    subtitle: "Alle wijnen",
    story:
      "Onze wijnen komen via Margeret Wines. Zo houden we de selectie overzichtelijk en consistent — van glas tot fles.",
    highlights: ["Wijn per glas", "Wijn per fles", "Altijd passend bij de kaart"],
    links: [{ href: "https://www.margaretwines.com/", label: "margaretwines.com" }],
  },
  {
    category: "Natuurwijn",
    title: "Vinatura",
    subtitle: "Vin-naturels + blond bier (Loirette)",
    story:
      "Vinatura levert onze vin-naturels (natuurwijnen). Daarnaast komt via hen ook het heerlijke blond biertje Loirette.",
    highlights: ["Natuurwijnen (vin-naturels)", "Blond bier: Loirette"],
    links: [{ href: "https://www.vinatura.nl/", label: "vinatura.nl" }],
  },
  {
    category: "Cider",
    title: "Pomme d’Or",
    subtitle: "Alle ciders",
    story:
      "Voor cider werken we met Pomme d’Or. Zo houden we een mooie, consistente selectie op de kaart.",
    highlights: ["Ciders (selectie)"],
    links: [{ href: "https://pommedor.nl/", label: "pommedor.nl" }],
  },
  {
    category: "Groente",
    title: "Tuinen van West",
    subtitle: "Alle seizoensgroenten",
    story:
      "Voor seizoensgroenten werken we met Tuinen van West. Zo koken we mee met wat het land geeft: vers, simpel en op z’n best.",
    highlights: ["Seizoensgroenten", "Kruiden & bladgroen", "Altijd wisselend aanbod"],
    links: [{ href: "https://tuinenvanwest.nl/", label: "tuinenvanwest.nl" }],
  },
  {
    category: "Zuivel",
    title: "Boeren van Amstel",
    subtitle: "Melk en yoghurt",
    story:
      "Voor melk en yoghurt werken we met Boeren van Amstel: boeren uit de regio die lokale zuivel leveren in de korte keten.",
    highlights: ["Melk", "Yoghurt"],
    links: [{ href: "https://boerenvanamstel.nl/", label: "boerenvanamstel.nl" }],
  },
  {
    category: "Cacao & rum",
    title: "Kaap de Groene Hoop",
    subtitle: "Cacao en rum",
    story:
      "Voor cacao en rum werken we samen met Kaap de Groene Hoop — producten met karakter voor in het glas en op de kaart.",
    highlights: ["Cacao", "Rum"],
  },
  {
    category: "Meel & noten",
    title: "Beko",
    subtitle: "Voor al het meel en noten",
    story:
      "Onze bakkerij draait op goede basisproducten. Voor meel en noten kopen we in via Beko.",
    highlights: ["Meel", "Noten", "Basis voor brood & zoet"],
    links: [
      {
        href: "https://www.beko-groothandel.nl/meel-bloem/2304/",
        label: "beko-groothandel.nl",
      },
    ],
  },
  {
    category: "Patisserie",
    title: "Baux Pastry",
    subtitle: "Croissants",
    story:
      "Elke dag bakken we de croissantjes van Baux Pastry af — het enige dat we niet zelf maken, maar wél precies is zoals we het willen.",
    highlights: ["Croissants (dagelijks afgebakken)"],
    links: [{ href: "https://bauxpastry.com/", label: "bauxpastry.com" }],
  },
  {
    category: "Vis",
    title: "Rookt",
    subtitle: "Makreel (als het weer kan)",
    story:
      "Als het weer het toelaat, halen we makreel bij Rookt. Vraag gerust naar de beschikbaarheid.",
    highlights: ["Makreel (seizoens-/weer-afhankelijk)"],
  },
  {
    category: "Vlees",
    title: "Buitengewone Varkens",
    subtitle: "Droge worsten, hammen, vers vlees",
    story:
      "Voor charcuterie en varkensvlees werken we met Buitengewone Varkens — van droge worst tot ham en vers vlees.",
    highlights: ["Droge worsten", "Hammen", "Vers vlees"],
    links: [{ href: "https://buitengewonevarkens.nl/", label: "buitengewonevarkens.nl" }],
  },
  {
    category: "Rundvlees",
    title: "Slagerij de Wit",
    subtitle: "Rundvlees voor Charsjo, broodje bal en smashed burger",
    story:
      "Voor rundvlees werken we met Slagerij de Wit. Je proeft het terug in onze klassiekers en specials.",
    highlights: ["Charsjo", "Broodje bal", "Smashed burger"],
    links: [{ href: "https://slagerdewit.nl/", label: "slagerdewit.nl" }],
  },
  {
    category: "Paddenstoelen",
    title: "Mycophilia",
    subtitle: "Oesterzwam-bitterballen en paddestoelen",
    story:
      "Voor oesterzwam-bitterballen en allerlei soorten paddestoelen werken we met Mycophilia.",
    highlights: ["Oesterzwam-bitterballen", "Paddestoelen (diverse soorten)"],
    links: [{ href: "http://www.mycophilia.nl/", label: "mycophilia.nl" }],
  },
  {
    category: "Kaas",
    title: "Kef",
    subtitle: "Kazen voor het kaasplankje",
    story:
      "Voor ons kaasplankje kiezen we kazen via Kef — zorgvuldig geselecteerd en altijd in balans.",
    highlights: ["Kazen voor het kaasplankje"],
    links: [{ href: "https://www.abrahamkef.nl/", label: "abrahamkef.nl" }],
  },
  {
    category: "Kaas",
    title: "Moll",
    subtitle: "Oude Huizer en Stolwijker kazen (Mosveld Markt)",
    story:
      "Oude Huizer en Stolwijker kazen halen we bij Moll op de Mosveld Markt.",
    highlights: ["Oude Huizer", "Stolwijker", "Mosveld Markt"],
  },
];

export default function LokaalPage() {
  const contentRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [rowHeightPx, setRowHeightPx] = React.useState<number | null>(null);

  React.useEffect(() => {
    let raf = 0;
    const measure = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const heights = contentRefs.current
          .map((el) => (el ? Math.ceil(el.getBoundingClientRect().height) : 0))
          .filter((h) => h > 0);
        const maxH = heights.length ? Math.max(...heights) : 0;
        setRowHeightPx(maxH || null);
      });
    };

    measure();

    // Re-measure when layout changes (responsive, fonts, etc.)
    const ro =
      typeof window !== "undefined" && "ResizeObserver" in window
        ? new ResizeObserver(() => measure())
        : null;

    if (ro) {
      contentRefs.current.forEach((el) => el && ro.observe(el));
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <>
      <section className="page-hero" aria-label="Lokaal">
        <div className="page-hero__bg" aria-hidden="true">
          <img src="/intro-food.png" alt="" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>

        <div className="page-hero__content">
          <div className="eyebrow page-hero__eyebrow">Lokaal</div>
          <h1 className="page-hero__title">Onze leveranciers</h1>
          <p className="page-hero__text">
            We koken en bakken met producten van dichtbij — van makers die we vertrouwen
            en waar we graag mee samenwerken.
          </p>
        </div>
      </section>

      <section className="section lokaal">
        <div className="lokaal__inner">
          <div className="lokaal__copy">
            <div className="eyebrow">Samenwerken</div>
            <h2 className="section-title">Waarom lokaal?</h2>
            <p className="lokaal__text">
              Lokaal inkopen is voor ons geen trend, maar een keuze. We willen weten waar
              onze producten vandaan komen, hoe ze gemaakt worden en wie erachter zit. Zo
              houden we de keten kort, de kwaliteit hoog en de smaak precies zoals we ‘m
              graag hebben.
            </p>
            <p className="lokaal__text">
              Hieronder zie je de soorten partners waar we veel mee werken. Loop je binnen
              en ben je benieuwd naar de exacte makers achter een product? Vraag het gerust
              aan het team — we vertellen er graag over.
            </p>

            <div className="lokaal__actions">
              <Link className="btn btn--primary" to="/contact">
                Contact
              </Link>
              <Link className="btn btn--secondary" to="/#about">
                Terug naar homepage
              </Link>
            </div>
          </div>

          <div
            className="lokaal__partners"
            aria-label="Lokale leveranciers en makers"
            style={
              (rowHeightPx
                ? { ["--lokaal-row-h" as any]: `${rowHeightPx}px` }
                : undefined) as any
            }
          >
            {LOCAL_PARTNERS.map((p, idx) => (
              <article
                key={p.title}
                className={[
                  "lokaalPartner",
                  !p.imageSrc ? "lokaalPartner--noMedia" : null,
                  idx % 2 === 1 ? "lokaalPartner--reverse" : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {p.imageSrc ? (
                  <div className="lokaalPartner__media" aria-hidden="true">
                    <img
                      className="lokaalPartner__img"
                      src={p.imageSrc}
                      alt={p.imageAlt ?? ""}
                      loading="lazy"
                      decoding="async"
                      style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                    />
                  </div>
                ) : null}

                <div
                  className="lokaalPartner__content"
                  ref={(el) => {
                    contentRefs.current[idx] = el;
                  }}
                >
                  <div className="eyebrow">{p.category}</div>
                  <h3 className="lokaalPartner__title">{p.title}</h3>
                  <p className="lokaalPartner__subtitle">{p.subtitle}</p>
                  <p className="lokaalPartner__story">{p.story}</p>
                  {p.links?.length ? (
                    <div className="lokaalPartner__links" aria-label="Website links">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          className="lokaalPartner__link"
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label} →
                        </a>
                      ))}
                    </div>
                  ) : null}
                  <ul className="lokaalPartner__list">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

