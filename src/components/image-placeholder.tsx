import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stand-in for real studio photography (post-shoot per design.md §6).
 * Matched loosely to each section's subject so structure/aspect ratios
 * are already correct when photos are swapped in.
 */
function ImagePlaceholder({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-4/5 w-full items-center justify-center overflow-hidden rounded-app bg-linear-to-br from-secondary via-secondary/60 to-surface",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3 text-primary-strong/80">
        <Icon size={40} strokeWidth={1.25} />
        <span className="text-small font-medium tracking-wide">{label}</span>
      </div>
    </div>
  );
}

export { ImagePlaceholder };
