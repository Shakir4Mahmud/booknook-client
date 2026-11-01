"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Check, ChevronDown, Loader2, Minus, Plus } from "lucide-react";
import AuthField, { inputClass } from "@/components/auth/AuthField";
import ImageUpload from "./ImageUpload";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiFetch } from "@/lib/api";
import { categoryList, getCategoryColor } from "@/lib/categories";
import { hasImgbbKey, uploadToImgbb } from "@/lib/imgbb";
import { cn } from "@/lib/utils";

const MIN_COPIES = 1;
const MAX_COPIES = 50;
const MIN_DESCRIPTION = 20;

const readOnlyClass =
  "h-11 w-full cursor-not-allowed rounded-full border border-border bg-background/40 px-4 text-sm text-muted-foreground outline-none";

export default function BookForm({ user }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [copies, setCopies] = useState(1);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imageError, setImageError] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const changeCopies = (value) => {
    const number = Math.min(MAX_COPIES, Math.max(MIN_COPIES, value));
    setCopies(number);
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setCategory("");
    setCopies(1);
    setDescription("");
    setFile(null);
    setImageError("");
    setErrors({});
    setFormKey((key) => key + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};

    if (!title.trim()) next.title = "Please enter the book title.";
    if (!author.trim()) next.author = "Please enter the author name.";
    if (!category) next.category = "Please pick a category.";
    if (description.trim().length < MIN_DESCRIPTION) {
      next.description = `Write at least ${MIN_DESCRIPTION} characters about the book.`;
    }
    if (!file) next.image = "Please add a cover image.";

    setErrors(next);
    setImageError(next.image || "");

    if (Object.keys(next).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);

    // Step 1: upload the cover to imgbb.
    let imageUrl = "";
    if (hasImgbbKey) {
      try {
        imageUrl = await uploadToImgbb(file);
      } catch {
        toast.error("Could not upload the image. Please try again.");
        setSaving(false);
        return;
      }
    } else {
      toast.info("No imgbb key found, so the cover upload was skipped.");
    }

    // Step 2: save the book. The owner is read from the login token on the server.
    try {
      const saved = await apiFetch("/books", {
        method: "POST",
        auth: true,
        body: {
          title: title.trim(),
          author: author.trim(),
          category,
          image: imageUrl,
          description: description.trim(),
          totalCopies: copies,
        },
      });
      toast.success(`"${saved.title}" was added to BookNook!`);
      resetForm();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const categoryColor = category ? getCategoryColor(category) : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass grid gap-8 rounded-[2rem] p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      {/* Cover */}
      <div>
        <p className="mb-2 text-sm font-medium">Book cover</p>
        <ImageUpload
          key={formKey}
          file={file}
          onChange={setFile}
          error={imageError}
          onError={setImageError}
        />
      </div>

      {/* Fields */}
      <div className="space-y-4">
        <AuthField id="book-title" label="Book title" error={errors.title}>
          <input
            id="book-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The Alchemist"
            className={inputClass}
          />
        </AuthField>

        <AuthField id="book-author" label="Author name" error={errors.author}>
          <input
            id="book-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Paulo Coelho"
            className={inputClass}
          />
        </AuthField>

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField id="book-category" label="Category" error={errors.category}>
            <DropdownMenu>
              <DropdownMenuTrigger
                id="book-category"
                className={cn(
                  inputClass,
                  "flex items-center justify-between text-left data-[state=open]:border-primary"
                )}
              >
                <span
                  className={cn(
                    "flex items-center gap-2",
                    !category && "text-muted-foreground"
                  )}
                >
                  {categoryColor && (
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: categoryColor }}
                    />
                  )}
                  {category || "Select a category"}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-2xl border border-border p-1.5 backdrop-blur-2xl"
                style={{ background: "var(--nav-bg)" }}
              >
                {categoryList.map((name) => (
                  <DropdownMenuItem
                    key={name}
                    onClick={() => setCategory(name)}
                    className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: getCategoryColor(name) }}
                      />
                      {name}
                    </span>
                    {category === name && <Check className="h-4 w-4 text-primary" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </AuthField>

          <AuthField id="book-copies" label="Total copies">
            <div className="flex h-11 items-center justify-between rounded-full border border-border bg-background/40 px-2 backdrop-blur-md">
              <button
                type="button"
                onClick={() => changeCopies(copies - 1)}
                disabled={copies <= MIN_COPIES}
                aria-label="Decrease copies"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-accent disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                id="book-copies"
                type="number"
                min={MIN_COPIES}
                max={MAX_COPIES}
                value={copies}
                onChange={(e) => changeCopies(Number(e.target.value) || MIN_COPIES)}
                className="w-14 bg-transparent text-center text-sm font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
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
          </AuthField>
        </div>

        <AuthField
          id="book-description"
          label="Short description"
          error={errors.description}
          labelRight={
            <span className="text-xs text-muted-foreground">
              {description.trim().length} characters
            </span>
          }
        >
          <textarea
            id="book-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this book about? Why should someone read it?"
            className={cn(inputClass, "h-auto resize-none rounded-2xl py-3")}
          />
        </AuthField>

        <div className="grid gap-4 sm:grid-cols-2">
          <AuthField id="book-user-name" label="Added by (name)">
            <input
              id="book-user-name"
              value={user.name}
              readOnly
              className={readOnlyClass}
            />
          </AuthField>
          <AuthField id="book-user-email" label="Added by (email)">
            <input
              id="book-user-email"
              value={user.email}
              readOnly
              className={readOnlyClass}
            />
          </AuthField>
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
              Adding book...
            </>
          ) : (
            "Add Book"
          )}
        </Button>
      </div>
    </form>
  );
}