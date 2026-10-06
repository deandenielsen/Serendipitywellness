"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Progress (0 → 1) of an element travelling from the bottom of the viewport to the top. */
function useViewportProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return { ref, progress: scrollYProgress };
}

function useShift(progress: MotionValue<number>, distance: number) {
  const reduceMotion = useReducedMotion();
  return useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [distance, -distance]);
}

/**
 * A block that drifts vertically as the page scrolls. Higher `distance` = more movement,
 * so stacking two of these with different values gives the layered collage effect.
 */
function ScrollFloat({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const { ref, progress } = useViewportProgress();
  const y = useShift(progress, distance);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Image card with its own inner parallax: the picture is taller than the frame and
 * slides inside it while scrolling.
 */
function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  distance = 40,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  distance?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const { ref, progress } = useViewportProgress();
  const y = useShift(progress, distance);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{ y, top: -distance, height: `calc(100% + ${distance * 2}px)` }}
        className="absolute inset-x-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          draggable={false}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}

export { ScrollFloat, ParallaxImage, useViewportProgress, useShift };
