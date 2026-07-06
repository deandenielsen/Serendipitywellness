import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

function SplitSection({
  id,
  eyebrow,
  title,
  paragraphs,
  imageLabel,
  reverse = false,
  tinted = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  imageLabel: string;
  reverse?: boolean;
  tinted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-[120px] scroll-mt-24", tinted && "bg-secondary/40")}
    >
      <Container className="grid items-center gap-14 md:grid-cols-2 md:gap-[68px]">
        <Reveal className={cn(reverse && "md:order-2")}>
          <ImagePlaceholder label={imageLabel} className="aspect-5/6" />
        </Reveal>

        <Reveal delay={0.1} className={cn(reverse && "md:order-1")}>
          <span className="text-eyebrow font-medium uppercase tracking-[0.18em] text-primary-strong">
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
