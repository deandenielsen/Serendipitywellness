"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LetterReveal, SplitReveal } from "@/components/motion/split-reveal";

/**
 * Full-viewport hero: dark sunset photo fades and settles in, then the three lines of
 * copy rise into place — "Just Breathe" letter by letter.
 */
function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Gentle drift of the background as the hero scrolls away.
  const bgY = useTransform(scrollY, [0, 900], reduceMotion ? [0, 0] : [0, 180]);

  return (
    <section className="relative flex h-svh min-h-[560px] items-center justify-center overflow-hidden bg-hero text-white">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-left-top"
        style={{ backgroundImage: "url(/images/Serendipity-Wellness-Landing-Image.jpeg)", y: bgY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 1.12 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 1.2, delay: 0.2 }, scale: { duration: 2.4, ease: [0.2, 0.7, 0.2, 1] } }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/[0.62]" />

      <div className="relative px-6 text-center">
        <SplitReveal
          immediate
          delay={0.7}
          text="You're in good hands"
          className="text-[22px] leading-[1.5] md:text-[2vw]"
        />
        <LetterReveal
          as="p"
          delay={0.95}
          text="Just Breathe"
          className="script-heading my-[0.15em] block text-[64px] leading-[1.1] md:text-[8vw]"
        />
        <SplitReveal
          as="h1"
          immediate
          delay={1.5}
          text="Yoga, Massage & Mindfulness in Edgemead, Cape Town"
          className="mx-auto max-w-[22ch] font-display text-[22px] font-semibold leading-[1.5] tracking-[-0.03em] md:max-w-none md:text-[2vw]"
        />
      </div>
    </section>
  );
}

export { Hero };
