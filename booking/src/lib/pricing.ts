/**
 * PLACEHOLDER PRICING — edit this file with the studio's real rates.
 *
 * The structure mirrors the pricing page layout: each category renders as a
 * card with a list of tiers. `enquire: true` adds a "Get in Touch" mailto
 * button to the card.
 */

export interface PriceTier {
  label: string;
  price: string;
  note?: string;
}

export interface PriceCategory {
  category: string;
  intro?: string;
  tiers: PriceTier[];
  enquire?: boolean;
}

export const PRICING: PriceCategory[] = [
  {
    category: "Group Classes",
    intro: "Vinyasa, Hatha, Restorative, Yin and Mat Pilates.",
    tiers: [
      { label: "Drop-in", price: "R150", note: "single class" },
      { label: "5-Class Pack", price: "R675", note: "R135 per class · valid 2 months" },
      { label: "10-Class Pack", price: "R1 250", note: "R125 per class · valid 3 months" },
      { label: "Monthly Unlimited", price: "R1 100", note: "all group classes" },
    ],
  },
  {
    category: "Private Sessions",
    intro: "One-on-one sessions tailored to your goals.",
    tiers: [
      { label: "Private 1:1", price: "R450", note: "per session · 1x weekly" },
      { label: "Private 1:1", price: "R430", note: "per session · 2x weekly" },
      { label: "Semi-Private (2 people)", price: "R600", note: "per session" },
    ],
    enquire: true,
  },
];

/**
 * PLACEHOLDER CLASS DESCRIPTIONS — shown on the pricing page. The booking
 * modal uses each scheduled class's own description from the database
 * (editable in Admin).
 */
export const CLASS_GUIDE: { title: string; body: string }[] = [
  {
    title: "Vinyasa Flow",
    body: "Breath-led flowing sequences that build strength, balance and focus. Beginner classes move at a steady, accessible pace; intermediate classes explore creative sequencing and a more dynamic rhythm.",
  },
  {
    title: "Hatha Yoga",
    body: "Classic postures held with attention to alignment and breath. A grounding practice suitable for all levels, with options offered throughout.",
  },
  {
    title: "Restorative & Yin",
    body: "Slow, supported practices that release deep tension and calm the nervous system. Ideal after a busy week or alongside a stronger practice.",
  },
  {
    title: "Mat Pilates",
    body: "Core-focused conditioning that improves posture, stability and control. Small classes ensure individual attention and precise cueing.",
  },
];
