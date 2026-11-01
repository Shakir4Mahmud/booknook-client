"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BookmarkCheck, Loader2, Undo2 } from "lucide-react";
import BookThumb from "./BookThumb";
import DueBadge from "./DueBadge";
import ErrorState from "@/components/shared/ErrorState";
import GlassCard from "@/components/shared/GlassCard";
import Spinner from "@/components/shared/Spinner";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { formatDate, getDueInfo } from "@/lib/format";
import { useTempUser } from "@/lib/temp-auth";
import { useFetch } from "@/lib/use-fetch";
import { cn } from "@/lib/utils";

function ReturnButton({ busy, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-gloss flex h-9 items-center gap-1.5 rounded-full px-4 text-sm disabled:opacity-60"
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Undo2 className="h-3.5 w-3.5" />
      )}
      {busy ? "Returning..." : "Return Book"}
    </button>
  );
}

// Mounted only after the borrows have loaded, so the clock is read in the browser only.
function BorrowsList({ borrows, onReturn, returningId }) {
  const [now] = useState(() => Date.now());

  const lateCount = borrows.filter(
    (item) => getDueInfo(item.returnDate, now).tone === "late"
  ).length;

  const asBook = (item) => ({
    image: item.bookImage,
    title: item.bookTitle,
    category: "Others",
  });

  return (
    <div className="space-y-6">
      <div className="glass flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-5 py-4 text-sm">
        <p>
          Currently borrowing:{" "}
          <span className="text-lg font-bold text-primary">{borrows.length}</span>
        </p>
        {lateCount > 0 && (
          <p className="text-destructive">
            {lateCount} {lateCount === 1 ? "book is" : "books are"} overdue
          </p>
        )}
      </div>

      {/* Table: tablet and desktop */}
      <div className="glass hidden overflow-x-auto rounded-3xl md:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-4 font-medium">Book</th>
              <th className="px-3 py-4 font-medium">Borrow date</th>
              <th className="px-3 py-4 font-medium">Return date</th>
              <th className="px-3 py-4 font-medium">Status</th>
              <th className="px-5 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((item) => {
              const due = getDueInfo(item.returnDate, now);
              return (
                <tr key={item._id} className="border-b border-border/60 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <BookThumb book={asBook(item)} className="w-12" />
                      <Link
                        href={`/books/${item.bookId}`}
                        className="line-clamp-2 font-semibold transition-colors hover:text-primary"
                      >
                        {item.bookTitle}
                      </Link>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {formatDate(item.borrowDate, true)}
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {formatDate(item.returnDate, true)}
                  </td>
                  <td className="px-3 py-3">
                    <DueBadge label={due.label} tone={due.tone} />
                  </td>
                  <td className="px-5 py-3">
                    <ReturnButton
                      busy={returningId === item._id}
                      disabled={Boolean(returningId)}
                      onClick={() => onReturn(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards: mobile */}
      <div className="grid gap-4 md:hidden">
        {borrows.map((item) => {
          const due = getDueInfo(item.returnDate, now);
          return (
            <GlassCard key={item._id} className="flex flex-col gap-4 p-4">
              <div className="flex gap-4">
                <BookThumb book={asBook(item)} className="w-16" />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/books/${item.bookId}`}
                    className="line-clamp-2 text-base font-bold leading-snug"
                  >
                    {item.bookTitle}
                  </Link>
                  <div className="mt-2">
                    <DueBadge label={due.label} tone={due.tone} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Borrow date</p>
                  <p className="font-semibold">{formatDate(item.borrowDate, true)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Return date</p>
                  <p className="font-semibold">{formatDate(item.returnDate, true)}</p>
                </div>
              </div>
              <ReturnButton
                busy={returningId === item._id}
                disabled={Boolean(returningId)}
                onClick={() => onReturn(item)}
              />
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// Rendered only after login, so the user is always set here.
export default function MyBorrowsView() {
  const user = useTempUser();
  const { data, error, loading, reload, setData } = useFetch("/borrows", {
    auth: true,
    enabled: Boolean(user),
  });
  const [returningId, setReturningId] = useState("");

  const handleReturn = async (item) => {
    setReturningId(item._id);
    try {
      // The server gives one copy back to the book.
      await apiFetch(`/borrows/${item._id}`, { method: "DELETE", auth: true });
      setData((list) => list.filter((borrow) => borrow._id !== item._id));
      toast.success(`"${item.bookTitle}" was returned. Thank you!`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReturningId("");
    }
  };

  if (loading) {
    return (
      <Spinner label="Loading your borrows... the server may take a few seconds to wake up." />
    );
  }
  if (error) return <ErrorState message={error} onRetry={reload} />;

  if (!data || data.length === 0) {
    return (
      <GlassCard className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
        <span className="logo-tile mb-4">
          <BookmarkCheck className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-bold">No borrowed books</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Books you borrow will show up here with their return dates.
        </p>
        <Link
          href="/books"
          className={cn(buttonVariants({ size: "lg" }), "btn-gloss mt-6 rounded-full px-8")}
        >
          Browse Books
        </Link>
      </GlassCard>
    );
  }

  return (
    <BorrowsList borrows={data} onReturn={handleReturn} returningId={returningId} />
  );
}