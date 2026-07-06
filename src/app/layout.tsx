import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Yoga, Massage & Wellness in Edgemead, Cape Town`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
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
    description: siteConfig.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Yoga, Massage & Wellness in Edgemead, Cape Town`,
    description: siteConfig.seoDescription,
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
    description: siteConfig.seoDescription,
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
      className={`${cormorant.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-copy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
