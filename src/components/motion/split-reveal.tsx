"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.2, 0.75, 0.25, 0.9] as const;

/**
 * Reveals text line by line: each word slides up from behind a mask, and words that
 * share a rendered line move together, staggered by line. Used for headings and body copy.
 */
function SplitReveal({
  text,
  as: Tag = "p",
  className,
  delay = 0,
  lineStagger = 0.09,
  duration = 0.9,
  immediate = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  lineStagger?: number;
  duration?: number;
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const words = text.split(/\s+/).filter(Boolean);
  const [lines, setLines] = useState<number[]>(() => words.map(() => 0));

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const spans = el.querySelectorAll<HTMLElement>("[data-word]");
      let line = -1;
      let lastTop = -Infinity;
      const next: number[] = [];
      spans.forEach((s) => {
        if (s.offsetTop > lastTop + 2) {
          line += 1;
          lastTop = s.offsetTop;
        }
        next.push(line);
      });
      setLines(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  const play = immediate || inView;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          <span
            data-word
            className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={reduceMotion ? false : { y: "115%" }}
              animate={play ? { y: "0%" } : undefined}
              transition={{ duration, ease: EASE, delay: delay + lines[i] * lineStagger }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** Letter-by-letter rise from below, used for the "Just Breathe" hero statement. */
function LetterReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduceMotion = useReducedMotion();
  let index = 0;

  return (
    <Tag className={cn(className)} aria-label={text}>
      {text.split(" ").map((word, w, all) => (
        <span key={w} aria-hidden="true">
          <span className="-mb-[0.2em] inline-block overflow-hidden pb-[0.2em] pr-[0.08em] align-bottom">
            {[...word].map((ch) => {
              const d = delay + index++ * stagger;
              return (
                <motion.span
                  key={`${ch}-${d}`}
                  className="inline-block will-change-transform"
                  initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1, ease: EASE, delay: d }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {w < all.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

export { SplitReveal, LetterReveal };
