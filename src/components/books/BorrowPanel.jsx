"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookmarkPlus, Ban } from "lucide-react";
import BorrowModal from "./BorrowModal";
import CopiesBadge from "./CopiesBadge";
import { Button } from "@/components/ui/button";
import { useTempUser } from "@/lib/temp-auth";
import { cn } from "@/lib/utils";

export default function BorrowPanel({ book }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useTempUser();

  const [available, setAvailable] = useState(book.availableCopies);
  const [borrowed, setBorrowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(0);

  const total = book.totalCopies;
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;
  const soldOut = available <= 0;

  const barColor = soldOut
    ? "bg-red-500"
    : available === 1
      ? "bg-amber-500"
      : "bg-emerald-500";

  const handleOpen = () => {
    // Not logged in: send to login, and come back to this book after login.
    if (!user) {
      toast.error("Please login to borrow a book.");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setOpenedAt(Date.now());
    setOpen(true);
  };

  // UI only for now. Later this calls POST /borrows and the server checks for double borrow.
  const handleConfirm = (days) => {
    if (!user) return;
    if (borrowed) {
      toast.error("You already borrowed this book. Return it first.");
      setOpen(false);
      return;
    }
    setBorrowed(true);
    setAvailable((count) => count - 1);
    setOpen(false);
    toast.success(`Borrowed for ${days} days. Enjoy "${book.title}"!`);
  };

  return (
    <div className="glass rounded-3xl p-5 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium">
          <span className="text-lg font-bold">{available}</span> of {total}{" "}
          copies available
        </p>
        <CopiesBadge available={available} />
      </div>

      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-foreground/10"
        role="progressbar"
        aria-valuenow={available}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Copies available"
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", barColor)}
          style={{ width: `${percent}%` }}
        />
      </div>

      <Button
        type="button"
        size="lg"
        disabled={soldOut}
        onClick={handleOpen}
        className="btn-gloss mt-5 h-12 w-full rounded-full text-base disabled:opacity-60 disabled:saturate-50"
      >
        {soldOut ? (
          <>
            <Ban className="mr-2 h-5 w-5" />
            Not Available
          </>
        ) : (
          <>
            <BookmarkPlus className="mr-2 h-5 w-5" />
            Borrow This Book
          </>
        )}
      </Button>

      {user && (
        <BorrowModal
          open={open}
          onOpenChange={setOpen}
          book={book}
          openedAt={openedAt}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}