import { SplitSection } from "@/components/sections/split-section";

function Retreats() {
  return (
    <SplitSection
      id="retreats"
      eyebrow="Retreats & Events"
      title="Wellness Retreats & Events"
      imageLabel="retreat · nature"
      paragraphs={[
        "Take time out to reconnect with yourself through our carefully curated wellness retreats and events. Our retreats are open to everyone—no yoga experience is required. Whether you’re seeking rest, relaxation or simply a change of pace, you’ll enjoy nourishing food, gentle movement, time in nature and plenty of space to unwind.",
        "We also host regular wellness events in Cape Town, often featuring yoga alongside collaborations with local practitioners — opportunities to learn, connect and prioritise your health in a supportive community.",
      ]}
    />
  );
}

export { Retreats };
