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
        switch (block.blockType) {
          case "heroSection":
            return <HeroSection key={i} onContactClick={onContactClick} content={block} />;
          case "introSection":
            return <Slide2Intro key={i} onContactClick={onContactClick} content={block} />;
          case "brandStatement":
            return <Slide3Brand key={i} content={block} />;
          case "targetAudience":
            return <Slide4TargetAudience key={i} onContactClick={onContactClick} content={block} />;
          case "partnerStories":
            return <Slide5PartnerStories key={i} onContactClick={onContactClick} content={block} />;
          case "fullscreenStatement":
            return <Slide6Mensenwerk key={i} content={block} />;
          case "cinematicStatement":
            return <CinematicStatement key={i} content={block} />;
          case "tvSection":
            return <TVSection key={i} onContactClick={onContactClick} content={block} episodes={episodes} />;
          case "methodRoadmap":
            return <MethodRoadmap key={i} content={block} />;
          case "caseShowcase":
            return <BuiltToRentHarder key={i} onContactClick={onContactClick} content={block} />;
          case "seoContent":
            return <SeoContent key={i} content={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
