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
  CinematicImage,
} from "@/app/components/sections";
// Originally built for the hoogwerker page, but they read the same CMS block
// fields so they double as the shared renderers for these block types.
import HoogwerkerExample from "@/app/(frontend)/voor-wie/hoogwerkerverhuur/sections/HoogwerkerExample";
import HoogwerkerPrinciple from "@/app/(frontend)/voor-wie/hoogwerkerverhuur/sections/HoogwerkerPrinciple";
import HoogwerkerOpenMarkt from "@/app/(frontend)/voor-wie/hoogwerkerverhuur/sections/HoogwerkerOpenMarkt";
import HoogwerkerOtherMarkets from "@/app/(frontend)/voor-wie/hoogwerkerverhuur/sections/HoogwerkerOtherMarkets";

/**
 * Extra data a block component may need beyond its own `content`.
 * The renderer passes these in when the flags are set.
 */
export interface BlockRenderContext {
  onContactClick: () => void;
  episodes?: unknown[] | null;
}

/**
 * A registry entry: the component to render for a block type, plus which
 * extra props that component needs. Keeping this declarative means adding a
 * new block is a single entry here, no switch statement to edit.
 */
export interface BlockEntry {
  component: React.ComponentType<any>;
  /** Pass the contact-popup opener (for blocks with a CTA button). */
  needsContact?: boolean;
  /** Pass the TV episodes list. */
  needsEpisodes?: boolean;
}

/**
 * SINGLE SOURCE OF TRUTH for how each CMS block type renders.
 *
 * The keys MUST match the block `slug` values in collections/pageBlocks.ts.
 * A test (tests/blockRegistry.test.tsx) asserts every block slug has an entry
 * here, so a newly added block can never silently render nothing.
 */
export const blockRegistry: Record<string, BlockEntry> = {
  heroSection: { component: HeroSection, needsContact: true },
  introSection: { component: Slide2Intro, needsContact: true },
  brandStatement: { component: Slide3Brand },
  targetAudience: { component: Slide4TargetAudience, needsContact: true },
  partnerStories: { component: Slide5PartnerStories, needsContact: true },
  fullscreenStatement: { component: Slide6Mensenwerk },
  cinematicStatement: { component: CinematicStatement },
  tvSection: { component: TVSection, needsContact: true, needsEpisodes: true },
  methodRoadmap: { component: MethodRoadmap },
  caseShowcase: { component: BuiltToRentHarder, needsContact: true },
  ctaSection: { component: HoogwerkerOpenMarkt, needsContact: true },
  cinematicImage: { component: CinematicImage },
  caseExample: { component: HoogwerkerExample, needsContact: true },
  principleSteps: { component: HoogwerkerPrinciple },
  seoContent: { component: SeoContent },
  otherMarkets: { component: HoogwerkerOtherMarkets },
  featureColumns: { component: FeatureColumns },
  centeredStatement: { component: CenteredStatement },
  textColumns: { component: TextColumns },
  imageDuo: { component: ImageDuo },
};

/**
 * Render a single block. Returns null for unknown/empty blocks so a page never
 * crashes when a block type has no renderer.
 */
export function renderBlock(
  block: { blockType?: string } & Record<string, unknown>,
  ctx: BlockRenderContext,
): React.ReactNode {
  if (!block || typeof block.blockType !== "string") return null;

  const entry = blockRegistry[block.blockType];
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `[SectionRenderer] No renderer registered for block type "${block.blockType}". ` +
          `Add it to app/components/sections/blockRegistry.tsx.`,
      );
    }
    return null;
  }

  const Component = entry.component;
  const props: Record<string, unknown> = { content: block };
  if (entry.needsContact) props.onContactClick = ctx.onContactClick;
  if (entry.needsEpisodes) props.episodes = ctx.episodes;

  return <Component {...props} />;
}
