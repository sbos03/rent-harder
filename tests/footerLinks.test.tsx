import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Footer from "@/app/components/Footer/Footer";

/**
 * Proves the reported bug is fixed end to end: a footer nav link stored as a
 * bare "voor-verhuurbedrijven" renders as the root-absolute "/voor-verhuurbedrijven",
 * so it can never resolve relative to a /voor-wie/... page.
 */
describe("Footer internal links", () => {
  it("renders a bare CMS nav link as a root-absolute path", () => {
    const settings = {
      footerColumns: [
        {
          title: "Navigatie",
          links: [{ label: "Branches", href: "voor-verhuurbedrijven" }],
        },
      ],
    };
    const { getByText } = render(<Footer settings={settings} />);
    const link = getByText("Branches").closest("a");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("/voor-verhuurbedrijven");
  });

  it("keeps an already-absolute nav link unchanged", () => {
    const settings = {
      footerColumns: [
        {
          title: "Navigatie",
          links: [{ label: "Contact", href: "/contact" }],
        },
      ],
    };
    const { getByText } = render(<Footer settings={settings} />);
    expect(getByText("Contact").closest("a")?.getAttribute("href")).toBe("/contact");
  });
});
