"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUpload({ file, onChange, error, onError }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [dragging, setDragging] = useState(false);

  const pick = (selected) => {
    if (!selected) return;

    if (!ALLOWED.includes(selected.type)) {
      onError("Please choose a JPG, PNG or WEBP image.");
      return;
    }
    if (selected.size > MAX_SIZE) {
      onError("Image must be smaller than 5 MB.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(selected));
    onError("");
    onChange(selected);
  };

  const remove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const showPreview = file && preview;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        aria-label="Book cover image"
        onChange={(e) => pick(e.target.files?.[0])}
      />

      {showPreview ? (
        <div className="glass relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl">

          <img
            src={preview}
            alt="Selected cover preview"
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={remove}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pick(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition",
            dragging
              ? "border-primary bg-primary/10"
              : "border-border bg-background/30 hover:border-primary/60"
          )}
        >
          <span className="logo-tile">
            {dragging ? (
              <UploadCloud className="h-5 w-5" />
            ) : (
              <ImagePlus className="h-5 w-5" />
            )}
          </span>
          <span className="text-sm font-medium">
            Drag a cover here or click to browse
          </span>
          <span className="text-xs text-muted-foreground">
            JPG, PNG or WEBP, up to 5 MB
          </span>
        </button>
      )}

      {error && (
        <p role="alert" className="mt-2 px-2 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}