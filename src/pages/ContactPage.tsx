import React, { useMemo, useState } from "react";
import Info from "../components/Info";

type ContactState = {
  name: string;
  email: string;
  message: string;
};

const DEFAULT_STATE: ContactState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactPage() {
  const [state, setState] = useState<ContactState>(DEFAULT_STATE);

  const mailtoHref = useMemo(() => {
    const to = "info@cafekeppler.nl";
    const subject = "Bericht via website (Contact)";
    const body = [
      "Hoi Café Keppler,",
      "",
      "Bericht via de website:",
      `Naam: ${state.name || "-"}`,
      `Email: ${state.email || "-"}`,
      "",
      state.message || "-",
      "",
      "Groet,",
    ].join("\n");
    return `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [state]);

  return (
    <>
      <section className="page-hero" aria-label="Contact">
        <div className="page-hero__bg" aria-hidden="true">
          <img
            src="/01-misset-cafe-keppler-9049.jpg"
            alt=""
            className="page-hero__img"
          />
          <div className="page-hero__overlay" />
        </div>

        <div className="page-hero__content">
          <div className="eyebrow page-hero__eyebrow">Contact</div>
          <h1 className="page-hero__title">Neem contact op</h1>
          <p className="page-hero__text">
            Vraagje, idee of groepsaanvraag? Stuur een bericht — we reageren zo
            snel mogelijk.
          </p>
        </div>
      </section>

      <section className="section contactPage">
        <div className="contactPage__inner">
          <div className="contactPage__copy">
            <div className="eyebrow">Gegevens</div>
            <h2 className="section-title">Café Keppler</h2>
            <p className="groups__note">
              Van der Pekstraat 1<br />
              1031 CN Amsterdam
            </p>
            <p className="groups__note">
              <a href="tel:+31207370838">020 737 08 38</a>
              <br />
              <a href="mailto:info@cafekeppler.nl">info@cafekeppler.nl</a>
            </p>
          </div>

          <form
            className="contactPage__form"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref;
            }}
          >
            <div className="form-grid">
              <label className="field">
                <span className="field__label">Naam *</span>
                <input
                  className="field__input"
                  value={state.name}
                  onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">E-mail *</span>
                <input
                  className="field__input"
                  type="email"
                  value={state.email}
                  onChange={(e) =>
                    setState((s) => ({ ...s, email: e.target.value }))
                  }
                  required
                />
              </label>

              <label className="field field--full">
                <span className="field__label">Bericht *</span>
                <textarea
                  className="field__input field__textarea"
                  rows={6}
                  value={state.message}
                  onChange={(e) =>
                    setState((s) => ({ ...s, message: e.target.value }))
                  }
                  placeholder="Schrijf hier je bericht…"
                  required
                />
              </label>
            </div>

            <div className="groups__actions">
              <button type="submit" className="btn btn--primary">
                Verstuur
              </button>
              <a className="btn btn--secondary" href={mailtoHref}>
                Open mail
              </a>
            </div>
          </form>
        </div>
      </section>

      <Info />
    </>
  );
}

