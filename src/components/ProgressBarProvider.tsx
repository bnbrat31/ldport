"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

// Konfigurasi warna oranye sesuai brand Lovina Dolphin
nProgress.configure({ showSpinner: false });

export default function ProgressBarProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Selesaikan progress bar saat path berubah
    nProgress.done();
    
    return () => {
      // Mulai progress bar saat komponen di-unmount (pindah page)
      nProgress.start();
    };
  }, [pathname, searchParams]);

  return null;
}