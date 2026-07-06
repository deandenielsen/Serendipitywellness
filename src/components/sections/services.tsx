import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";

const services = [
  {
    title: "Yoga Classes",
    placeholder: "yoga class",
    description:
      "Hatha, Flow, Yin, Kids Yoga, Prenatal and more, suitable for all experience levels.",
  },
  {
    title: "Massage & Reflexology Treatments",
    placeholder: "massage",
    description:
      "Therapeutic massage and reflexology treatments to relieve stress, ease tension and promote deep relaxation.",
  },
  {
    title: "Wellness Events & Retreats",
    placeholder: "retreat",
    description:
      "Restorative retreats and inspiring wellness events that combine yoga, mindfulness, nature and meaningful connection.",
  },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-[130px] scroll-mt-24">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <span className="text-eyebrow font-medium uppercase tracking-[0.18em] text-primary-strong">
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
              <div className="flex h-full flex-col rounded-app bg-background p-5 pb-7 shadow-[0_8px_28px_rgba(75,90,82,0.08)]">
                <ImagePlaceholder
                  label={service.placeholder}
                  className="aspect-4/3"
                />
                <h3 className="mt-6 text-h3 font-semibold text-copy">
                  {service.title}
                </h3>
                <p className="mt-3 text-small text-copy/85">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { Services };
