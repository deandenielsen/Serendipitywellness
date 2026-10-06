import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Gradient pill button. On hover each letter rolls up and an identical copy rolls in from
 * below, staggered left to right so the label ripples like a wave.
 */
function WaveButton({ href, label, className }: { href: string; label: string; className?: string }) {
  const letters = [...label];
  return (
    <Link prefetch={false}
      href={href}
      aria-label={label}
      className={cn(
        "group inline-flex items-center rounded-full bg-gradient-to-r from-brand-teal to-brand-violet px-[35px] py-[15px] text-[18px] leading-[30px] tracking-[0.05em] text-white transition-[filter,box-shadow] duration-300 hover:shadow-[0_10px_30px_rgba(60,60,140,0.3)]",
        className,
      )}
    >
      <span aria-hidden="true" className="relative inline-flex overflow-hidden">
        {letters.map((ch, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            <span
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.2,0.75,0.25,0.9)] group-hover:-translate-y-full motion-reduce:transition-none"
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {ch === " " ? "\u00a0" : ch}
            </span>
            <span
              className="absolute left-0 top-full inline-block transition-transform duration-500 ease-[cubic-bezier(0.2,0.75,0.25,0.9)] group-hover:-translate-y-full motion-reduce:transition-none"
              style={{ transitionDelay: `${i * 25}ms` }}
            >
              {ch === " " ? "\u00a0" : ch}
            </span>
          </span>
        ))}
      </span>
    </Link>
  );
}

export { WaveButton };
