import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

function ClosingCta() {
  return (
    <section id="begin" className="bg-secondary/40 py-24 md:py-32 scroll-mt-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <h2 className="text-h2 font-semibold text-copy">
            Prioritise Your Wellbeing
          </h2>
          <p className="mt-6 text-body text-copy/90">
            Life can be busy, but your health deserves your attention.
            Whether you&rsquo;re looking to improve your fitness through
            yoga, reduce stress with massage or reflexology, or simply
            create more balance in your life, Serendipity Wellness is here
            to help.
          </p>
          <p className="mt-4 text-body font-medium text-copy">
            Begin your journey towards better health, greater relaxation and
            lasting wellness today.
          </p>
          <div className="mt-10">
            <Button asChild>
              <Link href="#services">Explore Our Services</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export { ClosingCta };
