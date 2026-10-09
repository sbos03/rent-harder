"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Slide6Mensenwerk.module.scss";
import { responsiveFontSize } from "@/app/components/Heading/Heading";

interface Props {
  content?: {
    eyebrow?: string;
    title?: string;
    headingLevel?: string;
    titleSizePx?: number;
    bottomText?: string;
    backgroundImage?: { url?: string } | null;
  };
}

export default function Slide6Mensenwerk({ content }: Props) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const eyebrow = content?.eyebrow || "VAN NEDERLAND TOT CURAÇAO.";
  const title = content?.title || "DIGITALISEREN IS|MENSENWERK.";
  const bottomText =
    content?.bottomText ||
    "GROTE KANS DAT ER MEER IN JOUW VERHUURBEDRIJF ZIT DAN JE NU LAAT ZIEN.";
  const bgImage = content?.backgroundImage?.url || "/images/afvalcontainer-2.jpg";

  const levelKey = ["h1", "h2", "h3"].includes(String(content?.headingLevel))
    ? (content?.headingLevel as "h1" | "h2" | "h3")
    : "h2";
  const MotionTitle = motion[levelKey];
  const titleStyle =
    typeof content?.titleSizePx === "number" && content.titleSizePx > 0
      ? { fontSize: responsiveFontSize(content.titleSizePx) }
      : undefined;

  return (
    <section ref={targetRef} className={styles.section}>
      <motion.div style={{ y }} className={styles.bgWrap}>
        <Image
          src={bgImage}
          alt="Truck at sunset"
          fill
          sizes="100vw"
          quality={85}
          className={styles.bgImage}
        />
        <div className={styles.overlayDark} />
        <div className={styles.overlayGradient} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className={styles.eyebrow}
      >
        <Image
          src="/images/Rent_Harder_beeldmerk.svg"
          alt=""
          width={24}
          height={24}
          className={styles.eyebrowIcon}
        />
        <span>{eyebrow}</span>
      </motion.div>

      <MotionTitle
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        viewport={{ once: true, margin: "-50px" }}
        className={styles.title}
        style={titleStyle}
      >
        {title.split("|").map((line, i) => (
          <span key={i}>{line.trim()}</span>
        ))}
      </MotionTitle>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className={styles.bottomText}
      >
        {bottomText}
      </motion.p>
    </section>
  );
}
