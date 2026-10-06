"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, useMotionValue, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ParallaxImage } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

const AREAS = [
  { label: "Yoga", src: "/images/Yoga.jpg", href: "/yoga/" },
  { label: "Therapeutic Massage", src: "/images/Therapeutic-Massage.jpg", href: "/therapeutic-massage/" },
  { label: "Mindfulness & Meditation", src: "/images/Mindfulness-Meditation.jpg", href: "/mindfulness-meditation/" },
  { label: "Pre / Post Natal Yoga", src: "/images/Pre-_-Post-Natal-Yoga.jpg", href: "/pre-post-natal-yoga/" },
  { label: "Rehabilitation Yoga", src: "/images/Rehabilitation-Yoga.jpeg", href: "/rehabilitation-yoga/" },
];

const COUNT = AREAS.length;
const GAP = 20;
const AUTOPLAY_MS = 4500;
// Three copies of the cards: the middle set is the "real" one, the outer sets let the
// row keep sliding in either direction before it silently jumps back to the middle.
const SLIDES = [...AREAS, ...AREAS, ...AREAS];

const wrap = (i: number) => ((i % COUNT) + COUNT) % COUNT;

/**
 * "Expertise" carousel: an endless row of tall cards that auto-advances, with
 * previous / next arrows, position dots and a pause button underneath. Swipe and
 * drag still work, but nothing depends on people knowing that.
 */
function Expertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const index = useRef(COUNT); // position within SLIDES
  const stepWidth = useRef(0);
  const dragged = useRef(false);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false); // chosen with the pause button
  const [holding, setHolding] = useState(false); // hover / focus / drag
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.3 });

  /** Moves `delta` cards along (negative = backwards). */
  const move = useCallback(
    (delta: number, instant = false) => {
      // If the row is resting in (or heading for) an outer copy, shift it by one whole set
      // first. That looks identical, and keeps rapid clicks from running off the end.
      const set = COUNT * stepWidth.current;
      if (index.current < COUNT) {
        index.current += COUNT;
        x.set(x.get() - set);
      } else if (index.current >= COUNT * 2) {
        index.current -= COUNT;
        x.set(x.get() + set);
      }

      const target = index.current + delta;
      index.current = target;
      setActive(wrap(target));
      const to = -target * stepWidth.current;
      if (instant || reduceMotion) x.set(to);
      else animate(x, to, { type: "spring", stiffness: 140, damping: 26 });
    },
    [reduceMotion, x],
  );

  const step = useCallback((dir: 1 | -1) => move(dir), [move]);

  // Keep the row aligned when the card width changes.
  useEffect(() => {
    const measure = () => {
      if (!cardRef.current) return;
      stepWidth.current = cardRef.current.offsetWidth + GAP;
      x.set(-index.current * stepWidth.current);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  // Auto-advance while the section is on screen and nobody is interacting with it.
  const autoplay = !paused && !holding && inView && !reduceMotion;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => step(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay, step]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setHolding(false);
    setTimeout(() => (dragged.current = false), 0);
    const w = stepWidth.current || 1;
    const moved = Math.round(-(info.offset.x + info.velocity.x * 0.2) / w);
    const clamped = Math.max(-COUNT + 1, Math.min(COUNT - 1, moved));
    move(clamped);
  };

  return (
    <section ref={sectionRef} id="expertise" aria-roledescription="carousel" aria-label="Areas we specialise in" className="relative overflow-hidden pb-6 pt-24 lg:pt-[3vw]">
      <div className="px-6 sm:px-10 lg:px-[8vw]">
        <SplitReveal as="h2" text="Expertise" className="script-heading text-[40px] lg:text-[3.2vw]" />
        <SplitReveal
          as="h3"
          delay={0.1}
          text="Areas that we specialise in"
          className="light-heading mt-1 text-[34px] lg:text-[3vw]"
        />
      </div>

      <div
        ref={viewportRef}
        className="relative mt-10 px-6 sm:px-10 lg:mt-[6.5vw] lg:px-[8vw]"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHolding(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setHolding(false)}
        onFocus={() => setHolding(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHolding(false)}
        onScroll={(e) => (e.currentTarget.scrollLeft = 0)}
      >
        <motion.div
          drag="x"
          dragMomentum={false}
          style={{ x }}
          onDragStart={() => {
            dragged.current = true;
            setHolding(true);
          }}
          onDragEnd={onDragEnd}
          className="flex gap-5 touch-pan-y"
        >
          {SLIDES.map((area, i) => {
            const real = i >= COUNT && i < COUNT * 2;
            return (
              <Link
                prefetch={false}
                key={i}
                ref={i === COUNT ? cardRef : undefined}
                href={area.href}
                draggable={false}
                aria-hidden={real ? undefined : true}
                tabIndex={real ? undefined : -1}
                onFocus={() => real && move(i - COUNT - wrap(index.current), true)}
                onClick={(e) => dragged.current && e.preventDefault()}
                className="group relative block w-[78vw] shrink-0 select-none overflow-hidden rounded-[10px] sm:w-[44vw] lg:w-[calc((84vw-40px)/3)]"
              >
                <ParallaxImage
                  src={area.src}
                  alt=""
                  distance={30}
                  sizes="(min-width: 1024px) 28vw, 78vw"
                  className="pointer-events-none aspect-[390/575] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-55% to-black/45" />
                <h4 className="script-heading absolute bottom-7 left-7 text-[22px] text-white lg:bottom-[2.6vw] lg:left-[2vw]">
                  {area.label}
                </h4>
              </Link>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 px-6 lg:mt-[2.5vw]">
        <ControlButton label="Previous" onClick={() => step(-1)}>
          <ChevronLeft size={20} strokeWidth={1.5} />
        </ControlButton>

        <div className="flex items-center gap-1">
          {AREAS.map((area, i) => (
            <button
              key={area.label}
              type="button"
              aria-label={`Show ${area.label}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => {
                move(i - wrap(index.current));
              }}
              className="group flex h-8 w-6 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-[7px] rounded-full transition-all duration-500",
                  active === i ? "w-6 bg-black" : "w-[7px] bg-black/25 group-hover:bg-black/50",
                )}
              />
            </button>
          ))}
        </div>

        <ControlButton label="Next" onClick={() => step(1)}>
          <ChevronRight size={20} strokeWidth={1.5} />
        </ControlButton>

        {!reduceMotion && (
          <ControlButton label={paused ? "Play carousel" : "Pause carousel"} onClick={() => setPaused((p) => !p)} small>
            {paused ? <Play size={14} strokeWidth={1.5} /> : <Pause size={14} strokeWidth={1.5} />}
          </ControlButton>
        )}
      </div>
    </section>
  );
}

function ControlButton({
  label,
  onClick,
  small,
  children,
}: {
  label: string;
  onClick: () => void;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full border border-black/15 transition-colors duration-300 hover:border-black hover:bg-black hover:text-white",
        small ? "h-9 w-9" : "h-12 w-12",
      )}
    >
      {children}
    </button>
  );
}

export { Expertise };
