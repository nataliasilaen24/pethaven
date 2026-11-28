import Image from "next/image";
import ProductIcon from "../ProductIcon";
import CartContents from "./CartContents";
import "../products.css";
import "./cart.css";

export default function CartPage() {
  return (
    <main className="products-page cart-page">
      <section className="products-hero cart-hero">
        <div className="products-hero-photo">
          <Image src="/images/pethaven-contact-hero.webp" alt="" fill sizes="(max-width: 680px) 100vw, 53vw" preload />
        </div>
        <div className="products-wrap products-hero-copy">
          <span className="products-eyebrow"><ProductIcon name="cart" /> YOUR CART</span>
          <h1>Keranjang Belanja <span aria-hidden="true">♡</span></h1>
          <p>Produk pilihan untuk hewan kesayanganmu.</p>
        </div>
        <span className="products-paw products-paw-hero" aria-hidden="true">🐾</span>
      </section>
      <CartContents />
      <ul className="cart-benefits cart-wrap" aria-label="Layanan PetHaven">
        <li><ProductIcon name="truck" /><span>Pengiriman Produk<small>Tanyakan opsi pengiriman</small></span></li>
        <li><ProductIcon name="shield" /><span>Produk Pilihan<small>Untuk kebutuhan hewanmu</small></span></li>
        <li><ProductIcon name="heart" filled /><span>Peduli Hewan<small>Kesayangan</small></span></li>
        <li><ProductIcon name="headset" /><span>Layanan Pelanggan<small>Siap membantu</small></span></li>
      </ul>
    </main>
  );
}
