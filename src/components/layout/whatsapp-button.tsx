"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/ui/social-icons";

/** Floating "Got Questions? Let's Talk" WhatsApp shortcut, bottom right. */
function WhatsAppButton() {
  return (
    <motion.a
      href={siteConfig.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
      className="group fixed bottom-[30px] right-[30px] z-40 flex items-center gap-[7px]"
    >
      <span className="hidden rounded-[2px] bg-white px-3 py-[7px] font-[Arial,Helvetica,sans-serif] text-[11px] text-ink-soft shadow-[0_1px_6px_rgba(0,0,0,0.15)] sm:block">
        Got Questions? <strong className="text-ink">Let&apos;s Talk</strong>
      </span>
      <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-transform duration-300 group-hover:scale-105">
        <WhatsAppIcon className="h-8 w-8" />
      </span>
    </motion.a>
  );
}

export { WhatsAppButton };
