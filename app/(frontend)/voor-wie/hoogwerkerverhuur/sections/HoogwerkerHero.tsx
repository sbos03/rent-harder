"use client";

import React from "react";
import Image from "next/image";
import styles from "./Hoogwerker.module.scss";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Props {
  onContactClick: () => void;
  content?: {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: { url?: string; alt?: string } | null;
  };
}

export default function HoogwerkerHero({ onContactClick, content }: Props) {
  const eyebrow = content?.eyebrow || "VOOR VERHUURDERS VAN HOOGWERKERS.";
  const title = content?.title || "HOOGWERKERS VERHUREN.|MAAR DAN HARDER.";
  const subtitle =
    content?.subtitle ||
    "Je materieel staat lokaal. Je klanten zoeken lokaal. Rent Harder helpt verhuurbedrijven om digitaal de logischste keuze te worden in hun regio.";
  const buttonText = content?.buttonText || "LAAT ZIEN WAT JE VERHUURT";
  const handleCta = makeCtaHandler(content?.buttonLink, onContactClick);
  const bgImage = content?.backgroundImage?.url || "/images/hoogwerker-hero.jpeg";
  const bgAlt = content?.backgroundImage?.alt || "Hoogwerkers Verhuren";

  return (
    <section className={styles.hero}>
      <div className={styles.heroBgWrap}>
        <Image
          src={bgImage}
          alt={bgAlt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className={styles.heroBgImage}
        />
        <div className={styles.heroGradientRight} />
        <div className={styles.heroGradientBottom} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.eyebrow}>
          <Image src="/images/Rent_Harder_beeldmerk.svg" alt="" width={24} height={24} className={styles.eyebrowIcon} />
          <span>{eyebrow}</span>
        </div>

        <h1 className={styles.heroTitle}>
          {title.split("|").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line.trim()}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        <p className={styles.heroDescription}>{subtitle}</p>

        <button onClick={handleCta} className={styles.skewCta}>
          <div className={styles.skewCtaInner}>{buttonText}</div>
        </button>
      </div>
    </section>
  );
}
