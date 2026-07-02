import { Flower2 } from "lucide-react";
import { SplitSection } from "@/components/sections/split-section";

function YogaStudio() {
  return (
    <SplitSection
      id="yoga"
      eyebrow="Yoga Studio"
      title="Boutique Yoga Studio in Edgemead, Cape Town"
      icon={Flower2}
      imageLabel="Yoga studio"
      paragraphs={[
        "Our intimate yoga studio in Edgemead offers a calm and welcoming environment where you can step away from the demands of everyday life and reconnect with yourself.",
        "With classes limited to just 5 students, you’ll enjoy personal attention, expert guidance and a supportive community that allows your yoga practice to grow at your own pace.",
        "Whether you’re completely new to yoga or an experienced practitioner, our small class sizes create the ideal space to improve strength, flexibility, balance and wellbeing.",
      ]}
    />
  );
}

export { YogaStudio };
