import React from "react";
import { Link } from "react-router-dom";
import { ACTUEEL_ITEMS, formatNl } from "../data/actueel";

export default function Events() {
  return (
    <section className="section events" id="actueel" aria-label="Actueel">
      <div className="events__inner">
        <div className="events__header">
          <div className="eyebrow">Actueel</div>
          <h2 className="section-title">Binnenkort</h2>
        </div>

        <div className="events__grid">
          {ACTUEEL_ITEMS.map((e) => (
            <Link key={e.slug} className="event-card" to={`/actueel/${e.slug}`}>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

