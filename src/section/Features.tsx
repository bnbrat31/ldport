"use client";

import { motion } from "framer-motion";
import { Anchor, Compass, ShieldCheck, MapPin } from "lucide-react";
import featuresData from "@/data/settings.json";

const iconMap: Record<string, React.ReactNode> = {
  anchor: <Anchor className="w-8 h-8 text-blue-500" />,
  compass: <Compass className="w-8 h-8 text-orange-500" />,
  shield: <ShieldCheck className="w-8 h-8 text-blue-500" />,
  mapPin: <MapPin className="w-8 h-8 text-orange-500" />,
};

export default function Features() {
  // Variasi untuk container grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Variasi untuk tiap kartu fitur
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    },
  };

  // Variasi untuk efek coretan (scribble) pada teks
  const scribbleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.6, 
      transition: { duration: 1.2, ease: "easeInOut"as const, delay: 0.5 } 
    },
  };

  return (
   <section id="features" className="py-20 md:py-32 bg-neutral-100 px-4 md:px-6 overflow-hidden relative">
  {/* BACKGROUND ACCENT */}
  <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary-50/50 rounded-full blur-[120px] -z-10" />

  <div className="max-w-7xl mx-auto">
    
    {/* HEADLINE DENGAN SENTUHAN SERIF ITALIC */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-24"
    >
      <span className="font-urbanist text-accent font-black tracking-[0.3em] uppercase text-xs mb-4 block">
        Our Excellence
      </span>
      <h3 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-black text-primary-900 leading-[1.1] relative inline-block italic">
        Crafting Your <br className="md:hidden" />
        <span className="relative inline-block px-2 md:px-6 not-italic">
          Perfect
          <svg 
            className="absolute -inset-x-2 -inset-y-4 md:-inset-x-4 md:-inset-y-6 w-[110%] h-[140%] text-accent/40" 
            viewBox="0 0 500 150" 
            preserveAspectRatio="none"
          >
            <motion.path 
              variants={scribbleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              d="M325,18C228.7-8.3,118.5,8.3,78,21C22.4,38.4,4.6,54.6,5.6,77.6c1.4,32.4,52.2,54,142.6,63.7 c66.2,7.1,212.2,7.5,273.5-8.3c64.4-16.6,104.3-57.6,33.8-98.2C386.7-4.9,179.4-1.4,126.3,20.7" 
              strokeLinecap="round" 
            />
          </svg>
        </span>{" "}
        Sunrise
      </h3>
    </motion.div>

    {/* GRID FEATURES */}
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {featuresData.features.map((feature) => (
        <motion.div 
          key={feature.id} 
          variants={cardVariants}
          className="group relative p-10 bg-white rounded-[2.5rem] border border-neutral-200 hover:border-accent/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(12,74,110,0.08)] transition-all duration-700"
        >
          {/* ICON HOLDER */}
          <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-900 transition-all duration-500 transform group-hover:rotate-[360deg]">
            <div className="text-primary-700 group-hover:text-accent transition-colors duration-500">
              {iconMap[feature.iconId] || <Compass size={32} />}
            </div>
          </div>
          
          <h4 className="font-playfair text-2xl font-black text-primary-900 mb-4 tracking-tight group-hover:text-primary-800 transition-colors">
            {feature.title}
          </h4>
          
          <p className="font-urbanist text-neutral-600 leading-relaxed text-base font-light">
            {feature.description}
          </p>

          {/* DECORATIVE ACCENT */}
          <div className="absolute top-6 right-8 text-neutral-100 group-hover:text-accent/10 transition-colors duration-500 -z-0">
             <span className="text-6xl font-playfair font-black italic">0{feature.id}</span>
          </div>

          <div className="w-0 group-hover:w-16 h-[2px] bg-accent mt-8 transition-all duration-700 rounded-full"></div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
  );
}