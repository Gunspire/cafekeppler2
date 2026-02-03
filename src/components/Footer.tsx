import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brandTop">
              <img
                className="footer__mark"
                src="/logo-header.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <div>
                <div className="footer__logo">Café Keppler</div>
                <div className="footer__muted">Van der Pekstraat 1 · 1031 CN Amsterdam</div>
              </div>
            </div>

            <div className="footer__linksRow">
              <a href="mailto:info@cafekeppler.nl">info@cafekeppler.nl</a>
              <span className="footer__dot" aria-hidden="true">
                ·
              </span>
              <a href="tel:+31207370838">020 737 08 38</a>
              <span className="footer__dot" aria-hidden="true">
                ·
              </span>
              <a
                href="https://www.google.com/maps?q=9WP5%2BQ6%20Amsterdam"
                target="_blank"
                rel="noopener noreferrer"
              >
                Route
              </a>
            </div>
          </div>

          <div className="footer__section">
            <div className="footer__heading">Openingstijden</div>
            <ul className="footer__list">
              <li>
                <span>Ma–Vr</span>
                <span>08:00–18:00</span>
              </li>
              <li>
                <span>Za</span>
                <span>09:00–18:00</span>
              </li>
              <li>
                <span>Zo</span>
                <span>10:00–17:00</span>
              </li>
            </ul>
          </div>

          <div className="footer__section">
            <div className="footer__heading">Links</div>
            <div className="footer__stack">
              <a
                href="/Cafe_Keppler_menu_mei_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Menu (PDF)
              </a>
              <a href="/#actueel">Actueel</a>
              <a href="/#reviews">Reviews</a>
              <Link to="/groepen">Groepen</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div className="footer__section">
            <div className="footer__heading">Volg ons</div>
            <div className="footer__stack">
              <a href="#" aria-disabled="true">
                Instagram
              </a>
              <a href="#" aria-disabled="true">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__muted">
            © {new Date().getFullYear()} Café Keppler
          </div>
        </div>
      </div>
    </footer>
  );
}
