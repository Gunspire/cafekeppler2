import React from "react";
import { createPortal } from "react-dom";
import {
  pickSpotlightForDate,
  SPOTLIGHT_SESSION_DISMISS_KEY,
  type SpotlightCampaign,
} from "../data/spotlightCampaigns";

const OPEN_DELAY_MS = 700;

export default function NewDishSpotlight() {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const didScheduleAutoOpenRef = React.useRef(false);

  const campaign: SpotlightCampaign | null = pickSpotlightForDate(new Date());

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    didScheduleAutoOpenRef.current = false;
  }, [campaign?.id]);

  React.useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    if (!campaign) return;

    let cancelled = false;
    let timeoutId = 0;

    try {
      if (window.sessionStorage.getItem(SPOTLIGHT_SESSION_DISMISS_KEY)) {
        return;
      }
    } catch {
      return;
    }

    if (didScheduleAutoOpenRef.current) return;
    didScheduleAutoOpenRef.current = true;

    returnFocusRef.current = document.activeElement as HTMLElement | null;

    timeoutId = window.setTimeout(() => {
      if (cancelled) return;
      try {
        if (window.sessionStorage.getItem(SPOTLIGHT_SESSION_DISMISS_KEY)) {
          return;
        }
      } catch {
        return;
      }
      setVisible(true);
    }, OPEN_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [mounted, campaign?.id]);

  const dismiss = React.useCallback(() => {
    try {
      window.sessionStorage.setItem(SPOTLIGHT_SESSION_DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    window.requestAnimationFrame(() => {
      returnFocusRef.current?.focus?.();
    });
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  React.useEffect(() => {
    if (!visible) return;
    const id = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [visible]);

  React.useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, dismiss]);

  const onPanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const list = Array.from(focusables).filter(
      (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
    );
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!mounted || !visible || !campaign) return null;

  const c = campaign;
  const badge = c.badgeLabel ?? "Nieuw";

  const modal = (
    <div className="newDishSpotlight">
      <div
        className="newDishSpotlight__backdrop"
        aria-hidden="true"
        onClick={dismiss}
      />
      <div
        ref={panelRef}
        className="newDishSpotlight__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-dish-spotlight-title"
        aria-describedby="new-dish-spotlight-desc"
        onKeyDown={onPanelKeyDown}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className="newDishSpotlight__close"
          onClick={dismiss}
          aria-label="Sluiten"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="newDishSpotlight__visual">
          <img
            className="newDishSpotlight__img"
            src={c.imageSrc}
            alt={c.imageAlt}
            loading="eager"
            decoding="async"
          />
          <div className="newDishSpotlight__visualBadge" aria-hidden="true">
            {badge}
          </div>
        </div>

        <div className="newDishSpotlight__body">
          <div className="eyebrow newDishSpotlight__eyebrow">{c.eyebrow}</div>
          <h2 id="new-dish-spotlight-title" className="newDishSpotlight__title">
            {c.title}
          </h2>
          <p id="new-dish-spotlight-desc" className="newDishSpotlight__text">
            {c.description}
            {c.phone ? (
              <>
                {" "}
                <a
                  className="newDishSpotlight__phone"
                  href={`tel:${c.phone.tel.replace(/^tel:/i, "")}`}
                >
                  {c.phone.label}
                </a>
                .
              </>
            ) : null}
          </p>
          <div className="newDishSpotlight__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={dismiss}
            >
              Begrepen
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
