"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Slide6Mensenwerk.module.scss";

export default function Slide6Mensenwerk() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={targetRef} className={styles.section}>
      <motion.div style={{ y }} className={styles.bgWrap}>
        <Image
          src="/images/afvalcontainer-2.jpg"
          alt="Truck at sunset"
          fill
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
        <span>VAN NEDERLAND TOT CURAÇAO.</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
        viewport={{ once: true, margin: "-50px" }}
        className={styles.title}
      >
        <span>DIGITALISEREN IS</span>
        <span>MENSENWERK.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
        className={styles.bottomText}
      >
        GROTE KANS DAT ER MEER IN JOUW VERHUURBEDRIJF ZIT DAN JE NU LAAT ZIEN.
      </motion.p>
    </section>
  );
}
