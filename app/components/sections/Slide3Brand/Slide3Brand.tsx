"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Slide3Brand.module.scss";

interface Props {
  content?: {
    tagline?: string;
  };
}

export default function Slide3Brand({ content }: Props) {
  const tagline = content?.tagline?.replace(/\|/g, " ") || "DIGITAAL WAAR HET KAN. MENSELIJK WAAR HET MOET.";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fade out near the end, then reset cleanly
    const handleTimeUpdate = () => {
      const timeLeft = video.duration - video.currentTime;
      if (timeLeft < 1.5) {
        video.style.opacity = String(timeLeft / 1.5);
      } else {
        video.style.opacity = '1';
      }
    };

    const handleSeeked = () => {
      video.style.opacity = '1';
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  return (
    <section className={styles.section}>
      <video
        ref={videoRef}
        className={styles.bgVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/Shovel_RS.jpg"
      >
        <source src="/Hero_Rent_Harder.mp4" type="video/mp4" />
      </video>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <Image
          src="/images/Rent_Harder_beeldmerk.svg"
          alt=""
          width={24}
          height={24}
          className={styles.icon}
        />
        <span className={styles.tagline}>{tagline}</span>
      </div>
    </section>
  );
}
