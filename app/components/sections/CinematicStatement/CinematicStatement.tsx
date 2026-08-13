import React from "react";
import Image from "next/image";
import styles from "./CinematicStatement.module.scss";

export default function CinematicStatement() {
  const words =
    "Verhuur je machines, voertuigen of objecten? Dan zit er waarschijnlijk meer in jouw verhuurbedrijf dan je nu laat zien. RENT HARDER bouwt en ontwikkelt jouw complete digitale verhuurtak. Van verhuurplatform en planning tot zichtbaarheid, strategie en groei. Alles om harder te verhuren.".split(
      " "
    );

  return (
    <section className={styles.section}>
      <div className={styles.bgWrap}>
        <Image
          src="/images/8.png"
          alt=""
          fill
          className={styles.bgImage}
          aria-hidden="true"
        />
        <div className={styles.overlayGradient} />
        <div className={styles.overlayColor} />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          MEER DAN ALLEEN<br />EEN PLATFORM.
        </h2>
        <p className={styles.textReveal}>
          {words.map((word, i) => (
            <span key={i} className={styles.word}>{word} </span>
          ))}
        </p>
      </div>
    </section>
  );
}
