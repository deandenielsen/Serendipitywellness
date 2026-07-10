import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <Loader2
      className={cn("animate-spin text-primary-strong", className)}
      size={size}
      aria-label="Loading"
    />
  );
}

export { Spinner };
