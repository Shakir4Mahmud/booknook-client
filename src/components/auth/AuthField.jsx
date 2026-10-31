import { cn } from "@/lib/utils";

export const inputClass =
  "h-11 w-full rounded-full border border-border bg-background/40 px-4 text-sm outline-none backdrop-blur-md transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40";

export default function AuthField({
  id,
  label,
  error,
  labelRight,
  children,
  className,
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {labelRight}
      </div>
      {children}
      {error && (
        <p role="alert" className="px-2 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}