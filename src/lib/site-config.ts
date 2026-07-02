export const siteConfig = {
  name: "Serendipity Wellness",
  tagline: "A Space to Reconnect, Restore & Thrive",
  description:
    "Boutique yoga studio and massage therapy space in Edgemead, Cape Town. Yoga classes, massage, reflexology and wellness retreats for every body.",
  url: "https://serendipitywellness.co.za",
  locale: "en_ZA",
  location: {
    suburb: "Edgemead",
    city: "Cape Town",
    region: "Western Cape",
    country: "South Africa",
  },
  nav: [
    { label: "Yoga", href: "/#yoga" },
    { label: "Massage & Reflexology", href: "/#massage" },
    { label: "Retreats & Events", href: "/#retreats" },
  ],
  ctaLabel: "Begin Your Journey",
  ctaHref: "/#begin",
} as const;

export type SiteConfig = typeof siteConfig;
