import React from "react";

/**
 * Rotates slide index for crossfade backgrounds. Respects prefers-reduced-motion.
 * @param initialSlideIndex 0-based; which image is visible on first paint (per page).
 */
export function useHeroSlideshow(
  slideCount: number,
  intervalMs = 6500,
  initialSlideIndex = 0,
): number {
  const start =
    slideCount > 0
      ? ((initialSlideIndex % slideCount) + slideCount) % slideCount
      : 0;

  const [activeIdx, setActiveIdx] = React.useState(start);

  React.useEffect(() => {
    if (slideCount <= 1) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % slideCount);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [slideCount, intervalMs]);

  return activeIdx;
}
