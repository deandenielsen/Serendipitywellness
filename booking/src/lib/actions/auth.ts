"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import type { ActionResult } from "@/lib/actions/bookings";

export async function signIn(input: {
  email: string;
  password: string;
  next?: string;
}): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  if (error) {
    return { ok: false, error: "Incorrect email or password." };
  }
  revalidatePath("/", "layout");
  redirect(input.next && input.next.startsWith("/") ? input.next : "/");
}

export async function signUp(input: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}): Promise<ActionResult & { needsConfirmation?: boolean }> {
  const fullName = input.fullName.trim();
  const phone = input.phone.trim();
  if (!fullName) return { ok: false, error: "Please enter your name." };
  if (!phone) return { ok: false, error: "Please enter your phone number." };
  if (input.password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: { full_name: fullName, phone },
      emailRedirectTo: `${siteConfig.url}/auth/confirm`,
    },
  });
  if (error) {
    console.error("signUp failed:", error);
    return { ok: false, error: error.message };
  }

  // Session present means email confirmation is disabled — user is logged in.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect("/");
  }
  return { ok: true, needsConfirmation: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(email: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteConfig.url}/auth/confirm?next=/reset-password`,
  });
  if (error) {
    console.error("requestPasswordReset failed:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function updatePassword(newPassword: string): Promise<ActionResult> {
  if (newPassword.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    console.error("updatePassword failed:", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function updateProfile(input: {
  fullName: string;
  phone: string;
}): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Please log in." };

  const fullName = input.fullName.trim();
  const phone = input.phone.trim();
  if (!fullName) return { ok: false, error: "Please enter your name." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, phone })
    .eq("id", user.id);
  if (error) {
    console.error("updateProfile failed:", error);
    return { ok: false, error: "Could not save your details." };
  }

  // Keep auth metadata in sync (used in booking confirmation emails).
  await supabase.auth.updateUser({ data: { full_name: fullName, phone } });

  revalidatePath("/account");
  return { ok: true };
}
