"use client";

import { useActionState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { requestRetreatUpdates, type NotifyState } from "@/app/retreats/actions";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const initialState: NotifyState = { status: "idle" };

const inputClass =
  "w-full rounded-[12px] border border-[var(--retreat-slate)]/30 bg-white px-4 py-3.5 text-[16px] text-[var(--retreat-slate-dark)] outline-none transition-colors placeholder:text-[var(--retreat-slate)]/70 focus:border-[var(--retreat-slate)] aria-[invalid=true]:border-red-500";

/** Name + email sign-up for news of future retreats; one button, emailed to the studio. */
function NotifyForm({ retreatName }: { retreatName: string }) {
  const [state, formAction, pending] = useActionState(requestRetreatUpdates, initialState);
  const fields = state.status === "error" ? state.fields : undefined;

  useEffect(() => {
    if (state.status === "success") track("generate_lead", { form: "retreat_updates" });
  }, [state.status]);

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        <motion.p
          key="done"
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="retreat-serif mx-auto mt-8 max-w-[520px] text-[30px] leading-[1.2]"
        >
          Thank you! We&apos;ll let you know when the next retreat opens.
        </motion.p>
      ) : (
        <motion.form key="form" action={formAction} exit={{ opacity: 0 }} noValidate className="mx-auto mt-8 max-w-[560px]">
          <input type="hidden" name="retreat" value={retreatName} />
          <div className="grid gap-3 text-left sm:grid-cols-2">
            {(
              [
                { name: "name", label: "Your name", type: "text", autoComplete: "name" },
                { name: "email", label: "Your email", type: "email", autoComplete: "email" },
              ] as const
            ).map((f) => (
              <div key={f.name}>
                <label htmlFor={`notify-${f.name}`} className="sr-only">
                  {f.label}
                </label>
                <input
                  id={`notify-${f.name}`}
                  name={f.name}
                  type={f.type}
                  required
                  autoComplete={f.autoComplete}
                  placeholder={f.label}
                  aria-invalid={fields?.[f.name] ? true : undefined}
                  aria-describedby={fields?.[f.name] ? `notify-${f.name}-error` : undefined}
                  className={inputClass}
                />
                {fields?.[f.name] && (
                  <p id={`notify-${f.name}-error`} className="mt-1 text-[13px] text-red-700">
                    {fields[f.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Honeypot: hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="notify-company">Company</label>
            <input id="notify-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {state.status === "error" && !fields && (
            <p role="alert" className="mt-4 text-[14px] text-red-700">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className={cn(
              "mt-4 w-full rounded-[12px] bg-[var(--retreat-slate)] px-6 py-4 text-[16px] font-medium text-white transition-colors hover:bg-[var(--retreat-slate-dark)] disabled:cursor-wait disabled:opacity-60",
            )}
          >
            {pending ? "Sending…" : "Please, let me know"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export { NotifyForm };
