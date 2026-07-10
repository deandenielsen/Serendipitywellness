"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { requestPasswordReset } from "@/lib/actions/auth";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await requestPasswordReset(email);
      if (result.ok) setDone(true);
      else setError(result.error);
    });
  };

  if (done) {
    return (
      <div className="py-4 text-center">
        <MailCheck className="mx-auto mb-4 text-primary-strong" size={48} />
        <p className="text-small text-copy/70">
          If an account exists for <strong>{email}</strong>, a password reset link is on
          its way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && (
        <p className="rounded-app bg-danger/10 px-4 py-3 text-small text-danger">{error}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Sending…" : "Send reset link"}
      </Button>

      <p className="pt-2 text-center text-small text-copy/60">
        <Link href="/login" className="font-medium text-primary-strong hover:underline">
          Back to log in
        </Link>
      </p>
    </form>
  );
}

export { ForgotPasswordForm };
