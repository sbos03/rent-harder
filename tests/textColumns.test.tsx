import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import TextColumns from "@/app/components/sections/TextColumns/TextColumns";

describe("TextColumns rich text", () => {
  it("renders the rich-text HTML when richBodyHtml is present", () => {
    const { container } = render(
      <TextColumns
        content={{
          columns: [
            {
              richBodyHtml:
                "<p>Eerste alinea.</p><p>Tweede met <strong>vet</strong> en <a href=\"/contact\">link</a>.</p>",
            },
          ],
        }}
      />
    );
    // The two paragraphs, the bold, and the link all render as real elements.
    expect(container.querySelectorAll("p").length).toBe(2);
    expect(container.querySelector("strong")?.textContent).toBe("vet");
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/contact");
    expect(link?.textContent).toBe("link");
  });

  it("falls back to legacy body + highlight when richBody is absent (no data loss)", () => {
    const { container, getByText } = render(
      <TextColumns
        content={{
          columns: [{ body: "Oude tekst", highlight: "Oranje regel" }],
        }}
      />
    );
    expect(getByText("Oude tekst")).toBeTruthy();
    expect(getByText("Oranje regel")).toBeTruthy();
    // Legacy path renders plain paragraphs, not injected rich HTML.
    expect(container.querySelector("a")).toBeNull();
  });

  it("prefers richBody over legacy fields when both exist", () => {
    const { container, queryByText } = render(
      <TextColumns
        content={{
          columns: [
            {
              richBodyHtml: "<p>Nieuwe tekst</p>",
              body: "Oude tekst",
              highlight: "Oranje regel",
            },
          ],
        }}
      />
    );
    expect(container.textContent).toContain("Nieuwe tekst");
    // Legacy fields are ignored when richBody is present.
    expect(queryByText("Oude tekst")).toBeNull();
    expect(queryByText("Oranje regel")).toBeNull();
  });

  it("still renders bullets alongside rich text", () => {
    const { getByText } = render(
      <TextColumns
        content={{
          columns: [
            {
              richBodyHtml: "<p>Intro</p>",
              bullets: [{ text: "Punt een" }, { text: "Punt twee" }],
            },
          ],
        }}
      />
    );
    expect(getByText("Punt een")).toBeTruthy();
    expect(getByText("Punt twee")).toBeTruthy();
  });
});
