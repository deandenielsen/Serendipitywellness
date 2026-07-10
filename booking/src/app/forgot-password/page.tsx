import { Container } from "@/components/ui/container";
import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <Container>
      <AuthCard
        title="Reset your password"
        intro="Enter your email and we'll send you a reset link."
      >
        <ForgotPasswordForm />
      </AuthCard>
    </Container>
  );
}
