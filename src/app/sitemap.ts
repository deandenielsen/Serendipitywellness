import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";
import { retreats } from "@/content/retreats";

/** Image entries help pages show up in Google Images. */
const img = (path: string) => `${siteConfig.url}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        img("/images/Serendipity-Wellness-Landing-Image.jpeg"),
        img("/images/kerry-nielsen-yoga-teacher-edgemead.jpg"),
        img("/images/yoga-studio-edgemead.jpg"),
        img("/images/kerry-nielsen-savasana-edgemead-yoga-studio.jpg"),
        img("/images/serendipity-wellness-studio-edgemead.jpg"),
        img("/images/massage-studio-edgemead.jpg"),
      ],
    },
    ...services.map((s) => ({
      url: `${siteConfig.url}/${s.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [img(s.hero.src), img(s.intro.image.src)],
    })),
    {
      url: `${siteConfig.url}/schedule-and-packages/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [img("/images/services/schedule-hero.jpeg")],
    },
    { url: `${siteConfig.url}/retreats/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    ...retreats.map((r) => ({
      url: `${siteConfig.url}/retreats/${r.slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [img(r.hero.src), ...r.gallery.map((g) => img(g.src))],
    })),
    { url: `${siteConfig.url}/contact/`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteConfig.url}/privacy-policy/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
