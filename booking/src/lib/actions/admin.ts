"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { DAYS, type Level } from "@/lib/types";
import type { ActionResult } from "@/lib/actions/bookings";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase, error: "Please log in." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single<{ role: string }>();

  if (profile?.role !== "admin") {
    return { supabase, error: "Admin access required." };
  }
  return { supabase, error: null };
}

export interface ClassInput {
  id?: string;
  class_name: string;
  level: Level | null;
  day: string;
  time: string;
  description: string | null;
}

export async function upsertClass(input: ClassInput): Promise<ActionResult> {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { ok: false, error: authError };

  const class_name = input.class_name.trim();
  if (!class_name) return { ok: false, error: "Class name is required." };
  if (!(DAYS as readonly string[]).includes(input.day)) {
    return { ok: false, error: "Invalid day." };
  }
  if (!/^[0-2][0-9]:[0-5][0-9]$/.test(input.time)) {
    return { ok: false, error: "Time must be in 24h HH:MM format." };
  }

  const row = {
    class_name,
    level: input.level,
    day: input.day,
    time: input.time,
    description: input.description?.trim() || null,
  };

  const { error } = input.id
    ? await supabase.from("class_schedule").update(row).eq("id", input.id)
    : await supabase.from("class_schedule").insert(row);

  if (error) {
    console.error("upsertClass failed:", error);
    return { ok: false, error: "Could not save the class." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteClass(id: string): Promise<ActionResult> {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { ok: false, error: authError };

  const { error } = await supabase.from("class_schedule").delete().eq("id", id);
  if (error) {
    console.error("deleteClass failed:", error);
    return { ok: false, error: "Could not delete the class." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}
