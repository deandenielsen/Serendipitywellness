import { Flower2, HandHeart, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const services = [
  {
    icon: Flower2,
    title: "Yoga Classes",
    description:
      "Hatha, Flow, Yin, Kids Yoga, Prenatal and more, suitable for all experience levels.",
  },
  {
    icon: HandHeart,
    title: "Massage & Reflexology Treatments",
    description:
      "Therapeutic massage and reflexology treatments to relieve stress, ease tension and promote deep relaxation.",
  },
  {
    icon: Sparkles,
    title: "Wellness Events & Retreats",
    description:
      "Restorative retreats and inspiring wellness events that combine yoga, mindfulness, nature and meaningful connection.",
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

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-4 rounded-app bg-surface p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-app bg-secondary text-primary-strong">
                  <service.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-h3 font-semibold text-copy">
                  {service.title}
                </h3>
                <p className="text-body text-copy/85">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { Services };
