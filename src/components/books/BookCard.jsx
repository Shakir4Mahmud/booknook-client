"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import CopiesBadge from "./CopiesBadge";
import { buttonVariants } from "@/components/ui/button";
import { getCategoryColor } from "@/lib/categories";
import { cn } from "@/lib/utils";

export default function BookCard({ book }) {
  const [imageFailed, setImageFailed] = useState(false);
  const color = getCategoryColor(book.category);
  const showImage = !imageFailed && book.image;

  return (
    <GlassCard
      as="article"
      hover
      className="relative flex h-full flex-col overflow-hidden p-0"
    >
      {/* Colored spine on the left */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-10 w-1 sm:w-1.5"
        style={{ background: color }}
      />

      <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/3]">
        {showImage ? (
          <>

            <Image
              src={book.image}
              alt=""
              fill
              unoptimized
              aria-hidden="true"
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="scale-125 object-cover opacity-60 blur-2xl"
            />

            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="object-contain p-3 drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)] sm:p-4"
              onError={() => setImageFailed(true)}
            />
          </>
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center"
            style={{
              background: `linear-gradient(160deg, color-mix(in srgb, ${color} 38%, transparent), color-mix(in srgb, ${color} 8%, transparent))`,
            }}
          >
            <BookOpen className="h-8 w-8 sm:h-10 sm:w-10" style={{ color }} />
            <p className="font-heading text-sm font-bold leading-snug sm:text-lg">
              {book.title}
            </p>
          </div>
        )}
        <CopiesBadge
          available={book.availableCopies}
          className="absolute right-2 top-2 px-2 py-0.5 text-[10px] sm:right-3 sm:top-3 sm:px-2.5 sm:text-xs"
        />
      </div>

      <div className="flex flex-1 flex-col p-3 pl-4 sm:p-5 sm:pl-6">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug sm:min-h-[3.25rem] sm:text-lg">
          {book.title}
        </h3>
        <p className="mt-1 truncate text-xs text-muted-foreground sm:text-sm">
          {book.author}
        </p>

        <span
          className="mt-2 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold sm:mt-3 sm:px-3 sm:py-1 sm:text-xs"
          style={{
            color,
            background: `color-mix(in srgb, ${color} 16%, transparent)`,
            border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
          }}
        >
          {book.category}
        </span>

        <Link
          href={`/books/${book._id}`}
          className={cn(
            buttonVariants(),
            "btn-gloss mt-4 h-9 w-full rounded-full text-xs sm:mt-5 sm:h-10 sm:text-sm"
          )}
        >
          View Details
        </Link>
      </div>
    </GlassCard>
  );
}