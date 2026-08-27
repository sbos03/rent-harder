"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactPopup from "@/app/components/ContactPopup";
import FloatingCTA from "@/app/components/FloatingCTA";
import {
  HeroSection,
  Slide2Intro,
  Slide3Brand,
  Slide4TargetAudience,
  Slide5PartnerStories,
  Slide6Mensenwerk,
  CinematicStatement,
  TVSection,
  MethodRoadmap,
  BuiltToRentHarder,
} from "@/app/components/sections";

export interface CMSContent {
  sections: Record<string, any>;
  seo: any;
  partners: any[];
  episodes: any[];
  settings: any;
}

interface Props {
  cmsContent?: CMSContent | null;
}

export default function HomeClient({ cmsContent }: Props) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openContact = () => setPopupOpen(true);
  const closeContact = () => setPopupOpen(false);

  const s = cmsContent?.sections || {};
  const episodes = cmsContent?.episodes || null;
  const settings = cmsContent?.settings || null;

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header onContactClick={openContact} settings={settings} />

      <main>
        <HeroSection onContactClick={openContact} content={s.heroSection} />
        <div id="wat-we-bouwen">
          <Slide2Intro onContactClick={openContact} content={s.introSection} />
        </div>
        <Slide3Brand content={s.brandStatement} />
        <div id="voor-wie">
          <Slide4TargetAudience onContactClick={openContact} content={s.targetAudience} />
        </div>
        <Slide5PartnerStories onContactClick={openContact} content={s.partnerStories} />
        <Slide6Mensenwerk content={s.fullscreenStatement} />
        <CinematicStatement content={s.cinematicStatement} />
        <div id="rent-harder-tv">
          <TVSection onContactClick={openContact} content={s.tvSection} episodes={episodes} />
        </div>
        <div id="methode">
          <MethodRoadmap content={s.methodRoadmap} />
        </div>
        <div id="built-to-rent-harder">
          <BuiltToRentHarder onContactClick={openContact} content={s.caseShowcase} />
        </div>
      </main>

      <Footer settings={settings} />
      <FloatingCTA onClick={openContact} />
      <ContactPopup isOpen={isPopupOpen} onClose={closeContact} settings={settings} />
    </>
  );
}
