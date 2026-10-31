import Link from "next/link";
import Logo from "@/components/layout/Logo";

function Art() {
  return (
    <svg viewBox="0 0 260 260" className="h-full w-full" aria-hidden="true">
      <circle cx="130" cy="130" r="108" fill="#f6b756" opacity="0.16" />
      <circle cx="130" cy="130" r="78" fill="#6d5dfc" opacity="0.14" />
      <g transform="rotate(-10 150 80)">
        <rect x="128" y="26" width="36" height="84" rx="6" fill="#6d5dfc" />
        <rect x="128" y="26" width="10" height="84" rx="4" fill="#fff" opacity="0.22" />
      </g>
      <rect x="56" y="104" width="150" height="32" rx="7" fill="#1fb5b0" />
      <rect x="56" y="104" width="150" height="9" rx="4" fill="#fff" opacity="0.26" />
      <rect x="36" y="142" width="170" height="32" rx="7" fill="#f6b756" />
      <rect x="36" y="142" width="170" height="9" rx="4" fill="#fff" opacity="0.26" />
      <rect x="48" y="180" width="164" height="32" rx="7" fill="#e0607e" />
      <rect x="48" y="180" width="164" height="9" rx="4" fill="#fff" opacity="0.26" />
      <path d="M214 40a15 15 0 1 0 16 20 12 12 0 0 1-16-20Z" fill="#f6c778" />
      <circle cx="40" cy="70" r="3" fill="#fff" opacity="0.8" />
      <circle cx="226" cy="108" r="2.5" fill="#fff" opacity="0.7" />
    </svg>
  );
}

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="mx-auto flex max-w-5xl px-4 pb-16 pt-8 sm:pt-12">
      <div className="glass grid w-full overflow-hidden rounded-[2rem] md:grid-cols-2">
        <div className="relative hidden flex-col items-center justify-center gap-6 border-r border-border p-10 md:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative h-60 w-60">
            <Art />
          </div>
          <div className="relative text-center">
            <p className="font-heading text-2xl font-bold">
              Add a book. Borrow a book. Return a book.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your cozy little library is waiting.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <Link href="/" className="mb-6 flex items-center gap-2 text-primary md:hidden">
            <Logo className="h-7 w-7" />
            <span className="font-heading text-xl font-bold text-foreground">
              BookNook
            </span>
          </Link>
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}