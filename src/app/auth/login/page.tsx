"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      ...form,
      redirect: true,
      callbackUrl: "/control-panel",
    });
    if (!res?.ok) setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-slate-50 px-6">
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-[450px] w-full bg-white p-8 md:p-12 md:rounded-xl md:border md:border-slate-200 shadow-none md:shadow-sm"
  >
    {/* Google Style Identity */}
    <div className="text-center mb-10">
      <div className="flex justify-center mb-4">
        {/* Placeholder untuk Logo Anda */}
        <div className="text-2xl font-medium tracking-tight font-poppins">
          <Image src="/apple-touch-icon.png" alt="Logo" width={100} height={100} />
        </div>
      </div>
      <h1 className="text-2xl font-normal text-slate-900 mb-2">Sign in</h1>
      <p className="text-base text-slate-700 font-roboto">Use your Admin Account</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative group">
        <input 
          required
          type="text" 
          placeholder="Username"
          className="peer w-full p-4 pt-5 pb-3 bg-white border border-slate-300 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder-transparent"
          onChange={(e) => setForm({...form, username: e.target.value})}
          id="username"
        />
        <label 
          htmlFor="username"
          className="absolute left-4 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-blue-600 peer-focus:text-xs"
        >
          Username
        </label>
      </div>

      <div className="relative group">
        <input 
          required
          type="password" 
          placeholder="Password"
          className="peer w-full p-4 pt-5 pb-3 bg-white border border-slate-300 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder-transparent"
          onChange={(e) => setForm({...form, password: e.target.value})}
          id="password"
        />
        <label 
          htmlFor="password"
          className="absolute left-4 -top-2.5 bg-white px-1 text-xs text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-blue-600 peer-focus:text-xs"
        >
          Password
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm italic">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 pt-4">
        <button 
          type="button"
          className="text-blue-600 font-bold text-sm hover:bg-blue-50 px-2 py-1 rounded transition-colors"
        >
          Forgot username?
        </button>
        <button className="bg-blue-600 text-white px-8 py-2.5 rounded text-sm font-bold hover:bg-blue-700 transition-all shadow-sm active:bg-blue-800">
          Next
        </button>
      </div>
    </form>
    
    <div className="mt-12 text-sm text-slate-500 flex justify-between">
      <p>English (United States)</p>
      <div className="flex gap-4">
        <span>Help</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </div>
  </motion.div>
</div>
  );
}