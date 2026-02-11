import React from "react";

type Role =
  | "Bediening"
  | "Barista"
  | "Keuken"
  | "Bakkerij"
  | "Allround"
  | "Anders";

type ExperienceLevel = "Beginner" | "Gevorderd" | "Expert";
type AvailabilityBlock = "Overdag" | "Avond" | "Beide";

type ApplyState = {
  name: string;
  email: string;
  phone: string;
  role: Role;
  roleOther: string;
  experienceLevel: ExperienceLevel;
  hoursPerWeek: string;
  startDate: string;
  days: string[];
  availabilityBlock: AvailabilityBlock | "";
  motivation: string;
  cvFile: File | null;
};

const DEFAULT_STATE: ApplyState = {
  name: "",
  email: "",
  phone: "",
  role: "Bediening",
  roleOther: "",
  experienceLevel: "Gevorderd",
  hoursPerWeek: "",
  startDate: "",
  days: [],
  availabilityBlock: "",
  motivation: "",
  cvFile: null,
};

const DAYS = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"] as const;
const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "Beginner",
  "Gevorderd",
  "Expert",
];

function buildApplicationText(state: ApplyState) {
  const roleText =
    state.role === "Anders" ? `Anders: ${state.roleOther || "-"}` : state.role;
  const days = state.days.length ? state.days.join(", ") : "-";
  const blocks = state.availabilityBlock || "-";

  const lines = [
    "Sollicitatie via website — Werken bij Café Keppler",
    "",
    `Naam: ${state.name || "-"}`,
    `Email: ${state.email || "-"}`,
    `Telefoon: ${state.phone || "-"}`,
    "",
    `Rol: ${roleText}`,
    `Ervaring (level): ${state.experienceLevel || "-"}`,
    `Uren per week: ${state.hoursPerWeek || "-"}`,
    `Startdatum: ${state.startDate || "-"}`,
    `Beschikbaar (dagen): ${days}`,
    `Beschikbaar (blok): ${blocks}`,
    "",
    "Motivatie:",
    state.motivation || "-",
    "",
  ];
  return lines.join("\n");
}

