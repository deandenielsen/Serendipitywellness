export const siteConfig = {
  name: "Serendipity Wellness",
  tagline: "A Space to Reconnect, Restore & Thrive",
  heroEyebrow: "Yoga · Massage · Retreats",
  description:
    "A welcoming space to reconnect, restore and thrive — through movement and therapeutic care.",
  seoDescription:
    "Boutique yoga studio and massage therapy space in Edgemead, Cape Town. Yoga classes, massage, reflexology and wellness retreats for every body.",
  url: "https://serendipitywellness.co.za",
  locale: "en_ZA",
  email: "hello@serendipitywellness.co.za",
  location: {
    suburb: "Edgemead",
    city: "Cape Town",
    region: "Western Cape",
    country: "South Africa",
  },
  nav: [
    { label: "Classes", href: "/#services" },
    { label: "Studio", href: "/#studio" },
    { label: "Retreats", href: "/#retreats" },
  ],
  footerNav: [
    { label: "Classes", href: "/#services" },
    { label: "The Studio", href: "/#studio" },
    { label: "Retreats & Events", href: "/#retreats" },
    { label: "Book a Class", href: "/#contact" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
  ],
  headerCtaLabel: "Get in Touch",
  headerCtaHref: "/#contact",
  bookCtaLabel: "Book a Class",
  bookCtaHref: "/#contact",
} as const;

export type SiteConfig = typeof siteConfig;
