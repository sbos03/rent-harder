import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageBySlug, getSiteSettings } from "@/lib/payload";
import PageClient from "./PageClient";

// Always render fresh so CMS edits appear immediately.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

/**
 * Join the catch-all segments back into the slug as stored in Payload.
 * e.g. ["voor-wie", "hoogwerkerverhuur"] -> "voor-wie/hoogwerkerverhuur"
 */
function toSlug(segments: string[]): string {
  return (segments || []).map((s) => decodeURIComponent(s)).join("/");
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(toSlug(slug));
  if (!page) return { title: "Pagina niet gevonden — RENT HARDER" };
  return {
    title: page.seo?.metaTitle || page.title || "RENT HARDER",
    description: page.seo?.metaDescription || undefined,
    openGraph: page.seo?.ogImage?.url
      ? { images: [{ url: page.seo.ogImage.url }] }
      : undefined,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const pageSlug = toSlug(slug);

  // The homepage is served by app/(frontend)/page.tsx, not here.
  if (pageSlug === "home" || pageSlug === "") notFound();

  const [page, settings] = await Promise.all([
    getPageBySlug(pageSlug),
    getSiteSettings(),
  ]);

  if (!page) notFound();

  return <PageClient page={page} settings={settings} />;
}
