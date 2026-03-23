import React, { useEffect, useMemo, useState } from "react";

type Review = {
  authorName: string;
  rating: number;
  time: number; // unix seconds
  relativeTime: string;
  text: string;
  profilePhotoUrl?: string;
};

const GOOGLE_MAPS_SCRIPT_ID = "google-maps-js";

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (window.google?.maps?.places) return Promise.resolve();

  const existing = document.getElementById(
    GOOGLE_MAPS_SCRIPT_ID,
  ) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Maps script.")),
        { once: true },
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey,
    )}&libraries=places&language=nl`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script."));
    document.head.appendChild(script);
  });
}

function toReview(r: any): Review {
  return {
    authorName: r?.author_name ?? "Anoniem",
    rating: Number(r?.rating ?? 0),
    time: Number(r?.time ?? 0),
    relativeTime: r?.relative_time_description ?? "",
    text: r?.text ?? "",
    profilePhotoUrl: r?.profile_photo_url,
  };
}

/** Max recent 5★ reviews to show. */
const MAX_REVIEWS = 3;
/** Preview: first ~3 lines or ~220 chars, whichever is shorter. */
const PREVIEW_MAX_CHARS = 220;

function reviewPreview(text: string): string {
  const raw = text.trim();
  if (!raw) return "";

  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const moreThanThreeLines = lines.length > 3;
  let chunk =
    lines.length > 1 ? lines.slice(0, 3).join(" ") : raw;

  if (chunk.length > PREVIEW_MAX_CHARS) {
    const slice = chunk.slice(0, PREVIEW_MAX_CHARS);
    const lastSpace = slice.lastIndexOf(" ");
    chunk =
      (lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trimEnd() + "…";
  } else if (moreThanThreeLines) {
    chunk += "…";
  }

  return chunk;
}

export default function Reviews() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;

  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error" | "missing"
  >("idle");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [placeName, setPlaceName] = useState<string>("Café Keppler");
  const [placeUrl, setPlaceUrl] = useState<string | null>(null);

  const cacheKey = useMemo(
    () => (placeId ? `keppler.reviews.v3.${placeId}` : null),
    [placeId],
  );

  useEffect(() => {
    if (!apiKey || !placeId) {
      setStatus("missing");
      return;
    }

    // Quick cache (30 minutes) to avoid hitting quota on every reload.
    if (cacheKey) {
      try {
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            at: number;
            placeName?: string;
            placeUrl?: string;
            reviews?: Review[];
          };
          if (Date.now() - parsed.at < 30 * 60 * 1000 && parsed.reviews?.length) {
            setPlaceName(parsed.placeName || "Café Keppler");
            setPlaceUrl(parsed.placeUrl || null);
            setReviews(parsed.reviews);
            setStatus("ready");
            return;
          }
        }
      } catch {
        // ignore cache errors
      }
    }

    let cancelled = false;
    setStatus("loading");

    loadGoogleMaps(apiKey)
      .then(
        () =>
          new Promise<void>((resolve, reject) => {
            const container = document.createElement("div");
            const service = new google.maps.places.PlacesService(container);
            service.getDetails(
              {
                placeId,
                fields: ["name", "url", "reviews", "rating", "user_ratings_total"],
                language: "nl",
              },
              (place: any, s: any) => {
                if (s !== google.maps.places.PlacesServiceStatus.OK) {
                  reject(new Error(String(s)));
                  return;
                }
                if (!place) {
                  reject(new Error("No place details."));
                  return;
                }

                const mapped = (place.reviews ?? [])
                  .map(toReview)
                  .filter((r: Review) => r.rating === 5)
                  .sort((a: Review, b: Review) => b.time - a.time)
                  .slice(0, MAX_REVIEWS);

                if (!cancelled) {
                  setPlaceName(place.name || "Café Keppler");
                  setPlaceUrl(place.url || null);
                  setReviews(mapped);
                  setStatus("ready");
                  if (cacheKey) {
                    try {
                      localStorage.setItem(
                        cacheKey,
                        JSON.stringify({
                          at: Date.now(),
                          placeName: place.name || "Café Keppler",
                          placeUrl: place.url || null,
                          reviews: mapped,
                        }),
                      );
                    } catch {
                      // ignore
                    }
                  }
                }
                resolve();
              },
            );
          }),
      )
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, placeId, cacheKey]);

  if (status === "missing") return null;

  return (
    <section className="section reviews" id="reviews" aria-label="Beoordelingen">
      <div className="reviews__inner">
        <div className="reviews__header">
          <div className="eyebrow">Recensies</div>
          <h2 className="section-title">Wat gasten zeggen</h2>
        </div>

        {status === "loading" ? (
          <div className="reviews__loading">Recensies laden…</div>
        ) : null}

        {status === "error" ? (
          <div className="reviews__loading">
            Recensies konden niet worden geladen.
          </div>
        ) : null}

        {status === "ready" ? (
          <>
            <div className="reviews__grid">
              {reviews.map((r, idx) => (
                <article className="review" key={`${r.time}-${idx}`}>
                  <div className="review__top">
                    <div className="review__who">
                      <div className="review__name">{r.authorName}</div>
                      <div className="review__meta">
                        <span className="review__stars" aria-label="5 sterren">
                          ★★★★★
                        </span>
                        <span className="review__time">{r.relativeTime}</span>
                      </div>
                    </div>
                    {r.profilePhotoUrl ? (
                      <img
                        className="review__avatar"
                        src={r.profilePhotoUrl}
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : null}
                  </div>
                  <p className="review__text">{reviewPreview(r.text)}</p>
                </article>
              ))}
            </div>

            <div className="reviews__footer">
              <div className="reviews__place">{placeName}</div>
              {placeUrl ? (
                <a
                  className="btn btn--secondary"
                  href={placeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bekijk alle reviews op Google
                </a>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

