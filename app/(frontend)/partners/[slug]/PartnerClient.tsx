"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactPopup from "@/app/components/ContactPopup";
import FloatingCTA from "@/app/components/FloatingCTA";
import SectionRenderer from "@/app/components/SectionRenderer";
import styles from "./PartnerPage.module.scss";

interface Props {
  partner: any;
}

export default function PartnerClient({ partner }: Props) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openContact = () => setPopupOpen(true);
  const closeContact = () => setPopupOpen(false);

  const introTitle: string = partner?.introTitle || partner?.name || "";
  const introImage = partner?.introImage?.url || null;

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Header onContactClick={openContact} />

      <main>
        {/* Intro */}
        <section className={styles.intro}>
          {introImage && (
            <div className={styles.introBgWrap}>
              <Image
                src={introImage}
                alt={partner?.introImage?.alt || partner?.name || ""}
                fill
                priority
                className={styles.introBg}
              />
              <div className={styles.introOverlay} />
            </div>
          )}
          <div className={styles.introContent}>
            {partner?.introEyebrow && (
              <span className={styles.introEyebrow}>{partner.introEyebrow}</span>
            )}
            <h1 className={styles.introTitle}>
              {introTitle.split("|").map((line: string, i: number, arr: string[]) => (
                <React.Fragment key={i}>
                  {line.trim()}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            {partner?.introDescription && (
              <p className={styles.introDescription}>{partner.introDescription}</p>
            )}
          </div>
        </section>

        {/* Sections (built like the homepage) */}
        <SectionRenderer sections={partner?.sections || []} onContactClick={openContact} />
      </main>

      <Footer />
      <FloatingCTA onClick={openContact} />
      <ContactPopup isOpen={isPopupOpen} onClose={closeContact} />
    </>
  );
}
