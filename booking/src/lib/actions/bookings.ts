"use server";

import { revalidatePath } from "next/cache";
import { format, parseISO, startOfDay } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { sendBookingConfirmation } from "@/lib/email";
import { DAYS, type Booking, type ScheduledClass } from "@/lib/types";

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function createBooking(input: {
  scheduleId: string;
  classDate: string; // "yyyy-MM-dd"
  isRecurring: boolean;
}): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Please log in to book a class." };

  const { data: cls } = await supabase
    .from("class_schedule")
    .select("*")
    .eq("id", input.scheduleId)
    .single<ScheduledClass>();
  if (!cls) return { ok: false, error: "This class no longer exists." };

  // The chosen date must actually fall on the class's weekday, and not be past.
  let date: Date;
  try {
    date = parseISO(input.classDate);
  } catch {
    return { ok: false, error: "Invalid class date." };
  }
  const weekday = DAYS[(date.getDay() + 6) % 7]; // JS Sunday=0 → our Monday-first index
  if (weekday !== cls.day) {
    return { ok: false, error: "That date doesn't match this class's day." };
  }
  if (startOfDay(date) < startOfDay(new Date())) {
    return { ok: false, error: "That class has already taken place." };
  }

  const { error } = await supabase.from("bookings").insert({
    user_id: user.id,
    class_name: cls.class_name,
    day: cls.day,
    time: cls.time,
    class_date: input.classDate,
    status: "booked",
    is_recurring: input.isRecurring,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, error: "You've already booked this class." };
    }
    console.error("createBooking failed:", error);
    return { ok: false, error: "Something went wrong — please try again." };
  }

  await sendBookingConfirmation({
    to: user.email!,
    name: (user.user_metadata?.full_name as string) ?? null,
    className: cls.class_name,
    level: cls.level,
    day: cls.day,
    time: cls.time,
    dateLabel: format(date, "dd MMMM yyyy"),
  });

  revalidatePath("/my-classes");
  revalidatePath("/recurring");
  return { ok: true };
}

export async function cancelBooking(bookingId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Please log in." };

  // RLS restricts the update to the caller's own bookings (or admin).
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "cancelled", is_recurring: false })
    .eq("id", bookingId)
    .select()
    .maybeSingle<Booking>();

  if (error || !data) {
    console.error("cancelBooking failed:", error);
    return { ok: false, error: "Could not cancel this booking." };
  }

  revalidatePath("/my-classes");
  revalidatePath("/recurring");
  return { ok: true };
}
