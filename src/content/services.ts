/**
 * Service page content. Wording carries over from the original site (tidied for spelling
 * and grammar) and is expanded with "what to expect" and FAQ copy for search and AI answers.
 * Anything not yet confirmed by the studio (class times, class prices, exact class size)
 * is deliberately left out rather than guessed.
 */

export type Benefit = { title: string; text: string };

export type ServiceSection = {
  id: string;
  name: string;
  paragraphs: string[];
  benefits?: Benefit[];
  image: { src: string; alt: string };
};

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Short name used in navigation, breadcrumbs and cards. */
  name: string;
  /** Script title shown on the photo banner (the page's H1). */
  title: string;
  seoTitle: string;
  seoDescription: string;
  /** Kind of service for structured data. */
  serviceType: string;
  hero: { src: string; alt: string };
  intro: {
    heading: string;
    paragraphs: string[];
    benefits?: Benefit[];
    image: { src: string; alt: string };
  };
  /** Jump links under the intro (e.g. Prenatal / Postnatal). */
  jumpLinks?: { label: string; href: string }[];
  sections: ServiceSection[];
  expect: { heading: string; paragraphs: string[] };
  pricing?: { label: string; price: number }[];
  cta: { text: string; image: string; href?: string; label?: string };
  faqs: Faq[];
  related: string[];
};

const S = "/images/services";

