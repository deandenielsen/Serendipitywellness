import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${siteConfig.url}/${s.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${siteConfig.url}/schedule-and-packages/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
  ];
}
