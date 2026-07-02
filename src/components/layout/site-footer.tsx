import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-secondary/60 bg-secondary/40">
      <Container className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-4 text-small text-copy/80">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <span className="text-eyebrow font-medium uppercase tracking-[0.08em] text-copy/60">
            Explore
          </span>
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-copy transition-colors hover:text-primary-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-eyebrow font-medium uppercase tracking-[0.08em] text-copy/60">
            Visit
          </span>
          <p className="text-small text-copy">
            {siteConfig.location.suburb}, {siteConfig.location.city}
          </p>
        </div>
      </Container>

      <Container className="border-t border-secondary/60 py-6">
        <p className="text-small text-copy/60">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export { SiteFooter };
