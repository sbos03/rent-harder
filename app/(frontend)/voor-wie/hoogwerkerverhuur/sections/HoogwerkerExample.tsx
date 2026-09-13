"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hoogwerker.module.scss";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Props {
  onContactClick: () => void;
  content?: {
    label?: string;
    title?: string;
    highlights?: { text?: string }[];
    description?: string;
    bulletPoints?: { text?: string }[];
    ctaText?: string;
    ctaLink?: string;
    image?: { url?: string; alt?: string } | null;
  };
}

export default function HoogwerkerExample({ onContactClick, content }: Props) {
  const label = content?.label || "BUILT TO RENT HARDER.";
  const title = content?.title || "ZO DOET|MEIJER VERHUUR DAT.";
  const highlights =
    content?.highlights && content.highlights.length > 0
      ? content.highlights.map((h) => h.text || "")
      : ["OOST-GRONINGEN.", "HOOGWERKERS.", "LOKALE FOCUS."];
  const description =
    content?.description ||
    "Meijer Verhuur hoeft niet heel Nederland te bedienen om digitaal succesvol te zijn. Juist door assortiment, regio en doelgroep scherp te presenteren ontstaat een veel sterkere lokale verhuurpositie.";
  const bulletPoints =
    content?.bulletPoints && content.bulletPoints.length > 0
      ? content.bulletPoints.map((b) => b.text || "")
      : ["LOKALE VINDBAARHEID.", "DUIDELIJK ASSORTIMENT.", "EEN EIGEN VERHUURPOSITIE."];
  const ctaText = content?.ctaText || "BEKIJK DE BUILD";
  const handleCta = makeCtaHandler(content?.ctaLink, onContactClick);
  const imageSrc = content?.image?.url || "/images/meijerverhuur_hoogwerker-verhuur_veendam2.jpg";
  const imageAlt = content?.image?.alt || "Meijer Verhuur Hoogwerkers";

  return (
    <section className={styles.exampleSection}>
      <div className={styles.exampleGrid}>
        {/* Text Column */}
        <div className={styles.exampleText}>
          <span className={styles.sectionLabel}>{label}</span>
          <h2 className={styles.sectionTitleWhite}>
            {title.split("|").map((line, i, arr) => (
              <React.Fragment key={i}>
                {line.trim()}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <div className={styles.exampleHighlights}>
            {highlights.map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>
          <p className={styles.sectionDesc}>{description}</p>
          <ul className={styles.bulletList}>
            {bulletPoints.map((b, i) => (
              <li key={i}><span className={styles.bulletDot} />{b}</li>
            ))}
          </ul>
          <button onClick={handleCta} className={styles.skewCta}>
            <div className={styles.skewCtaInner}>{ctaText}</div>
          </button>
        </div>

        {/* Image Column */}
        <div className={styles.exampleImageWrap}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1000}
            height={750}
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            className={styles.exampleImage}
          />
        </div>
      </div>
    </section>
  );
}
