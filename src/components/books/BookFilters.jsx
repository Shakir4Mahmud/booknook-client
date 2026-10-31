"use client";

import { ArrowUpDown, Check, ChevronDown, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categoryList, getCategoryColor } from "@/lib/categories";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Title A to Z" },
];

export default function BookFilters({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}) {
  const chips = ["All", ...categoryList];
  const currentSort =
    sortOptions.find((option) => option.value === sort) || sortOptions[0];

  return (
    <div className="glass rounded-3xl p-4 sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title or author"
            aria-label="Search books"
            className="h-11 w-full rounded-full border border-border bg-background/40 pl-11 pr-10 text-sm outline-none backdrop-blur-md transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort: custom glass dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Sort books"
            className="flex h-11 w-full items-center justify-between gap-3 rounded-full border border-border bg-background/40 px-4 text-sm font-medium outline-none backdrop-blur-md transition hover:border-primary/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 data-[state=open]:border-primary md:w-52"
          >
            <span className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-primary" />
              {currentSort.label}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-2xl border border-border p-1.5 backdrop-blur-2xl"
            style={{ background: "var(--nav-bg)" }}
          >
            {sortOptions.map((option) => {
              const active = option.value === sort;
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm",
                    active && "bg-accent font-semibold text-primary"
                  )}
                >
                  {option.label}
                  {active && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {chips.map((name) => {
          const active = category === name;
          const color =
            name === "All" ? "var(--primary)" : getCategoryColor(name);
          return (
            <button
              key={name}
              type="button"
              onClick={() => onCategoryChange(name)}
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
                      boxShadow: `0 6px 18px -8px ${color}`,
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
  );
}