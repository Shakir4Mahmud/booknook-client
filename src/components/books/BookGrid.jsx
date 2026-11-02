"use client";

import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import BookCard from "./BookCard";
import GlassCard from "@/components/shared/GlassCard";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BookGrid({
  books,
  emptyTitle = "No books found",
  emptyText = "Try a different search or pick another shelf.",
}) {
  if (!books || books.length === 0) {
    return (
      <GlassCard className="mx-auto flex max-w-md flex-col items-center py-12 text-center">
        <SearchX className="mb-4 h-10 w-10 text-primary" />
        <h3 className="text-xl font-bold">{emptyTitle}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{emptyText}</p>
      </GlassCard>
    );
  }

  return (
    <motion.div
      key={books.map((book) => book._id).join(",")}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3"
    >
      {books.map((book) => (
        <motion.div key={book._id} variants={item} className="h-full">
          <BookCard book={book} />
        </motion.div>
      ))}
    </motion.div>
  );
}