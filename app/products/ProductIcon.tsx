const paths = {
  cart: "M2 3h3l2.7 11h11.7l2.3-8H6M9 20h.01M18 20h.01",
  heart: "M20.8 5.9a5 5 0 0 0-7.1 0L12 7.6l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 22l8.8-9a5 5 0 0 0 0-7.1Z",
  search: "M21 21l-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  trash: "M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7",
  check: "m5 12 4 4L19 6",
  shield: "M12 2 4 5v6c0 5 3 8 8 11 5-3 8-6 8-11V5l-8-3Zm-4 10 3 3 5-6",
  truck: "M4 17H2V5h13v12H8m7-8h4l3 4v4h-2m-4 0h-1M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  headset: "M3 14v-2a9 9 0 0 1 18 0v5a4 4 0 0 1-4 4h-4M3 13h3v6H5a2 2 0 0 1-2-2v-4Zm18 0h-3v6h1a2 2 0 0 0 2-2v-4Z",
};

export default function ProductIcon({ name, filled = false }: { name: keyof typeof paths; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
