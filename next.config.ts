import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Needed for a styled 404 with several root layouts ((en), (ar), (deck)).
    globalNotFound: true,
  },
};

export default nextConfig;
