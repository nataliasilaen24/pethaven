"use client";

import { usePetFavorites } from "./usePetFavorites";
import ProductIcon from "../products/ProductIcon";

export default function PetFavoriteButton({ name, iconOnly = false }: { name: string; iconOnly?: boolean }) {
  const { favorites, toggleFavorite } = usePetFavorites();
  const saved = favorites.includes(name);

  return (
    <button className={iconOnly ? "pet-detail-favorite pet-detail-favorite-overlay" : "pet-detail-favorite"} type="button" aria-label={`Favoritkan ${name}`} aria-pressed={saved} onClick={() => toggleFavorite(name)}>
      <ProductIcon name="heart" filled={saved} />
      {!iconOnly && "Favorit"}
    </button>
  );
}
