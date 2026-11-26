import Image from "next/image";
import { petCategories } from "../pet-categories";

export default function CategoriesPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="eyebrow">EXPLORE PET HAVEN</span>
        <h1>Shop by Category</h1>
        <p>Pilih kategori sesuai kebutuhan hewan kesayanganmu.</p>
      </section>

      <section className="section categories-section" aria-label="Kategori hewan">
        <div className="pet-category-grid">
          {petCategories.map((pet) => (
            <article className="pet-category-card" key={pet.name}>
              <div className="pet-category-image">
                <Image src={pet.image} alt="" width={400} height={190} />
              </div>
              <div className="pet-category-info">
                <h3>{pet.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}