"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import AuthField, { inputClass } from "./AuthField";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Private routes send people here with ?redirect=/add-book.
  // Only paths on this site are allowed, so nobody can be sent to another website.
  const rawRedirect = searchParams.get("redirect");
  const redirectTo =
    rawRedirect && rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};

    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "That email does not look right.";
    if (!password) next.password = "Please enter your password.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    const { data, error } = await signIn.email({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (error) {
      const message = "Wrong email or password. Please try again.";
      setErrors({ password: message });
      toast.error(message);
      return;
    }

    toast.success(`Welcome back, ${data?.user?.name || "reader"}!`);
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <AuthField id="login-email" label="Email" error={errors.email}>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </AuthField>

      <AuthField
        id="login-password"
        label="Password"
        error={errors.password}
        labelRight={
          <Link
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              toast.info("Password reset is not available yet.");
            }}
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        }
      >
        <PasswordInput
          id="login-password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </AuthField>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="btn-gloss h-11 w-full rounded-full text-base disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton />

      <p className="text-center text-sm text-muted-foreground">
        New to BookNook?{" "}
        <Link href="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}