import React from "react";
import { describe, it, expect } from "vitest";
import { render, fireEvent, within } from "@testing-library/react";

import ImageDuo from "@/app/components/sections/ImageDuo/ImageDuo";

const LEFT = "https://cms.example/media/left.jpg";
const RIGHT = "https://cms.example/media/right.jpg";

function srcs(container: HTMLElement) {
  return Array.from(container.querySelectorAll("img")).map((i) => i.getAttribute("src"));
}

describe("ImageDuo", () => {
  it("renders both images", () => {
    const { container } = render(
      <ImageDuo
        content={{
          imageLeft: { url: LEFT, width: 1200, height: 900, alt: "Links" },
          imageRight: { url: RIGHT, width: 1000, height: 1400, alt: "Rechts" },
        }}
      />
    );
    expect(srcs(container)).toContain(LEFT);
    expect(srcs(container)).toContain(RIGHT);
  });

  it("does NOT force a fixed aspect ratio (no crop) — image height is auto via natural dimensions", () => {
    const { container } = render(
      <ImageDuo content={{ imageLeft: { url: LEFT, width: 1000, height: 1400 } }} />
    );
    const img = container.querySelector("img");
    // The mocked next/image passes width/height through; a tall image keeps
    // its real dimensions rather than being squashed into 4:3.
    expect(img?.getAttribute("width")).toBe("1000");
    expect(img?.getAttribute("height")).toBe("1400");
  });

  it("renders nothing when no images are set", () => {
    const { container } = render(<ImageDuo content={{}} />);
    expect(container.querySelector("section")).toBeNull();
  });

  it("opens a lightbox when a figure is clicked, and closes it", () => {
    const { container, queryByRole } = render(
      <ImageDuo content={{ imageLeft: { url: LEFT, width: 1200, height: 900 } }} />
    );
    // No dialog initially.
    expect(queryByRole("dialog")).toBeNull();

    // Click the figure button.
    const figureBtn = container.querySelector("button");
    expect(figureBtn).not.toBeNull();
    fireEvent.click(figureBtn!);

    const dialog = queryByRole("dialog");
    expect(dialog).not.toBeNull();
    // The enlarged image is present in the lightbox.
    expect(srcs(dialog as HTMLElement)).toContain(LEFT);

    // Close via the close button.
    const closeBtn = within(dialog as HTMLElement).getByLabelText("Sluiten");
    fireEvent.click(closeBtn);
    expect(queryByRole("dialog")).toBeNull();
  });
});
