import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { isFullyBooked, upcomingRetreats } from "@/content/retreats";
import { SplitReveal } from "@/components/motion/split-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/retreats/";

// Rebuild daily so finished retreats drop off the list on their own.
export const revalidate = 86400;

const HERO = {
  src: "/images/retreats/cape-mountains-yoga-retreat.jpg",
  alt: "Yoga mats and a meditation cushion on a deck overlooking misty mountains in the Western Cape",
};

export const metadata = pageMetadata({
  title: "Yoga & Wellness Retreats in Cape Town & the Western Cape",
  description:
    "Upcoming yoga and wellness retreats with Serendipity Wellness: half-day retreats in Cape Town and weekend retreats in the Western Cape mountains, with yoga, sound baths, good food and time to rest. See dates, venues and prices.",
  path: PATH,
  image: HERO.src,
});

export default function RetreatsPage() {
  const upcoming = upcomingRetreats();

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Upcoming Serendipity Wellness retreats",
            itemListElement: upcoming.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/retreats/${r.slug}/`),
              name: r.name,
            })),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Retreats", path: PATH },
          ]),
        ]}
      />

      <div className="bg-[var(--retreat-paper)] text-[var(--retreat-slate-dark)]">
        <section className="relative flex min-h-[600px] items-end overflow-hidden bg-[var(--retreat-slate-dark)] text-white lg:min-h-[max(640px,72svh)]">
          <Image
            src={HERO.src}
            alt={HERO.alt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
            // On narrow screens keep the mountains and the mats in view.
            style={{ objectPosition: "72% center" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(100deg,rgba(58,72,76,0.92)_0%,rgba(74,91,95,0.72)_40%,rgba(74,91,95,0.15)_100%)]"
          />
          {/* Soft fade along the top so the menu stays readable over the bright peaks. */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-hero/60 to-transparent" />
          <div className="relative w-full px-6 pb-16 pt-40 sm:px-10 lg:px-[8vw] lg:pb-[5vw]">
            <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-white/80">Serendipity Wellness</p>
            <h1 className="retreat-serif mt-5 text-[72px] leading-[0.95] sm:text-[96px] lg:text-[8vw]">
              <SplitReveal as="span" immediate delay={0.5} text="Retreats" className="block" />
            </h1>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.65] text-white/90 lg:text-[19px]">
              Step away from everyday life for a morning or a whole weekend. Our retreats bring together yoga, deep rest,
              mindful talks, good food and good company in beautiful, peaceful venues around Cape Town and the Western Cape.
            </p>
          </div>
        </section>

        <section aria-labelledby="upcoming-heading" className="px-6 py-16 sm:px-10 lg:px-[8vw] lg:py-[5vw]">
          <h2 id="upcoming-heading" className="text-[12px] font-medium uppercase tracking-[0.22em] text-[var(--retreat-slate)]">
            Upcoming retreats
          </h2>

          {upcoming.length > 0 ? (
            // Wide cards stacked soonest-first; the list stays short, so each retreat gets room.
            <ul className="mt-8 grid gap-8">
              {upcoming.map((r) => (
                <li key={r.slug}>
                  <Link
                    prefetch={false}
                    href={`/retreats/${r.slug}/`}
                    className="group block h-full overflow-hidden rounded-[14px] bg-white shadow-[0_20px_50px_rgba(58,72,76,0.10)] transition-shadow duration-500 hover:shadow-[0_28px_70px_rgba(58,72,76,0.18)] md:grid md:grid-cols-[1.15fr_1fr]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px]">
                      <Image
                        src={r.hero.src}
                        alt={r.hero.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 90vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        style={r.hero.position ? { objectPosition: r.hero.position } : undefined}
                      />
                      <p className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-[13px] font-medium">
                        {r.when.short}
                      </p>
                      {isFullyBooked(r) && (
                        <p className="absolute right-4 top-4 rounded-full bg-[var(--retreat-slate-dark)] px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
                          Fully booked
                        </p>
                      )}
                    </div>
                    <div className="p-6 md:flex md:flex-col md:justify-center lg:p-12">
                      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--retreat-slate)]">{r.eyebrow}</p>
                      <h3 className="retreat-serif mt-3 text-[34px] leading-[1.05] lg:text-[52px]">
                        {r.headline[0]} <em>{r.headline[1]}</em>
                      </h3>
                      <p className="mt-4 flex items-center gap-2 text-[15px] text-[var(--retreat-slate)]">
                        <MapPin size={15} /> {r.venue.name}, {r.venue.area}
                      </p>
                      <p className="mt-1 text-[15px] text-[var(--retreat-slate)]">
                        {r.when.long} · {r.time.short}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-[var(--retreat-sage)]/40 pt-5">
                        <p className="retreat-serif text-[30px] leading-none">
                          {r.price.options && <span className="text-[20px]">From </span>}R{r.price.amount.toLocaleString("en-ZA")}
                        </p>
                        <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                          View retreat
                          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-[14px] bg-[var(--retreat-mist)] px-6 py-12 text-center">
              <p className="retreat-serif text-[40px] leading-none">New dates coming soon</p>
              <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-[1.7]">
                We&apos;re planning our next retreats. Message us on WhatsApp to be the first to hear when bookings open.
              </p>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2.5 rounded-[12px] bg-[var(--retreat-slate)] px-6 py-4 text-[16px] font-medium text-white hover:bg-[var(--retreat-slate-dark)]"
              >
                <MessageCircle size={19} /> Keep me posted
              </a>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
