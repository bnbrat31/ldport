"use client";

import Image from "next/image";
import settings from "@/data/settings.json";
import { trackLead } from "@/lib/track";

export default function HeroSection() {
  const { hero, } = settings.homepage;
  const { brand } = settings;

  const handleHerButton = () => {
  // Ambil nomor dari settings
  const waNumber = settings.brand.contact.whatsapp; 
  
  // Kirim tracking
  trackLead("Hero: Hero CTA Clicked");

  // Redirect ke WhatsApp
  const message = encodeURIComponent("Hi Komang Rediasa, I'm contacting you from the website.");
  window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
};

  return (


<section className="relative h-[92vh] min-h-[650px] flex flex-col items-center justify-center text-white px-4 overflow-hidden">
  
  {/* BACKGROUND IMAGE DENGAN DUAL OVERLAY */}
  <div className="absolute inset-0 z-0">
    <Image 
      src={hero.bg_image} 
      alt="Lovina Dolphin Port Sunrise" 
      className="w-full h-full object-cover scale-105 animate-subtle-zoom" // Animasi zoom halus
      fill 
      priority 
    />
    
    {/* Overlay 1: Gradient Deep Ocean untuk kontras teks */}
    <div className="absolute inset-0 bg-primary-900/40 z-[1]" />
    
    {/* Overlay 2: Luxury Gradient (Bottom to Top) */}
    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/20 to-transparent z-[2]" />
  </div>

  {/* CONTENT */}
  <div className="relative z-10 text-center max-w-5xl">
    {/* Badge Kecil di Atas Title (Optional but adds a professional touch) */}
    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md border border-white/20 rounded-full animate-fade-in">
      The #1 Dolphin Experience in Lovina
    </span>

    <h1 className="font-poppins text-4xl sm:text-6xl md:text-8xl font-bold mb-6 leading-[1.05] tracking-tight drop-shadow-2xl">
      {hero.title}
    </h1>
    
    <p className="font-roboto text-base sm:text-xl md:text-2xl mb-12 text-blue-50/80 max-w-2xl mx-auto leading-relaxed px-4">
      {hero.subtitle}
    </p>
    
    {/* BUTTON GROUP - Mobile Optimized */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full max-w-md mx-auto sm:max-w-none px-6">
      <button 
        onClick={handleHerButton}
        className="w-full sm:w-auto font-poppins bg-accent hover:bg-accent-dark text-primary-900 font-extrabold py-4 px-12 rounded-full transition-all shadow-[0_10px_20px_-5px_rgba(245,158,11,0.4)] transform hover:-translate-y-1 active:scale-95 text-center uppercase tracking-wide"
      >
        {hero.cta_text}
      </button>
      
      <button className="w-full sm:w-auto font-poppins border-2 border-white/40 hover:border-white hover:bg-white/10 text-white font-bold py-4 px-12 rounded-full transition-all backdrop-blur-sm tracking-wide">
        Explore Tours
      </button>
    </div>
  </div>

  {/* SCROLL INDICATOR - Animated */}
  

  {/* CSS Tambahan untuk Animasi Subtle (Bisa ditaruh di global CSS) */}
  <style jsx>{`
    
  `}</style>
</section> )}