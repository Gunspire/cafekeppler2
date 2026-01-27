import React, { useMemo, useRef } from "react";

type CarouselItem = {
  category: string;
  title: string;
  details?: string;
  src: string;
  alt: string;
  objectPosition?: string;
};

export default function MenuPreview() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo<CarouselItem[]>(
    () => [
      {
        category: "Lunch",
        title: "Aubergine van de grill",
        details:
          "Met kruidensalade, koolsla, huisgemaakte harissa & desembrood.",
        src: "/intro-food.png",
        alt: "Lunchgerecht met gegrilde aubergine, kruiden en brood",
        objectPosition: "center",
      },
      {
        category: "Lunch",
        title: "Falafel & tahin",
        details: "Huisgemaakte falafel, frisse salade, tahin & brood.",
        src: "/dish-1.png",
        alt: "Broodje met falafel, saus en bijgerechten",
        objectPosition: "center",
      },
      {
        category: "Diner",
        title: "Stoofvlees & aardappels",
        details: "Langzaam gegaard, met geroosterde aardappels & jus.",
        src: "/dish-2.png",
        alt: "Stoofgerecht met aardappels en tomaat",
        objectPosition: "center",
      },
      {
        category: "Diner",
        title: "Kip met jus",
        details: "Malse kip, geroosterde aardappels, kruiden & romige jus.",
        src: "/dish-3.png",
        alt: "Kip met aardappels en jus",
        objectPosition: "center",
      },
      {
        category: "Borrel",
        title: "Geroosterde pompoen",
        details: "Pompoen uit de oven, bitterblad, zaden & romige dressing.",
        src: "/dish-4.png",
        alt: "Salade met geroosterde pompoen en zaden",
        objectPosition: "center",
      },
    ],
    [],
  );

  const scrollByOne = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(".carousel__item");
    const itemWidth = first?.offsetWidth ?? 320;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    el.scrollBy({ left: direction * (itemWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="section menu-preview" id="menu">
      <div className="menu-preview__inner">
        <div className="carousel">
          <div className="carousel__top">
            <div className="eyebrow">Uitgelicht</div>
            <div className="carousel__controls" aria-label="Carousel controls">
              <button
                type="button"
                className="carousel__btn"
                onClick={() => scrollByOne(-1)}
                aria-label="Vorige"
              >
                ←
              </button>
              <button
                type="button"
                className="carousel__btn"
                onClick={() => scrollByOne(1)}
                aria-label="Volgende"
              >
                →
              </button>
            </div>
          </div>

          <div className="carousel__track" ref={trackRef}>
            {items.map((item) => (
              <a
                key={`${item.category}-${item.title}`}
                href="/Cafe_Keppler_menu_mei_2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="carousel__item"
              >
                <img
                  className="carousel__img"
                  src={item.src}
                  alt={item.alt}
                  style={
                    item.objectPosition
                      ? { objectPosition: item.objectPosition }
                      : undefined
                  }
                />
                <div className="carousel__caption">
                  <div className="eyebrow carousel__eyebrow">{item.category}</div>
                  <div className="carousel__title">{item.title}</div>
                  {item.details ? (
                    <div className="carousel__details">{item.details}</div>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="menu-preview__footer">
          <a href="/Cafe_Keppler_menu_mei_2025.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
            Download volledige kaart (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
