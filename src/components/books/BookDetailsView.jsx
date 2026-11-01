"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarDays, SearchX } from "lucide-react";
import BookCover from "./BookCover";
import BorrowPanel from "./BorrowPanel";
import BookGrid from "./BookGrid";
import ErrorState from "@/components/shared/ErrorState";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";
import Spinner from "@/components/shared/Spinner";
import { buttonVariants } from "@/components/ui/button";
import { getCategoryColor } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { useFetch } from "@/lib/use-fetch";
import { cn } from "@/lib/utils";

export default function BookDetailsView() {
  const { id } = useParams();
  const bookState = useFetch(`/books/${id}`);
  const allState = useFetch("/books");
  const book = bookState.data;

  useEffect(() => {
    if (book) document.title = `BookNook | ${book.title}`;
  }, [book]);

  if (bookState.loading) {
    return <Spinner label="Loading book... the server may take a few seconds to wake up." />;
  }

  if (bookState.status === 404 || bookState.status === 400) {
    return (
      <GlassCard className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
        <SearchX className="mb-4 h-10 w-10 text-primary" />
        <h2 className="text-2xl font-bold">Book not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This book may have been removed by the person who added it.
        </p>
        <Link
          href="/books"
          className={cn(buttonVariants({ size: "lg" }), "btn-gloss mt-6 rounded-full px-8")}
        >
          Back to All Books
        </Link>
      </GlassCard>
    );
  }

  if (bookState.error) {
    return <ErrorState message={bookState.error} onRetry={bookState.reload} />;
  }

  const color = getCategoryColor(book.category);
  const related = (allState.data || [])
    .filter((item) => item.category === book.category && item._id !== book._id)
    .slice(0, 3);

  return (
    <>
      <Link
        href="/books"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Books
      </Link>

      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
        <GlassCard className="relative overflow-hidden p-4 sm:p-5">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1.5"
            style={{ background: color }}
          />
          <BookCover book={book} className="mx-auto max-w-sm" />
        </GlassCard>

        <div className="space-y-6">
          <div>
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                color,
                background: `color-mix(in srgb, ${color} 16%, transparent)`,
                border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
              }}
            >
              {book.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              by <span className="font-semibold text-foreground">{book.author}</span>
            </p>
          </div>

          <p className="text-base leading-relaxed text-muted-foreground">
            {book.description}
          </p>

          <GlassCard className="flex items-center gap-4 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
              {book.addedBy.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">Added by</p>
              <p className="truncate font-semibold">{book.addedBy.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {book.addedBy.email}
              </p>
            </div>
            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
              <CalendarDays className="h-4 w-4 text-primary" />
              {formatDate(book.createdAt)}
            </div>
          </GlassCard>

          <BorrowPanel key={book._id} book={book} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-20">
          <SectionHeading
            eyebrow="Keep Reading"
            title={`More in ${book.category}`}
            subtitle="Other books from the same shelf."
          />
          <BookGrid books={related} />
        </section>
      )}
    </>
  );
}