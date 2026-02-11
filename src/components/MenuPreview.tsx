import React, { useMemo } from "react";
import { MENU_CATEGORIES } from "../data/menu";

export default function MenuPreview() {
  const categories = useMemo(() => MENU_CATEGORIES, []);
  const allTabId = "__all__";
  const [activeId, setActiveId] = React.useState<string>("ontbijt-lunch");
  const active = categories.find((c) => c.id === activeId) ?? categories[0];
  const isAll = activeId === allTabId;

  return (
    <section className="section menu-preview" id="menu">
      <div className="menu-preview__inner">
        <div className="menu-card" aria-label="Menu uitgelicht">
          <div className="menu-card__header">
            <div>
              <div className="eyebrow">{isAll ? "Menu" : (active?.eyebrow ?? "Menu")}</div>
              <h2 className="section-title">Kaart</h2>
              <p className="menu-card__sub">
                Alles van de kaart, per categorie. Klik gerust door de tabs.
              </p>
            </div>
            <a
              href="/Cafe_Keppler_menu_mei_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              Hele kaart (PDF)
            </a>
          </div>

          <div className="menu-card__body">
            <div className="menu-card__tabs" role="tablist" aria-label="Menu categorieën">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={c.id === activeId}
                  className={c.id === activeId ? "menu-tab is-active" : "menu-tab"}
                  onClick={() => setActiveId(c.id)}
                >
                  {c.label}
                </button>
              ))}
              <button
                key={allTabId}
                type="button"
                role="tab"
                aria-selected={isAll}
                className={isAll ? "menu-tab is-active" : "menu-tab"}
                onClick={() => setActiveId(allTabId)}
              >
                Hele kaart
              </button>
            </div>

            <div className="menu-card__main" aria-label={isAll ? "Hele kaart" : `${active?.label ?? "Menu"} kaart`}>
              {!isAll ? (
                <ul className="menu-list">
                  {(active?.groups ?? []).map((g, gi) => (
                    <React.Fragment key={gi}>
                      {g.title ? (
                        <li className="menu-group" aria-hidden="true">
                          {g.title}
                        </li>
                      ) : null}
                      {g.items.map((it, idx) => (
                        <li key={`${gi}-${idx}-${it.title}`} className="menu-row">
                          <div className="menu-row__top">
                            <span className="menu-row__title">{it.title}</span>
                            <span className="menu-row__dots" aria-hidden="true" />
                            <span className="menu-row__price">{it.price ?? ""}</span>
                          </div>
                          {it.details ? (
                            <div className="menu-row__details">{it.details}</div>
                          ) : null}
                        </li>
                      ))}
                    </React.Fragment>
                  ))}
                </ul>
              ) : (
                <div className="menu-all">
                  {categories.map((c) => (
                    <section key={c.id} className="menu-all__section" aria-label={c.label}>
                      <div className="menu-all__title">{c.label}</div>
                      <ul className="menu-list">
                        {c.groups.map((g, gi) => (
                          <React.Fragment key={gi}>
                            {g.title ? <li className="menu-group">{g.title}</li> : null}
                            {g.items.map((it, idx) => (
                              <li key={`${c.id}-${gi}-${idx}-${it.title}`} className="menu-row">
                                <div className="menu-row__top">
                                  <span className="menu-row__title">{it.title}</span>
                                  <span className="menu-row__dots" aria-hidden="true" />
                                  <span className="menu-row__price">{it.price ?? ""}</span>
                                </div>
                                {it.details ? (
                                  <div className="menu-row__details">{it.details}</div>
                                ) : null}
                              </li>
                            ))}
                          </React.Fragment>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}

              <div className="menu-card__actions">
                <a href="#visit" className="btn btn--primary">
                  Reserveren / langskomen
                </a>
                {!isAll ? (
                  <button
                    type="button"
                    className="btn btn--secondary"
                    onClick={() => setActiveId(allTabId)}
                  >
                    Hele kaart op de site
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
