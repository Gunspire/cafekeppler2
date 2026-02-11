import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <Link to="/" className="header__logo" aria-label="Café Keppler">
            <img src="/logo.webp" alt="Café Keppler" />
          </Link>
        </div>

        <div className="header__right">
          <nav className="header__nav" aria-label="Hoofdnavigatie">
            <a
              href="/Cafe_Keppler_menu_mei_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Menu
            </a>
            <Link to="/actueel">Actueel</Link>
            <Link to="/lokaal">Lokaal</Link>
            <Link to="/bakkerij">Bakkerij</Link>
            <Link to="/werken-bij">Werken bij</Link>
          </nav>
          <div className="header__actions">
            <Link to="/groepen" className="btn btn--header">
              Groepen
            </Link>
            <Link to="/contact" className="btn btn--header-secondary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
