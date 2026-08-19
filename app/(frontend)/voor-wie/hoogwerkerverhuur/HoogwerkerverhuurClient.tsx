"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactPopup from "@/app/components/ContactPopup";
import FloatingCTA from "@/app/components/FloatingCTA";
import HoogwerkerHero from "./sections/HoogwerkerHero";
import HoogwerkerExample from "./sections/HoogwerkerExample";
import HoogwerkerPrinciple from "./sections/HoogwerkerPrinciple";
import HoogwerkerSEO from "./sections/HoogwerkerSEO";
import HoogwerkerOpenMarkt from "./sections/HoogwerkerOpenMarkt";
import HoogwerkerCases from "./sections/HoogwerkerCases";
import HoogwerkerOtherMarkets from "./sections/HoogwerkerOtherMarkets";
import HoogwerkerMethodeCTA from "./sections/HoogwerkerMethodeCTA";

export default function HoogwerkerverhuurClient() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openContact = () => setPopupOpen(true);
  const closeContact = () => setPopupOpen(false);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header onContactClick={openContact} />

      <main>
        <HoogwerkerHero onContactClick={openContact} />
        <HoogwerkerExample onContactClick={openContact} />
        <HoogwerkerPrinciple />
        <HoogwerkerSEO />
        <HoogwerkerOpenMarkt onContactClick={openContact} />
        <HoogwerkerCases />
        <HoogwerkerOtherMarkets />
        <HoogwerkerMethodeCTA onContactClick={openContact} />
      </main>

      <Footer />
      <FloatingCTA onClick={openContact} />
      <ContactPopup isOpen={isPopupOpen} onClose={closeContact} />
    </>
  );
}
