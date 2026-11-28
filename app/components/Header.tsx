"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandMark from "./BrandMark";
import ProductsCart from "../products/ProductsCart";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const showCart = pathname === "/products" || pathname === "/products/cart";
  const isHome = pathname === "/";
  const headerStyle = isHome ? " home-navbar" : showCart ? " products-navbar" : pathname === "/categories" ? " categories-navbar" : "";

  return (
    <header className={`navbar${headerStyle}`}>
      <Link
        href="/"
        className="logo"
        onClick={() => setMenuOpen(false)}
      >
        <BrandMark />
        Pet<span>Haven</span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Buka atau tutup menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {navItems.map((item) => {
          const isCurrentPage = pathname === item.href;
          const isCurrentSection = item.href !== "/" && pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentPage ? "page" : isCurrentSection ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="nav-actions">
        {showCart || isHome ? <ProductsCart onNavigate={() => setMenuOpen(false)} /> : <Link
          href="/products#cari-produk"
          className="nav-search"
          onClick={() => setMenuOpen(false)}
        >
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="4.75" />
            <path d="m12 12 4 4" />
          </svg>
          Cari Produk
        </Link>}
      </div>
    </header>
  );
}
