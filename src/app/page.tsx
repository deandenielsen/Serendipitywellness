import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { IntroBand } from "@/components/sections/intro-band";
import { Services } from "@/components/sections/services";
import { YogaStudio } from "@/components/sections/yoga-studio";
import { MassageStudio } from "@/components/sections/massage-studio";
import { Retreats } from "@/components/sections/retreats";
import { ClosingCta } from "@/components/sections/closing-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Yoga, Massage & Wellness Retreats in Edgemead, Cape Town",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <IntroBand />
      <Services />
      <YogaStudio />
      <MassageStudio />
      <Retreats />
      <ClosingCta />
    </>
  );
}
