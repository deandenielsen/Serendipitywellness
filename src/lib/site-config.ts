export type NavItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

export const siteConfig = {
  name: "Serendipity Wellness",
  tagline: "Yoga, Massage & Mindfulness in Edgemead, Cape Town",
  description:
    "Boutique yoga studio and therapeutic massage space in Edgemead, Cape Town. Yoga, rehabilitation and pre & post natal yoga, mindfulness, meditation and retreats.",
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
    { label: "Mindfulness & Meditation", href: "/mindfulness-meditation/" },
    { label: "Therapeutic Massage", href: "/therapeutic-massage/" },
  ] as readonly NavItem[],
  secondaryNav: [
    { label: "Schedule and Packages", href: "/schedule-and-packages/" },
    { label: "Contact", href: "/contact/" },
  ],
  privacyHref: "/privacy-policy/",
} as const;

export type SiteConfig = typeof siteConfig;
