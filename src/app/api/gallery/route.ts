import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Mencari file di folder 'lovina-gallery' (sesuaikan nama foldernya)
    const results = await cloudinary.search
      .expression('folder:ldport/') 
      .sort_by('created_at', 'desc')
      .max_results(20)
      .execute();

    const images = results.resources.map((resource: any) => ({
      id: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
    }));

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}