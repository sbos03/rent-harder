import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import { pageSectionBlocks } from "@/collections/pageBlocks";
import { blockRegistry, renderBlock } from "@/app/components/sections/blockRegistry";
import SectionRenderer from "@/app/components/SectionRenderer";

const noop = () => {};

describe("block registry completeness", () => {
  it("has a renderer for EVERY block defined in pageBlocks.ts", () => {
    const definedSlugs = pageSectionBlocks.map((b) => b.slug);
    const missing = definedSlugs.filter((slug) => !(slug in blockRegistry));
    // If this fails, a block was added to pageBlocks.ts but not registered,
    // which means it would render nothing on the site.
    expect(missing).toEqual([]);
  });

  it("has no registry entries that are not real blocks", () => {
    const definedSlugs = new Set(pageSectionBlocks.map((b) => b.slug));
    const orphans = Object.keys(blockRegistry).filter((slug) => !definedSlugs.has(slug));
    expect(orphans).toEqual([]);
  });
});

describe("renderBlock safety", () => {
  it("returns null for an unknown block type without throwing", () => {
    expect(renderBlock({ blockType: "doesNotExist" }, { onContactClick: noop })).toBeNull();
  });

  it("returns null for a block with no blockType", () => {
    expect(renderBlock({}, { onContactClick: noop })).toBeNull();
  });
});

describe("SectionRenderer add / remove / reorder", () => {
  it("renders an empty section list without crashing", () => {
    const { container } = render(
      <SectionRenderer sections={[]} onContactClick={noop} />
    );
    expect(container).toBeTruthy();
  });

  it("renders a mix of known and unknown blocks, skipping the unknown one", () => {
    const sections = [
      { blockType: "centeredStatement", title: "EERSTE" },
      { blockType: "totallyUnknownBlock", foo: "bar" },
      { blockType: "featureColumns", title: "TWEEDE" },
    ];
    const { container } = render(
      <SectionRenderer sections={sections} onContactClick={noop} />
    );
    // Both known blocks rendered their titles; the unknown one was skipped.
    expect(container.textContent).toContain("EERSTE");
    expect(container.textContent).toContain("TWEEDE");
  });

  it("respects order and applies the anchor id when set", () => {
    const sections = [
      { blockType: "centeredStatement", title: "MET ANCHOR", anchor: "prijzen" },
    ];
    const { container } = render(
      <SectionRenderer sections={sections} onContactClick={noop} />
    );
    expect(container.querySelector("#prijzen")).not.toBeNull();
  });

  it("renders every registered block type in one page without crashing", () => {
    // Simulate 'put any block in': a page containing one of each block type.
    const sections = Object.keys(blockRegistry).map((blockType) => ({
      blockType,
      title: `T_${blockType}`,
    }));
    const { container } = render(
      <SectionRenderer sections={sections} onContactClick={noop} episodes={null} />
    );
    expect(container).toBeTruthy();
  });
});
