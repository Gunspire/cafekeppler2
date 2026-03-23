import React from "react";
import {
  HERO_START_SLIDE_INDEX,
  SHARED_HERO_BACKGROUND_SLIDES,
} from "../data/sharedHeroBackgroundSlides";
import { useHeroSlideshow } from "../hooks/useHeroSlideshow";

export default function Hero() {
  const n = SHARED_HERO_BACKGROUND_SLIDES.length;
  const start =
    n > 0
      ? ((HERO_START_SLIDE_INDEX.home % n) + n) % n
      : 0;
  const activeIdx = useHeroSlideshow(n, 6500, HERO_START_SLIDE_INDEX.home);

  return (
    <section className="hero">
      <div className="hero__bg">
        {SHARED_HERO_BACKGROUND_SLIDES.map((slide, idx) => (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            className={
              idx === activeIdx ? "hero__bgImg is-active" : "hero__bgImg"
            }
            loading={idx === start ? "eager" : "lazy"}
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
