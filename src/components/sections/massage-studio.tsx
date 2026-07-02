import { HandHeart } from "lucide-react";
import { SplitSection } from "@/components/sections/split-section";

function MassageStudio() {
  return (
    <SplitSection
      id="massage"
      eyebrow="Massage Studio"
      title="Massage Studio"
      icon={HandHeart}
      imageLabel="Massage studio"
      reverse
      tinted
      paragraphs={[
        "Our peaceful massage studio in Edgemead has been thoughtfully created as a place of calm, comfort and complete relaxation.",
        "Every treatment is designed to help reduce stress, ease muscle tension and support your overall wellness. From therapeutic massages to reflexology, each session is tailored to your individual needs, leaving you feeling refreshed, restored and rebalanced.",
        "Escape the pressures of daily life and experience the benefits of professional massage therapy in a tranquil environment dedicated to your wellbeing.",
      ]}
    />
  );
}

export { MassageStudio };
