import { Suspense } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import Spinner from "@/components/shared/Spinner";
import AllBooksView from "@/components/books/AllBooksView";

export const metadata = {
  title: "All Books",
};

export default function BooksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <SectionHeading
        eyebrow="The Whole Shelf"
        title="All Books"
        subtitle="Search by title or author, pick a shelf and find your next read."
        className="mb-8"
      />
      <Suspense fallback={<Spinner label="Loading books..." />}>
        <AllBooksView />
      </Suspense>
    </main>
  );
}