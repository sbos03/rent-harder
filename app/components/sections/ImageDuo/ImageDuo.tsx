import React from "react";
import Image from "next/image";
import styles from "./ImageDuo.module.scss";

interface MediaImage {
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface Props {
  content?: {
    imageLeft?: MediaImage | null;
    imageRight?: MediaImage | null;
    theme?: "light" | "dark";
  };
}

function Figure({ image }: { image?: MediaImage | null }) {
  if (!image?.url) return null;
  return (
    <div className={styles.figure}>
      <Image
        src={image.url}
        alt={image.alt || ""}
        fill
        // Each figure is full width on mobile, half the max-width container on
        // desktop. Telling Next this lets it serve a large enough source so the
        // image is not upscaled (which looked blurry with a fixed width={800}).
        sizes="(max-width: 768px) 100vw, 700px"
        quality={85}
        className={styles.image}
      />
    </div>
  );
}

/**
 * Two images side by side. Falls back to a single centred image if only one
 * is provided.
 */
export default function ImageDuo({ content }: Props) {
  const left = content?.imageLeft;
  const right = content?.imageRight;
  if (!left?.url && !right?.url) return null;

  const theme = content?.theme === "dark" ? styles.dark : styles.light;

  return (
    <section className={`${styles.section} ${theme}`}>
      <div className={styles.inner}>
        <Figure image={left} />
        <Figure image={right} />
      </div>
    </section>
  );
}
