"use client";

import Link from "next/link";
import ProductIcon from "./ProductIcon";
import { useCatalogCart } from "./product-selection";

export default function ProductsCart({ onNavigate }: { onNavigate: () => void }) {
  const { count } = useCatalogCart();

  return (
    <Link href="/products/cart" className="nav-search product-cart-trigger" onClick={onNavigate}>
      <ProductIcon name="cart" /> Cart <span aria-live="polite">({count})</span>
    </Link>
  );
}
