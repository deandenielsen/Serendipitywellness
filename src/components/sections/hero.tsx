import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <Container className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
        <Reveal>
          <span className="text-eyebrow font-medium uppercase tracking-[0.08em] text-primary-strong">
            Edgemead, Cape Town
          </span>
          <h1 className="mt-4 text-h1 font-semibold text-copy">
            A Space to Reconnect, Restore &amp; Thrive
          </h1>
          <p className="mt-6 text-body text-copy/90">
            At Serendipity Wellness, we believe true wellness comes from
            nurturing both the body and the mind. In today&rsquo;s fast-paced
            world, taking time to slow down, reconnect and restore has never
            been more important.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild>
              <Link href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#services">Explore Our Services</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ImagePlaceholder icon={Leaf} label="Studio & practice" />
        </Reveal>
      </Container>
    </section>
  );
}

export { Hero };
