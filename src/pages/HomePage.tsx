import React from "react";
import Splash from "../components/Splash";
import Hero from "../components/Hero";
import Events from "../components/Events";
import Intro from "../components/Intro";
import Bakery from "../components/Bakery";
import Banner from "../components/Banner";
import MenuPreview from "../components/MenuPreview";
import Reviews from "../components/Reviews";
import Info from "../components/Info";

export default function HomePage() {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <>
      {showSplash ? <Splash onDone={() => setShowSplash(false)} /> : null}
      <Hero />
      <Events />
      <Intro />
      <Bakery />
      <Banner />
      <MenuPreview />
      <Reviews />
      <Info />
    </>
  );
}

