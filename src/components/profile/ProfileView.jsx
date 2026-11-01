"use client";

import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  BookmarkCheck,
  CalendarDays,
  Camera,
  Library,
  Loader2,
  Mail,
  Repeat,
} from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { formatDate } from "@/lib/format";
import { hasImgbbKey, uploadToImgbb } from "@/lib/imgbb";
import { useTempUser } from "@/lib/temp-auth";
import { useFetch } from "@/lib/use-fetch";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

// Rendered only after login, so the user is always set here.
export default function ProfileView() {
  const user = useTempUser();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const books = useFetch("/books", { enabled: Boolean(user) });
  const borrows = useFetch("/borrows", { auth: true, enabled: Boolean(user) });

  const stats = useMemo(() => {
    const myEmail = user?.email?.toLowerCase();
    const mine = (books.data || []).filter(
      (book) => book.addedBy?.email?.toLowerCase() === myEmail
    );
    return {
      added: mine.length,
      lentOut: mine.reduce(
        (sum, book) => sum + (book.totalCopies - book.availableCopies),
        0
      ),
      borrowing: (borrows.data || []).length,
    };
  }, [books.data, borrows.data, user]);

  const handlePick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!ALLOWED.includes(file.type)) {
      toast.error("Please choose a JPG, PNG or WEBP image.");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }
    if (!hasImgbbKey) {
      toast.error("Photo upload is not set up yet (missing imgbb key).");
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToImgbb(file);
      const { error } = await authClient.updateUser({ image: url });
      if (error) throw new Error("update failed");
      toast.success("Your profile photo was updated.");
    } catch {
      toast.error("Could not update your photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const statsLoading = books.loading || borrows.loading;
  const show = (value) => (statsLoading ? "-" : value);

  const cards = [
    { label: "Books added", value: show(stats.added), Icon: Library },
    { label: "Currently borrowing", value: show(stats.borrowing), Icon: BookmarkCheck },
    { label: "Copies lent out", value: show(stats.lentOut), Icon: Repeat },
  ];

  return (
    <div className="space-y-8">
      <GlassCard className="flex flex-col items-center gap-6 p-8 text-center sm:flex-row sm:text-left">
        <div className="relative shrink-0">
          <span className="mm-avatar-ring">
            <Avatar className="h-28 w-28 border-4 border-background">
              <AvatarImage src={user.photo || undefined} alt={user.name} />
              <AvatarFallback className="bg-primary text-4xl font-semibold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </span>

          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            aria-label="Choose a new profile photo"
            onChange={handlePick}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            aria-label="Change profile photo"
            className="btn-gloss absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-70"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-3xl font-bold">{user.name}</h2>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
            <Mail className="h-4 w-4 text-primary" />
            <span className="truncate">{user.email}</span>
          </p>
          {user.joined && (
            <p className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground sm:justify-start">
              <CalendarDays className="h-4 w-4 text-primary" />
              Joined {formatDate(user.joined, true)}
            </p>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Tap the camera to change your photo. JPG, PNG or WEBP, up to 5 MB.
          </p>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, Icon }) => (
          <GlassCard key={label} className="flex flex-col items-center gap-2 text-center">
            <span className="logo-tile">
              <Icon className="h-5 w-5" />
            </span>
            <p className="font-heading text-4xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}