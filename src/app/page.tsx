import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeatureCollage } from "@/components/sections/feature-collage";
import { Expertise } from "@/components/sections/expertise";
import { ScrollingText } from "@/components/sections/scrolling-text";
import { WellbeingStatement } from "@/components/sections/wellbeing-statement";
import { ParallaxBand } from "@/components/sections/parallax-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Yoga, Massage & Mindfulness in Edgemead, Cape Town",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

const groupClass = { src: "/images/Serendipity-Wellness-About-Us.jpg", alt: "Group yoga class resting in child's pose" };
const seatedMeditation = { src: "/images/Serendipity-Wellness-About.jpg", alt: "Yoga teacher seated in meditation" };

export default function Home() {
  return (
    <>
      <Hero />

      <FeatureCollage
        id="about"
        imageSide="right"
        className="pb-10 pt-24 lg:pb-[3vw] lg:pt-[8vw]"
        eyebrow="About"
        heading="Serendipity Wellness focuses on a holistic lifestyle."
        paragraphs={[
          "With the pressure of today’s world, it's imperative that we find time to reconnect, not only with ourselves but also our families, children, friends and colleagues on a level that is stress free.",
          "We offer services from Yoga classes for all ages and capabilities, to Meditation, to Therapeutic Massage. If you are ready to change your lifestyle get in touch, let us guide you…",
        ]}
        large={groupClass}
        small={seatedMeditation}
      />

      <Expertise />

      <FeatureCollage
        id="yoga-studio"
        imageSide="left"
        className="pt-24 lg:pt-[10vw]"
        eyebrow="The Yoga Studio"
        heading="A quiet, intimate yoga studio based in Edgemead"
        paragraphs={[
          "Our yoga studio is a home based studio in the quiet suburb of Edgemead, Northern Suburbs, Cape Town.",
          "Our space can accommodate a max of 5 students per yoga class, allowing for a more personal experience.",
        ]}
        large={groupClass}
        small={{ src: "/images/Untitled-design.jpeg", alt: "Student resting in savasana on a yoga mat" }}
      />

      <ScrollingText />

      <FeatureCollage
        id="massage-studio"
        imageSide="right"
        className="pb-10 pt-10 lg:pt-0"
        eyebrow="Massage Studio"
        heading="This studio is also a home-based studio in Edgemead"
        paragraphs={[
          "The massage studio is a quiet space that has been created for you to enjoy your therapeutic treatments in a space of peace & tranquillity.",
        ]}
        large={groupClass}
        small={seatedMeditation}
      />

      <WellbeingStatement />

      <ParallaxBand />
    </>
  );
}
