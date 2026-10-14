import { getRetreat, retreats } from "@/content/retreats";
import { absoluteUrl } from "@/lib/seo";

// One static .ics file per retreat, so "Add to calendar" works with any calendar app.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return retreats.map((r) => ({ slug: r.slug }));
}

const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const escape = (text: string) => text.replace(/[\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const retreat = getRetreat((await params).slug);
  if (!retreat) return new Response("Not found", { status: 404 });

  const { venue } = retreat;
  const url = absoluteUrl(`/retreats/${retreat.slug}/`);
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Serendipity Wellness//Retreats//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${retreat.slug}@serendipitywellness.co.za`,
    `DTSTAMP:${icsDate(retreat.start)}`,
    `DTSTART:${icsDate(retreat.start)}`,
    `DTEND:${icsDate(retreat.end)}`,
    `SUMMARY:${escape(`${retreat.name} – Serendipity Wellness`)}`,
    `DESCRIPTION:${escape(`${retreat.intro}\n\n${url}`)}`,
    `LOCATION:${escape(`${venue.name}, ${venue.street}, ${venue.area}, ${venue.city}`)}`,
    `GEO:${venue.lat};${venue.lng}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${retreat.slug}.ics"`,
    },
  });
}
