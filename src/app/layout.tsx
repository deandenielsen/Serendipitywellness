import type { Metadata } from "next";
import { Playball, Public_Sans, Urbanist } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageLoader } from "@/components/layout/page-loader";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const playball = Playball({
  variable: "--font-playball",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Yoga, Massage & Wellness in Edgemead, Cape Town`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "yoga",
    "yoga studio",
    "wellness",
    "mental wellbeing",
    "massage",
    "reflexology",
    "yoga classes",
    "wellness retreats",
    "Cape Town",
    "Edgemead",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Yoga, Massage & Wellness in Edgemead, Cape Town`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Yoga, Massage & Wellness in Edgemead, Cape Town`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: siteConfig.name,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
    description: siteConfig.description,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.suburb,
      addressRegion: siteConfig.location.region,
      addressCountry: "ZA",
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.location.city,
    },
  };

  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${playball.variable} ${urbanist.variable} antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
        <PageLoader />
      </body>
    </html>
  );
}
