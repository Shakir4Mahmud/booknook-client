import Link from "next/link";
import { Home } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl px-4 pb-16 pt-12">
      <GlassCard className="relative w-full overflow-hidden px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
        />

        <svg
          viewBox="0 0 120 90"
          className="relative mx-auto mb-4 h-24 w-32"
          aria-hidden="true"
        >
          <path
            d="M60 18c-8-6-22-8-36-6v58c14-2 28 0 36 6 8-6 22-8 36-6V12c-14-2-28 0-36 6Z"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M60 18v58" stroke="var(--primary)" strokeWidth="4" />
          <path
            d="M98 4a10 10 0 1 0 12 14 8 8 0 0 1-12-14Z"
            fill="var(--primary)"
          />
        </svg>

        <p className="relative font-heading text-8xl font-bold text-primary sm:text-9xl">
          404
        </p>
        <h1 className="relative mt-4 text-2xl font-bold sm:text-3xl">
          This page wandered off
        </h1>
        <p className="relative mx-auto mt-3 max-w-md text-muted-foreground">
          We looked on every shelf but could not find the page you wanted. It
          may have moved or never existed.
        </p>

        <Link
          href="/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "btn-gloss relative mt-8 rounded-full px-8"
          )}
        >
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </GlassCard>
    </main>
  );
}