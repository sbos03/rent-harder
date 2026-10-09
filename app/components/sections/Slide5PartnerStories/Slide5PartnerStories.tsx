"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./Slide5PartnerStories.module.scss";
import Heading from "@/app/components/Heading/Heading";
import { makeCtaHandler } from "@/app/lib/ctaAction";
import { normalizeInternalHref } from "@/app/lib/href";

interface Props {
  onContactClick: () => void;
  content?: {
    title?: string;
    headingLevel?: string;
    titleSizePx?: number;
    preserveCase?: boolean;
    /** Server-rendered HTML from rich-text richDescription (preferred). */
    descriptionHtml?: string;
    description?: string;
    stories?: {
      eyebrow?: string;
      name?: string;
      /** Server-rendered HTML from rich-text richIntro (preferred). */
      introHtml?: string;
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
          introHtml: s.introHtml || "",
          link: s.link || null,
          image: s.image?.url || null,
          imageAlt: s.image?.alt || s.name || "",
        }))
      : [
          {
            eyebrow: "Voor infra & tijdelijke installaties",
            title: "LEIDINGVERHUUR",
            intro: "Meer aanvragen, grip op beschikbaarheid en een slimmer proces van offerte tot retour.",
            introHtml: "",
            link: null, image: null, imageAlt: "",
          },
          {
            eyebrow: "Voor bouw, infra & waterbeheer",
            title: "POMPVERHUUR & WATEROPLOSSINGEN",
            intro: "Maak technische kennis beter zichtbaar en stroomlijn aanvraag, planning en uitvoering.",
            introHtml: "",
            link: null, image: null, imageAlt: "",
          },
          {
            eyebrow: "Voor particulier & zakelijk verhuur",
            title: "VERHUUR CONTAINERS",
            intro: "Beter gevonden worden, makkelijker laten huren en slimmer werken van bestelling tot ophalen.",
            introHtml: "",
            link: null, image: null, imageAlt: "",
          },
          {
            eyebrow: "Voor industrie, logistiek & bouw",
            title: "MACHINEVERHUUR",
            intro: "Meer uit je machinepark halen met betere vindbaarheid, snellere aanvragen en meer grip op verhuur.",
            introHtml: "",
            link: null, image: null, imageAlt: "",
          },
        ];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Heading
            text={title}
            level={content?.headingLevel}
            sizePx={content?.titleSizePx}
            preserveCase={content?.preserveCase}
            className={styles.title}
          />
          {content?.descriptionHtml && content.descriptionHtml.trim() !== "" ? (
            <div
              className={`${styles.description} rh-rich`}
              dangerouslySetInnerHTML={{ __html: content.descriptionHtml }}
            />
          ) : (
            <p className={styles.description}>{description}</p>
          )}
        </div>

        <div className={styles.grid}>
          {stories.map((story, i) => (
            <a
              key={i}
              href={normalizeInternalHref(story.link) || "#"}
              onClick={(e) => { if (!story.link) e.preventDefault(); }}
              className={styles.card}
            >
              {story.image ? (
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  className={styles.cardImg}
                />
              ) : (
                <div className={styles.cardBg} />
              )}
              <div className={styles.cardGradient} />
              <div className={styles.cardContent}>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>{story.eyebrow}</span>
                  <h3 className={styles.cardTitle}>{story.title}</h3>
                  {story.introHtml && story.introHtml.trim() !== "" ? (
                    <div
                      className={`${styles.cardDesc} rh-rich`}
                      dangerouslySetInnerHTML={{ __html: story.introHtml }}
                    />
                  ) : (
                    story.intro && <p className={styles.cardDesc}>{story.intro}</p>
                  )}
                </div>
                <div className={styles.cardArrow}>
                  <ArrowRight className={styles.arrowIcon} strokeWidth={2.5} />
                </div>
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
