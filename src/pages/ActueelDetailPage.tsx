import React from "react";
import { Link, useParams } from "react-router-dom";
import { getActueelBySlug, formatNl } from "../data/actueel";

export default function ActueelDetailPage() {
  const { slug } = useParams();
  const item = slug ? getActueelBySlug(slug) : null;

  if (!item) {
    return (
      <section className="section actueel">
        <div className="actueel__inner">
          <div className="eyebrow">Actueel</div>
          <h1 className="actueel__title">Niet gevonden</h1>
          <p className="actueel__text">
            Dit item bestaat (nog) niet. Ga terug naar de homepage om het actuele
            overzicht te bekijken.
          </p>
          <div className="actueel__actions">
            <Link className="btn btn--primary" to="/">
              Terug naar home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero actueel-hero" aria-label={item.title}>
        <div className="page-hero__bg">
          <img
            src={item.imageSrc}
            alt={item.imageAlt}
            className="page-hero__img"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="page-hero__overlay" />
        <div className="page-hero__content">
          <div className="eyebrow page-hero__eyebrow">Actueel</div>
          <h1 className="page-hero__title">{item.title}</h1>
          <p className="page-hero__text">
            <time dateTime={item.date}>{formatNl(item.date)}</time>
          </p>
          <div className="actueel-hero__actions">
            <Link className="btn btn--secondary-hero" to="/actueel">
              ← Terug naar overzicht
            </Link>
            <Link className="btn btn--primary" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <section className="section actueel" aria-label="Details">
        <div className="actueel__inner">
          <p className="actueel__lead">{item.excerpt}</p>
          {item.body.map((p, idx) => (
            <p key={idx} className="actueel__text">
              {p}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}

