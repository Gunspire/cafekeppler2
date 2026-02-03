import React, { useEffect, useMemo, useRef, useState } from "react";

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
    )}&libraries=places`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script."));
    document.head.appendChild(script);
  });
}

export default function Info() {
  const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
    | string
    | undefined;
  const googlePlaceId = import.meta.env.VITE_GOOGLE_PLACE_ID as
    | string
    | undefined;

  const directionsHref =
    googlePlaceId
      ? `https://www.google.com/maps/dir/?api=1&destination_place_id=${encodeURIComponent(
          googlePlaceId,
        )}&destination=${encodeURIComponent("Café Keppler")}`
      : "https://www.google.com/maps/dir/?api=1&destination=9WP5%2BQ6%20Amsterdam";

  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState(false);
  const placeLabel = useMemo(() => "Café Keppler", []);

  useEffect(() => {
    if (!googleMapsKey || !googlePlaceId) return;
    if (!mapRef.current) return;

    let cancelled = false;
    setMapError(false);

    loadGoogleMaps(googleMapsKey)
      .then(
        () =>
          new Promise<void>((resolve, reject) => {
            if (!mapRef.current) return resolve();

            const container = document.createElement("div");
            const service = new google.maps.places.PlacesService(container);

            service.getDetails(
              { placeId: googlePlaceId, fields: ["name", "geometry"] },
              (place: any, status: any) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                  reject(new Error(String(status)));
                  return;
                }
                const loc = place?.geometry?.location;
                if (!loc) {
                  reject(new Error("No location"));
                  return;
                }

                const map = new google.maps.Map(mapRef.current, {
                  center: loc,
                  zoom: 16,
                  disableDefaultUI: true,
                  zoomControl: true,
                  gestureHandling: "cooperative",
                });

                const marker = new google.maps.Marker({
                  map,
                  position: loc,
                  title: place?.name ?? "Café Keppler",
                });

                // Optional: open a small info bubble on load (no coordinates text)
                const info = new google.maps.InfoWindow({
                  content: `<div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size: 14px; font-weight: 600;">${
                    place?.name ?? "Café Keppler"
                  }</div>`,
                });
                info.open({ map, anchor: marker });

                resolve();
              },
            );
          }),
      )
      .catch(() => {
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [googleMapsKey, googlePlaceId]);

  return (
    <section className="section info" id="contact">
      <div className="info__inner">
        <div className="info__card">
          <h3 className="info__title">Openingstijden</h3>
          <ul className="info__list">
            <li>
              <span>Maandag - Vrijdag</span>
              <span>08:00 - 18:00</span>
            </li>
            <li>
              <span>Zaterdag</span>
              <span>09:00 - 18:00</span>
            </li>
            <li>
              <span>Zondag</span>
              <span>10:00 - 17:00</span>
            </li>
          </ul>
        </div>

        <div className="info__card info__card--highlight">
          <h3 className="info__title">Locatie</h3>
          <p>
            Van der Pekstraat 1<br />
            1031 CN Amsterdam
          </p>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{ marginTop: "16px" }}
          >
            Routebeschrijving
          </a>
        </div>
      </div>

      <div className="info__map">
        {googleMapsKey && googlePlaceId && !mapError ? (
          <>
            <div className="map__label" aria-hidden="true">
              {placeLabel}
            </div>
            <div className="map__canvas" ref={mapRef} />
          </>
        ) : (
          <iframe
            title="Keppler Locatie"
            src="https://www.google.com/maps?q=9WP5%2BQ6%20Amsterdam&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>
    </section>
  );
}
