import { getHomePageContent } from "@/lib/payload";
import HomeClient from "./HomeClient";

// Always render fresh so CMS edits appear immediately
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getHomePageContent();

  return <HomeClient cmsContent={content} />;
}
