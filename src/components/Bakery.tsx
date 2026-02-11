import React from "react";

export default function Bakery() {
  const bakeryVideoSrc =
    "https://pub-937147060c7a441196639e7dd4ff9a5d.r2.dev/Zin%20in%20een%20gezellig%20diner%20Kom%20bij%20ons%20langs!%20%F0%9F%8D%B7Woensdag%20en%20donderdag%20zijn%20we%20tot%2023-00%20open%20%26%20vr.mp4";

  return (
    <section className="section bakery" id="bakery">
      <div className="bakery__inner">
        <div className="bakery__image">
          <video
            className="bakery__video"
            src={bakeryVideoSrc}
            poster="/bakery-photo.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Keppler bakkerij video"
          />
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
