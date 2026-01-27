import React from "react";

export default function Intro() {
  return (
    <section className="section intro" id="about">
      <div className="intro__inner">
        <div className="intro__content">
          <div className="eyebrow">Onze Filosofie</div>
          <h2 className="section-title">Lokaal & Huisgemaakt</h2>
          <p className="intro__text">
            Bij Café Keppler kiezen we bewust voor lokale kwaliteit. We werken uitsluitend
            met ingrediënten en producten uit de regio. Van de melk in je cappuccino tot
            de groenten in je lunch: alles komt van leveranciers die we persoonlijk kennen.
          </p>
          <p className="intro__text">
            En wat we niet lokaal kunnen halen, maken we zelf. Onze taarten, soepen
            en broodjes worden dagelijks vers bereid in onze eigen keuken. Puur, eerlijk
            en met liefde gemaakt.
          </p>
        </div>
        <div className="intro__image">
          <img src="/intro-food.png" alt="Lokale ingrediënten" />
        </div>
      </div>
    </section>
  );
}
