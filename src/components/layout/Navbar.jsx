"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LogOut, User as UserIcon } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/lib/temp-auth";
import { signOut } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, pending } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleLogout = async () => {
    setOpen(false);
    await signOut();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav
        data-scrolled={scrolled}
        className="nav-shell glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5"
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="logo-tile">
            <Logo className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-xl font-bold text-foreground">
              BookNook
            </span>
            <span className="mt-1 hidden text-[10px] uppercase tracking-[0.22em] text-muted-foreground lg:block">
              Add · Borrow · Return
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      className="nav-pill absolute inset-0 rounded-full"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {pending ? (
            <span
              aria-hidden="true"
              className="hidden h-9 w-24 animate-pulse rounded-full bg-foreground/10 md:block"
            />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Avatar className="h-9 w-9 ring-2 ring-primary/60">
                  <AvatarImage
                    src={user.photo || undefined}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-primary font-semibold text-primary-foreground">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "rounded-full px-4"
                )}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(buttonVariants(), "btn-gloss rounded-full px-5")}
              >
                Register
              </Link>
            </div>
          )}

          <MobileMenu
            open={open}
            onOpenChange={setOpen}
            links={links}
            user={user}
            isActive={isActive}
            onLogout={handleLogout}
          />
        </div>
      </nav>
    </header>
  );
}