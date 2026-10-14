"use server";

import { siteConfig } from "@/lib/site-config";
import { sendStudioEmail } from "@/lib/email";

export type NotifyState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fields?: Partial<Record<"name" | "email", string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Let me know about future retreats": emails the person's details to the studio. */
export async function requestRetreatUpdates(_prev: NotifyState, formData: FormData): Promise<NotifyState> {
  if (String(formData.get("company") ?? "").trim()) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const retreat = String(formData.get("retreat") ?? "").trim().slice(0, 150);

  const fields: NonNullable<Extract<NotifyState, { status: "error" }>["fields"]> = {};
  if (!name) fields.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) fields.email = "Please enter a valid email address.";
  if (Object.keys(fields).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fields };
  }

  const sent = await sendStudioEmail({
    subject: `Retreat updates request from ${name}`,
    heading: "Please let me know about future retreats",
    replyTo: email,
    rows: [
      ["Name", name],
      ["Email", email],
      ["Signed up from", retreat || "Retreats page"],
    ],
  });
  return sent
    ? { status: "success" }
    : {
        status: "error",
        message: `Sorry, that didn't go through. Please email ${siteConfig.contact.email} and we'll add you to the list.`,
      };
}
