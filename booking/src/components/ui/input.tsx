import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-app border border-secondary bg-surface px-4 text-small text-copy placeholder:text-copy/40 focus:outline-none focus:ring-2 focus:ring-primary-strong/40 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-app border border-secondary bg-surface px-4 py-3 text-small text-copy placeholder:text-copy/40 focus:outline-none focus:ring-2 focus:ring-primary-strong/40 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-app border border-secondary bg-surface px-4 text-small text-copy focus:outline-none focus:ring-2 focus:ring-primary-strong/40 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-small font-medium text-copy", className)}
      {...props}
    />
  );
}

export { Input, Textarea, Select, Label };
