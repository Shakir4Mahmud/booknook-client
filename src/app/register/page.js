import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Join BookNook"
      subtitle="Make a free account and start sharing and borrowing books."
    >
      <RegisterForm />
    </AuthShell>
  );
}
