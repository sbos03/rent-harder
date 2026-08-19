"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hoogwerker.module.scss";

interface Props {
  onContactClick: () => void;
}

export default function HoogwerkerHero({ onContactClick }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBgWrap}>
        <Image
          src="/images/hoogwerker-hero.jpeg"
          alt="Hoogwerkers Verhuren"
          fill
          priority
          className={styles.heroBgImage}
        />
        <div className={styles.heroGradientRight} />
        <div className={styles.heroGradientBottom} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>
          <Image src="/images/Rent_Harder_beeldmerk.svg" alt="" width={24} height={24} className={styles.eyebrowIcon} />
          <span>VOOR VERHUURDERS VAN HOOGWERKERS.</span>
        </div>

        <h1 className={styles.heroTitle}>
          HOOGWERKERS VERHUREN.<br />MAAR DAN HARDER.
        </h1>

        <p className={styles.heroDescription}>
          Je materieel staat lokaal. Je klanten zoeken lokaal. Rent Harder helpt
          verhuurbedrijven om digitaal de logischste keuze te worden in hun regio.
        </p>

        <button onClick={onContactClick} className={styles.skewCta}>
          <div className={styles.skewCtaInner}>LAAT ZIEN WAT JE VERHUURT</div>
        </button>
      </div>
    </section>
  );
}
