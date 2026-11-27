import PetGallery from "./PetGallery";
import "./gallery.css";

export default function CategoriesPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="eyebrow">EXPLORE PET HAVEN</span>
        <h1>Shop by Category</h1>
        <p>Pilih kategori sesuai kebutuhan hewan kesayanganmu.</p>
      </section>

      <PetGallery />
    </main>
  );
}
