import type { MetadataRoute } from "next";

// Canonical site URL. Keep in sync with sitemap.ts and metadataBase.
const SITE_URL = "https://www.rentharder.nl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All crawlers may index the whole site...
      { userAgent: "*", allow: "/" },
      // ...including OpenAI's search crawler (explicitly allowed).
      { userAgent: "OAI-SearchBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
