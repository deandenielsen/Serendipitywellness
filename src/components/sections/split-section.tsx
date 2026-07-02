import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function SplitSection({
  id,
  eyebrow,
  title,
  paragraphs,
  icon,
  imageLabel,
  reverse = false,
  tinted = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  icon: LucideIcon;
  imageLabel: string;
  reverse?: boolean;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 scroll-mt-20", tinted && "bg-secondary/40")}
    >
      <Container className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
        <Reveal className={cn(reverse && "md:order-2")}>
          <ImagePlaceholder icon={icon} label={imageLabel} />
        </Reveal>

        <Reveal delay={0.1} className={cn(reverse && "md:order-1")}>
          <span className="text-eyebrow font-medium uppercase tracking-[0.08em] text-primary-strong">
            {eyebrow}
          </span>
          <h2 className="mt-4 text-h2 font-semibold text-copy">{title}</h2>
          <div className="mt-6 flex flex-col gap-4 text-body text-copy/90">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export { SplitSection };
