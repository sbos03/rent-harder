"use client";

import React from "react";
import Image from "next/image";
import styles from "./Slide4TargetAudience.module.scss";

interface Props {
  onContactClick: () => void;
  content?: {
    eyebrow?: string;
    title?: string;
    categories?: string;
    ctaText?: string;
  };
}

export default function Slide4TargetAudience({ onContactClick, content }: Props) {
  const eyebrow = content?.eyebrow || "GEBOUWD VOOR SPECIALISTISCHE VERHUUR.";
  const title = content?.title || "VOOR VERHUURDERS|VAN GROTE SPULLEN";
  const categories =
    content?.categories ||
    "Hoogwerkers. Aggregaten. Opleggers. Pompen. Containers. Heftrucks. Verreikers. Kranen. En waarschijnlijk nog veel meer.";
  const ctaText = content?.ctaText || "VOORBEELDEN ZIEN?";

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
        <span>{eyebrow}</span>
      </div>

      <h2 className={styles.title}>
        {title.split("|").map((line, i) => (
          <span key={i}>{line.trim()}</span>
        ))}
      </h2>

      <p className={styles.categories}>{categories}</p>

      <button onClick={onContactClick} className={styles.cta}>
        <div className={styles.ctaInner}>{ctaText}</div>
      </button>
    </section>
  );
}
