"use client";

import React from "react";
import styles from "./Hoogwerker.module.scss";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Props {
  onContactClick: () => void;
  content?: {
    heading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
  };
}

export default function HoogwerkerOpenMarkt({ onContactClick, content }: Props) {
  const heading = content?.heading || "WAAR LIGT JOUW|OPEN VERHUURMARKT?";
  const description =
    content?.description ||
    "Misschien staat de volgende groeimarkt niet honderd kilometer verderop, maar gewoon drie plaatsen naast je.";
  const buttonText = content?.buttonText || "LAAT ONS MEEKIJKEN";
  const handleCta = makeCtaHandler(content?.buttonLink, onContactClick);

  return (
    <section className={styles.openMarktSection}>
      <div className={styles.openMarktInner}>
        <span className={`${styles.sectionLabel} ${styles.sunset}`}>WAAR LIGT DE KANS?</span>
        <h2 className={styles.sectionTitleWhite}>
          {heading.split("|").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line.trim()}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p className={styles.openMarktDesc}>{description}</p>
        <button onClick={handleCta} className={styles.skewCta}>
          <div className={styles.skewCtaInner}>{buttonText}</div>
        </button>
      </div>
    </section>
  );
}
