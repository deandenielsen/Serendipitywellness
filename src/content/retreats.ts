/**
 * Retreats. Add a new object to `retreats` to publish another one: it appears on /retreats/
 * and gets its own page at /retreats/<slug>/. Retreats drop off the listing automatically
 * the day after they end.
 */

export type Retreat = {
  slug: string;
  /** Short name for cards, breadcrumbs and the browser tab. */
  name: string;
  /** Small caps line above the headline. */
  eyebrow: string;
  /** Two-line headline: the second line is set in italic. */
  headline: [string, string];
  intro: string;
  seoTitle: string;
  seoDescription: string;
  /** ISO 8601 with the South African offset, e.g. 2026-12-12T08:30:00+02:00. */
  start: string;
  end: string;
  when: { short: string; long: string };
  time: { short: string; note: string };
  price: { amount: number; note: string };
  expect: { title: string; text: string }[];
  venue: {
    name: string;
    area: string;
    street: string;
    city: string;
    lat: number;
    lng: number;
    website?: string;
    description: string;
  };
  hero: { src: string; alt: string; position?: string };
  gallery: { src: string; alt: string }[];
  /** Pre-filled WhatsApp message for the "Reserve" button. */
  whatsappMessage: string;
};

const R = "/images/retreats";

export const retreats: Retreat[] = [
  {
    slug: "end-of-year-retreat-2026",
    name: "End of Year Wellness Half-Day Retreat",
    eyebrow: "End of year half-day retreat",
    headline: ["Close the year,", "just breathe."],
    intro:
      "Before the festive rush, give yourself one slow, nourishing morning to move, rest, eat well and reconnect.",
    seoTitle: "End of Year Wellness Retreat, Cape Town | Sat 12 Dec | R1100",
    seoDescription:
      "Half-day wellness retreat at Vin Boho Guesthouse, Panorama, Cape Town on Saturday 12 December: yoga, a QRMA body scanning talk, brunch and a sound bath. R1100 per person, brunch included.",
    start: "2026-12-12T08:30:00+02:00",
    end: "2026-12-12T14:00:00+02:00",
    when: { short: "Sat 12 Dec", long: "Saturday, 12 December 2026" },
    time: { short: "8:30am – 2pm", note: "Arrive 8:30am to settle in" },
    price: { amount: 1100, note: "Per person, brunch included" },
    expect: [
      { title: "Yoga", text: "Move and ground the body" },
      { title: "QRMA body scanning", text: "An introductory talk" },
      { title: "Brunch", text: "Shared and unhurried" },
      { title: "Sound bath", text: "Lie back and let go" },
      { title: "Connection with like-minded people", text: "End the year in good company" },
    ],
    venue: {
      name: "Vin Boho Guesthouse",
      area: "Panorama",
      street: "28 Uys Krige Drive",
      city: "Cape Town",
      lat: -33.885576,
      lng: 18.568321,
      website: "https://vinboho.co.za/",
      description:
        "A peaceful boutique guesthouse at the foot of the Plattekloof hills in Panorama, in Cape Town’s Northern Suburbs, with leafy gardens, lawns and light-filled spaces: a calm setting to slow down for the morning.",
    },
    hero: {
      src: `${R}/vin-boho-garden-courtyard.jpg`,
      alt: "Leafy garden courtyard with tree ferns at Vin Boho Guesthouse, Panorama, Cape Town",
    },
    // Venue photos from vinboho.co.za.
    gallery: [
      { src: `${R}/vin-boho-brunch-table.jpg`, alt: "Long brunch table set for guests at Vin Boho Guesthouse" },
      { src: `${R}/vin-boho-garden-path.jpg`, alt: "Garden path and tree ferns at Vin Boho Guesthouse" },
      { src: `${R}/vin-boho-patio-lounge.jpg`, alt: "Covered patio lounge with round mirrors at Vin Boho Guesthouse" },
      { src: `${R}/vin-boho-sunlit-corner.jpg`, alt: "Sunlit seating corner at Vin Boho Guesthouse" },
    ],
    whatsappMessage: "Hi! I'd like to reserve a place on the End of Year Half-Day Retreat on Saturday 12 December.",
  },
];

export const getRetreat = (slug: string) => retreats.find((r) => r.slug === slug);

/** Retreats that haven't finished yet, soonest first. */
export function upcomingRetreats(now = new Date()) {
  return retreats
    .filter((r) => new Date(r.end) >= now)
    .sort((a, b) => a.start.localeCompare(b.start));
}
