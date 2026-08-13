"use client";

import React from "react";
import Image from "next/image";
import styles from "./Slide2Intro.module.scss";

interface Slide2IntroProps {
  onContactClick: () => void;
}

export default function Slide2Intro({ onContactClick }: Slide2IntroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {/* Left Column */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <Image
              src="/images/Rent_Harder_beeldmerk.svg"
              alt=""
              width={24}
              height={24}
              className={styles.eyebrowIcon}
            />
            <span>DE DIGITALE SIDEKICK ACHTER JOUW VERHUUR.</span>
          </div>

          <h2 className={styles.title}>
            BETER ZICHTBAAR.<br />
            SLIMMER GEREGELD.<br />
            STERKER GROEIEN.
          </h2>

          <p className={styles.description}>
            Rent Harder helpt ambitieuze verhuurbedrijven digitaal sterker te worden.
            Zodat je beter zichtbaar bent, slimmer werkt en meer uit je verhuurbedrijf haalt.
          </p>

          <button onClick={onContactClick} className={styles.cta}>
            <div className={styles.ctaInner}>LAAT ZIEN WAT JE VERHUURT</div>
          </button>
        </div>

        {/* Right Column */}
        <div className={styles.right}>
          <Image
            src="/images/Bulldozer-verhuur.jpg"
            alt="Ambitieus verhuurbedrijf"
            width={400}
            height={711}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
