"use client";

import { useState, useTransition } from "react";
import { format, parseISO } from "date-fns";
import { Pencil, Plus, Trash2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { deleteClass, upsertClass } from "@/lib/actions/admin";
import { DAYS, type Level, type ScheduledClass } from "@/lib/types";
import { rosterKey, type RosterMap } from "@/components/schedule/roster";

interface AdminManagerProps {
  classes: ScheduledClass[];
  roster: RosterMap;
}

type ModalState =
  | { kind: "closed" }
  | { kind: "form"; cls: ScheduledClass | null }
  | { kind: "roster"; cls: ScheduledClass }
  | { kind: "delete"; cls: ScheduledClass };

function AdminManager({ classes, roster }: AdminManagerProps) {
  const [modal, setModal] = useState<ModalState>({ kind: "closed" });

  const close = () => setModal({ kind: "closed" });

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button size="sm" onClick={() => setModal({ kind: "form", cls: null })}>
          <Plus size={16} />
          Add Class
        </Button>
      </div>

      {classes.length === 0 ? (
        <p className="py-12 text-center text-copy/60">
          No classes yet. Click &ldquo;Add Class&rdquo; to create one.
        </p>
      ) : (
        <div className="overflow-hidden rounded-app border border-secondary bg-surface">
          {/* Desktop table */}
          <table className="hidden w-full sm:table">
            <thead>
              <tr className="border-b border-secondary bg-secondary/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-copy/60">Day</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-copy/60">Time</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-copy/60">Class</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-copy/60">Level</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-copy/60">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/60">
              {classes.map((cls) => {
                const count = roster[rosterKey(cls.class_name, cls.day, cls.time)]?.length ?? 0;
                return (
                  <tr key={cls.id} className="hover:bg-secondary/20">
                    <td className="px-4 py-3 text-small text-copy">{cls.day}</td>
                    <td className="px-4 py-3 text-small text-copy/70">{cls.time}</td>
                    <td className="px-4 py-3 text-small font-medium text-copy">{cls.class_name}</td>
                    <td className="px-4 py-3 text-small text-copy/70">{cls.level ?? "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <RowButton
                          title={`View bookings (${count})`}
                          onClick={() => setModal({ kind: "roster", cls })}
                        >
                          <Users size={16} />
                          {count > 0 && <span className="text-xs">{count}</span>}
                        </RowButton>
                        <RowButton title="Edit" onClick={() => setModal({ kind: "form", cls })}>
                          <Pencil size={16} />
                        </RowButton>
                        <RowButton
                          title="Delete"
                          danger
                          onClick={() => setModal({ kind: "delete", cls })}
                        >
                          <Trash2 size={16} />
                        </RowButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Mobile list */}
          <div className="divide-y divide-secondary/60 sm:hidden">
            {classes.map((cls) => {
              const count = roster[rosterKey(cls.class_name, cls.day, cls.time)]?.length ?? 0;
              return (
                <div key={cls.id} className="flex items-start justify-between gap-2 px-4 py-3">
                  <div>
                    <p className="text-small font-medium text-copy">{cls.class_name}</p>
                    <p className="text-xs text-copy/60">
                      {cls.day} · {cls.time}
                      {cls.level ? ` · ${cls.level}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <RowButton
                      title={`View bookings (${count})`}
                      onClick={() => setModal({ kind: "roster", cls })}
                    >
                      <Users size={16} />
                      {count > 0 && <span className="text-xs">{count}</span>}
                    </RowButton>
                    <RowButton title="Edit" onClick={() => setModal({ kind: "form", cls })}>
                      <Pencil size={16} />
                    </RowButton>
                    <RowButton
                      title="Delete"
                      danger
                      onClick={() => setModal({ kind: "delete", cls })}
                    >
                      <Trash2 size={16} />
                    </RowButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {modal.kind === "form" && <ClassFormDialog cls={modal.cls} onClose={close} />}
      {modal.kind === "roster" && (
        <RosterDialog cls={modal.cls} roster={roster} onClose={close} />
      )}
      {modal.kind === "delete" && <DeleteDialog cls={modal.cls} onClose={close} />}
    </>
  );
}

function RowButton({
  title,
  danger,
  onClick,
  children,
}: {
  title: string;
  danger?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={
        danger
          ? "flex items-center gap-1 rounded-app p-2 text-copy/50 transition-colors hover:bg-danger/10 hover:text-danger"
          : "flex items-center gap-1 rounded-app p-2 text-copy/50 transition-colors hover:bg-secondary hover:text-primary-strong"
      }
    >
      {children}
    </button>
  );
}

function ClassFormDialog({
  cls,
  onClose,
}: {
  cls: ScheduledClass | null;
  onClose: () => void;
}) {
  const [className, setClassName] = useState(cls?.class_name ?? "");
  const [level, setLevel] = useState<string>(cls?.level ?? "");
  const [day, setDay] = useState<string>(cls?.day ?? "Monday");
  const [time, setTime] = useState(cls?.time ?? "08:00");
  const [description, setDescription] = useState(cls?.description ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await upsertClass({
        id: cls?.id,
        class_name: className,
        level: (level || null) as Level | null,
        day,
        time,
        description: description || null,
      });
      if (result.ok) onClose();
      else setError(result.error);
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle className="mb-4">{cls ? "Edit class" : "Add class"}</DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cls-name">Class name</Label>
            <Input
              id="cls-name"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. Vinyasa Flow"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="cls-day">Day</Label>
              <Select id="cls-day" value={day} onChange={(e) => setDay(e.target.value)}>
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="cls-time">Time</Label>
              <Input
                id="cls-time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cls-level">Level</Label>
            <Select id="cls-level" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">Open level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="cls-desc">Description</Label>
            <Textarea
              id="cls-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Shown to students in the booking dialog."
            />
          </div>

          {error && (
            <p className="rounded-app bg-danger/10 px-4 py-3 text-small text-danger">{error}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={pending}>
              {pending ? "Saving…" : "Save class"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function RosterDialog({
  cls,
  roster,
  onClose,
}: {
  cls: ScheduledClass;
  roster: RosterMap;
  onClose: () => void;
}) {
  const students = roster[rosterKey(cls.class_name, cls.day, cls.time)] ?? [];

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle className="mb-1">{cls.class_name}</DialogTitle>
        <DialogDescription className="mb-4">
          {cls.day} at {cls.time} — {students.length} booked
        </DialogDescription>
        {students.length === 0 ? (
          <p className="py-4 text-small text-copy/60">No bookings for this class yet.</p>
        ) : (
          <ul className="max-h-72 space-y-1.5 overflow-y-auto">
            {students.map((s) => (
              <li
                key={s.bookingId}
                className="rounded-app bg-secondary/30 px-3 py-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-small font-medium text-copy">{s.name}</span>
                  <span className="truncate text-xs text-copy/60">{s.email}</span>
                </div>
                <p className="mt-0.5 text-xs text-copy/50">
                  {s.isRecurring
                    ? `Recurring — every ${cls.day}`
                    : s.classDate
                      ? format(parseISO(s.classDate), "dd MMM yyyy")
                      : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

function DeleteDialog({ cls, onClose }: { cls: ScheduledClass; onClose: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteClass(cls.id);
      if (result.ok) onClose();
      else setError(result.error);
    });
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle className="mb-2">Remove class?</DialogTitle>
        <DialogDescription>
          This removes <strong>{cls.class_name}</strong> on {cls.day} at {cls.time} from
          the timetable. Existing bookings are kept.
        </DialogDescription>
        {error && (
          <p className="mt-3 rounded-app bg-danger/10 px-4 py-3 text-small text-danger">{error}</p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" disabled={pending} onClick={handleDelete}>
            {pending ? "Removing…" : "Remove class"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { AdminManager };
