import Link from "next/link";
import { ParallaxImage } from "@/components/motion/parallax";
import { SplitReveal } from "@/components/motion/split-reveal";
import { getService } from "@/content/services";

const CARD_IMAGES: Record<string, string> = {
  yoga: "/images/Yoga.jpg",
  "therapeutic-massage": "/images/Therapeutic-Massage.jpg",
  "mindfulness-meditation": "/images/Mindfulness-Meditation.jpg",
  "pre-post-natal-yoga": "/images/Pre-_-Post-Natal-Yoga.jpg",
  "rehabilitation-yoga": "/images/Rehabilitation-Yoga.jpeg",
};

/** "Explore more" cards linking sibling services — internal links help both visitors and crawlers. */
function RelatedServices({ slugs }: { slugs: string[] }) {
  const items = slugs.map(getService).filter((s) => s !== undefined);
  return (
    <section className="px-6 py-16 sm:px-10 lg:px-[8vw] lg:py-[5vw]">
      <SplitReveal as="p" text="Explore" className="script-heading text-[40px] lg:text-[3.2vw]" />
      <SplitReveal as="h2" text="More ways we can support you" className="light-heading mt-1 text-[32px] lg:text-[3vw]" />
      <div className="mt-10 grid gap-5 sm:grid-cols-3 lg:mt-[4vw]">
        {items.map((s) => (
          <Link key={s.slug} prefetch={false} href={`/${s.slug}/`} className="group relative block overflow-hidden rounded-[10px]">
            <ParallaxImage
              src={CARD_IMAGES[s.slug]}
              alt=""
              distance={25}
              sizes="(min-width: 640px) 28vw, 90vw"
              className="aspect-[4/5] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/50" />
            <h3 className="script-heading absolute bottom-7 left-7 text-[22px] text-white">{s.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { RelatedServices };
