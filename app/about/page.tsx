import Image from "next/image";
import Link from "next/link";
import "./about.css";

const benefits = [
  { title: "Belanja Praktis", detail: "Jelajahi katalog dari rumah", icon: "M3 4h2l2 11h11l3-8H6m3 13h.01m8 0h.01" },
  { title: "Pilihan Beragam", detail: "Untuk kucing dan anjing", icon: "m12 22 7-4V6l-7-4-7 4v12l7 4Zm0 0V10m-7-4 7 4 7-4" },
  { title: "Peduli Hewan", detail: "Untuk momen sehari-hari", icon: "M12 21 3.6 13a5.1 5.1 0 0 1 7.2-7.2L12 7l1.2-1.2a5.1 5.1 0 0 1 7.2 7.2Z" },
  { title: "Bantuan Pelanggan", detail: "Hubungi kami via WhatsApp", icon: "M4 13v-2a8 8 0 0 1 16 0v5a4 4 0 0 1-4 4h-4M4 13h3v5H5a1 1 0 0 1-1-1Zm16 0h-3v5h2a1 1 0 0 0 1-1Z" },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="about-page-intro">
        <span>Tentang PetHaven</span>
        <h1>Who We Are</h1>
        <p>PetHaven adalah toko online untuk kebutuhan sehari-hari hewan kesayanganmu.</p>
      </header>

      <section className="about-page-story" aria-labelledby="about-story-title">
        <div className="about-page-photo">
          <Image
            src="/images/pethaven-about-friends.webp"
            alt="Anak anjing dan anak kucing berpelukan di bawah selimut krem"
            width={1000}
            height={588}
            sizes="(max-width: 720px) 92vw, 46vw"
          />
        </div>

        <div className="about-page-copy">
          <h2 id="about-story-title">Kasih sayang tumbuh dari hal-hal kecil.</h2>
          <p>
            Semangkuk makanan yang mereka tunggu, mainan yang selalu
            mereka bawa, atau selimut hangat saat mereka tertidur.
            Di PetHaven, kami membantu kamu menemukan kebutuhan
            sehari-hari untuk merawat mereka, supaya ada lebih banyak
            waktu untuk menikmati momen bersama.
          </p>
          <ul>
            <li>Makanan pilihan untuk setiap hari</li>
            <li>Mainan untuk waktu seru bersama</li>
            <li>Perlengkapan untuk merawat mereka di rumah</li>
          </ul>
        </div>
      </section>

      <ul className="about-page-benefits" aria-label="Layanan PetHaven">
        {benefits.map(({ title, detail, icon }) => (
          <li key={title}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={icon} />
            </svg>
            <div><strong>{title}</strong><p>{detail}</p></div>
          </li>
        ))}
      </ul>

      <section className="about-page-cta" aria-labelledby="about-cta-title">
        <h2 id="about-cta-title">Temukan yang mereka butuhkan, untuk lebih banyak waktu bersama.</h2>
        <Link href="/products" className="primary-button">Jelajahi Produk <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
