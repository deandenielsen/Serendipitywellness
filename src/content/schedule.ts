/** Class timetable, fees and packages — confirmed current by the studio (Oct 2026). */

export const classSize = 5;

export const adultSchedule = [
  { day: "Tuesday", times: ["9am – 10am", "5:30pm – 6:30pm"] },
  { day: "Wednesday", times: ["5:30pm – 6:30pm"] },
  { day: "Thursday", times: ["5:30pm – 6:30pm"] },
  { day: "Friday", times: ["9am – 10am"] },
  { day: "Saturday", times: ["8:30am – 9:30am", "10am – 11am"] },
];

export const adultPackages = [
  { name: "Drop In Fee", price: 145, unit: "per class" },
  { name: "5 Class Pass", price: 630 },
  { name: "10 Class Pass", price: 1050 },
];

export const privateClassesFrom = 250;

export const kidsTeens = [
  { name: "Kids Yoga", prices: [{ price: 730, unit: "for 8 classes per term" }] },
  {
    name: "Teen Stress Management",
    prices: [
      { price: 140, unit: "per class" },
      { price: 400, unit: "for a 4 class pass" },
    ],
  },
];

export const scheduleFaqs = [
  {
    question: "How much is a yoga class at Serendipity Wellness?",
    answer:
      "A drop-in adult yoga class is R145. A 5 class pass is R630 and a 10 class pass is R1050. Private one-on-one classes start from R250 per class.",
  },
  {
    question: "When are the yoga classes?",
    answer:
      "Adult classes run on Tuesday 9am–10am and 5:30pm–6:30pm, Wednesday and Thursday 5:30pm–6:30pm, Friday 9am–10am, and Saturday 8:30am–9:30am and 10am–11am.",
  },
  {
    question: "How many people are in a class?",
    answer: `Every class is limited to ${classSize} students, so you get personal attention from the teacher.`,
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations need to be made at least 24 hours before the class to avoid losing it from your package. Class packages can be rolled over for one month.",
  },
  {
    question: "How do I book a yoga class?",
    answer:
      "Check availability and book online at booking.serendipitywellness.co.za, or contact us on WhatsApp or by phone on +27 79 085 6100.",
  },
  {
    question: "Do you offer private yoga classes at home?",
    answer: `Yes. Private one-on-one classes can be arranged in the studio or in the comfort of your own home, starting from R${privateClassesFrom} per class.`,
  },
  {
    question: "How much are kids and teen yoga classes?",
    answer:
      "Kids Yoga is R730 for 8 classes per term. Teen Stress Management classes are R140 per class or R400 for a 4 class pass.",
  },
];
