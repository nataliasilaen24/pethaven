"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ContactIcon from "../../contact/ContactIcon";
import { formatCatalogPrice } from "../catalog";
import ProductIcon from "../ProductIcon";
import { changeProductQuantity, removeProductFromCart, useCatalogCart } from "../product-selection";

export default function CartContents() {
  const { items, count } = useCatalogCart();
  const [unchecked, setUnchecked] = useState<Set<string>>(() => new Set());
  const selectedItems = items.filter(({ image }) => !unchecked.has(image));
  const selectedCount = selectedItems.reduce((sum, { quantity }) => sum + quantity, 0);
  const subtotal = selectedItems.reduce((sum, { price, quantity }) => sum + (price ?? 0) * quantity, 0);
  const pricedCount = selectedItems.reduce((sum, { price, quantity }) => sum + (price === undefined ? 0 : quantity), 0);
  const needsPrice = pricedCount < selectedCount;

  function setItemChecked(image: string, checked: boolean) {
    setUnchecked((current) => {
      const next = new Set(current);
      if (checked) next.delete(image);
      else next.add(image);
      return next;
    });
  }

  const message = [
    needsPrice ? "Halo PetHaven, saya ingin memesan dan konfirmasi harga produk berikut:" : "Halo PetHaven, saya ingin memesan:",
    ...selectedItems.map(({ name, price, quantity }) =>
      `- ${name} × ${quantity} — ${price === undefined ? "mohon info harga" : formatCatalogPrice(price * quantity)}`,
    ),
    needsPrice ? `Subtotal harga yang tersedia: ${formatCatalogPrice(subtotal)}` : `Total produk: ${formatCatalogPrice(subtotal)}`,
  ].join("\n");

  return (
    <div className="cart-layout cart-wrap">
      <section className="cart-items" aria-labelledby="cart-items-title">
        <h2 id="cart-items-title">Produk di Keranjang</h2>
        {count === 0 ? (
          <p className="cart-empty">Keranjangmu masih kosong.</p>
        ) : (
          <ul className="cart-list">
            {items.map(({ image, name, category, price, quantity }) => (
              <li key={image}>
                <div className="cart-item-photo">
                  <Image src={image} alt="" fill sizes="(max-width: 680px) 24vw, 220px" unoptimized />
                  <label className="cart-item-check">
                    <input type="checkbox" aria-label={`Pilih ${name} untuk dipesan`} checked={!unchecked.has(image)} onChange={(event) => setItemChecked(image, event.target.checked)} />
                    <span><ProductIcon name="check" /></span>
                  </label>
                </div>
                <div className="cart-item-details">
                  <h3>{name}</h3>
                  <p className="cart-category"><span aria-hidden="true">🐾</span> {category === "Pasir kucing yang bagus" ? "Pasir Kucing" : category}</p>
                  <p className="cart-item-price">{price === undefined ? "Tanyakan harga" : formatCatalogPrice(price)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-quantity" role="group" aria-label={`Jumlah ${name}`}>
                    <button type="button" disabled={quantity === 1} onClick={() => changeProductQuantity(image, -1)} aria-label={`Kurangi ${name}`}>−</button>
                    <span aria-live="polite">{quantity}</span>
                    <button type="button" onClick={() => changeProductQuantity(image, 1)} aria-label={`Tambah ${name}`}>+</button>
                  </div>
                  <button className="cart-remove" type="button" onClick={() => {
                    removeProductFromCart(image);
                    setItemChecked(image, true);
                  }} aria-label={`Hapus ${name}`}>
                    <ProductIcon name="trash" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <footer><Link href="/products#cari-produk" className="cart-continue">Lanjut Belanja</Link></footer>
      </section>

      <aside className="cart-summary" aria-labelledby="cart-summary-title">
        <h2 id="cart-summary-title">Ringkasan Pesanan</h2>
        <dl aria-live="polite">
          <div><dt>{needsPrice ? "Subtotal harga yang tersedia" : `Subtotal (${selectedCount} produk)`}</dt><dd>{needsPrice && pricedCount === 0 ? "Menunggu harga" : formatCatalogPrice(subtotal)}</dd></div>
          <div className="cart-total"><dt>Total</dt><dd>{needsPrice ? "Konfirmasi harga" : formatCatalogPrice(subtotal)}</dd></div>
        </dl>
        {needsPrice && <p className="cart-price-note">Harga {selectedCount - pricedCount} produk perlu dikonfirmasi.</p>}
        {count > 0 && selectedCount === 0 && <p className="cart-price-note">Centang produk yang ingin dipesan.</p>}
        {selectedCount > 0 ? (
          <a className="cart-order" href={`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">
            <ContactIcon name="whatsapp" /> Pesan via WhatsApp
          </a>
        ) : (
          <button className="cart-order" type="button" disabled><ContactIcon name="whatsapp" /> Pesan via WhatsApp</button>
        )}
        <p className="cart-order-note"><ProductIcon name="shield" /> Pesanan dikonfirmasi lewat WhatsApp</p>
      </aside>
    </div>
  );
}
