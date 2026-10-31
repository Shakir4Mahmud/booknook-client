import Link from "next/link";
import { BookOpen, FlaskConical, Landmark, Baby, Shapes } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

const categories = [
  { name: "Fiction", icon: BookOpen, color: "#e0607e", text: "Novels and stories" },
  { name: "Science", icon: FlaskConical, color: "#1fb5b0", text: "Curious minds" },
  { name: "History", icon: Landmark, color: "#f6b756", text: "Tales of the past" },
  { name: "Kids", icon: Baby, color: "#4cb6f5", text: "Little readers" },
  { name: "Others", icon: Shapes, color: "#8b7cf6", text: "Everything else" },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Browse by Shelf"
        title="Top Categories"
        subtitle="Pick a shelf and see what other readers have shared."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map(({ name, icon: Icon, color, text }) => (
          <Link key={name} href={`/books?category=${name}`} className="block">
            <GlassCard
              hover
              className="flex h-full flex-col items-center p-5 text-center"
            >
              <span
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  color,
                  background: `color-mix(in srgb, ${color} 18%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
                }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold">{name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{text}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}