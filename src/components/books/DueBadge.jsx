import { cn } from "@/lib/utils";

const tones = {
  ok: "bg-emerald-500/15 text-emerald-700 border-emerald-500/40 dark:text-emerald-300",
  soon: "bg-amber-500/15 text-amber-700 border-amber-500/40 dark:text-amber-300",
  late: "bg-red-500/15 text-red-700 border-red-500/40 dark:text-red-300",
};

export default function DueBadge({ label, tone, className }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md",
        tones[tone],
        className
      )}
    >
      {label}
    </span>
  );
}