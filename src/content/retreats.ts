/**
 * Retreats. Add a new object to `retreats` to publish another one: it appears on /retreats/
 * and gets its own page at /retreats/<slug>/. Retreats drop off the listing automatically
 * the day after they end. Set `status: "fully-booked"` to show a Fully Booked badge and
 * swap booking for a waiting list.
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
  status?: "fully-booked";
  /** Total places, shown as "Only N spots available" while the retreat is still bookable. */
  spots?: number;
  /**
   * ISO 8601 with the South African offset, e.g. 2026-12-12T08:30:00+02:00, or a plain date
   * (2026-11-06) for multi-day retreats without set times.
   */
  start: string;
  end: string;
  when: { short: string; long: string };
  time: { short: string; note: string };
  /** `amount` is the headline (lowest) price; `options` lists each price when there's more than one. */
  price: {
    amount: number;
    note: string;
    options?: { label: string; amount: number }[];
    deposit?: { amount: number; note: string };
    paymentNote?: string;
  };
  expectHeading?: string;
  expect: { title: string; text?: string }[];
  /** Optional extras, e.g. treatments bookable on the weekend. */
  extras?: { heading: string; items: { label: string; href?: string }[]; note?: string };
  venue: {
    name: string;
    area: string;
    street: string;
    city: string;
    lat?: number;
    lng?: number;
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
    slug: "blue-butterfly-wellness-weekend-2026",
    name: "Blue Butterfly Wellness Weekend",
    eyebrow: "A Serendipity Wellness & SolYoga retreat",
    headline: ["Blue Butterfly", "Wellness Weekend."],
    intro:
      "Needing a breather before the chaos of end-of-year madness? Slip away to the mountains to move gently, rest deeply, and come home to yourself.",
    seoTitle: "Blue Butterfly Wellness Weekend, Tulbagh | 6–8 Nov | Yoga Retreat",
    seoDescription:
      "A weekend yoga and wellness retreat with Serendipity Wellness and SolYoga at Welbedacht Nature Reserve, Tulbagh, 6–8 November: 2 nights, meals, 3 yoga classes, hiking and a fire ceremony. Fully booked.",
    status: "fully-booked",
    start: "2026-11-06",
    end: "2026-11-08",
    when: { short: "6–8 Nov", long: "Friday 6 – Sunday 8 November 2026" },
    time: { short: "2 nights", note: "Friday to Sunday" },
    price: {
      amount: 3200,
      note: "Sharing, or R4 800 for a private room",
      options: [
        { label: "Sharing", amount: 3200 },
        { label: "Private room", amount: 4800 },
      ],
      deposit: { amount: 900, note: "secures your spot" },
      paymentNote: "Balance paid over 4 months, starting end of July.",
    },
    expectHeading: "What’s included",
    expect: [
      { title: "2 nights’ accommodation" },
      { title: "2 breakfasts & 2 dinners" },
      { title: "3 yoga classes" },
      { title: "Plenty of free time to relax" },
      { title: "Hiking trails through the nature reserve" },
      { title: "Fire ceremony" },
    ],
    extras: {
      heading: "Treatments available at a discounted rate",
      items: [
        { label: "Aromatherapy massage" },
        { label: "Reflexology", href: "/reflexology/" },
        { label: "Reiki" },
        { label: "Lomi Lomi massage" },
      ],
      note: "Optional treatments, bookable on the weekend.",
    },
    venue: {
      name: "Welbedacht Nature Reserve",
      area: "Tulbagh",
      street: "Winterhoek Road",
      city: "Tulbagh",
      website: "https://www.welbedachtreserve.co.za/groups--retreats.html",
      description:
        "We stay at the Blue Butterfly, a restored thatched barn in Welbedacht Game & Nature Reserve, surrounded by the Winterhoek Mountains in the Tulbagh Valley, with a studio, farm kitchen, pool, gardens and walking trails right on the doorstep.",
    },
    hero: {
      src: `${R}/welbedacht-tulbagh-mountains-pool.jpg`,
      alt: "Pool, lawn and white cottage below the Winterhoek Mountains at Welbedacht Nature Reserve, Tulbagh",
      position: "center 28%",
    },
    // Venue photos from welbedachtreserve.co.za.
    gallery: [
      { src: `${R}/blue-butterfly-thatched-barn.jpg`, alt: "The Blue Butterfly thatched barn and lawn at Welbedacht Nature Reserve" },
      { src: `${R}/blue-butterfly-studio-lounge.jpg`, alt: "Studio and lounge inside the Blue Butterfly barn" },
      { src: `${R}/blue-butterfly-farm-kitchen.jpg`, alt: "Farm-style kitchen and dining table at the Blue Butterfly" },
      { src: `${R}/blue-butterfly-bedroom.jpg`, alt: "En-suite bedroom under the thatch at the Blue Butterfly" },
    ],
    whatsappMessage:
      "Hi! The Blue Butterfly Wellness Weekend (6–8 November) is fully booked. Please add me to the waiting list, and let me know about future weekend retreats.",
  },
  {
    slug: "end-of-year-retreat-2026",
    name: "End of Year Wellness Half-Day Retreat",
    eyebrow: "End of year half-day retreat",
    headline: ["Close the year,", "just breathe."],
    intro:
      "Before the festive rush, give yourself one slow, nourishing morning to move, rest, eat well and reconnect.",
    seoTitle: "End of Year Wellness Retreat, Cape Town | Sat 12 Dec | R1100",
    seoDescription:
      "Half-day wellness retreat at Vin Boho Guesthouse, Panorama, Cape Town on Saturday 12 December: yoga, a QRMA body scanning talk, brunch and a sound bath. Only 15 spots, R1100 per person, brunch included.",
    spots: 15,
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

export const isFullyBooked = (r: Retreat) => r.status === "fully-booked";

/** "Only 15 spots available", or undefined when there's no limit to show (or it's fully booked). */
export const spotsLabel = (r: Retreat) =>
  r.spots && !isFullyBooked(r) ? `Only ${r.spots} spots available` : undefined;

/** Plain dates (no time) mean the retreat runs all day; it ends at the close of that day in SA. */
export const isAllDay = (r: Retreat) => r.start.length === 10;
const endInstant = (r: Retreat) => new Date(isAllDay(r) ? `${r.end}T23:59:59+02:00` : r.end);

/** Retreats that haven't finished yet, soonest first. */
export function upcomingRetreats(now = new Date()) {
  return retreats
    .filter((r) => endInstant(r) >= now)
    .sort((a, b) => a.start.localeCompare(b.start));
}
