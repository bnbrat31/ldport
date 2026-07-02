"use client";

import { useState } from "react";
import Image from "next/image";
import settings from "@/data/settings.json";
import packages from "@/data/packages.json";
import { motion, Variants } from "framer-motion";

// UI Components & Icons
import { ChevronRight, Clock, ZoomIn, MessageCircle } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Packages() {
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState<{ src: string }[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);

  const openLightbox = (images: string[], idx: number) => {
    setSlides(images.map((img) => ({ src: img })));
    setIndex(idx);
    setOpen(true);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleBooking = async (pkgTitle: string) => {
    setLoading(pkgTitle);

    // 1. Kirim Notifikasi Email
    fetch("/api/admin/notify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pkgTitle: pkgTitle,
        timestamp: new Date().toISOString(),
      }),
    }).catch((err) => console.error("Email notification failed", err));

    // 2. Jeda visual singkat
    setTimeout(() => {
      const waNumber = settings.brand.contact.whatsapp;
      const message = encodeURIComponent(
        `Hi Komang Rediasa, I'm interested in the ${pkgTitle} package.`
      );
      window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
      setLoading(null);
    }, 600);
  };

  return (
    <section id="packages" className="py-24 md:py-32 bg-neutral-50 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-urbanist text-accent font-black tracking-[0.3em] uppercase text-xs mb-4 block">
              Curated Experiences
            </span>
            <h2 className="font-playfair text-4xl md:text-6xl font-black text-primary-900 italic leading-tight">
              Tour Packages
            </h2>
          </div>
          <p className="font-urbanist text-neutral-600 max-w-xs text-sm md:text-base leading-relaxed border-l-2 border-accent pl-6">
            Select from our premium expeditions tailored for the ultimate sunrise encounter in North Bali.
          </p>
        </motion.div>

        {/* PACKAGES GRID */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {packages.map((pkg) => (
            <motion.div 
              key={pkg.id} 
              variants={cardVariants}
              className="group relative h-[550px] md:h-[650px] rounded-[2.5rem] overflow-hidden bg-primary-900 shadow-2xl"
            >
              {/* IMAGE & LIGHTBOX TRIGGER */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-110 opacity-70 cursor-pointer"
                onClick={() => openLightbox(pkg.images, 0)}
              >
                <Image
                  src={pkg.images[0]}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
                {/* Zoom Icon on Hover (Desktop) */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30">
                    <ZoomIn className="text-white" size={24} />
                  </div>
                </div>
              </div>

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent z-[1] pointer-events-none" />

              {/* FLOATING PRICE BADGE */}
              <div className="absolute top-6 left-6 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl">
                  <p className="font-urbanist text-[9px] text-accent font-black uppercase tracking-widest mb-1">Starts From</p>
                  <p className="font-playfair text-white text-lg font-bold">Rp {pkg.sharingPrice.toLocaleString('id-ID')}</p>
                </div>
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-8 transform transition-transform duration-500 md:group-hover:-translate-y-4">
                <div className="flex items-center gap-2 mb-4 text-accent/90">
                  <Clock size={16} />
                  <span className="font-urbanist text-[10px] font-black uppercase tracking-widest">{pkg.duration} Journey</span>
                </div>

                <h3 className="font-playfair text-3xl md:text-4xl text-white font-black italic mb-4 leading-tight">
                  {pkg.title}
                </h3>

                {/* INFO REVEAL ON HOVER / VISIBLE ON MOBILE */}
                <div className="max-h-24 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100 transition-all duration-700 overflow-hidden">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {pkg.included.slice(0, 4).map((item, i) => (
                      <span key={i} className="text-[8px] font-black bg-white/10 text-white border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-tighter">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* PRICE SPLIT */}
                <div className="flex items-center justify-between mb-8 pt-5 border-t border-white/10">
                  <div>
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Private</p>
                    <p className="text-xl font-playfair text-white italic">Rp {pkg.privatePrice.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="h-10 w-[1px] bg-white/10"></div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">Boat Type</p>
                    <p className="text-xl font-playfair text-white italic">Premium</p>
                  </div>
                </div>

                {/* BOOKING BUTTON */}
                <button
                  onClick={() => handleBooking(pkg.title)}
                  disabled={loading === pkg.title}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-accent/10 ${
                    loading === pkg.title ? "bg-neutral-400 cursor-not-allowed" : "btn-accent"
                  }`}
                >
                  {loading === pkg.title ? (
                    <span className="flex items-center gap-2 font-urbanist text-xs font-black uppercase tracking-widest">
                      <svg className="animate-spin h-4 w-4 text-primary-900" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span className="text-xs font-black tracking-widest">BOOK EXPEDITION</span>
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </div>

              {/* LIGHT EFFECT ON HOVER */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent/20 transition-all duration-1000" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: "rgba(12, 74, 110, 0.98)" } }}
      />
    </section>
  );
}