import type { Metadata } from "next";
import { Playfair_Display, Urbanist } from "next/font/google";
import "./globals.css";

// Font untuk Headings (Luxury & Elegant)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
});

// Font untuk Body & Buttons (Modern & Clean)
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Lovina Dolphin Port | Private Sunrise Adventure with Captain Komang Redi",
  description: "Experience the ultimate sunrise dolphin tour in Lovina with Captain Komang Redi. Luxury private expeditions, wild dolphin encounters, and bioluminescent snorkeling.",
  keywords: ["Lovina Dolphin Port", "Lovina Sunrise Adventure", "Captain Komang Redi", "Private Boat Bali"],
  openGraph: {
    title: "Lovina Dolphin Port | An Unforgettable Maritime Journey",
    description: "Witness the majestic dawn and wild dolphins with North Bali's premier boat expedition.",
    url: 'https://lovinadolphinport.com',
    siteName: 'Lovina Dolphin Port',
    images: [
      {
        url: 'https://res.cloudinary.com/dv7z1c2xj/image/upload/v1773589366/Lovina-Dolphin_jjlu3b.png',
        width: 1200,
        height: 630,
        alt: 'Lovina Dolphin Port Sunrise Expedition',
      },
    ],
    locale: 'en_US', // Ganti ke id_ID jika target utama domestik
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${urbanist.variable} scroll-smooth`}>
      <body suppressHydrationWarning className="font-urbanist text-neutral-800 bg-neutral-50 antialiased selection:bg-accent selection:text-primary-900">
        {/* Kontainer Utama */}
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}