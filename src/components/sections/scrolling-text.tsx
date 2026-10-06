"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Oversized outlined "just breathe" band. It drifts slowly on its own and is also pushed
 * sideways by page scroll, so it speeds up as you move past it.
 */
function ScrollingText({ text = "just breathe" }: { text?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-4%", "-22%"]);
  const words = Array.from({ length: 8 }, () => text);

  return (
    <div ref={ref} aria-hidden="true" className="relative overflow-hidden py-5">
      <motion.div style={{ x }}>
        <div className="flex w-max animate-[marquee_80s_linear_infinite] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0">
              {words.map((w, i) => (
                <span
                  key={i}
                  className="text-outline whitespace-nowrap pr-[0.3em] text-[15vw] font-light leading-none tracking-[-0.03em] lg:text-[11vw]"
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export { ScrollingText };
