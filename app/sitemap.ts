import type { MetadataRoute } from "next";
import { getPublishedPageSlugs, getPublishedPartnerSlugs } from "@/lib/payload";
import { cleanSitemapSlug } from "@/app/lib/sitemapSlug";

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

  // Dedupe by final URL so a page and partner can never collide / repeat.
  const seen = new Set<string>([`${SITE_URL}/`]);

  for (const p of pages) {
    const slug = cleanSitemapSlug(p.slug);
    if (!slug) continue;
    const url = `${SITE_URL}/${slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      lastModified: toDate(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const p of partners) {
    const slug = cleanSitemapSlug(p.slug);
    if (!slug) continue;
    const url = `${SITE_URL}/partners/${slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      lastModified: toDate(p.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
