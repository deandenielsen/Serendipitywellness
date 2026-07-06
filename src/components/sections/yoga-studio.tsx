import { SplitSection } from "@/components/sections/split-section";

function YogaStudio() {
  return (
    <SplitSection
      id="studio"
      eyebrow="The Studio"
      title="Boutique Yoga Studio in Edgemead, Cape Town"
      imageLabel="studio interior"
      paragraphs={[
        "Our intimate yoga studio in Edgemead offers a calm and welcoming environment where you can step away from the demands of everyday life and reconnect with yourself. With classes limited to just 5 students, you’ll enjoy personal attention, expert guidance and a supportive community that allows your yoga practice to grow at your own pace.",
        "Whether you’re completely new to yoga or an experienced practitioner, our small class sizes create the ideal space to improve strength, flexibility, balance and wellbeing.",
      ]}
    />
  );
}

export { YogaStudio };
