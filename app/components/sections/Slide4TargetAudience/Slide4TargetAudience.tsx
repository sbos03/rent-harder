"use client";

import React from "react";
import Image from "next/image";
import styles from "./Slide4TargetAudience.module.scss";

interface Props {
  onContactClick: () => void;
}

export default function Slide4TargetAudience({ onContactClick }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.eyebrow}>
        <Image
          src="/images/Rent_Harder_beeldmerk.svg"
          alt=""
          width={24}
          height={24}
          className={styles.eyebrowIcon}
        />
        <span>GEBOUWD VOOR SPECIALISTISCHE VERHUUR.</span>
      </div>

      <h2 className={styles.title}>
        <span>VOOR VERHUURDERS</span>
        <span>VAN GROTE SPULLEN</span>
      </h2>

      <p className={styles.categories}>
        Hoogwerkers. Aggregaten. Opleggers. Pompen. Containers. Heftrucks.
        <br />
        Verreikers. Kranen. En waarschijnlijk nog veel meer.
      </p>

      <button onClick={onContactClick} className={styles.cta}>
        <div className={styles.ctaInner}>VOORBEELDEN ZIEN?</div>
      </button>
    </section>
  );
}
