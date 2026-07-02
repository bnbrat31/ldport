import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";


export async function POST(req: Request) {
  try {
    // 1. Cek Autentikasi
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil data dari body
    const { type, newData } = await req.json();

    if (!type || !newData) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    // 3. Tentukan Path (Pastikan folder 'data' ada di root project)
    const folderPath = path.join(process.cwd(), "src", "data"); // Sesuaikan jika folder data ada di dalam 'src'
    // Jika folder data ada di root (luar src), gunakan: path.join(process.cwd(), "data")
    
    const filePath = path.join(folderPath, `${type}.json`);

    // 4. Cek apakah folder ada, jika tidak buat foldernya
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // 5. Tulis file
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), "utf8");

    return NextResponse.json({ message: "Update Successful" });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Update Failed", error: error.message }, 
      { status: 500 }
    );
  }
}