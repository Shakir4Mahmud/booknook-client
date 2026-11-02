"use client";

import { useEffect, useRef, useState } from "react";
import { BookmarkCheck, Library, Shapes, Users } from "lucide-react";

function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsStrip({ stats }) {
  const items = [
    { label: "Books Shared", value: stats.books, icon: Library },
    { label: "Books Borrowed", value: stats.borrows, icon: BookmarkCheck },
    { label: "Happy Readers", value: stats.readers, icon: Users },
    { label: "Categories", value: stats.categories, icon: Shapes },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="glass grid grid-cols-2 gap-y-8 rounded-[2rem] px-4 py-8 sm:px-8 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-border">
        {items.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="logo-tile">
              <Icon className="h-5 w-5" />
            </span>
            <p className="font-heading text-3xl font-bold sm:text-4xl">
              <CountUp value={value} />
            </p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}