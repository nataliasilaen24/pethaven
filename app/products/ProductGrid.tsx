"use client";

import Image from "next/image";
import { useState } from "react";
import { catalogCategoryLabel, formatCatalogPrice, type CatalogProduct } from "./catalog";
import ProductIcon from "./ProductIcon";
import { changeProductQuantity, toggleProductFavorite, useProductSelection } from "./product-selection";

export default function ProductGrid({ items, heading: Heading = "h2" }: { items: CatalogProduct[]; heading?: "h2" | "h3" }) {
  const [cartUpdate, setCartUpdate] = useState("");
  const { favorites, cart } = useProductSelection();

  return (
    <>
      <p className="sr-only" role="status">{cartUpdate}</p>
      <div className="products-grid">
        {items.map((product) => {
          const favorite = favorites.includes(product.image);
          return (
            <article className="products-card" key={product.image}>
              <div className="products-card-photo">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 680px) 50vw, (max-width: 980px) 33vw, 24vw" unoptimized />
                {product.badge && <span className={`products-badge products-badge-${product.featuredOrder}`}>{product.badge}</span>}
                <button className="products-favorite" type="button" aria-pressed={favorite} aria-label={`Favorit ${product.name}`} onClick={() => toggleProductFavorite(product.image)}>
                  <ProductIcon name="heart" filled={favorite} />
                </button>
              </div>
              <div className="products-card-info">
                <p className="products-category"><span aria-hidden="true">🐾</span> {catalogCategoryLabel(product.category)}</p>
                <Heading>{product.name}</Heading>
                <div className="products-card-footer">
                  <p className="products-price">{product.price === undefined ? "Tanyakan harga" : formatCatalogPrice(product.price)}</p>
                  <button type="button" className="products-add" aria-label={`Tambah ${product.name} ke keranjang`} onClick={() => {
                    changeProductQuantity(product.image, 1);
                    setCartUpdate(`${product.name} ditambahkan. Jumlah di keranjang: ${(cart[product.image] ?? 0) + 1}.`);
                  }}>
                    <ProductIcon name="cart" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
