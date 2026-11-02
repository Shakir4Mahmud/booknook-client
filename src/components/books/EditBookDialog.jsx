"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Minus, Plus } from "lucide-react";
import AuthField, { inputClass } from "@/components/auth/AuthField";
import BookThumb from "./BookThumb";
import ImageUpload from "./ImageUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { categoryList, getCategoryColor } from "@/lib/categories";
import { hasImgbbKey, uploadToImgbb } from "@/lib/imgbb";
import { cn } from "@/lib/utils";

const MAX_COPIES = 50;
const MIN_DESCRIPTION = 20;

export default function EditBookDialog({ book, open, onOpenChange, onSave }) {
  const borrowed = book.totalCopies - book.availableCopies;
  const minCopies = Math.max(1, borrowed);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [copies, setCopies] = useState(book.totalCopies);
  const [description, setDescription] = useState(book.description);
  const [file, setFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const changeCopies = (value) =>
    setCopies(Math.min(MAX_COPIES, Math.max(minCopies, value)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!title.trim()) next.title = "Please enter the book title.";
    if (!author.trim()) next.author = "Please enter the author name.";
    if (description.trim().length < MIN_DESCRIPTION) {
      next.description = `Write at least ${MIN_DESCRIPTION} characters about the book.`;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);
    try {
      let image = book.image;
      if (file) {
        if (hasImgbbKey) {
          image = await uploadToImgbb(file);
        } else {
          toast.info("No imgbb key found, so the old cover was kept.");
        }
      }

      const updated = await apiFetch(`/books/${book._id}`, {
        method: "PATCH",
        auth: true,
        body: {
          title: title.trim(),
          author: author.trim(),
          category,
          description: description.trim(),
          image,
          totalCopies: copies,
        },
      });

      onSave(updated);
      toast.success(`"${updated.title}" was updated.`);
      onOpenChange(false);
    } catch (err) {
      toast.error(err.message || "Could not save the changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto rounded-3xl border border-border backdrop-blur-2xl sm:max-w-2xl"
        style={{ background: "var(--nav-bg)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit book</DialogTitle>
          <DialogDescription>
            Change anything you like, then save.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AuthField id="edit-title" label="Book title" error={errors.title}>
            <input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </AuthField>

          <AuthField id="edit-author" label="Author name" error={errors.author}>
            <input
              id="edit-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
            />
          </AuthField>

          <div>
            <p className="mb-2 text-sm font-medium">Category</p>
            <div className="flex flex-wrap gap-2">
              {categoryList.map((name) => {
                const active = category === name;
                const color = getCategoryColor(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setCategory(name)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                      active
                        ? "text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                    style={
                      active
                        ? {
                            background: `color-mix(in srgb, ${color} 22%, transparent)`,
                            borderColor: `color-mix(in srgb, ${color} 60%, transparent)`,
                          }
                        : undefined
                    }
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          <AuthField id="edit-copies" label="Total copies">
            <div className="flex h-11 w-44 items-center justify-between rounded-full border border-border bg-background/40 px-2">
              <button
                type="button"
                onClick={() => changeCopies(copies - 1)}
                disabled={copies <= minCopies}
                aria-label="Decrease copies"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-accent disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold">{copies}</span>
              <button
                type="button"
                onClick={() => changeCopies(copies + 1)}
                disabled={copies >= MAX_COPIES}
                aria-label="Increase copies"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-accent disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {borrowed > 0 && (
              <p className="px-2 text-xs text-muted-foreground">
                {borrowed} {borrowed === 1 ? "copy is" : "copies are"} borrowed
                right now, so you cannot go below {minCopies}.
              </p>
            )}
          </AuthField>

          <AuthField
            id="edit-description"
            label="Short description"
            error={errors.description}
          >
            <textarea
              id="edit-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={cn(inputClass, "h-auto resize-none rounded-2xl py-3")}
            />
          </AuthField>

          <div>
            <p className="mb-2 text-sm font-medium">Cover</p>
            <div className="flex items-start gap-4">
              <BookThumb book={book} className="w-20" />
              <div className="flex-1">
                <p className="mb-2 text-xs text-muted-foreground">
                  Current cover. Choose a new image only if you want to replace it.
                </p>
                <ImageUpload
                  file={file}
                  onChange={setFile}
                  error={imageError}
                  onError={setImageError}
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={saving}
            className="btn-gloss h-12 w-full rounded-full text-base disabled:opacity-70"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}