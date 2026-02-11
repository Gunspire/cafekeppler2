import React from "react";
import { Link } from "react-router-dom";

type LocalPartner = {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  story: string;
  highlights: string[];
};

const LOCAL_PARTNERS: LocalPartner[] = [
  {
    title: "Zuivel uit de buurt",
    subtitle: "Voor cappuccino’s, yoghurt en boter",
    imageSrc: "/cafe-keppler-koffiebar-amsterdam.jpg",
    imageAlt: "Koffiebar bij Café Keppler",
    story:
      "Goede melk maakt het verschil. Daarom kiezen we voor zuivel van dichtbij — vers, eerlijk en met aandacht geproduceerd. Zo proef je in elke koffie dezelfde romige kwaliteit.",
    highlights: ["Melk voor espresso-dranken", "Yoghurt & room", "Roomboter op brood"],
  },
  {
    title: "Groenten & kruiden van het seizoen",
    subtitle: "Vers, simpel, precies op z’n best",
    imageSrc: "/intro-food.png",
    imageAlt: "Verse ingrediënten",
    story:
      "Onze lunch en specials bewegen mee met het seizoen. We werken met leveranciers die oog hebben voor smaak en kwaliteit, zodat je bord altijd fris en in balans is.",
    highlights: ["Seizoensgroenten", "Kruiden & bladgroen", "Soepen en dagspecials"],
  },
  {
    title: "Kaas, vleeswaren & borrel",
    subtitle: "Voor planken, bites en een goede borrel",
    imageSrc: "/dish-3.png",
    imageAlt: "Borrelgerecht",
    story:
      "Bij Keppler draait borrelen om delen en proeven. We kiezen producten die passen bij onze stijl: niet te ingewikkeld, wel heel goed — en het liefst van makers uit de buurt.",
    highlights: ["Kaas & charcuterie", "Borrelgarnituren", "Vulling voor tosti’s & broodjes"],
  },
  {
    title: "Bier, wijn & dranken",
    subtitle: "Lokaal waar het kan, zorgvuldig gekozen waar het moet",
    imageSrc: "/cafe-keppler-wil-voor-import-en.jpg",
    imageAlt: "Sfeerbeeld in het café",
    story:
      "Voor onze kaart zoeken we naar dranken met karakter: goed doordrinkbaar, maar nooit saai. We geven ruimte aan lokale brouwers en makers, en vullen aan met favorieten die gewoon kloppen.",
    highlights: ["Lokale bieren", "Wijn per glas", "Fris & non-alcoholisch"],
  },
  {
    title: "Eigen micro‑branderij & bakkerij",
    subtitle: "Huisgemaakt is bij ons écht huisgemaakt",
    imageSrc: "/bakery-photo.png",
    imageAlt: "Bakkerij bij Café Keppler",
    imagePosition: "center",
    story:
      "Naast lokaal inkopen, maken we veel zelf. We branden onze koffiebonen en bakken dagelijks brood en zoet in eigen huis. Zo houden we de kwaliteit strak — en de geur in het café is een mooie bonus.",
    highlights: ["Koffie uit eigen branderij", "Desembrood & croissants", "Taart & zoet"],
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
                className={idx % 2 === 1 ? "lokaalPartner lokaalPartner--reverse" : "lokaalPartner"}
              >
                <div className="lokaalPartner__media" aria-hidden="true">
                  <img
                    className="lokaalPartner__img"
                    src={p.imageSrc}
                    alt={p.imageAlt}
                    loading="lazy"
                    decoding="async"
                    style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                  />
                </div>

                <div
                  className="lokaalPartner__content"
                  ref={(el) => {
                    contentRefs.current[idx] = el;
                  }}
                >
                  <div className="eyebrow">Leverancier</div>
                  <h3 className="lokaalPartner__title">{p.title}</h3>
                  <p className="lokaalPartner__subtitle">{p.subtitle}</p>
                  <p className="lokaalPartner__story">{p.story}</p>
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

