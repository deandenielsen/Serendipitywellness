import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

function AboutIntro() {
  return (
    <section className="pt-24 md:pt-24">
      <Container className="grid items-center gap-14 md:grid-cols-2 md:gap-[68px]">
        <Reveal>
          <h2 className="text-h2 font-semibold text-copy">What We&rsquo;re About</h2>
          <p className="mt-5 text-body font-light text-copy/90">
            At Serendipity Wellness, we believe true wellness comes from
            nurturing both the body and the mind. In today&rsquo;s
            fast-paced world, taking time to slow down, reconnect and
            restore has never been more important. Based in Edgemead, Cape
            Town, we offer a welcoming space where you can improve your
            physical health, support your mental wellbeing, and find
            lasting relaxation through movement and therapeutic care.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="ghost" className="h-auto py-2.5">
              <Link href="/#studio">Learn More</Link>
            </Button>
            <Button asChild className="h-auto py-2.5">
              <Link href={siteConfig.bookCtaHref}>
                {siteConfig.bookCtaLabel}
              </Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ImagePlaceholder label="image placeholder" className="aspect-5/6" />
        </Reveal>
      </Container>
    </section>
  );
}

export { AboutIntro };
