"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import styles from "./TVSection.module.scss";

interface Props {
  onContactClick: () => void;
  episodes?: any[] | null;
  content?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaText?: string;
  };
}

export default function TVSection({ onContactClick, episodes: cmsEpisodes, content }: Props) {
  const eyebrow = content?.eyebrow || "RENT HARDER.TV";
  const title = content?.title || "ECHTE MACHINES.|ECHTE ONDERNEMERS.|ECHTE GROEI.";
  const description =
    content?.description ||
    "Verhalen, inzichten en ideeën uit de wereld van verhuur. Op locatie, tussen het materieel en met de mensen die het iedere dag doen.";
  const defaultEpisodes = [
    { meta: "RH.TV / 001 · DOCUMENTARY SHORT", title: "WAAR LIGT IN JOUW REGIO NOG EEN OPEN VERHUURMARKT?", time: "06:42" },
    { meta: "RH.TV / 002 · ON SITE", title: "HOE BOUW JE EEN VERHUURMERK DAT NIEMAND MIST?", time: "05:18" },
    { meta: "RH.TV / 003 · DOCUMENTARY SHORT", title: "MEER BEREIK MET VIDEO VAN JE MATERIEEL.", time: "04:37" },
    { meta: "RH.TV / 004 · HARDER TALK", title: "WAT MAAKT EEN VERHUURBEDRIJF KLAAR VOOR DE VOLGENDE GROEIFASE?", time: "08:24" },
  ];

  // Use CMS episodes if available, otherwise fall back to defaults
  const episodes = cmsEpisodes && cmsEpisodes.length > 0
    ? cmsEpisodes.map((ep: any) => ({
        meta: ep.meta || '',
        title: ep.title || '',
        time: ep.duration || '',
        thumbnail: ep.thumbnail?.url || null,
      }))
    : defaultEpisodes;

  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.title}>
            {title.split("|").map((line, i, arr) => (
              <React.Fragment key={i}>
                {line.trim()}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className={styles.description}>{description}</p>
        </motion.div>
      </div>

      <div className={styles.reel}>
        <div className={styles.reelInner}>
          {episodes.map((ep, i) => (
            <motion.a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className={styles.card}
            >
              <Image
                src="/images/vertical-rectangle.png"
                alt={ep.title}
                fill
                className={styles.cardImage}
              />
              <div className={styles.cardGradient} />

              <div className={styles.cardContent}>
                <div className={styles.cardTextWrap}>
                  <p className={styles.cardMeta}>{ep.meta}</p>
                  <h3 className={styles.cardTitle}>{ep.title}</h3>
                </div>

                <div className={styles.cardBottom}>
                  <span className={styles.cardTime}>
                    <Play className={styles.playIcon} fill="currentColor" /> {ep.time}
                  </span>
                  <span className={styles.cardAction}>BEKIJK AFLEVERING</span>
                </div>
              </div>
            </motion.a>
          ))}
          <div className={styles.reelSpacer} />
        </div>
      </div>

      <div className={styles.ctaWrap}>
        <button onClick={onContactClick} className={styles.cta}>
          <div className={styles.ctaInner}>BEKIJK ALLES OP RENT HARDER.TV</div>
        </button>
      </div>
    </section>
  );
}
