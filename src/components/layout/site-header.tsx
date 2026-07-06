"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background">
      <Container
        size="wide"
        className="flex items-center justify-between gap-6 py-6 md:py-[26px]"
      >
        <Link href="/" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
          <LogoIcon className="ml-2" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small font-normal uppercase tracking-[0.06em] text-copy transition-colors hover:text-primary-strong"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="ghost" size="sm" className="uppercase tracking-[0.06em]">
            <Link href={siteConfig.headerCtaHref}>{siteConfig.headerCtaLabel}</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-app text-copy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-secondary bg-background md:hidden"
          >
            <Container size="wide" className="flex flex-col gap-1 py-4">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-app px-3 py-3 text-body font-normal uppercase tracking-[0.06em] text-copy hover:bg-secondary/60"
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                variant="ghost"
                className="mt-2 w-full uppercase tracking-[0.06em]"
                onClick={() => setOpen(false)}
              >
                <Link href={siteConfig.headerCtaHref}>{siteConfig.headerCtaLabel}</Link>
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export { SiteHeader };
