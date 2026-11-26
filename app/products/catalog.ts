export const productGroups = [
  {
    category: "Mainan Anjing",
    files: [
      "Bola Karet.jpg",
      "Boneka.jpg",
      "Bonelonov Mainan Anjing.jpg",
    ],
  },
  {
    category: "Makanan Anjing",
    files: [
      "Bolt Dog Dry Food.avif",
      "Canibite.avif",
      "Dog Choize.avif",
      "Happy Dog.avif",
      "Hill\u0027s Dog Food.webp",
      "Hill\u0027s Science Diet.avif",
      "Kitchen Flavor.avif",
      "Majes Dog Food.avif",
      "Nice Dog Food.webp",
      "Pedigree.avif",
      "Purina Pro Plan.avif",
      "Royal Canin Puppy.avif",
    ],
  },
  {
    category: "Makanan Kucing",
    files: [
      "Bolt Tuna Cat Food.webp",
      "Cleo Adult Cat Food.webp",
      "FRISKIES Adult Seafood Sensation.webp",
      "Happy Cat Minkas Perfect Mix.webp",
      "Me-O Dry Cat Food.webp",
      "Nature Bridge Beauty Cat Food.webp",
      "PRO PLAN Adult.webp",
      "Royal Canin Indoor Adult.webp",
      "Supercat Adult.webp",
      "Whiskas Dry Food.webp",
    ],
  },
  {
    category: "Pasir kucing yang bagus",
    files: [
      "ANIMAL\u0026CO Cat Litter.webp",
      "Best In Show Cat Sand Clumping Cat Litter.webp",
      "Catsan Light Pasir Kucing.webp",
      "KAWAN BENTONITE Cat Litter.webp",
      "Kit Cat SOYA CLUMP.webp",
      "Markotops Tofu Soya Cat Litter.webp",
      "MAXlife Cat Litter Bentonite.webp",
      "NEOCLEAN Advance Sodium Bentonite.webp",
      "Pet Kingdom.webp",
      "Unicharm Pet Deo Pasir Kucing.webp",
    ],
  },
];

export const products = productGroups.flatMap(({ category, files }) =>
  files.map((file) => ({
    name: file.slice(0, file.lastIndexOf(".")),
    category,
    image: `/images/products/${encodeURIComponent(category)}/${encodeURIComponent(file)}`,
  })),
);
