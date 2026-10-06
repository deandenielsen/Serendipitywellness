import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match the WordPress URL style (/yoga/) so existing Google rankings and links carry over.
  trailingSlash: true,
};

export default nextConfig;
