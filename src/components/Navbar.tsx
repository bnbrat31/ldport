"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import settings from "@/data/settings.json";
import Image from "next/image";
import { trackLead } from "@/lib/track";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { brand } = settings;

 const handleNavbarContact = () => {
  // Ambil nomor dari settings
  const waNumber = settings.brand.contact.whatsapp; 
  
  // Kirim tracking
  trackLead("Navbar: Contact Us Clicked");

  // Redirect ke WhatsApp
  const message = encodeURIComponent("Hi Captain Ketut, I'm contacting you from the website.");
  window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
};

  return (
    
<nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-primary-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-20 items-center">
      
      {/* LOGO & BRAND */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative w-14 h-14 rounded-md md:w-16 md:h-16 flex items-center justify-center transition-transform group-hover:scale-110">
           <Image 
             src={brand.logo} 
             alt={`${brand.name} Logo`} 
             width={80} 
             height={80} 
             className="object-contain rounded-full"
             priority
           />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-poppins font-black text-primary-900 text-lg md:text-xl tracking-tighter uppercase">
            {brand.name}
          </span>
          <span className="font-poppins font-medium text-accent text-xs tracking-[0.2em] uppercase -mt-0.5">
            Bali Expedition
          </span>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center space-x-10">
        {['Home', 'Packages', 'About', 'Gallery'].map((item) => (
  <Link 
    key={item}
    // Menangani link: Home ke root '/', lainnya ke /slug
    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
    className="font-urbanist text-sm font-black uppercase tracking-widest text-primary-900/60 hover:text-primary-900 transition-all relative group py-2"
  >
    {item}
    
    {/* Animated Underline Accent */}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
    
    {/* Optional: Dot indicator saat hover */}
    <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
  </Link>
))}
        
        <button
          onClick={handleNavbarContact}
          className="font-poppins bg-primary-900 hover:bg-primary-800 text-white px-6 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-lg shadow-primary-900/20 active:scale-95" 
        >
          <MessageCircle size={18} className="text-accent" />
          <span className="text-sm font-bold tracking-wide">BOOK NOW</span>
        </button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-primary-900 hover:bg-primary-50 rounded-lg transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </div>
  </div>

  {/* MOBILE OVERLAY MENU */}
  {isOpen && (
    <div className="md:hidden bg-white border-b border-primary-100 animate-in slide-in-from-top duration-300">
      <div className="px-4 pt-4 pb-8 space-y-1">
        {['Home', 'Packages', 'About', 'Gallery'].map((item) => (
          <Link 
            key={item}
            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-4 text-base font-bold text-primary-900 hover:bg-primary-50 rounded-xl transition"
          >
            {item}
          </Link>
        ))}
        
        <div className="pt-4 px-2">
          <a 
            href={`https://wa.me/${brand.contact.whatsapp}`}
            className="w-full font-poppins bg-accent text-primary-900 font-black px-4 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-accent/20"
          >
            <MessageCircle size={22} />
            CHAT VIA WHATSAPP
          </a>
        </div>
      </div>
    </div>
  )}
</nav>
  );
}