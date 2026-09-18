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
});

describe("responsiveFontSize", () => {
  it("clamps between a floor and the given desktop px", () => {
    const css = responsiveFontSize(100);
    expect(css).toMatch(/^clamp\(/);
    expect(css).toContain("100px"); // desktop upper bound
    // floor is ~48% but never below 20px
    expect(css).toMatch(/clamp\(48px,/);
  });

  it("keeps a floor of at least 20px for small sizes", () => {
    const css = responsiveFontSize(24);
    // 48% of 24 = ~11.5 → floored to 20
    expect(css).toContain("20px");
  });
});
