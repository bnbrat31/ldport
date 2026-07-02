// lib/track.ts
export const trackLead = async (label: string) => {
  // Jalankan di background (tidak perlu await agar tidak menghambat user)
  fetch("/api/admin/notify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pkgTitle: label, // Kita gunakan label sebagai pengganti pkgTitle
      timestamp: new Date().toISOString(),
    }),
  }).catch((err) => console.error("Tracking error:", err));
};