/**
 * Normalise a CMS-provided href so internal paths are always ROOT-absolute.
 *
 * The bug this fixes: an editor types "voor-verhuurbedrijven" (or a value that
 * lost its leading slash) into a link field. Rendered as-is, the browser
 * resolves it RELATIVE to the current page, so clicking it from
 * /voor-wie/machineverhuur navigates to /voor-wie/voor-verhuurbedrijven.
 *
 * Rules:
 * - empty / null            → "" (caller decides what to do, e.g. open contact)
 * - "#anchor"               → unchanged (same-page anchor)
 * - "http://" / "https://"  → unchanged (external)
 * - "mailto:" / "tel:"      → unchanged
 * - "//host/..."            → unchanged (protocol-relative external)
 * - anything else           → guaranteed a single leading "/" (internal path)
 *
 * Examples:
 *   normalizeInternalHref("voor-verhuurbedrijven")  → "/voor-verhuurbedrijven"
 *   normalizeInternalHref("/voor-verhuurbedrijven") → "/voor-verhuurbedrijven"
 *   normalizeInternalHref("  contact ")             → "/contact"
 *   normalizeInternalHref("#methode")               → "#methode"
 *   normalizeInternalHref("https://x.com")          → "https://x.com"
 */
export function normalizeInternalHref(href: string | null | undefined): string {
  const url = (href ?? "").trim();
  if (url === "") return "";

  // Same-page anchor.
  if (url.startsWith("#")) return url;

  // Absolute external.
  if (/^https?:\/\//i.test(url)) return url;

  // Protocol-relative external (e.g. "//cdn.example.com/a.jpg") — only when the
  // first segment looks like a real host (contains a dot). A CMS typo like
  // "//voor-verhuurbedrijven" is treated as an internal path below instead.
  if (/^\/\/[^/]+\.[^/]/.test(url)) return url;

  // Non-http schemes we should not touch.
  if (/^(mailto:|tel:|sms:|ftp:)/i.test(url)) return url;

  // Already root-absolute (and collapse accidental doubles like "//path").
  if (url.startsWith("/")) return "/" + url.replace(/^\/+/, "");

  // Bare internal path → make it root-absolute.
  return "/" + url;
}
