import React from "react";
import { SHARED_HERO_BACKGROUND_SLIDES } from "../data/sharedHeroBackgroundSlides";
import { useHeroSlideshow } from "../hooks/useHeroSlideshow";

type Props = {
  /** Which slide is visible first (then cycles). */
  initialSlideIndex: number;
};

/**
 * Shared hero crossfade for page-hero sections (Actueel, Lokaal, etc.).
 */
export default function SharedPageHeroBackground({ initialSlideIndex }: Props) {
  const n = SHARED_HERO_BACKGROUND_SLIDES.length;
  const start =
    n > 0 ? ((initialSlideIndex % n) + n) % n : 0;
  const activeIdx = useHeroSlideshow(n, 6500, initialSlideIndex);

  return (
    <div className="page-hero__bg" aria-hidden="true">
      {SHARED_HERO_BACKGROUND_SLIDES.map((s, idx) => (
        <img
          key={s.src}
          src={s.src}
          alt=""
          className={
            idx === activeIdx
              ? "page-hero__img sharedHeroBg__img is-active"
              : "page-hero__img sharedHeroBg__img"
          }
          loading={idx === start ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
      <div className="page-hero__overlay" />
    </div>
  );
}
