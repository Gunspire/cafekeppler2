import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    // Ensure dinner drawer never overlaps the mobile menu
    try {
      window.dispatchEvent(new Event("keppler:dinner:close"));
    } catch {
      // ignore
    }
    try {
      window.dispatchEvent(new CustomEvent("keppler:mobilemenu", { detail: { open: true } }));
    } catch {
      // ignore
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prev;
      try {
        window.dispatchEvent(
          new CustomEvent("keppler:mobilemenu", { detail: { open: false } }),
        );
      } catch {
        // ignore
      }
    };
  }, [mobileOpen]);

  return (
    <header className={mobileOpen ? "header header--open" : "header"}>
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
            <button
              type="button"
              className="header__burger"
              onClick={() =>
                setMobileOpen((v) => {
                  const next = !v;
                  if (next) {
                    // Ensure dinner drawer doesn't overlap mobile menu
                    try {
                      window.dispatchEvent(new Event("keppler:dinner:close"));
                    } catch {
                      // ignore
                    }
                  }
                  return next;
                })
              }
              aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="header__burgerIcon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={mobileOpen ? "header__mobile is-open" : "header__mobile"}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="header__backdrop"
          aria-label="Sluit menu"
          onClick={() => setMobileOpen(false)}
          tabIndex={mobileOpen ? 0 : -1}
        />
        <div className="header__drawer" role="dialog" aria-modal="true" id="mobile-menu">
          <div className="header__drawerTop">
            <div className="header__drawerTitle">Menu</div>
            <button
              type="button"
              className="header__drawerClose"
              onClick={() => setMobileOpen(false)}
              aria-label="Sluiten"
            >
              Sluiten
            </button>
          </div>

          <div className="header__drawerLinks">
            <a
              href="/Cafe_Keppler_menu_mei_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Menu (PDF)
            </a>
            <Link to="/actueel">Actueel</Link>
            <Link to="/lokaal">Lokaal</Link>
            <Link to="/bakkerij">Bakkerij</Link>
            <Link to="/werken-bij">Werken bij</Link>
            <Link to="/groepen">Groepen</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="header__drawerFooter">
            <div className="header__drawerAddress">
              Van der Pekstraat 1<br />
              1031 CN Amsterdam
            </div>
            <a
              className="header__drawerRoute"
              href="https://www.google.com/maps?q=Van%20der%20Pekstraat%201%201031%20CN%20Amsterdam"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Route in Google Maps
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
