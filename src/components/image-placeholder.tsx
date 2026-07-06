import { cn } from "@/lib/utils";

/**
 * Stand-in for real studio photography (post-shoot per design.md §6).
 * Matches the design handoff's placeholder treatment exactly: a warm
 * diagonal-stripe swatch with a small monospace tag naming the shot.
 */
function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-app bg-[#ddd4c4] [background-image:repeating-linear-gradient(45deg,rgba(183,194,177,0.28)_0_12px,transparent_12px_24px)]",
        className
      )}
    >
      <span className="rounded-app bg-background/72 px-3.5 py-1.5 font-mono text-small text-[#8a9187]">
        {label}
      </span>
    </div>
  );
}

export { ImagePlaceholder };
