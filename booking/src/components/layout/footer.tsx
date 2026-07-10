import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

function Footer() {
  return (
    <footer className="border-t border-secondary/60 bg-surface">
      <Container className="flex flex-col items-center gap-2 py-8 text-center text-small text-copy/60">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p>
          <a
            href={siteConfig.mainSiteUrl}
            className="font-medium text-primary-strong hover:underline"
          >
            Back to main site
          </a>
          {" · "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-primary-strong hover:underline"
          >
            {siteConfig.contactEmail}
          </a>
        </p>
      </Container>
    </footer>
  );
}

export { Footer };
