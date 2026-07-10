import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { ScheduleView } from "@/components/schedule/schedule-view";
import { createClient } from "@/lib/supabase/server";
import type { Booking, Profile, ScheduledClass } from "@/lib/types";
import type { RosterMap } from "@/components/schedule/roster";

export const metadata = { title: "Weekly Schedule" };

export default async function SchedulePage() {
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("class_schedule")
    .select("*")
    .returns<ScheduledClass[]>();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  let roster: RosterMap | null = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single<{ role: string }>();
    isAdmin = profile?.role === "admin";

    if (isAdmin) {
      // Small-studio scale: fetch all active bookings + profiles up front so
      // the admin sees a live roster inside every booking dialog.
      const [{ data: bookings }, { data: profiles }] = await Promise.all([
        supabase.from("bookings").select("*").eq("status", "booked").returns<Booking[]>(),
        supabase.from("profiles").select("*").returns<Profile[]>(),
      ]);
      const profileMap = new Map(
        (profiles ?? []).map((p) => [p.id, p])
      );
      roster = {};
      for (const b of bookings ?? []) {
        const key = `${b.class_name}|${b.day}|${b.time}`;
        const p = profileMap.get(b.user_id) as
          | (Profile & { email?: string | null })
          | undefined;
        (roster[key] ??= []).push({
          bookingId: b.id,
          name: p?.full_name ?? "Unknown student",
          email: p?.email ?? "",
          classDate: b.class_date,
          isRecurring: b.is_recurring,
        });
      }
    }
  }

  return (
    <Container className="py-10 sm:py-14">
      <PageHeading
        eyebrow="Timetable"
        title="Weekly class schedule"
        intro="Find a time that works for you and book your spot."
      />
      <div className="rounded-app bg-surface p-2 shadow-[0_4px_18px_0_rgba(74,91,95,0.08)] sm:p-4">
        <ScheduleView
          classes={classes ?? []}
          isAuthenticated={!!user}
          roster={roster}
        />
      </div>
    </Container>
  );
}
