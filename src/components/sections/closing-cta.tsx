import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

function ClosingCta() {
  return (
    <section id="contact" className="px-[18px] pb-[18px] scroll-mt-24">
      <div className="rounded-app bg-secondary px-6 py-20 text-center md:px-10 md:py-24">
        <div className="mx-auto max-w-[720px]">
          <Reveal>
            <span className="text-eyebrow font-medium uppercase tracking-[0.18em] text-primary-strong">
              Begin Your Journey
            </span>
            <h2 className="mt-5 text-h2 font-semibold text-copy">
              Prioritise Your Wellbeing
            </h2>
            <p className="mt-6 text-body text-copy/90">
              Life can be busy, but your health deserves your attention.
              Whether you&rsquo;re looking to improve your fitness through
              yoga, reduce stress with massage or reflexology, or simply
              create more balance in your life, Serendipity Wellness is
              here to help. Begin your journey towards better health,
              greater relaxation and lasting wellness today.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href={siteConfig.bookCtaHref}>
                  {siteConfig.bookCtaLabel}
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export { ClosingCta };
