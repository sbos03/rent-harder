/**
 * Pure helpers for deciding what goes into the sitemap. Kept separate from
 * app/sitemap.ts (which talks to Payload) so the filtering rules are unit
 * testable in isolation.
 */

/**
 * Slugs that should never appear in the sitemap even if published:
 * scaffolding / placeholder / section-index pages that aren't real public
 * content with their own meaningful page.
 */
export const EXCLUDED_SITEMAP_SLUGS = new Set(["test", "home", "voor-wie"]);

/**
 * Normalise a CMS slug for the sitemap and decide whether it belongs there.
 * Returns the cleaned slug, or null when the entry should be skipped.
 *
 * - trims and lowercases (so "Meijer-Verhuur" → "meijer-verhuur"; URLs are
 *   case-sensitive and mixed case causes duplicate-URL issues in Google)
 * - strips leading/trailing slashes
 * - rejects empty slugs, excluded slugs, and anything with spaces or illegal
 *   URL characters (a sign of an unfinished / placeholder page)
 */
export function cleanSitemapSlug(raw: string | undefined | null): string | null {
  const slug = (raw ?? "").trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  if (!slug) return null;
  if (EXCLUDED_SITEMAP_SLUGS.has(slug)) return null;
  // Allow only url-safe path segments: letters, numbers, dashes, slashes.
  if (!/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/.test(slug)) return null;
  return slug;
}
