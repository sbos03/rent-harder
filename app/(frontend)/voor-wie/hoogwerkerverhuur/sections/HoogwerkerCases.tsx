import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./Hoogwerker.module.scss";

interface Props {
  content?: any;
}

export default function HoogwerkerCases({ content }: Props) {
  void content; // reserved for future CMS wiring; currently uses static case cards
  return (
    <section className={styles.casesSection}>
      <div className={styles.casesInner}>
        <span className={styles.sectionLabel}>BUILT TO RENT HARDER.</span>
        <h2 className={styles.sectionTitleWhite}>
          KIJK WAT ANDERE<br />VERHUURDERS BOUWEN.
        </h2>

        <div className={styles.casesGrid}>
          <a href="#" onClick={(e) => e.preventDefault()} className={styles.caseCard}>
            <Image
              src="/images/meijerverhuur_hoogwerker-verhuur_veendam2.jpg"
              alt="Meijer Verhuur"
              fill
              className={styles.caseCardImage}
            />
            <div className={styles.caseCardGradient} />
            <div className={styles.caseCardContent}>
              <span className={styles.caseCardLabel}>CASE BUILD</span>
              <h3 className={styles.caseCardName}>MEIJER VERHUUR</h3>
              <p className={styles.caseCardTransform}>
                <span>VAN LOKAAL MATERIEEL</span>
                <span>NAAR EEN STERKERE</span>
                <span>DIGITALE VERHUURPOSITIE.</span>
              </p>
            </div>
            <div className={styles.caseCardArrow}>
              <ArrowRight className={styles.caseArrowIcon} strokeWidth={2.5} />
            </div>
          </a>

          <a href="#" onClick={(e) => e.preventDefault()} className={styles.caseCard}>
            <Image
              src="/images/hoogwerker-octo2.jpeg"
              alt="Octo Verhuur"
              fill
              className={styles.caseCardImage}
            />
            <div className={styles.caseCardGradient} />
            <div className={styles.caseCardContent}>
              <span className={styles.caseCardLabel}>CASE BUILD</span>
              <h3 className={styles.caseCardName}>OCTO VERHUUR</h3>
              <p className={styles.caseCardTransform}>
                <span>VAN AUTOBEDRIJF</span>
                <span>NAAR SERIEUZE</span>
                <span>VERHUURTAK.</span>
              </p>
            </div>
            <div className={styles.caseCardArrow}>
              <ArrowRight className={styles.caseArrowIcon} strokeWidth={2.5} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
