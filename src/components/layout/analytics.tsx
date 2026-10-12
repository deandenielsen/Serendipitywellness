"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, GA_ID, getConsent, isProductionHost, track } from "@/lib/analytics";

/** Which outbound links count as enquiries, by href. */
function linkEvent(href: string): [string, Record<string, unknown>] | null {
  if (href.startsWith("https://wa.me/")) return ["whatsapp_click", {}];
  if (href.startsWith("tel:")) return ["phone_click", {}];
  if (href.startsWith("mailto:")) return ["email_click", {}];
  if (href.includes("booking.serendipitywellness.co.za")) return ["booking_click", {}];
  return null;
}

/**
 * Loads gtag.js once the visitor has accepted analytics cookies on the live domain, and reports
 * clicks on WhatsApp, phone, email and booking links as events. Page views (including client-side
 * navigation) come from GA4's enhanced measurement.
 */
function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isProductionHost()) return;
    const sync = () => setEnabled(getConsent() === "granted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const match = linkEvent(link.getAttribute("href") ?? "");
      if (match) track(match[0], { ...match[1], page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}

export { Analytics };
