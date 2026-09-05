"use client";

import React from "react";
import Image from "next/image";
import styles from "./Slide2Intro.module.scss";
import { withLineBreaks } from "@/app/lib/renderText";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Slide2IntroProps {
  onContactClick: () => void;
  content?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    image?: { url?: string; alt?: string } | null;
  };
}

export default function Slide2Intro({ onContactClick, content }: Slide2IntroProps) {
  const eyebrow = content?.eyebrow || "DE DIGITALE SIDEKICK ACHTER JOUW VERHUUR.";
  const title = content?.title || "BETER ZICHTBAAR.|SLIMMER GEREGELD.|STERKER GROEIEN.";
  const description =
    content?.description ||
    "Rent Harder helpt ambitieuze verhuurbedrijven digitaal sterker te worden. Zodat je beter zichtbaar bent, slimmer werkt en meer uit je verhuurbedrijf haalt.";
  const ctaText = content?.ctaText || "LAAT ZIEN WAT JE VERHUURT";
  const handleCta = makeCtaHandler(content?.ctaLink, onContactClick);
  const imageSrc = content?.image?.url || "/images/Bulldozer-verhuur.jpg";
  const imageAlt = content?.image?.alt || "Ambitieus verhuurbedrijf";

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
            <span>{eyebrow}</span>
          </div>

          <h2 className={styles.title}>{withLineBreaks(title)}</h2>

          <p className={styles.description}>{description}</p>

          <button onClick={handleCta} className={styles.cta}>
            <div className={styles.ctaInner}>{ctaText}</div>
          </button>
        </div>

        {/* Right Column */}
        <div className={styles.right}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={711}
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
