import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* reactCompiler sudah benar jika Anda menggunakan Next.js 15 */
  experimental: {
    // reactCompiler: true, // Pastikan ini berada di dalam experimental jika menggunakan versi 15 early/RC
  },
  images: {
    // remotePatterns jauh lebih aman daripada sekadar 'domains'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // Mengizinkan semua path dari domain ini
      },
    ],
  },
};

export default nextConfig;