"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/app/components/Button";
import styles from "./HeroSection.module.scss";
import { responsiveFontSize } from "@/app/components/Heading/Heading";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface HeroSectionProps {
  onContactClick: () => void;
  content?: {
    title?: string;
    headingLevel?: string;
    titleSizePx?: number;
    preserveCase?: boolean;
    subtitle?: string;
    bottomText?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: { url?: string } | null;
  };
}

export default function HeroSection({ onContactClick, content }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  const title = content?.title || "BUILD.|RENT.|GROW.";
  const subtitle =
    content?.subtitle ||
    "Voor ambitieuze ondernemers die machines, materieel en objecten verhuren.";
  const bottomText =
    content?.bottomText ||
    "Grote kans dat er meer in jouw verhuurbedrijf zit dan je nu laat zien.";
  const buttonText = content?.buttonText || "LAAT ZIEN WAT JE VERHUURT.";
  const handleCta = makeCtaHandler(content?.buttonLink, onContactClick);
  const bgImage = content?.backgroundImage?.url || "/images/afvalcontainer-1.jpg";

  const titleLines = title.split("|");

  // CMS-controlled semantic tag (default h1 for the hero) and optional size.
  const TitleTag = (["h1", "h2", "h3"].includes(String(content?.headingLevel))
    ? content?.headingLevel
    : "h1") as "h1" | "h2" | "h3";
  const hasHeroSize =
    typeof content?.titleSizePx === "number" && content.titleSizePx > 0;
  // Title renders exactly as typed (overrides the SCSS uppercase).
  const titleStyle: React.CSSProperties = {
    textTransform: "none",
    ...(hasHeroSize ? { fontSize: responsiveFontSize(content!.titleSizePx as number) } : {}),
  };

  return (
    <section className={styles.hero}>
      <motion.div style={{ y: y1, scale }} className={styles.bgWrap}>
        <Image
          src={bgImage}
          alt="Verhuurmachine in actie"
          fill
          priority
          sizes="100vw"
          quality={85}
          className={styles.bgImage}
        />
        <div className={styles.gradientOverlay} />
        <div className={styles.colorDodge} />
        <div className="cloud-layer" />
        <div className="dust-particles" />
      </motion.div>

      <motion.div style={{ opacity }} className={styles.content}>
        <TitleTag className={styles.title} style={titleStyle}>
          {titleLines.map((line, i) => {
            // Middle line gets the outline style (matches original "RENT." styling)
            const isMiddle = titleLines.length === 3 && i === 1;
            return (
              <React.Fragment key={i}>
                {isMiddle ? (
                  <span className={styles.titleOutline}>{line.trim()}</span>
                ) : (
                  line.trim()
                )}
                {i < titleLines.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </TitleTag>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomText}>{bottomText}</div>
        <Button onClick={handleCta} variant="outline">
          {buttonText}
        </Button>
      </div>
    </section>
  );
}
