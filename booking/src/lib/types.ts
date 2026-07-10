export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type Day = (typeof DAYS)[number];

export type Level = "Beginner" | "Intermediate";

export interface ScheduledClass {
  id: string;
  class_name: string;
  level: Level | null;
  day: Day;
  /** 24h "HH:MM" */
  time: string;
  description: string | null;
}

export type BookingStatus = "booked" | "cancelled";

export interface Booking {
  id: string;
  user_id: string;
  class_name: string;
  day: Day;
  time: string;
  /** ISO date "yyyy-MM-dd" of the specific class occurrence */
  class_date: string | null;
  status: BookingStatus;
  is_recurring: boolean;
  created_at: string;
}

export type Role = "user" | "admin";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: Role;
}

/** Booking plus the booker's profile, for admin rosters. */
export interface RosterEntry extends Booking {
  profile: Pick<Profile, "full_name"> & { email: string | null };
}
