"use client";

import { useSyncExternalStore } from "react";

const storageKey = "pethaven-favorite-pets";
const listeners = new Set<() => void>();
const empty = "[]";
let unsaved: string | undefined;

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function snapshot() {
  try {
    return unsaved ?? localStorage.getItem(storageKey) ?? empty;
  } catch {
    return unsaved ?? empty;
  }
}

function readFavorites(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((name) => typeof name === "string") : [];
  } catch {
    return [];
  }
}

function toggleFavorite(name: string) {
  const favorites = readFavorites(snapshot());
  const next = JSON.stringify(favorites.includes(name)
    ? favorites.filter((favorite) => favorite !== name)
    : [...favorites, name]);
  try {
    localStorage.setItem(storageKey, next);
    unsaved = undefined;
  } catch {
    unsaved = next;
  }
  listeners.forEach((listener) => listener());
}

export function usePetFavorites() {
  const stored = useSyncExternalStore(subscribe, snapshot, () => empty);
  return { favorites: readFavorites(stored), toggleFavorite };
}
