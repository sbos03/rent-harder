import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Serve images exactly as uploaded — no re-encoding, no quality loss.
    // Next's optimizer otherwise recompresses everything (default WebP q75),
    // which is what made photos look blurry/compressed. With this off, the
    // browser gets the original file bytes.
    unoptimized: true,
    // Allow Payload-served media (via /api/media/...) and static /images.
    // Omitting `search` allows any query string, including the
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
