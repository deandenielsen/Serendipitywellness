import { siteConfig } from "@/lib/site-config";

interface BookingEmail {
  to: string;
  name: string | null;
  className: string;
  level: string | null;
  day: string;
  time: string;
  dateLabel: string;
}

/**
 * Sends a booking confirmation via Resend (free tier: 100 emails/day).
 * Silently skipped when RESEND_API_KEY / EMAIL_FROM are not configured —
 * bookings never fail because of email.
 */
export async function sendBookingConfirmation(email: BookingEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return;

  const { to, name, className, level, day, time, dateLabel } = email;

  const html = `
    <div style="font-family: 'Poppins', sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #f7f7f7; border-radius: 10px;">
      <h2 style="color: #517c84; margin-bottom: 20px; font-weight: 600;">Booking Confirmed ✓</h2>
      <p style="color: #4a5b5f;">Hi ${name || "there"},</p>
      <p style="color: #4a5b5f;">Your class has been booked successfully:</p>
      <div style="background: #ffffff; padding: 20px; border-radius: 10px; margin: 16px 0;">
        <p style="margin: 4px 0; color: #4a5b5f;"><strong>Class:</strong> ${className}${level ? ` (${level})` : ""}</p>
        <p style="margin: 4px 0; color: #4a5b5f;"><strong>Day:</strong> ${day}</p>
        <p style="margin: 4px 0; color: #4a5b5f;"><strong>Time:</strong> ${time}</p>
        <p style="margin: 4px 0; color: #4a5b5f;"><strong>Date:</strong> ${dateLabel}</p>
      </div>
      <p style="color: #8a9a9e; font-size: 13px;">See you on the mat! — ${siteConfig.name}</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject: `Booking Confirmed — ${className}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Booking email failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Booking email failed:", err);
  }
}
