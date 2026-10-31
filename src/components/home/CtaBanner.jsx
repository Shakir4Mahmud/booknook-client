"use client";

import Link from "next/link";
import { useTempUser } from "@/lib/temp-auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CtaBanner() {
  const user = useTempUser();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="glass relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#6d5dfc]/25 blur-3xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            Got books gathering dust? Share them.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Someone out there is looking for the exact book on your shelf. Add
            it to BookNook and let it find a new reader.
          </p>
          <Link
            href={user ? "/add-book" : "/register"}
            className={cn(
              buttonVariants({ size: "lg" }),
              "btn-gloss mt-8 rounded-full px-8"
            )}
          >
            {user ? "Add a Book" : "Join BookNook"}
          </Link>
        </div>
      </div>
    </section>
  );
}