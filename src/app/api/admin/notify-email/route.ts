import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { pkgTitle, timestamp } = await req.json();
    

    // Konfigurasi Transporter (Contoh menggunakan Gmail)
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true untuk port 465, false untuk port lainnya
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    const mailOptions = {
      from: `"Lovina Dolphin Web" <${process.env.EMAIL_USER}>`,
      to: "bhakti.pratama.70@gmail.com", // Email Anda (Penerima)
      subject: `🔔 New Lead: ${pkgTitle}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #f97316;">New Booking Interest!</h2>
          <p>Seseorang baru saja mengklik tombol <strong>Book Now</strong>.</p>
          <hr />
          <p><strong>Paket:</strong> ${pkgTitle}</p>
          <p><strong>Waktu:</strong> ${new Date(timestamp).toLocaleString('id-ID')}</p>
          <hr />
          <p style="font-size: 12px; color: #888;">Notifikasi otomatis dari Website Lovina Dolphin Watching.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent" });
  } catch (error: any) {
  console.error("DETAILED EMAIL ERROR:", error); // Muncul di Terminal
  return NextResponse.json(
    { message: "Failed to send email", details: error.message }, 
    { status: 500 }
  );
  }
}