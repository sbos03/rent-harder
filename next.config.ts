import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Recompress at quality 85 instead of the default 75, so photographic
    // backgrounds (skies, gradients) stay crisp. In Next 16 the qualities you
    // pass to <Image quality> must be whitelisted here.
    qualities: [85],
    formats: ["image/webp"],
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
