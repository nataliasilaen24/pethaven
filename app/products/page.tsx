"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Premium Cat Food",
    category: "Kucing",
    price: 85000,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=700",
  },
  {
    id: 2,
    name: "Dog Food Premium",
    category: "Anjing",
    price: 120000,
    image: "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?w=700",
  },
  {
    id: 3,
    name: "Pet Toy Collection",
    category: "Mainan",
    price: 45000,
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=700",
  },
  {
    id: 4,
    name: "Pet Care Shampoo",
    category: "Perawatan",
    price: 55000,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700",
  },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Semua";
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        category === "Semua" || product.category === category;
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="eyebrow">OUR COLLECTION</span>
        <h1>Products for Your Lovely Pets</h1>
        <p>Temukan produk pilihan untuk sahabat berbulu kesayanganmu.</p>
      </section>

      <section className="catalog-section">
        <div className="catalog-controls">
          <input
            className="search-input"
            placeholder="Cari nama produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Kucing">Kucing</option>
            <option value="Anjing">Anjing</option>
            <option value="Mainan">Mainan</option>
            <option value="Perawatan">Perawatan</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <div className="product-bottom">
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">Produk tidak ditemukan.</p>
        )}
      </section>
    </main>
  );
}