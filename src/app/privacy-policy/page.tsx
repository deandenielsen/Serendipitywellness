import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { BUSINESS_ID, absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/privacy-policy/";
const LAST_UPDATED = "6 October 2026";
const LAST_UPDATED_ISO = "2026-10-06";

export const metadata = pageMetadata({
  title: "Privacy Policy | Serendipity Wellness",
  description:
    "How Serendipity Wellness collects, uses and protects your personal information under South Africa's Protection of Personal Information Act (POPIA).",
  path: PATH,
});

const { contact } = siteConfig;

/**
 * Sections of the policy. Written for POPIA (Protection of Personal Information Act 4 of 2013).
 * Keep it in step with what the site actually does: update it if analytics, cookies or new
 * service providers are added.
 */
const sections: { id: string; heading: string; body: React.ReactNode }[] = [
  {
    id: "who-we-are",
    heading: "1. Who we are",
    body: (
      <>
        <p>
          Serendipity Wellness is a yoga and therapeutic massage studio in Edgemead, Cape Town, South Africa. We are the
          &ldquo;responsible party&rdquo; for the personal information described in this policy, as defined in the
          Protection of Personal Information Act 4 of 2013 (&ldquo;POPIA&rdquo;).
        </p>
        <p>
          If you have any questions about this policy or how we handle your information, contact our Information Officer
          at <a href={`mailto:${contact.email}`}>{contact.email}</a> or on {contact.phone}.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "2. Information we collect",
    body: (
      <>
        <p>We only collect the information we need to respond to you and provide our services:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> your name, email address, mobile number and any message you choose to send.
          </li>
          <li>
            <strong>WhatsApp, phone and email:</strong> your name, number or address, and what you tell us when you get
            in touch.
          </li>
          <li>
            <strong>Classes and treatments:</strong> details you share so we can teach or treat you safely, such as
            injuries, medical conditions or pregnancy. This is health information, which POPIA treats as special
            personal information. We only collect it with your consent and use it solely to keep your practice or
            treatment safe.
          </li>
          <li>
            <strong>Children:</strong> for Kids Yoga (ages 4 to 12) we collect information about a child only from their
            parent or legal guardian, with that person&apos;s consent.
          </li>
        </ul>
        <p>
          Bookings and payments made through our booking site,{" "}
          <a href={siteConfig.bookingHref} target="_blank" rel="noopener noreferrer">
            booking.serendipitywellness.co.za
          </a>
          , are handled as part of that service, and the information it needs is explained when you book.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "3. Cookies and analytics",
    body: (
      <p>
        This website does not use advertising or analytics cookies and does not track you across other websites. Our
        hosting provider keeps standard technical logs (such as IP address, browser type and the pages requested) for a
        short period to keep the site secure and running. If we add analytics in future, we will update this policy
        first.
      </p>
    ),
  },
  {
    id: "how-we-use",
    heading: "4. How we use your information",
    body: (
      <>
        <p>We use your personal information to:</p>
        <ul>
          <li>reply to your enquiries and messages;</li>
          <li>arrange, manage and confirm classes, treatments, retreats and events;</li>
          <li>adapt classes and treatments to your health and safety needs;</li>
          <li>keep records required for our business, tax and legal obligations.</li>
        </ul>
        <p>
          We process your information because you have consented, because it is needed to provide a service you asked
          for, or because we have a legitimate interest in running our studio, as permitted by section 11 of POPIA. We do
          not sell your information or send you marketing unless you have asked to receive it, and you can opt out at any
          time.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "5. Who we share it with",
    body: (
      <>
        <p>We share personal information only with trusted service providers who help us run the website and studio:</p>
        <ul>
          <li>
            <strong>Vercel</strong>, which hosts this website;
          </li>
          <li>
            <strong>Resend</strong>, which delivers contact form messages to our inbox;
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong>, if you choose to message us there.
          </li>
        </ul>
        <p>
          These providers may store or process information outside South Africa, including in the United States. Where
          this happens, we rely on providers bound by data protection terms that offer protection comparable to POPIA, as
          required by section 72. We may also disclose information where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    heading: "6. How long we keep it",
    body: (
      <p>
        We keep personal information only for as long as we need it for the purposes above, or as long as the law
        requires (for example, financial records). Enquiries that do not lead to a booking are deleted when they are no
        longer needed. Health information is kept only while you attend classes or treatments with us, unless you ask us
        to delete it sooner.
      </p>
    ),
  },
  {
    id: "security",
    heading: "7. Keeping it safe",
    body: (
      <p>
        We take reasonable technical and organisational measures to protect your information against loss, misuse and
        unauthorised access, including encrypted connections (HTTPS) on this website and restricted access to our
        records. If a security breach affects your information, we will notify you and the Information Regulator as
        required by POPIA.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "8. Your rights",
    body: (
      <>
        <p>Under POPIA you have the right to:</p>
        <ul>
          <li>ask whether we hold personal information about you, and request a copy of it;</li>
          <li>ask us to correct or update information that is wrong or out of date;</li>
          <li>ask us to delete information we no longer have a lawful reason to keep;</li>
          <li>object to how we process your information, or withdraw your consent at any time;</li>
          <li>
            lodge a complaint with the Information Regulator of South Africa (
            <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">
              inforegulator.org.za
            </a>
            ).
          </li>
        </ul>
        <p>
          To use any of these rights, email <a href={`mailto:${contact.email}`}>{contact.email}</a>. We will respond
          within a reasonable time and may need to confirm your identity first.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "9. Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The latest version will always be on this page, with the date it was
        last updated at the top.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "10. Contact us",
    body: (
      <p>
        Serendipity Wellness, Edgemead, Cape Town, Western Cape, South Africa.
        <br />
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <br />
        Phone / WhatsApp: <a href={contact.phoneHref}>{contact.phone}</a>
        <br />
        Or use our{" "}
        <Link prefetch={false} href="/contact/">
          contact form
        </Link>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${absoluteUrl(PATH)}#page`,
            url: absoluteUrl(PATH),
            name: "Privacy Policy",
            dateModified: LAST_UPDATED_ISO,
            publisher: { "@id": BUSINESS_ID },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: PATH },
          ]),
        ]}
      />

      <article className="px-6 pb-20 pt-[120px] sm:px-10 lg:pb-[6vw] lg:pt-[170px]">
        <div className="mx-auto max-w-[760px]">
          <p className="script-heading text-[40px] lg:text-[3.2vw]">Privacy</p>
          <h1 className="light-heading mt-1 text-[38px] lg:text-[3.3vw]">Privacy Policy</h1>
          <p className="mt-4 text-[15px] text-ink-soft">Last updated: {LAST_UPDATED}</p>
          <p className="mt-8 text-[16px] leading-[1.75]">
            Your privacy matters to us. This policy explains what personal information Serendipity Wellness collects
            when you use this website or our services, why we collect it, and how we protect it, in line with South
            Africa&apos;s Protection of Personal Information Act (POPIA).
          </p>

          <nav aria-label="Contents" className="mt-10 rounded-[10px] bg-black/[0.03] px-6 py-5">
            <p className="text-[14px] font-medium uppercase tracking-[0.08em]">Contents</p>
            <ol className="mt-3 grid gap-1.5 text-[15px] sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-brand-teal">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12 text-[16px] leading-[1.75] [&_a]:border-b [&_a]:border-current [&_a:hover]:text-brand-teal [&_li]:mt-2 [&_p+p]:mt-4 [&_p+ul]:mt-3 [&_ul+p]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="light-heading text-[28px] lg:text-[2vw]">{s.heading}</h2>
                <div className="mt-4">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
