import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = {
  title: "Contact",
};

const details = [
  { icon: Mail, label: "Email", value: "hello@booknook.com" },
  { icon: Phone, label: "Phone", value: "+880 1700 000000" },
  { icon: MapPin, label: "Address", value: "Reading Lane, Dhaka, Bangladesh" },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
      <SectionHeading
        eyebrow="Say Hello"
        title="Contact Us"
        subtitle="Questions, ideas or a book you cannot find? We would love to hear from you."
        className="mb-10"
      />

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4">
          {details.map(({ icon: Icon, label, value }) => (
            <GlassCard key={label} className="flex items-center gap-4 p-5">
              <span className="logo-tile shrink-0">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="break-words font-semibold">{value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6 sm:p-8">
          <ContactForm />
        </GlassCard>
      </div>
    </main>
  );
}