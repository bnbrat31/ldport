import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  try {
    const resolvedParams = await params;
    let publicId = decodeURIComponent(resolvedParams.publicId);
    
    // PERBAIKAN: Pastikan folder path ikut terbawa
    // Jika publicId tidak diawali dengan 'lovina-gallery/', kita tambahkan
    const folderName = "ldport";
    if (!publicId.includes("/")) {
      publicId = `${folderName}/${publicId}`;
    }

    console.log("Attempting to delete:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      return NextResponse.json({ message: 'Deleted' });
    } else {
      // Jika masih gagal, kirim detail error dari Cloudinary
      return NextResponse.json({ 
        error: 'Cloudinary rejected the delete', 
        details: result 
      }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}