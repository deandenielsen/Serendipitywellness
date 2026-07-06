import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Real logo assets (design handoff, `public/logo*`). Native pixel
 * dimensions: icon 1981x2131, wordmark 4326x1587, full lockup 5000x5000 —
 * each has generous built-in clear space per design.md §2, so render at
 * the heights the design spec calls out rather than cropping.
 */

const ICON_RATIO = 1981 / 2131;
const WORDMARK_RATIO = 4326 / 1587;

function LogoIcon({ className, height = 56 }: { className?: string; height?: number }) {
  return (
    <Image
      src="/logo-icon.png"
      alt="Serendipity Wellness"
      width={Math.round(height * ICON_RATIO)}
      height={height}
      priority
      className={cn("h-14 w-auto", className)}
      style={{ height }}
    />
  );
}

function LogoWordmark({ className, height = 46 }: { className?: string; height?: number }) {
  return (
    <Image
      src="/logo-wordmark.png"
      alt="Serendipity Wellness"
      width={Math.round(height * WORDMARK_RATIO)}
      height={height}
      priority
      className={cn("w-auto", className)}
      style={{ height }}
    />
  );
}

function LogoFull({ className, height = 72 }: { className?: string; height?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="Serendipity Wellness"
      width={height}
      height={height}
      className={cn("w-auto", className)}
      style={{ height }}
    />
  );
}

export { LogoIcon, LogoWordmark, LogoFull };
