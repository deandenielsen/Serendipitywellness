import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LogoWordmark } from "@/components/logo";
import { siteConfig } from "@/lib/site-config";

const TEXT_SHADOW_SM =
  "0 0 3px rgba(254,252,255,0.9), 0 1px 14px rgba(254,252,255,0.85)";
const TEXT_SHADOW_LG =
  "0 0 5px rgba(254,252,255,0.9), 0 2px 22px rgba(254,252,255,0.85)";

function Hero() {
  return (
    <section className="pb-24 md:pb-32">
      <Container size="wide">
        <div className="relative">
          <div
            className="relative w-full overflow-hidden rounded-app"
            style={{ height: "min(74vh, 660px)", minHeight: 460 }}
          >
            <Image
              src="/hero.jpg"
              alt="Sunlit yoga studio with warm timber floors, a rolled mat and props, and floor-to-ceiling glass onto greenery"
              fill
              priority
              sizes="(min-width: 1320px) 1320px, 100vw"
              style={{ objectFit: "cover", objectPosition: "center 42%" }}
            />
          </div>

          {/* centered hero copy, overlaid on the image */}
          <div className="pointer-events-none absolute inset-0 z-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="w-full max-w-[780px]">
              <div
                className="mb-5 whitespace-normal text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-copy sm:text-small sm:tracking-[0.2em]"
                style={{ textShadow: TEXT_SHADOW_SM }}
              >
                {siteConfig.heroEyebrow}
              </div>
              <h1
                className="text-h1 font-semibold tracking-[-0.01em] text-copy"
                style={{ lineHeight: 1.05, textShadow: TEXT_SHADOW_LG }}
              >
                {siteConfig.tagline}
              </h1>
            </div>
          </div>

          {/* top-left niche: wordmark, cut into the image corner */}
          <div className="absolute left-0 top-0 z-2 rounded-br-2xl bg-background py-0 pb-[22px] pr-6">
            <div className="flex items-center px-1.5 pt-3.5">
              <LogoWordmark />
            </div>
            <span
              aria-hidden
              className="absolute left-full top-0 h-4 w-4"
              style={{
                background:
                  "radial-gradient(circle at bottom right, transparent 16px, var(--color-background) 16px)",
              }}
            />
            <span
              aria-hidden
              className="absolute left-0 top-full h-4 w-4"
              style={{
                background:
                  "radial-gradient(circle at bottom right, transparent 16px, var(--color-background) 16px)",
              }}
            />
          </div>

          {/* bottom-right niche: Book a Class, cut into the image corner */}
          <div className="absolute bottom-0 right-0 z-2 rounded-tl-2xl bg-background py-0 pl-5 pt-5">
            <Link
              href={siteConfig.bookCtaHref}
              className="inline-flex items-center gap-3 rounded-app bg-primary-strong px-6 py-4 text-small font-medium tracking-[0.04em] text-white transition-colors hover:bg-primary-strong/90"
            >
              {siteConfig.bookCtaLabel}
              <ArrowRight size={17} />
            </Link>
            <span
              aria-hidden
              className="absolute bottom-0 right-full h-4 w-4"
              style={{
                background:
                  "radial-gradient(circle at top left, transparent 16px, var(--color-background) 16px)",
              }}
            />
            <span
              aria-hidden
              className="absolute bottom-full right-0 h-4 w-4"
              style={{
                background:
                  "radial-gradient(circle at top left, transparent 16px, var(--color-background) 16px)",
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Hero };
