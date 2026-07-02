"use client";

import { useState } from "react";
import testimonialsData from "@/data/testimonials.json";
import { Plus, Trash2, Edit3, Save, X, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string; // Gunakan string karena di JSON Anda "id": "6"
  name: string;
  origin: string;
  rating: number;
  date: string;
  text: string;
}

export default function AdminTestimonials() {
  // Kita mapping data awal untuk memastikan semua ID adalah string
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    testimonialsData.testimonials.map((t: any) => ({
      ...t,
      id: t.id.toString() 
    }))
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<Testimonial>({
    id: "", 
    name: "", 
    origin: "", 
    rating: 5, 
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), 
    text: ""
  });

  const saveToJSON = async (updatedData: Testimonial[]) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        body: JSON.stringify({ 
          type: "testimonials", 
          newData: { testimonials: updatedData } 
        }),
      });
      if (res.ok) {
        setTestimonials(updatedData);
        closeModal();
      }
    } catch (error) {
      alert("Gagal menyimpan data.");
    }
    setIsSaving(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const updated = testimonials.map(t => t.id === formData.id ? formData : t);
      saveToJSON(updated);
    } else {
      // Buat ID baru sebagai string
      const newTesti = { ...formData, id: Date.now().toString() }; 
      saveToJSON([...testimonials, newTesti]);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setFormData({ id: "", name: "", origin: "", rating: 5, date: "", text: "" });
  };

  const handleEdit = (testi: Testimonial) => {
    setFormData(testi);
    setIsEditing(true);
    setIsOpen(true);
  };

  const deleteTestimonial = (id: string) => {
    if (confirm("Hapus testimoni ini?")) {
      const updated = testimonials.filter((t) => t.id !== id);
      saveToJSON(updated);
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">Guest Reviews</h1>
          <p className="text-sm text-slate-500">{testimonials.length} Testimonials</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-slate-900 text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg">
          <Plus size={20} />
          <span className="hidden md:inline font-bold">Add Review</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Guest</th>
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Date</th>
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Review</th>
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {testimonials.map((testi) => (
                <tr key={testi.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-slate-800 text-sm">{testi.name}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-medium">{testi.origin}</div>
                  </td>
                  <td className="p-6 text-xs text-slate-500">{testi.date}</td>
                  <td className="p-6 max-w-xs text-sm text-slate-500 italic truncate">"{testi.text}"</td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(testi)} className="p-2 text-slate-400 hover:text-blue-600"><Edit3 size={16}/></button>
                      <button onClick={() => deleteTestimonial(testi.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWER FORM */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold font-poppins">{isEditing ? "Edit Review" : "New Review"}</h2>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
  <div>
    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block mb-2">Guest Name</label>
    <input required className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block mb-2">Origin</label>
      <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none" value={formData.origin} onChange={(e) => setFormData({...formData, origin: e.target.value})} />
    </div>
    
    {/* INPUT RATING */}
    <div>
      <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block mb-2">Rating (1-5)</label>
      <div className="flex items-center gap-2 bg-slate-50 p-3.5 rounded-2xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFormData({ ...formData, rating: star })}
            className={`transition-all ${formData.rating >= star ? 'text-orange-400' : 'text-slate-200'}`}
          >
            <Star size={20} fill={formData.rating >= star ? "currentColor" : "none"} />
          </button>
        ))}
      </div>
    </div>
  </div>

  <div>
    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest block mb-2">Review Text</label>
    <textarea rows={6} required className="w-full p-4 bg-slate-50 rounded-2xl outline-none text-sm" value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} />
  </div>

  <button type="submit" disabled={isSaving} className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
    <Save size={18} /> {isSaving ? "Saving..." : "Save Review"}
  </button>
</form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}