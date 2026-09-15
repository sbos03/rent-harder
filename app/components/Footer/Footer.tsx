import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from "@/app/components/SocialIcons";
import { normalizeInternalHref } from "@/app/lib/href";
import styles from "./Footer.module.scss";

interface FooterProps {
  settings?: any;
}

interface FooterLink {
  label: string;
  href?: string | null;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FALLBACK_COLUMNS: FooterColumn[] = [
  {
    title: "Ontdek",
    links: [
      { label: "Wat we bouwen", href: "/#wat-we-bouwen" },
      { label: "De Rent Harder Methode", href: "/#methode" },
      { label: "Built to Rent Harder", href: "/#built-to-rent-harder" },
      { label: "Rent Harder.tv", href: "/#rent-harder-tv" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "0599 253 032" },
      { label: "contact@rentharder.nl" },
      { label: "WhatsApp" },
      { label: "Ter Apel" },
    ],
  },
];

const FALLBACK_LEGAL: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Algemene voorwaarden", href: "/voorwaarden" },
];

export default function Footer({ settings }: FooterProps = {}) {
  const brandLine1 = settings?.footerBrandLine1 || "Jij verhuurt het materieel.";
  const brandLine2 = settings?.footerBrandLine2 || "Wij bouwen de digitale verhuurtak erachter.";
  const socialsTitle = settings?.footerSocialsTitle || "Volg Rent Harder.";
  const copyright = settings?.footerCopyright || "© 2026 RENT HARDER.";

  // Footer columns: prefer CMS, fall back to hardcoded.
  const columns: FooterColumn[] =
    Array.isArray(settings?.footerColumns) && settings.footerColumns.length > 0
      ? settings.footerColumns.map((col: any) => ({
          title: col?.title || "",
          links: Array.isArray(col?.links)
            ? col.links.filter((l: any) => l?.label).map((l: any) => ({ label: l.label, href: l.href }))
            : [],
        }))
      : FALLBACK_COLUMNS;

  const legalLinks: FooterLink[] =
    Array.isArray(settings?.legalLinks) && settings.legalLinks.length > 0
      ? settings.legalLinks.filter((l: any) => l?.label).map((l: any) => ({ label: l.label, href: l.href }))
      : FALLBACK_LEGAL;

  const socials = [
    { url: settings?.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { url: settings?.instagram, Icon: InstagramIcon, label: "Instagram" },
    { url: settings?.youtube, Icon: YoutubeIcon, label: "YouTube" },
    { url: settings?.facebook, Icon: FacebookIcon, label: "Facebook" },
  ];
  const hasSocialUrls = socials.some((s) => s.url);

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
            <p className={styles.brandText}>{brandLine1}</p>
            <p className={`${styles.brandText} ${styles.brandBold}`}>{brandLine2}</p>
          </div>

          <div className={styles.navGrid}>
            {columns.map((col, ci) => (
              <div key={ci}>
                <h4 className={styles.navTitle}>{col.title}</h4>
                <ul className={col.title?.toLowerCase() === "contact" ? styles.contactList : styles.navList}>
                  {col.links.map((link, li) =>
                    link.href ? (
                      <li key={li}>
                        <Link href={normalizeInternalHref(link.href)} className={styles.navLink}>
                          {link.label}
                        </Link>
                      </li>
                    ) : (
                      <li key={li}>{link.label}</li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* LAYER 2: Socials */}
        <div className={styles.socialsWrap}>
          <h4 className={styles.socialsTitle}>{socialsTitle}</h4>
          <div className={styles.socialsIcons}>
            {hasSocialUrls
              ? socials
                  .filter((s) => s.url)
                  .map(({ url, Icon, label }) => (
                    <a
                      key={label}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon className={styles.socialIcon} />
                    </a>
                  ))
              : (
                <>
                  <LinkedinIcon className={styles.socialIcon} />
                  <InstagramIcon className={styles.socialIcon} />
                  <YoutubeIcon className={styles.socialIcon} />
                </>
              )}
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
          <span>{copyright}</span>
          {legalLinks.map((link, i) => (
            <Link key={i} href={normalizeInternalHref(link.href) || "#"} className={styles.legalLink}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
