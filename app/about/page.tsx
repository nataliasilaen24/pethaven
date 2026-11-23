export default function AboutPage() {
  return (
    <main className="inner-page">
      <section className="page-hero">
        <span className="eyebrow">OUR STORY</span>
        <h1>About PetHaven</h1>
        <p>Tempat menemukan kebutuhan terbaik untuk sahabat berbulu.</p>
      </section>

      <section className="about-section inner-about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1000"
            alt="Dua anjing bermain bersama"
          />
        </div>

        <div className="about-content">
          <span className="eyebrow">MADE WITH LOVE</span>
          <h2>Every Pet Deserves the Best Care.</h2>
          <p>
            PetHaven hadir untuk membantu pemilik hewan menemukan
            makanan, mainan, dan perlengkapan perawatan dalam satu tempat.
            Kami percaya bahwa setiap hewan berhak mendapatkan perhatian,
            kenyamanan, dan kasih sayang.
          </p>
          <div className="about-points">
            <span>✓ Produk pilihan untuk hewan kesayangan</span>
            <span>✓ Mengutamakan kenyamanan dan kualitas</span>
            <span>✓ Peduli terhadap kebahagiaan hewan</span>
          </div>
        </div>
      </section>
    </main>
  );
}