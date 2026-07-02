"use client";

import settings from "@/data/settings.json";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { trackLead } from "@/lib/track";

export default function IntroSection() {
  const { brand } = settings;

  // Variasi animasi untuk container utama
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Memberikan jeda 0.2 detik antar elemen anak
      },
    },
  };

  // Variasi animasi untuk elemen individu
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };
  const handleIntroButton = () => {
  // Ambil nomor dari settings
  const waNumber = settings.brand.contact.whatsapp; 
  
  // Kirim tracking
  trackLead("Intro: Contact Us Clicked");

  // Redirect ke WhatsApp
  const message = encodeURIComponent("Hi Captain Ketut, I'm contacting you from the website.");
  window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
};

  return (
    <section id="about" className="relative bg-neutral-50 pt-32 pb-28 px-6 overflow-hidden">
  {/* SOFT AMBIENT DECORATION */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
    <div className="absolute top-10 right-0 w-64 h-64 bg-primary-100 rounded-full blur-[120px]" />
    <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
  </div>

  {/* SHAPE DIVIDER (WAVES) - Refined to Primary Color */}
  <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
    <svg
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      className="relative block w-full h-[80px] fill-primary-50/50"
    >
      <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
      c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
      c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
    </svg>
  </div>

  <motion.div
    className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    {/* SUB-HEADING / BADGE */}
    <motion.span 
      variants={itemVariants}
      className="font-urbanist text-accent font-black tracking-[0.3em] uppercase text-xs mb-4"
    >
      Since 1990 — North Bali Legacy
    </motion.span>

    {/* DRAMATIC HEADING */}
    <motion.h2
      variants={itemVariants}
      className="font-playfair text-3xl md:text-6xl font-black text-primary-900 leading-[1.1] mb-10 italic"
    >
      {settings.intro.title.split("Tickets")[0]} 
      <span className="block mt-4 text-xl md:text-2xl font-urbanist not-italic font-light tracking-[0.1em] text-neutral-800">
        Journeys Starting From <span className="text-primary-700 font-bold border-b-2 border-accent/30">IDR 100K</span>
      </span>
    </motion.h2>

    {/* DECORATIVE DIVIDER */}
    <motion.div
      variants={itemVariants}
      className="flex items-center gap-4 mb-12"
    >
      <div className="h-[1px] w-12 bg-primary-200"></div>
      <div className="w-2 h-2 rotate-45 bg-accent"></div>
      <div className="h-[1px] w-12 bg-primary-200"></div>
    </motion.div>

    {/* TEXT CONTENT - Storytelling approach */}
    <motion.div
      variants={itemVariants}
      className="font-urbanist text-neutral-800 text-lg md:text-xl max-w-3xl space-y-6 mb-16 leading-relaxed font-light"
    >
      <p className="first-letter:text-5xl first-letter:font-playfair first-letter:mr-3 first-letter:float-left first-letter:text-primary-900">
        {settings.intro.description}
      </p>
    </motion.div>

    {/* ACTION BUTTONS */}
    <motion.div 
      variants={itemVariants}
      className="flex flex-col sm:flex-row items-center gap-6"
    >
      <button
        onClick={handleIntroButton}
        className="btn-sunrise px-12 group"
      >
        <div className="flex items-center gap-3">
          <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
          <span>Inquiry via WhatsApp</span>
        </div>
      </button>
      
      <a 
        href="#packages" 
        className="font-urbanist text-sm font-bold uppercase tracking-widest text-primary-900 hover:text-accent transition-colors underline underline-offset-8 decoration-primary-200 hover:decoration-accent"
      >
        View Our Expeditions
      </a>
    </motion.div>
  </motion.div>
</section>
  );
}