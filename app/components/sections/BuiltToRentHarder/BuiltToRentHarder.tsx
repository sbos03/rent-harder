"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./BuiltToRentHarder.module.scss";
import { withLineBreaks } from "@/app/lib/renderText";

interface Props {
  onContactClick: () => void;
  content?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    cases?: {
      name?: string;
      featured?: boolean;
      image?: { url?: string } | null;
      transformation?: { text?: string }[];
      points?: { text?: string }[];
    }[];
  };
}

export default function BuiltToRentHarder({ onContactClick, content }: Props) {
  const eyebrow = content?.eyebrow || "BUILT TO RENT HARDER.";
  const title = content?.title || "GEEN MOOIE PRAATJES.|WEL BEWIJS.";
  const description =
    content?.description ||
    "Kijk wat er ontstaat wanneer ambitieuze verhuurbedrijven en Rent Harder naast elkaar gaan staan. Van scherpere positionering tot meer zichtbaarheid, betere focus en een sterkere digitale basis.";
  const ctaText = content?.ctaText || "MEER BUILDS";

  const cases =
    content?.cases && content.cases.length > 0
      ? content.cases.map((c) => ({
          name: c.name || "",
          transformation: (c.transformation || []).map((t) => t.text || ""),
          points: (c.points || []).map((p) => p.text || ""),
          isFeatured: !!c.featured,
          image: c.image?.url || "/images/example.jpg",
        }))
      : [
          {
            name: "JH VERHUUR",
            transformation: ["VAN BREED VERHAAL", "NAAR EEN VERHUURTAK", "MET EIGEN FOCUS."],
            points: ["Eigen containerpropositie", "Duidelijkere doelgroep", "Betere lokale vindbaarheid", "Meer aanvragen"],
            isFeatured: true,
            image: "/images/example.jpg",
          },
          {
            name: "FLEXPUMPS",
            transformation: ["VAN POMPEN VERHUREN", "NAAR EEN MERK DAT", "NIEMAND MIST."],
            points: ["Sterke positionering", "Opvallende content", "Een digitale basis die net zo krachtig is als het materieel"],
            isFeatured: false,
            image: "/images/example.jpg",
          },
          {
            name: "MEIJER VERHUUR",
            transformation: ["VAN LOS MATERIEEL", "NAAR EEN DIGITALE", "VERHUURMACHINE."],
            points: ["Sneller online aanvragen", "Sterkere presentatie van materieel", "Meer grip op zichtbaarheid en aanvragen"],
            isFeatured: false,
            image: "/images/example.jpg",
          },
        ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {/* Intro */}
        <div className={styles.intro}>
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
        </div>

        {/* Cases Grid */}
        <div className={styles.grid}>
          {cases.map((c, i) => (
            <a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`${styles.card} ${c.isFeatured ? styles.cardFeatured : ""}`}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                className={styles.cardImage}
              />
              <div className={styles.cardGradient} />

              <div className={styles.cardContent}>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>CASE BUILD</span>
                  <h3 className={styles.cardName}>{c.name}</h3>
                  <p className={styles.cardTransformation}>
                    {c.transformation.map((line, idx) => (
                      <span key={idx}>{line}</span>
                    ))}
                  </p>
                  <ul className={styles.cardPoints}>
                    {c.points.map((p, idx) => (
                      <li key={idx}>
                        <span className={styles.pointDot} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.cardAction}>
                <span className={styles.cardActionText}>BEKIJK DE BUILD</span>
                <div className={styles.cardArrow}>
                  <ArrowRight className={styles.arrowIcon} strokeWidth={2.5} />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <button onClick={onContactClick} className={styles.cta}>
            <div className={styles.ctaInner}>{ctaText}</div>
          </button>
        </div>
      </div>
    </section>
  );
}
