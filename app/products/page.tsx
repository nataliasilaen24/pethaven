"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { catalogProducts, type CatalogProduct } from "./catalog";
import ProductIcon from "./ProductIcon";
import ProductGrid from "./ProductGrid";
import "./products.css";

const filters = [
  { category: "Semua", label: "Semua Produk", icon: "🐾" },
  { category: "Makanan Kucing", label: "Makanan Kucing", icon: "🐱" },
  { category: "Makanan Anjing", label: "Makanan Anjing", icon: "🐶" },
  { category: "Mainan Anjing", label: "Mainan", icon: "🎾" },
  { category: "Perawatan", label: "Perawatan", icon: "🧴" },
  { category: "Pasir kucing yang bagus", label: "Pasir Kucing", icon: "🧺" },
  { category: "Hewan Lainnya", label: "Hewan Lainnya", icon: "🐾" },
];

const categoryLabels = new Map(filters.map(({ category, label }) => [category, label]));
const byName = new Intl.Collator("id", { numeric: true });

const sortProducts: Record<string, (first: CatalogProduct, second: CatalogProduct) => number> = {
  featured: (first, second) => (first.featuredOrder - second.featuredOrder) || byName.compare(first.name, second.name),
  name: (first, second) => byName.compare(first.name, second.name),
  price: (first, second) => (first.price ?? Infinity) - (second.price ?? Infinity) || byName.compare(first.name, second.name),
};

export default function ProductsPage() {
  return (
    <main className="products-page">
      <section className="products-hero">
        <div className="products-hero-photo">
          <Image src="/images/pethaven-contact-hero.webp" alt="" fill sizes="(max-width: 680px) 100vw, 52vw" preload />
        </div>
        <div className="products-wrap products-hero-copy">
          <span className="products-eyebrow"><span aria-hidden="true">🐾</span> OUR PRODUCTS</span>
          <h1>Products for Happy Pets <span aria-hidden="true">♡</span></h1>
          <p>Produk pilihan untuk sahabat berbulu kesayanganmu.</p>
          <a className="products-shop" href="#cari-produk">Shop with Love</a>
        </div>
        <span className="products-paw products-paw-hero" aria-hidden="true">🐾</span>
      </section>
      <Suspense>
        <ProductCatalog />
      </Suspense>
    </main>
  );
}

function ProductCatalog() {
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category") ?? "Semua";
  return <CatalogControls key={requestedCategory} initialCategory={categoryLabels.has(requestedCategory) ? requestedCategory : "Semua"} />;
}

function CatalogControls({ initialCategory }: { initialCategory: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const query = search.trim().toLowerCase();
  const matches = catalogProducts.filter((product) =>
    (category === "Semua" || product.category === category) &&
    product.name.toLowerCase().includes(query),
  ).sort(sortProducts[sort]);

  return (
    <section className="products-wrap products-catalog" aria-label="Katalog produk">
      <div className="products-filters" aria-label="Kategori produk">
        {filters.map((filter) => (
          <button key={filter.category} type="button" aria-pressed={category === filter.category} onClick={() => setCategory(filter.category)}>
            <span aria-hidden="true">{filter.icon}</span> {filter.label}
          </button>
        ))}
      </div>

      <div className="products-controls">
        <label className="products-search">
          <ProductIcon name="search" />
          <input id="cari-produk" type="search" aria-label="Cari nama produk" placeholder="Cari produk..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <select aria-label="Urutkan produk" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Urutkan: Rekomendasi</option>
          <option value="name">Nama A–Z</option>
          <option value="price">Harga terendah</option>
        </select>
      </div>

      {matches.length === 0 ? (
        <p className="products-empty" role="status">{query ? "Produk tidak ditemukan." : "Belum ada produk dalam kategori ini."}</p>
      ) : (
        <ProductGrid items={matches} />
      )}
      <span className="products-paw products-paw-catalog" aria-hidden="true">🐾</span>
    </section>
  );
}
