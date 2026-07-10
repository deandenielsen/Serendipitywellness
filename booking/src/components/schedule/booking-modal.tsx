"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, CheckCircle, Clock, Info, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { createBooking } from "@/lib/actions/bookings";
import { dateForDay, toIsoDate } from "@/lib/schedule";
import { rosterKey, type RosterMap } from "@/components/schedule/roster";
import type { SelectedClass } from "@/components/schedule/schedule-view";

interface BookingModalProps {
  selected: SelectedClass | null;
  onClose: () => void;
  isAuthenticated: boolean;
  roster: RosterMap | null;
}

function BookingModal({ selected, onClose, isAuthenticated, roster }: BookingModalProps) {
  const [step, setStep] = useState<"confirm" | "booked">("confirm");
  const [isRecurring, setIsRecurring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (!selected) return null;

  const { cls, weekOffset } = selected;
  const classDate = dateForDay(cls.day, weekOffset);
  const students = roster?.[rosterKey(cls.class_name, cls.day, cls.time)] ?? null;

  const handleClose = () => {
    setStep("confirm");
    setIsRecurring(false);
    setError(null);
    onClose();
  };

  const handleBook = () => {
    setError(null);
    startTransition(async () => {
      const result = await createBooking({
        scheduleId: cls.id,
        classDate: toIsoDate(classDate),
        isRecurring,
      });
      if (result.ok) {
        setStep("booked");
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent>
        {step === "booked" ? (
          <div className="py-6 text-center">
            <CheckCircle className="mx-auto mb-4 text-primary-strong" size={56} />
            <DialogTitle className="mb-1">You&apos;re all set!</DialogTitle>
            <DialogDescription>
              {cls.class_name} on {cls.day} {format(classDate, "dd MMM")} at {cls.time} is booked.
            </DialogDescription>
            <Button onClick={handleClose} className="mt-6">
              Done
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <DialogTitle>{cls.class_name}</DialogTitle>
              {cls.level && (
                <DialogDescription className="mt-1">{cls.level} level</DialogDescription>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-small text-copy/70">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {cls.day}, {format(classDate, "dd MMM yyyy")}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {cls.time}
              </span>
            </div>

            {cls.description && (
              <div className="flex items-start gap-2 rounded-app bg-secondary/40 px-4 py-3">
                <Info size={16} className="mt-0.5 shrink-0 text-primary-strong" />
                <p className="text-small leading-relaxed text-copy/80">{cls.description}</p>
              </div>
            )}

            {students && (
              <div className="border-t border-secondary pt-4">
                <p className="mb-2 flex items-center gap-2 text-small font-medium text-copy">
                  <Users size={16} className="text-primary-strong" />
                  Booked students ({students.length})
                </p>
                {students.length === 0 ? (
                  <p className="text-small text-copy/60">No bookings for this class yet.</p>
                ) : (
                  <ul className="max-h-40 space-y-1.5 overflow-y-auto">
                    {students.map((s) => (
                      <li
                        key={s.bookingId}
                        className="flex items-center justify-between gap-2 rounded-app bg-secondary/30 px-3 py-2"
                      >
                        <span className="truncate text-small font-medium text-copy">
                          {s.name}
                          {s.isRecurring && (
                            <span className="ml-2 text-xs text-copy/50">weekly</span>
                          )}
                        </span>
                        <span className="truncate text-xs text-copy/60">{s.email}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {isAuthenticated && (
              <label className="flex cursor-pointer items-center gap-3 rounded-app border border-secondary px-4 py-3">
                <input
                  type="checkbox"
                  checked={isRecurring}
                  onChange={(e) => setIsRecurring(e.target.checked)}
                  className="h-4 w-4 accent-[var(--color-primary-strong)]"
                />
                <span className="text-small text-copy">Make this a recurring weekly class</span>
              </label>
            )}

            {error && (
              <p className="rounded-app bg-danger/10 px-4 py-3 text-small text-danger">{error}</p>
            )}

            <div className="flex flex-col gap-2">
              {isAuthenticated ? (
                <Button onClick={handleBook} disabled={pending} className="w-full">
                  {pending ? (
                    <span className="flex items-center gap-2">
                      <Spinner className="text-white" size={16} />
                      Booking…
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link href="/login">Log in to Book</Link>
                </Button>
              )}
              <Button asChild variant="ghost" className="w-full">
                <Link href="/pricing" onClick={handleClose}>
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { BookingModal };
