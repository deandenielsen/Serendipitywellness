import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { ParallaxImage, ScrollFloat } from "@/components/motion/parallax";
import { SplitReveal } from "@/components/motion/split-reveal";
import type { Benefit, Faq } from "@/content/services";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function BenefitPair({ benefits }: { benefits: Benefit[] }) {
  return (
    <div className="mt-9 grid gap-8 sm:grid-cols-2 sm:gap-10">
      {benefits.map((b) => (
        <div key={b.title}>
          <h3 className="script-heading text-[21px]">{b.title}:</h3>
          <p className="mt-2 text-[15px] leading-[1.7]">{b.text}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * Text beside a square photo card with a soft deep shadow. `imageSide` alternates
 * down the page; the card drifts gently on scroll.
 */
function SplitFeature({
  id,
  heading,
  headingAs = "h2",
  paragraphs,
  benefits,
  image,
  imageSide,
  children,
}: {
  id?: string;
  heading: string;
  headingAs?: "h2" | "h3";
  paragraphs: string[];
  benefits?: Benefit[];
  image: { src: string; alt: string };
  imageSide: "left" | "right";
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-6 py-16 sm:px-10 lg:px-[3.2vw] lg:py-[6vw]">
      <div
        className={cn(
          "flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[6vw]",
          imageSide === "left" && "lg:flex-row-reverse",
        )}
      >
        <div className={cn("lg:w-1/2", imageSide === "right" ? "lg:pl-[4.5vw]" : "lg:pr-[3vw]")}>
          <SplitReveal as={headingAs} text={heading} className="script-heading text-[44px] lg:text-[3.6vw]" />
          <div className="mt-5 space-y-[1.1em] text-[15px] leading-[1.7] lg:text-[1.05vw]">
            {paragraphs.map((p, i) => (
              <SplitReveal key={i} text={p} delay={0.1 + i * 0.08} lineStagger={0.05} duration={0.8} />
            ))}
          </div>
          {benefits && <BenefitPair benefits={benefits} />}
          {children}
        </div>
        <ScrollFloat distance={30} className="lg:w-1/2">
          <ParallaxImage
            src={image.src}
            alt={image.alt}
            distance={30}
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="aspect-square rounded-[10px] shadow-[0_30px_90px_rgba(0,0,0,0.16)]"
          />
        </ScrollFloat>
      </div>
    </section>
  );
}

/** Rounded gradient card over a tinted photo with a white "Contact Us" pill. */
function CtaCard({
  text,
  image,
  href = "/contact/",
  label = "Contact Us",
}: {
  text: string;
  image: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="relative px-6 pb-20 pt-10 sm:px-10 lg:px-[3.2vw] lg:pb-[3vw]">
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[#ebf0f9]" />
      <div className="relative overflow-hidden rounded-[10px] px-6 py-20 text-center text-white lg:py-[7vw]">
        <ParallaxImage src={image} alt="" distance={60} sizes="100vw" className="!absolute inset-0" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-brand-violet/85 to-brand-teal/85" />
        <div className="relative">
          <SplitReveal
            as="h2"
            text={text}
            className="mx-auto max-w-[17em] text-[28px] font-light leading-[1.25] tracking-[-0.02em] lg:text-[2.4vw]"
          />
          <Link
            prefetch={false}
            href={href}
            {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            className="mt-10 inline-flex rounded-full bg-white px-[35px] py-[13px] text-[15px] font-medium text-ink transition-transform duration-300 hover:scale-[1.04]"
          >
            {label}
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Outline pill linking to the online booking app. */
function BookingButton({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-4 rounded-full border border-black/20 px-7 py-3 text-[15px] font-medium transition-colors hover:border-black",
        className,
      )}
    >
      <ArrowRight size={20} strokeWidth={1.25} className="transition-transform group-hover:translate-x-1" />
      Check Availability
    </a>
  );
}

/** Treatment price list (massage). */
function PriceList({ items }: { items: { label: string; price: number }[] }) {
  return (
    <section id="treatments" className="scroll-mt-28 px-6 py-16 sm:px-10 lg:px-[8vw] lg:py-[5vw]">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[15px] font-medium uppercase tracking-[0.08em]">Treatments</p>
          <SplitReveal as="h2" text="Book your next treatment now" className="light-heading mt-4 max-w-[12em] text-[34px] lg:text-[2.6vw]" />
          <BookingButton className="mt-8" />
        </div>
        <dl className="divide-y divide-black/10">
          {items.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between py-5 lg:max-w-[440px]">
              <dt className="light-heading text-[32px] lg:text-[2.4vw]">{item.label}</dt>
              <dd className="text-[22px] font-light lg:text-[1.6vw]">R{item.price}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Plain-language "what to expect" block — written for people and for AI answer engines. */
function ExpectBlock({ heading, paragraphs }: { heading: string; paragraphs: string[] }) {
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-[8vw] lg:py-[5vw]">
      <div className="mx-auto max-w-[760px] text-center">
        <SplitReveal as="h2" text={heading} className="light-heading text-[34px] lg:text-[3vw]" />
        <div className="mt-6 space-y-[1.1em] text-[16px] leading-[1.75] lg:text-[1.1vw]">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/** FAQ accordion using native <details> so answers are always in the HTML for crawlers. */
function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: Faq[]; heading?: string }) {
  return (
    <section id="faq" className="scroll-mt-28 px-6 py-16 sm:px-10 lg:px-[8vw] lg:py-[5vw]">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-[6vw]">
        <div>
          <p className="script-heading text-[40px] lg:text-[3.2vw]">FAQ</p>
          <SplitReveal as="h2" text={heading} className="light-heading mt-1 text-[32px] lg:text-[2.4vw]" />
        </div>
        <div className="divide-y divide-black/10 border-y border-black/10">
          {faqs.map((f) => (
            <details key={f.question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] leading-[1.4] [&::-webkit-details-marker]:hidden lg:text-[1.3vw]">
                <h3 className="font-normal">{f.question}</h3>
                <Plus size={22} strokeWidth={1.25} className="mt-0.5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-[1.7] text-ink-soft lg:text-[1.05vw]">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export { BenefitPair, BookingButton, SplitFeature, CtaCard, PriceList, ExpectBlock, FaqList };
