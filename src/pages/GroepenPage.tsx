import React, { useMemo, useState } from "react";
import Hero from "../components/Hero";

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
      <Hero />

      <section className="section groups">
        <div className="groups__inner">
          <div className="groups__copy">
            <div className="eyebrow">Borrelen en eten</div>
            <h2 className="section-title">Borrelen en eten</h2>
            <p className="groups__story">
              Op zoek naar een plek om gezellig te komen borrelen? We hebben ruimte
              tot <span className="accentText">35 personen</span> om te bespreken. Omdat we verder ook gewoon open zijn
              voor andere gasten kunnen we helaas geen grotere groepen aannemen.
            </p>
            <p className="groups__story">
              Van <span className="accentText">16:00 - 18:00</span> zijn er geen extra kosten.
            </p>
            <p className="groups__story">
              Tussen <span className="accentText">18:00 - 21:00</span> bieden we een borrel-drank-arrangement aan van{" "}
              <span className="accentText">€ 12,95 p.p.p.u.</span> Dit omdat we in deze uren met de keuken open zijn en
              we de tafels ook kunnen reserveren voor mensen die willen komen eten.
              Heb je hier vragen over, neem dan contact op.
            </p>
            <p className="groups__story">
              Kom je eten met een groep. De maximale grootte van de groep is{" "}
              <span className="accentText">20 personen</span>. In
              overleg met ons bespreken we wat we kunnen aanbieden.
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

