import Link from "next/link";

const categories = [
  { name: "Kucing", icon: "🐱", description: "Makanan dan kebutuhan kucing." },
  { name: "Anjing", icon: "🐶", description: "Berbagai kebutuhan anjing." },
  { name: "Mainan", icon: "🎾", description: "Mainan agar hewan lebih aktif." },
  { name: "Perawatan", icon: "🧴", description: "Produk untuk menjaga kebersihan." },
];

export default function CategoriesPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="eyebrow">EXPLORE PET HAVEN</span>
        <h1>Shop by Category</h1>
        <p>Pilih kategori sesuai kebutuhan hewan kesayanganmu.</p>
      </section>

      <section className="inner-grid">
        {categories.map((item) => (
          <Link
            href={`/products?category=${encodeURIComponent(item.name)}`}
            className="inner-card"
            key={item.name}
          >
            <span>{item.icon}</span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <strong>Explore Products →</strong>
          </Link>
        ))}
      </section>
    </main>
  );
}