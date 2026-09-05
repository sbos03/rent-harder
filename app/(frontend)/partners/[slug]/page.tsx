import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPartnerBySlug, getSiteSettings } from "@/lib/payload";
import PartnerClient from "./PartnerClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPartnerBySlug(slug);
  if (!partner) return { title: "Partner niet gevonden — RENT HARDER" };
  return {
    title: partner.seo?.metaTitle || `${partner.name} — RENT HARDER`,
    description: partner.seo?.metaDescription || partner.introDescription || undefined,
  };
}

export default async function PartnerPage({ params }: PageProps) {
  const { slug } = await params;
  const [partner, settings] = await Promise.all([
    getPartnerBySlug(slug),
    getSiteSettings(),
  ]);
  if (!partner) notFound();
  return <PartnerClient partner={partner} settings={settings} />;
}
