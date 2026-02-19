import React from "react";
import { Link } from "react-router-dom";
import { ACTUEEL_ITEMS, formatNl } from "../data/actueel";

export default function Events() {
  const todayIso = React.useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const items = React.useMemo(() => {
    const dated = ACTUEEL_ITEMS.filter(
      (i) => i.showOnHome !== false && Boolean(i.date),
    ) as Array<(typeof ACTUEEL_ITEMS)[number] & { date: string }>;

    const upcoming = dated
      .filter((i) => i.date >= todayIso)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);

    // If there are no upcoming items (e.g. old seeded data), show the next 3 by date.
    if (upcoming.length) return upcoming;
    return dated.sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  }, [todayIso]);

  return (
    <section className="section events" id="actueel" aria-label="Actueel">
      <div className="events__inner">
        <div className="events__header">
          <div className="eyebrow">Actueel</div>
          <h2 className="section-title">Binnenkort</h2>
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
                />
                <div className="event-card__overlay" />
                {e.ribbon ? (
                  <div className="cornerRibbon cornerRibbon--card">
                    <div className="cornerRibbon__label">{e.ribbon}</div>
                  </div>
                ) : null}
                <div className="event-card__date">
                  {e.date ? (
                    <time dateTime={e.date}>{e.dateLabel ?? formatNl(e.date)}</time>
                  ) : (
                    <span>{e.dateLabel ?? ""}</span>
                  )}
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

        <div className="events__footer">
          <Link className="btn btn--secondary" to="/actueel">
            Bekijk alle items
          </Link>
        </div>
      </div>
    </section>
  );
}

