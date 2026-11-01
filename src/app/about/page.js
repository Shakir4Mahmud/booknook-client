import { BookOpen, HeartHandshake, Sparkles } from "lucide-react";
import FaqSection from "@/components/home/FaqSection";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = {
  title: "About",
};

const values = [
  {
    icon: BookOpen,
    title: "Books should travel",
    text: "A book sitting on a shelf is a story waiting. We help it find its next reader.",
  },
  {
    icon: HeartHandshake,
    title: "Trust between readers",
    text: "Borrow, enjoy and return. A small library only works when everyone plays fair.",
  },
  {
    icon: Sparkles,
    title: "Keep it simple",
    text: "Add a book. Borrow a book. Return a book. No clutter, no complicated steps.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-8 pt-10">
      <SectionHeading
        eyebrow="Our Story"
        title="About BookNook"
        subtitle="A small online library built by readers, for readers."
        className="mb-10"
      />

      <GlassCard className="mx-auto max-w-3xl space-y-4 p-8 text-base leading-relaxed text-muted-foreground sm:p-10">
        <p>
          BookNook started with a simple question: why do so many good books
          sit unread on private shelves while other people hunt for the same
          titles?
        </p>
        <p>
          So we made a cozy corner on the internet where anyone can share a
          book, borrow one for a few days and send it back when they are done.
          Every book shows how many copies are free right now, so you always
          know what you can pick up.
        </p>
        <p>
          You stay in charge of your own shelf. Only you can edit or remove the
          books you add, and every borrow is tracked so nothing gets lost.
        </p>
      </GlassCard>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {values.map(({ icon: Icon, title, text }) => (
          <GlassCard key={title} hover className="h-full">
            <div className="logo-tile mb-5">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </GlassCard>
        ))}
      </div>

      <FaqSection />
    </main>
  );
}