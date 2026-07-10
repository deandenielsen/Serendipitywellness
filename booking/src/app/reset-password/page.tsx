import { Container } from "@/components/ui/container";
import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata = { title: "Choose a new password" };

export default function ResetPasswordPage() {
  return (
    <Container>
      <AuthCard title="Choose a new password">
        <ResetPasswordForm />
      </AuthCard>
    </Container>
  );
}
