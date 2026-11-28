"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import PetGallery from "../categories/PetGallery";
import ContactIcon from "../contact/ContactIcon";
import { petCategories } from "../pet-categories";
import ProductIcon from "../products/ProductIcon";

const groups = [
  { label: "Kucing", match: /kucing/i, image: "Kucing Persia.jpg" },
  { label: "Anjing", match: /anjing/i, image: "Anjing.jpg" },
  { label: "Burung", match: /burung|love bird/i, image: "Burung Lovebird.webp" },
  { label: "Ikan", match: /ikan/i, image: "Ikan Cupang.webp" },
  { label: "Kura-kura", match: /kura-kura/i, image: "Kura Kura.jpg" },
  { label: "Kelinci", match: /kelinci/i, image: "Kelinci.jpg" },
  { label: "Hewan kecil", match: /hamster|gerbil|guinea|landak|marmut|sugar glider/i, image: "Hamster.webp" },
];

export default function HomeDiscovery() {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("Semua");
  const results = useRef<HTMLElement>(null);
  const group = groups.find(({ label }) => label === activeGroup);
  const pets = petCategories.filter(({ name }) =>
    (!group || group.match.test(name)) && name.toLowerCase().includes(query.toLowerCase()),
  );

  function showResults() {
    results.current?.focus({ preventScroll: true });
    results.current?.scrollIntoView({ block: "start" });
  }

  function chooseGroup(label: string) {
    setActiveGroup(label);
    setQuery("");
    setDraft("");
  }

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-photo">
          <Image src="/images/pethaven-home-hero.webp" alt="" fill sizes="(max-width: 700px) 100vw, 55vw" preload />
        </div>
        <div className="home-wrap home-hero-content">
          <span className="home-tag"><ContactIcon name="paw" /> SELAMAT DATANG DI PET HAVEN</span>
          <h1>Untuk hewan kesayanganmu.</h1>
          <p>Kenali berbagai jenis hewan dan temukan makanan, mainan, serta perlengkapan untuk merawatnya.</p>
          <div className="home-hero-actions">
            <Link href="/products" className="home-action">Belanja Produk</Link>
            <Link href="/categories" className="home-action home-action-outline">Jelajahi Hewan</Link>
          </div>
        </div>
      </section>

      <section className="home-wrap home-groups" aria-labelledby="home-groups-title">
        <div className="home-section-heading">
          <h2 id="home-groups-title">Jelajahi Kategori</h2>
          <form className="home-animal-search" role="search" aria-label="Cari hewan" onSubmit={(event) => {
            event.preventDefault();
            setActiveGroup("Semua");
            setQuery(draft.trim());
            showResults();
          }}>
            <ProductIcon name="search" />
            <input type="search" aria-label="Cari nama hewan" placeholder="Cari hewan..." value={draft} onChange={(event) => setDraft(event.target.value)} />
            <button className="home-action" type="submit">Cari</button>
          </form>
        </div>
        <div className="home-category-grid">
          {groups.map(({ label, image }) => (
            <button type="button" key={label} aria-pressed={!query && activeGroup === label} onClick={() => {
              chooseGroup(label);
              showResults();
            }}>
              <span className="home-category-photo"><Image src={`/images/categories/${image}`} alt="" fill sizes="(max-width: 700px) 30vw, 14vw" /></span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-wrap home-pet-results" aria-labelledby="home-pet-title" tabIndex={-1} ref={results} id="categories">
        <div className="home-section-heading">
          <h2 id="home-pet-title">{group ? `Jelajahi ${group.label}` : "Hewan Peliharaan Pilihan"}</h2>
          <Link href="/categories" className="home-action home-action-outline">Lihat Semua Hewan</Link>
        </div>
        {(query || group) && (
          <div className="home-results-filter">
            {query && <p role="status">Hasil pencarian untuk “{query}” ({pets.length})</p>}
            <button type="button" onClick={() => chooseGroup("Semua")}>Hapus Filter</button>
          </div>
        )}
        <div className="categories-gallery">
          <PetGallery pets={pets} limit={query || group ? undefined : 4} showFavorites={false} categoryCards />
        </div>
      </section>
    </>
  );
}
