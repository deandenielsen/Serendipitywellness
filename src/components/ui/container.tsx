import * as React from "react";
import { cn } from "@/lib/utils";

const sizes = {
  // header / hero, per design.md handoff (max-width: 1320px)
  wide: "max-w-[1320px]",
  // most sections (max-width: 1180px)
  default: "max-w-[1180px]",
} as const;

function Container({
  className,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: keyof typeof sizes }) {
  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-10", sizes[size], className)}
      {...props}
    />
  );
}

export { Container };
