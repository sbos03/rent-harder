"use client";

import React from "react";
import { renderBlock } from "@/app/components/sections/blockRegistry";

interface Props {
  sections: any[];
  onContactClick: () => void;
  episodes?: any[] | null;
}

/**
 * Renders an ordered list of CMS blocks. Each block is looked up in the block
 * registry (app/components/sections/blockRegistry.tsx), so blocks can be added,
 * removed, or reordered from the admin without touching this file. Unknown or
 * empty blocks render nothing instead of crashing.
 */
export default function SectionRenderer({ sections, onContactClick, episodes }: Props) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <>
      {sections.map((block, i) => {
        const node = renderBlock(block, { onContactClick, episodes });
        if (node === null) return null;

        // Wrap in an anchor target only when an id is set, so #anchor links
        // scroll to this section. scroll-margin-top keeps it clear of a
        // sticky header.
        const anchor =
          block && typeof block.anchor === "string" ? block.anchor.trim() : "";
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
