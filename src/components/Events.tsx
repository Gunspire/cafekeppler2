import React, { useMemo } from "react";

type EventItem = {
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

function formatNl(dateIso: string) {
  // Minimal, locale-safe formatting without extra deps.
  const d = new Date(`${dateIso}T12:00:00`);
  return d.toLocaleDateString("nl-NL", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Events() {
  const items = useMemo<EventItem[]>(
    () => [
      {
        title: "Muziekquiz bij Keppler",
        date: "2026-02-14",
        excerpt:
          "Een gezellige avond met rondes vol herkenning, verrassingen en een klein prijsje voor de winnaars.",
        imageSrc: "/cafe-keppler-wil-voor-import-en.jpg",
        imageAlt: "Sfeer in het café",
        href: "#contact",
      },
      {
        title: "Soepfestival (placeholder)",
        date: "2026-03-01",
        excerpt:
          "Proef drie seizoenssoepen, kies je favoriet en neem een pot mee naar huis. Details volgen.",
        imageSrc: "/intro-food.png",
        imageAlt: "Eten bij Café Keppler",
        href: "#contact",
      },
      {
        title: "Keppler buurtborrel (placeholder)",
        date: "2026-03-15",
        excerpt:
          "Een relaxed moment voor de buurt: borrelhap, lokale drankjes en fijne muziek. Meer info binnenkort.",
        imageSrc: "/01-misset-cafe-keppler-9049.jpg",
        imageAlt: "Interieur van Café Keppler",
        href: "#contact",
      },
    ],
    [],
  );

  return (
    <section className="section events" id="actueel" aria-label="Actueel">
      <div className="events__inner">
        <div className="events__header">
          <div className="eyebrow">Actueel</div>
          <h2 className="section-title">Binnenkort</h2>
        </div>

        <div className="events__grid">
          {items.map((e) => (
            <a key={e.title} className="event-card" href={e.href}>
              <div className="event-card__media" aria-hidden="true">
                <img
                  src={e.imageSrc}
                  alt={e.imageAlt}
                  loading="lazy"
                  className="event-card__img"
                />
                <div className="event-card__overlay" />
                <div className="event-card__date">
                  <time dateTime={e.date}>{formatNl(e.date)}</time>
                </div>
              </div>

              <div className="event-card__body">
                <h3 className="event-card__title">{e.title}</h3>
                <p className="event-card__excerpt">{e.excerpt}</p>
                <span className="event-card__link">Lees meer →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

