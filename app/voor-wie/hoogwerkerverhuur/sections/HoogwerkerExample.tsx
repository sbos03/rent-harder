"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hoogwerker.module.scss";

interface Props {
  onContactClick: () => void;
}

export default function HoogwerkerExample({ onContactClick }: Props) {
  return (
    <section className={styles.exampleSection}>
      <div className={styles.exampleGrid}>
        {/* Text Column */}
        <div className={styles.exampleText}>
          <span className={styles.sectionLabel}>BUILT TO RENT HARDER.</span>
          <h2 className={styles.sectionTitle}>ZO DOET<br />MEIJER VERHUUR DAT.</h2>
          <div className={styles.exampleHighlights}>
            <span>OOST-GRONINGEN.</span>
            <span>HOOGWERKERS.</span>
            <span>LOKALE FOCUS.</span>
          </div>
          <p className={styles.sectionDesc}>
            Meijer Verhuur hoeft niet heel Nederland te bedienen om digitaal
            succesvol te zijn. Juist door assortiment, regio en doelgroep scherp
            te presenteren ontstaat een veel sterkere lokale verhuurpositie.
          </p>
          <ul className={styles.bulletList}>
            <li><span className={styles.bulletDot} />LOKALE VINDBAARHEID.</li>
            <li><span className={styles.bulletDot} />DUIDELIJK ASSORTIMENT.</li>
            <li><span className={styles.bulletDot} />EEN EIGEN VERHUURPOSITIE.</li>
          </ul>
          <button onClick={onContactClick} className={styles.skewCta}>
            <div className={styles.skewCtaInner}>BEKIJK DE BUILD</div>
          </button>
        </div>

        {/* Image Column */}
        <div className={styles.exampleImageWrap}>
          <Image
            src="/images/meijerverhuur_hoogwerker-verhuur_veendam2.jpg"
            alt="Meijer Verhuur Hoogwerkers"
            width={800}
            height={600}
            className={styles.exampleImage}
          />
        </div>
      </div>
    </section>
  );
}
