"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandMark from "./components/BrandMark";
import HomeDiscovery from "./components/HomeDiscovery";
import { products } from "./products/catalog";
import "./categories/gallery.css";
import "./home.css";

const featuredFoodPrices = new Map([
  ["Me-O Dry Cat Food", 22000],
  ["Royal Canin Indoor Adult", 39000],
  ["Whiskas Dry Food", 24000],
  ["Pedigree", 25000],
  ["Purina Pro Plan", 35000],
  ["Royal Canin Puppy", 40000],
]);

const petFoods: {
  name: string;
  category: string;
  image: string;
  price: number;
  tag?: string;
  rating?: string;
}[] = [
  {
    name: "Premium Cat Food",
    category: "Kucing",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=700",
    tag: "Best Seller",
    rating: "4.9",
  },
  {
    name: "Dog Food Premium",
    category: "Anjing",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?w=700",
    tag: "Popular",
    rating: "4.8",
  },
  ...products.flatMap((product) => {
    const price = featuredFoodPrices.get(product.name);
    return price !== undefined && product.category.startsWith("Makanan ")
      ? [{ ...product, price }]
      : [];
  }),
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const cartDialog = useRef<HTMLDialogElement>(null);
  const cartItems = petFoods
    .map((product) => ({ ...product, quantity: quantities[product.image] ?? 0 }))
    .filter(({ quantity }) => quantity > 0);
  const cartCount = cartItems.reduce((sum, { quantity }) => sum + quantity, 0);
  const cartTotal = cartItems.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  function changeQuantity(image: string, amount: number) {
    setQuantities((current) => ({
      ...current,
      [image]: Math.max(0, (current[image] ?? 0) + amount),
    }));
  }

  const query = search.trim().toLowerCase();
  const filteredFoods = petFoods.filter(({ name, category }) =>
    `${name} ${category}`.toLowerCase().includes(query),
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  const orderMessage = [
    "Halo PetHaven, saya ingin memesan:",
    "",
    ...cartItems.map(({ name, price, quantity }) =>
      `• ${name} × ${quantity} — ${formatPrice(price * quantity)}`,
    ),
    "",
    `Total: ${formatPrice(cartTotal)}`,
  ].join("\n");

  return (
    <main className="home-page">
      <HomeDiscovery />

      {/* PRODUCTS */}
      <section className="section products-section" id="products">
        <div className="section-heading product-heading">
          <div>
            <h2>Makanan Hewan Pilihan</h2>

            <p>
              Pilihan makanan untuk kucing dan anjing kesayanganmu.
            </p>

            <button
              type="button"
              className="home-cart-trigger"
              aria-haspopup="dialog"
              onClick={() => cartDialog.current?.showModal()}
            >
              🛒 Keranjang <span aria-live="polite">({cartCount} produk)</span>
            </button>
          </div>

          <input
            type="search"
            placeholder="Cari makanan hewan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            aria-label="Cari makanan hewan"
          />
        </div>

        <div className="product-grid">
          {filteredFoods.map((product) => (
            <article className="product-card" key={product.image}>
              <div className="product-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={470}
                  unoptimized
                  style={product.image.startsWith("/") ? { objectFit: "contain" } : undefined}
                />
                {product.tag && <span className="product-tag">{product.tag}</span>}
              </div>

              <div className="product-info">
                <div className="product-meta">
                  <span className="product-category">
                    {product.category}
                  </span>

                  {product.rating && <span className="product-rating">★ {product.rating}</span>}
                </div>

                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>{formatPrice(product.price)}</strong>

                  <button
                    className="add-button"
                    aria-label={`Tambah ${product.name} ke keranjang`}
                    onClick={() => changeQuantity(product.image, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="empty-message">
            <span>🐾</span>
            <h3>Makanan tidak ditemukan</h3>
            <p>
              Coba cari dengan nama makanan atau jenis hewan.
            </p>

            <button
              className="secondary-button"
              onClick={() => setSearch("")}
            >
              Tampilkan Semua Makanan
            </button>
          </div>
        )}
        <dialog className="home-cart-dialog" ref={cartDialog} aria-labelledby="home-cart-title">
          <div className="home-cart-header">
            <div>
              <h2 id="home-cart-title">Keranjang Belanja</h2>
              <p>{cartCount} produk</p>
            </div>
            <form method="dialog">
              <button type="submit" aria-label="Tutup keranjang">×</button>
            </form>
          </div>
          {cartItems.length === 0 ? <p className="home-cart-empty">Keranjangmu masih kosong.</p> : (
            <ul className="home-cart-items">
              {cartItems.map(({ image, name, price, quantity }) => (
                <li key={image}>
                  <div className="home-cart-product">
                    <Image src={image} alt="" width={72} height={72} unoptimized />
                    <div><strong>{name}</strong><p>{formatPrice(price)} per produk</p></div>
                  </div>
                  <div className="home-cart-item-actions">
                    <strong>{formatPrice(price * quantity)}</strong>
                    <div className="home-cart-quantity">
                      <button type="button" aria-label={`Kurangi ${name}`} onClick={() => changeQuantity(image, -1)}>−</button>
                      <span>{quantity}</span>
                      <button type="button" aria-label={`Tambah ${name}`} onClick={() => changeQuantity(image, 1)}>+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="home-cart-footer">
            <p className="home-cart-total"><strong>Total belanja</strong><strong aria-live="polite">{formatPrice(cartTotal)}</strong></p>
            {cartCount > 0 ? (
              <a
                className="home-cart-continue"
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(orderMessage)}`}
                target="_blank"
                rel="noreferrer"
              >
                Lanjut ke WhatsApp
              </a>
            ) : (
              <button className="home-cart-continue" type="button" disabled>Lanjut ke WhatsApp</button>
            )}
          </div>
        </dialog>
      </section>

      {/* PROMO BANNER */}
      <section className="promo-section">
        <div>
          <span className="eyebrow">
            A LITTLE TREAT FOR YOUR PET
          </span>

          <h2>Happiness Starts with a Healthy Pet.</h2>

          <p>
            Berikan perhatian terbaik melalui produk yang tepat
            untuk sahabat kesayanganmu.
          </p>

          <a href="#products" className="promo-button">
            Shop Collection →
          </a>
        </div>

        <div className="promo-emoji">🐕 🐈</div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <div className="about-image">
          <Image
            src="/images/pethaven-about-friends.webp"
            alt="Anak anjing dan anak kucing berpelukan di bawah selimut krem"
            width={1000}
            height={588}
            unoptimized
          />
        </div>

        <div className="about-content">
          <span className="eyebrow">TENTANG PETHAVEN</span>

          <h2>Untuk sahabat kecil yang selalu menyambutmu pulang.</h2>

          <p>
            Ekor yang bergoyang saat kamu membuka pintu. Dengkur kecil
            di sampingmu setelah hari yang panjang. Momen sederhana itu
            yang membuat mereka jadi bagian dari keluarga. Di PetHaven,
            temukan kebutuhan sehari-hari untuk membalas kasih sayang
            mereka dengan caramu sendiri.
          </p>

          <div className="about-points">
            <span>✓ Makanan pilihan untuk setiap hari</span>
            <span>✓ Mainan untuk waktu seru bersama</span>
            <span>✓ Perlengkapan untuk merawat mereka di rumah</span>
          </div>

          <Link href="/about" className="primary-button">
            Kenali PetHaven →
          </Link>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <span className="eyebrow">
          LET&apos;S TALK ABOUT YOUR PET
        </span>

        <h2>We&apos;re Here for You and Your Pets.</h2>

        <p>
          Punya pertanyaan mengenai produk kami?
          Jangan ragu untuk menghubungi PetHaven.
        </p>

        <a href="mailto:hello@pethaven.com" className="primary-button">
          Contact Us →
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a href="#home" className="logo">
            <BrandMark />
            Pet<span>Haven</span>
          </a>

          <p>
            Making every pet&apos;s life happier, healthier, and full of love.
          </p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-bottom">
          <small>© 2026 PetHaven. All rights reserved.</small>
          <small>Made with 💚 for every lovely pet.</small>
        </div>
      </footer>
    </main>
  );
}
