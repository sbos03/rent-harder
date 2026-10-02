import type { MetadataRoute } from "next";
import { getPublishedPageSlugs, getPublishedPartnerSlugs } from "@/lib/payload";

// Canonical site URL. Keep in sync with metadataBase and robots.ts.
const SITE_URL = "https://www.rentharder.nl";

// Regenerate the sitemap periodically so new/edited pages appear without a redeploy.
export const revalidate = 3600; // 1 hour

function toDate(value?: string): Date {
  const d = value ? new Date(value) : new Date();
  return isNaN(d.getTime()) ? new Date() : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, partners] = await Promise.all([
    getPublishedPageSlugs(),
    getPublishedPartnerSlugs(),
  ]);

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const p of pages) {
    entries.push({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: toDate(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const p of partners) {
    entries.push({
      url: `${SITE_URL}/partners/${p.slug}`,
      lastModified: toDate(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
