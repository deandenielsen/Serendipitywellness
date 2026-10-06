import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { PageHero } from "@/components/sections/page-hero";
import { ScrollingText } from "@/components/sections/scrolling-text";
import {
  CtaCard,
  ExpectBlock,
  FaqList,
  PriceList,
  SplitFeature,
} from "@/components/sections/service-blocks";
import { RelatedServices } from "@/components/sections/related-services";
import { JsonLd } from "@/components/seo/json-ld";
import { BUSINESS_ID, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ service: string }> };

// Only the known service slugs are valid; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).service);
  if (!service) return {};
  return pageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/${service.slug}/`,
    image: service.hero.src,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).service);
  if (!service) notFound();

  const path = `/${service.slug}/`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.seoDescription,
    url: absoluteUrl(path),
    image: absoluteUrl(service.hero.src),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Cape Town" },
    ...(service.sections.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.name,
        itemListElement: service.sections.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.paragraphs[0] },
        })),
      },
    }),
    ...(service.pricing && {
      offers: service.pricing.map((p) => ({
        "@type": "Offer",
        name: `${service.name} (${p.label.replace("Min", "minutes")})`,
        price: p.price,
        priceCurrency: "ZAR",
      })),
    }),
  };

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd,
          faqJsonLd(service.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: service.name, path },
          ]),
        ]}
      />

      <PageHero title={service.title} image={service.hero.src} alt={service.hero.alt} />

      <div id="content" className="scroll-mt-20">
        <SplitFeature
          heading={service.intro.heading}
          paragraphs={service.intro.paragraphs}
          benefits={service.intro.benefits}
          image={service.intro.image}
          imageSide="right"
        >
          {service.jumpLinks && (
            <nav aria-label="On this page" className="mt-8 flex gap-3">
              {service.jumpLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="script-heading rounded-full border border-black/15 px-6 py-2 text-[20px] transition-colors hover:border-black"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          )}
        </SplitFeature>
      </div>

      <ScrollingText />

      {service.sections.map((section, i) => (
        <SplitFeature
          key={section.id}
          id={section.id}
          heading={section.name}
          paragraphs={section.paragraphs}
          benefits={section.benefits}
          image={section.image}
          imageSide={i % 2 === 0 ? "left" : "right"}
        />
      ))}

      {service.pricing && <PriceList items={service.pricing} />}

      <ExpectBlock heading={service.expect.heading} paragraphs={service.expect.paragraphs} />

      <FaqList faqs={service.faqs} heading={`${service.name} questions`} />

      <RelatedServices slugs={service.related} />

      <CtaCard {...service.cta} />
    </>
  );
}
