import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import FeatureColumns from "@/app/components/sections/FeatureColumns/FeatureColumns";
import CenteredStatement from "@/app/components/sections/CenteredStatement/CenteredStatement";

describe("FeatureColumns rich text", () => {
  it("renders rich subtitle and column description HTML when present", () => {
    const { container } = render(
      <FeatureColumns
        content={{
          title: "TITEL",
          subtitleHtml: "<p>Onder <strong>vet</strong></p>",
          columns: [
            { title: "KOL", descriptionHtml: "<p>Kol <a href=\"/x\">link</a></p>" },
          ],
        }}
      />
    );
    expect(container.querySelector("strong")?.textContent).toBe("vet");
    expect(container.querySelector("a")?.getAttribute("href")).toBe("/x");
  });

  it("falls back to legacy plain subtitle/description", () => {
    const { getByText, container } = render(
      <FeatureColumns
        content={{
          title: "TITEL",
          subtitle: "Oude ondertitel",
          columns: [{ title: "KOL", description: "Oude beschrijving" }],
        }}
      />
    );
    expect(getByText("Oude ondertitel")).toBeTruthy();
    expect(getByText("Oude beschrijving")).toBeTruthy();
    expect(container.querySelector("a")).toBeNull();
  });

  it("prefers rich over legacy when both exist", () => {
    const { container, queryByText } = render(
      <FeatureColumns
        content={{
          title: "TITEL",
          subtitleHtml: "<p>Nieuw</p>",
          subtitle: "Oud",
          columns: [],
        }}
      />
    );
    expect(container.textContent).toContain("Nieuw");
    expect(queryByText("Oud")).toBeNull();
  });
});

describe("CenteredStatement rich text", () => {
  it("renders richBodyHtml when present", () => {
    const { container } = render(
      <CenteredStatement
        content={{
          title: "TITEL",
          richBodyHtml: "<p>Alinea een</p><p>Alinea <strong>twee</strong></p>",
        }}
      />
    );
    expect(container.querySelectorAll("p").length).toBe(2);
    expect(container.querySelector("strong")?.textContent).toBe("twee");
  });

  it("falls back to legacy paragraphs", () => {
    const { getByText, container } = render(
      <CenteredStatement
        content={{
          title: "TITEL",
          paragraphs: [{ text: "Oude alinea" }],
        }}
      />
    );
    expect(getByText("Oude alinea")).toBeTruthy();
    expect(container.querySelector("strong")).toBeNull();
  });

  it("prefers richBody over legacy paragraphs when both exist", () => {
    const { container, queryByText } = render(
      <CenteredStatement
        content={{
          richBodyHtml: "<p>Nieuwe body</p>",
          paragraphs: [{ text: "Oude alinea" }],
        }}
      />
    );
    expect(container.textContent).toContain("Nieuwe body");
    expect(queryByText("Oude alinea")).toBeNull();
  });
});
