"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { LetterReveal } from "@/components/motion/split-reveal";

/**
 * Inner-page photo banner: dark-tinted image, large script title rising letter by letter,
 * and a thin arrow inviting the scroll. The title is the page's H1.
 */
function PageHero({ title, image, alt, nextId = "content" }: { title: string; image: string; alt: string; nextId?: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], reduceMotion ? [0, 0] : [0, 140]);

  return (
    <section className="relative flex h-[70svh] min-h-[420px] items-center justify-center overflow-hidden bg-hero text-white lg:h-[41vw] lg:min-h-[520px]">
      <motion.div
        className="absolute inset-x-0 top-0 h-[120%]"
        style={{ y: bgY }}
        initial={reduceMotion ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 bg-black/45" />

      <div className="relative px-6 pt-16 text-center">
        <LetterReveal
          as="h1"
          delay={0.7}
          stagger={0.035}
          text={title}
          className="script-heading block text-[52px] leading-[1.15] md:text-[5.2vw]"
        />
        <motion.a
          href={`#${nextId}`}
          aria-label="Scroll to content"
          className="mt-10 inline-flex text-white/90 hover:text-white"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <ArrowDown size={44} strokeWidth={0.75} />
        </motion.a>
      </div>
    </section>
  );
}

export { PageHero };
