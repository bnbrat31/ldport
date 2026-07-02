"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";

export default function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1. Fetch Data
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 2. Fungsi Copy Link
  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 3. Fungsi Delete
  const handleDelete = async (publicId: string) => {
  // 1. Konfirmasi sebelum hapus (Safety)
  if (!confirm("Apakah Anda yakin ingin menghapus foto ini secara permanen?")) return;

  setDeletingId(publicId);
  try {
    const res = await fetch(`/api/gallery/${encodeURIComponent(publicId)}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // 2. Alert Berhasil
      alert("✅ Foto berhasil dihapus dari Cloudinary!");
      
      // Update state untuk menghilangkan gambar dari layar tanpa refresh
      setImages((prev) => prev.filter((img) => img.id !== publicId));
    } else {
      const errorData = await res.json();
      console.error("Cloudinary Error:", errorData);
      alert(`❌ Gagal menghapus: ${errorData.error || "Terjadi kesalahan"}`);
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("❌ Terjadi kesalahan jaringan saat mencoba menghapus.");
  } finally {
    setDeletingId(null);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Gallery <span className="text-orange-500">Control</span>
            </h1>
            <p className="text-slate-500 mt-2">Upload, copy links, or remove assets.</p>
          </motion.div>

          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={() => fetchImages()}
            options={{
              sources: ["local", "url", "camera"],
              multiple: true,
              folder: "lovina-gallery",
            }}
          >
            {({ open }) => (
              <button
                onClick={() => open()}
                className="bg-slate-900 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl transition-all active:scale-95 flex items-center gap-3"
              >
                <ImageIcon size={20} />
                Upload Photos
              </button>
            )}
          </CldUploadWidget>
        </header>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {images.map((img: any, index: number) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                  className="group relative aspect-square rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <Image
                    src={img.url}
                    alt="Gallery asset"
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    priority={index < 8}
                    className={`object-cover transition-all duration-500 ${deletingId === img.id ? 'grayscale blur-sm' : 'group-hover:scale-110'}`}
                  />
                  
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 p-4">
                    <div className="flex gap-2">
                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopy(img.url, img.id)}
                        className="bg-white text-slate-900 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                        title="Copy Link"
                      >
                        {copiedId === img.id ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(img.id)}
                        disabled={deletingId === img.id}
                        className="bg-white text-red-600 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-lg disabled:opacity-50"
                        title="Delete Photo"
                      >
                        {deletingId === img.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                    <span className="text-[10px] text-white/70 font-mono truncate w-full text-center px-2">
                      {img.id.split('/').pop()}
                    </span>
                  </div>

                  {/* Feedback Tags */}
                  {copiedId === img.id && (
                    <div className="absolute top-3 left-3 right-3 bg-green-500 text-white text-[10px] py-1 rounded-full text-center font-bold shadow-lg">
                      Copied!
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[40px] border border-slate-100 shadow-inner">
            <ImageIcon size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">Your gallery is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}