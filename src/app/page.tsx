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

const kerry = {
  src: "/images/kerry-nielsen-yoga-teacher-edgemead.jpg",
  alt: "Kerry Nielsen, yoga teacher and therapist, seated in meditation in the Serendipity Wellness studio in Edgemead",
};
const studioSpace = {
  src: "/images/serendipity-wellness-studio-edgemead.jpg",
  alt: "Bright, calm room at the Serendipity Wellness home studio in Edgemead, Cape Town",
};
const yogaStudio = {
  src: "/images/yoga-studio-edgemead.jpg",
  alt: "The Serendipity Wellness yoga studio in Edgemead set up with mats for a small-group class",
};
const kerrySavasana = {
  src: "/images/kerry-nielsen-savasana-edgemead-yoga-studio.jpg",
  alt: "Kerry Nielsen resting in savasana on a yoga mat in the Edgemead yoga studio",
};
const massageStudio = {
  src: "/images/massage-studio-edgemead.jpg",
  alt: "Massage table with towels in the Serendipity Wellness massage studio in Edgemead, Cape Town",
};
const massageCloseUp = {
  src: "/images/therapeutic-massage-edgemead.jpg",
  alt: "Client relaxing face-down on the massage table during a therapeutic massage in Edgemead, Cape Town",
};

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
          "In today’s busy world, it’s important to make time to reconnect, with ourselves and with the people who matter most.",
          "From yoga for all ages and abilities to meditation and therapeutic massage, we’re here to guide you.",
        ]}
        large={studioSpace}
        small={kerry}
      >
        <div className="mt-10 border-t border-ink/10 pt-8 lg:mt-[2.4vw] lg:pt-[2vw]">
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
        large={yogaStudio}
        small={kerrySavasana}
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
        large={massageCloseUp}
        small={massageStudio}
      />

      <WellbeingStatement />

      <ParallaxBand />
    </>
  );
}
