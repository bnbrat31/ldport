import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

// Kita bungkus middleware NextAuth ke dalam fungsi agar memenuhi syarat "must export a function"
export default function proxy(req: NextRequest, event: any) {
  return withAuth(
    function middleware(req) {
      // Logika tambahan bisa di sini
    },
    {
      callbacks: {
        authorized: ({ token }) => !!token,
      },
    }
  )(req as any, event);
}

// Tetap gunakan matcher agar tidak membebani rute public
export const config = { 
  matcher: ["/control-panel/:path*"] 
};