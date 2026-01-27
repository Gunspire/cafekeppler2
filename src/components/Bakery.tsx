import React from "react";

export default function Bakery() {
  return (
    <section className="section bakery" id="bakery">
      <div className="bakery__inner">
        <div className="bakery__image">
          <img src="/bakery-photo.png" alt="Keppler Bakkerij" />
        </div>
        <div className="bakery__content">
          <div className="eyebrow">Eigen Branderij & Bakkerij</div>
          <h2 className="section-title">Alles in huis gemaakt</h2>
          <p className="intro__text">
            Bij Keppler geloven we dat je liefde kunt proeven. Daarom branden we onze
            koffiebonen zelf in onze micro-branderij. Zo garanderen we altijd de
            verste roast en de beste smaakprofielen, rechtstreeks van de boon in
            jouw kopje.
          </p>
          <p className="intro__text">
            Daarnaast komt de geur van vers brood je elke ochtend tegemoet. In onze
            eigen bakkerij kneden en bakken we dagelijks ons desembrood, croissants
            en taarten. Geen halffabrikaten, maar meel, water, tijd en vakmanschap.
          </p>
        </div>
      </div>
    </section>
  );
}
