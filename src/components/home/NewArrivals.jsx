import Link from "next/link";
import BookGrid from "@/components/books/BookGrid";
import SectionHeading from "@/components/shared/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { getLatestBooks } from "@/lib/mock-books";
import { cn } from "@/lib/utils";

export default function NewArrivals() {
  // Mock data for now. Later this comes from GET /books?limit=6 (newest first).
  const books = getLatestBooks(6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Fresh on the Shelf"
        title="New Arrivals"
        subtitle="The latest books shared by our readers, newest first."
      />
      <BookGrid books={books} />
      <div className="mt-10 text-center">
        <Link
          href="/books"
          className={cn(
            buttonVariants({ size: "lg" }),
            "btn-gloss rounded-full px-8"
          )}
        >
          See All Books
        </Link>
      </div>
    </section>
  );
}