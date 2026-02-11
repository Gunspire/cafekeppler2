import React from "react";
import { useLocation } from "react-router-dom";

type NoticeState = "open" | "minimized";

const STORAGE_KEY = "keppler_dinner_notice_state_v1";
const SEEN_KEY = "keppler_dinner_notice_seen_v1";
const HOME_AUTO_KEY = "keppler_dinner_drawer_home_auto_v1";

function getInitialState(): NoticeState {
  if (typeof window === "undefined") return "minimized";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "open" || stored === "minimized") return stored;
    // Default: show open once ever, then minimize.
    const seen = window.localStorage.getItem(SEEN_KEY);
    return seen ? "minimized" : "open";
  } catch {
    return "open";
  }
}

export default function DinnerNotice() {
  const location = useLocation();
  const initialState = React.useMemo(() => getInitialState(), []);
  const openedByUserRef = React.useRef(false);
  const [state, setState] = React.useState<NoticeState>(initialState);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Persist state.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, state);
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore
    }
  }, [state]);

  // Home page: first ever load -> wait 6s, slide out for 5s, then slide back.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduceMotion) return;
    if (location.pathname !== "/") return;
    try {
      if (window.sessionStorage.getItem(HOME_AUTO_KEY)) return;
      window.sessionStorage.setItem(HOME_AUTO_KEY, "1");
    } catch {
      // ignore
    }

    openedByUserRef.current = false;
    const openT = window.setTimeout(() => {
      if (openedByUserRef.current) return;
      setState("open");
    }, 6000);

    const closeT = window.setTimeout(() => {
      // Only close if the user didn't manually open/keep it open.
      if (!openedByUserRef.current) setState("minimized");
    }, 6000 + 5000);

    return () => {
      window.clearTimeout(openT);
      window.clearTimeout(closeT);
    };
  }, [location.pathname, reduceMotion]);

  // ESC closes (minimizes) when open.
  React.useEffect(() => {
    if (state !== "open") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState("minimized");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state]);

  const isOpen = state === "open";

  return (
    <>
      <button
        type="button"
        className={isOpen ? "dinnerDrawerToggle dinnerDrawerToggle--outer is-hidden" : "dinnerDrawerToggle dinnerDrawerToggle--outer"}
        onClick={() => {
          openedByUserRef.current = true;
          setState("open");
        }}
        aria-label="Diner-melding openen"
        aria-expanded={isOpen}
        aria-controls="dinner-drawer"
      >
        <img
          className="dinnerDrawerToggle__logo"
          src="/logotjes/logo-header.png"
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      </button>

      <aside
        id="dinner-drawer"
        className={isOpen ? "dinnerDrawerPanel is-open" : "dinnerDrawerPanel"}
        aria-label="Nieuw: Diner bij Keppler"
      >
        <div className="dinnerDrawerPanel__top">
          <div className="dinnerDrawerPanel__eyebrow">Nieuw</div>
          <button
            type="button"
            className="dinnerDrawerToggle dinnerDrawerToggle--inner"
            onClick={() => {
              openedByUserRef.current = true;
              setState("minimized");
            }}
            aria-label="Diner-melding sluiten"
          >
            <img
              className="dinnerDrawerToggle__logo"
              src="/logotjes/logo-header.png"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </button>
        </div>

        <div className="dinnerDrawerPanel__title">Diner bij Keppler</div>
        <div className="dinnerDrawerPanel__text">
          We serveren elke avond diner. Ken je ons vooral van koffie & lunch? Kom ’s avonds
          langs.
        </div>
        <div className="dinnerDrawerPanel__actions">
          <a
            className="dinnerDrawerPanel__link"
            href="/Cafe_Keppler_menu_mei_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bekijk menu (PDF)
          </a>
        </div>
      </aside>
    </>
  );
}

