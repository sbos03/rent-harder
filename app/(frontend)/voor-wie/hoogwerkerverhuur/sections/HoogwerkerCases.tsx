import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./Hoogwerker.module.scss";

interface CaseItem {
  name?: string;
  image?: { url?: string; alt?: string } | null;
  transformation?: { text?: string }[];
  link?: string;
}

interface Props {
  content?: {
    eyebrow?: string;
    title?: string;
    cases?: CaseItem[];
  };
}

function lines(text?: string) {
  if (!text) return null;
  const parts = text.split("|");
  return parts.map((line, i) => (
    <React.Fragment key={i}>
      {line.trim()}
      {i < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}

// Fallback cards used only when the CMS block has no cases filled in, so the
// standalone hoogwerker page never renders an empty section.
const FALLBACK_CASES: CaseItem[] = [
  {
    name: "MEIJER VERHUUR",
    image: { url: "/images/meijerverhuur_hoogwerker-verhuur_veendam2.jpg", alt: "Meijer Verhuur" },
    transformation: [
      { text: "VAN LOKAAL MATERIEEL" },
      { text: "NAAR EEN STERKERE" },
      { text: "DIGITALE VERHUURPOSITIE." },
    ],
  },
  {
    name: "OCTO VERHUUR",
    image: { url: "/images/hoogwerker-octo2.jpeg", alt: "Octo Verhuur" },
    transformation: [
      { text: "VAN AUTOBEDRIJF" },
      { text: "NAAR SERIEUZE" },
      { text: "VERHUURTAK." },
    ],
  },
];

export default function HoogwerkerCases({ content }: Props) {
  const eyebrow = content?.eyebrow || "BUILT TO RENT HARDER.";
  const title = content?.title || "KIJK WAT ANDERE|VERHUURDERS BOUWEN.";
  const cases =
    content?.cases && content.cases.length > 0 ? content.cases : FALLBACK_CASES;

  return (
    <section className={styles.casesSection}>
      <div className={styles.casesInner}>
        <span className={styles.sectionLabel}>{eyebrow}</span>
        <h2 className={styles.sectionTitleWhite}>{lines(title)}</h2>

        <div className={styles.casesGrid}>
          {cases.map((c, i) => {
            const href = c.link || "#";
            const imgSrc = c.image?.url || "/images/example.jpg";
            const transformation = c.transformation || [];
            return (
              <a
                key={i}
                href={href}
                onClick={(e) => {
                  if (!c.link) e.preventDefault();
                }}
                className={styles.caseCard}
              >
                <Image
                  src={imgSrc}
                  alt={c.image?.alt || c.name || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  className={styles.caseCardImage}
                />
                <div className={styles.caseCardGradient} />
                <div className={styles.caseCardContent}>
                  <span className={styles.caseCardLabel}>CASE BUILD</span>
                  <h3 className={styles.caseCardName}>{c.name}</h3>
                  {transformation.length > 0 && (
                    <p className={styles.caseCardTransform}>
                      {transformation.map((t, j) => (
                        <span key={j}>{t.text}</span>
                      ))}
                    </p>
                  )}
                </div>
                <div className={styles.caseCardArrow}>
                  <ArrowRight className={styles.caseArrowIcon} strokeWidth={2.5} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
