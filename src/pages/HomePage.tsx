import React from "react";
import Hero from "../components/Hero";
import Events from "../components/Events";
import Intro from "../components/Intro";
import Bakery from "../components/Bakery";
import MenuPreview from "../components/MenuPreview";
import Reviews from "../components/Reviews";
import Info from "../components/Info";

export default function HomePage() {
  return (
    <>
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

