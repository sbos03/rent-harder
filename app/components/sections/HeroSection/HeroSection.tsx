"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/app/components/Button";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
  onContactClick: () => void;
}

export default function HeroSection({ onContactClick }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <section className={styles.hero}>
      <motion.div style={{ y: y1, scale }} className={styles.bgWrap}>
        <Image
          src="/images/afvalcontainer-1.jpg"
          alt="Verhuurmachine in actie"
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.gradientOverlay} />
        <div className={styles.colorDodge} />
        <div className="cloud-layer" />
        <div className="dust-particles" />
      </motion.div>

      <motion.div style={{ opacity }} className={styles.content}>
        <h1 className={styles.title}>
          BUILD.<br />
          <span className={styles.titleOutline}>RENT.</span><br />
          GROW.
        </h1>
        <p className={styles.subtitle}>
          Voor ambitieuze ondernemers die machines, materieel en objecten verhuren.
        </p>
      </motion.div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomText}>
          Grote kans dat er meer in jouw verhuurbedrijf zit dan je nu laat zien.
        </div>
        <Button onClick={onContactClick} variant="outline">
          LAAT ZIEN WAT JE VERHUURT.
        </Button>
      </div>
    </section>
  );
}
