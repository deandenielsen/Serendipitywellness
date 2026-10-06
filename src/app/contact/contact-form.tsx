"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendContactMessage, type ContactState } from "./actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 w-full rounded-[4px] border border-black/20 bg-white px-3 py-3 text-[15px] outline-none transition-colors focus:border-black aria-[invalid=true]:border-red-500";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="text-center">
      <label htmlFor={name} className="text-[14px] font-medium tracking-[0.03em]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <p id={`${name}-error`} className="mt-1 text-left text-[13px] text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const fields = state.status === "error" ? state.fields : undefined;

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="py-16 text-center"
        >
          <p className="script-heading text-[40px]">Thank you!</p>
          <p className="mt-3 text-[16px] leading-[1.7]">
            Your message has been sent. We&apos;ll be in touch soon.
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" action={formAction} exit={{ opacity: 0 }} noValidate>
          <div className="grid gap-5 md:grid-cols-3 md:gap-4">
            <Field label="Name" name="name" autoComplete="name" error={fields?.name} />
            <Field label="Email" name="email" type="email" autoComplete="email" error={fields?.email} />
            <Field label="Mobile Number" name="phone" type="tel" autoComplete="tel" error={fields?.phone} />
          </div>

          <div className="mt-6 text-center">
            <label htmlFor="message" className="text-[14px] font-medium tracking-[0.03em]">
              Your Message (optional)
            </label>
            <textarea id="message" name="message" rows={6} maxLength={2000} className={cn(inputClass, "resize-y")} />
          </div>

          {/* Honeypot — hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {state.status === "error" && (
            <p role="alert" className="mt-5 text-center text-[14px] text-red-600">
              {state.message}
            </p>
          )}

          <div className="mt-7 text-center">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-[#333] px-9 py-3 text-[15px] font-medium text-white transition-[background-color,transform] duration-300 hover:scale-[1.03] hover:bg-black disabled:cursor-wait disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send Message"}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export { ContactForm };
