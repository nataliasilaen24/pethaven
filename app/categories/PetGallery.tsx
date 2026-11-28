"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { petCategories } from "../pet-categories";
import { petContactUrl, petSlug } from "./pet-links";
import { usePetFavorites } from "./usePetFavorites";

const icons = {
  heart: "M12 21 3.6 13.1a5.3 5.3 0 0 1 7.5-7.5l.9.9.9-.9a5.3 5.3 0 0 1 7.5 7.5Z",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Zm13 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z",
  chat: "M20 11.5a8 8 0 0 1-12 7L4 20l1.3-4A8 8 0 1 1 20 11.5ZM9 9h6m-6 4h4",
};

function Icon({ name, filled = name === "heart" }: { name: keyof typeof icons; filled?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d={icons[name]} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default function PetGallery({
  pets = petCategories,
  limit,
  showFavorites = true,
  categoryCards = false,
}: {
  pets?: typeof petCategories;
  limit?: number;
  showFavorites?: boolean;
  categoryCards?: boolean;
}) {
  const { favorites, toggleFavorite } = usePetFavorites();
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const visiblePets = favoritesOnly
    ? pets.filter(({ name }) => favorites.includes(name))
    : pets.slice(0, limit);

  return (
    <section className="pet-gallery" aria-label="Galeri hewan">
      {showFavorites && <div className="pet-gallery-toolbar">
        <button type="button" aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly(!favoritesOnly)}>
          <Icon name="heart" filled={!categoryCards || favoritesOnly} /> Favorit ({favorites.length})
        </button>
      </div>}
      <div className="pet-gallery-grid">
        {visiblePets.map((pet) => {
          const detailUrl = `/categories/${petSlug(pet.name)}`;
          const favorite = favorites.includes(pet.name);
          const actions = (
            <div className="pet-gallery-actions">
              <button type="button" aria-label={`Favoritkan ${pet.name}`} aria-pressed={favorite} onClick={() => toggleFavorite(pet.name)}>
                <Icon name="heart" filled={!categoryCards || favorite} />
              </button>
              <Link href={detailUrl} aria-label={`Lihat detail ${pet.name}`}>
                <Icon name="eye" />
              </Link>
              <a href={petContactUrl(pet.name)} target="_blank" rel="noreferrer" aria-label={`Tanya tentang ${pet.name} lewat WhatsApp`}>
                <Icon name="chat" />
              </a>
            </div>
          );
          return (
            <article className="pet-gallery-card" key={pet.name}>
              <div className="pet-gallery-photo">
                <Image src={pet.image} alt={pet.name} fill sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw" />
                {!categoryCards && actions}
              </div>
              {categoryCards ? (
                <div className="category-card-caption">
                  <h2><Link href={detailUrl}>{pet.name}</Link></h2>
                  {actions}
                </div>
              ) : (
                <h2><Link href={detailUrl}>{pet.name}</Link></h2>
              )}
            </article>
          );
        })}
      </div>
      {visiblePets.length === 0 && (
        <p className="empty-message">{favoritesOnly ? "Belum ada hewan favorit." : "Hewan tidak ditemukan."}</p>
      )}
    </section>
  );
}
