import { addDays, addWeeks, format, startOfWeek } from "date-fns";
import { DAYS, type Day, type ScheduledClass } from "@/lib/types";

/** Monday of the week `weekOffset` weeks from the current one. */
export function weekStart(weekOffset: number, now = new Date()): Date {
  return addWeeks(startOfWeek(now, { weekStartsOn: 1 }), weekOffset);
}

/** Concrete date of `day` in the week `weekOffset` weeks from now. */
export function dateForDay(day: Day, weekOffset: number, now = new Date()): Date {
  return addDays(weekStart(weekOffset, now), DAYS.indexOf(day));
}

export function toIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/** Distinct class times, sorted, so the timetable grid adapts to the schedule. */
export function timeSlots(classes: ScheduledClass[]): string[] {
  return [...new Set(classes.map((c) => c.time))].sort();
}

/** time -> day -> class lookup for the timetable grid. */
export function classMap(
  classes: ScheduledClass[]
): Record<string, Partial<Record<Day, ScheduledClass>>> {
  const map: Record<string, Partial<Record<Day, ScheduledClass>>> = {};
  for (const cls of classes) {
    map[cls.time] ??= {};
    map[cls.time][cls.day] ??= cls;
  }
  return map;
}

export function sortClasses(classes: ScheduledClass[]): ScheduledClass[] {
  return [...classes].sort((a, b) => {
    const dayDiff = DAYS.indexOf(a.day) - DAYS.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });
}
