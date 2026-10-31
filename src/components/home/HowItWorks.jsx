import { BookOpen, Plus, RotateCcw } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

const steps = [
  {
    number: "01",
    icon: Plus,
    title: "Add a Book",
    text: "Share a book from your own shelf. Add the title, author, cover and how many copies you can lend.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Borrow a Book",
    text: "Find a book you like, pick how many days you need it and confirm. It shows up in My Borrows.",
  },
  {
    number: "03",
    icon: RotateCcw,
    title: "Return a Book",
    text: "Done reading? Return it with one click so the next reader can enjoy it too.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Simple Steps"
        title="How Borrowing Works"
        subtitle="Three easy steps from finding a story to handing it back."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map(({ number, icon: Icon, title, text }) => (
          <GlassCard key={title} hover className="relative h-full overflow-hidden">
            <span className="absolute right-5 top-3 font-heading text-6xl font-bold text-foreground/10">
              {number}
            </span>
            <div className="logo-tile mb-5">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}