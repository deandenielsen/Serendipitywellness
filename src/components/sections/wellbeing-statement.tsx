"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/** Inline circular photo that opens from its centre when the statement scrolls into view. */
function InlineImage({ src, play, delay }: { src: string; play: boolean; delay: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <span className="relative mx-[0.15em] inline-block h-[1.4em] w-[1.4em] align-middle">
      <motion.img
        src={src}
        alt=""
        className="absolute inset-[6%] h-[88%] w-[88%] rounded-full object-cover"
        initial={reduceMotion ? false : { clipPath: "circle(0% at 50% 50%)", scale: 1.3 }}
        animate={play ? { clipPath: "circle(50% at 50% 50%)", scale: 1 } : undefined}
        transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], delay }}
      />
    </span>
  );
}

/** Centred statement with small round photos set into the line of text. */
function WellbeingStatement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section className="px-6 pb-[12vw] pt-[6vw] text-center">
      <motion.h2
        ref={ref}
        className="mx-auto max-w-[680px] text-[6vw] font-light leading-[1.4] tracking-[-0.03em] sm:text-[4vw] lg:max-w-[46vw] lg:text-[3vw]"
        initial={reduceMotion ? false : { opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1, ease: [0.2, 0.75, 0.25, 0.9] }}
      >
        In today’s busy world, it’s important to look after your mental
        <InlineImage src="/images/Meditation-140x140.jpg" play={inView} delay={0.4} />
        and physical
        <InlineImage src="/images/Yoga-1-140x140.jpg" play={inView} delay={0.6} />
        wellbeing!
      </motion.h2>
    </section>
  );
}

export { WellbeingStatement };
