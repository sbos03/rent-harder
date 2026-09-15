import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// jsdom implements neither IntersectionObserver nor ResizeObserver, which
// framer-motion (whileInView / scroll) relies on. Inert stubs let animated
// components render in tests.
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", MockObserver);
vi.stubGlobal("ResizeObserver", MockObserver);

// next/image → plain <img>, so tests can assert on the src a component chose.
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { src, alt, fill, quality, sizes, priority, ...rest } = props as {
      src?: string;
      alt?: string;
      [key: string]: unknown;
    };
    void fill;
    void quality;
    void sizes;
    void priority;
    return React.createElement("img", { src, alt: alt ?? "", ...rest });
  },
}));
