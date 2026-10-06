import { ParallaxImage } from "@/components/motion/parallax";

/** Full-width sunset meditation photo that scrolls at a different speed to the page. */
function ParallaxBand() {
  return (
    <ParallaxImage
      src="/images/Just-Breathe-Meditation.jpeg"
      alt="Silhouette meditating beside a lake at sunset"
      distance={120}
      imgClassName="object-[72%_center] lg:object-center"
      sizes="100vw"
      className="h-[60vw] max-h-[720px] min-h-[320px] w-full lg:h-[50vw]"
    />
  );
}

export { ParallaxBand };
