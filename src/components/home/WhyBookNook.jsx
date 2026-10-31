import { CalendarClock, Heart, Share2, Zap } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

const features = [
  {
    icon: Heart,
    title: "Free to Join",
    text: "Make an account in a minute and start borrowing. No fees, no hidden steps.",
  },
  {
    icon: CalendarClock,
    title: "Track Your Borrows",
    text: "See every book you have, when it is due and whether you are running late.",
  },
  {
    icon: Zap,
    title: "Live Availability",
    text: "Every book shows how many copies are left, so you never chase a book that is gone.",
  },
  {
    icon: Share2,
    title: "Share Your Shelf",
    text: "Add your own books and edit or remove them any time from My Books.",
  },
];

export default function WhyBookNook() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionHeading
        eyebrow="Why Readers Love Us"
        title="Why BookNook"
        subtitle="A small library built around what readers actually need."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, text }) => (
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
    </section>
  );
}