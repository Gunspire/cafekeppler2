import React from "react";

export default function Hero() {
  const heroImage = {
    src: "/Generated%20Image%20February%2004,%202026%20-%201_08PM.jpeg",
    alt: "Café Keppler terras sfeer",
  };

  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="hero__bgImg is-active"
          loading="eager"
          decoding="async"
        />
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
