import Link from "next/link";
import { SplitReveal } from "@/components/motion/split-reveal";
import { WaveButton } from "@/components/ui/wave-button";
import { siteConfig } from "@/lib/site-config";
import { CookieSettingsLink } from "@/components/layout/cookie-settings-link";

function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact, location } = siteConfig;
  // Every service page plus the timetable, linked from every page.
  const services = [
    ...siteConfig.nav.flatMap((item) => item.children ?? [item]),
    ...siteConfig.secondaryNav.filter((item) => item.href !== "/contact/"),
  ];

  return (
    <footer className="bg-page">
      <div className="px-6 sm:px-10 lg:px-[3.2vw]">
        <hr className="border-ink/10" />
      </div>

      <div className="grid gap-12 px-6 py-14 sm:px-10 md:grid-cols-2 lg:grid-cols-[36fr_22fr_16fr_26fr] lg:gap-x-0 lg:px-[8vw] lg:py-[4vw]">
        <div>
          <SplitReveal
            as="h2"
            text="Start your wellness journey today!"
            className="max-w-[340px] font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] lg:text-[30px]"
          />
          <WaveButton href="/contact/" label="Contact Us" className="mt-[35px]" />
        </div>

        <nav aria-label="Services">
          <h3 className="script-heading text-[22px]">Services</h3>
          <ul className="mt-3 space-y-1 text-[15px] leading-[1.6] text-ink-soft">
            {services.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href} className="hover:text-brand-deep">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="script-heading text-[22px]">Address</h3>
          <address className="mt-3 text-[15px] not-italic leading-[1.6]">
            {location.suburb}
            <br />
            {location.region}
            <br />
            {location.country}
          </address>
        </div>

        <div>
          <h3 className="script-heading text-[22px]">Connect</h3>
          <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
            T: <a href={contact.phoneHref} className="hover:text-brand-deep">{contact.phone}</a>
            <br />
            E: <a href={`mailto:${contact.email}`} className="hover:text-brand-deep">{contact.email}</a>
            <br />
            <a
              href={siteConfig.google.profileHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-deep"
            >
              Find us on Google
            </a>
            <br />
            <a
              href={siteConfig.google.reviewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-deep"
            >
              Leave a review
            </a>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pb-7 text-[17px] leading-[26px] sm:px-10 lg:px-[8vw]">
        <p>
          © {year} {siteConfig.name}
        </p>
        <div className="flex gap-6">
          <CookieSettingsLink className="border-b border-current pb-px hover:text-brand-deep" />
          <Link prefetch={false} href={siteConfig.privacyHref} className="border-b border-current pb-px hover:text-brand-deep">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
