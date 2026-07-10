import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "./login-form";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <Container>
      <AuthCard title="Welcome back" intro="Log in to book and manage your classes.">
        <Suspense>
          <LoginForm />
        </Suspense>
      </AuthCard>
    </Container>
  );
}
