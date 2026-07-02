"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import overviewData from "@/data/settings.json";
import { Clock, CalendarDays, Info, Anchor } from "lucide-react";

export default function Overview() {
  return (
    <section id="overview" className="py-24 md:py-32 bg-white px-6 overflow-hidden relative">
      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-100 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* SISI KIRI: ELEGANT IMAGE STACK */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Dekorasi Garis Belakang */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-l-2 border-t-2 border-accent/30 rounded-tl-[3rem] hidden md:block" />
            
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] group">
              <div className="aspect-[4/5] md:aspect-[3/4] relative">
                <Image 
                  src={overviewData.overview.image} 
                  alt="Dolphin Overview" 
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-w-768px) 100vw, 50vw"
                  priority
                />
                {/* Overlay Tekstur */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent mix-blend-overlay" />
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-2xl hidden md:flex items-center gap-4 border border-neutral-100">
               <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-primary-900">
                  <Anchor size={24} />
               </div>
               <div>
                  <p className="font-playfair font-black text-2xl text-primary-900 leading-none italic">30+</p>
                  <p className="font-urbanist text-[10px] font-black uppercase tracking-widest text-neutral-400">Years Experience</p>
               </div>
            </div>
          </motion.div>

          {/* SISI KANAN: REFINED CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="font-urbanist text-accent font-black tracking-[0.3em] uppercase text-xs mb-6 block">
              The North Bali Heritage
            </span>
            
            <h2 className="font-playfair text-4xl md:text-6xl font-black text-primary-900 mb-8 leading-[1.1] italic">
              {overviewData.overview.title}
            </h2>

            <div className="space-y-8">
              <p className="font-urbanist text-neutral-600 text-lg md:text-xl leading-relaxed font-light">
                {overviewData.overview.description}
              </p>

              {/* REFINED INFO CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="group bg-neutral-50 p-6 rounded-[2rem] hover:bg-primary-900 transition-colors duration-500">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm mb-4 group-hover:bg-accent group-hover:text-primary-900 transition-colors">
                    <CalendarDays size={22} />
                  </div>
                  <h4 className="font-playfair font-bold text-primary-900 text-lg group-hover:text-white transition-colors italic">Best Season</h4>
                  <p className="font-urbanist text-neutral-500 text-sm group-hover:text-white/70 transition-colors">{overviewData.overview.bestTime}</p>
                </div>

                <div className="group bg-neutral-50 p-6 rounded-[2rem] hover:bg-primary-900 transition-colors duration-500">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm mb-4 group-hover:bg-accent group-hover:text-primary-900 transition-colors">
                    <Clock size={22} />
                  </div>
                  <h4 className="font-playfair font-bold text-primary-900 text-lg group-hover:text-white transition-colors italic">Departure</h4>
                  <p className="font-urbanist text-neutral-500 text-sm group-hover:text-white/70 transition-colors">06:00 AM — Sharp Arrival</p>
                </div>
              </div>

              {/* REFINED NOTE / ALERT BOX */}
              <div className="flex items-start gap-4 bg-primary-50/50 p-6 rounded-3xl border border-primary-100">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Info size={18} className="text-primary-700" />
                </div>
                <div>
                  <p className="font-urbanist text-[10px] font-black uppercase tracking-[0.15em] text-primary-900 mb-1">Navigation Note</p>
                  <p className="font-urbanist text-xs text-neutral-600 leading-relaxed italic">
                    {overviewData.overview.note}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}