"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BookFilters from "./BookFilters";
import BookGrid from "./BookGrid";
import { categoryList } from "@/lib/categories";
import { mockBooks } from "@/lib/mock-books";

export default function AllBooksView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Category lives in the URL so links like /books?category=Science work
  // and the filter survives a page reload.
  const urlCategory = searchParams.get("category");
  const category = categoryList.includes(urlCategory) ? urlCategory : "All";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const handleCategoryChange = (name) => {
    const params = new URLSearchParams(searchParams.toString());
    if (name === "All") {
      params.delete("category");
    } else {
      params.set("category", name);
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const visibleBooks = useMemo(() => {
    const text = query.trim().toLowerCase();

    const filtered = mockBooks.filter((book) => {
      const matchesCategory = category === "All" || book.category === category;
      const matchesText =
        !text ||
        book.title.toLowerCase().includes(text) ||
        book.author.toLowerCase().includes(text);
      return matchesCategory && matchesText;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      if (sort === "az") return a.title.localeCompare(b.title);
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [query, category, sort]);

  return (
    <div className="space-y-6">
      <BookFilters
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={setSort}
      />

      <p className="px-1 text-sm text-muted-foreground" aria-live="polite">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {visibleBooks.length}
        </span>{" "}
        {visibleBooks.length === 1 ? "book" : "books"}
        {category !== "All" && (
          <>
            {" "}
            in <span className="font-semibold text-foreground">{category}</span>
          </>
        )}
      </p>

      <BookGrid books={visibleBooks} />
    </div>
  );
}