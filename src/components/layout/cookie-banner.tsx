"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { OPEN_SETTINGS_EVENT, getConsent, setConsent, type Consent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

/**
 * Asks before any analytics cookies are set. Shown until the visitor chooses, and again from
 * the "Cookie settings" link in the footer so they can change their mind (POPIA).
 */
function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) {
      // Let the page loader finish before the banner slides in.
      const t = window.setTimeout(() => setOpen(true), 2200);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (value: Consent) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-[60] rounded-[10px] bg-white p-5 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:inset-x-auto sm:left-[30px] sm:bottom-[30px] sm:max-w-[400px]"
        >
          <p className="script-heading text-[24px]">A quick note on cookies</p>
          <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">
            We&apos;d like to use Google Analytics cookies to see how people find and use our site, so we can keep
            improving it. No advertising, and we never sell your data.{" "}
            <Link prefetch={false} href={`${siteConfig.privacyHref}#cookies`} className="border-b border-current hover:text-brand-teal">
              Privacy policy
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="flex-1 rounded-full bg-[#333] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="flex-1 rounded-full border border-black/20 px-5 py-2.5 text-[14px] font-medium transition-colors hover:border-black"
            >
              No thanks
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { CookieBanner };
