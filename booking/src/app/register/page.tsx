import { Container } from "@/components/ui/container";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "./register-form";

export const metadata = { title: "Create an account" };

export default function RegisterPage() {
  return (
    <Container>
      <AuthCard
        title="Create your account"
        intro="Register to book classes at Serendipity Wellness."
      >
        <RegisterForm />
      </AuthCard>
    </Container>
  );
}
