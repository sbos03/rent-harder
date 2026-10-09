"use client";

import React from "react";
import { renderBlock } from "@/app/components/sections/blockRegistry";

interface Props {
  sections: any[];
  onContactClick: () => void;
  episodes?: any[] | null;
  partners?: any[] | null;
  /**
   * Optional fallback anchor id per block type, applied only when a block has
   * no explicit `anchor` set. Used by the homepage to preserve its legacy
   * #anchor targets (wat-we-bouwen, voor-wie, methode, ...) that the header
   * and footer nav link to, without requiring an editor to fill the field.
   */
  defaultAnchors?: Record<string, string>;
}

/**
 * Renders an ordered list of CMS blocks. Each block is looked up in the block
 * registry (app/components/sections/blockRegistry.tsx), so blocks can be added,
 * removed, or reordered from the admin without touching this file. Unknown or
 * empty blocks render nothing instead of crashing.
 */
export default function SectionRenderer({
  sections,
  onContactClick,
  episodes,
  partners,
  defaultAnchors,
}: Props) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  // Track which block types we've already assigned a default anchor to, so a
  // fallback id is only applied to the first occurrence of that type.
  const usedDefaults = new Set<string>();

  return (
    <>
      {sections.map((block, i) => {
        const node = renderBlock(block, { onContactClick, episodes, partners });
        if (node === null) return null;

        // Wrap in an anchor target only when an id is set, so #anchor links
        // scroll to this section. scroll-margin-top keeps it clear of a
        // sticky header. Explicit CMS `anchor` wins; otherwise fall back to a
        // per-type default (used by the homepage for its legacy nav anchors).
        const explicit =
          block && typeof block.anchor === "string" ? block.anchor.trim() : "";
        const type = block && typeof block.blockType === "string" ? block.blockType : "";
        let anchor = explicit;
        if (!anchor && defaultAnchors && type && defaultAnchors[type] && !usedDefaults.has(type)) {
          anchor = defaultAnchors[type];
          usedDefaults.add(type);
        }
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
