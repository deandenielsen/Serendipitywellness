import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";

function Retreats() {
  return (
    <section id="retreats" className="py-20 md:py-28 scroll-mt-20">
      <Container>
        <div className="relative">
          <Reveal>
            <ImagePlaceholder
              icon={Sparkles}
              label="Retreats & events"
              className="aspect-16/9 md:aspect-21/9"
            />
          </Reveal>

          <Reveal delay={0.15} className="md:absolute md:inset-x-10 md:-bottom-16">
            <div className="mt-6 rounded-app bg-surface p-8 md:mt-0 md:p-12 md:shadow-[0_20px_60px_-15px_rgba(74,91,95,0.15)]">
              <span className="text-eyebrow font-medium uppercase tracking-[0.08em] text-primary-strong">
                Retreats &amp; Events
              </span>
              <h2 className="mt-4 text-h2 font-semibold text-copy">
                Wellness Retreats &amp; Events
              </h2>
              <div className="mt-6 grid gap-4 text-body text-copy/90 md:grid-cols-2">
                <p>
                  Take time out to reconnect with yourself through our
                  carefully curated wellness retreats and events. Our
                  retreats are open to everyone&mdash;no yoga experience is
                  required. Whether you&rsquo;re seeking rest, relaxation or
                  simply a change of pace, you&rsquo;ll enjoy nourishing
                  food, gentle movement, time in nature and plenty of space
                  to unwind.
                </p>
                <p>
                  We also host regular wellness events in Cape Town, often
                  featuring yoga alongside collaborations with local
                  wellness practitioners, creating opportunities to learn,
                  connect and prioritise your health in a supportive
                  community.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="h-16 md:h-24" aria-hidden />
      </Container>
    </section>
  );
}

export { Retreats };
