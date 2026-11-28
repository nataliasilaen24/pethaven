import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BrandMark from "../../components/BrandMark";
import ContactIcon from "../../contact/ContactIcon";
import ProductIcon from "../../products/ProductIcon";
import { petCategories } from "../../pet-categories";
import { petContactUrl, petSlug } from "../pet-links";
import PetFavoriteButton from "../PetFavoriteButton";
import PetGallery from "../PetGallery";
import PetShareButton from "../PetShareButton";
import PetDetailSections from "./PetDetailSections";
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
        <nav className="pet-detail-breadcrumb" aria-label="Lokasi halaman">
          <Link className="pet-detail-back" href="/categories">← Semua Hewan</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{pet.name}</span>
        </nav>
        <section className="pet-detail-layout" aria-labelledby="pet-name">
          <div className="pet-detail-media">
            <div className="pet-detail-photo">
              <Image src={pet.image} alt={pet.name} fill sizes="(max-width: 820px) 92vw, (max-width: 1540px) 43vw, 665px" preload />
              <PetFavoriteButton name={pet.name} iconOnly />
              <a className="pet-detail-photo-link" href={pet.image} target="_blank" rel="noreferrer" aria-label={`Buka foto asli ${pet.name} di tab baru`}>
                Lihat foto asli <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="pet-detail-info">
            <div className="pet-detail-brand"><ContactIcon name="paw" /> PetHaven</div>
            <h1 id="pet-name">{pet.name} <ContactIcon name="paw" /></h1>
            <p className="pet-detail-price">Tanyakan harga</p>
            <p className="pet-detail-description">Hubungi PetHaven untuk menanyakan lokasi, usia, dan informasi perawatan {pet.name}.</p>
            <div className="pet-detail-actions">
              <a className="primary-button" href={petContactUrl(pet.name)} target="_blank" rel="noreferrer"><ContactIcon name="whatsapp" /> Hubungi WhatsApp</a>
              <PetFavoriteButton name={pet.name} />
            </div>
            <dl className="pet-detail-facts">
              <div><dt><ProductIcon name="check" /> Ketersediaan</dt><dd>Konfirmasi via WhatsApp</dd></div>
              <div><dt><ContactIcon name="pin" /> Lokasi</dt><dd>Belum dicantumkan</dd></div>
              <div><dt><ContactIcon name="paw" /> Katalog</dt><dd><Link href="/categories">PetHaven</Link></dd></div>
            </dl>
            <div className="pet-detail-sharing"><strong>Bagikan</strong><PetShareButton /></div>
            <div className="pet-detail-support">
              <Link href="/about"><ProductIcon name="shield" /> Tentang PetHaven</Link>
              <a href={petContactUrl(pet.name)} target="_blank" rel="noreferrer"><ContactIcon name="paw" /> Konsultasi Perawatan</a>
              <Link href="/contact"><ProductIcon name="headset" /> Hubungi Kami</Link>
            </div>
          </div>
        </section>
        <PetDetailSections key={pet.name} pet={pet} />
      </div>
      <section className="pet-detail-related" aria-labelledby="pet-related-title">
        <h2 id="pet-related-title">Pilihan Hewan Lainnya</h2>
        <PetGallery pets={suggestions} showFavorites={false} categoryCards />
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
