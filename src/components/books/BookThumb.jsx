"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { getCategoryColor } from "@/lib/categories";
import { cn } from "@/lib/utils";

export default function BookThumb({ book, className }) {
  const [failed, setFailed] = useState(false);
  const color = getCategoryColor(book.category);

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-14 shrink-0 overflow-hidden rounded-lg border border-border",
        className
      )}
    >
      {!failed && book.image ? (
        <Image
          src={book.image}
          alt={`Cover of ${book.title}`}
          fill
          unoptimized
          sizes="80px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background: `linear-gradient(160deg, color-mix(in srgb, ${color} 38%, transparent), color-mix(in srgb, ${color} 8%, transparent))`,
          }}
        >
          <BookOpen className="h-5 w-5" style={{ color }} />
        </div>
      )}
    </div>
  );
}