import React, { useMemo, useState } from "react";

type MeetingType =
  | "Borrel"
  | "Verjaardag"
  | "Diner"
  | "Afscheid"
  | "Private event"
  | "Zakelijk"
  | "Anders";

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  people: string;
  date: string;
  time: string;
  message: string;
  type: MeetingType;
  typeOther: string;
  email: string;
  phone: string;
};

const DEFAULT_STATE: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  people: "",
  date: "",
  time: "",
  message: "",
  type: "Borrel",
  typeOther: "",
  email: "",
  phone: "",
};

export default function GroepenPage() {
  const [state, setState] = useState<FormState>(DEFAULT_STATE);

  const mailtoHref = useMemo(() => {
    const to = "info@cafekeppler.nl";
    const subject = "Groepsreservering Café Keppler";
    const meetingType =
      state.type === "Anders" ? `Anders: ${state.typeOther || "-"}` : state.type;
    const bodyLines = [
      "Hoi Café Keppler,",
      "",
      "Ik wil graag informeren naar een groepsreservering:",
      "",
      `Naam: ${state.firstName || "-"} ${state.lastName || "-"}`.trim(),
      `Bedrijfsnaam: ${state.company || "-"}`,
      `Type bijeenkomst: ${meetingType}`,
      `Aantal personen: ${state.people || "-"}`,
      `Datum: ${state.date || "-"}`,
      `Tijd: ${state.time || "-"}`,
      `Email: ${state.email || "-"}`,
      `Telefoon: ${state.phone || "-"}`,
      "",
      "Bericht:",
      state.message || "-",
      "",
      "Dankjewel!",
    ];
    const body = bodyLines.join("\n");
    return `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [state]);

  const onChange =
    (key: keyof FormState) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setState((s) => ({ ...s, [key]: e.target.value }));
    };

  return (
    <>
      <section className="page-hero" aria-label="Groepen">
        <div className="page-hero__bg" aria-hidden="true">
          <img
            src="/cafe-keppler-wil-voor-import-en.jpg"
            alt=""
            className="page-hero__img"
          />
          <div className="page-hero__overlay" />
        </div>

        <div className="page-hero__content">
          <div className="eyebrow page-hero__eyebrow">Groepen</div>
          <h1 className="page-hero__title">Samen bij Keppler</h1>
          <p className="page-hero__text">
            Groepsreservering plannen? We denken graag mee over de invulling —
            laat je wensen achter en we reageren snel.
          </p>
        </div>
      </section>

      <section className="section groups">
        <div className="groups__inner">
          <div className="groups__copy">
            <div className="eyebrow">Mogelijkheden</div>
            <h2 className="section-title">Gezellig met een gezelschap</h2>
            <p className="groups__story">
              Op zoek naar een fijne plek in Amsterdam‑Noord om met een grotere
              groep samen te komen? Bij Café Keppler draait het om goede koffie,
              lekker eten en een ongedwongen sfeer — ideaal voor een borrel,
              verjaardag, reünie, jubileum of een ontspannen zakelijke bijeenkomst.
            </p>
            <p className="groups__story">
              Geef je datum, tijd en aantal personen door, plus wat je ongeveer in
              gedachten hebt. Dan bekijken we de mogelijkheden en stemmen we alles
              praktisch met je af.
            </p>
            <ul className="groups__bullets">
              <li>Een plek binnen of buiten (afhankelijk van beschikbaarheid).</li>
              <li>Voor borrels, diners en kleine vieringen.</li>
              <li>We stemmen de invulling af op jullie moment en gezelschap.</li>
            </ul>
            <p className="groups__note">
              Laat hieronder je gegevens achter, dan nemen we contact op om de
              details te bespreken.
            </p>
          </div>

          <form
            className="groups__form"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref;
            }}
          >
            <div className="form-grid">
              <label className="field">
                <span className="field__label">Voornaam *</span>
                <input
                  className="field__input"
                  value={state.firstName}
                  onChange={onChange("firstName")}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">Achternaam *</span>
                <input
                  className="field__input"
                  value={state.lastName}
                  onChange={onChange("lastName")}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">Bedrijfsnaam</span>
                <input
                  className="field__input"
                  value={state.company}
                  onChange={onChange("company")}
                />
              </label>

              <label className="field">
                <span className="field__label">Aantal personen *</span>
                <input
                  className="field__input"
                  value={state.people}
                  onChange={onChange("people")}
                  inputMode="numeric"
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">Datum bijeenkomst *</span>
                <input
                  className="field__input"
                  type="date"
                  value={state.date}
                  onChange={onChange("date")}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">Tijd *</span>
                <input
                  className="field__input"
                  type="time"
                  value={state.time}
                  onChange={onChange("time")}
                  required
                />
              </label>

              <label className="field field--full">
                <span className="field__label">Type bijeenkomst</span>
                <select
                  className="field__input"
                  value={state.type}
                  onChange={onChange("type")}
                >
                  <option>Borrel</option>
                  <option>Verjaardag</option>
                  <option>Diner</option>
                  <option value="Afscheid">Afscheidfeestje</option>
                  <option>Private event</option>
                  <option>Zakelijk</option>
                  <option>Anders</option>
                </select>
              </label>

              {state.type === "Anders" ? (
                <label className="field field--full">
                  <span className="field__label">Anders, namelijk</span>
                  <input
                    className="field__input"
                    value={state.typeOther}
                    onChange={onChange("typeOther")}
                    placeholder="Bijv. reünie"
                  />
                </label>
              ) : null}

              <label className="field field--full">
                <span className="field__label">Bericht</span>
                <textarea
                  className="field__input field__textarea"
                  value={state.message}
                  onChange={onChange("message")}
                  rows={5}
                  placeholder="Vertel kort wat jullie in gedachten hebben…"
                />
              </label>

              <label className="field">
                <span className="field__label">E-mailadres *</span>
                <input
                  className="field__input"
                  type="email"
                  value={state.email}
                  onChange={onChange("email")}
                  required
                />
              </label>

              <label className="field">
                <span className="field__label">Telefoonnummer *</span>
                <input
                  className="field__input"
                  value={state.phone}
                  onChange={onChange("phone")}
                  required
                />
              </label>
            </div>

            <div className="groups__actions">
              <button type="submit" className="btn btn--primary">
                Verstuur aanvraag
              </button>
              <a className="btn btn--secondary" href={mailtoHref}>
                Open mail
              </a>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

