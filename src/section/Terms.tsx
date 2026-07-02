"use client";

import settings from "@/data/settings.json";
import { motion } from "framer-motion";
import { ClipboardCheck, MapPin, Receipt, Wallet, Send, ArrowRight, Globe } from "lucide-react";

export default function Terms() {
  const { terms } = settings;

  const stepIcons = [
    <Send key="1" size={20} className="text-accent" />,
    <MapPin key="2" size={20} className="text-accent" />,
    <ClipboardCheck key="3" size={20} className="text-accent" />
  ];

  return (
    <section id="terms" className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-50/50 -z-10 skew-x-12 translate-x-20 md:block hidden" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* SISI KIRI: BOOKING STEPS (7 Kolom) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-urbanist text-accent font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">
                How to Join
              </span>
              <h2 className="font-playfair text-4xl md:text-5xl font-black text-primary-900 italic mb-12 flex items-center gap-4">
                <Receipt className="text-accent" size={32} />
                {terms.title}
              </h2>

              <div className="space-y-4 md:space-y-6">
                {terms.steps.map((step, index) => (
                  <div key={index} className="group flex gap-6 p-6 md:p-8 rounded-[2rem] bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-500">
                    <div className="shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-neutral-100 group-hover:bg-primary-900 group-hover:border-primary-900 transition-colors duration-500">
                      <div className="group-hover:scale-110 transition-transform">
                        {stepIcons[index]}
                      </div>
                    </div>
                    <div>
                      <p className="font-urbanist text-[10px] font-black text-accent uppercase tracking-widest mb-1">Step 0{index + 1}</p>
                      <p className="font-urbanist text-neutral-600 leading-relaxed md:text-lg">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* SISI KANAN: PREMIUM PAYMENT CARDS (5 Kolom) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* BANK CARD (PREMIUM BLACK/GOLD) */}
              <div className="bg-primary-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                {/* Decorative Wave Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-accent/20 transition-all duration-1000" />
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <Wallet className="text-accent" size={32} />
                  <div className="text-right">
                    <p className="font-urbanist text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Official Payment</p>
                    <p className="font-playfair italic font-bold text-lg">Bank Transfer</p>
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                  <div>
                    <p className="font-urbanist text-[9px] font-black uppercase tracking-[0.3em] text-accent mb-2">Account Number</p>
                    <p className="text-2xl md:text-3xl font-mono font-bold tracking-[0.2em] leading-none">
                      {terms.payment.bank.accountNo}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div>
                      <p className="font-urbanist text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Holder</p>
                      <p className="font-urbanist text-xs font-bold uppercase truncate">{terms.payment.bank.accountName}</p>
                    </div>
                    <div>
                      <p className="font-urbanist text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">Bank</p>
                      <p className="font-urbanist text-xs font-bold uppercase">{terms.payment.bank.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WISE / INTERNATIONAL TRANSFER CARD */}
              <a 
                href={terms.payment.wiseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between bg-neutral-900 hover:bg-black text-white p-6 rounded-[2rem] transition-all duration-300 shadow-xl group border border-neutral-800"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                    <Globe size={24} className="group-hover:text-primary-900" />
                  </div>
                  <div>
                    <p className="font-urbanist text-[9px] font-black text-accent uppercase tracking-widest mb-0.5">International</p>
                    <p className="font-playfair font-black text-lg italic leading-none">Wise Transfer</p>
                  </div>
                </div>
                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary-900 transition-all">
                  <ArrowRight size={18} />
                </div>
              </a>

              {/* HELPER TEXT */}
              <p className="mt-6 font-urbanist text-[10px] text-neutral-400 text-center uppercase tracking-widest leading-relaxed">
                Secure transaction guaranteed. <br/> Please send your proof of payment via WhatsApp.
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}