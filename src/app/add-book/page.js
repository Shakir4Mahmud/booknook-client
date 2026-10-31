import SectionHeading from "@/components/shared/SectionHeading";
import AddBookView from "@/components/books/AddBookView";

export const metadata = {
  title: "Add Book",
};

export default function AddBookPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
      <SectionHeading
        eyebrow="Share a Story"
        title="Add a Book"
        subtitle="Fill in the details and let other readers find your book."
        className="mb-8"
      />
      <AddBookView />
    </main>
  );
}