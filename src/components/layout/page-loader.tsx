"use client";

import { motion } from "framer-motion";

/** Grey veil that lifts on first load, matching the old site's page transition. */
function PageLoader() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] bg-[#5f5f5f] motion-reduce:hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
    />
  );
}

export { PageLoader };
