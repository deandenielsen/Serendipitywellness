import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** Stable identifiers so every page's structured data points at the same business entity. */
export const BUSINESS_ID = `${siteConfig.url}/#business`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

/** 1200×630 share image used when a page has no photo of its own. */
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

/** Per-page metadata with canonical URL, Open Graph and Twitter cards filled in consistently. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = [image ? { url: image } : { url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: [image ?? DEFAULT_OG_IMAGE] },
  };
}

/** Site-wide business + website entities, rendered once in the root layout. */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "SportsActivityLocation"],
        "@id": BUSINESS_ID,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: absoluteUrl("/images/Web-Logo.png"),
        image: absoluteUrl("/images/Serendipity-Wellness-About-Us.jpg"),
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        priceRange: "R",
        currenciesAccepted: "ZAR",
        sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.suburb,
          addressRegion: siteConfig.location.region,
          addressCountry: "ZA",
        },
        areaServed: [
          { "@type": "Place", name: "Edgemead" },
          { "@type": "Place", name: "Northern Suburbs, Cape Town" },
          { "@type": "City", name: siteConfig.location.city },
        ],
        knowsAbout: [
          "Hatha yoga",
          "Yin yoga",
          "Kids yoga",
          "Rehabilitation yoga",
          "Prenatal yoga",
          "Postnatal yoga",
          "Meditation",
          "Mindfulness",
          "Therapeutic massage",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": BUSINESS_ID },
        inLanguage: "en-ZA",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
