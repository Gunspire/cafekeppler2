import React from "react";

export default function Info() {
  return (
    <section className="section info" id="contact">
      <div className="info__inner">
        <div className="info__card">
          <h3 className="info__title">Openingstijden</h3>
          <ul className="info__list">
            <li>
              <span>Maandag - Vrijdag</span>
              <span>08:00 - 18:00</span>
            </li>
            <li>
              <span>Zaterdag</span>
              <span>09:00 - 18:00</span>
            </li>
            <li>
              <span>Zondag</span>
              <span>10:00 - 17:00</span>
            </li>
          </ul>
        </div>

        <div className="info__card info__card--highlight">
          <h3 className="info__title">Locatie</h3>
          <p>
            Van der Pekstraat 1<br />
            1031 EB Amsterdam
          </p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=52.3869589,4.9080783"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{ marginTop: "16px" }}
          >
            Routebeschrijving
          </a>
        </div>
      </div>

      <div className="info__map">
        <iframe
          title="Keppler Locatie"
          src="https://www.google.com/maps?q=52.3869589,4.9080783&z=17&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
