import React, { useEffect, useMemo, useState } from "react";

export default function Hero() {
  const slides = useMemo(
    () => [
      { src: "/hero-2.jpeg", alt: "Café Keppler sfeer (avond)" },
      {
        src: "/Generated Image February 04, 2026 - 1_08PM.jpeg",
        alt: "Café Keppler terras sfeer",
      },
      { src: "/01-misset-cafe-keppler-9049.jpg", alt: "Café Keppler sfeer" },
    ],
    [],
  );

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="hero">
      <div className="hero__bg">
        {slides.map((s, idx) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={idx === activeIdx ? "hero__bgImg is-active" : "hero__bgImg"}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ))}
      </div>
      <div className="hero__overlay"></div>

      <div className="hero__content">
        <div className="eyebrow hero__eyebrow">Sinds 2016</div>
        <h1 className="hero__title">Café Keppler</h1>
        <p className="hero__text">
          Een plek om te landen, te proeven en te genieten. Van vroege espresso tot late borrel.
        </p>
        <div className="hero__actions">
          <a href="#visit" className="btn btn--primary">
            Kom langs
          </a>
          <a
            href="/Cafe_Keppler_menu_mei_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary-hero"
          >
            Menu
          </a>
        </div>
      </div>
    </section>
  );
}
