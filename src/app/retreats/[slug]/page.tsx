import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarPlus, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getRetreat, retreats } from "@/content/retreats";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ParallaxImage, ScrollFloat } from "@/components/motion/parallax";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbJsonLd, pageMetadata, retreatEventJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return retreats.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const retreat = getRetreat((await params).slug);
  if (!retreat) return {};
  return pageMetadata({
    title: retreat.seoTitle,
    description: retreat.seoDescription,
    path: `/retreats/${retreat.slug}/`,
    image: retreat.hero.src,
  });
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--retreat-slate)]">{children}</p>;
}

export default async function RetreatPage({ params }: Props) {
  const retreat = getRetreat((await params).slug);
  if (!retreat) notFound();

  const path = `/retreats/${retreat.slug}/`;
  const { venue } = retreat;
  const whatsapp = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(retreat.whatsappMessage)}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;

  return (
    <>
      <JsonLd
        data={[
          retreatEventJsonLd(retreat),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Retreats", path: "/retreats/" },
            { name: retreat.name, path },
          ]),
        ]}
      />

      {/* Hero, after the flyer: photo washed with slate, editorial serif headline. */}
      <section className="relative flex min-h-[640px] items-end overflow-hidden bg-[var(--retreat-slate-dark)] text-white lg:min-h-[max(720px,92svh)]">
        <Image
          src={retreat.hero.src}
          alt={retreat.hero.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          style={retreat.hero.position ? { objectPosition: retreat.hero.position } : undefined}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(52,68,74,0.94)_0%,rgba(70,88,94,0.82)_42%,rgba(70,88,94,0.25)_100%)]"
        />
        <div className="relative w-full px-6 pb-16 pt-36 sm:px-10 lg:px-[8vw] lg:pb-[6vw]">
          <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-white/85">{retreat.eyebrow}</p>
          <h1 className="retreat-serif mt-5 text-[64px] leading-[0.95] sm:text-[84px] lg:text-[7.4vw]">
            <SplitReveal as="span" immediate delay={0.5} text={retreat.headline[0]} className="block" />
            <SplitReveal
              as="span"
              immediate
              delay={0.75}
              text={retreat.headline[1]}
              className="block italic text-[var(--retreat-mist)]"
            />
          </h1>
          <p className="mt-7 max-w-[560px] text-[17px] leading-[1.6] text-white/90 lg:text-[19px]">{retreat.intro}</p>
          <p className="mt-6 flex items-center gap-2.5 text-[16px] font-medium">
            <MapPin size={18} strokeWidth={1.75} />
            {venue.name}, {venue.area}
          </p>
        </div>
      </section>

      <div className="bg-[var(--retreat-paper)] text-[var(--retreat-slate-dark)]">
        {/* When / time / investment */}
        <section aria-label="Retreat details" className="px-6 sm:px-10 lg:px-[8vw]">
          <dl className="grid gap-10 border-b border-[var(--retreat-sage)]/40 py-14 sm:grid-cols-3 lg:py-[4vw]">
            {[
              { label: "When", value: retreat.when.short, note: retreat.when.long },
              { label: "Time", value: retreat.time.short, note: retreat.time.note },
              { label: "Investment", value: `R${retreat.price.amount.toLocaleString("en-ZA")}`, note: retreat.price.note },
            ].map((item) => (
              <div key={item.label}>
                <dt>
                  <Label>{item.label}</Label>
                </dt>
                <dd className="retreat-serif mt-3 text-[46px] leading-none lg:text-[3.4vw]">{item.value}</dd>
                <dd className="mt-3 text-[15px] text-[var(--retreat-slate)]">{item.note}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* What to expect */}
        <section className="px-6 py-16 sm:px-10 lg:px-[8vw] lg:py-[5vw]">
          <SplitReveal as="h2" text="What to expect" className="retreat-serif text-[52px] leading-none lg:text-[4.2vw]" />
          <ul className="mt-10 grid gap-x-16 gap-y-9 sm:grid-cols-2 lg:mt-[3vw]">
            {retreat.expect.map((item) => (
              <li key={item.title} className="flex gap-5">
                <span aria-hidden="true" className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[var(--retreat-sage)]" />
                <div>
                  <h3 className="text-[22px] font-medium leading-[1.3] lg:text-[24px]">{item.title}</h3>
                  <p className="mt-1 text-[16px] text-[var(--retreat-slate)]">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* The venue */}
        <section className="px-6 pb-16 sm:px-10 lg:px-[8vw] lg:pb-[5vw]">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-[5vw]">
            <div>
              <Label>The venue</Label>
              <SplitReveal as="h2" text={venue.name} className="retreat-serif mt-4 text-[48px] leading-none lg:text-[3.8vw]" />
              <p className="mt-6 text-[16px] leading-[1.75]">{venue.description}</p>
              <address className="mt-6 text-[15px] not-italic leading-[1.7] text-[var(--retreat-slate)]">
                {venue.street}, {venue.area}, {venue.city}
              </address>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-medium">
                <a href={directions} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-current pb-0.5 hover:opacity-70">
                  <MapPin size={16} /> Get directions
                </a>
                {venue.website && (
                  <a href={venue.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-current pb-0.5 hover:opacity-70">
                    <ExternalLink size={16} /> Venue website
                  </a>
                )}
              </div>
            </div>

            {retreat.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4 lg:gap-5">
                {retreat.gallery.slice(0, 4).map((img, i) => (
                  <ScrollFloat key={img.src} distance={i % 2 === 0 ? 20 : 45} className={cn(i % 2 === 1 && "translate-y-8")}>
                    <ParallaxImage
                      src={img.src}
                      alt={img.alt}
                      distance={20}
                      sizes="(min-width: 1024px) 26vw, 45vw"
                      className="aspect-[4/5] rounded-[10px] shadow-[0_24px_60px_rgba(52,68,74,0.18)]"
                    />
                  </ScrollFloat>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Reserve */}
        <section id="reserve" className="scroll-mt-28 px-4 pb-20 sm:px-10 lg:px-[8vw] lg:pb-[6vw]">
          <div className="rounded-[18px] bg-[var(--retreat-mist)] px-6 py-12 text-center sm:px-12 lg:py-[4vw]">
            <SplitReveal as="h2" text="Reserve your place" className="retreat-serif text-[52px] leading-none lg:text-[4.2vw]" />
            <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-[1.7]">
              Message us on WhatsApp to reserve your spot, or get in touch with any questions about the day.
            </p>
            <div className="mx-auto mt-8 flex max-w-[560px] flex-col gap-3 sm:flex-row">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-[12px] bg-[var(--retreat-slate)] px-6 py-4 text-[16px] font-medium text-white transition-colors hover:bg-[var(--retreat-slate-dark)]"
              >
                <MessageCircle size={19} /> Reserve on WhatsApp
              </a>
              <Link
                prefetch={false}
                href="/contact/"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-[12px] border border-[var(--retreat-slate)]/40 px-6 py-4 text-[16px] font-medium transition-colors hover:border-[var(--retreat-slate)]"
              >
                <Mail size={18} /> Send us a message
              </Link>
            </div>
            <p className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px]">
              <a href={siteConfig.contact.phoneHref} className="inline-flex items-center gap-1.5 hover:opacity-70">
                <Phone size={15} /> {siteConfig.contact.phone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-1.5 hover:opacity-70">
                <Mail size={15} /> {siteConfig.contact.email}
              </a>
              <a href={`/retreats/${retreat.slug}/calendar.ics`} className="inline-flex items-center gap-1.5 hover:opacity-70">
                <CalendarPlus size={15} /> Add to calendar
              </a>
            </p>
          </div>

          <Link
            prefetch={false}
            href="/retreats/"
            className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium hover:opacity-70"
          >
            <ArrowLeft size={16} /> All retreats
          </Link>
        </section>
      </div>
    </>
  );
}
