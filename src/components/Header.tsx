import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__left">
          <a href="/" className="header__logo" aria-label="Café Keppler">
            <img src="/logo-header.png" alt="" />
          </a>
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
            <a href="#about">Lokaal</a>
            <a href="#bakery">Bakkerij</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header__actions">
            <a
              href="/Cafe_Keppler_menu_mei_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--header"
            >
              Bekijk menu
            </a>
            <a
              href="mailto:info@cafekeppler.nl?subject=Reservering%20Caf%C3%A9%20Keppler&body=Hoi%20Caf%C3%A9%20Keppler%2C%0A%0AIk%20wil%20graag%20reserveren%3A%0A%0ADatum%3A%20%0ATijd%3A%20%0AAantal%20personen%3A%20%0ANaam%3A%20%0ATelefoon%3A%20%0A%0AOpmerking%20(optioneel)%3A%20%0A%0ADankjewel!"
              className="btn btn--header-secondary"
            >
              Reserveren
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
