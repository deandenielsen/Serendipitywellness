"use server";

import { siteConfig } from "@/lib/site-config";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email" | "phone", string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Validates the contact form and emails it to the studio through Resend's HTTP API. */
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set");
    return { status: "error", message: unavailableMessage() };
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || `Serendipity Wellness Website <website@serendipitywellness.co.za>`;

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Mobile", phone],
    ["Message", message || "(no message)"],
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New website enquiry from ${name}`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
        html: `<h2 style="font-family:sans-serif">New website enquiry</h2>${rows
          .map(
            ([k, v]) =>
              `<p style="font-family:sans-serif"><strong>${k}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`,
          )
          .join("")}`,
      }),
    });
    if (!res.ok) {
      console.error("Contact form: Resend responded", res.status, await res.text());
      return { status: "error", message: unavailableMessage() };
    }
  } catch (err) {
    console.error("Contact form: request to Resend failed", err);
    return { status: "error", message: unavailableMessage() };
  }

  return { status: "success" };
}

function unavailableMessage() {
  return `Sorry, your message couldn't be sent right now. Please WhatsApp or call us on ${siteConfig.contact.phone}, or email ${siteConfig.contact.email}.`;
}
