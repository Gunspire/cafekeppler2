import React from "react";
import { Link } from "react-router-dom";
import { ACTUEEL_ITEMS, formatNl } from "../data/actueel";

export default function ActueelPage() {
  const items = React.useMemo(() => {
    return [...ACTUEEL_ITEMS].sort((a, b) => b.date.localeCompare(a.date));
  }, []);

  return (
    <>
      <section className="page-hero" aria-label="Actueel overzicht">
        <div className="page-hero__bg" aria-hidden="true">
          <img src="/01-misset-cafe-keppler-9049.jpg" alt="" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>

        <div className="page-hero__content">
          <div className="eyebrow page-hero__eyebrow">Actueel</div>
          <h1 className="page-hero__title">Wat speelt er bij Keppler</h1>
          <p className="page-hero__text">
            Aankomende avonden, specials en eerdere edities.
          </p>
        </div>
      </section>

      <section className="section events events--page" aria-label="Actueel items">
        <div className="events__inner">
          <div className="events__header">
            <div className="eyebrow">Overzicht</div>
            <h2 className="section-title">Actueel</h2>
          </div>

          <div className="events__grid">
            {items.map((e) => (
              <Link key={e.slug} className="event-card" to={`/actueel/${e.slug}`}>
                <div className="event-card__media" aria-hidden="true">
                  <img
                    src={e.imageSrc}
                    alt={e.imageAlt}
                    loading="lazy"
                    className="event-card__img"
                    decoding="async"
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
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

