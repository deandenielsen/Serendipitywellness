import Link from "next/link";
import { LogoFull } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <Container className="py-20 md:py-24">
        <div className="grid gap-12 border-b border-secondary pb-12 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12">
          <div>
            <LogoFull />
            <p className="mt-5 max-w-[320px] text-small font-light text-copy/90">
              {siteConfig.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <span className="text-eyebrow font-medium uppercase tracking-[0.14em] text-primary-strong">
              Explore
            </span>
            <div className="mt-4 flex flex-col gap-3">
              {siteConfig.footerNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-small text-copy transition-colors hover:text-primary-strong"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <span className="text-eyebrow font-medium uppercase tracking-[0.14em] text-primary-strong">
              Visit &amp; Connect
            </span>
            <div className="mt-4 flex flex-col gap-3 text-small text-copy">
              <span>
                {siteConfig.location.suburb}, {siteConfig.location.city}
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-primary-strong"
              >
                {siteConfig.email}
              </a>
              {siteConfig.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="transition-colors hover:text-primary-strong"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-7 text-small text-copy/60">
          &copy; {year} {siteConfig.name} &middot; {siteConfig.location.suburb},{" "}
          {siteConfig.location.city}
        </p>
      </Container>
    </footer>
  );
}

export { SiteFooter };
