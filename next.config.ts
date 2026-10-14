import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Match the WordPress URL style (/yoga/) so existing Google rankings and links carry over.
  trailingSlash: true,
  async redirects() {
    return [
      // Leftover WordPress utility pages.
      { source: "/coming-soon/", destination: "/", permanent: true },
      { source: "/maintenance/", destination: "/", permanent: true },
      // Lymphatic Drainage is hidden for now; temporary so it can come back at the same URL.
      { source: "/lymphatic-drainage-massage/", destination: "/therapeutic-massage/", permanent: false },
      // Old Yoast sitemap URLs that Google has on record.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
