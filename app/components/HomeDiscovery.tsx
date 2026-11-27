"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PetGallery from "../categories/PetGallery";
import { petCategories } from "../pet-categories";

const groups = [
  { label: "Anjing", match: /anjing/i, image: "Anjing.jpg" },
  { label: "Kucing", match: /kucing/i, image: "Kucing Persia.jpg" },
  { label: "Burung", match: /burung|love bird/i, image: "Burung Lovebird.webp" },
  { label: "Ikan", match: /ikan/i, image: "Ikan Cupang.webp" },
  { label: "Kura-kura", match: /kura-kura/i, image: "Kura Kura.jpg" },
  { label: "Kelinci", match: /kelinci/i, image: "Kelinci.jpg" },
  { label: "Hewan kecil", match: /hamster|gerbil|guinea|landak|marmut|sugar glider/i, image: "Hamster.webp" },
];

const features = [
  { icon: "🐾", title: "Beragam jenis hewan", text: "Jelajahi kucing, anjing, burung, ikan, kelinci, dan lainnya." },
  { icon: "♥", title: "Simpan favorit", text: "Tandai hewan yang menarik perhatianmu untuk dilihat lagi nanti." },
  { icon: "▤", title: "Katalog perlengkapan", text: "Cari makanan, mainan, dan perlengkapan untuk hewan kesayangan." },
  { icon: "✉", title: "Tanya PetHaven", text: "Hubungi kami kalau ada pertanyaan tentang hewan atau produk." },
];

function scrollCategoryTrack(row: HTMLDivElement, direction: -1 | 1, behavior: ScrollBehavior) {
  const firstCard = row.children[0];
  const secondCard = row.children[1];
  if (!(firstCard instanceof HTMLElement) || !(secondCard instanceof HTMLElement)) return;

  const end = row.scrollWidth - row.clientWidth;
  const position = row.scrollLeft;
  const step = secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left;
  if (end <= 1) return;

  if (direction === 1 && position >= end - 2) {
    row.scrollTo({ left: 0, behavior });
  } else if (direction === -1 && position <= 2) {
    row.scrollTo({ left: end, behavior });
  } else {
    row.scrollTo({ left: Math.max(0, Math.min(end, position + direction * step)), behavior });
  }
}

export default function HomeDiscovery() {
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("Semua");
  const track = useRef<HTMLDivElement>(null);
  const results = useRef<HTMLElement>(null);
  const group = groups.find(({ label }) => label === activeGroup);
  const pets = petCategories.filter(({ name }) =>
    (!group || group.match.test(name)) && name.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const row = track.current;
      if (!row || document.hidden || motion.matches) return;
      if (row.matches(":active") || row.querySelector(":focus-visible")) return;

      scrollCategoryTrack(row, 1, "smooth");
    }, 2500);

    return () => window.clearInterval(timer);
  }, []);

  function showResults() {
    results.current?.focus({ preventScroll: true });
    results.current?.scrollIntoView({ block: "start" });
  }

  function chooseGroup(label: string) {
    setActiveGroup(label);
    setQuery("");
    setDraft("");
  }

  function scrollCategories(direction: -1 | 1) {
    const row = track.current;
    if (!row) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollCategoryTrack(row, direction, reduceMotion ? "instant" : "smooth");
  }

  return (
    <div className="home-discovery" id="home">
      <div className="home-search-row">
        <form role="search" onSubmit={(event) => {
          event.preventDefault();
          setActiveGroup("Semua");
          setQuery(draft.trim());
          showResults();
        }}>
          <input type="search" aria-label="Cari hewan peliharaan" placeholder="Cari hewan, misalnya kucing Persia" value={draft} onChange={(event) => setDraft(event.target.value)} />
          <button className="home-action" type="submit">Cari</button>
        </form>
        <Link href="/contact" className="home-action home-action-accent">Hubungi PetHaven</Link>
      </div>

      <section className="home-banner">
        <div className="home-banner-content">
          <h1>Temukan sahabat baru<br />di PetHaven</h1>
          <p>Kenali berbagai jenis hewan peliharaan dan temukan perlengkapan untuk merawatnya.</p>
          <div className="home-banner-actions">
            <Link href="/categories" className="home-action home-action-accent">Lihat Katalog Hewan</Link>
            <Link href="/products" className="home-action home-action-outline">Lihat Perlengkapan</Link>
          </div>
        </div>
      </section>

      <section className="home-category-strip" aria-label="Kategori hewan">
        <button type="button" aria-label="Geser kategori ke kiri" onClick={() => scrollCategories(-1)}>‹</button>
        <div className="home-category-track" ref={track}>
          {groups.map(({ label, image }) => (
            <button type="button" key={label} className="home-category-tile" onClick={() => {
              chooseGroup(label);
              showResults();
            }}>
              <Image src={`/images/categories/${image}`} alt="" fill sizes="(max-width: 600px) 55vw, 260px" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button type="button" aria-label="Geser kategori ke kanan" onClick={() => scrollCategories(1)}>›</button>
      </section>

      <section className="home-features">
        <h2>Kenapa memilih PetHaven?</h2>
        <div className="home-feature-grid">
          {features.map(({ icon, title, text }) => (
            <article key={title}>
              <span aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-pet-results" aria-labelledby="home-pet-title" tabIndex={-1} ref={results} id="categories">
        <h2 id="home-pet-title">Hewan Peliharaan Pilihan</h2>
        <div className="home-pet-filters" aria-label="Filter jenis hewan">
          {["Semua", ...groups.map(({ label }) => label)].map((label) => (
            <button type="button" key={label} aria-pressed={!query && activeGroup === label} onClick={() => chooseGroup(label)}>{label}</button>
          ))}
        </div>
        {query && <p className="home-query" role="status">Hasil pencarian untuk “{query}” ({pets.length})</p>}
        <PetGallery pets={pets} limit={query || group ? undefined : 8} showFavorites={false} />
        <Link href="/categories" className="home-action">Lihat Semua Hewan</Link>
      </section>
    </div>
  );
}
