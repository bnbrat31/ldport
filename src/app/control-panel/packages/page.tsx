"use client";

import { useState } from "react";
import packagesData from "@/data/packages.json";
import { Plus, Trash2, Edit3, Save, X, ImageIcon, MoreVertical, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Package {
  id: string;
  title: string;
  duration: string;
  sharingPrice: number;
  privatePrice: number;
  included: string[];
  images: string[];
}

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>(packagesData);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Untuk Modal/Drawer
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<Package>({
    id: "", title: "", duration: "", sharingPrice: 0, privatePrice: 0, included: [""], images: [""]
  });

  const saveToJSON = async (updatedData: Package[]) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        body: JSON.stringify({ type: "packages", newData: updatedData }),
      });
      if (res.ok) {
        setPackages(updatedData);
        closeModal();
      }
    } catch (error) { alert("Gagal menyimpan data."); }
    setIsSaving(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const updated = packages.map(pkg => pkg.id === formData.id ? formData : pkg);
      saveToJSON(updated);
    } else {
      const newPkg = { ...formData, id: Date.now().toString() };
      saveToJSON([...packages, newPkg]);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setFormData({ id: "", title: "", duration: "", sharingPrice: 0, privatePrice: 0, included: [""], images: [""] });
  };

  const handleEdit = (pkg: Package) => {
    setFormData(pkg);
    setIsEditing(true);
    setIsOpen(true);
  };

  const deletePackage = (id: string) => {
    if (confirm("Hapus paket ini?")) {
      const updated = packages.filter((pkg) => pkg.id !== id);
      saveToJSON(updated);
    }
  };

  const updateArrayField = (field: 'included' | 'images', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  return (
    <div className="space-y-6">
      {/* HEADER COMPACT */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">Tour Packages</h1>
          <p className="text-sm text-slate-500">{packages.length} Total Packages</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-3 md:px-6 md:py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg active:scale-95"
        >
          <Plus size={20} />
          <span className="hidden md:inline font-bold">New Package</span>
        </button>
      </div>

      {/* TABLE LIST */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Package</th>
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Duration</th>
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Price (Sharing)</th>
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest">Price (Private)</th>
                <th className="p-6 text-[10px] font-bold uppercase text-slate-400 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        <img src={pkg.images[0]} className="w-full h-full object-cover" alt="" />
                      </div>
                      <span className="font-bold text-slate-800">{pkg.title}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm text-slate-500 font-medium">{pkg.duration}</td>
                  <td className="p-6 text-sm text-slate-600 font-bold">Rp {pkg.sharingPrice.toLocaleString('id-ID')}</td>
                  <td className="p-6 text-sm text-slate-600 font-bold">Rp {pkg.privatePrice.toLocaleString('id-ID')}</td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(pkg)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18}/></button>
                      <button onClick={() => deletePackage(pkg.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OVERLAY & DRAWER FORM */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold text-slate-900 font-poppins">{isEditing ? "Edit" : "New"} Package</h2>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={24}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Title</label>
                  <input required className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Duration</label>
                    <input className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Sharing Price</label>
                    <input type="number" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" value={formData.sharingPrice || ""} onChange={(e) => setFormData({...formData, sharingPrice: parseInt(e.target.value)})} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Private Price</label>
                  <input type="number" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" value={formData.privatePrice || ""} onChange={(e) => setFormData({...formData, privatePrice: parseInt(e.target.value)})} />
                </div>

                {/* DYNAMIC LISTS */}
                {['included', 'images'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-slate-400 tracking-widest capitalize">{field}</label>
                    {formData[field as 'included' | 'images'].map((val, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input className="flex-grow p-3 bg-slate-50 rounded-xl text-xs outline-none focus:bg-white border border-transparent focus:border-blue-100" value={val} onChange={(e) => updateArrayField(field as any, idx, e.target.value)} />
                        <button type="button" onClick={() => setFormData({...formData, [field]: formData[field as 'included' | 'images'].filter((_, i) => i !== idx)})} className="text-red-300 hover:text-red-500"><Trash2 size={14}/></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => setFormData({...formData, [field]: [...formData[field as 'included' | 'images'], ""]})} className="text-[10px] font-bold text-blue-600 hover:underline">+ ADD NEW {field.toUpperCase()}</button>
                  </div>
                ))}

                <button 
                  type="submit" disabled={isSaving}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Save size={18} /> {isSaving ? "Processing..." : isEditing ? "Update Package" : "Create Package"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}