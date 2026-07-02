import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

function IntroBand() {
  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <p className="text-h3 font-serif font-semibold text-copy">
            Based in Edgemead, Cape Town, we offer a welcoming space where you
            can improve your physical health, support your mental wellbeing,
            and find lasting relaxation through movement and therapeutic
            care.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-body text-copy/90">
            Whether you&rsquo;re looking for yoga classes, meditation, massage
            therapy, reflexology, or restorative wellness retreats, our
            holistic approach is designed to help you feel stronger, calmer
            and more balanced.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-body text-copy/90">
            No matter your age, experience or fitness level, we&rsquo;re here
            to support your wellness journey with personalised guidance in a
            peaceful and supportive environment.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

export { IntroBand };
