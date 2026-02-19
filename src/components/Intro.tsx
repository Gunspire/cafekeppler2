import React from "react";

export default function Intro() {
  const slides = React.useMemo(
    () => [
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.19.34%20(3).webp",
        alt: "Huisgemaakt (beeld 1)",
      },
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.19.34%20(1).webp",
        alt: "Huisgemaakt (beeld 2)",
      },
      {
        src: "/pictures/Screenshot%202026-02-04%20at%2012.30.52.png",
        alt: "Huisgemaakt (beeld 3)",
      },
    ],
    [],
  );
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="section intro" id="about">
      <div className="intro__inner">
        <div className="intro__content">
          <div className="eyebrow">Onze Filosofie</div>
          <h2 className="section-title">Lokaal & Huisgemaakt</h2>
          <p className="intro__text">
            Bij Café Keppler kiezen we bewust voor lokale kwaliteit. We werken uitsluitend
            met ingrediënten en producten uit de regio. Van de melk in je cappuccino tot
            de groenten in je lunch: alles komt van leveranciers die we persoonlijk kennen.
          </p>
          <p className="intro__text">
            En wat we niet lokaal kunnen halen, maken we zelf. Onze taarten, soepen
            en broodjes worden dagelijks vers bereid in onze eigen keuken. Puur, eerlijk
            en met liefde gemaakt.
          </p>
        </div>
        <div className="intro__image">
          {slides.map((s, idx) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className={idx === activeIdx ? "intro__slide is-active" : "intro__slide"}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              aria-hidden={idx === activeIdx ? undefined : true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
