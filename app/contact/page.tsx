export default function ContactPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1>Contact PetHaven</h1>
        <p>Kami siap membantu menjawab pertanyaan seputar kebutuhan hewanmu.</p>
      </section>

      <section className="contact-cards">
        <div className="contact-card">
          <span>✉️</span>
          <h2>Email</h2>
          <p>Hubungi kami melalui email.</p>
          <a href="mailto:hello@pethaven.com">hello@pethaven.com</a>
        </div>

        <div className="contact-card">
          <span>💬</span>
          <h2>WhatsApp</h2>
          <p>Diskusikan kebutuhan hewan kesayanganmu.</p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
          >
            Chat via WhatsApp
          </a>
        </div>

        <div className="contact-card">
          <span>🐾</span>
          <h2>PetHaven</h2>
          <p>Terima kasih telah menjadi bagian dari PetHaven.</p>
          <a href="/">Kembali ke Home</a>
        </div>
      </section>
    </main>
  );
}