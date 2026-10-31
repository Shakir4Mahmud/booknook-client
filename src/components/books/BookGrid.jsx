import { SearchX } from "lucide-react";
import BookCard from "./BookCard";
import GlassCard from "@/components/shared/GlassCard";

export default function BookGrid({ books }) {
  if (!books || books.length === 0) {
    return (
      <GlassCard className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
        <SearchX className="mb-4 h-10 w-10 text-primary" />
        <h3 className="text-xl font-bold">No books found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try a different search or pick another shelf.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}