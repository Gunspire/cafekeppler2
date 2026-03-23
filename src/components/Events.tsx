import React from "react";
import { Link } from "react-router-dom";
import { ACTUEEL_ITEMS, formatNl, type ActueelItem } from "../data/actueel";

const HOME_ACTUEEL_COUNT = 3;

export default function Events() {
  const todayIso = React.useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const cards = React.useMemo(() => {
    const pool = ACTUEEL_ITEMS.filter((i) => i.showOnHome !== false);

    const withDate = pool.filter(
      (i): i is ActueelItem & { date: string } => Boolean(i.date),
    );
    const withoutDate = pool.filter((i) => !i.date);

    const upcoming = withDate
      .filter((i) => i.date >= todayIso)
      .sort((a, b) => a.date.localeCompare(b.date));
    const past = withDate
      .filter((i) => i.date < todayIso)
      .sort((a, b) => b.date.localeCompare(a.date));

    const picked: ActueelItem[] = [];

    for (const u of upcoming) {
      if (picked.length >= HOME_ACTUEEL_COUNT) break;
      picked.push(u);
    }
    for (const p of past) {
      if (picked.length >= HOME_ACTUEEL_COUNT) break;
      picked.push(p);
    }
    for (const nd of withoutDate) {
      if (picked.length >= HOME_ACTUEEL_COUNT) break;
      picked.push(nd);
    }

    return picked.slice(0, HOME_ACTUEEL_COUNT).map((e) => ({
      item: e,
      isPast: Boolean(e.date && e.date < todayIso),
    }));
  }, [todayIso]);

  return (
    <section className="section events" id="actueel" aria-label="Actueel">
      <div className="events__inner">
        <div className="events__header">
          <div className="eyebrow">Actueel</div>
          <h2 className="section-title">Wat er speelt</h2>
        </div>

        <div className="events__grid">
          {cards.map(({ item: e, isPast }) => (
            <Link
              key={e.slug}
              className={["event-card", isPast ? "event-card--past" : null]
                .filter(Boolean)
                .join(" ")}
              to={`/actueel/${e.slug}`}
              aria-label={
                isPast
                  ? `${e.title} (afgelopen)`
                  : undefined
              }
            >
              <div className="event-card__media" aria-hidden="true">
                <img
                  src={e.imageSrc}
                  alt={e.imageAlt}
                  loading="lazy"
                  className="event-card__img"
                />
                <div className="event-card__overlay" />
                {isPast ? (
                  <span className="event-card__pastBadge">Afgelopen</span>
                ) : null}
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
