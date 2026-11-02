import GlassCard from "@/components/shared/GlassCard";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "What we collect",
    text: "When you register or sign in with Google, we save your name, email address and profile photo. When you add or borrow books, we save those book records with your email so we can show them to you.",
  },
  {
    title: "How we use it",
    text: "We use your details only to run BookNook: to log you in, show your name on the books you share, track your borrows and keep copy counts correct.",
  },
  {
    title: "Google sign in",
    text: "If you choose Continue with Google, Google shares your name, email and photo with us. We do not get your Google password and we do not read your emails, contacts or files.",
  },
  {
    title: "Sharing",
    text: "We do not sell your data and we do not share it with advertisers. The name and email of a person who adds a book are visible on that book's page to other logged in readers.",
  },
  {
    title: "Your choices",
    text: "You can change your profile photo from My Profile at any time. You can edit or delete the books you added from My Books. To ask us to delete your account, contact us using the details on the Contact page.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-10">
      <SectionHeading
        eyebrow="Your Data"
        title="Privacy Policy"
        subtitle="Short and plain: what BookNook keeps and why."
        className="mb-10"
      />
      <GlassCard className="space-y-8 p-8 sm:p-10">
        {sections.map(({ title, text }) => (
          <section key={title}>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
          </section>
        ))}
      </GlassCard>
    </main>
  );
}