"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./Slide5PartnerStories.module.scss";
import { makeCtaHandler } from "@/app/lib/ctaAction";

interface Props {
  onContactClick: () => void;
  content?: {
    title?: string;
    description?: string;
    stories?: {
      eyebrow?: string;
      name?: string;
      intro?: string;
      link?: string;
      image?: { url?: string; alt?: string } | null;
    }[];
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function Slide5PartnerStories({ onContactClick, content }: Props) {
  const title = content?.title || "HARDER VERHUREN.";
  const description =
    content?.description ||
    "Partners, geen klanten. We werken naast verhuurbedrijven om ze iedere dag een beetje zichtbaarder, slimmer en sterker te maken.";
  const ctaText = content?.ctaText || "MEER PARTNERVERHALEN";
  const handleCta = makeCtaHandler(content?.ctaLink, onContactClick);
  const stories =
    content?.stories && content.stories.length > 0
      ? content.stories.map((s) => ({
          eyebrow: s.eyebrow || "PARTNERVERHAAL",
          title: s.name || "",
          intro: s.intro || "",
          link: s.link || null,
          image: s.image?.url || null,
          imageAlt: s.image?.alt || s.name || "",
        }))
      : [
          {
            eyebrow: "Voor infra & tijdelijke installaties",
            title: "LEIDINGVERHUUR",
            intro: "Meer aanvragen, grip op beschikbaarheid en een slimmer proces van offerte tot retour.",
            link: null, image: null, imageAlt: "",
          },
          {
            eyebrow: "Voor bouw, infra & waterbeheer",
            title: "POMPVERHUUR & WATEROPLOSSINGEN",
            intro: "Maak technische kennis beter zichtbaar en stroomlijn aanvraag, planning en uitvoering.",
            link: null, image: null, imageAlt: "",
          },
          {
            eyebrow: "Voor particulier & zakelijk verhuur",
            title: "VERHUUR CONTAINERS",
            intro: "Beter gevonden worden, makkelijker laten huren en slimmer werken van bestelling tot ophalen.",
            link: null, image: null, imageAlt: "",
          },
          {
            eyebrow: "Voor industrie, logistiek & bouw",
            title: "MACHINEVERHUUR",
            intro: "Meer uit je machinepark halen met betere vindbaarheid, snellere aanvragen en meer grip op verhuur.",
            link: null, image: null, imageAlt: "",
          },
        ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.grid}>
          {stories.map((story, i) => (
            <a
              key={i}
              href={story.link || "#"}
              onClick={(e) => { if (!story.link) e.preventDefault(); }}
              className={styles.card}
            >
              {story.image ? (
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className={styles.cardImg}
                />
              ) : (
                <div className={styles.cardBg} />
              )}
              <div className={styles.cardGradient} />
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{story.eyebrow}</span>
                <h3 className={styles.cardTitle}>{story.title}</h3>
                {story.intro && <p className={styles.cardDesc}>{story.intro}</p>}
              </div>
              <div className={styles.cardArrow}>
                <ArrowRight className={styles.arrowIcon} strokeWidth={2.5} />
              </div>
            </a>
          ))}
        </div>

        <button onClick={handleCta} className={styles.cta}>
          <div className={styles.ctaInner}>{ctaText}</div>
        </button>
      </div>
    </section>
  );
}
