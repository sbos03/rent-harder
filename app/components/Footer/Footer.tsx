import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from "@/app/components/SocialIcons";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.noiseOverlay}>
        <div className="noise-overlay" />
      </div>
      <div className={styles.gradientOverlay} />

      <div className={styles.inner}>
        {/* LAYER 1: Brand + Nav */}
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <p className={styles.brandText}>
              Jij verhuurt het materieel.
            </p>
            <p className={`${styles.brandText} ${styles.brandBold}`}>
              Wij bouwen de digitale verhuurtak erachter.
            </p>
          </div>

          <div className={styles.navGrid}>
            <div>
              <h4 className={styles.navTitle}>Ontdek</h4>
              <ul className={styles.navList}>
                <li><Link href="/#wat-we-bouwen" className={styles.navLink}>Wat we bouwen</Link></li>
                <li><Link href="/#methode" className={styles.navLink}>De Rent Harder Methode</Link></li>
                <li><Link href="/#built-to-rent-harder" className={styles.navLink}>Built to Rent Harder</Link></li>
                <li><Link href="/#rent-harder-tv" className={styles.navLink}>Rent Harder.tv</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={styles.navTitle}>Contact</h4>
              <ul className={styles.contactList}>
                <li>0599 253 032</li>
                <li>contact@rentharder.nl</li>
                <li>WhatsApp</li>
                <li>Ter Apel</li>
              </ul>
            </div>
          </div>
        </div>

        {/* LAYER 2: Socials */}
        <div className={styles.socialsWrap}>
          <h4 className={styles.socialsTitle}>Volg Rent Harder.</h4>
          <div className={styles.socialsIcons}>
            <LinkedinIcon className={styles.socialIcon} />
            <InstagramIcon className={styles.socialIcon} />
            <YoutubeIcon className={styles.socialIcon} />
          </div>
        </div>

        {/* LAYER 3: Big Logo */}
        <div className={styles.logoWrap}>
          <Image
            src="/images/rentharder.png"
            alt="RENT HARDER"
            width={1200}
            height={200}
            className={styles.bigLogo}
          />
        </div>

        {/* LAYER 4: Legal */}
        <div className={styles.legal}>
          <span>&copy; 2026 RENT HARDER.</span>
          <Link href="/privacy" className={styles.legalLink}>Privacy</Link>
          <Link href="/voorwaarden" className={styles.legalLink}>Algemene voorwaarden</Link>
        </div>
      </div>
    </footer>
  );
}
