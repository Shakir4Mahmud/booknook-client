import { cn } from "@/lib/utils";

export default function CopiesBadge({ available, className }) {
  let label = `${available} left`;
  let tone =
    "bg-emerald-500/15 text-emerald-700 border-emerald-500/40 dark:text-emerald-300";

  if (available <= 0) {
    label = "Not Available";
    tone = "bg-red-500/15 text-red-700 border-red-500/40 dark:text-red-300";
  } else if (available === 1) {
    label = "Last copy";
    tone =
      "bg-amber-500/15 text-amber-700 border-amber-500/40 dark:text-amber-300";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md",
        tone,
        className
      )}
    >
      {label}
    </span>
  );
}