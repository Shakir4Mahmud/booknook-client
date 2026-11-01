import RequireLogin from "@/components/auth/RequireLogin";
import ProfileView from "@/components/profile/ProfileView";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = {
  title: "My Profile",
};

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-16 pt-10">
      <SectionHeading
        eyebrow="Your Corner"
        title="My Profile"
        subtitle="Your details, your photo and a quick look at your shelf."
        className="mb-8"
      />
      <RequireLogin>
        <ProfileView />
      </RequireLogin>
    </main>
  );
}