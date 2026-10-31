import { cn } from "@/lib/utils";

export default function GlassCard({
  as: Tag = "div",
  hover = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        "glass rounded-2xl p-6",
        hover &&
          "transition duration-300 hover:-translate-y-1 hover:border-primary/50",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}