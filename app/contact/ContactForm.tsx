"use client";

import type { FormEvent } from "react";
import ContactIcon from "./ContactIcon";

export default function ContactForm() {
  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Pesan untuk PetHaven");
    const body = encodeURIComponent(
      `Nama: ${data.get("name")}\r\nEmail: ${data.get("email")}\r\n\r\n${data.get("message")}`,
    );
    window.location.href = `mailto:hello@pethaven.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={openEmail}>
      <div className="contact-form-fields">
        <label>
          Nama Lengkap <b aria-hidden="true">*</b>
          <input name="name" autoComplete="name" placeholder="Masukkan nama Anda" required />
        </label>
        <label>
          Email <b aria-hidden="true">*</b>
          <input name="email" type="email" autoComplete="email" placeholder="Masukkan email Anda" required />
        </label>
      </div>
      <label>
        Pesan <b aria-hidden="true">*</b>
        <textarea name="message" placeholder="Tulis pesan Anda di sini..." required />
      </label>
      <div className="contact-form-actions">
        <button type="submit"><ContactIcon name="send" /> Kirim Pesan</button>
        <p><ContactIcon name="mail" /> Pesan dibuka di aplikasi email Anda.</p>
      </div>
    </form>
  );
}
