"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { LayoutGrid, Pencil, Plus, Rows3, Trash2, BookPlus } from "lucide-react";
import BookThumb from "./BookThumb";
import CopiesBadge from "./CopiesBadge";
import DeleteBookDialog from "./DeleteBookDialog";
import EditBookDialog from "./EditBookDialog";
import ErrorState from "@/components/shared/ErrorState";
import GlassCard from "@/components/shared/GlassCard";
import Spinner from "@/components/shared/Spinner";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { getCategoryColor } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { useTempUser } from "@/lib/temp-auth";
import { useFetch } from "@/lib/use-fetch";
import { cn } from "@/lib/utils";

function CategoryPill({ category }) {
  const color = getCategoryColor(category);
  return (
    <span
      className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{
        color,
        background: `color-mix(in srgb, ${color} 16%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
      }}
    >
      {category}
    </span>
  );
}

function RowActions({ book, onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onEdit(book)}
        className="glass flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:text-primary"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>
      <button
        type="button"
        onClick={() => onDelete(book)}
        className="glass flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-destructive transition hover:-translate-y-0.5"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete
      </button>
    </div>
  );
}

// Rendered only after login, so the user is always set here.
export default function MyBooksView() {
  const user = useTempUser();
  const { data, error, loading, reload, setData } = useFetch("/books", {
    enabled: Boolean(user),
  });

  const [view, setView] = useState("cards");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Only the books this user added.
  const myEmail = user?.email?.toLowerCase();
  const books = useMemo(
    () =>
      (data || []).filter(
        (book) => book.addedBy?.email?.toLowerCase() === myEmail
      ),
    [data, myEmail]
  );

  const handleSave = (updated) => {
    setData((list) =>
      list.map((book) => (book._id === updated._id ? updated : book))
    );
  };

  const handleDelete = async (book) => {
    try {
      await apiFetch(`/books/${book._id}`, { method: "DELETE", auth: true });
      setData((list) => list.filter((item) => item._id !== book._id));
      toast.success(`"${book.title}" was deleted.`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <Spinner label="Loading your books... the server may take a few seconds to wake up." />;
  }
  if (error) return <ErrorState message={error} onRetry={reload} />;

  if (books.length === 0) {
    return (
      <GlassCard className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
        <span className="logo-tile mb-4">
          <BookPlus className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-bold">Your shelf is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Books you add will show up here, ready to edit or remove.
        </p>
        <Link
          href="/add-book"
          className={cn(buttonVariants({ size: "lg" }), "btn-gloss mt-6 rounded-full px-8")}
        >
          Add your first book
        </Link>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="px-1 text-sm text-muted-foreground">
          You have shared{" "}
          <span className="font-semibold text-foreground">{books.length}</span>{" "}
          {books.length === 1 ? "book" : "books"}.
        </p>

        <div className="flex items-center gap-3">
          <div className="glass flex rounded-full p-1" role="group" aria-label="Change view">
            {[
              { key: "cards", label: "Cards", Icon: LayoutGrid },
              { key: "table", label: "Table", Icon: Rows3 },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-pressed={view === key}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition",
                  view === key
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
          <Link
            href="/add-book"
            className={cn(buttonVariants(), "btn-gloss h-10 rounded-full px-5")}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Book
          </Link>
        </div>
      </div>

      {view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <GlassCard key={book._id} className="flex h-full flex-col gap-4 p-4">
              <div className="flex gap-4">
                <BookThumb book={book} className="w-20" />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-lg font-bold leading-snug">
                    {book.title}
                  </h3>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {book.author}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <CategoryPill category={book.category} />
                    <CopiesBadge available={book.availableCopies} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {book.availableCopies} of {book.totalCopies} copies available ·
                Added {formatDate(book.createdAt)}
              </p>
              <div className="mt-auto">
                <RowActions book={book} onEdit={setEditing} onDelete={setDeleting} />
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="glass overflow-x-auto rounded-3xl">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-4 font-medium">Book</th>
                <th className="px-3 py-4 font-medium">Category</th>
                <th className="px-3 py-4 font-medium">Copies</th>
                <th className="px-3 py-4 font-medium">Added</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-b border-border/60 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <BookThumb book={book} className="w-11" />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{book.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {book.author}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <CategoryPill category={book.category} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {book.availableCopies}/{book.totalCopies}
                      </span>
                      <CopiesBadge available={book.availableCopies} />
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">
                    {formatDate(book.createdAt)}
                  </td>
                  <td className="px-5 py-3">
                    <RowActions book={book} onEdit={setEditing} onDelete={setDeleting} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <EditBookDialog
          key={editing._id}
          book={editing}
          open
          onOpenChange={(open) => !open && setEditing(null)}
          onSave={handleSave}
        />
      )}

      <DeleteBookDialog
        book={deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}