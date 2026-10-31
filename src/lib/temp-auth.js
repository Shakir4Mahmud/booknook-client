"use client";

import { useMemo } from "react";
import { useSession } from "@/lib/auth-client";

// Real login state from Better Auth.
// The file name is old. Components still import useTempUser, so nothing else breaks.

// pending is true while the session is still being read after a page load.
export function useAuth() {
  const { data, isPending } = useSession();
  const sessionUser = data?.user;

  const user = useMemo(() => {
    if (!sessionUser) return null;
    return {
      name: sessionUser.name,
      email: sessionUser.email,
      photo: sessionUser.image || "",
    };
  }, [sessionUser]);

  return { user, pending: isPending };
}

export function useTempUser() {
  return useAuth().user;
}