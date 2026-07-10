import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import { AccountForm } from "./account-form";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single<Profile>();

  return (
    <Container className="max-w-xl py-10 sm:py-14">
      <PageHeading
        eyebrow="Account"
        title="Your details"
        intro="Keep your contact details up to date so the studio can reach you."
      />
      <AccountForm
        email={user!.email ?? ""}
        fullName={profile?.full_name ?? ""}
        phone={profile?.phone ?? ""}
      />
    </Container>
  );
}
