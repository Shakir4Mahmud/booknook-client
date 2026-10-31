"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteBookDialog({ book, onOpenChange, onConfirm }) {
  return (
    <AlertDialog open={Boolean(book)} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="rounded-3xl border border-border backdrop-blur-2xl"
        style={{ background: "var(--nav-bg)" }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Delete this book?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-semibold text-foreground">{book?.title}</span>{" "}
            will be removed from BookNook for everyone. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-full">Keep it</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(book)}
            className="rounded-full bg-destructive text-white hover:bg-destructive/90"
          >
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}