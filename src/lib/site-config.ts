import { retreats } from "@/content/retreats";

// While there's only one retreat the menu goes straight to it; once more are added, to the list.
// (Based on the content rather than today's date so the server and browser always agree.)
const retreatsHref = retreats.length === 1 ? `/retreats/${retreats[0].slug}/` : "/retreats/";

export type NavItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

export const siteConfig = {
  name: "Serendipity Wellness",
  founder: {
    name: "Kerry Nielsen",
    jobTitle: "Founder, yoga teacher and therapeutic massage therapist",
    credentials: ["200-hour yoga teacher training", "50-hour kids yoga teacher training"],
    yearsExperience: 10,
  },
  tagline: "Yoga, Massage & Mindfulness in Edgemead, Cape Town",
  description:
    "Small-group yoga (max 5 per class), therapeutic massage, reflexology and mindfulness in a calm home studio in Edgemead, Cape Town.",
  url: "https://serendipitywellness.co.za",
  locale: "en_ZA",
  location: {
    suburb: "Edgemead",
    city: "Cape Town",
    region: "Western Cape",
    country: "South Africa",
  },
  contact: {
    phone: "+27 79 085 6100",
    phoneHref: "tel:+27790856100",
    whatsappHref: "https://wa.me/27790856100",
    email: "info@serendipitywellness.co.za",
  },
  bookingHref: "https://booking.serendipitywellness.co.za/",
  social: {
    facebook: "https://www.facebook.com/serendipitywellnesscpt",
    instagram: "https://www.instagram.com/serendipitywellnesscpt/",
  },
  // Google Business Profile. kgmid is Google's Knowledge Graph ID for the business.
  google: {
    profileHref: "https://share.google/IvANP8pmJfdUYsKih",
    kgmid: "/g/11nqdddr3j",
    reviewHref: "https://g.page/r/CTGVWfQ5uomDEAI/review",
  },
  // Paths mirror the existing WordPress site so URLs carry over when those pages are rebuilt.
  nav: [
    {
      label: "Yoga",
      href: "/yoga/",
      children: [
        { label: "Yoga", href: "/yoga/" },
        { label: "Rehabilitation Yoga", href: "/rehabilitation-yoga/" },
        { label: "Pre & Post Natal Yoga", href: "/pre-post-natal-yoga/" },
      ],
    },
    { label: "Therapeutic Massage", href: "/therapeutic-massage/" },
    { label: "Reflexology", href: "/reflexology/" },
    { label: "Mindfulness & Meditation", href: "/mindfulness-meditation/" },
  ] as readonly NavItem[],
  secondaryNav: [
    { label: "Retreats", href: retreatsHref },
    { label: "Schedule and Packages", href: "/schedule-and-packages/" },
    { label: "Contact", href: "/contact/" },
  ],
  privacyHref: "/privacy-policy/",
} as const;

export type SiteConfig = typeof siteConfig;
