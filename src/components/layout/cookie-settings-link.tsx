"use client";

import { openCookieSettings } from "@/lib/analytics";

function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}

export { CookieSettingsLink };
