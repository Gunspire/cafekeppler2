import React from "react";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroepenPage from "./pages/GroepenPage";
import ContactPage from "./pages/ContactPage";
import ActueelDetailPage from "./pages/ActueelDetailPage";
import ActueelPage from "./pages/ActueelPage";
import WerkenBijPage from "./pages/WerkenBijPage";
import LokaalPage from "./pages/LokaalPage";
import BakkerijPage from "./pages/BakkerijPage";
import DinnerNotice from "./components/DinnerNotice";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  return (
    <main>
      <Header />
      <DinnerNotice />
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/groepen" element={<GroepenPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/actueel" element={<ActueelPage />} />
        <Route path="/actueel/:slug" element={<ActueelDetailPage />} />
        <Route path="/werken-bij" element={<WerkenBijPage />} />
        <Route path="/lokaal" element={<LokaalPage />} />
        <Route path="/bakkerij" element={<BakkerijPage />} />
      </Routes>
      <Footer />
    </main>
  );
}
