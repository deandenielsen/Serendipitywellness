import { siteConfig } from "@/lib/site-config";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * Emails the studio inbox through Resend's HTTP API. Returns false (and logs why) if the key
 * is missing or Resend rejects the message, so callers can show a friendly fallback.
 */
export async function sendStudioEmail({
  subject,
  heading,
  rows,
  replyTo,
}: {
  subject: string;
  heading: string;
  rows: [string, string][];
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Email: RESEND_API_KEY is not set");
    return false;
  }

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || `Serendipity Wellness Website <website@serendipitywellness.co.za>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        ...(replyTo && { reply_to: replyTo }),
        subject,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
        html: `<h2 style="font-family:sans-serif">${escapeHtml(heading)}</h2>${rows
          .map(
            ([k, v]) =>
              `<p style="font-family:sans-serif"><strong>${k}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`,
          )
          .join("")}`,
      }),
    });
    if (!res.ok) {
      console.error("Email: Resend responded", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email: request to Resend failed", err);
    return false;
  }
}

/**
 * Saves someone to the Resend contacts list (for Broadcasts later). Needs a Resend API key with
 * full access; if RESEND_SEGMENT_ID is set, the contact is also added to that segment.
 * Returns false (and logs why) on failure, so callers can still fall back to the email copy.
 */
export async function saveMarketingContact({ email, name }: { email: string; name: string }): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contacts: RESEND_API_KEY is not set");
    return false;
  }
  const [firstName, ...rest] = name.split(/\s+/);
  const segmentId = process.env.RESEND_SEGMENT_ID;

  try {
    const res = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        first_name: firstName,
        ...(rest.length > 0 && { last_name: rest.join(" ") }),
        unsubscribed: false,
        ...(segmentId && { segments: [{ id: segmentId }] }),
      }),
    });
    if (!res.ok) {
      console.error("Contacts: Resend responded", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Contacts: request to Resend failed", err);
    return false;
  }
}
