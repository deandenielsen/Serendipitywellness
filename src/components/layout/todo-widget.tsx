"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ListTodo, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pre-launch to-do list: a floating button above the WhatsApp button that opens a small
 * checklist. Items are saved in this browser (localStorage).
 *
 * It renders nothing on the real domain, so it can't leak into the live site after the
 * DNS switch, and it only mounts in the browser, so its text is never part of the HTML
 * that search engines index.
 */

type Todo = { id: string; text: string; done: boolean };

const STORAGE_KEY = "sw-todo-v1";
const HIDDEN_ON_HOSTS = ["serendipitywellness.co.za", "www.serendipitywellness.co.za"];

const STARTER: string[] = [
  "Send opening hours for Google / Maps",
  "Kerry to read Lymphatic Drainage & Reflexology FAQs and “What to expect”",
  "Vercel → Domains: add serendipitywellness.co.za and www",
  "Update DNS at registrar (keep MX, Resend and booking. records)",
  "Search Console: verify domain, submit sitemap, request indexing",
  "Bing Webmaster Tools: import from Search Console",
  "Ask Claude for the final check on the live domain",
  "Google Business Profile: add Lymphatic Drainage & Reflexology, prices, photos",
  "Real photos of Kerry and the studio",
  "Collect 4–6 testimonials",
  "Retreats page (when the next retreat is planned)",
  "Link Google Analytics to Search Console; mark key events",
];

const newId = () => Math.random().toString(36).slice(2, 10);
const starterTodos = (): Todo[] => STARTER.map((text) => ({ id: newId(), text, done: false }));

function load(): Todo[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Todo[];
  } catch {
    // Private mode or blocked storage: fall through to the starter list.
  }
  return starterTodos();
}

function save(todos: Todo[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Not fatal: the list just won't persist in this browser.
  }
}

function TodoWidget() {
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHidden(HIDDEN_ON_HOSTS.includes(window.location.hostname));
    setTodos(load());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) save(todos);
  }, [todos, mounted]);

  useEffect(() => {
    if (!open) return;
    // Jump straight to "Add" on desktop; on phones that would pop the keyboard up.
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!mounted || hidden) return null;

  const remaining = todos.filter((t) => !t.done).length;
  const doneCount = todos.length - remaining;

  const update = (id: string, patch: Partial<Todo>) =>
    setTodos((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const remove = (id: string) => setTodos((list) => list.filter((t) => t.id !== id));

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTodos((list) => [...list, { id: newId(), text, done: false }]);
    setDraft("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="To-do list"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[170px] right-4 z-50 flex max-h-[min(70vh,560px)] w-[calc(100vw-32px)] max-w-[380px] origin-bottom-right flex-col overflow-hidden rounded-[10px] bg-white text-ink shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:right-[30px]"
          >
            <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <div>
                <h2 className="text-[16px] font-semibold">To do</h2>
                <p className="text-[13px] text-ink-soft">
                  {doneCount} of {todos.length} done
                </p>
              </div>
              <button
                type="button"
                aria-label="Close to-do list"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/5"
              >
                <X size={18} />
              </button>
            </header>

            <ul className="flex-1 overflow-y-auto px-2 py-2">
              {todos.length === 0 && <li className="px-3 py-6 text-center text-[14px] text-ink-soft">Nothing on the list.</li>}
              {todos.map((t) => (
                <li key={t.id} className="group flex items-start gap-3 rounded-[6px] px-3 py-2 hover:bg-black/[0.03]">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={t.done}
                    aria-label={t.done ? `Mark "${t.text}" as not done` : `Mark "${t.text}" as done`}
                    onClick={() => update(t.id, { done: !t.done })}
                    className={cn(
                      "mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border transition-colors",
                      t.done ? "border-brand-teal bg-brand-teal text-white" : "border-black/30 hover:border-black",
                    )}
                  >
                    {t.done && <Check size={13} strokeWidth={3} />}
                  </button>

                  {editingId === t.id ? (
                    <input
                      autoFocus
                      defaultValue={t.text}
                      aria-label="Edit item"
                      onBlur={(e) => {
                        const text = e.currentTarget.value.trim();
                        if (text) update(t.id, { text });
                        setEditingId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                        if (e.key === "Escape") {
                          e.stopPropagation();
                          setEditingId(null);
                        }
                      }}
                      className="flex-1 rounded-[4px] border border-black/20 px-2 py-0.5 text-[14px] leading-[1.5] outline-none focus:border-black"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingId(t.id)}
                      title="Click to edit"
                      className={cn(
                        "flex-1 text-left text-[14px] leading-[1.5]",
                        t.done && "text-ink-soft line-through",
                      )}
                    >
                      {t.text}
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label={`Delete "${t.text}"`}
                    onClick={() => remove(t.id)}
                    className="mt-[1px] text-ink-soft opacity-60 transition-opacity hover:text-red-600 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-60 sm:focus:opacity-100"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={add} className="flex gap-2 border-t border-black/10 p-3">
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a to-do…"
                aria-label="New to-do"
                className="flex-1 rounded-full border border-black/20 px-4 py-2 text-[14px] outline-none focus:border-black"
              />
              <button
                type="submit"
                aria-label="Add to-do"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#333] text-white transition-colors hover:bg-black"
              >
                <Plus size={18} />
              </button>
            </form>

            {doneCount > 0 && (
              <button
                type="button"
                onClick={() => setTodos((list) => list.filter((t) => !t.done))}
                className="border-t border-black/10 py-2.5 text-[13px] text-ink-soft hover:text-ink"
              >
                Clear {doneCount} completed
              </button>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      {/* Sits directly above the WhatsApp button. */}
      <button
        type="button"
        aria-label={open ? "Close to-do list" : `Open to-do list (${remaining} left)`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[100px] right-[34px] z-50 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#333] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-105"
      >
        {open ? <X size={20} /> : <ListTodo size={20} />}
        {!open && remaining > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-teal px-1 text-[11px] font-semibold">
            {remaining}
          </span>
        )}
      </button>
    </>
  );
}

export { TodoWidget };
