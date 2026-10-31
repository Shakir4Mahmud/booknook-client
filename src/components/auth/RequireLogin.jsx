"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/shared/Spinner";
import { useTempUser } from "@/lib/temp-auth";

// false on the server, true in the browser. Stops a wrong redirect on first paint.
const subscribe = () => () => {};
const getClientValue = () => true;
const getServerValue = () => false;

export default function RequireLogin({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useTempUser();
  const mounted = useSyncExternalStore(subscribe, getClientValue, getServerValue);

  useEffect(() => {
    if (mounted && !user) {
      toast.error("Please login to see this page.");
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [mounted, user, pathname, router]);

  if (!mounted || !user) return <Spinner label="Checking your login..." />;

  return children;
}