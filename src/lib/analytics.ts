/**
 * Google Analytics 4, loaded only after the visitor accepts the cookie banner and only on the
 * real domain (so testing on vercel.app or locally never skews the numbers).
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-7LNC3JECB2";

const PRODUCTION_HOSTS = ["serendipitywellness.co.za", "www.serendipitywellness.co.za"];
export const isProductionHost = () => PRODUCTION_HOSTS.includes(window.location.hostname);

/* Consent */

export type Consent = "granted" | "denied";
const CONSENT_KEY = "sw-cookie-consent";
export const CONSENT_EVENT = "sw-consent-change";
export const OPEN_SETTINGS_EVENT = "sw-open-cookie-settings";

export function getConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  // Switch GA off immediately if consent is withdrawn after it has loaded.
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = value !== "granted";
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));

/* Events */

type Gtag = (...args: unknown[]) => void;

/** Sends a GA4 event; a no-op until GA has loaded (no consent, or not the live domain). */
export function track(event: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", event, params);
}
