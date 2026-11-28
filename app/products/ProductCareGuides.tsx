import Image from "next/image";
import { petCategories } from "../pet-categories";
import { petSlug } from "../categories/pet-links";

const featuredPets = [
  ["kucing-persia", "Merawat Kucing Berbulu Panjang"],
  ["anjing", "Perawatan Harian Anjing"],
  ["burung-lovebird", "Merawat Burung Lovebird"],
  ["kura-kura-telinga-merah", "Merawat Kura-kura Air"],
  ["hamster", "Menyiapkan Rumah Hamster"],
  ["kelinci", "Merawat Kelinci di Rumah"],
  ["ikan-neon-tetra", "Merawat Ikan Hias Air Tawar"],
] as const;

const guides = [
  ...featuredPets.flatMap(([slug, title]) => {
    const pet = petCategories.find(({ name }) => petSlug(name) === slug);
    if (!pet) return [];

    return [{
      title,
      image: pet.image,
      tips: [
        { label: "Pakan dan Minum", text: pet.care.food },
        { label: "Tempat Tinggal", text: pet.care.habitat },
        { label: "Perawatan Rutin", text: pet.care.routine },
      ],
      source: { href: `/categories/${slug}`, label: `Profil ${pet.name}` },
    }];
  }),
  {
    title: "Membersihkan Perlengkapan Hewan",
    image: "/images/products/pet-care-shampoo.webp",
    tips: [
      { label: "Wadah makan", text: "Cuci wadah setelah setiap pemberian pakan basah, dan cuci wadah pakan kering serta air minum setiap hari." },
      { label: "Alas tidur dan mainan", text: "Cuci alas dan selimut secara berkala. Ikuti petunjuk pencucian untuk masing-masing mainan." },
      { label: "Bilas dan keringkan", text: "Setelah mencuci dengan sabun dan air, bilas hingga bersih dan keringkan sebelum digunakan kembali." },
    ],
    source: { href: "https://www.cdc.gov/healthy-pets/about/cleaning-and-disinfecting-pet-supplies.html", label: "Panduan CDC" },
  },
  {
    title: "Mendampingi Kucing Senior",
    image: "/images/categories/Kucing Persia.jpg",
    tips: [
      { label: "Akses mudah", text: "Letakkan air minum, makanan, dan kotak pasir di tempat yang bisa dijangkau tanpa naik tangga atau melompat." },
      { label: "Tempat istirahat", text: "Sediakan alas tidur lembut dan kotak pasir bertepi rendah agar mudah dimasuki." },
      { label: "Pantau perubahan", text: "Perhatikan perubahan kebiasaan makan, minum, atau bergerak dan bicarakan dengan dokter hewan." },
    ],
    source: {
      href: "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/loving-care-older-cats",
      label: "Panduan Cornell Feline Health Center",
    },
  },
];

export default function ProductCareGuides() {
  return (
    <section className="products-care-guides" aria-labelledby="products-care-heading">
      <h2 id="products-care-heading">Panduan Perawatan Hewan</h2>
      <div className="products-care-grid">
        {guides.map(({ title, image, tips, source }) => (
          <article className="products-care-card" key={title}>
            <div className="products-care-photo">
              <Image src={image} alt="" fill sizes="(max-width: 560px) 92vw, (max-width: 980px) 46vw, 30vw" />
            </div>
            <div className="products-care-body">
              <h3>{title}</h3>
              <ul>
                {tips.map(({ label, text }) => (
                  <li key={label}>
                    <strong>{label}</strong>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
              <a href={source.href}>{source.label}</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
