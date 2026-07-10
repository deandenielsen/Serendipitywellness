"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { signIn } from "@/lib/actions/auth";

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? undefined;
  const linkExpired = searchParams.get("error") === "link-expired";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await signIn({ email, password, next });
      // On success signIn redirects and never returns.
      if (result && !result.ok) setError(result.error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {linkExpired && (
        <p className="rounded-app bg-danger/10 px-4 py-3 text-small text-danger">
          That link has expired — please log in or request a new one.
        </p>
      )}
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p className="rounded-app bg-danger/10 px-4 py-3 text-small text-danger">{error}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Logging in…" : "Log in"}
      </Button>

      <div className="space-y-1 pt-2 text-center text-small text-copy/60">
        <p>
          <Link href="/forgot-password" className="font-medium text-primary-strong hover:underline">
            Forgot your password?
          </Link>
        </p>
        <p>
          New here?{" "}
          <Link href="/register" className="font-medium text-primary-strong hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}

export { LoginForm };
