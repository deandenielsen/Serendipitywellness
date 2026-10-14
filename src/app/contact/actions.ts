"use server";

import { siteConfig } from "@/lib/site-config";
import { sendStudioEmail } from "@/lib/email";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email" | "phone", string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;

/** Validates the contact form and emails it to the studio. */
export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("company") ?? "").trim()) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, 30);
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);

  const fields: NonNullable<Extract<ContactState, { status: "error" }>["fields"]> = {};
  if (!name) fields.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) fields.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(phone)) fields.phone = "Please enter a valid mobile number.";
  if (Object.keys(fields).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fields };
  }

  const sent = await sendStudioEmail({
    subject: `New website enquiry from ${name}`,
    heading: "New website enquiry",
    replyTo: email,
    rows: [
      ["Name", name],
      ["Email", email],
      ["Mobile", phone],
      ["Message", message || "(no message)"],
    ],
  });
  return sent ? { status: "success" } : { status: "error", message: unavailableMessage() };
}

function unavailableMessage() {
  return `Sorry, your message couldn't be sent right now. Please WhatsApp or call us on ${siteConfig.contact.phone}, or email ${siteConfig.contact.email}.`;
}
