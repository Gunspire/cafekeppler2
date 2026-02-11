import React from "react";
import Splash from "../components/Splash";
import Hero from "../components/Hero";
import Events from "../components/Events";
import Intro from "../components/Intro";
import Bakery from "../components/Bakery";
import MenuPreview from "../components/MenuPreview";
import Reviews from "../components/Reviews";
import Info from "../components/Info";

export default function HomePage() {
  const [showSplash, setShowSplash] = React.useState(() => {
    if (typeof window === "undefined") return false;
    try {
      // Show once per browser session (so it doesn't disappear forever).
      return !window.sessionStorage.getItem("keppler_splash_seen_v1");
    } catch {
      return true;
    }
  });

  return (
    <>
      {showSplash ? (
        <Splash
          onDone={() => {
            try {
              window.sessionStorage.setItem("keppler_splash_seen_v1", "1");
            } catch {
              // ignore
            }
            setShowSplash(false);
          }}
        />
      ) : null}
      <Hero />
      <Events />
      <Intro />
      <Bakery />
      <MenuPreview />
      <Reviews />
      <Info />
    </>
  );
}

