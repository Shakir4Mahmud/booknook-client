"use client";

import { useMemo } from "react";
import StatsStrip from "./StatsStrip";
import NewArrivals from "./NewArrivals";
import ErrorState from "@/components/shared/ErrorState";
import Spinner from "@/components/shared/Spinner";
import { useFetch } from "@/lib/use-fetch";

export default function HomeBooks() {
  const { data, error, loading, reload } = useFetch("/books");

  // The server returns newest first, so the first 6 are the latest.
  const stats = useMemo(() => {
    const books = data || [];
    return {
      books: books.length,
      borrows: books.reduce(
        (sum, book) => sum + (book.totalCopies - book.availableCopies),
        0
      ),
      readers: new Set(books.map((book) => book.addedBy?.email)).size,
      categories: new Set(books.map((book) => book.category)).size,
    };
  }, [data]);

  if (loading) {
    return <Spinner label="Loading books... the server may take a few seconds to wake up." />;
  }
  if (error) return <ErrorState message={error} onRetry={reload} />;

  return (
    <>
      <StatsStrip stats={stats} />
      <NewArrivals books={data.slice(0, 6)} />
    </>
  );
}