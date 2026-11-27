"use client";

import { usePetFavorites } from "./usePetFavorites";

export default function PetFavoriteButton({ name }: { name: string }) {
  const { favorites, toggleFavorite } = usePetFavorites();
  const saved = favorites.includes(name);

  return (
    <button className="pet-detail-favorite" type="button" aria-pressed={saved} onClick={() => toggleFavorite(name)}>
      <span aria-hidden="true">{saved ? "♥" : "♡"}</span> Favorit
    </button>
  );
}
