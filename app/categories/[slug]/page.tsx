import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandMark from "../../components/BrandMark";
import { petCategories } from "../../pet-categories";
import { petContactUrl, petSlug } from "../pet-links";
import PetFavoriteButton from "../PetFavoriteButton";
import PetGallery from "../PetGallery";
import PetShareButton from "../PetShareButton";
import "../gallery.css";
import "./pet-detail.css";

export function generateStaticParams() {
  return petCategories.map(({ name }) => ({ slug: petSlug(name) }));
}

export default async function PetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pet = petCategories.find(({ name }) => petSlug(name) === slug);
  if (!pet) notFound();

  const others = petCategories.filter(({ name }) => name !== pet.name);
  const type = pet.name.split(" ")[0];
  const related = others.filter(({ name }) => name.includes(type));
  const suggestions = [...related, ...others.filter((other) => !related.includes(other))].slice(0, 4);

  return (
    <main className="pet-detail-page">
      <div className="pet-detail-container">
        <Link className="pet-detail-back" href="/categories">← Semua Hewan</Link>
        <section className="pet-detail-layout" aria-labelledby="pet-name">
          <div className="pet-detail-media">
            <div className="pet-detail-photo">
              <Image src={pet.image} alt={pet.name} fill sizes="(max-width: 720px) 92vw, (max-width: 1400px) 50vw, 660px" preload />
            </div>
            <a className="pet-detail-thumbnail" href={pet.image} target="_blank" rel="noreferrer" aria-label={`Buka foto asli ${pet.name}`}>
              <Image src={pet.image} alt="" width={92} height={72} />
            </a>
          </div>
          <div className="pet-detail-info">
            <h1 id="pet-name">{pet.name}</h1>
            <p className="pet-detail-price">Tanyakan harga</p>
            <p className="pet-detail-description">Hubungi PetHaven untuk menanyakan lokasi, usia, dan informasi perawatan {pet.name}.</p>
            <div className="pet-detail-actions">
              <a className="primary-button" href={petContactUrl(pet.name)} target="_blank" rel="noreferrer">Hubungi WhatsApp</a>
              <PetFavoriteButton name={pet.name} />
            </div>
            <dl className="pet-detail-facts">
              <div><dt>Ketersediaan</dt><dd>Konfirmasi via WhatsApp</dd></div>
              <div><dt>Lokasi</dt><dd>Belum dicantumkan</dd></div>
              <div><dt>Katalog</dt><dd><Link href="/categories">PetHaven</Link></dd></div>
              <div><dt>Bagikan</dt><dd><PetShareButton /></dd></div>
            </dl>
          </div>
        </section>
      </div>
      <section className="pet-detail-related" aria-labelledby="pet-related-title">
        <h2 id="pet-related-title">Pilihan Hewan Lainnya</h2>
        <PetGallery pets={suggestions} showFavorites={false} />
      </section>
      <footer className="pet-detail-footer">
        <div>
          <Link href="/" className="logo"><BrandMark />Pet<span>Haven</span></Link>
          <p>Jelajahi hewan peliharaan dan temukan perlengkapan untuk merawatnya.</p>
        </div>
        <nav aria-label="Jelajahi PetHaven">
          <h2>Jelajahi</h2>
          <Link href="/categories">Katalog Hewan</Link>
          <Link href="/products">Perlengkapan</Link>
          <Link href="/about">Tentang PetHaven</Link>
        </nav>
        <div>
          <h2>Hubungi Kami</h2>
          <Link href="/contact">Halaman Kontak</Link>
          <a href="mailto:hello@pethaven.com">hello@pethaven.com</a>
        </div>
      </footer>
    </main>
  );
}
