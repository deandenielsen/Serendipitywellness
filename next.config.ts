import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match the WordPress URL style (/yoga/) so existing Google rankings and links carry over.
  trailingSlash: true,
  async redirects() {
    return [
      // Leftover WordPress utility pages.
      { source: "/coming-soon/", destination: "/", permanent: true },
      { source: "/maintenance/", destination: "/", permanent: true },
      // Retreats page is on hold until the next retreat is announced; temporary so Google keeps the URL.
      { source: "/retreats/", destination: "/contact/", permanent: false },
    ];
  },
};

export default nextConfig;
