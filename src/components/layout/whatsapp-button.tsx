"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { WhatsAppIcon } from "@/components/ui/social-icons";

/**
 * Floating WhatsApp shortcut, bottom right: a small brand-teal circle. The link itself is a
 * 44px square around it so it stays easy to tap on phones.
 */
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
      className="group fixed bottom-[22px] right-[22px] z-40 flex h-11 w-11 items-center justify-center"
    >
      <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-brand-deep text-white shadow-[0_3px_10px_rgba(58,72,76,0.25)] transition-transform duration-300 group-hover:scale-110">
        <WhatsAppIcon className="h-4 w-4" />
      </span>
    </motion.a>
  );
}

export { WhatsAppButton };
