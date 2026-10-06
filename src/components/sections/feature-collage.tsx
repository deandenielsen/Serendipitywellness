import { ParallaxImage, ScrollFloat } from "@/components/motion/parallax";
import { SplitReveal } from "@/components/motion/split-reveal";
import { cn } from "@/lib/utils";

type CollageImage = { src: string; alt: string };

/**
 * Two-column feature: script eyebrow + light heading + copy on one side, and on the other a
 * pair of overlapping image cards that drift at different speeds while scrolling.
 */
function FeatureCollage({
  id,
  eyebrow,
  heading,
  paragraphs,
  large,
  small,
  imageSide,
  className,
}: {
  id?: string;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  large: CollageImage;
  small: CollageImage;
  imageSide: "left" | "right";
  className?: string;
}) {
  const imagesLeft = imageSide === "left";

  return (
    <section id={id} className={cn("relative overflow-hidden lg:overflow-visible", className)}>
      <div className={cn("flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-0", imagesLeft && "lg:flex-row-reverse")}>
        <div
          className={cn(
            "px-6 sm:px-10 lg:w-[42%] lg:px-0",
            imagesLeft ? "lg:pl-[2vw] lg:pr-[8vw]" : "lg:pl-[12vw] lg:pr-[2vw]",
          )}
        >
          <SplitReveal as="h2" text={eyebrow} className="script-heading text-[40px] lg:text-[3.2vw]" />
          <SplitReveal
            as="h3"
            delay={0.1}
            text={heading}
            className="light-heading mt-2 text-[34px] lg:mt-[0.6vw] lg:text-[3vw]"
          />
          <div className="mt-6 space-y-[1.1em] text-[15px] leading-[1.7] lg:mt-[1.4vw] lg:text-[1.05vw]">
            {paragraphs.map((p, i) => (
              <SplitReveal key={i} text={p} delay={0.15 + i * 0.1} lineStagger={0.05} duration={0.8} />
            ))}
          </div>
        </div>

        <div
          className={cn(
            "relative mx-6 aspect-[550/700] sm:mx-10 lg:mx-0 lg:aspect-auto lg:h-[56.25vw] lg:w-[58%]",
          )}
        >
          <ScrollFloat
            distance={30}
            className={cn(
              "absolute top-0",
              imagesLeft ? "left-0 w-[68%] lg:w-[69%]" : "right-0 w-[68%] lg:right-[5.4%] lg:w-[65.9%]",
            )}
          >
            <ParallaxImage
              {...large}
              distance={40}
              sizes="(min-width: 1024px) 40vw, 70vw"
              className={cn("rounded-[10px] shadow-depth", imagesLeft ? "aspect-[576/810]" : "aspect-[550/810]")}
            />
          </ScrollFloat>
          <ScrollFloat
            distance={90}
            className={cn(
              "absolute top-[22%] z-10",
              imagesLeft ? "left-[48%] w-[40%] lg:left-[51.7%] lg:w-[34.5%]" : "left-0 w-[40%] lg:left-[13.8%] lg:w-[35.9%]",
            )}
          >
            <ParallaxImage
              {...small}
              distance={25}
              sizes="(min-width: 1024px) 21vw, 40vw"
              className="aspect-[2/3] rounded-[10px] shadow-depth"
            />
          </ScrollFloat>
        </div>
      </div>
    </section>
  );
}

export { FeatureCollage };
