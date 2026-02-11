import React, { useEffect, useState } from "react";

type SplashProps = {
  onDone: () => void;
};

export default function Splash({ onDone }: SplashProps) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => setPlay(true));

    // Total duration should match CSS animation timeline.
    const totalMs = 1820;
    const t = window.setTimeout(onDone, totalMs);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [onDone]);

  return (
    <div className={`splash${play ? " splash--play" : ""}`} role="presentation">
      <div className="splash__stage">
        <div className="splash__logos" aria-hidden="true">
          <img
            className="splash__logo splash__logo--left"
            src="/logo-graphic.png"
            alt=""
            draggable={false}
          />
          <img
            className="splash__logo splash__logo--right"
            src="/logo-header.png"
            alt=""
            draggable={false}
          />
        </div>

        <div className="splash__wordmark" aria-label="Café Keppler">
          Café Keppler
        </div>
      </div>
    </div>
  );
}

