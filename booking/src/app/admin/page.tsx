import { ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { createClient } from "@/lib/supabase/server";
import { sortClasses } from "@/lib/schedule";
import type { Booking, Profile, ScheduledClass } from "@/lib/types";
import type { RosterMap } from "@/components/schedule/roster";
import { AdminManager } from "./admin-manager";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user!.id)
    .single<{ role: string }>();

  if (profile?.role !== "admin") {
    return (
      <Container className="max-w-md py-20 text-center">
        <ShieldAlert className="mx-auto mb-4 text-copy/30" size={48} />
        <h1 className="mb-2 font-serif text-h3 font-semibold text-copy">
          Admin access required
        </h1>
        <p className="text-small text-copy/60">
          You need admin permissions to view this page.
        </p>
      </Container>
    );
  }

  const [{ data: classes }, { data: bookings }, { data: profiles }] =
    await Promise.all([
      supabase.from("class_schedule").select("*").returns<ScheduledClass[]>(),
      supabase.from("bookings").select("*").eq("status", "booked").returns<Booking[]>(),
      supabase.from("profiles").select("*").returns<Profile[]>(),
    ]);

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
  const roster: RosterMap = {};
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

  return (
    <Container className="max-w-4xl py-10 sm:py-14">
      <PageHeading
        eyebrow="Admin"
        title="Manage classes"
        intro="Add, edit or remove classes and view who's booked in."
      />
      <AdminManager classes={sortClasses(classes ?? [])} roster={roster} />
    </Container>
  );
}
