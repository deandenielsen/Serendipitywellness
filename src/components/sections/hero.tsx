import Link from "next/link";
import { ArrowRight, Leaf, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

function Hero() {
  return (
    <section className="pt-6 pb-20 md:pt-10 md:pb-28">
      <Container>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-app border border-copy/20 bg-surface px-4 py-2 text-eyebrow font-medium uppercase tracking-[0.08em] text-copy">
            <MapPin size={14} className="text-primary-strong" />
            Edgemead, Cape Town
          </span>
        </Reveal>

        <Reveal delay={0.1} className="mt-4">
          <div className="relative min-h-[680px] overflow-hidden rounded-app sm:min-h-[620px] md:min-h-[calc(100vh-14rem)]">
            <ImagePlaceholder
              icon={Leaf}
              label="Studio & practice"
              className="absolute inset-0 aspect-auto h-full"
            />

            {/* Scrim keeps the overlaid copy legible once real photography lands */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-background via-background/70 to-transparent"
            />

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 p-6 sm:p-10 md:flex-row md:items-end md:justify-between md:gap-12 md:p-14">
              <div className="max-w-2xl">
                <h1 className="text-h1 font-semibold text-copy">
                  A Space to Reconnect, Restore &amp; Thrive
                </h1>
                <p className="mt-5 max-w-xl text-body text-copy/90">
                  At Serendipity Wellness, we believe true wellness comes
                  from nurturing both the body and the mind. In today&rsquo;s
                  fast-paced world, taking time to slow down, reconnect and
                  restore has never been more important.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-4">
                <Button asChild variant="ghost" className="bg-surface/80">
                  <Link href="#services">Explore Our Services</Link>
                </Button>
                <Button asChild>
                  <Link href={siteConfig.ctaHref}>
                    {siteConfig.ctaLabel}
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export { Hero };
