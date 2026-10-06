import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site-config";
import { BUSINESS_ID, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/contact/";

export const metadata = pageMetadata({
  title: "Contact Serendipity Wellness | Yoga & Massage in Edgemead",
  description: `Get in touch with Serendipity Wellness in Edgemead, Cape Town about yoga classes, therapeutic massage or retreats. WhatsApp or call ${siteConfig.contact.phone}, or send us a message.`,
  path: PATH,
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${absoluteUrl(PATH)}#page`,
  url: absoluteUrl(PATH),
  name: "Contact Serendipity Wellness",
  about: { "@id": BUSINESS_ID },
  mainEntity: {
    "@id": BUSINESS_ID,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      areaServed: "ZA",
      availableLanguage: ["English"],
    },
  },
};

const details = [
  { icon: MessageCircle, label: "WhatsApp", value: siteConfig.contact.phone, href: siteConfig.contact.whatsappHref, external: true },
  { icon: Phone, label: "Phone", value: siteConfig.contact.phone, href: siteConfig.contact.phoneHref },
  { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: MapPin, label: "Studio", value: "Edgemead, Northern Suburbs, Cape Town" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          contactJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: PATH },
          ]),
        ]}
      />

      <section className="relative pt-[72px] lg:pt-[90px]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(120deg,#4f63f5_0%,#8a4fd8_45%,#ff3d7f_100%)] lg:h-[620px]"
        />
        <div className="relative px-6 pb-10 pt-16 text-center text-white lg:pt-[4vw]">
          <p className="text-[17px] tracking-[0.03em] opacity-90">Contact me with any questions you might have…</p>
          <SplitReveal
            as="h1"
            immediate
            delay={0.4}
            text="I’d love to hear from you!"
            className="mt-3 text-[36px] font-light leading-[1.2] tracking-[-0.02em] lg:text-[3.3vw]"
          />
          <p className="mt-3 text-[17px] tracking-[0.03em] opacity-90">
            Feel free to chat to me on WhatsApp, there in the bottom right corner…
          </p>
        </div>

        <div className="relative mx-auto max-w-[850px] px-4 pb-16 lg:pb-[6vw]">
          <div className="rounded-[10px] bg-white px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.16)] md:px-9 md:py-10">
            <ContactForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="details-heading" className="px-6 pb-16 sm:px-10 lg:px-[8vw] lg:pb-[5vw]">
        <h2 id="details-heading" className="sr-only">
          Contact details
        </h2>
        <ul className="mx-auto grid max-w-[1000px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value, href, external }) => {
            const body = (
              <>
                <Icon size={22} strokeWidth={1.25} className="mx-auto" />
                <p className="script-heading mt-3 text-[22px]">{label}</p>
                <p className="mt-1 text-[15px] text-ink-soft">{value}</p>
              </>
            );
            return (
              <li key={label} className="text-center">
                {href ? (
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="block rounded-[10px] p-4 transition-colors hover:bg-black/[0.03]"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="p-4">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-center text-[15px]">
          Ready to book?{" "}
          <a href={siteConfig.bookingHref} target="_blank" rel="noopener noreferrer" className="border-b border-current hover:text-brand-teal">
            Check class and treatment availability online
          </a>
        </p>
        <div className="mt-12 text-center">
          <p className="script-heading text-[28px]">Enjoyed your class or treatment?</p>
          <p className="mt-2 text-[15px] text-ink-soft">A quick Google review helps others find us.</p>
          <a
            href={siteConfig.google.reviewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full border border-black/20 px-7 py-3 text-[15px] font-medium transition-colors hover:border-black"
          >
            Leave us a Google review
          </a>
        </div>
      </section>
    </>
  );
}
