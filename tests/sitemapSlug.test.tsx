import { describe, it, expect } from "vitest";
import { cleanSitemapSlug } from "@/app/lib/sitemapSlug";

describe("cleanSitemapSlug", () => {
  it("keeps a normal nested slug", () => {
    expect(cleanSitemapSlug("voor-wie/hoogwerkerverhuur")).toBe(
      "voor-wie/hoogwerkerverhuur",
    );
    expect(cleanSitemapSlug("voor-verhuurbedrijven")).toBe("voor-verhuurbedrijven");
  });

  it("lowercases mixed-case slugs (fixes Meijer-Verhuur)", () => {
    expect(cleanSitemapSlug("Meijer-Verhuur")).toBe("meijer-verhuur");
  });

  it("strips leading/trailing slashes", () => {
    expect(cleanSitemapSlug("/voor-wie/machineverhuur/")).toBe(
      "voor-wie/machineverhuur",
    );
  });

  it("excludes scaffolding / section-index slugs", () => {
    expect(cleanSitemapSlug("test")).toBeNull();
    expect(cleanSitemapSlug("home")).toBeNull();
    expect(cleanSitemapSlug("voor-wie")).toBeNull();
    // excluded regardless of casing/whitespace
    expect(cleanSitemapSlug("  Voor-Wie ")).toBeNull();
  });

  it("rejects empty / whitespace-only slugs", () => {
    expect(cleanSitemapSlug("")).toBeNull();
    expect(cleanSitemapSlug("   ")).toBeNull();
    expect(cleanSitemapSlug(null)).toBeNull();
    expect(cleanSitemapSlug(undefined)).toBeNull();
  });

  it("rejects slugs with spaces or illegal characters (unfinished pages)", () => {
    expect(cleanSitemapSlug("half af pagina")).toBeNull();
    expect(cleanSitemapSlug("page?draft=1")).toBeNull();
    expect(cleanSitemapSlug("foo_bar")).toBeNull();
    expect(cleanSitemapSlug("foo//bar")).toBeNull();
    expect(cleanSitemapSlug("-leading-dash")).toBeNull();
  });
});
