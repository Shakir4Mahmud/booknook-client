"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookMarked,
  BookmarkCheck,
  Home,
  Library,
  LogIn,
  LogOut,
  Menu,
  Plus,
  User as UserIcon,
  UserPlus,
} from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import "./mobile-menu.css";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const icons = {
  "/": Home,
  "/books": Library,
  "/add-book": Plus,
  "/my-books": BookMarked,
  "/my-borrows": BookmarkCheck,
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function MobileMenu({
  open,
  onOpenChange,
  links,
  user,
  isActive,
  onLogout,
}) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger
        aria-label="Open menu"
        className="rounded-full p-2 transition-colors hover:bg-accent md:hidden"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="mm-panel w-[88%] max-w-sm gap-0 rounded-l-[2rem] border-l border-border p-0"
        style={{ background: "var(--nav-bg)" }}
      >
        {/* Floating color orbs behind everything */}
        <span
          aria-hidden="true"
          className="mm-orb -right-10 -top-10 h-48 w-48"
          style={{ background: "var(--orb-1)", opacity: 0.35 }}
        />
        <span
          aria-hidden="true"
          className="mm-orb -bottom-16 -left-12 h-56 w-56"
          style={{
            background: "var(--orb-2)",
            opacity: 0.3,
            animationDelay: "-5s",
          }}
        />

        <div className="relative z-10 flex h-full flex-col overflow-y-auto px-5 pb-6 pt-6">
          <SheetHeader className="p-0">
            <SheetTitle className="flex items-center gap-3">
              <span className="logo-tile">
                <Logo className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-heading text-xl">BookNook</span>
                <span className="mt-1 text-[10px] font-normal uppercase tracking-[0.22em] text-muted-foreground">
                  Add · Borrow · Return
                </span>
              </span>
            </SheetTitle>
            <SheetDescription className="sr-only">
              Site navigation menu
            </SheetDescription>
          </SheetHeader>

          {/* welcome card */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.1 }}
            className="mm-card glass mt-6 flex items-center gap-4 rounded-3xl p-4"
          >
            {user ? (
              <>
                <span className="mm-avatar-ring shrink-0">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={user.photo || undefined} alt={user.name} />
                    <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Welcome back</p>
                  <p className="truncate font-heading text-lg font-bold">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className="font-heading text-lg font-bold">Hello, reader</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Login to borrow books and share your own shelf.
                </p>
              </div>
            )}
          </motion.div>

          {/* Links */}
          <motion.ul
            variants={list}
            initial="hidden"
            animate="show"
            className="mt-6 flex flex-col gap-2"
          >
            {links.map((link) => {
              const Icon = icons[link.href] || Library;
              const active = isActive(link.href);
              return (
                <motion.li key={link.href} variants={item}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl border border-transparent px-4 py-3 text-base font-medium transition-all duration-300 hover:translate-x-1 hover:bg-accent",
                      active ? "mm-active text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                        active
                          ? "bg-primary/25 text-primary"
                          : "bg-foreground/5 group-hover:bg-primary/15 group-hover:text-primary"
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    {link.label}
                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Bottom area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-auto space-y-3 pt-8"
          >
            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={close}
                  className={cn(
                    buttonVariants(),
                    "btn-gloss h-11 w-full rounded-full"
                  )}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
                <button
                  type="button"
                  onClick={onLogout}
                  className="glass flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold text-destructive transition hover:-translate-y-0.5"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={close}
                  className={cn(
                    buttonVariants(),
                    "btn-gloss h-11 w-full rounded-full"
                  )}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Link>
                <Link
                  href="/login"
                  onClick={close}
                  className="glass flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition hover:-translate-y-0.5"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </>
            )}

            <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
              <span>Switch theme</span>
              <ThemeToggle />
            </div>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}