"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import styles from "./TVSection.module.scss";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Props {
  onContactClick: () => void;
  episodes?: any[] | null;
  content?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function TVSection({ onContactClick, episodes: cmsEpisodes, content }: Props) {
  const eyebrow = content?.eyebrow || "RENT HARDER.TV";
  const title = content?.title || "ECHTE MACHINES.|ECHTE ONDERNEMERS.|ECHTE GROEI.";
  const description =
    content?.description ||
    "Verhalen, inzichten en ideeën uit de wereld van verhuur. Op locatie, tussen het materieel en met de mensen die het iedere dag doen.";
  const ctaText = content?.ctaText || "BEKIJK ALLES OP RENT HARDER.TV";
  const handleCta = makeCtaHandler(content?.ctaLink, onContactClick);

  // Only show real episodes from the CMS. No hardcoded fallback: if there are
  // no episodes the whole section is hidden (see the null return below), so
  // Rent Harder TV stays offline until you actually add videos.
  const episodes = (cmsEpisodes || []).map((ep: any) => ({
    meta: ep.meta || '',
    title: ep.title || '',
    time: ep.duration || '',
    thumbnail: ep.thumbnail?.url || null,
  }));

  // Nothing to show yet → render nothing at all.
  if (episodes.length === 0) {
    return null;
  }

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
                src={ep.thumbnail || "/images/vertical-rectangle.png"}
                alt={ep.title}
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                quality={85}
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
        <button onClick={handleCta} className={styles.cta}>
          <div className={styles.ctaInner}>{ctaText}</div>
        </button>
      </div>
    </section>
  );
}