export default function WerkenBijPage() {
  const heroSlides = React.useMemo(
    () => [
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.21.59%20(9).webp",
        alt: "Teammoment bij Café Keppler",
      },
      {
        src: "/pictures/WhatsApp%20Image%202026-02-03%20at%2014.22.00.webp",
        alt: "Sfeerbeeld van werken bij Café Keppler",
        objectPosition: "center top",
      },
    ],
    [],
  );
  const [activeHeroIdx, setActiveHeroIdx] = React.useState(0);

  React.useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActiveHeroIdx((i) => (i + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(id);
  }, [heroSlides.length]);

  const [state, setState] = React.useState<ApplyState>(DEFAULT_STATE);
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const roleText =
    state.role === "Anders" ? `Anders: ${state.roleOther || "-"}` : state.role;

  const toggleArrayValue = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];

  const onSubmitBuild = async () => {
    setError(null);
    setSubmitted(false);
    setBusy(true);
    try {
      if (!state.name.trim() || !state.email.trim()) {
        throw new Error("Vul je naam en e-mail in.");
      }
      if (state.role === "Anders" && !state.roleOther.trim()) {
        throw new Error("Vul je rol in bij ‘Anders’.");
      }
      if (!state.availabilityBlock) {
        throw new Error("Kies je beschikbaarheid (Overdag / Avond / Beide).");
      }

      const to = "info@cafekeppler.nl";
      const subject = `Sollicitatie Café Keppler — ${roleText} — ${state.name.trim()}`;
      const cvLine = state.cvFile
        ? `CV (PDF): ${state.cvFile.name}`
        : "CV (PDF): voeg toe als bijlage";
      const bodyText = `${buildApplicationText(state)}\n${cvLine}\n`;

      const mailto = `mailto:${to}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(bodyText)}`;
      window.location.href = mailto;
      setSubmitted(true);
    } catch (e: any) {
      setError(e?.message ? String(e.message) : "Er ging iets mis.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <section className="page-hero" aria-label="Werken bij Keppler">
        <div className="page-hero__bg" aria-hidden="true">
          {heroSlides.map((s, idx) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className={
                idx === activeHeroIdx
                  ? "page-hero__img werken-hero__img is-active"
                  : "page-hero__img werken-hero__img"
              }
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
              style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
            />
          ))}
          <div className="page-hero__overlay" />
        </div>

        <div className="page-hero__content">
          <div className="eyebrow page-hero__eyebrow">Werken bij</div>
          <h1 className="page-hero__title">Café Keppler</h1>
          <p className="page-hero__text">
            Zin om mee te draaien in een team waar koffie, gastvrijheid en
            huisgemaakte kwaliteit centraal staan?
          </p>
        </div>
      </section>

      <section className="section werken">
        <div className="werken__inner">
          <div className="werken__copy">
            <div className="eyebrow">Team</div>
            <h2 className="section-title">Wat je bij ons kunt verwachten</h2>
            <p className="werken__text">
              Bij Keppler werk je niet alleen in een team, maar als onderdeel van
              de Keppler-familie. We vangen elkaar op als het druk is, lachen veel
              samen en zorgen dat iedereen zich welkom voelt — gasten én collega’s.
            </p>
            <ul className="werken__bullets">
              <li>Een warm, hecht team waarin je jezelf kunt zijn.</li>
              <li>Goede begeleiding en ruimte om te groeien in je rol.</li>
              <li>Afwisselende shifts met een eerlijke planning.</li>
              <li>Samen zorgen we elke dag voor fijne sfeer en kwaliteit.</li>
            </ul>
          </div>

          <div className="werken__formCol">
            <div className="eyebrow">Solliciteren</div>
            <h2 className="section-title">Sollicitatieformulier</h2>
            <p className="werken__text">
              Vul het formulier in en upload je CV (PDF). Na versturen nemen we
              je sollicitatie zo snel mogelijk in behandeling.
            </p>

            <div className="apply">
              <div className="apply__steps" aria-label="Quiz stappen">
                <button
                  type="button"
                  className={step === 1 ? "apply__step is-active" : "apply__step"}
                  onClick={() => setStep(1)}
                >
                  1. Rol
                </button>
                <button
                  type="button"
                  className={step === 2 ? "apply__step is-active" : "apply__step"}
                  onClick={() => setStep(2)}
                >
                  2. Beschikbaarheid
                </button>
                <button
                  type="button"
                  className={step === 3 ? "apply__step is-active" : "apply__step"}
                  onClick={() => setStep(3)}
                >
                  3. CV & contact
                </button>
              </div>

              <div className="apply__card">
                {step === 1 ? (
                  <div className="apply__grid">
                    <label className="field field--full">
                      <span className="field__label">Waarvoor wil je solliciteren? *</span>
                      <select
                        className="field__input"
                        value={state.role}
                        onChange={(e) =>
                          setState((s) => ({ ...s, role: e.target.value as Role }))
                        }
                      >
                        <option>Bediening</option>
                        <option>Barista</option>
                        <option>Keuken</option>
                        <option>Bakkerij</option>
                        <option>Allround</option>
                        <option>Anders</option>
                      </select>
                    </label>

                    {state.role === "Anders" ? (
                      <label className="field field--full">
                        <span className="field__label">Anders, namelijk *</span>
                        <input
                          className="field__input"
                          value={state.roleOther}
                          onChange={(e) =>
                            setState((s) => ({ ...s, roleOther: e.target.value }))
                          }
                          placeholder="Bijv. afwas / runner / leiding"
                          required
                        />
                      </label>
                    ) : null}

                    <label className="field">
                      <span className="field__label">Ervaring</span>
                      <select
                        className="field__input"
                        value={state.experienceLevel}
                        onChange={(e) =>
                          setState((s) => ({
                            ...s,
                            experienceLevel: e.target.value as ExperienceLevel,
                          }))
                        }
                      >
                        {EXPERIENCE_LEVELS.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="field">
                      <span className="field__label">Uren per week</span>
                      <input
                        className="field__input"
                        value={state.hoursPerWeek}
                        onChange={(e) =>
                          setState((s) => ({ ...s, hoursPerWeek: e.target.value }))
                        }
                        inputMode="numeric"
                        placeholder="Bijv. 16"
                      />
                    </label>

                    <label className="field">
                      <span className="field__label">Startdatum</span>
                      <input
                        className="field__input"
                        type="date"
                        value={state.startDate}
                        onChange={(e) =>
                          setState((s) => ({ ...s, startDate: e.target.value }))
                        }
                      />
                    </label>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="apply__grid">
                    <div className="field field--full">
                      <div className="field__label">Beschikbaar (dagen)</div>
                      <div className="apply__choices">
                        {DAYS.map((d) => (
                          <label key={d} className="apply__choice">
                            <input
                              type="checkbox"
                              checked={state.days.includes(d)}
                              onChange={() =>
                                setState((s) => ({
                                  ...s,
                                  days: toggleArrayValue(s.days, d),
                                }))
                              }
                            />
                            <span>{d}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <label className="field field--full">
                      <span className="field__label">Beschikbaar (blok) *</span>
                      <select
                        className="field__input"
                        value={state.availabilityBlock}
                        onChange={(e) =>
                          setState((s) => ({
                            ...s,
                            availabilityBlock: e.target.value as AvailabilityBlock,
                          }))
                        }
                        required
                      >
                        <option value="">Kies…</option>
                        <option value="Overdag">Overdag</option>
                        <option value="Avond">Avond</option>
                        <option value="Beide">Beide</option>
                      </select>
                    </label>

                    <label className="field field--full">
                      <span className="field__label">Waarom Keppler?</span>
                      <textarea
                        className="field__input field__textarea"
                        rows={5}
                        value={state.motivation}
                        onChange={(e) =>
                          setState((s) => ({ ...s, motivation: e.target.value }))
                        }
                        placeholder="Vertel kort wat je aanspreekt…"
                      />
                    </label>
                  </div>
                ) : null}

                {step === 3 ? (
                  <form
                    className="apply__grid"
                    id="werkenbij-apply-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      onSubmitBuild();
                    }}
                  >
                    <label className="field">
                      <span className="field__label">Naam *</span>
                      <input
                        className="field__input"
                        value={state.name}
                        onChange={(e) =>
                          setState((s) => ({ ...s, name: e.target.value }))
                        }
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

                    <label className="field">
                      <span className="field__label">Telefoon</span>
                      <input
                        className="field__input"
                        value={state.phone}
                        onChange={(e) =>
                          setState((s) => ({ ...s, phone: e.target.value }))
                        }
                      />
                    </label>

                    <label className="field field--full">
                      <span className="field__label">CV (PDF)</span>
                      <input
                        className="field__input"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={(e) =>
                          setState((s) => ({
                            ...s,
                            cvFile: e.target.files?.[0] ?? null,
                          }))
                        }
                      />
                      <div className="apply__fileHint">
                        {state.cvFile ? `Geselecteerd: ${state.cvFile.name}` : "Nog geen bestand gekozen."}
                      </div>
                    </label>

                    {error ? <div className="apply__error">{error}</div> : null}

                    <div className="apply__actions">
                      {/* Primary submit button is in the bottom nav on step 3 */}
                    </div>

                    {submitted ? (
                      <div className="apply__sent">
                        Je mail-app is geopend met je sollicitatie. Vergeet je CV (PDF) als bijlage toe te voegen.
                      </div>
                    ) : null}
                  </form>
                ) : null}

                <div className="apply__nav">
                  {step === 1 ? (
                    <span />
                  ) : (
                    <button
                      type="button"
                      className="btn btn--secondary"
                      onClick={() => setStep((s) => (s === 1 ? 1 : ((s - 1) as any)))}
                    >
                      ← Terug
                    </button>
                  )}

                  {step === 3 ? (
                    <button
                      type="submit"
                      form="werkenbij-apply-form"
                      className="btn btn--primary"
                      disabled={busy}
                    >
                      {busy ? "Bezig…" : "Verstuur sollicitatie"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={() => setStep((s) => (s === 3 ? 3 : ((s + 1) as any)))}
                    >
                      Volgende →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

