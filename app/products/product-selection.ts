"use client";

import { useSyncExternalStore } from "react";
import { catalogProducts } from "./catalog";

type Selection = { cart: Record<string, number>; favorites: string[] };

const key = "pethaven-product-selection";
const empty = '{"cart":{},"favorites":[]}';
const listeners = new Set<() => void>();
let fallback: string | undefined;

function snapshot() {
  try {
    return fallback ?? localStorage.getItem(key) ?? empty;
  } catch {
    return fallback ?? empty;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function readSelection(value: string): Selection {
  try {
    const { cart, favorites } = JSON.parse(value);
    return {
      cart: Object.fromEntries(Object.entries(cart ?? {}).filter(
        ([, quantity]) => typeof quantity === "number" && Number.isSafeInteger(quantity) && quantity > 0,
      )) as Selection["cart"],
      favorites: Array.isArray(favorites) ? favorites.filter((item) => typeof item === "string") : [],
    };
  } catch {
    return { cart: {}, favorites: [] };
  }
}

function updateSelection(update: (current: Selection) => Selection) {
  const next = JSON.stringify(update(readSelection(snapshot())));
  try {
    localStorage.setItem(key, next);
    fallback = undefined;
  } catch {
    fallback = next;
  }
  listeners.forEach((listener) => listener());
}

export function changeProductQuantity(image: string, amount: number) {
  updateSelection(({ cart, favorites }) => {
    const quantity = (cart[image] ?? 0) + amount;
    if (quantity > 0) cart[image] = quantity;
    else delete cart[image];
    return { cart, favorites };
  });
}

export function toggleProductFavorite(image: string) {
  updateSelection(({ cart, favorites }) => ({
    cart,
    favorites: favorites.includes(image)
      ? favorites.filter((favorite) => favorite !== image)
      : [...favorites, image],
  }));
}

export function removeProductFromCart(image: string) {
  updateSelection(({ cart, favorites }) => {
    delete cart[image];
    return { cart, favorites };
  });
}

export function useProductSelection() {
  return readSelection(useSyncExternalStore(subscribe, snapshot, () => empty));
}

export function useCatalogCart() {
  const { cart } = useProductSelection();
  const items = catalogProducts
    .map((product) => ({ ...product, quantity: cart[product.image] ?? 0 }))
    .filter(({ quantity }) => quantity > 0);
  return { items, count: items.reduce((sum, { quantity }) => sum + quantity, 0) };
}
