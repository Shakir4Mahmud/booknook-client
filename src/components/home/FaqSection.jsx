import { ChevronDown } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

const faqs = [
  {
    q: "Is BookNook free to use?",
    a: "Yes. Creating an account, adding books and borrowing books are all free.",
  },
  {
    q: "How long can I keep a borrowed book?",
    a: "You choose when you borrow: 3, 5, 7 or 14 days. Your return date is shown in My Borrows.",
  },
  {
    q: "Can I borrow the same book twice at the same time?",
    a: "No. You can hold one copy of a book at a time. Return it first, then you can borrow it again.",
  },
  {
    q: "What happens when all copies are taken?",
    a: "The book shows Not Available and the Borrow button is disabled until someone returns a copy.",
  },
  {
    q: "Can I edit or delete a book I added?",
    a: "Yes. Open My Books to update the details or remove a book you shared.",
  },
];

export default function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <SectionHeading
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        subtitle="Quick answers before you start reading."
      />
      <div className="space-y-3">
        {faqs.map(({ q, a }) => (
          <GlassCard
            as="details"
            key={q}
            className="group p-0 open:border-primary/50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-medium [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}