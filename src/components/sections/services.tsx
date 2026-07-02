import Link from "next/link";
import { ArrowRight, Flower2, HandHeart, Play, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const services = [
  {
    icon: Flower2,
    title: "Yoga Classes",
    description:
      "Hatha, Flow, Yin, Kids Yoga, Prenatal and more, suitable for all experience levels.",
    href: "#yoga",
  },
  {
    icon: HandHeart,
    title: "Massage & Reflexology",
    description:
      "Therapeutic massage and reflexology treatments to relieve stress, ease tension and promote deep relaxation.",
    href: "#massage",
  },
  {
    icon: Sparkles,
    title: "Wellness Events & Retreats",
    description:
      "Restorative retreats and inspiring wellness events that combine yoga, mindfulness, nature and meaningful connection.",
    href: "#retreats",
  },
];

function Services() {
  return (
    <section id="services" className="py-20 md:py-28 scroll-mt-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-eyebrow font-medium uppercase tracking-[0.08em] text-primary-strong">
            Our Services
          </span>
          <h2 className="mt-4 text-h2 font-semibold text-copy">
            Discover Our Wellness Experiences
          </h2>
          <p className="mt-4 text-body text-copy/90">
            Choose from a range of services designed to help you relax,
            recharge and reconnect.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={i * 0.1}
              className="flex flex-col items-center text-center"
            >
              <div className="relative flex aspect-square w-44 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-secondary via-secondary/60 to-surface md:w-52">
                <service.icon
                  size={56}
                  strokeWidth={1}
                  className="text-primary-strong/35"
                />
                <span className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-surface text-primary-strong shadow-[0_8px_24px_-8px_rgba(74,91,95,0.35)]">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </span>
              </div>
              <h3 className="mt-6 text-h3 font-semibold text-copy">
                {service.title}
              </h3>
              <p className="mt-3 max-w-xs text-body text-copy/85">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-4 inline-flex items-center gap-1.5 text-small font-medium text-primary-strong hover:underline"
              >
                Learn more
                <ArrowRight size={14} />
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { Services };
