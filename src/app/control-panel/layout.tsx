"use client";

import { useState } from "react";
import { Layout, Package, MessageSquare, LogOut, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "General Settings", icon: Layout, href: "/control-panel" },
    { name: "Tour Packages", icon: Package, href: "/control-panel/packages" },
    { name: "Testimonials", icon: MessageSquare, href: "/control-panel/testimonials" },
    { name: "Gallery", icon: MessageSquare, href: "/control-panel/gallery" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-8">
      <h2 className="font-poppins font-bold text-2xl mb-12 italic text-orange-400">
        Control Panel<span className="text-white">3.0</span>
      </h2>
      
      <nav className="space-y-2 flex-grow">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <button 
        onClick={() => signOut()}
        className="flex items-center gap-3 p-4 text-red-400 hover:bg-red-400/10 rounded-2xl transition-all mt-auto"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex ">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-72 bg-slate-900 shadow-2xl sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 flex justify-between items-center">
        <span className="font-bold italic text-orange-400 text-xl">Aethelia.</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-slate-900 z-40 lg:hidden"
          >
            <div className="pt-20 h-full">
              <SidebarContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow p-6 lg:p-12 mt-16 lg:mt-0">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}