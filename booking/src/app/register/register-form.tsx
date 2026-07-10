"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { signUp } from "@/lib/actions/auth";

function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await signUp({ email, password, fullName, phone });
      // If email confirmation is disabled, signUp redirects and never returns.
      if (result && !result.ok) {
        setError(result.error);
      } else if (result?.needsConfirmation) {
        setDone(true);
      }
    });
  };

  if (done) {
    return (
      <div className="py-4 text-center">
        <MailCheck className="mx-auto mb-4 text-primary-strong" size={48} />
        <h2 className="mb-2 font-serif text-h3 font-semibold text-copy">Check your email</h2>
        <p className="text-small text-copy/70">
          We&apos;ve sent a confirmation link to <strong>{email}</strong>. Click it to
          activate your account, then log in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          autoComplete="name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone number</Label>
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
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
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="mt-1 text-xs text-copy/50">At least 8 characters.</p>
      </div>

      {error && (
        <p className="rounded-app bg-danger/10 px-4 py-3 text-small text-danger">{error}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating account…" : "Create account"}
      </Button>

      <p className="pt-2 text-center text-small text-copy/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary-strong hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}

export { RegisterForm };
