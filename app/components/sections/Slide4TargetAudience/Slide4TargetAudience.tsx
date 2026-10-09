"use client";

import React from "react";
import Image from "next/image";
import styles from "./Slide4TargetAudience.module.scss";
import { responsiveFontSize } from "@/app/components/Heading/Heading";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Props {
  onContactClick: () => void;
  content?: {
    eyebrow?: string;
    title?: string;
    headingLevel?: string;
    titleSizePx?: number;
    preserveCase?: boolean;
    categories?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function Slide4TargetAudience({ onContactClick, content }: Props) {
  const eyebrow = content?.eyebrow || "GEBOUWD VOOR SPECIALISTISCHE VERHUUR.";
  const title = content?.title || "VOOR VERHUURDERS|VAN GROTE SPULLEN";
  const categories =
    content?.categories ||
    "Hoogwerkers. Aggregaten. Opleggers. Pompen. Containers. Heftrucks. Verreikers. Kranen. En waarschijnlijk nog veel meer.";
  const ctaText = content?.ctaText || "VOORBEELDEN ZIEN?";
  const handleCta = makeCtaHandler(content?.ctaLink, onContactClick);

  const TitleTag = (["h1", "h2", "h3"].includes(String(content?.headingLevel))
    ? content?.headingLevel
    : "h2") as "h1" | "h2" | "h3";
  const hasSize =
    typeof content?.titleSizePx === "number" && content.titleSizePx > 0;
  // Title renders exactly as typed (overrides the SCSS uppercase).
  const titleStyle: React.CSSProperties = {
    textTransform: "none",
    ...(hasSize ? { fontSize: responsiveFontSize(content!.titleSizePx as number) } : {}),
  };

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

      <TitleTag className={styles.title} style={titleStyle}>
        {title.split("|").map((line, i) => (
          <span key={i}>{line.trim()}</span>
        ))}
      </TitleTag>

      <p className={styles.categories}>{categories}</p>

      <button onClick={handleCta} className={styles.cta}>
        <div className={styles.ctaInner}>{ctaText}</div>
      </button>
    </section>
  );
}
