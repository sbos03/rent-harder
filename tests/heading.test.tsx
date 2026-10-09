import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Heading, { responsiveFontSize } from "@/app/components/Heading/Heading";

describe("Heading component", () => {
  it("renders an h2 by default", () => {
    const { container } = render(<Heading text="Titel" />);
    expect(container.querySelector("h2")).not.toBeNull();
  });

  it("renders the chosen heading level", () => {
    const { container: c1 } = render(<Heading text="A" level="h1" />);
    expect(c1.querySelector("h1")).not.toBeNull();
    const { container: c3 } = render(<Heading text="A" level="h3" />);
    expect(c3.querySelector("h3")).not.toBeNull();
  });

  it("falls back to h2 for an invalid level", () => {
    const { container } = render(<Heading text="A" level="h9" />);
    expect(container.querySelector("h2")).not.toBeNull();
  });

  it("applies a responsive font-size when sizePx is set", () => {
    const { container } = render(<Heading text="A" sizePx={96} />);
    const el = container.querySelector("h2") as HTMLElement;
    // Inline style uses clamp() with the px value as the upper bound.
    expect(el.style.fontSize).toContain("clamp(");
    expect(el.style.fontSize).toContain("96px");
  });

  it("adds no inline font-size when sizePx is empty/0", () => {
    const { container } = render(<Heading text="A" className="myTitle" />);
    const el = container.querySelector("h2") as HTMLElement;
    expect(el.style.fontSize).toBe("");
    expect(el.className).toContain("myTitle");
  });

  it("keeps the block's own className", () => {
    const { container } = render(<Heading text="A" className="blockTitle" sizePx={60} />);
    const el = container.querySelector("h2") as HTMLElement;
    expect(el.className).toContain("blockTitle");
    expect(el.style.fontSize).toContain("60px");
  });

  it("splits on | into line breaks", () => {
    const { container } = render(<Heading text="EEN|TWEE" />);
    expect(container.querySelectorAll("br").length).toBe(1);
    expect(container.textContent).toContain("EEN");
    expect(container.textContent).toContain("TWEE");
  });

  it("renders nothing without text", () => {
    const { container } = render(<Heading text={undefined} />);
    expect(container.querySelector("h1,h2,h3")).toBeNull();
  });

  it("always renders text as typed (text-transform:none, never forced caps)", () => {
    const { container } = render(<Heading text="Normale Tekst" />);
    const el = container.querySelector("h2") as HTMLElement;
    expect(el.style.textTransform).toBe("none");
  });

  it("keeps text-transform:none together with a custom size", () => {
    const { container } = render(<Heading text="A" sizePx={80} />);
    const el = container.querySelector("h2") as HTMLElement;
    expect(el.style.textTransform).toBe("none");
    expect(el.style.fontSize).toContain("80px");
  });
});

// Parse "clamp(MINpx, ... , MAXpx)" into numbers for assertions.
function parseClamp(css: string) {
  const m = css.match(/^clamp\(\s*([\d.]+)px\s*,\s*(.+?)\s*,\s*([\d.]+)px\s*\)$/);
  if (!m) throw new Error(`not a clamp: ${css}`);
  return { min: parseFloat(m[1]), preferred: m[2], max: parseFloat(m[3]) };
}

describe("responsiveFontSize", () => {
  it("uses the typed px as the upper bound (desktop size)", () => {
    expect(parseClamp(responsiveFontSize(100)).max).toBe(100);
    expect(parseClamp(responsiveFontSize(24)).max).toBe(24);
    expect(parseClamp(responsiveFontSize(16)).max).toBe(16);
  });

  it("never lets the floor exceed the typed size (no inversion)", () => {
    // Regression: 16px previously produced clamp(20px, .., 16px) → min > max,
    // which CSS resolves to the larger min, inflating a 16px title to 20px.
    for (const px of [12, 16, 20, 24, 32, 48, 72, 96]) {
      const { min, max } = parseClamp(responsiveFontSize(px));
      expect(min).toBeLessThanOrEqual(max);
    }
  });

  it("keeps small titles close to the typed size (24px stays near 24, not ~9)", () => {
    const { min, max } = parseClamp(responsiveFontSize(24));
    expect(max).toBe(24);
    // Floor should be a large fraction of 24 for small sizes, so it reads ~24.
    expect(min).toBeGreaterThanOrEqual(18);
    expect(min).toBeLessThanOrEqual(24);
  });

  it("still allows big display titles to shrink meaningfully on mobile", () => {
    const { min, max } = parseClamp(responsiveFontSize(96));
    expect(max).toBe(96);
    expect(min).toBeLessThan(96 * 0.75); // noticeable downscale for huge titles
  });
});
