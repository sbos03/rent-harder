"use client";

import React from "react";
import {
  HeroSection,
  Slide2Intro,
  Slide3Brand,
  Slide4TargetAudience,
  Slide5PartnerStories,
  Slide6Mensenwerk,
  CinematicStatement,
  TVSection,
  MethodRoadmap,
  BuiltToRentHarder,
  SeoContent,
  FeatureColumns,
  CenteredStatement,
  TextColumns,
  ImageDuo,
} from "@/app/components/sections";

interface Props {
  sections: any[];
  onContactClick: () => void;
  episodes?: any[] | null;
}

/**
 * Renders an ordered list of CMS blocks by mapping each blockType to its
 * matching section component. Used by partner pages (and reusable elsewhere)
 * so a page can be built from sections exactly like the homepage.
 */
export default function SectionRenderer({ sections, onContactClick, episodes }: Props) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((block, i) => {
        let node: React.ReactNode;
        switch (block.blockType) {
          case "heroSection":
            node = <HeroSection onContactClick={onContactClick} content={block} />;
            break;
          case "introSection":
            node = <Slide2Intro onContactClick={onContactClick} content={block} />;
            break;
          case "brandStatement":
            node = <Slide3Brand content={block} />;
            break;
          case "targetAudience":
            node = <Slide4TargetAudience onContactClick={onContactClick} content={block} />;
            break;
          case "partnerStories":
            node = <Slide5PartnerStories onContactClick={onContactClick} content={block} />;
            break;
          case "fullscreenStatement":
            node = <Slide6Mensenwerk content={block} />;
            break;
          case "cinematicStatement":
            node = <CinematicStatement content={block} />;
            break;
          case "tvSection":
            node = <TVSection onContactClick={onContactClick} content={block} episodes={episodes} />;
            break;
          case "methodRoadmap":
            node = <MethodRoadmap content={block} />;
            break;
          case "caseShowcase":
            node = <BuiltToRentHarder onContactClick={onContactClick} content={block} />;
            break;
          case "seoContent":
            node = <SeoContent content={block} />;
            break;
          case "featureColumns":
            node = <FeatureColumns content={block} />;
            break;
          case "centeredStatement":
            node = <CenteredStatement content={block} />;
            break;
          case "textColumns":
            node = <TextColumns content={block} />;
            break;
          case "imageDuo":
            node = <ImageDuo content={block} />;
            break;
          default:
            return null;
        }

        // Wrap in an anchor target only when an id is set, so #anchor links
        // scroll to this section. scroll-margin-top keeps it clear of a
        // sticky header.
        const anchor = typeof block.anchor === "string" ? block.anchor.trim() : "";
        if (anchor) {
          return (
            <div key={i} id={anchor} style={{ scrollMarginTop: "6rem" }}>
              {node}
            </div>
          );
        }

        return <React.Fragment key={i}>{node}</React.Fragment>;
      })}
    </>
  );
}
