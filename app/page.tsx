import Image from "next/image";
import Link from "next/link";
import BrandMark from "./components/BrandMark";
import HomeDiscovery from "./components/HomeDiscovery";
import HomeProducts from "./components/HomeProducts";
import ContactIcon from "./contact/ContactIcon";
import "./categories/gallery.css";
import "./categories/categories.css";
import "./products/products.css";
import "./home.css";

export default function Home() {
  return (
    <main className="home-page" id="home">
      <HomeDiscovery />
      <HomeProducts />

      <section className="home-wrap home-about" id="about" aria-labelledby="home-about-title">
        <div className="home-about-photo">
          <Image src="/images/pethaven-about-friends.webp" alt="Anak anjing dan anak kucing berpelukan di bawah selimut krem" fill sizes="(max-width: 700px) 92vw, 44vw" />
        </div>
        <div className="home-about-copy">
          <span className="home-tag"><ContactIcon name="paw" /> TENTANG PET HAVEN</span>
          <h2 id="home-about-title">Untuk sahabat yang selalu menyambutmu pulang.</h2>
          <p>Dari makanan sehari-hari hingga mainan dan perlengkapan perawatan, PetHaven membantu kamu menemukan kebutuhan hewan kesayangan di satu tempat.</p>
          <Link href="/about" className="home-action">Kenali PetHaven</Link>
        </div>
      </section>

      <section className="home-wrap home-contact" id="contact" aria-labelledby="home-contact-title">
        <span className="home-contact-icon"><ContactIcon name="mail" /></span>
        <div>
          <h2 id="home-contact-title">Ada pertanyaan?</h2>
          <p>Kami siap membantu seputar produk dan kebutuhan hewanmu.</p>
        </div>
        <Link href="/contact" className="home-action">Hubungi Kami</Link>
      </section>

      <footer className="home-footer">
        <div className="home-wrap home-footer-main">
          <Link href="/" className="logo"><BrandMark /> Pet<span>Haven</span></Link>
          <nav aria-label="Navigasi bagian bawah">
            <Link href="/categories">Categories</Link>
            <Link href="/products">Products</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="home-wrap home-footer-bottom"><small>© 2026 PetHaven. All rights reserved.</small></div>
      </footer>
    </main>
  );
}
