import React from "react";

export default function Banner() {
  return (
    <section className="banner" aria-hidden="true">
      <div className="banner__inner">
        <img
          className="banner__img"
          src="/cafe-keppler-wil-voor-import-en.jpg"
          alt=""
        />
        <div className="banner__overlay" />
      </div>
    </section>
  );
}

