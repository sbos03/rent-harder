"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactPopup from "@/app/components/ContactPopup";
import FloatingCTA from "@/app/components/FloatingCTA";
import SectionRenderer from "@/app/components/SectionRenderer";

export interface CMSContent {
  sections: any[];
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

  const sections = Array.isArray(cmsContent?.sections) ? cmsContent!.sections : [];
  const episodes = cmsContent?.episodes || null;
  const partners = cmsContent?.partners || null;
  const settings = cmsContent?.settings || null;

  // Preserve the homepage's legacy #anchor targets that the header/footer nav
  // link to. Applied to the first block of each type when it has no explicit
  // anchor set in the CMS. An editor can still override via the block's anchor.
  const defaultAnchors: Record<string, string> = {
    introSection: "wat-we-bouwen",
    targetAudience: "voor-wie",
    tvSection: "rent-harder-tv",
    methodRoadmap: "methode",
    caseShowcase: "built-to-rent-harder",
  };

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header onContactClick={openContact} settings={settings} />

      <main>
        <SectionRenderer
          sections={sections}
          onContactClick={openContact}
          episodes={episodes}
          partners={partners}
          defaultAnchors={defaultAnchors}
        />
      </main>

      <Footer settings={settings} />
      <FloatingCTA onClick={openContact} />
      <ContactPopup isOpen={isPopupOpen} onClose={closeContact} settings={settings} />
    </>
  );
}
