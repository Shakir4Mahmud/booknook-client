"use client";

import { useSyncExternalStore } from "react";

// Temporary login state saved in the browser. Replaced by Better Auth later.
// Components only use useTempUser, tempLogin and tempLogout, so swapping is easy.

const USER_KEY = "booknook-temp-user";
const ACCOUNTS_KEY = "booknook-temp-accounts";
const CHANGE_EVENT = "booknook-auth-change";

let cachedRaw = null;
let cachedUser = null;

// Returns the same object until the stored text changes, so React does not loop.
function readUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      cachedUser = raw ? JSON.parse(raw) : null;
    }
    return cachedUser;
  } catch {
    return null;
  }
}

function subscribe(callback) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

// null on the server and on the first paint, the real user after that.
export function useTempUser() {
  return useSyncExternalStore(subscribe, readUser, () => null);
}

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function tempLogin(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function tempLogout() {
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

// Register: remember the account, then log in straight away.
export function tempRegister({ name, email }) {
  const user = { name, email: email.toLowerCase(), photo: "" };
  const accounts = getAccounts().filter((item) => item.email !== user.email);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, user]));
  tempLogin(user);
  return user;
}

// Login: use the registered name if we know the email, else build one from the email.
export function tempSignIn(email) {
  const clean = email.trim().toLowerCase();
  const found = getAccounts().find((item) => item.email === clean);
  const fallbackName = clean.split("@")[0].replace(/^\w/, (c) => c.toUpperCase());
  const user = found || { name: fallbackName, email: clean, photo: "" };
  tempLogin(user);
  return user;
}