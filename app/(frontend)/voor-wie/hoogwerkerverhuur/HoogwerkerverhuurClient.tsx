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

interface Props {
  cmsContent?: {
    sections: Record<string, any>;
    seo: any;
  } | null;
}

export default function HoogwerkerverhuurClient({ cmsContent }: Props) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openContact = () => setPopupOpen(true);
  const closeContact = () => setPopupOpen(false);

  const s = cmsContent?.sections || {};

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header onContactClick={openContact} />

      <main>
        <HoogwerkerHero onContactClick={openContact} content={s.heroSection} />
        <HoogwerkerExample onContactClick={openContact} content={s.caseExample} />
        <HoogwerkerPrinciple content={s.principleSteps} />
        <HoogwerkerSEO content={s.seoContent} />
        <HoogwerkerOpenMarkt onContactClick={openContact} content={s.ctaSection} />
        <HoogwerkerCases content={s.caseShowcase} />
        <HoogwerkerOtherMarkets content={s.otherMarkets} />
        <HoogwerkerMethodeCTA onContactClick={openContact} content={s.methodeCTA} />
      </main>

      <Footer />
      <FloatingCTA onClick={openContact} />
      <ContactPopup isOpen={isPopupOpen} onClose={closeContact} />
    </>
  );
}
