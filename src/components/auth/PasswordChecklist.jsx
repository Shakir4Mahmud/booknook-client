import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function getPasswordChecks(password) {
  return [
    { label: "At least one uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "At least one lowercase letter", ok: /[a-z]/.test(password) },
    { label: "At least 6 characters", ok: password.length >= 6 },
  ];
}

export function isPasswordValid(password) {
  return getPasswordChecks(password).every((check) => check.ok);
}

export default function PasswordChecklist({ password }) {
  const checks = getPasswordChecks(password);

  return (
    <ul className="space-y-1.5 px-2 pt-1" aria-label="Password rules">
      {checks.map(({ label, ok }) => (
        <li
          key={label}
          className={cn(
            "flex items-center gap-2 text-xs transition-colors",
            ok ? "text-emerald-500" : "text-muted-foreground"
          )}
        >
          {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
          {label}
        </li>
      ))}
    </ul>
  );
}