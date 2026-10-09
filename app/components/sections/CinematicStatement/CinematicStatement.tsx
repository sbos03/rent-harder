import React from "react";
import Image from "next/image";
import Heading from "@/app/components/Heading/Heading";
import styles from "./CinematicStatement.module.scss";

interface Props {
  content?: {
    title?: string;
    headingLevel?: string;
    titleSizePx?: number;
    body?: string;
    backgroundImage?: { url?: string; alt?: string } | null;
  };
}

export default function CinematicStatement({ content }: Props) {
  const title = content?.title || "MEER DAN ALLEEN|EEN PLATFORM.";
  const body =
    content?.body ||
    "Verhuur je machines, voertuigen of objecten? Dan zit er waarschijnlijk meer in jouw verhuurbedrijf dan je nu laat zien. RENT HARDER bouwt en ontwikkelt jouw complete digitale verhuurtak. Van verhuurplatform en planning tot zichtbaarheid, strategie en groei. Alles om harder te verhuren.";
  // Use the CMS background when set, fall back to the built-in image otherwise.
  const bgImage = content?.backgroundImage?.url || "/images/8.png";
  const words = body.split(" ");

  return (
    <section className={styles.section}>
      <div className={styles.bgWrap}>
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className={styles.bgImage}
          aria-hidden="true"
        />
        <div className={styles.overlayGradient} />
        <div className={styles.overlayColor} />
      </div>

      <div className={styles.content}>
        <Heading
          text={title}
          level={content?.headingLevel}
          sizePx={content?.titleSizePx}
          className={styles.title}
        />
        <p className={styles.textReveal}>
          {words.map((word, i) => (
            <span key={i} className={styles.word}>{word} </span>
          ))}
        </p>
      </div>
    </section>
  );
}
