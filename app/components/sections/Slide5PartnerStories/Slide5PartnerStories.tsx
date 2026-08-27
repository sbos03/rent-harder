"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import styles from "./Slide5PartnerStories.module.scss";

interface Props {
  onContactClick: () => void;
  content?: {
    title?: string;
    description?: string;
    stories?: { name?: string }[];
    ctaText?: string;
  };
}

export default function Slide5PartnerStories({ onContactClick, content }: Props) {
  const title = content?.title || "HARDER VERHUREN.";
  const description =
    content?.description ||
    "Partners, geen klanten. We werken naast verhuurbedrijven om ze iedere dag een beetje zichtbaarder, slimmer en sterker te maken.";
  const ctaText = content?.ctaText || "MEER PARTNERVERHALEN";
  const stories =
    content?.stories && content.stories.length > 0
      ? content.stories.map((s) => ({ title: s.name || "" }))
      : [
          { title: "LEIDINGVERHUUR" },
          { title: "WATERPOMPOPLOSSINGEN" },
          { title: "AFVALCONTAINERS" },
          { title: "HEFTRUCKVERHUUR" },
        ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.grid}>
          {stories.map((story, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={styles.card}
            >
              <div className={styles.cardBg} />
              <div className={styles.cardGradient} />
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>PARTNERVERHAAL</span>
                <h3 className={styles.cardTitle}>{story.title}</h3>
                <p className={styles.cardDesc}>Lees hoe andere verhuurders groeien.</p>
              </div>
              <div className={styles.cardArrow}>
                <ArrowRight className={styles.arrowIcon} strokeWidth={2.5} />
              </div>
            </a>
          ))}
        </div>

        <button onClick={onContactClick} className={styles.cta}>
          <div className={styles.ctaInner}>{ctaText}</div>
        </button>
      </div>
    </section>
  );
}
