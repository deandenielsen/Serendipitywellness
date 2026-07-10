import { RefreshCw } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { BookedClassCard } from "@/components/bookings/booked-class-card";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/lib/types";

export const metadata = { title: "Recurring Classes" };

export default async function RecurringPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", user!.id)
    .eq("status", "booked")
    .eq("is_recurring", true)
    .order("day", { ascending: true })
    .returns<Booking[]>();

  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <PageHeading
        eyebrow="Weekly"
        title="Recurring classes"
        intro='These classes repeat weekly. Tick "Make this a recurring weekly class" when booking to add one.'
      />

      {!bookings || bookings.length === 0 ? (
        <div className="py-16 text-center">
          <RefreshCw className="mx-auto mb-4 text-copy/20" size={56} />
          <p className="text-copy/70">No recurring classes yet.</p>
          <p className="mt-1 text-small text-copy/50">
            When booking a class, tick &ldquo;Make this a recurring weekly class&rdquo; to add it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <BookedClassCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </Container>
  );
}
