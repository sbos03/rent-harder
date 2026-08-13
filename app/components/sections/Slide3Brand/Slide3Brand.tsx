import React from "react";
import Image from "next/image";
import styles from "./Slide3Brand.module.scss";

export default function Slide3Brand() {
  return (
    <section className={styles.section}>
      <Image
        src="/images/Shovel_RS.jpg"
        alt="Digitaal waar het kan, menselijk waar het moet"
        fill
        className={styles.bgImage}
      />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <Image
          src="/images/Rent_Harder_beeldmerk.svg"
          alt=""
          width={24}
          height={24}
          className={styles.icon}
        />
        <span className={styles.tagline}>
          DIGITAAL WAAR HET KAN. MENSELIJK WAAR HET MOET.
        </span>
      </div>
    </section>
  );
}
