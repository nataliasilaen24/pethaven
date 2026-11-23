"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <header className="navbar">
      <Link
        href="/"
        className="logo"
        onClick={() => setMenuOpen(false)}
      >
        <span className="logo-icon">🐾</span>
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
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        <Link
          href="/products"
          className="nav-shop"
          onClick={() => setMenuOpen(false)}
        >
          Shop Now →
        </Link>
      </div>
    </header>
  );
}