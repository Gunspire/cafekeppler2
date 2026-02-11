import React from "react";

export default function BakkerijPage() {
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
          <h1 className="page-hero__title">Elke dag vers brood</h1>
          <p className="page-hero__text">
            Vers gebakken, elke dag opnieuw. Voor bij ons in het café, of mee naar huis.
          </p>
        </div>
      </section>

      <section className="section bakkerij">
        <div className="bakkerij__inner">
          <div className="bakkerij__copy">
            <div className="eyebrow">Huisgemaakt</div>
            <h2 className="section-title">Brood uit eigen bakkerij</h2>
            <p className="bakkerij__text">
              In onze eigen bakkerij bakken we iedere dag vers brood. Je proeft het bij ontbijt
              en lunch, naast je soep, en bij alles waar zo’n goed stuk brood nét het verschil
              maakt.
            </p>
            <p className="bakkerij__text">
              Liever mee naar huis voor later? In het winkeltje verkopen we een selectie broden
              (zolang de voorraad strekt).
            </p>

            <ul className="bakkerij__bullets">
              <li>Elke dag vers gebakken brood.</li>
              <li>Bij ons in het café, of to-go voor later.</li>
              <li>In het winkeltje: op = op.</li>
            </ul>

            <p className="bakkerij__muted">
              Te koop van donderdag tot zondag in ons winkeltje… maar op = op, dus wees er snel
              bij!
            </p>
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

