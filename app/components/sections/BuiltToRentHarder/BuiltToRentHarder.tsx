"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./BuiltToRentHarder.module.scss";
import { withLineBreaks } from "@/app/lib/renderText";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Props {
  onContactClick: () => void;
  content?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    cases?: {
      name?: string;
      featured?: boolean;
      image?: { url?: string } | null;
      link?: string;
      transformation?: { text?: string }[];
      points?: { text?: string }[];
    }[];
  };
  /** Partners from the Partners collection — take precedence over inline cases. */
  partners?: any[] | null;
}

export default function BuiltToRentHarder({ onContactClick, content, partners }: Props) {
  const eyebrow = content?.eyebrow || "BUILT TO RENT HARDER.";
  const title = content?.title || "GEEN MOOIE PRAATJES.|WEL BEWIJS.";
  const description =
    content?.description ||
    "Kijk wat er ontstaat wanneer ambitieuze verhuurbedrijven en Rent Harder naast elkaar gaan staan. Van scherpere positionering tot meer zichtbaarheid, betere focus en een sterkere digitale basis.";
  const ctaText = content?.ctaText || "MEER BUILDS";
  const handleCta = makeCtaHandler(content?.ctaLink, onContactClick);

  // Priority: 1) Partners collection, 2) inline cases in the block, 3) hardcoded defaults
  const cases =
    partners && partners.length > 0
      ? partners.map((p: any) => ({
          name: p.name || "",
          transformation: (p.transformation || []).map((t: any) => t.text || ""),
          points: (p.points || []).map((pt: any) => pt.text || ""),
          isFeatured: !!p.featured,
          image: p.cardImage?.url || "/images/example.jpg",
          link: p.slug ? `/partners/${p.slug}` : undefined,
        }))
      : content?.cases && content.cases.length > 0
      ? content.cases.map((c) => ({
          name: c.name || "",
          transformation: (c.transformation || []).map((t) => t.text || ""),
          points: (c.points || []).map((p) => p.text || ""),
          isFeatured: !!c.featured,
          image: c.image?.url || "/images/example.jpg",
          link: c.link || undefined,
        }))
      : [
          {
            name: "JH VERHUUR",
            transformation: ["VAN BREED VERHAAL", "NAAR EEN VERHUURTAK", "MET EIGEN FOCUS."],
            points: ["Eigen containerpropositie", "Duidelijkere doelgroep", "Betere lokale vindbaarheid", "Meer aanvragen"],
            isFeatured: true,
            image: "/images/example.jpg",
            link: undefined,
          },
          {
            name: "FLEXPUMPS",
            transformation: ["VAN POMPEN VERHUREN", "NAAR EEN MERK DAT", "NIEMAND MIST."],
            points: ["Sterke positionering", "Opvallende content", "Een digitale basis die net zo krachtig is als het materieel"],
            isFeatured: false,
            image: "/images/example.jpg",
            link: undefined,
          },
          {
            name: "MEIJER VERHUUR",
            transformation: ["VAN LOS MATERIEEL", "NAAR EEN DIGITALE", "VERHUURMACHINE."],
            points: ["Sneller online aanvragen", "Sterkere presentatie van materieel", "Meer grip op zichtbaarheid en aanvragen"],
            isFeatured: false,
            image: "/images/example.jpg",
            link: undefined,
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

        {/* Cases Grid: first card is always wide, the rest sit 2-across below */}
        <div className={styles.grid}>
          {cases.map((c, i) => (
            <a
              key={i}
              href={c.link || "#"}
              onClick={(e) => { if (!c.link) e.preventDefault(); }}
              className={`${styles.card} ${i === 0 ? styles.cardFeatured : ""}`}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className={styles.cardImage}
              />
              <div className={styles.cardGradient} />

              <div className={styles.cardContent}>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>CASE BUILD</span>
                  <h3 className={styles.cardName}>{c.name}</h3>
                  <p className={styles.cardTransformation}>
                    {c.transformation.map((line: string, idx: number) => (
                      <span key={idx}>{line}</span>
                    ))}
                  </p>
                  <ul className={styles.cardPoints}>
                    {c.points.map((p: string, idx: number) => (
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
          <button onClick={handleCta} className={styles.cta}>
            <div className={styles.ctaInner}>{ctaText}</div>
          </button>
        </div>
      </div>
    </section>
  );
}
