import { cn } from "@/lib/utils";

/**
 * Temporary CSS wordmark. Swap for the approved logo lockup
 * (Serendipity_Wellness_Main_Logo.png / _Light_Logo.png) once supplied —
 * see design.md §2.
 */
function Wordmark({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col leading-none select-none",
        className
      )}
    >
      <span
        className={cn(
          "font-serif italic text-2xl tracking-wide",
          light ? "text-white" : "text-primary"
        )}
      >
        Serendipity
      </span>
      <span
        className={cn(
          "font-sans text-[0.65rem] uppercase tracking-[0.3em] mt-0.5",
          light ? "text-white/80" : "text-copy/70"
        )}
      >
        Wellness
      </span>
    </span>
  );
}

export { Wordmark };
