"use client";

import { useMemo } from "react";
import { useSession } from "@/lib/auth-client";


export function useAuth() {
  const { data, isPending } = useSession();
  const sessionUser = data?.user;

  const user = useMemo(() => {
    if (!sessionUser) return null;
    return {
      name: sessionUser.name,
      email: sessionUser.email,
      photo: sessionUser.image || "",
      joined: sessionUser.createdAt || null,
    };
  }, [sessionUser]);

  return { user, pending: isPending };
}

export function useTempUser() {
  return useAuth().user;
}