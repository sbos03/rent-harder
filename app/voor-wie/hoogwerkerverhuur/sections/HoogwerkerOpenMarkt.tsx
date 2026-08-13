"use client";

import React from "react";
import styles from "./Hoogwerker.module.scss";

interface Props {
  onContactClick: () => void;
}

export default function HoogwerkerOpenMarkt({ onContactClick }: Props) {
  return (
    <section className={styles.openMarktSection}>
      <div className={styles.openMarktInner}>
        <span className={`${styles.sectionLabel} ${styles.sunset}`}>WAAR LIGT DE KANS?</span>
        <h2 className={styles.sectionTitleWhite}>
          WAAR LIGT JOUW<br />OPEN VERHUURMARKT?
        </h2>
        <p className={styles.openMarktDesc}>
          Misschien staat de volgende groeimarkt niet honderd kilometer verderop,
          maar gewoon drie plaatsen naast je.
        </p>
        <button onClick={onContactClick} className={styles.skewCta}>
          <div className={styles.skewCtaInner}>LAAT ONS MEEKIJKEN</div>
        </button>
      </div>
    </section>
  );
}
