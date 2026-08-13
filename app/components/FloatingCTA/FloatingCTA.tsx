"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./FloatingCTA.module.scss";

interface FloatingCTAProps {
  onClick: () => void;
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} className={styles.button} aria-label="Harder verhuren? Neem contact op">
        <div className={styles.iconWrap}>
          <ArrowUpRight className={styles.icon} strokeWidth={3} />
        </div>
        <div className={styles.textWrap}>
          <span className={styles.text}>HARDER VERHUREN?</span>
        </div>
      </button>
    </div>
  );
}
