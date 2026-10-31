"use client";

import BookForm from "./BookForm";
import RequireLogin from "@/components/auth/RequireLogin";
import { useTempUser } from "@/lib/temp-auth";

export default function AddBookView() {
  const user = useTempUser();

  return <RequireLogin>{user && <BookForm user={user} />}</RequireLogin>;
}