import { Playfair_Display, Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import WhatsAppFAB from "@/components/WAFab";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import Footer from "@/section/contacts";
import { Suspense } from "react";
import "../globals.css";

// Inisialisasi di luar fungsi untuk stabilitas
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: 'swap',
});

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    // Tambahkan suppressHydrationWarning jika error font masih muncul
    <html lang="en" className={`${playfair.variable} ${urbanist.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-urbanist bg-neutral-50 text-primary-950 antialiased selection:bg-accent/30">
        
        {/* Progress Bar dengan Suspense agar tidak menghambat hidrasi utama */}
        <Suspense fallback={null}>
          <ProgressBarProvider />
        </Suspense>
        
        <Navbar />
        
        {/* Main Content dengan padding untuk Navbar fixed */}
        <main className="pt-20 min-h-screen"> 
          {children}
        </main>

       
        
        {/* Floating Action Button */}
        <WhatsAppFAB />

        {/* NProgress Custom Style */}
        <style dangerouslySetInnerHTML={{ __html: `
          #nprogress .bar { 
            background: #f59e0b !important; 
            height: 3px !important; 
            z-index: 9999 !important;
          }
          #nprogress .peg { 
            box-shadow: 0 0 15px #f59e0b, 0 0 8px #f59e0b !important; 
          }
          #nprogress .spinner {
            display: none !important;
          }
        `}} />
      </body>
    </html>
  );
}