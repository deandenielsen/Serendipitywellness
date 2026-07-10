"use client";

import { useState, useTransition } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, RefreshCw, Trash2 } from "lucide-react";
import { cancelBooking } from "@/lib/actions/bookings";
import type { Booking } from "@/lib/types";

function BookedClassCard({ booking }: { booking: Booking }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const dateStr = booking.class_date
    ? format(parseISO(booking.class_date), "dd MMM yyyy")
    : booking.day;

  const handleCancel = () => {
    setError(null);
    startTransition(async () => {
      const result = await cancelBooking(booking.id);
      if (!result.ok) setError(result.error);
    });
  };

  return (
    <div className="rounded-app border border-secondary bg-surface px-5 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-2 text-body font-semibold text-copy">
            {booking.class_name}
            {booking.is_recurring && (
              <span
                className="flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-0.5 text-xs font-medium text-copy/70"
                title="Repeats weekly"
              >
                <RefreshCw size={11} />
                weekly
              </span>
            )}
          </h3>
          <div className="mt-1.5 flex items-center gap-4 text-small text-copy/60">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {booking.is_recurring ? `Every ${booking.day}` : dateStr}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {booking.time}
            </span>
          </div>
        </div>

        {confirming ? (
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={pending}
              className="rounded-app bg-danger px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {pending ? "Cancelling…" : "Confirm cancel"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={pending}
              className="rounded-app px-3 py-2 text-xs font-medium text-copy/60 hover:bg-secondary/50"
            >
              Keep
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="shrink-0 rounded-app p-2.5 text-copy/50 transition-colors hover:bg-danger/10 hover:text-danger"
            aria-label={`Cancel ${booking.class_name} booking`}
          >
            <Trash2 size={17} />
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-small text-danger">{error}</p>}
    </div>
  );
}

export { BookedClassCard };
