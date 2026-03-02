import React from "react";

export default function BakkerijPage() {
  type BestelState = {
    name: string;
    email: string;
    phone: string;
    pickupDate: string;
    painGris: string;
    noorsSpelt: string;
    deensRogge: string;
    foccaccia: string;
    stokbrood: string;
    notes: string;
  };

  const DEFAULT_BESTEL: BestelState = {
    name: "",
    email: "",
    phone: "",
    pickupDate: "",
    painGris: "0",
    noorsSpelt: "0",
    deensRogge: "0",
    foccaccia: "0",
    stokbrood: "0",
    notes: "",
  };

  const [bestel, setBestel] = React.useState<BestelState>(DEFAULT_BESTEL);
  const [bestelBusy, setBestelBusy] = React.useState(false);
  const [bestelError, setBestelError] = React.useState<string | null>(null);
  const [bestelSent, setBestelSent] = React.useState(false);

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
  const addDays = (d: Date, days: number) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);
  const addMonths = (d: Date, months: number) => new Date(d.getFullYear(), d.getMonth() + months, 1);
  const fmtYmd = (d: Date) =>
    [
      String(d.getFullYear()).padStart(4, "0"),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0"),
    ].join("-");
  const parseYmd = (s: string) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return null;
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const dd = Number(m[3]);
    const dt = new Date(y, mo - 1, dd);
    return Number.isNaN(dt.getTime()) ? null : dt;
  };
  const mondayIndex = (jsDow: number) => (jsDow + 6) % 7; // JS: Sun=0 .. Sat=6 => Mon=0 .. Sun=6
  const isAllowedBreadDow = (jsDow: number) => jsDow === 0 || jsDow === 4 || jsDow === 5 || jsDow === 6; // Thu/Fri/Sat/Sun

  const dateRange = React.useMemo(() => {
    const today = startOfDay(new Date());
    const max = addDays(today, 180); // ~6 months; auto-rolls on page refresh
    return { today, max, minMonth: startOfMonth(today), maxMonth: startOfMonth(max) };
  }, []);

  const [calMonth, setCalMonth] = React.useState<Date>(() => dateRange.minMonth);

  React.useEffect(() => {
    const dt = parseYmd(bestel.pickupDate);
    if (!dt) return;
    const m = startOfMonth(dt);
    setCalMonth((cur) => {
      if (m.getFullYear() === cur.getFullYear() && m.getMonth() === cur.getMonth()) return cur;
      return m;
    });
  }, [bestel.pickupDate]);

  const pickupMeta = React.useMemo(() => {
    const s = bestel.pickupDate.trim();
    if (!s) return { ok: false as const, isSaturday: false, dow: null as number | null };
    const dt = parseYmd(s); // local, avoids UTC shifting
    if (!dt) return { ok: false as const, isSaturday: false, dow: null as number | null };
    const dow = dt.getDay(); // 0=Sun .. 6=Sat
    const ok =
      isAllowedBreadDow(dow) &&
      startOfDay(dt).getTime() >= dateRange.today.getTime() &&
      startOfDay(dt).getTime() <= dateRange.max.getTime();
    return { ok: ok as const, isSaturday: dow === 6, dow };
  }, [bestel.pickupDate, dateRange.max, dateRange.today]);

  React.useEffect(() => {
    if (!bestel.pickupDate) return;
    if (pickupMeta.isSaturday) return;
    setBestel((s) => {
      if (s.noorsSpelt === "0" && s.deensRogge === "0" && s.foccaccia === "0" && s.stokbrood === "0")
        return s;
      return { ...s, noorsSpelt: "0", deensRogge: "0", foccaccia: "0", stokbrood: "0" };
    });
  }, [bestel.pickupDate, pickupMeta.isSaturday]);

  const galleryItems = React.useMemo(
    () => [
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.19.34%20(1).webp",
        alt: "Vers brood van Keppler",
      },
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.19.26%20(1).webp",
        alt: "Bakkerij sfeerbeeld 1",
      },
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.19.26%20(2).webp",
        alt: "Bakkerij sfeerbeeld 2",
      },
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.19.29.webp",
        alt: "Bakkerij sfeerbeeld 3",
      },
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.19.31%20(1).webp",
        alt: "Bakkerij sfeerbeeld 4",
      },
      {
        src: "/pictures/SnapInsta.to_320921093_534510265408477_3169773622127255925_n%20(1).jpg",
        alt: "Deeg in de bakkerij",
      },
    ],
    [],
  );

  const [lightboxIdx, setLightboxIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (lightboxIdx === null) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIdx(null);
        return;
      }
      if (e.key === "ArrowRight") {
        setLightboxIdx((i) =>
          i === null ? 0 : (i + 1) % galleryItems.length,
        );
        return;
      }
      if (e.key === "ArrowLeft") {
        setLightboxIdx((i) =>
          i === null ? 0 : (i - 1 + galleryItems.length) % galleryItems.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [lightboxIdx, galleryItems]);

  const active = lightboxIdx === null ? null : galleryItems[lightboxIdx];

  return (
    <>
      <section className="page-hero" aria-label="Bakkerij">
        <div className="page-hero__bg" aria-hidden="true">
          <img src="/bakery-photo.png" alt="" className="page-hero__img" />
          <div className="page-hero__overlay" />
        </div>

        <div className="page-hero__content">
          <div className="eyebrow page-hero__eyebrow">Bakkerij</div>
          <h1 className="page-hero__title">Huisgebakken zuurdesem brood</h1>
          <p className="page-hero__text">
            Vers brood van donderdag t/m zondag — voor bij ons in het café, of mee naar huis.
          </p>
          <div className="bakkerijHero__actions">
            <a className="btn btn--primary" href="#bestellen">
              <span className="btn__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" focusable="false">
                  <path
                    fill="currentColor"
                    d="M21 7.6c0-1.5-1.3-2.8-3-3.6C16.3 3.1 14.2 3 12 3S7.7 3.1 6 4C4.3 4.8 3 6.1 3 7.6c0 1.1.7 2.1 1.8 3C3.7 11.6 3 12.6 3 13.7c0 1.5 1.3 2.8 3 3.6 1.7.9 3.8 1 6 1s4.3-.1 6-1c1.7-.8 3-2.1 3-3.6 0-1.1-.7-2.1-1.8-3C20.3 9.7 21 8.7 21 7.6Zm-2 6.1c0 .6-.7 1.4-1.9 2-1.3.6-3.1.8-5.1.8s-3.8-.2-5.1-.8c-1.2-.6-1.9-1.4-1.9-2 0-.6.7-1.4 1.9-2 .2-.1.4-.2.7-.3.5-.2.8-.7.7-1.3-.1-.5-.6-.9-1.2-.9-.1 0-.2 0-.3 0-.2-.1-.4-.2-.6-.3-1.2-.6-1.9-1.4-1.9-2 0-.6.7-1.4 1.9-2C8.2 5.2 10 5 12 5s3.8.2 5.1.8c1.2.6 1.9 1.4 1.9 2 0 .6-.7 1.4-1.9 2-.2.1-.4.2-.7.3-.5.2-.8.7-.7 1.3.1.5.6.9 1.2.9.1 0 .2 0 .3 0 .2.1.4.2.6.3 1.2.6 1.9 1.4 1.9 2Z"
                  />
                </svg>
              </span>
              Bestel brood
            </a>
          </div>
        </div>
      </section>

      <section className="section bakkerij">
        <div className="bakkerij__inner">
          <div className="bakkerij__copy">
            <div className="eyebrow">Huisgemaakt</div>
            <h2 className="section-title">Brood uit eigen bakkerij</h2>
            <p className="bakkerij__text">
              We hebben vers brood van donderdag t/m zondag. Alles wordt met zuurdesem gebakken
              — huisgemaakt, elke batch opnieuw.
            </p>
            <p className="bakkerij__text">
              Op zaterdag verkopen we naast ons Pain Gris ook Noors Speltbrood, Deens
              Roggebrood, Alessio&apos;s foccaccia en stokbrood.
            </p>

            <ul className="bakkerij__bullets">
              <li>
                Wil je er zeker van zijn dat je niet misgrijpt? Bestel bij voorkeur 2 dagen van
                tevoren — dan zorgen wij dat het voor je klaar ligt.
              </li>
            </ul>
          </div>

          <div className="bakkerij__media" aria-label="Vers brood van Keppler">
            <img
              className="bakkerij__img"
              src="/pictures/SnapInsta.to_321543016_1696734397453989_7004640612804812596_n.jpg"
              alt="Brood uit eigen bakkerij"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <section className="section bakkerijAanbod" aria-label="Aanbod bakkerij">
        <div className="bakkerijAanbod__bg" aria-hidden="true">
          <div className="bakkerijAanbod__bgWall">
            {Array.from({ length: 10 }).map((_, i) => (
              <img
                key={i}
                className="bakkerijAanbod__bgLogo"
                src="/logotjes/image%20(1).png"
                alt=""
              />
            ))}
          </div>
          <div className="bakkerijAanbod__bgFade" />
        </div>

        <div className="bakkerijAanbod__inner">
          <div className="bakkerij__card bakkerijAanbod__card">
            <div className="eyebrow">Aanbod bakkerij</div>
            <div className="bakkerij__cardTitle">Alles wordt met zuurdesem gebakken</div>
            <ul className="bakkerij__list">
              <li>Pain Gris — tarwe, volkoren en rogge (€ 6,-)</li>
              <li>Noors Speltbrood — met zuidvruchten, zaden en noten (€ 5,50)</li>
              <li>Deens Roggebrood — ovengebakken met venkel- en komijnzaad (€ 5,-)</li>
              <li>Foccaccia — tarwe, zeezout en olijfolie (€ 3,50)</li>
              <li>Stokbrood (€ 2,75)</li>
            </ul>
            <p className="bakkerij__muted">
              Elke dag bakken we de croissantjes van Patisserie Baux af (het enige wat we niet
              zelf maken) en maken we onze Kepplertjes — kaneelbroodjes. En verder veel ander
              zoet:{" "}
              <a
                className="bakkerijAanbod__link"
                href="/Cafe_Keppler_menu_mei_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                zie menu
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section bakkerijBestel" aria-label="Bestellen" id="bestellen">
        <div className="bakkerijBestel__inner">
          <div className="bakkerijBestel__copy">
            <div className="eyebrow">Bestellen</div>
            <h2 className="section-title">Bestel je brood</h2>
            <p className="bakkerij__text">
              Vul het formulier in en we bevestigen je bestelling per mail. Bestel bij voorkeur
              minimaal 2 dagen van tevoren.
            </p>
            <p className="bakkerij__text">
              Afhalen kan van <strong>donderdag t/m zondag</strong>.
            </p>
          </div>

          <form
            className="bakkerijBestel__form"
            onSubmit={(e) => {
              e.preventDefault();
              (async () => {
                setBestelError(null);
                setBestelSent(false);

                if (!bestel.pickupDate.trim()) {
                  setBestelError("Kies een afhaaldatum (donderdag t/m zondag).");
                  return;
                }
                if (!pickupMeta.ok) {
                  setBestelError(
                    "Kies een afhaaldatum op donderdag, vrijdag, zaterdag of zondag (ma–wo kan niet).",
                  );
                  return;
                }

                const toQty = (raw: string) => {
                  const n = Math.floor(Number(raw));
                  return Number.isFinite(n) ? Math.max(0, n) : 0;
                };

                const items = [
                  { label: "Pain Gris", qty: toQty(bestel.painGris) },
                  { label: "Noors Speltbrood", qty: toQty(bestel.noorsSpelt) },
                  { label: "Deens Roggebrood", qty: toQty(bestel.deensRogge) },
                  { label: "Foccaccia", qty: toQty(bestel.foccaccia) },
                  { label: "Stokbrood", qty: toQty(bestel.stokbrood) },
                ].filter((it) => it.qty > 0);

                if (!items.length && !bestel.notes.trim()) {
                  setBestelError(
                    "Kies minimaal 1 brood (aantal) of zet je wensen bij ‘Opmerkingen’.",
                  );
                  return;
                }

                setBestelBusy(true);
                try {
                  const resp = await fetch("/api/bestelling", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: bestel.name.trim(),
                      email: bestel.email.trim(),
                      phone: bestel.phone.trim(),
                      pickupDate: bestel.pickupDate,
                      items,
                      notes: bestel.notes.trim(),
                    }),
                  });

                  const rawText = await resp.text();
                  const data = ((): { ok?: boolean; error?: string } | null => {
                    try {
                      return rawText ? (JSON.parse(rawText) as any) : null;
                    } catch {
                      return null;
                    }
                  })();

                  if (!resp.ok) {
                    throw new Error(
                      data?.error ||
                        `Versturen mislukt (${resp.status}). ${
                          rawText && !data ? rawText.slice(0, 200) : "Probeer het opnieuw."
                        }`,
                    );
                  }

                  setBestelSent(true);
                  setBestel(DEFAULT_BESTEL);
                } catch (e2: any) {
                  setBestelError(e2?.message ? String(e2.message) : "Er ging iets mis.");
                } finally {
                  setBestelBusy(false);
                }
              })();
            }}
          >
            <div className="form-grid">
              <label className="field">
                <span className="field__label">Naam *</span>
                <input
                  className="field__input"
                  value={bestel.name}
                  onChange={(e) => setBestel((s) => ({ ...s, name: e.target.value }))}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">E-mail *</span>
                <input
                  className="field__input"
                  type="email"
                  value={bestel.email}
                  onChange={(e) => setBestel((s) => ({ ...s, email: e.target.value }))}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">Telefoon (optioneel)</span>
                <input
                  className="field__input"
                  value={bestel.phone}
                  onChange={(e) => setBestel((s) => ({ ...s, phone: e.target.value }))}
                  inputMode="tel"
                />
              </label>

              <label className="field field--full">
                <span className="field__label">Afhalen (datum) *</span>
                <div className="bakkerijCal" role="group" aria-label="Kies afhaaldatum">
                  <div className="bakkerijCal__head">
                    <button
                      type="button"
                      className="bakkerijCal__nav"
                      onClick={() => setCalMonth((m) => addMonths(m, -1))}
                      disabled={
                        calMonth.getFullYear() === dateRange.minMonth.getFullYear() &&
                        calMonth.getMonth() === dateRange.minMonth.getMonth()
                      }
                      aria-label="Vorige maand"
                    >
                      ←
                    </button>
                    <div className="bakkerijCal__title" aria-live="polite">
                      {calMonth.toLocaleDateString("nl-NL", { month: "long", year: "numeric" })}
                    </div>
                    <button
                      type="button"
                      className="bakkerijCal__nav"
                      onClick={() => setCalMonth((m) => addMonths(m, 1))}
                      disabled={
                        calMonth.getFullYear() === dateRange.maxMonth.getFullYear() &&
                        calMonth.getMonth() === dateRange.maxMonth.getMonth()
                      }
                      aria-label="Volgende maand"
                    >
                      →
                    </button>
                  </div>

                  <div className="bakkerijCal__dow" aria-hidden="true">
                    {["ma", "di", "wo", "do", "vr", "za", "zo"].map((d) => (
                      <div key={d} className="bakkerijCal__dowCell">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="bakkerijCal__grid">
                    {(() => {
                      const y = calMonth.getFullYear();
                      const mo = calMonth.getMonth();
                      const first = new Date(y, mo, 1);
                      const daysInMonth = new Date(y, mo + 1, 0).getDate();
                      const lead = mondayIndex(first.getDay());
                      const cells = Math.ceil((lead + daysInMonth) / 7) * 7;
                      const selected = parseYmd(bestel.pickupDate);
                      const today = dateRange.today;

                      return Array.from({ length: cells }).map((_, idx) => {
                        const dayNum = idx - lead + 1;
                        if (dayNum < 1 || dayNum > daysInMonth) {
                          return <div key={`e-${idx}`} className="bakkerijCal__empty" />;
                        }

                        const dt = new Date(y, mo, dayNum);
                        const jsDow = dt.getDay();
                        const ymd = fmtYmd(dt);
                        const selectable =
                          isAllowedBreadDow(jsDow) &&
                          startOfDay(dt).getTime() >= today.getTime() &&
                          startOfDay(dt).getTime() <= dateRange.max.getTime();
                        const isSelected =
                          !!selected &&
                          selected.getFullYear() === dt.getFullYear() &&
                          selected.getMonth() === dt.getMonth() &&
                          selected.getDate() === dt.getDate();
                        const isToday =
                          today.getFullYear() === dt.getFullYear() &&
                          today.getMonth() === dt.getMonth() &&
                          today.getDate() === dt.getDate();

                        return (
                          <button
                            key={ymd}
                            type="button"
                            className={[
                              "bakkerijCal__day",
                              isSelected ? "is-selected" : null,
                              isToday ? "is-today" : null,
                              jsDow === 6 ? "is-sat" : null,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            disabled={!selectable}
                            aria-pressed={isSelected}
                            aria-label={dt.toLocaleDateString("nl-NL", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                            onClick={() => setBestel((s) => ({ ...s, pickupDate: ymd }))}
                          >
                            {dayNum}
                          </button>
                        );
                      });
                    })()}
                  </div>

                  <div className="bakkerijBestel__hint">
                    Alleen <strong>do/vr/za/zo</strong> zijn te kiezen.
                  </div>
                </div>
                {bestel.pickupDate && pickupMeta.isSaturday ? (
                  <div className="bakkerijBestel__hint">
                    Zaterdag geselecteerd: je kunt vandaag ook Noors Speltbrood, Deens Roggebrood,
                    foccaccia en stokbrood bestellen.
                  </div>
                ) : null}
              </label>

              <div className="field field--full">
                <span className="field__label">Brood (aantal)</span>
                <div className="bakkerijBestel__availability" aria-live="polite">
                  {!pickupMeta.ok ? (
                    <>Kies eerst een afhaaldatum om brood te kunnen selecteren.</>
                  ) : pickupMeta.isSaturday ? (
                    <>
                      <strong>Vandaag kun je kiezen uit:</strong> Pain Gris, Noors Speltbrood,
                      Deens Roggebrood, foccaccia en stokbrood.
                    </>
                  ) : (
                    <>
                      <strong>Vandaag kun je kiezen uit:</strong> alleen Pain Gris. Kies{" "}
                      <strong>zaterdag</strong> voor Noors Speltbrood, Deens Roggebrood, foccaccia en
                      stokbrood.
                    </>
                  )}
                </div>
                <div className="bakkerijBestel__items">
                  <label
                    className={[
                      "bakkerijBestel__item",
                      !pickupMeta.ok ? "is-disabled" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="bakkerijBestel__itemLabel">
                      Pain Gris <span className="bakkerijBestel__tag">do–zo</span>
                    </span>
                    <input
                      className="field__input bakkerijBestel__qty"
                      type="number"
                      min={0}
                      step={1}
                      value={bestel.painGris}
                      disabled={!pickupMeta.ok}
                      onChange={(e) =>
                        setBestel((s) => ({ ...s, painGris: e.target.value }))
                      }
                    />
                  </label>
                  <label
                    className={[
                      "bakkerijBestel__item",
                      !pickupMeta.ok || !pickupMeta.isSaturday ? "is-disabled" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="bakkerijBestel__itemLabel">
                      Noors Speltbrood{" "}
                      <span className="bakkerijBestel__tag">alleen zaterdag</span>
                    </span>
                    <input
                      className="field__input bakkerijBestel__qty"
                      type="number"
                      min={0}
                      step={1}
                      value={bestel.noorsSpelt}
                      disabled={!pickupMeta.ok || !pickupMeta.isSaturday}
                      onChange={(e) =>
                        setBestel((s) => ({ ...s, noorsSpelt: e.target.value }))
                      }
                    />
                  </label>
                  <label
                    className={[
                      "bakkerijBestel__item",
                      !pickupMeta.ok || !pickupMeta.isSaturday ? "is-disabled" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="bakkerijBestel__itemLabel">
                      Deens Roggebrood{" "}
                      <span className="bakkerijBestel__tag">alleen zaterdag</span>
                    </span>
                    <input
                      className="field__input bakkerijBestel__qty"
                      type="number"
                      min={0}
                      step={1}
                      value={bestel.deensRogge}
                      disabled={!pickupMeta.ok || !pickupMeta.isSaturday}
                      onChange={(e) =>
                        setBestel((s) => ({ ...s, deensRogge: e.target.value }))
                      }
                    />
                  </label>
                  <label
                    className={[
                      "bakkerijBestel__item",
                      !pickupMeta.ok || !pickupMeta.isSaturday ? "is-disabled" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="bakkerijBestel__itemLabel">
                      Foccaccia <span className="bakkerijBestel__tag">alleen zaterdag</span>
                    </span>
                    <input
                      className="field__input bakkerijBestel__qty"
                      type="number"
                      min={0}
                      step={1}
                      value={bestel.foccaccia}
                      disabled={!pickupMeta.ok || !pickupMeta.isSaturday}
                      onChange={(e) =>
                        setBestel((s) => ({ ...s, foccaccia: e.target.value }))
                      }
                    />
                  </label>
                  <label
                    className={[
                      "bakkerijBestel__item",
                      !pickupMeta.ok || !pickupMeta.isSaturday ? "is-disabled" : null,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="bakkerijBestel__itemLabel">
                      Stokbrood <span className="bakkerijBestel__tag">alleen zaterdag</span>
                    </span>
                    <input
                      className="field__input bakkerijBestel__qty"
                      type="number"
                      min={0}
                      step={1}
                      value={bestel.stokbrood}
                      disabled={!pickupMeta.ok || !pickupMeta.isSaturday}
                      onChange={(e) =>
                        setBestel((s) => ({ ...s, stokbrood: e.target.value }))
                      }
                    />
                  </label>
                </div>
              </div>

              <label className="field field--full">
                <span className="field__label">Opmerkingen</span>
                <textarea
                  className="field__input field__textarea"
                  rows={4}
                  value={bestel.notes}
                  onChange={(e) => setBestel((s) => ({ ...s, notes: e.target.value }))}
                  placeholder="Bijv. snijden? extra wensen? tijdstip?"
                />
              </label>
            </div>

            {bestelError ? <div className="apply__error">{bestelError}</div> : null}
            {bestelSent ? (
              <div className="apply__sent">
                Bedankt! Je bestelling is verstuurd. Je ontvangt zo een bevestiging per mail.
              </div>
            ) : null}

            <div className="bakkerij__actions">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={bestelBusy || !pickupMeta.ok}
              >
                {bestelBusy ? "Bezig…" : "Bestelling versturen"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="section kepplertje" aria-label="Het Kepplertje">
        <div className="kepplertje__inner">
          <div className="kepplertje__media" aria-hidden="true">
            <img
              className="kepplertje__img"
              src="/pictures/Screenshot%202026-02-04%20at%2012.30.52.png"
              alt="Het Kepplertje (huisgemaakt kaneelbroodje)"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="kepplertje__copy">
            <div className="eyebrow">Zoet</div>
            <h2 className="section-title">Het Kepplertje</h2>
            <p className="kepplertje__text">
              Ons eigen huisgemaakte kaneelbroodje. Vers uit de oven, zacht vanbinnen en vol
              kaneel. Perfect bij je koffie — of gewoon omdat je er zin in hebt.
            </p>
            <p className="kepplertje__text">
              We bakken ‘m in kleine batches, dus als ‘ie er is: wees er snel bij.
            </p>
          </div>
        </div>
      </section>

      <section className="section bakkerijGallery" aria-label="Galerij">
        <div className="bakkerijGallery__inner">
          <div className="eyebrow">Galerij</div>
          <h2 className="section-title">Uit de bakkerij</h2>
          <div className="bakkerijGallery__grid">
            {galleryItems.map((it, idx) => (
              <figure key={it.src} className="bakkerijGallery__item">
                <button
                  type="button"
                  className="bakkerijGallery__btn"
                  onClick={() => setLightboxIdx(idx)}
                  aria-label={`Bekijk foto: ${it.alt}`}
                >
                  <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
                </button>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {active ? (
        <div
          className="bakkerijLightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Foto bekijken"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setLightboxIdx(null);
          }}
        >
          <div className="bakkerijLightbox__dialog">
            <button
              type="button"
              className="bakkerijLightbox__close"
              onClick={() => setLightboxIdx(null)}
              aria-label="Sluiten"
            >
              Sluiten
            </button>

            <button
              type="button"
              className="bakkerijLightbox__nav bakkerijLightbox__nav--prev"
              onClick={() =>
                setLightboxIdx((i) =>
                  i === null ? 0 : (i - 1 + galleryItems.length) % galleryItems.length,
                )
              }
              aria-label="Vorige foto"
            >
              ←
            </button>

            <img className="bakkerijLightbox__img" src={active.src} alt={active.alt} />

            <button
              type="button"
              className="bakkerijLightbox__nav bakkerijLightbox__nav--next"
              onClick={() =>
                setLightboxIdx((i) => (i === null ? 0 : (i + 1) % galleryItems.length))
              }
              aria-label="Volgende foto"
            >
              →
            </button>

            <div className="bakkerijLightbox__caption">{active.alt}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

