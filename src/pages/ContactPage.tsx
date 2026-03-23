import React, { useMemo, useState } from "react";
import Hero from "../components/Hero";
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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const onSubmit = async () => {
    setError(null);
    setSubmitted(false);
    setBusy(true);
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name.trim(),
          email: state.email.trim(),
          message: state.message.trim(),
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

      setSubmitted(true);
      setState(DEFAULT_STATE);
    } catch (e: any) {
      setError(e?.message ? String(e.message) : "Er ging iets mis.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Hero />

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
              onSubmit();
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

            {error ? <div className="apply__error">{error}</div> : null}
            {submitted ? (
              <div className="apply__sent">
                Bedankt! Je bericht is verstuurd. Je ontvangt zo een bevestiging per mail.
              </div>
            ) : null}

            <div className="groups__actions">
              <button type="submit" className="btn btn--primary">
                {busy ? "Bezig…" : "Verstuur"}
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

