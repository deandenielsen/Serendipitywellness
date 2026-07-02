import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col justify-center px-6 py-20 md:py-28 md:pl-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))] md:pr-12 lg:pr-16">
          <Reveal className="max-w-xl">
            <span className="text-eyebrow font-medium uppercase tracking-[0.08em] text-primary-strong">
              Edgemead, Cape Town
            </span>
            <h1 className="mt-4 text-h1 font-semibold text-copy">
              A Space to Reconnect, Restore &amp; Thrive
            </h1>
            <p className="mt-6 max-w-lg text-body text-copy/90">
              At Serendipity Wellness, we believe true wellness comes from
              nurturing both the body and the mind. In today&rsquo;s
              fast-paced world, taking time to slow down, reconnect and
              restore has never been more important.
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
        </div>

        <Reveal
          delay={0.15}
          className="relative min-h-[360px] sm:min-h-[460px] md:min-h-[640px] lg:min-h-[720px]"
        >
          <ImagePlaceholder
            icon={Leaf}
            label="Studio & practice"
            className="absolute inset-0 aspect-auto h-full rounded-none md:rounded-l-app"
          />
        </Reveal>
      </div>
    </section>
  );
}

export { Hero };
