"use client";

import { normalizeInternalHref } from "@/app/lib/href";

/**
 * Returns a click handler for a CTA button based on its configured link.
 *
 * Supported link values (what an editor can type in the CMS link field):
 * - empty / undefined            → opens the contact popup (onContactClick)
 * - "#anchor"                    → scrolls to that block on the CURRENT page;
 *                                  if it isn't on this page, navigates to the
 *                                  homepage anchor "/#anchor" instead
 * - "/path"  or  "path"          → navigates to that internal page (root-absolute)
 * - "/path#anchor"               → navigates to that page and scrolls to the block
 * - "http(s)://..."              → opens the external URL in a new tab
 *
 * This makes "link naar een blok" work from anywhere: a CTA that points at
 * "#methode" or "/#methode" always lands on the right section, even when the
 * button lives on a different page than the block.
 */
export function makeCtaHandler(
  link: string | undefined | null,
  onContactClick: () => void
) {
  return (e?: React.MouseEvent) => {
    const url = (link || "").trim();

    // Empty → contact popup.
    if (!url) {
      e?.preventDefault();
      onContactClick();
      return;
    }

    // External.
    if (/^https?:\/\//i.test(url)) {
      e?.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // Non-http schemes (mailto:, tel:, ...) — let the browser handle it.
    if (/^(mailto:|tel:|sms:)/i.test(url)) {
      return;
    }

    // Bare same-page anchor: "#methode".
    if (url.startsWith("#")) {
      const id = url.slice(1);
      const el = typeof document !== "undefined" ? document.getElementById(id) : null;
      if (el) {
        // The block exists on this page → smooth-scroll to it.
        e?.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // Not on this page → the block lives on the homepage. Go to "/#id".
        e?.preventDefault();
        window.location.href = `/#${id}`;
      }
      return;
    }

    // Internal path, optionally with an anchor: "/x", "x", "/x#y".
    e?.preventDefault();
    const hashIndex = url.indexOf("#");
    if (hashIndex >= 0) {
      const path = url.slice(0, hashIndex);
      const hash = url.slice(hashIndex); // includes "#"
      // If the path is just the current page (or empty), only scroll.
      const normalizedPath = normalizeInternalHref(path);
      const here =
        typeof window !== "undefined" ? window.location.pathname : "";
      if ((normalizedPath === "" || normalizedPath === here)) {
        const el =
          typeof document !== "undefined"
            ? document.getElementById(hash.slice(1))
            : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      window.location.href = `${normalizedPath || "/"}${hash}`;
      return;
    }

    // Plain internal path — always navigate from the site root.
    window.location.href = normalizeInternalHref(url);
  };
}
