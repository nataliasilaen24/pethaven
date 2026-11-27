"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import { productGroups, products } from "./catalog";
import "./products.css";

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductCatalog />
    </Suspense>
  );
}

function ProductCatalog() {
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
        .includes(search.trim().toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [category, search]);

  return (
    <main className="inner-page products-page">
      <section className="page-hero">
        <span className="eyebrow">OUR COLLECTION</span>
        <h1>Products for Your Lovely Pets</h1>
        <p>Temukan produk pilihan untuk sahabat berbulu kesayanganmu.</p>
      </section>

      <section className="catalog-section">
        <div className="catalog-controls">
          <input
            id="cari-produk"
            type="search"
            aria-label="Cari nama produk"
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
            {productGroups.map(({ category }) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {productGroups.map((group) => {
          const groupProducts = filteredProducts.filter(
            (product) => product.category === group.category,
          );

          if (groupProducts.length === 0) return null;

          return (
            <section className="catalog-group" key={group.category}>
              <h2>{group.category}</h2>
              <div className="product-grid">
                {groupProducts.map((product) => (
                  <article className="product-card" key={product.image}>
                    <div className="product-image">
                      <Image src={product.image} alt="" width={400} height={205} unoptimized />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {filteredProducts.length === 0 && (
          <p className="empty-message">Produk tidak ditemukan.</p>
        )}
      </section>
    </main>
  );
}
