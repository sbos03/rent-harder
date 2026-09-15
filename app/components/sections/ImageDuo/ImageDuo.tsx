"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
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

function Figure({
  image,
  onOpen,
}: {
  image?: MediaImage | null;
  onOpen: (image: MediaImage) => void;
}) {
  if (!image?.url) return null;

  // Use the media's real dimensions so the image keeps its natural aspect
  // ratio and is never cropped. Fall back to a 4:3 guess only if the CMS did
  // not send dimensions (older uploads).
  const width = image.width || 1200;
  const height = image.height || 900;

  return (
    <button
      type="button"
      className={styles.figure}
      onClick={() => onOpen(image)}
      aria-label="Vergroot afbeelding"
    >
      <Image
        src={image.url}
        alt={image.alt || ""}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 700px"
        quality={85}
        className={styles.image}
      />
    </button>
  );
}

/**
 * Two images side by side, reusable on any page (e.g. extra photos in a case).
 * No header or CTA. Images keep their natural aspect ratio (not cropped) and
 * open in a lightbox when clicked.
 */
export default function ImageDuo({ content }: Props) {
  const left = content?.imageLeft;
  const right = content?.imageRight;
  const [active, setActive] = useState<MediaImage | null>(null);

  // Close the lightbox on Escape and lock body scroll while it is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  if (!left?.url && !right?.url) return null;

  const theme = content?.theme === "dark" ? styles.dark : styles.light;

  return (
    <section className={`${styles.section} ${theme}`}>
      <div className={styles.inner}>
        <Figure image={left} onOpen={setActive} />
        <Figure image={right} onOpen={setActive} />
      </div>

      {active?.url && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Vergrote afbeelding"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            aria-label="Sluiten"
            onClick={() => setActive(null)}
          >
            <X />
          </button>
          <div
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.url}
              alt={active.alt || ""}
              width={active.width || 1600}
              height={active.height || 1200}
              sizes="90vw"
              quality={90}
              className={styles.lightboxImage}
            />
          </div>
        </div>
      )}
    </section>
  );
}
