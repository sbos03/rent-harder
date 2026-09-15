import { describe, it, expect } from "vitest";
import { normalizeInternalHref } from "@/app/lib/href";

describe("normalizeInternalHref", () => {
  it("adds a leading slash to a bare internal path (the reported bug)", () => {
    expect(normalizeInternalHref("voor-verhuurbedrijven")).toBe("/voor-verhuurbedrijven");
  });

  it("leaves an already root-absolute path unchanged", () => {
    expect(normalizeInternalHref("/voor-verhuurbedrijven")).toBe("/voor-verhuurbedrijven");
  });

  it("trims surrounding whitespace before normalising", () => {
    expect(normalizeInternalHref("  contact ")).toBe("/contact");
    expect(normalizeInternalHref(" /contact ")).toBe("/contact");
  });

  it("collapses accidental leading double slashes on internal paths", () => {
    expect(normalizeInternalHref("//voor-verhuurbedrijven")).toBe("/voor-verhuurbedrijven");
  });

  it("leaves same-page anchors untouched", () => {
    expect(normalizeInternalHref("#methode")).toBe("#methode");
  });

  it("leaves a root anchor path untouched", () => {
    expect(normalizeInternalHref("/#voor-wie")).toBe("/#voor-wie");
  });

  it("leaves external http(s) URLs untouched", () => {
    expect(normalizeInternalHref("https://example.com/x")).toBe("https://example.com/x");
    expect(normalizeInternalHref("http://example.com")).toBe("http://example.com");
  });

  it("leaves protocol-relative URLs untouched", () => {
    expect(normalizeInternalHref("//cdn.example.com/a.jpg")).toBe("//cdn.example.com/a.jpg");
  });

  it("leaves mailto and tel untouched", () => {
    expect(normalizeInternalHref("mailto:info@rentharder.nl")).toBe("mailto:info@rentharder.nl");
    expect(normalizeInternalHref("tel:+31599253032")).toBe("tel:+31599253032");
  });

  it("returns empty string for empty / null / undefined", () => {
    expect(normalizeInternalHref("")).toBe("");
    expect(normalizeInternalHref(null)).toBe("");
    expect(normalizeInternalHref(undefined)).toBe("");
  });

  it("normalises a nested bare path too", () => {
    expect(normalizeInternalHref("voor-wie/machineverhuur")).toBe("/voor-wie/machineverhuur");
  });
});
