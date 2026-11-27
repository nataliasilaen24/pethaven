export function petSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function petContactUrl(name: string) {
  const message = encodeURIComponent(`Halo PetHaven, saya ingin bertanya tentang ${name}.`);
  return `https://wa.me/6281234567890?text=${message}`;
}
