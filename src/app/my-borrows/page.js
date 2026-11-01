import RequireLogin from "@/components/auth/RequireLogin";
import MyBorrowsView from "@/components/books/MyBorrowsView";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata = {
  title: "My Borrows",
};

export default function MyBorrowsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <SectionHeading
        eyebrow="On Your Nightstand"
        title="My Borrows"
        subtitle="Books you borrowed, when they are due and a one click way to return them."
        className="mb-8"
      />
      <RequireLogin>
        <MyBorrowsView />
      </RequireLogin>
    </main>
  );
}