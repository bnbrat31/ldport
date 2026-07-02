"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import settings from "@/data/settings.json";
import { trackLead } from "@/lib/track";
import { useState, useEffect } from "react";

export default function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false);

  // Munculkan button setelah delay sedikit agar tidak mengganggu loading awal
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const waNumber = settings.contact.phone; // Sesuaikan path json Anda
    trackLead("FAB: WhatsApp Floating Button Clicked");

    const message = encodeURIComponent("Hi Komang Rediasa, I'm interested in booking a sunrise expedition!");
    window.open(`https://wa.me/${waNumber.replace(/\D/g, '')}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* TOOLTIP LABEL - Menggunakan Glassmorphism & Urbanist Font */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              className="bg-primary-950 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-2xl border border-white/10 hidden md:block pointer-events-auto"
            >
              <p className="text-white font-urbanist text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                Talk to the Crew
              </p>
            </motion.div>

            {/* MAIN BUTTON */}
            <motion.button
              onClick={handleWhatsAppClick}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative group pointer-events-auto"
            >
              {/* Outer Pulse Glow (Warna Accent Gold) */}
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 group-hover:opacity-0 transition-opacity"></span>
              
              {/* Button Body - Gradient Luxury */}
              <div className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-5 rounded-full shadow-[0_20px_50px_rgba(18,140,126,0.3)] flex items-center justify-center transition-all duration-500 overflow-hidden">
                {/* Glossy Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <MessageCircle size={28} fill="currentColor" className="relative z-10" />
              </div>

              {/* Notif Badge - Warna Emas/Accent agar sinkron dengan logo */}
              <span className="absolute -top-1 -right-1 flex h-5 w-5 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-accent border-2 border-primary-950 flex items-center justify-center">
                   <Send size={8} className="text-primary-950 ml-[1px]" />
                </span>
              </span>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}