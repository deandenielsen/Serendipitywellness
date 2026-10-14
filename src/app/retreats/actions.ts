"use server";

import { siteConfig } from "@/lib/site-config";
import { saveMarketingContact, sendStudioEmail } from "@/lib/email";
import { MARKETING_CONSENT_TEXT } from "@/lib/consent";

export type NotifyState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email" | "consent", string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Let me know about future retreats": saves the person as a Resend contact (for marketing
 * Broadcasts) and emails the studio a copy with the consent record.
 */
export async function requestRetreatUpdates(_prev: NotifyState, formData: FormData): Promise<NotifyState> {
  if (String(formData.get("company") ?? "").trim()) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  const consent = formData.get("consent") === "yes";
  const retreat = String(formData.get("retreat") ?? "").trim().slice(0, 150);

  const fields: NonNullable<Extract<NotifyState, { status: "error" }>["fields"]> = {};
  if (!name) fields.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) fields.email = "Please enter a valid email address.";
  if (!consent) fields.consent = "Please tick the box so we're allowed to email you.";
  if (Object.keys(fields).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fields };
  }

  // Save first so the studio's copy can say whether it reached the contacts list.
  const saved = await saveMarketingContact({ email, name });
  const emailed = await sendStudioEmail({
    subject: `Retreat updates sign-up: ${name}`,
    heading: "New sign-up for retreat updates",
    replyTo: email,
    rows: [
      ["Name", name],
      ["Email", email],
      ["Signed up from", retreat || "Retreats page"],
      ["Marketing consent", `Given ${new Date().toISOString()}: "${MARKETING_CONSENT_TEXT}"`],
      ["Saved to Resend contacts", saved ? "Yes" : "No, please add them manually"],
    ],
  });

  return saved || emailed
    ? { status: "success" }
    : {
        status: "error",
        message: `Sorry, that didn't go through. Please email ${siteConfig.contact.email} and we'll add you to the list.`,
      };
}
