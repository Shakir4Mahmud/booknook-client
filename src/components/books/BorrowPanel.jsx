"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookmarkCheck, BookmarkPlus, Ban, UserRound } from "lucide-react";
import BorrowModal from "./BorrowModal";
import CopiesBadge from "./CopiesBadge";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { useFetch } from "@/lib/use-fetch";
import { useTempUser } from "@/lib/temp-auth";
import { cn } from "@/lib/utils";

export default function BorrowPanel({ book }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useTempUser();

  const borrows = useFetch("/borrows", { auth: true, enabled: Boolean(user) });

  const [available, setAvailable] = useState(book.availableCopies);
  const [justBorrowed, setJustBorrowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const total = book.totalCopies;
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;

  const isOwner =
    Boolean(user) &&
    book.addedBy?.email?.toLowerCase() === user.email.toLowerCase();
  const alreadyBorrowed =
    justBorrowed ||
    Boolean(borrows.data?.some((item) => item.bookId === book._id));
  const soldOut = available <= 0;

  const barColor = soldOut
    ? "bg-red-500"
    : available === 1
      ? "bg-amber-500"
      : "bg-emerald-500";

  const handleOpen = () => {
    // Not logged in
    if (!user) {
      toast.error("Please login to borrow a book.");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setOpenedAt(Date.now());
    setOpen(true);
  };

  const handleConfirm = async (days) => {
    setSubmitting(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        auth: true,
        body: { bookId: book._id, days },
      });
      setAvailable((count) => Math.max(0, count - 1));
      setJustBorrowed(true);
      setOpen(false);
      toast.success(`Borrowed for ${days} days. Enjoy "${book.title}"!`);
    } catch (err) {
      if (err.status === 409) setJustBorrowed(true);
      setOpen(false);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  let button;
  if (isOwner) {
    button = (
      <>
        <UserRound className="mr-2 h-5 w-5" />
        This is your book
      </>
    );
  } else if (alreadyBorrowed) {
    button = (
      <>
        <BookmarkCheck className="mr-2 h-5 w-5" />
        Already Borrowed
      </>
    );
  } else if (soldOut) {
    button = (
      <>
        <Ban className="mr-2 h-5 w-5" />
        Not Available
      </>
    );
  } else {
    button = (
      <>
        <BookmarkPlus className="mr-2 h-5 w-5" />
        Borrow This Book
      </>
    );
  }

  const disabled = isOwner || alreadyBorrowed || soldOut;

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
        disabled={disabled}
        onClick={handleOpen}
        className="btn-gloss mt-5 h-12 w-full rounded-full text-base disabled:opacity-60 disabled:saturate-50"
      >
        {button}
      </Button>

      {isOwner && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          You added this book, so you can edit or delete it from My Books.
        </p>
      )}
      {!isOwner && alreadyBorrowed && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Return it from My Borrows to borrow it again.
        </p>
      )}

      {user && (
        <BorrowModal
          open={open}
          onOpenChange={setOpen}
          book={book}
          openedAt={openedAt}
          onConfirm={handleConfirm}
          submitting={submitting}
        />
      )}
    </div>
  );
}