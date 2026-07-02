"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/section/contacts";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryGrid() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Lovina Dolphin Watching Gallery",
    "description": "Exclusive sunrise and dolphin watching photo collection in Lovina, Bali.",
    "publisher": { "@type": "Organization", "name": "Lovina Dolphin Watching" },
    "image": images.map(img => img.url)
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-40 bg-neutral-50">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="rounded-full h-12 w-12 border-t-2 border-accent mb-6"
      />
      <p className="text-neutral-400 font-urbanist text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
        Gathering Moments
      </p>
    </div>
  );

  return (
    <div className="overflow-hidden bg-neutral-50">
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header - Luxury Aesthetic */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="font-urbanist text-accent font-black tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4 block">
            Visual Discovery
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-primary-950 mb-6 font-playfair italic tracking-tight">
            Our <span className="text-accent">Memories.</span>
          </h1>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm md:text-base font-urbanist font-light leading-relaxed">
            Every sunrise tells a story. Explore our collection of unforgettable moments captured across the North Bali seas.
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-[2px] bg-accent mx-auto mt-10"
          />
        </motion.div>

        {/* Grid Gallery */}
        {images.length > 0 ? (
          <>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
            >
              {images.map((img: any, i: number) => (
                <motion.div
                  key={img.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8 }}
                  onClick={() => setIndex(i)}
                  className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-primary-900/5 cursor-pointer bg-neutral-200 border border-white/50"
                >
                  <Image
                    src={img.url}
                    alt="Lovina Dolphin Watching Experience"
                    fill
                    priority={i < 4}
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {/* Elegant Overlay */}
                  <div className="absolute inset-0 bg-primary-950/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-[2px]">
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </div>
                    <span className="text-white font-urbanist text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                      Expand View
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <Lightbox
              index={index}
              open={index >= 0}
              close={() => setIndex(-1)}
              slides={images.map(img => ({ src: img.url }))}
              animation={{ fade: 400 }}
              styles={{ container: { backgroundColor: "rgba(8, 51, 74, 0.95)" } }} // Primary-950 color
            />
          </>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-neutral-100 shadow-inner">
            <p className="text-neutral-400 font-urbanist text-sm tracking-widest uppercase font-bold">The gallery is being curated.</p>
          </div>
        )}
      </section>
      
      <Footer />
    </div>
  );
}