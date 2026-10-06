"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ParallaxImage } from "@/components/motion/parallax";

const AREAS = [
  { label: "Yoga", src: "/images/Yoga.jpg", href: "/yoga/" },
  { label: "Therapeutic Massage", src: "/images/Therapeutic-Massage.jpg", href: "/therapeutic-massage/" },
  { label: "Mindfulness & Meditation", src: "/images/Mindfulness-Meditation.jpg", href: "/mindfulness-meditation/" },
  { label: "Pre / Post Natal Yoga", src: "/images/Pre-_-Post-Natal-Yoga.jpg", href: "/pre-post-natal-yoga/" },
  { label: "Rehabilitation Yoga", src: "/images/Rehabilitation-Yoga.jpeg", href: "/rehabilitation-yoga/" },
];

/**
 * "Expertise" carousel: a draggable row of tall cards that runs off the right edge,
 * with a black circular drag cursor that follows the pointer over the track.
 */
function Expertise() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });
  const dragged = useRef(false);

  // Drag cursor
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const cx = useSpring(0, { stiffness: 500, damping: 40 });
  const cy = useSpring(0, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const track = trackRef.current;
      if (!vp || !track) return;
      const left = Math.min(0, vp.clientWidth - track.scrollWidth);
      setBounds({ left, right: 0 });
      if (x.get() < left) x.set(left);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  const step = (dir: 1 | -1) => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    const w = card ? card.offsetWidth + 20 : 300;
    const target = Math.max(bounds.left, Math.min(0, x.get() - dir * w));
    animate(x, target, { type: "spring", stiffness: 200, damping: 30 });
  };

  return (
    <section id="expertise" className="relative overflow-hidden pb-6 pt-24 lg:pt-[3vw]">
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
        className="relative mt-10 px-6 sm:px-10 lg:mt-[6.5vw] lg:cursor-none lg:px-[8vw]"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => {
          setHovering(false);
          setPressed(false);
        }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          cx.set(e.clientX - r.left);
          cy.set(e.clientY - r.top);
        }}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={bounds}
          dragElastic={0.12}
          style={{ x }}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
          className="flex gap-5 touch-pan-y"
        >
          {AREAS.map((area) => (
            <Link prefetch={false}
              key={area.label}
              href={area.href}
              draggable={false}
              onClick={(e) => dragged.current && e.preventDefault()}
              className="group relative block w-[78vw] shrink-0 select-none overflow-hidden rounded-[10px] sm:w-[44vw] lg:w-[calc((84vw-40px)/3)] lg:cursor-none"
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
          ))}
        </motion.div>

        {/* Custom drag cursor (desktop pointer only) */}
        <motion.div
          aria-hidden="true"
          style={{ x: cx, y: cy }}
          className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
        >
          <motion.div
            className="-ml-[47px] -mt-[47px] flex h-[94px] w-[94px] items-center justify-between rounded-full bg-black px-4 text-white"
            initial={false}
            animate={{ scale: hovering ? (pressed ? 0.8 : 1) : 0.2, opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.span animate={{ x: pressed ? -6 : 0 }}>
              <ChevronLeft size={22} />
            </motion.span>
            <motion.span animate={{ x: pressed ? 6 : 0 }}>
              <ChevronRight size={22} />
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-6 flex justify-end gap-2 px-6 sm:px-10 lg:hidden">
        <button type="button" aria-label="Previous" onClick={() => step(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15">
          <ChevronLeft size={20} />
        </button>
        <button type="button" aria-label="Next" onClick={() => step(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

export { Expertise };
