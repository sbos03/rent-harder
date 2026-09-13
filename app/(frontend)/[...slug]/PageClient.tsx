"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactPopup from "@/app/components/ContactPopup";
import FloatingCTA from "@/app/components/FloatingCTA";
import SectionRenderer from "@/app/components/SectionRenderer";

interface Props {
  page: any;
  settings?: any;
  episodes?: any[] | null;
}

/**
 * Renders a CMS page built from the `pages` collection: header, the ordered
 * list of section blocks (exactly like the homepage/partner pages), and footer.
 */
export default function PageClient({ page, settings, episodes }: Props) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openContact = () => setPopupOpen(true);
  const closeContact = () => setPopupOpen(false);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header onContactClick={openContact} settings={settings} />

      <main>
        <SectionRenderer
          sections={page?.sections || []}
          onContactClick={openContact}
          episodes={episodes}
        />
      </main>

      <Footer settings={settings} />
      <FloatingCTA onClick={openContact} />
      <ContactPopup isOpen={isPopupOpen} onClose={closeContact} settings={settings} />
    </>
  );
}
