import React from "react";
import Splash from "./components/Splash";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Bakery from "./components/Bakery";
import MenuPreview from "./components/MenuPreview";
import Banner from "./components/Banner";
import Info from "./components/Info";
import Footer from "./components/Footer";

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  return (
    <main>
      {showSplash ? <Splash onDone={() => setShowSplash(false)} /> : null}
      <Header />
      <Hero />
      <Intro />
      <Bakery />
      <Banner />
      <MenuPreview />
      <Info />
      <Footer />
    </main>
  );
}
