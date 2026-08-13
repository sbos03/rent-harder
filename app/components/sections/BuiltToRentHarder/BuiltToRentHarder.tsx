"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./BuiltToRentHarder.module.scss";

interface Props {
  onContactClick: () => void;
}

export default function BuiltToRentHarder({ onContactClick }: Props) {
  const cases = [
    {
      name: "JH VERHUUR",
      transformation: ["VAN BREED VERHAAL", "NAAR EEN VERHUURTAK", "MET EIGEN FOCUS."],
      points: ["Eigen containerpropositie", "Duidelijkere doelgroep", "Betere lokale vindbaarheid", "Meer aanvragen"],
      isFeatured: true,
    },
    {
      name: "FLEXPUMPS",
      transformation: ["VAN POMPEN VERHUREN", "NAAR EEN MERK DAT", "NIEMAND MIST."],
      points: ["Sterke positionering", "Opvallende content", "Een digitale basis die net zo krachtig is als het materieel"],
      isFeatured: false,
    },
    {
      name: "MEIJER VERHUUR",
      transformation: ["VAN LOS MATERIEEL", "NAAR EEN DIGITALE", "VERHUURMACHINE."],
      points: ["Sneller online aanvragen", "Sterkere presentatie van materieel", "Meer grip op zichtbaarheid en aanvragen"],
      isFeatured: false,
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
            <span>BUILT TO RENT HARDER.</span>
          </div>
          <h2 className={styles.title}>
            GEEN MOOIE PRAATJES.<br />WEL BEWIJS.
          </h2>
          <p className={styles.description}>
            Kijk wat er ontstaat wanneer ambitieuze verhuurbedrijven en Rent Harder
            naast elkaar gaan staan. Van scherpere positionering tot meer
            zichtbaarheid, betere focus en een sterkere digitale basis.
          </p>
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
                src="/images/example.jpg"
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
            <div className={styles.ctaInner}>MEER BUILDS</div>
          </button>
        </div>
      </div>
    </section>
  );
}
