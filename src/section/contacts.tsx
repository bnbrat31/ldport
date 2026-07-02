"use client";

import contactData from "@/data/settings.json";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Send, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { contact } = contactData;

  return (
    <footer className="bg-primary-950 text-white pt-24 pb-12 px-6 overflow-hidden relative">
      {/* DECORATIVE LIGHT FLARE - Efek cahaya kedalaman laut */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* KOLOM KIRI: INFO KONTAK (5 Kolom) */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-urbanist text-accent font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
                Contact Discovery
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-black mb-6 italic leading-tight">
                Get in Touch<span className="text-accent">.</span>
              </h2>
              <p className="text-neutral-400 font-urbanist max-w-md font-light leading-relaxed">
                Ready for an unforgettable sunrise? Reach out to our crew directly or visit our base at the tranquil shores of Lovina Beach.
              </p>
            </motion.div>

            {/* CAPTAIN PROFILE CARD */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-sm group"
            >
              <div className="relative w-20 h-20 shrink-0">
                <Image 
                  src={contact.captainImage} 
                  alt={contact.captainName}
                  fill
                  className="object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute -bottom-2 -right-2 bg-accent p-1.5 rounded-lg text-primary-900 shadow-lg">
                  <Send size={14} />
                </div>
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold italic">{contact.captainName}</h3>
                <p className="font-urbanist text-accent text-[10px] font-black uppercase tracking-widest">Main Expedition Lead</p>
              </div>
            </motion.div>

            {/* CONTACT DETAILS */}
            <div className="space-y-8">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 group items-start"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-primary-900 transition-all duration-500 border border-white/10 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mb-1">Basecamp</h4>
                  <p className="text-neutral-300 text-sm leading-relaxed max-w-xs group-hover:text-white transition-colors">
                    {contact.address}
                  </p>
                </div>
              </a>

              <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="flex gap-5 group items-start">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-primary-900 transition-all duration-500 border border-white/10 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mb-1">Direct Line</h4>
                  <p className="text-white text-xl font-mono font-bold tracking-tight">{contact.phone}</p>
                </div>
              </a>

              <a href={`mailto:${contact.email}`} className="flex gap-5 group items-start">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:text-primary-900 transition-all duration-500 border border-white/10 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mb-1">Inquiries</h4>
                  <p className="text-neutral-300 text-sm group-hover:text-white transition-colors">{contact.email}</p>
                </div>
              </a>
            </div>

            {/* SOCIAL ECOSYSTEM */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: <Instagram size={18} />, link: contact.socials.instagram, label: 'Instagram' },
                { icon: <Facebook size={18} />, link: contact.socials.facebook, label: 'Facebook' },
                { icon: <Youtube size={18} />, link: contact.socials.youtube, label: 'Youtube' },
              ].map((soc, i) => (
                <a 
                  key={i} 
                  href={soc.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-primary-900 hover:-translate-y-1 transition-all duration-500"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN: GOOGLE MAPS (7 Kolom) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative h-[450px] lg:h-[650px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
          >
            <iframe 
              src={contact.mapUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.6] contrast-[1.2] brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
            ></iframe>
            
            {/* MAP OVERLAY BUTTON */}
            <div className="absolute bottom-8 left-8 right-8 bg-primary-900/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center justify-between transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="font-urbanist text-[10px] font-black uppercase tracking-[0.2em]">Live Base: Lovina, Bali</span>
              </div>
              <ArrowUpRight size={16} className="text-accent" />
            </div>
          </motion.div>
        </div>

        {/* COPYRIGHT AREA */}
        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">
              © {currentYear} {contact.captainName}
            </p>
            <div className="h-1 w-1 bg-neutral-700 rounded-full hidden md:block" />
            <p className="text-neutral-600 text-[10px] font-medium uppercase tracking-[0.2em]">
              Crafted for the North Bali Seas
            </p>
          </div>
          
          <div className="flex gap-8 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}