import { CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { BookedClassCard } from "@/components/bookings/booked-class-card";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/lib/types";

export const metadata = { title: "My Classes" };

export default async function MyClassesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", user!.id)
    .eq("status", "booked")
    .order("class_date", { ascending: true })
    .returns<Booking[]>();

  return (
    <Container className="max-w-2xl py-10 sm:py-14">
      <PageHeading
        eyebrow="My Classes"
        title="Your booked classes"
        intro="Cancel a booking with the delete icon — recurring classes repeat every week."
      />

      {!bookings || bookings.length === 0 ? (
        <div className="py-16 text-center">
          <CalendarDays className="mx-auto mb-4 text-copy/20" size={56} />
          <p className="text-copy/70">No classes booked yet.</p>
          <p className="mt-1 text-small text-copy/50">
            Head to the schedule to book your first class!
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
