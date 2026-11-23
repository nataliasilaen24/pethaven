import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "PetHaven | Pet Shop",
  description:
    "Temukan makanan, mainan, dan perlengkapan terbaik untuk hewan kesayanganmu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}