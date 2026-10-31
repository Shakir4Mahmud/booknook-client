import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import BookCover from "@/components/books/BookCover";
import BorrowPanel from "@/components/books/BorrowPanel";
import BookGrid from "@/components/books/BookGrid";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { mockBooks } from "@/lib/mock-books";
import { getCategoryColor } from "@/lib/categories";
import { formatDate } from "@/lib/format";

// Mock data: tell Next.js which ids exist. Removed when the real API is connected.
export function generateStaticParams() {
  return mockBooks.map((book) => ({ id: book._id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = mockBooks.find((item) => item._id === id);
  return { title: book ? book.title : "Book Not Found" };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = mockBooks.find((item) => item._id === id);

  if (!book) notFound();

  const color = getCategoryColor(book.category);
  const related = mockBooks
    .filter((item) => item.category === book.category && item._id !== book._id)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:pt-10">
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
              {book.addedBy.name.charAt(0)}
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

          <BorrowPanel book={book} />
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
    </main>
  );
}