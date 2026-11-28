import Image from "next/image";
import PetGallery from "./PetGallery";
import "./gallery.css";
import "./categories.css";

export default function CategoriesPage() {
  return (
    <main className="categories-page">
      <section className="categories-hero">
        <div className="categories-hero-art">
          <Image src="/images/pethaven-categories-hero.webp" alt="" fill sizes="100vw" preload />
        </div>
        <div className="categories-hero-copy">
          <span className="categories-tag">EXPLORE PET HAVEN</span>
          <h1>Shop by Category</h1>
          <p>Pilih kategori sesuai kebutuhan hewan kesayanganmu.</p>
        </div>
      </section>

      <div className="categories-gallery">
        <PetGallery categoryCards />
      </div>
    </main>
  );
}
