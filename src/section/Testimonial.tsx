"use client";

import testimonialsData from "@/data/testimonials.json";
import { Star, Quote, Award } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-neutral-50 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER - Editorial Style */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-20 md:mb-28"
        >
          <span className="font-urbanist text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">
            Guest Chronicles
          </span>
          <h2 className="font-playfair text-4xl md:text-6xl font-black text-primary-900 italic mb-6">
            Voices of Adventure
          </h2>
          <p className="font-urbanist text-neutral-500 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Authentic stories from global travelers who witnessed the sunrise magic of Lovina with our curated expeditions.
          </p>
        </motion.div>

        {/* MASONRY GRID - Optimasi Break-Inside */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {testimonialsData.testimonials.map((item, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="break-inside-avoid bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-neutral-100 hover:shadow-2xl hover:shadow-primary-900/5 transition-all duration-700 group relative"
            >
              {/* RATING & SOURCE */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-0.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[#00af87]"> {/* TripAdvisor Brand Color */}
                   <span className="font-urbanist text-[8px] font-black uppercase tracking-tighter">TripAdvisor</span>
                   <Quote className="opacity-10" size={32} />
                </div>
              </div>

              {/* REVIEW TEXT - Clean Typography */}
              <p className="font-urbanist text-sm md:text-base text-neutral-600 leading-relaxed mb-10 italic font-light">
                "{item.text}"
              </p>

              {/* USER INFO */}
              <div className="flex items-center gap-4 border-t pt-8 border-neutral-50">
                <div className="w-12 h-12 bg-primary-900 rounded-2xl flex items-center justify-center text-accent font-playfair font-black text-xl shadow-lg transform group-hover:rotate-6 transition-transform">
                  {item.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-playfair font-black text-primary-900 leading-none mb-1.5 italic">
                    {item.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-black uppercase tracking-widest">
                      {item.origin}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-urbanist uppercase tracking-tighter">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* TRUST BADGE - TripAdvisor Optimized */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 py-12 border-t border-neutral-100 flex flex-col items-center justify-center"
        >
          <div className="flex items-center gap-3 mb-6 bg-[#00af87]/5 px-6 py-2 rounded-full border border-[#00af87]/10">
             <Award size={18} className="text-[#00af87]" />
             <span className="text-[10px] font-black text-[#00af87] uppercase tracking-[0.2em]">TripAdvisor Recommended 2026</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="flex gap-1 text-[#00af87]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-[#00af87] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40"></div>
                  </div>
                ))}
            </div>
            <div className="h-px w-12 bg-neutral-200 md:h-8 md:w-px"></div>
            <div className="flex items-baseline gap-2">
               <span className="font-playfair font-black text-3xl text-primary-900">4.9</span>
               <span className="font-urbanist text-xs text-neutral-400 uppercase tracking-widest font-black">Excellent Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}