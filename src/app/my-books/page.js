import RequireLogin from "@/components/auth/RequireLogin";
import MyBooksView from "@/components/books/MyBooksView";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = {
  title: "My Books",
};

export default function MyBooksPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <SectionHeading
        eyebrow="Your Shelf"
        title="My Books"
        subtitle="Edit the details of the books you shared, or take them down."
        className="mb-8"
      />
      <RequireLogin>
        <MyBooksView />
      </RequireLogin>
    </main>
  );
}