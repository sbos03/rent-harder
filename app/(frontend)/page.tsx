import { getHomePageContent } from "@/lib/payload";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const content = await getHomePageContent();

  return <HomeClient cmsContent={content} />;
}
