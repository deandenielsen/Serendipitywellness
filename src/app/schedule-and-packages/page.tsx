import { PageHero } from "@/components/sections/page-hero";
import { ScrollingText } from "@/components/sections/scrolling-text";
import { BookingButton, CtaCard, FaqList } from "@/components/sections/service-blocks";
import { ParallaxImage, ScrollFloat } from "@/components/motion/parallax";
import { SplitReveal } from "@/components/motion/split-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  adultPackages,
  adultSchedule,
  classSize,
  kidsTeens,
  privateClassesFrom,
  scheduleFaqs,
} from "@/content/schedule";
import { BUSINESS_ID, absoluteUrl, breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

const PATH = "/schedule-and-packages/";
const IMG = "/images/services";

export const metadata = pageMetadata({
  title: "Yoga Class Schedule & Prices in Edgemead, Cape Town",
  description: `Weekly yoga timetable and prices for Serendipity Wellness, Edgemead. Drop-in R145, 5 class pass R630, 10 class pass R1050, private classes from R${privateClassesFrom}. Max ${classSize} students per class.`,
  path: PATH,
  image: `${IMG}/schedule-hero.jpeg`,
});

function offer(name: string, price: number, description?: string) {
  return { "@type": "Offer", name, price, priceCurrency: "ZAR", ...(description && { description }) };
}

const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${absoluteUrl(PATH)}#packages`,
  name: "Yoga classes, packages and fees",
  url: absoluteUrl(PATH),
  offeredBy: { "@id": BUSINESS_ID },
  itemListElement: [
    ...adultPackages.map((p) => offer(`Adult yoga – ${p.name}`, p.price)),
    offer("Private one-on-one yoga class", privateClassesFrom, "Starting price, in studio or at home"),
    ...kidsTeens.flatMap((k) => k.prices.map((p) => offer(`${k.name} (${p.unit})`, p.price))),
  ],
};

function Heading({ eyebrow, script, light }: { eyebrow?: string; script: string; light?: string }) {
  return (
    <>
      {eyebrow && <p className="text-[18px] lg:text-[1.3vw]">{eyebrow}</p>}
      <SplitReveal as="h2" text={script} className="script-heading text-[44px] lg:text-[3.6vw]" />
      {light && <SplitReveal as="p" text={light} delay={0.1} className="light-heading mt-1 text-[32px] lg:text-[2.6vw]" />}
    </>
  );
}

function Price({ name, price, unit }: { name: string; price: number; unit?: string }) {
  return (
    <div>
      <p className="text-[15px] font-semibold">{name}</p>
      <p className="text-[15px]">
        R{price}
        {unit && ` ${unit}`}
      </p>
    </div>
  );
}

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <ScrollFloat distance={30}>
      <ParallaxImage
        src={src}
        alt={alt}
        distance={30}
        sizes="(min-width: 1024px) 42vw, 90vw"
        className="aspect-square rounded-[10px] shadow-[0_30px_90px_rgba(0,0,0,0.16)]"
      />
    </ScrollFloat>
  );
}

export default function SchedulePage() {
  return (
    <>
      <JsonLd
        data={[
          offersJsonLd,
          faqJsonLd(scheduleFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Schedule and Packages", path: PATH },
          ]),
        ]}
      />

      <PageHero
        title="Class Schedules & Packages"
        image={`${IMG}/schedule-hero.jpeg`}
        alt="Hands resting in prayer position at the end of a yoga class"
      />

      {/* Weekly timetable */}
      <section id="content" className="scroll-mt-28 px-6 py-16 sm:px-10 lg:px-[3.2vw] lg:py-[6vw]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:gap-[4vw]">
          <div>
            <Heading script="Adult Class Schedule" light="Book your next class now" />
            <BookingButton className="mt-8" />
            <p className="mt-8 text-[15px] leading-[1.7]">
              All classes have {classSize} spots available.
              <br />
              Please bring your own mat.
            </p>
          </div>
          <table className="w-full">
            <caption className="sr-only">Weekly adult yoga class times</caption>
            <tbody>
              {adultSchedule.map((row) => (
                <tr key={row.day} className="align-baseline">
                  <th scope="row" className="light-heading py-4 pr-6 text-left text-[28px] lg:text-[2.2vw]">
                    {row.day}
                  </th>
                  <td className="py-4 text-[20px] font-light tracking-[-0.02em] lg:text-[1.6vw]">
                    {row.times.join(" & ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ScrollingText />

      {/* Adult fees */}
      <Feature image={{ src: `${IMG}/adult-yoga-packages.jpg`, alt: "Woman in a yoga pose with hands in prayer position" }} imageSide="right" id="adult-packages">
        <Heading eyebrow="Adult" script="Fees & Packages" />
        <p className="mt-5 text-[15px] leading-[1.7]">
          We offer a variety of class packages for more structured yoga students, or a once-off drop-in fee for yoga
          students with a busier schedule.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {adultPackages.map((p) => (
            <Price key={p.name} {...p} />
          ))}
        </div>
        <p className="mt-8 text-[15px] leading-[1.7]">
          Packages can be rolled over for 1 month, and all cancellations need to be made 24 hours before the class to
          avoid losing a class.
        </p>
        <h3 className="script-heading mt-10 text-[28px]">Private Classes</h3>
        <p className="mt-2 text-[15px] leading-[1.7]">
          Private one-on-one classes can be arranged in studio, or in the comfort of your own home, starting from R
          {privateClassesFrom} per class.
        </p>
        <BookingButton className="mt-8" />
      </Feature>

      {/* Kids & teens */}
      <Feature image={{ src: `${IMG}/kids-teen-yoga.jpg`, alt: "Mother and daughter doing yoga together" }} imageSide="left" id="kids-teens">
        <Heading script="Kids & Teens" />
        <p className="mt-5 text-[15px] leading-[1.7]">
          We offer Kids Yoga, Mindfulness &amp; Art classes as well as Teen Stress Management classes.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6">
          {kidsTeens.map((k) => (
            <div key={k.name}>
              <p className="text-[15px] font-semibold">{k.name}</p>
              {k.prices.map((p) => (
                <p key={p.unit} className="text-[15px]">
                  R{p.price} {p.unit}
                </p>
              ))}
            </div>
          ))}
        </div>
        <BookingButton className="mt-8" />
      </Feature>

      <FaqList faqs={scheduleFaqs} heading="Classes, prices & booking" />

      <CtaCard
        text="Ready to roll out your mat? Book your next class online"
        image={`${IMG}/yoga-intro.jpg`}
        href="https://booking.serendipitywellness.co.za/"
        label="Check Availability"
      />
    </>
  );
}

function Feature({
  id,
  image,
  imageSide,
  children,
}: {
  id: string;
  image: { src: string; alt: string };
  imageSide: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-6 py-16 sm:px-10 lg:px-[3.2vw] lg:py-[6vw]">
      <div className={cn("flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[6vw]", imageSide === "left" && "lg:flex-row-reverse")}>
        <div className={cn("lg:w-1/2", imageSide === "right" ? "lg:pl-[4.5vw]" : "lg:pr-[3vw]")}>{children}</div>
        <div className="lg:w-1/2">
          <PhotoCard {...image} />
        </div>
      </div>
    </section>
  );
}
