"use client";

import { useActionState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { requestRetreatUpdates, type NotifyState } from "@/app/retreats/actions";
import { MARKETING_CONSENT_TEXT } from "@/lib/consent";
import { siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";

const initialState: NotifyState = { status: "idle" };

/** Remembered after a successful sign-up, so the pop-up isn't shown again before WhatsApp. */
const SIGNED_UP_KEY = "sw-retreat-updates";

const hasSignedUp = () => {
  try {
    return window.localStorage.getItem(SIGNED_UP_KEY) === "yes";
  } catch {
    return false;
  }
};

/** Opens WhatsApp in a new tab, or in this tab if the browser blocks the pop-up (e.g. after Escape). */
function openExternal(url: string) {
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
}

const inputClass =
  "w-full rounded-[12px] border border-[var(--retreat-slate)]/30 bg-white px-4 py-3.5 text-[16px] text-[var(--retreat-slate-dark)] outline-none transition-colors placeholder:text-[var(--retreat-slate)]/70 focus:border-[var(--retreat-slate)] aria-[invalid=true]:border-red-500";

const buttonClass =
  "w-full rounded-[12px] bg-[var(--retreat-slate)] px-6 py-4 text-[16px] font-medium text-white transition-colors hover:bg-[var(--retreat-slate-dark)] disabled:cursor-wait disabled:opacity-60";

/**
 * A button that opens a pop-up sign-up for future retreats (name, email, marketing consent).
 * Uses the native <dialog> element, so focus, Escape and the backdrop are handled by the browser.
 *
 * With `continueTo` (the bookable-retreat WhatsApp link) the button reads "Reserve on WhatsApp":
 * the pop-up offers the sign-up first, and WhatsApp opens once it's completed, skipped or closed.
 * People who've already signed up in this browser go straight to WhatsApp.
 */
function NotifyForm({ retreatName, continueTo }: { retreatName: string; continueTo?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, formAction, pending] = useActionState(requestRetreatUpdates, initialState);
  const fields = state.status === "error" ? state.fields : undefined;

  useEffect(() => {
    if (state.status !== "success") return;
    track("generate_lead", { form: "retreat_updates" });
    try {
      window.localStorage.setItem(SIGNED_UP_KEY, "yes");
    } catch {
      // Storage blocked: they'll just see the pop-up again next time.
    }
  }, [state.status]);

  const close = () => dialogRef.current?.close();

  const goToWhatsApp = () => {
    if (!continueTo) return;
    track("whatsapp_click", { page_path: window.location.pathname, retreat: retreatName });
    openExternal(continueTo);
  };

  const open = () => {
    if (continueTo && hasSignedUp()) goToWhatsApp();
    else dialogRef.current?.showModal();
  };

  return (
    <>
      {continueTo ? (
        <button
          type="button"
          onClick={open}
          className={`${buttonClass} mx-auto mt-8 flex max-w-[360px] items-center justify-center gap-2.5`}
        >
          <MessageCircle size={19} /> Reserve on WhatsApp
        </button>
      ) : (
        <button type="button" onClick={open} className={`${buttonClass} mx-auto mt-8 block max-w-[360px]`}>
          Please, let me know
        </button>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="notify-title"
        // However it's closed (button, backdrop, Escape), carry on to WhatsApp when booking.
        onClose={goToWhatsApp}
        // Click on the backdrop (outside the panel) closes it.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[calc(100%-32px)] max-w-[480px] rounded-[18px] bg-[var(--retreat-paper)] p-0 text-left text-[var(--retreat-slate-dark)] shadow-[0_30px_90px_rgba(58,72,76,0.35)] backdrop:bg-[rgba(58,72,76,0.6)] backdrop:backdrop-blur-[2px]"
      >
        <div className="relative px-6 pb-7 pt-8 sm:px-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--retreat-mist)]"
          >
            <X size={18} />
          </button>

          {state.status === "success" ? (
            <div role="status" className="py-6 text-center">
              <p id="notify-title" className="retreat-serif text-[36px] leading-[1.1]">
                Thank you!
              </p>
              <p className="mt-3 text-[16px] leading-[1.7]">We&apos;ll let you know when the next retreat opens.</p>
              <button
                type="button"
                onClick={close}
                className={`${buttonClass} mt-7 flex items-center justify-center gap-2.5`}
              >
                {continueTo ? (
                  <>
                    <MessageCircle size={19} /> Continue to WhatsApp
                  </>
                ) : (
                  "Close"
                )}
              </button>
            </div>
          ) : (
            <form action={formAction} noValidate>
              <h2 id="notify-title" className="retreat-serif pr-8 text-[36px] leading-[1.05]">
                {continueTo ? "Before we open WhatsApp…" : "Hear about future retreats"}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-[var(--retreat-slate)]">
                {continueTo
                  ? "Would you like to hear about future retreats too? Leave your details, or skip straight to WhatsApp."
                  : "Leave your details and we’ll let you know as soon as the next retreat opens."}
              </p>

              <input type="hidden" name="retreat" value={retreatName} />
              <div className="mt-6 grid gap-3">
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
                      autoFocus={f.name === "name"}
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

              <label className="mt-5 flex cursor-pointer items-start gap-3 text-[14px] leading-[1.6]">
                <input
                  type="checkbox"
                  name="consent"
                  value="yes"
                  required
                  aria-invalid={fields?.consent ? true : undefined}
                  aria-describedby={fields?.consent ? "notify-consent-error" : undefined}
                  className="mt-[3px] h-[18px] w-[18px] shrink-0 accent-[var(--retreat-slate)]"
                />
                <span>{MARKETING_CONSENT_TEXT}</span>
              </label>
              {fields?.consent && (
                <p id="notify-consent-error" className="mt-1 text-[13px] text-red-700">
                  {fields.consent}
                </p>
              )}

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

              <button type="submit" disabled={pending} className={`${buttonClass} mt-6`}>
                {pending ? "Sending…" : "Please, let me know"}
              </button>
              {continueTo && (
                <button
                  type="button"
                  onClick={close}
                  className="mt-3 w-full rounded-[12px] border border-[var(--retreat-slate)]/30 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-[var(--retreat-slate)]"
                >
                  No thanks, continue to WhatsApp
                </button>
              )}
              <p className="mt-4 text-center text-[12px] text-[var(--retreat-slate)]">
                Your details are safe with us. See our{" "}
                <a href={siteConfig.privacyHref} className="border-b border-current">
                  privacy policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}

export { NotifyForm };
