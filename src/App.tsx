import React from "react";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroepenPage from "./pages/GroepenPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  return (
    <main>
      <Header />
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/groepen" element={<GroepenPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </main>
  );
}
