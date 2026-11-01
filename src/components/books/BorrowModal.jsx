"use client";

import { useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTempUser } from "@/lib/temp-auth";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const dayOptions = [3, 5, 7, 14];
const DAY_MS = 24 * 60 * 60 * 1000;

const fieldClass =
  "h-11 w-full cursor-not-allowed rounded-full border border-border bg-background/40 px-4 text-sm text-muted-foreground outline-none";

export default function BorrowModal({
  open,
  onOpenChange,
  book,
  openedAt,
  onConfirm,
  submitting,
}) {
  const [days, setDays] = useState(7);
  const user = useTempUser();

  if (!user) return null;

  // openedAt is a timestamp saved when the modal was opened.
  const borrowDate = formatDate(openedAt, true);
  const returnDate = formatDate(openedAt + days * DAY_MS, true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-3xl border border-border backdrop-blur-2xl sm:max-w-md"
        style={{ background: "var(--nav-bg)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Borrow this book</DialogTitle>
          <DialogDescription>
            You are borrowing{" "}
            <span className="font-semibold text-foreground">{book.title}</span>.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!submitting) onConfirm(days);
          }}
        >
          <div className="space-y-1.5">
            <label htmlFor="borrow-name" className="text-sm font-medium">
              Your name
            </label>
            <input
              id="borrow-name"
              value={user.name}
              readOnly
              className={fieldClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="borrow-email" className="text-sm font-medium">
              Your email
            </label>
            <input
              id="borrow-email"
              value={user.email}
              readOnly
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">How many days do you need it?</p>
            <div className="grid grid-cols-4 gap-2">
              {dayOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDays(option)}
                  aria-pressed={days === option}
                  className={cn(
                    "rounded-full border py-2 text-sm font-semibold transition",
                    days === option
                      ? "border-primary/70 bg-primary/20 text-foreground shadow-[0_6px_18px_-8px_var(--primary)]"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option} days
                </button>
              ))}
            </div>
          </div>

          <div className="glass flex items-center gap-3 rounded-2xl p-4 text-sm">
            <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
            <div className="grid flex-1 grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Borrow date</p>
                <p className="font-semibold">{borrowDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Return date</p>
                <p className="font-semibold">{returnDate}</p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="btn-gloss h-11 w-full rounded-full disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Borrowing...
              </>
            ) : (
              "Confirm Borrow"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}