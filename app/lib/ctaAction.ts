"use client";

import { normalizeInternalHref } from "@/app/lib/href";

/**
 * Returns a click handler for a CTA button based on its configured link.
 *
 * Behavior:
 * - empty/undefined  → opens the contact popup (onContactClick)
 * - "#anchor"        → smooth-scrolls to the element with that id
 * - "/path"          → navigates to an internal page
 * - "http(s)://..."  → opens external URL (new tab)
 */
export function makeCtaHandler(
  link: string | undefined | null,
  onContactClick: () => void
) {
  return (e?: React.MouseEvent) => {
    const url = (link || "").trim();

    if (!url) {
      e?.preventDefault();
      onContactClick();
      return;
    }

    if (url.startsWith("#")) {
      e?.preventDefault();
      const el = document.getElementById(url.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (url.startsWith("http")) {
      e?.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // internal path like "contact" or "/contact" — always navigate from the
    // site root so it never resolves relative to the current page.
    e?.preventDefault();
    window.location.href = normalizeInternalHref(url);
  };
}
