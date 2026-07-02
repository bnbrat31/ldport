"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-primary-950 overflow-hidden">
      {/* BACKGROUND GLOW - Efek pendaran cahaya pagi */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]"
      />

      <div className="relative flex flex-col items-center">
        {/* SUNRISE ANIMATION */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-t from-accent to-orange-400 shadow-[0_0_40px_rgba(245,158,11,0.4)] mb-8"
        />

        {/* LOADING TEXT */}
        <div className="text-center space-y-3">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-playfair text-2xl md:text-3xl font-black italic text-white tracking-tight"
          >
            Preparing Your Adventure<span className="text-accent">.</span>
          </motion.h2>
          
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-urbanist text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
              Chasing the Lovina Sunrise
            </span>
          </div>
        </div>

        {/* PROGRESS BAR - Minimalist Line */}
        <div className="mt-12 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-accent to-transparent"
          />
        </div>
      </div>

      {/* DECORATIVE WAVE - Animasi garis air di bagian bawah */}
      <div className="absolute bottom-0 left-0 w-full opacity-20 h-32">
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96"
          />
        </svg>
      </div>
    </div>
  );
}