"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthField, { inputClass } from "./AuthField";
import PasswordInput from "./PasswordInput";
import PasswordChecklist, { isPasswordValid } from "./PasswordChecklist";
import GoogleButton from "./GoogleButton";
import { Button } from "@/components/ui/button";
import { tempRegister } from "@/lib/temp-auth";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};

    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "That email does not look right.";
    if (!isPasswordValid(password)) {
      next.password =
        "Password needs an uppercase letter, a lowercase letter and 6 or more characters.";
    }

    setErrors(next);

    // An invalid form never registers.
    if (Object.keys(next).length > 0) {
      toast.error(
        next.password
          ? "Your password is not strong enough."
          : "Please fix the highlighted fields."
      );
      return;
    }

    // Temporary: Better Auth sign up replaces this later.
    // The user is logged in right after registering, so they go straight to Home.
    tempRegister({ name: name.trim(), email: email.trim() });
    toast.success(`Welcome to BookNook, ${name.trim()}!`);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <AuthField id="reg-name" label="Name" error={errors.name}>
        <input
          id="reg-name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className={inputClass}
        />
      </AuthField>

      <AuthField id="reg-email" label="Email" error={errors.email}>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </AuthField>

      <AuthField id="reg-password" label="Password" error={errors.password}>
        <PasswordInput
          id="reg-password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
        <PasswordChecklist password={password} />
      </AuthField>

      <Button
        type="submit"
        size="lg"
        className="btn-gloss h-11 w-full rounded-full text-base"
      >
        Register
      </Button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}