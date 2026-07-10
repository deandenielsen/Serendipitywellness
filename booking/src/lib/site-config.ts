export const siteConfig = {
  name: "Serendipity Wellness",
  tagline: "A Space to Reconnect, Restore & Thrive",
  description:
    "Book yoga classes at Serendipity Wellness — boutique yoga studio and massage therapy space in Edgemead, Cape Town.",
  /** The booking app's own URL (the subdomain in production). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** The main marketing site this app is a subdomain of. */
  mainSiteUrl: "https://serendipitywellness.co.za",
  /** PLACEHOLDER — set the studio's real enquiries address. */
  contactEmail: "hello@serendipitywellness.co.za",
  locale: "en_ZA",
} as const;

export type SiteConfig = typeof siteConfig;
