import { Suspense } from "react";
import BookDetailsView from "@/components/books/BookDetailsView";
import RequireLogin from "@/components/auth/RequireLogin";
import Spinner from "@/components/shared/Spinner";

export const metadata = {
  title: "Book Details",
};

export default function BookDetailsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:pt-10">
      <RequireLogin>
        <Suspense fallback={<Spinner label="Loading book..." />}>
          <BookDetailsView />
        </Suspense>
      </RequireLogin>
    </main>
  );
}