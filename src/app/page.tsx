import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeatureCollage } from "@/components/sections/feature-collage";
import { Expertise } from "@/components/sections/expertise";
import { ScrollingText } from "@/components/sections/scrolling-text";
import { WellbeingStatement } from "@/components/sections/wellbeing-statement";
import { ParallaxBand } from "@/components/sections/parallax-band";
import { SplitReveal } from "@/components/motion/split-reveal";
import { siteConfig } from "@/lib/site-config";

const { founder } = siteConfig;

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
      >
        <div className="mt-10 border-t border-black/10 pt-8 lg:mt-[2.4vw] lg:pt-[2vw]">
          <SplitReveal as="h4" text="Meet Kerry" className="script-heading text-[32px] lg:text-[2.2vw]" />
          <SplitReveal
            text={`Hi, I’m ${founder.name}, founder of Serendipity Wellness. I’m a 200hr qualified yoga teacher and 50hr qualified kids yoga teacher, and I specialise in therapeutic massage and reflexology. With ${founder.yearsExperience} years of experience and only five students per class, I can give everyone the attention they need, whatever their age or ability.`}
            delay={0.1}
            lineStagger={0.05}
            duration={0.8}
            className="mt-3 text-[15px] leading-[1.7] lg:text-[1.05vw]"
          />
          <p className="script-heading mt-4 text-[26px] lg:text-[1.8vw]">{founder.name}</p>
        </div>
      </FeatureCollage>

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
