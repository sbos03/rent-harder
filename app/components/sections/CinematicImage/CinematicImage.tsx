import React from "react";
import Image from "next/image";
import styles from "./CinematicImage.module.scss";

interface Props {
  content?: {
    image?: { url?: string; alt?: string } | null;
    alt?: string;
  };
}

/**
 * "Sfeerbeeld" — a single full-width atmospheric image. Renders nothing when
 * no image is set, so an empty block never leaves a blank gap.
 */
export default function CinematicImage({ content }: Props) {
  const url = content?.image?.url;
  if (!url) return null;

  const alt = content?.alt || content?.image?.alt || "";

  return (
    <section className={styles.section}>
      <div className={styles.imageWrap}>
        <Image
          src={url}
          alt={alt}
          fill
          sizes="100vw"
          quality={85}
          className={styles.image}
        />
      </div>
    </section>
  );
}
