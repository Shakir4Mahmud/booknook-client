"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { getCategoryColor } from "@/lib/categories";
import { cn } from "@/lib/utils";

export default function BookCover({ book, className }) {
  const [failed, setFailed] = useState(false);
  const color = getCategoryColor(book.category);
  const showImage = !failed && book.image;

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-2xl",
        className
      )}
    >
      {showImage ? (
        <>
          <Image
            src={book.image}
            alt=""
            fill
            unoptimized
            aria-hidden="true"
            sizes="(min-width: 768px) 40vw, 80vw"
            className="scale-125 object-cover opacity-60 blur-2xl"
          />
          <Image
            src={book.image}
            alt={`Cover of ${book.title}`}
            fill
            unoptimized
            priority
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-contain p-4 drop-shadow-[0_14px_24px_rgba(0,0,0,0.5)]"
            onError={() => setFailed(true)}
          />
        </>
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${color} 38%, transparent), color-mix(in srgb, ${color} 8%, transparent))`,
          }}
        >
          <BookOpen className="h-12 w-12" style={{ color }} />
          <p className="font-heading text-xl font-bold leading-snug">
            {book.title}
          </p>
        </div>
      )}
    </div>
  );
}