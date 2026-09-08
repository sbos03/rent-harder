import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Allow Payload-served media (via /api/media/...) and static /images to be
    // optimized. Omitting `search` allows any query string, including the
    // ?v=<timestamp> cache-busting param added by bustImageCache().
    localPatterns: [
      {
        pathname: "/api/media/**",
      },
      {
        pathname: "/images/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withPayload(nextConfig);
