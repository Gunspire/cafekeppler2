import React from "react";
import { createPortal } from "react-dom";
import { IMPRESSIE_GALLERY_IMAGES } from "../data/impressieGallery";

export default function ImpressieCollage() {
  const images = IMPRESSIE_GALLERY_IMAGES;
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const [gridExpanded, setGridExpanded] = React.useState(false);
  const [clipHeightPx, setClipHeightPx] = React.useState<number | null>(null);
  /** Afstand vanaf boven grid tot waar rij 2 begint — gradient alleen daaronder */
  const [revealTopPx, setRevealTopPx] = React.useState<number | null>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  const measureClipHeight = React.useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cell = grid.querySelector(".impressie__cell");
    if (!cell) return;
    const h = cell.getBoundingClientRect().height;
    const style = window.getComputedStyle(grid);
    const gap =
      parseFloat(style.rowGap || "0") ||
      parseFloat(style.columnGap || "0") ||
      parseFloat(style.gap || "0") ||
      12;
    // Eén volledige eerste rij + gap + klein stukje tweede rij (preview); geen afsnede in rij 1
    const peek = Math.min(h * 0.3, 68);
    setClipHeightPx(h + gap + peek);
    setRevealTopPx(h + gap);
  }, []);

  React.useLayoutEffect(() => {
    if (gridExpanded) return;
    measureClipHeight();
    const grid = gridRef.current;
    if (!grid) return;
    const ro = new ResizeObserver(() => measureClipHeight());
    ro.observe(grid);
    window.addEventListener("resize", measureClipHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureClipHeight);
    };
  }, [gridExpanded, measureClipHeight, images.length]);

  const open = (index: number) => setLightbox(index);
  const close = React.useCallback(() => setLightbox(null), []);

  const goNext = React.useCallback(() => {
    setLightbox((i) =>
      i === null ? null : (i + 1) % images.length,
    );
  }, [images.length]);

  const goPrev = React.useCallback(() => {
    setLightbox((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  React.useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightbox]);

  React.useEffect(() => {
    if (lightbox === null) return;
    const id = window.requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [lightbox]);

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, goNext, goPrev]);

  const active = lightbox !== null ? images[lightbox] : null;

  const lightboxNode =
    lightbox !== null && active ? (
      <div
        className="impressieLightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Foto vergroten"
      >
        <button
          type="button"
          className="impressieLightbox__backdrop"
          aria-label="Sluiten"
          onClick={close}
        />
        <div className="impressieLightbox__panel">
          <div className="impressieLightbox__top">
            <span className="impressieLightbox__counter" aria-live="polite">
              {lightbox + 1} / {images.length}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              className="impressieLightbox__close"
              onClick={close}
              aria-label="Sluiten"
            >
              ×
            </button>
          </div>
          <div className="impressieLightbox__stage">
            <button
              type="button"
              className="impressieLightbox__nav impressieLightbox__nav--prev"
              onClick={goPrev}
              aria-label="Vorige foto"
            >
              ‹
            </button>
            <img
              className="impressieLightbox__img"
              src={active.src}
              alt={active.alt}
              loading="eager"
              decoding="async"
            />
            <button
              type="button"
              className="impressieLightbox__nav impressieLightbox__nav--next"
              onClick={goNext}
              aria-label="Volgende foto"
            >
              ›
            </button>
          </div>
          <p className="impressieLightbox__hint">
            Pijltjestoetsen of klik op de pijlen · Esc om te sluiten
          </p>
        </div>
      </div>
    ) : null;

  return (
    <section className="section impressie" id="impressie" aria-labelledby="impressie-title">
      <div className="impressie__inner">
        <div className="eyebrow">Sfeer</div>
        <h2 id="impressie-title" className="section-title">
          Impressie
        </h2>
        <p className="impressie__sub">
          Een indruk van het café: klik op een foto om groter te bekijken en door te bladeren.
        </p>

        <div className="impressie__viewportWrap">
          <div
            className={
              !gridExpanded && clipHeightPx !== null
                ? "impressie__viewport impressie__viewport--clipped"
                : "impressie__viewport"
            }
            style={
              !gridExpanded && clipHeightPx !== null
                ? { maxHeight: clipHeightPx }
                : undefined
            }
          >
            <div ref={gridRef} className="impressie__grid">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  className="impressie__cell"
                  onClick={() => open(i)}
                  aria-label={`Foto ${i + 1} vergroten`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>

          {!gridExpanded && clipHeightPx !== null && revealTopPx !== null ? (
            <div
              className="impressie__reveal"
              style={{ top: revealTopPx }}
            >
              <div className="impressie__revealGradient" aria-hidden="true" />
              <button
                type="button"
                className="btn btn--primary impressie__more"
                onClick={() => setGridExpanded(true)}
              >
                Meer foto’s
              </button>
            </div>
          ) : null}
        </div>

        {gridExpanded ? (
          <button
            type="button"
            className="impressie__less"
            onClick={() => setGridExpanded(false)}
          >
            Minder tonen
          </button>
        ) : null}
      </div>
      {typeof document !== "undefined" && lightboxNode
        ? createPortal(lightboxNode, document.body)
        : null}
    </section>
  );
}
