"use client";

import { useState } from "react";
import siteData from "@/data/settings.json";
import { 
  Save, Info, Phone, List, Map, ShieldCheck, 
  Anchor, Image as ImageIcon, Plus, Trash2, CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type TabType = 'intro' | 'contacts' | 'features' | 'overview' | 'terms';
interface SiteData {
  brand: {
    name: string;
    logo: string;
    contact: { whatsapp: string; email: string; address: string; };
  };
  appearance: {
    theme: string;
    main_font: string;
    body_font: string;
  };
  homepage: {
    hero: { title: string; subtitle: string; cta_text: string; bg_image: string; };
  };
  siteName: string;
  intro: { title: string; description: string; };
  contact: {
    captainName: string;
    captainImage: string;
    address: string;
    phone: string;
    email: string;
    socials: { [key: string]: string };
    mapUrl: string;
  };
  features: Array<{ id: number; title: string; description: string; iconId: string; }>;
  overview: { title: string; description: string; };
  terms: {
    title: string;
    steps: string[];
    payment: {
      bank: { name: string; accountName: string; accountNo: string; };
      wiseLink: string;
    };
  };
}

export default function AdminSettings() {
  const [formData, setFormData] = useState(siteData);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('intro');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        body: JSON.stringify({ type: "settings", newData: formData }),
      });
      if (res.ok) alert("Settings updated successfully!");
    } catch (error) { alert("Failed to save data."); }
    setIsSaving(false);
  };

  // Helper untuk update nested object
  const updateNested = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...formData };
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = (current as any)[keys[i]];
    }
    (current as any)[keys[keys.length - 1]] = value;
    setFormData(newData);
  };

  return (
    <div className="max-w-5xl space-y-6 pb-20">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-4 z-20 backdrop-blur-md bg-white/90">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">Site Configuration</h1>
          <p className="text-sm text-slate-500">Master data for your entire landing page.</p>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="bg-slate-900 text-white px-8 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg disabled:opacity-50">
          <Save size={18} />
          <span className="font-bold">{isSaving ? "Saving..." : "Save All Changes"}</span>
        </button>
      </header>

      {/* TABS */}
      <nav className="flex flex-wrap gap-2 p-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
        {[
          { id: 'intro', label: 'Intro & Hero', icon: <Info size={16} /> },
          { id: 'contacts', label: 'Contacts', icon: <Phone size={16} /> },
          { id: 'features', label: 'Features', icon: <List size={16} /> },
          { id: 'overview', label: 'Overview', icon: <Map size={16} /> },
          { id: 'terms', label: 'Terms & Pay', icon: <ShieldCheck size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-slate-900 text-white shadow-md" : "text-slate-400 hover:bg-slate-50"}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            
            {/* INTRO TAB */}
            {activeTab === 'intro' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><ImageIcon size={18} className="text-blue-500"/> Hero Section</h4>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Hero Title</label>
                    <textarea className="w-full p-4 bg-slate-50 rounded-2xl outline-none" rows={2} value={formData.homepage.hero.title} onChange={(e) => updateNested('homepage.hero.title', e.target.value)} />
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Hero Subtitle</label>
                    <textarea className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm" rows={3} value={formData.homepage.hero.subtitle} onChange={(e) => updateNested('homepage.hero.subtitle', e.target.value)} />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><Anchor size={18} className="text-blue-500"/> Intro Section</h4>
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Intro Title</label>
                    <textarea className="w-full p-4 bg-slate-50 rounded-2xl outline-none" rows={2} value={formData.intro.title} onChange={(e) => updateNested('intro.title', e.target.value)} />
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">Intro Description</label>
                    <textarea className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm" rows={4} value={formData.intro.description} onChange={(e) => updateNested('intro.description', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* CONTACTS TAB */}
            {activeTab === 'contacts' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-bold text-slate-800">Captain & Core Contact</h4>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                    <img src={formData.contact.captainImage} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <input className="flex-grow bg-transparent outline-none text-xs font-mono" value={formData.contact.captainImage} onChange={(e) => updateNested('contact.captainImage', e.target.value)} />
                  </div>
                  <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none" placeholder="Captain Name" value={formData.contact.captainName} onChange={(e) => updateNested('contact.captainName', e.target.value)} />
                  <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none" placeholder="WhatsApp" value={formData.contact.phone} onChange={(e) => updateNested('contact.phone', e.target.value)} />
                </div>
                <div className="space-y-6">
                  <h4 className="font-bold text-slate-800">Address & Socials</h4>
                  <textarea className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm" rows={3} value={formData.contact.address} onChange={(e) => updateNested('contact.address', e.target.value)} />
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(formData.contact.socials).map(soc => (
                      <input key={soc} className="p-3 bg-slate-50 rounded-xl outline-none text-xs" placeholder={soc} value={(formData.contact.socials as any)[soc]} onChange={(e) => updateNested(`contact.socials.${soc}`, e.target.value)} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FEATURES TAB */}
            {activeTab === 'features' && (
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 mb-4">Highlights Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.features.map((item: any, idx: number) => (
                    <div key={item.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 relative group">
                      <input className="font-bold bg-transparent outline-none w-full mb-2 text-slate-800" value={item.title} onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[idx].title = e.target.value;
                        setFormData({...formData, features: newFeatures});
                      }} />
                      <textarea className="w-full bg-transparent outline-none text-sm text-slate-500" rows={2} value={item.description} onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[idx].description = e.target.value;
                        setFormData({...formData, features: newFeatures});
                      }} />
                      <div className="text-[10px] font-mono text-blue-400 mt-2">Icon: {item.iconId}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h4 className="font-bold text-slate-800">Map & Description Overview</h4>
                <label className="text-[10px] font-bold uppercase text-slate-400 block">Overview Description</label>
                <textarea className="w-full p-6 bg-slate-50 rounded-[2rem] outline-none text-sm leading-relaxed" rows={6} value={formData.overview.description} onChange={(e) => updateNested('overview.description', e.target.value)} />
                <label className="text-[10px] font-bold uppercase text-slate-400 block">Google Maps Embed URL</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-mono text-[10px]" value={formData.contact.mapUrl} onChange={(e) => updateNested('contact.mapUrl', e.target.value)} />
              </div>
            )}

            {/* TERMS TAB */}
            {activeTab === 'terms' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><CreditCard size={18} className="text-orange-500"/> Bank Details</h4>
                    <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold" placeholder="Bank Name" value={formData.terms.payment.bank.name} onChange={(e) => updateNested('terms.payment.bank.name', e.target.value)} />
                    <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none" placeholder="Account No" value={formData.terms.payment.bank.accountNo} onChange={(e) => updateNested('terms.payment.bank.accountNo', e.target.value)} />
                    <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none" placeholder="Account Name" value={formData.terms.payment.bank.accountName} onChange={(e) => updateNested('terms.payment.bank.accountName', e.target.value)} />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><ShieldCheck size={18} className="text-green-500"/> Steps / Conditions</h4>
                    {formData.terms.steps.map((step: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
                        <input className="flex-grow p-3 bg-slate-50 rounded-xl outline-none text-sm" value={step} onChange={(e) => {
                          const newSteps = [...formData.terms.steps];
                          newSteps[idx] = e.target.value;
                          updateNested('terms.steps', newSteps);
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}