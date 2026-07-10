import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { CLASS_GUIDE, PRICING } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <PageHeading
        eyebrow="Sessions"
        title="Class prices"
        intro="Group classes, packages and private session pricing."
      />

      <div className="space-y-6">
        {PRICING.map((category) => (
          <div
            key={category.category}
            className="overflow-hidden rounded-app border border-secondary bg-surface"
          >
            <div className="bg-secondary/40 px-6 py-4">
              <h2 className="font-serif text-h3 font-semibold text-copy">
                {category.category}
              </h2>
              {category.intro && (
                <p className="mt-1 text-small text-copy/60">{category.intro}</p>
              )}
            </div>
            <div className="divide-y divide-secondary/60">
              {category.tiers.map((tier, i) => (
                <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="font-medium text-copy">{tier.label}</p>
                    {tier.note && <p className="text-small text-copy/60">{tier.note}</p>}
                  </div>
                  <p className="shrink-0 text-xl font-semibold text-primary-strong">
                    {tier.price}
                  </p>
                </div>
              ))}
            </div>
            {category.enquire && (
              <div className="border-t border-secondary/60 bg-background px-6 py-4">
                <a
                  href={`mailto:${siteConfig.contactEmail}?subject=Enquiry: ${category.category}`}
                  className="inline-block rounded-app bg-primary-strong px-5 py-2.5 text-small font-medium text-white transition-colors hover:bg-primary-strong/90"
                >
                  Get in Touch
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="mb-6 text-center">
          <h2 className="font-serif text-h3 font-semibold text-copy">Our classes</h2>
          <p className="mx-auto mt-2 max-w-md text-small text-copy/60">
            All classes are small and intimate so every student receives individual
            attention, consistent cues and corrections.
          </p>
        </div>
        <div className="space-y-4">
          {CLASS_GUIDE.map((item) => (
            <div key={item.title} className="rounded-app border border-secondary bg-surface p-5">
              <h3 className="mb-2 font-serif text-body font-semibold text-copy">{item.title}</h3>
              <p className="text-small leading-relaxed text-copy/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-small text-copy/50">
        Contact us to find the right session type for you.
      </p>
    </Container>
  );
}
