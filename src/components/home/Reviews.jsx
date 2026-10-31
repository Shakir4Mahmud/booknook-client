import { Star } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

const reviews = [
  {
    name: "Nusrat Jahan",
    role: "University student",
    text: "I found two textbooks I needed for the semester without spending a taka. Returning them was just one click.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Weekend reader",
    text: "The due badge on My Borrows keeps me on track. I finally stopped forgetting when a book has to go back.",
  },
  {
    name: "Sadia Rahman",
    role: "Parent of two",
    text: "The Kids shelf is lovely. My children pick a new story every week and I add our old ones for others.",
  },
];

export default function Reviews() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Reader Reviews"
        title="Loved by Our Readers"
        subtitle="A few kind words from people who share and borrow on BookNook."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map(({ name, role, text }) => (
          <GlassCard key={name} className="flex h-full flex-col">
            <div className="mb-4 flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{text}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                {name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}