"use client";

import React from "react";
import Link from "next/link";
import styles from "./Hoogwerker.module.scss";

interface Props {
  onContactClick: () => void;
  content?: any;
}

export default function HoogwerkerMethodeCTA({ onContactClick, content }: Props) {
  void content; // reserved for future CMS wiring; currently uses static copy
  return (
    <section className={styles.methodeCTASection}>
      <div className={styles.methodeCTAInner}>
        <span className={styles.sectionLabel}>DE RENT HARDER METHODE.</span>
        <h2 className={styles.methodeCTATitle}>
          VAN AMBITIE<br />NAAR HARDER VERHUREN.
        </h2>
        <p className={styles.methodeCTADesc}>
          We beginnen niet met techniek. We beginnen met waar jouw verhuurbedrijf
          naartoe moet.
        </p>
        <div className={styles.methodeCTAButtons}>
          <Link href="/#methode" className={styles.skewCtaOutline}>
            <div className={styles.skewCtaInner}>BEKIJK DE METHODE</div>
          </Link>
          <button onClick={onContactClick} className={styles.skewCta}>
            <div className={styles.skewCtaInner}>LAAT ZIEN WAT JE VERHUURT</div>
          </button>
        </div>
      </div>
    </section>
  );
}
