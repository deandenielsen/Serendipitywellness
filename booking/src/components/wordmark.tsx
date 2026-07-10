import { cn } from "@/lib/utils";

/**
 * CSS wordmark matching the main site. Swap for the approved logo lockup
 * (Serendipity_Wellness_Main_Logo.png) once supplied.
 */
function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex select-none flex-col leading-none", className)}>
      <span className="font-serif text-2xl italic tracking-wide text-primary">
        Serendipity
      </span>
      <span className="mt-0.5 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-copy/70">
        Wellness · Bookings
      </span>
    </span>
  );
}

export { Wordmark };