export const services: Service[] = [
  {
    slug: "yoga",
    name: "Yoga",
    title: "Yoga",
    seoTitle: "Yoga Classes in Edgemead, Cape Town | Hatha, Yin & Kids Yoga",
    seoDescription:
      "Small-group Hatha, Yin and Kids yoga (ages 4–12) classes in a quiet home studio in Edgemead, Northern Suburbs, Cape Town. Personal attention for beginners and experienced students.",
    serviceType: "Yoga classes",
    hero: { src: `${S}/yoga-hero.jpeg`, alt: "Yoga students resting in child's pose during a class" },
    intro: {
      heading: "Yoga",
      paragraphs: [
        "Yoga is a mind and body practice. Various styles of yoga combine physical postures, breathing techniques, and meditation or relaxation.",
        "Yoga is the practice of asana (postures) and pranayama (breath) to create balance in the body, mind and soul, so that one can reach samadhi (pure bliss).",
        "At Serendipity Wellness, classes are limited to just 5 students in our home studio in Edgemead, so every student gets personal guidance and adjustments suited to their own body and experience.",
      ],
      image: { src: `${S}/yoga-intro.jpg`, alt: "Students in cobra pose in a bright yoga studio" },
    },
    sections: [
      {
        id: "hatha",
        name: "Hatha",
        paragraphs: [
          "Hatha yoga is about balancing the parts of ourselves, bringing balance to both sides of the body and mind through correct alignment (yin and yang). Classes focus on meditation, pranayama (the breath), asana (the poses) and relaxation.",
          "It is a steady, alignment-focused style that suits complete beginners as well as students who want to refine their practice.",
        ],
        benefits: [
          {
            title: "Improves flexibility and strength",
            text: "Hatha yoga stretches and strengthens the muscles, tendons and ligaments, improving flexibility and overall strength.",
          },
          {
            title: "Supports mental health",
            text: "Hatha yoga can help ease anxiety and low mood, and promotes feelings of peace and wellbeing.",
          },
        ],
        image: { src: `${S}/hatha-yoga.jpg`, alt: "Yoga teacher assisting a student in a seated forward fold" },
      },
      {
        id: "yin",
        name: "Yin",
        paragraphs: [
          "Yin yoga is a slow, quiet practice. Poses are mostly seated or lying down and are held for several minutes, gently working into the deeper connective tissue, joints and fascia rather than the muscles.",
          "With long holds, soft breathing and props for support, Yin is a deeply restful counterbalance to busy days and more active forms of exercise.",
        ],
        benefits: [
          {
            title: "Decreases stress and anxiety",
            text: "Yin yoga calms the mind, slows down the breath and releases tension in the body, reducing stress levels and anxiety.",
          },
          {
            title: "Supports the immune system",
            text: "The gentle stimulation of yin yoga can improve blood flow and energy levels, supporting overall health and immunity.",
          },
        ],
        image: { src: `${S}/yin-yoga.jpg`, alt: "Woman resting in a deep yin yoga stretch on a mat" },
      },
      {
        id: "kids-yoga",
        name: "Kids Yoga",
        paragraphs: [
          "Kids Yoga is for children aged 4 to 12. This is a fun and interactive class. There is no right and wrong, no dos and don'ts. It's a time and space for children to just be themselves.",
          "In these classes we focus on core strengthening, crossing the midline, stretching and movement of muscles.",
          "Children learn the life skill of managing their emotions and feelings, creating well-balanced, mindful little humans.",
          "The classes are designed around poses, singing, art and mindfulness or quiet time.",
        ],
        image: { src: `${S}/kids-yoga.jpeg`, alt: "Children doing a balancing yoga pose together on grass" },
      },
    ],
    expect: {
      heading: "What to expect in a yoga class",
      paragraphs: [
        "Classes run for an hour in our intimate studio in Edgemead, in Cape Town's Northern Suburbs. Each class moves through breathing, warm-up, postures and a final relaxation, and every pose can be adapted to your level.",
        "Please bring your own mat, wear comfortable clothing you can move in, and arrive a few minutes early. Let your teacher know about any injuries, health conditions or pregnancy before class.",
      ],
    },
    cta: { text: "Get in touch to see how our Kids Yoga program can help your child day to day", image: `${S}/kids-yoga-cta.jpeg` },
    faqs: [
      {
        question: "Is yoga at Serendipity Wellness suitable for beginners?",
        answer:
          "Yes. Classes are limited to 5 students so the teacher can guide each student personally, and every pose can be adapted. Hatha and Yin are both good starting points if you are new to yoga.",
      },
      {
        question: "What is the difference between Hatha and Yin yoga?",
        answer:
          "Hatha yoga focuses on alignment, breath and holding active postures to build strength and flexibility. Yin yoga is slower and quieter, with mostly seated or lying poses held for several minutes to release deep tension and calm the nervous system.",
      },
      {
        question: "Where are the yoga classes held?",
        answer:
          "Classes take place at our home-based yoga studio in the quiet suburb of Edgemead, in the Northern Suburbs of Cape Town.",
      },
      {
        question: "What should I bring to a yoga class?",
        answer:
          "Bring your own yoga mat, a water bottle and comfortable clothing you can move freely in. Yoga is practised barefoot.",
      },
      {
        question: "Do you offer yoga classes for children?",
        answer:
          "Yes. Kids Yoga is for children aged 4 to 12. Classes combine poses, singing, art and mindfulness to build core strength, coordination and emotional awareness in a fun, no-pressure setting. Contact us to find out more.",
      },
    ],
    related: ["rehabilitation-yoga", "pre-post-natal-yoga", "mindfulness-meditation"],
  },
  {
    slug: "rehabilitation-yoga",
    name: "Rehabilitation Yoga",
    title: "Rehabilitation Yoga",
    seoTitle: "Rehabilitation Yoga in Edgemead, Cape Town | Injury Recovery",
    seoDescription:
      "Gentle, personalised rehabilitation yoga in Edgemead, Cape Town for recovery after surgery, stroke or heart events, and for back pain, neck pain, joint injuries and arthritis.",
    serviceType: "Rehabilitation yoga",
    hero: { src: `${S}/rehabilitation-yoga-hero.jpeg`, alt: "Gentle supported stretch during a rehabilitation yoga session" },
    intro: {
      heading: "Rehabilitation Yoga",
      paragraphs: [
        "Whether you are recovering from a life-threatening event such as a heart attack or stroke, or from an operation, and need support after your step-down facility to get your body and mind back on track, yoga can help.",
        "Rehabilitation yoga is often used to help people recover from conditions such as back pain, neck pain, joint injuries, arthritis, stroke and other medical conditions that limit mobility or cause discomfort. It can be practised in a therapeutic setting or in a yoga studio.",
      ],
      benefits: [
        {
          title: "Rebuilds mobility gently",
          text: "Slow, supported movement helps restore range of motion and confidence in your body at a pace that suits your recovery.",
        },
        {
          title: "Calms the nervous system",
          text: "Breathing and relaxation practices help manage pain, stress and the emotional side of recovery.",
        },
      ],
      image: { src: `${S}/rehabilitation-yoga-intro.jpeg`, alt: "Student using a strap for a supported stretch" },
    },
    sections: [],
    expect: {
      heading: "How rehabilitation yoga sessions work",
      paragraphs: [
        "Rehabilitation yoga is tailored to you. We start with a conversation about your history, current limitations and goals, then build a personalised package of sessions that progresses as you get stronger.",
        "Sessions use gentle movement, props, breathing and relaxation, and can complement the care you receive from your doctor or physiotherapist. Please check with your healthcare provider before starting, especially after surgery or a cardiac event.",
      ],
    },
    cta: { text: "Contact us to discuss a personalised package for your needs", image: `${S}/rehabilitation-yoga-cta.jpeg` },
    faqs: [
      {
        question: "Who is rehabilitation yoga for?",
        answer:
          "It is for anyone recovering from surgery, a stroke or a heart event, or living with back pain, neck pain, joint injuries, arthritis or other conditions that limit mobility or cause discomfort.",
      },
      {
        question: "Do I need my doctor's permission to start rehabilitation yoga?",
        answer:
          "We recommend checking with your doctor or physiotherapist before you begin, particularly after surgery, a stroke or a cardiac event. Rehabilitation yoga is designed to complement, not replace, medical care.",
      },
      {
        question: "Are rehabilitation yoga sessions one-on-one?",
        answer:
          "Rehabilitation yoga is offered as a personalised package built around your needs. Contact us to discuss your situation and the best format for you.",
      },
      {
        question: "Where do rehabilitation yoga sessions take place?",
        answer: "Sessions take place at our quiet home studio in Edgemead, in the Northern Suburbs of Cape Town.",
      },
    ],
    related: ["yoga", "therapeutic-massage", "mindfulness-meditation"],
  },
  {
    slug: "pre-post-natal-yoga",
    name: "Pre & Post Natal Yoga",
    title: "Pre- & Post-Natal Yoga",
    seoTitle: "Prenatal & Postnatal Yoga Classes in Edgemead, Cape Town",
    seoDescription:
      "Gentle prenatal and postnatal yoga in Edgemead, Cape Town. Breathing for labour, better circulation, pelvic and core recovery, and bonding with your baby.",
    serviceType: "Prenatal and postnatal yoga",
    hero: { src: `${S}/pre-post-natal-hero.jpeg`, alt: "New mother practising postnatal yoga" },
    intro: {
      heading: "Prenatal & Postnatal",
      paragraphs: [
        "Yoga is the practice of asana (postures) and pranayama (breath) to create balance in the body, mind and soul.",
        "During pregnancy and after birth, your body and needs change week by week. Our pre- and post-natal classes adapt with you, offering gentle movement, breathing and rest in a calm, supportive space in Edgemead.",
      ],
      image: { src: `${S}/pre-post-natal-intro.jpg`, alt: "Pregnant woman in a seated yoga pose" },
    },
    jumpLinks: [
      { label: "Prenatal", href: "#prenatal" },
      { label: "Postnatal", href: "#postnatal" },
    ],
    sections: [
      {
        id: "prenatal",
        name: "Prenatal Yoga",
        paragraphs: [
          "Prenatal yoga helps to increase flexibility, reduce stress and improve overall wellbeing. It is a gentle form of exercise that focuses on breathing and relaxation, and is generally considered safe throughout pregnancy.",
          "It can also help prepare you for childbirth by strengthening the pelvic muscles, reducing the risk of back pain and improving circulation.",
        ],
        benefits: [
          {
            title: "Better circulation",
            text: "Prenatal yoga improves blood circulation, reducing swelling and fatigue in the legs, feet and hands.",
          },
          {
            title: "Breathing techniques",
            text: "Yoga teaches breathing techniques that are useful during labour and delivery, helping you stay calm and relaxed.",
          },
        ],
        image: { src: `${S}/prenatal-yoga.jpg`, alt: "Pregnant woman stretching on a yoga mat" },
      },
      {
        id: "postnatal",
        name: "Postnatal Yoga",
        paragraphs: [
          "Postnatal yoga focuses on exercises that target the abdominal and pelvic muscles, as well as the upper body and hips. This helps improve posture and reduce tension in the back, neck and shoulders.",
          "In addition to the physical benefits, postnatal yoga also supports your mental and emotional wellbeing.",
        ],
        benefits: [
          {
            title: "Promotes bonding with baby",
            text: "Postnatal classes often include baby-friendly poses that help new mothers bond with their infants.",
          },
          {
            title: "Enhances mental wellbeing",
            text: "Yoga promotes mindfulness and stress relief, helping new mothers cope with the physical and emotional demands of motherhood.",
          },
        ],
        image: { src: `${S}/postnatal-yoga.jpg`, alt: "Mother doing postnatal yoga with her baby" },
      },
    ],
    expect: {
      heading: "Before you start",
      paragraphs: [
        "Let us know how far along you are, or how long ago you gave birth, and about any complications. Every pose is adapted for your stage, and you are always encouraged to rest when you need to.",
        "Please get the go-ahead from your doctor or midwife before starting prenatal yoga, and before returning to exercise after birth (usually after your six-week check, or later after a caesarean).",
      ],
    },
    cta: { text: "Get in touch to discuss how pre- and postnatal yoga can help you", image: `${S}/pre-post-natal-cta.jpg` },
    faqs: [
      {
        question: "When can I start prenatal yoga?",
        answer:
          "Many women start in the second trimester, but gentle prenatal yoga can be practised throughout pregnancy with your doctor's or midwife's approval. Let your teacher know how far along you are.",
      },
      {
        question: "When can I start postnatal yoga after giving birth?",
        answer:
          "Most mothers return after their six-week postnatal check, or later after a caesarean section. Always get clearance from your doctor or midwife first.",
      },
      {
        question: "Can I bring my baby to postnatal yoga?",
        answer:
          "Postnatal classes often include baby-friendly poses that help you bond with your baby. Contact us to check the current format.",
      },
      {
        question: "Do I need yoga experience for prenatal yoga?",
        answer: "No. Prenatal yoga is gentle and every pose is adapted, so it suits complete beginners.",
      },
    ],
    related: ["yoga", "mindfulness-meditation", "therapeutic-massage"],
  },
  {
    slug: "mindfulness-meditation",
    name: "Mindfulness & Meditation",
    title: "Meditation & Mindfulness",
    seoTitle: "Meditation & Mindfulness Classes in Edgemead, Cape Town",
    seoDescription:
      "Guided meditation and mindfulness in Edgemead, Cape Town, plus corporate mindfulness sessions for teams. Reduce stress and anxiety, improve focus and build resilience.",
    serviceType: "Meditation and mindfulness",
    hero: { src: `${S}/mindfulness-hero.jpeg`, alt: "Hands resting in a meditation mudra" },
    intro: {
      heading: "Meditation & Mindfulness",
      paragraphs: [
        "Meditation and mindfulness train the mind the way yoga trains the body. Through simple, guided practices you learn to slow down, notice what is happening right now and respond with more calm and clarity.",
        "We offer meditation and mindfulness for individuals at our studio in Edgemead, and as corporate wellness sessions for teams.",
      ],
      image: { src: `${S}/mindfulness-intro.jpg`, alt: "Woman meditating in a calm, light-filled room" },
    },
    jumpLinks: [
      { label: "Meditation", href: "#meditation" },
      { label: "Mindfulness", href: "#mindfulness" },
    ],
    sections: [
      {
        id: "meditation",
        name: "Meditation",
        paragraphs: [
          "Meditation is a mental exercise that involves focusing your attention on a particular object, thought or activity to increase awareness of the present moment and achieve a mentally clear and emotionally calm state.",
        ],
        benefits: [
          {
            title: "Reduces stress and anxiety",
            text: "Regular meditation can help you regulate your emotions and lower your levels of stress and anxiety.",
          },
          {
            title: "Supports immunity",
            text: "Research suggests regular meditation may support the healthy functioning of the immune system.",
          },
        ],
        image: { src: `${S}/meditation.jpg`, alt: "Person meditating cross-legged" },
      },
      {
        id: "mindfulness",
        name: "Mindfulness",
        paragraphs: [
          "Mindfulness is a mental state achieved by focusing your awareness on the present moment, while calmly acknowledging and accepting your feelings, thoughts and bodily sensations.",
          "It is often practised through mindfulness meditation, and can lead to greater self-awareness and reduced stress and anxiety.",
        ],
        benefits: [
          {
            title: "Improves mental clarity",
            text: "Mindfulness practices can improve focus and decision-making, helping you process information and think more clearly.",
          },
          {
            title: "Increases resilience",
            text: "Regular practice helps you cope better with challenges and setbacks, and bounce back from adversity.",
          },
        ],
        image: { src: `${S}/mindfulness.jpg`, alt: "Woman sitting peacefully with eyes closed" },
      },
    ],
    expect: {
      heading: "Mindfulness for teams",
      paragraphs: [
        "Stress and burnout affect focus, wellbeing and performance at work. Our corporate mindfulness and meditation sessions give teams simple, practical tools to manage stress, improve concentration and communicate with more calm.",
        "Sessions can be tailored to your workplace and team size. Get in touch to discuss what would suit your organisation.",
      ],
    },
    cta: { text: "Interested to see how mindfulness and meditation can help in the corporate space?", image: `${S}/corporate-wellness-cta.jpeg` },
    faqs: [
      {
        question: "What is the difference between meditation and mindfulness?",
        answer:
          "Meditation is a practice of focusing your attention, for example on the breath, to calm the mind. Mindfulness is the state of being fully aware of the present moment without judgement. Mindfulness meditation uses one to build the other.",
      },
      {
        question: "Do I need any experience to start meditating?",
        answer: "No. Sessions are guided step by step, so they are suitable for complete beginners.",
      },
      {
        question: "Do you offer corporate mindfulness or wellness sessions in Cape Town?",
        answer:
          "Yes. We run mindfulness and meditation sessions for teams and workplaces, tailored to your organisation. Contact us to discuss your needs.",
      },
      {
        question: "Can meditation help with stress and anxiety?",
        answer:
          "Regular meditation can help regulate emotions and lower stress and anxiety. It is not a substitute for medical or psychological treatment where that is needed.",
      },
    ],
    related: ["yoga", "therapeutic-massage", "pre-post-natal-yoga"],
  },
  {
    slug: "therapeutic-massage",
    name: "Therapeutic Massage",
    title: "Therapeutic Massage",
    seoTitle: "Therapeutic Massage in Edgemead, Cape Town | From R330",
    seoDescription:
      "Therapeutic massage in a peaceful home studio in Edgemead, Cape Town. Relieve pain and tension, reduce stress and improve mobility. 30, 45, 60 and 90 minute treatments from R330.",
    serviceType: "Therapeutic massage",
    hero: { src: `${S}/massage-hero.jpeg`, alt: "Therapist massaging a client's back" },
    intro: {
      heading: "Therapeutic Massage",
      paragraphs: [
        "This massage technique uses therapeutic manipulation, rubbing and pressing of the soft tissues (muscles, ligaments and tendons).",
        "The goal of therapeutic massage is to relieve pain, reduce stress, improve circulation and promote relaxation. It may also be used to help with recovery from injury, manage chronic conditions and improve overall wellbeing.",
      ],
      benefits: [
        {
          title: "Stress reduction",
          text: "Regular therapeutic massage can help reduce stress levels and promote a sense of relaxation.",
        },
        {
          title: "Improved mobility",
          text: "Massage therapy can help increase flexibility and range of motion in the joints, which can lead to improved mobility.",
        },
      ],
      image: { src: `${S}/massage-intro.jpg`, alt: "Client relaxing during a shoulder massage" },
    },
    sections: [],
    expect: {
      heading: "What to expect",
      paragraphs: [
        "Treatments take place in our quiet, home-based massage studio in Edgemead, created as a space of peace and tranquillity. Before your massage we chat about any areas of pain or tension, injuries and the pressure you prefer, so each treatment is tailored to you.",
        "Choose a 30-minute treatment for a focused area such as the neck and shoulders, or a 60- or 90-minute treatment for a full-body massage.",
      ],
    },
    pricing: [
      { label: "30 Min", price: 330 },
      { label: "45 Min", price: 420 },
      { label: "60 Min", price: 485 },
      { label: "90 Min", price: 660 },
    ],
    cta: {
      text: "Ready to ease the tension? Book your treatment online",
      image: `${S}/massage-hero.jpeg`,
      href: "https://booking.serendipitywellness.co.za/",
      label: "Check Availability",
    },
    faqs: [
      {
        question: "How much does a therapeutic massage cost?",
        answer: "A 30-minute treatment is R330, 45 minutes is R420, 60 minutes is R485 and 90 minutes is R660.",
      },
      {
        question: "What is the difference between therapeutic and relaxation massage?",
        answer:
          "A therapeutic massage targets specific areas of pain, tension or injury using focused techniques, while a relaxation massage uses lighter, flowing strokes mainly to unwind. Therapeutic massage still leaves you deeply relaxed.",
      },
      {
        question: "Where is the massage studio?",
        answer: "Our home-based massage studio is in Edgemead, in the Northern Suburbs of Cape Town.",
      },
      {
        question: "How do I book a massage?",
        answer:
          "Check availability and book online at booking.serendipitywellness.co.za, or contact us on WhatsApp or by phone on +27 79 085 6100.",
      },
    ],
    related: ["yoga", "rehabilitation-yoga", "mindfulness-meditation"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
