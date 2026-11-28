"use client";

import Link from "next/link";
import { useState } from "react";
import { catalogCategoryLabel, catalogProducts } from "../products/catalog";
import ProductGrid from "../products/ProductGrid";
import ProductIcon from "../products/ProductIcon";

const featured = catalogProducts
  .filter(({ badge }) => badge)
  .sort((a, b) => a.featuredOrder - b.featuredOrder);

export default function HomeProducts() {
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();
  const matches = query ? catalogProducts.filter(({ name, category }) =>
    `${name} ${category} ${catalogCategoryLabel(category)}`.toLowerCase().includes(query),
  ) : featured;

  return (
    <section className="home-wrap home-products" id="products" aria-labelledby="home-products-title">
      <div className="home-section-heading">
        <h2 id="home-products-title">Produk Pilihan</h2>
        <Link href="/products" className="home-action home-action-outline">Lihat Semua Produk</Link>
      </div>
      <label className="products-search home-products-search">
        <ProductIcon name="search" />
        <input type="search" aria-label="Cari produk" placeholder="Cari makanan, mainan, atau perlengkapan..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </label>
      {matches.length > 0 ? <ProductGrid items={matches} heading="h3" /> : <p className="products-empty" role="status">Produk tidak ditemukan.</p>}
    </section>
  );
}
