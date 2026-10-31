"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/shared/Spinner";
import { useAuth } from "@/lib/temp-auth";

export default function RequireLogin({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, pending } = useAuth();

  useEffect(() => {
    if (!pending && !user) {
      toast.error("Please login to see this page.");
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pending, user, pathname, router]);

  if (pending || !user) return <Spinner label="Checking your login..." />;

  return children;
}