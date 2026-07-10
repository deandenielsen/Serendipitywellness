"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { signOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

function Header({ isAuthenticated, isAdmin }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [signingOut, startSignOut] = useTransition();
  const pathname = usePathname();

  const nav = [
    { label: "Schedule", href: "/" },
    { label: "Pricing", href: "/pricing" },
    ...(isAuthenticated
      ? [
          { label: "My Classes", href: "/my-classes" },
          { label: "Recurring", href: "/recurring" },
          { label: "Account", href: "/account" },
        ]
      : []),
    ...(isAdmin ? [{ label: "Admin", href: "/admin" }] : []),
  ];

  const linkClass = (href: string) =>
    cn(
      "text-small font-medium transition-colors hover:text-primary-strong",
      pathname === href ? "text-primary-strong" : "text-copy"
    );

  return (
    <header className="sticky top-0 z-40 border-b border-secondary/60 bg-background/85 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Serendipity Wellness Bookings">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="sm"
              disabled={signingOut}
              onClick={() => startSignOut(() => signOut())}
            >
              <LogOut size={16} />
              Log out
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Log in</Link>
            </Button>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-app text-copy md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-b border-secondary/60 bg-background md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-app px-3 py-3 text-body font-medium text-copy hover:bg-secondary/50"
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="mt-2 w-full"
                disabled={signingOut}
                onClick={() => {
                  setOpen(false);
                  startSignOut(() => signOut());
                }}
              >
                <LogOut size={16} />
                Log out
              </Button>
            ) : (
              <Button asChild className="mt-2 w-full" onClick={() => setOpen(false)}>
                <Link href="/login">Log in</Link>
              </Button>
            )}
          </Container>
        </nav>
      )}
    </header>
  );
}

export { Header };
