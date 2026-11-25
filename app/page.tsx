"use client";

import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Premium Cat Food",
    category: "Kucing",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=700",
    tag: "Best Seller",
    rating: "4.9",
  },
  {
    id: 2,
    name: "Dog Food Premium",
    category: "Anjing",
    price: 120000,
    image:
      "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?w=700",
    tag: "Popular",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Pet Toy Collection",
    category: "Mainan",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=700",
    tag: "New Arrival",
    rating: "4.9",
  },
  {
    id: 4,
    name: "Pet Care Shampoo",
    category: "Perawatan",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700",
    tag: "Recommended",
    rating: "4.7",
  },
];

// DATA 22 KATEGORI HEWAN
const categories = [
  { name: "Kucing Anggora Persia", image: "/images/categories/kucing-anggora.jpg" },
  { name: "Anjing", image: "/images/categories/anjing.jpg" },
  { name: "Burung Kakak Tua", image: "/images/categories/burung-kakatua.jpg" },
  { name: "Burung Lovebird", image: "/images/categories/burung-lovebird.jpg" },
  { name: "Gerbil", image: "/images/categories/gerbil.jpg" },
  { name: "Guinea Pig atau Tikus Belanda", image: "/images/categories/guinea-pig.jpg" },
  { name: "Hamster Dwarf", image: "/images/categories/hamster-dwarf.jpg" },
  { name: "Hamster", image: "/images/categories/hamster.jpg" },
  { name: "Ikan Cupang", image: "/images/categories/ikan-cupang.jpg" },
  { name: "Ikan Mas", image: "/images/categories/ikan-mas.jpg" },
  { name: "Ikan Neon Tetra", image: "/images/categories/ikan-neon-tetra.jpg" },
  { name: "Kelinci New Zealand", image: "/images/categories/kelinci-new-zealand.jpg" },
  { name: "Kelinci", image: "/images/categories/kelinci.jpg" },
  { name: "Kitten Kucing Persia", image: "/images/categories/kitten-persia.jpg" },
  { name: "Kucing Kampung", image: "/images/categories/kucing-kampung.jpg" },
  { name: "Kucing Persia", image: "/images/categories/kucing-persia.jpg" },
  { name: "Kura-kura Telinga Merah", image: "/images/categories/kura-telinga-merah.jpg" },
  { name: "Kura-kura", image: "/images/categories/kura-kura.jpg" },
  { name: "Landak Mini", image: "/images/categories/landak-mini.jpg" },
  { name: "Love Bird", image: "/images/categories/lovebird.jpg" },
  { name: "Marmut", image: "/images/categories/marmut.jpg" },
  { name: "Sugar Glider", image: "/images/categories/sugar-glider.jpg" },
];

export default function Home() {
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(0);

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
    <main>
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="eyebrow">
            <span>🐾</span> WELCOME TO PET HAVEN
          </span>

          <h1>
            Give Your Pets
            <span> The Love They Deserve.</span>
          </h1>

          <p>
            Temukan makanan, mainan, dan perlengkapan pilihan
            untuk menjaga sahabat berbulu tetap sehat, aktif,
            dan bahagia setiap hari.
          </p>

          <div className="hero-buttons">
            <a href="#products" className="primary-button">
              Explore Products <span>→</span>
            </a>

            <a href="#about" className="secondary-button">
              Discover More
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>100+</strong>
              <span>Pet Products</span>
            </div>

            <div>
              <strong>Happy Pets</strong>
              <span>Our Main Priority</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Love & Care</span>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1100"
            alt="Anjing dan hewan peliharaan"
          />

          <div className="floating-card">
            <span className="floating-icon">💚</span>
            <div>
              <strong>Made with Love</strong>
              <small>For your lovely pets</small>
            </div>
          </div>

          <div className="hero-decoration">✦</div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="benefits">
        <div className="benefit-item">
          <span className="benefit-icon">🚚</span>
          <div>
            <strong>Fast Delivery</strong>
            <small>Pengiriman cepat</small>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">⭐</span>
          <div>
            <strong>Quality Products</strong>
            <small>Produk berkualitas</small>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">💚</span>
          <div>
            <strong>Pet Friendly</strong>
            <small>Peduli hewan kesayangan</small>
          </div>
        </div>

        <div className="benefit-item">
          <span className="benefit-icon">🔒</span>
          <div>
            <strong>Safe Shopping</strong>
            <small>Belanja lebih nyaman</small>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section categories-section" id="categories">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              DISCOVER YOUR LOVELY PETS
            </span>

            <h2>Explore Our Categories</h2>

            <p>
              Temukan berbagai jenis hewan peliharaan
              yang bisa menjadi sahabat terbaikmu.
            </p>
          </div>
        </div>

        <div className="pet-category-grid">
          {categories.map((item) => (
            <article
              className="pet-category-card"
              key={item.name}
            >
              <div className="pet-category-image">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
              </div>

              <div className="pet-category-info">
                <h3>{item.name}</h3>
                <span>Explore Pet →</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section products-section" id="products">
        <div className="section-heading product-heading">
          <div>
            <span className="eyebrow">
              OUR FAVORITE COLLECTION
            </span>

            <h2>Products for Happy Pets</h2>

            <p>
              Produk pilihan untuk sahabat berbulu kesayanganmu.
            </p>

            <p className="cart-summary">
              🛒 Keranjang: {cart} produk
            </p>
          </div>

          <input
            type="search"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            aria-label="Cari produk"
          />
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="product-tag">
                  {product.tag}
                </span>
              </div>

              <div className="product-info">
                <div className="product-meta">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <span className="product-rating">
                    ★ {product.rating}
                  </span>
                </div>

                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>{formatPrice(product.price)}</strong>

                  <button
                    className="add-button"
                    aria-label={`Tambah ${product.name} ke keranjang`}
                    onClick={() =>
                      setCart((current) => current + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-message">
            <span>🐾</span>
            <h3>Produk tidak ditemukan</h3>
            <p>
              Coba gunakan kata kunci atau kategori lainnya.
            </p>

            <button
              className="secondary-button"
              onClick={() => {
                setSearch("");
                setCategory("Semua");
              }}
            >
              Tampilkan Semua Produk
            </button>
          </div>
        )}
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
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1000"
            alt="Anjing bermain bersama"
          />
        </div>

        <div className="about-content">
          <span className="eyebrow">A LITTLE ABOUT US</span>

          <h2>More Than Products, It's About Love.</h2>

          <p>
            PetHaven hadir sebagai tempat untuk menemukan
            berbagai kebutuhan hewan peliharaan. Kami percaya
            setiap hewan berhak mendapatkan perawatan,
            perhatian, dan kasih sayang terbaik.
          </p>

          <div className="about-points">
            <span>✓ Produk pilihan untuk hewan kesayangan</span>
            <span>✓ Mengutamakan kenyamanan dan kualitas</span>
            <span>✓ Dibuat dengan kepedulian terhadap hewan</span>
          </div>

          <a href="#contact" className="primary-button">
            Get to Know Us →
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <span className="eyebrow">
          LET'S TALK ABOUT YOUR PET
        </span>

        <h2>We're Here for You and Your Pets.</h2>

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
            <span className="logo-icon">🐾</span>
            Pet<span>Haven</span>
          </a>

          <p>
            Making every pet's life happier, healthier, and full of love.
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