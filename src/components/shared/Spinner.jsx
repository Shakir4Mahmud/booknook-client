import { cn } from "@/lib/utils";

export default function Spinner({ label = "Loading...", className }) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-24",
        className
      )}
    >
      <span className="relative block h-12 w-12">
        <span className="absolute inset-0 rounded-full border-4 border-primary/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      </span>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}