"use client";

import { useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS, type Day, type ScheduledClass } from "@/lib/types";
import { classMap, timeSlots, weekStart } from "@/lib/schedule";
import { BookingModal } from "@/components/schedule/booking-modal";
import type { RosterMap } from "@/components/schedule/roster";

export interface SelectedClass {
  cls: ScheduledClass;
  weekOffset: number;
}

interface ScheduleViewProps {
  classes: ScheduledClass[];
  isAuthenticated: boolean;
  /** Present only for admins. */
  roster: RosterMap | null;
}

function ScheduleView({ classes, isAuthenticated, roster }: ScheduleViewProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selected, setSelected] = useState<SelectedClass | null>(null);

  const slots = useMemo(() => timeSlots(classes), [classes]);
  const map = useMemo(() => classMap(classes), [classes]);

  const start = weekStart(weekOffset);
  const weekLabel = `${format(start, "dd MMM")} – ${format(addDays(start, 5), "dd MMM yyyy")}`;

  if (classes.length === 0) {
    return (
      <div className="py-20 text-center text-copy/60">
        <CalendarDays className="mx-auto mb-4 opacity-40" size={48} />
        <p>The timetable is being finalised — check back soon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between px-1 pt-2">
        <button
          type="button"
          onClick={() => setWeekOffset((o) => o - 1)}
          className="rounded-app p-2 text-copy/60 transition-colors hover:bg-secondary/50 hover:text-copy"
          aria-label="Previous week"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-small font-medium text-copy">{weekLabel}</span>
        <button
          type="button"
          onClick={() => setWeekOffset((o) => o + 1)}
          className="rounded-app p-2 text-copy/60 transition-colors hover:bg-secondary/50 hover:text-copy"
          aria-label="Next week"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Desktop grid */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-20 px-3 py-4 text-left text-xs font-semibold uppercase tracking-widest text-copy/60">
                Time
              </th>
              {DAYS.map((day, i) => (
                <th key={day} className="px-2 py-4 text-center text-xs font-semibold uppercase tracking-widest text-copy/60">
                  <div>{day}</div>
                  <div className="mt-0.5 text-xs font-normal text-copy/40">
                    {format(addDays(start, i), "dd MMM")}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((time) => (
              <tr key={time} className="border-t border-secondary/50">
                <td className="px-3 py-3 align-middle text-small font-medium text-copy/60">
                  {time}
                </td>
                {DAYS.map((day) => {
                  const cls = map[time]?.[day as Day];
                  return (
                    <td key={day} className="px-2 py-3 align-middle">
                      {cls ? (
                        <button
                          type="button"
                          onClick={() => setSelected({ cls, weekOffset })}
                          className="w-full rounded-app bg-secondary/60 px-3 py-2.5 text-center text-small font-medium text-copy transition-colors hover:bg-secondary"
                        >
                          {cls.class_name}
                          {cls.level && (
                            <span className="mt-0.5 block text-xs font-normal text-copy/60">
                              {cls.level}
                            </span>
                          )}
                        </button>
                      ) : (
                        <div className="h-2" aria-hidden />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: day-by-day list */}
      <div className="space-y-6 px-2 py-2 md:hidden">
        {DAYS.map((day, i) => {
          const dayClasses = slots
            .map((time) => map[time]?.[day as Day])
            .filter((c): c is ScheduledClass => !!c);
          if (dayClasses.length === 0) return null;
          return (
            <div key={day}>
              <h3 className="text-eyebrow font-semibold uppercase tracking-widest text-copy/60">
                {day}
              </h3>
              <p className="mb-3 text-xs text-copy/40">
                {format(addDays(start, i), "dd MMM yyyy")}
              </p>
              <div className="space-y-2">
                {dayClasses.map((cls) => (
                  <button
                    key={cls.id}
                    type="button"
                    onClick={() => setSelected({ cls, weekOffset })}
                    className="flex w-full items-center gap-4 rounded-app border border-secondary bg-surface px-4 py-3 text-left transition-shadow hover:shadow-md"
                  >
                    <span className="w-12 text-small font-medium text-copy/60">
                      {cls.time}
                    </span>
                    <span className="text-small font-medium text-copy">
                      {cls.class_name}
                      {cls.level && (
                        <span className="ml-2 text-xs font-normal text-copy/50">
                          {cls.level}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <BookingModal
        selected={selected}
        onClose={() => setSelected(null)}
        isAuthenticated={isAuthenticated}
        roster={roster}
      />
    </>
  );
}

export { ScheduleView };
