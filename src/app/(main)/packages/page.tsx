import Packages from "@/section/Packages";  
import Contacts from "@/section/contacts";
import packagesData from "@/data/packages.json";


export const metadata = {
  title: "Dolphin Tour Packages Lovina | Prices & Snorkeling Deals",
  description: "Pilihan paket tour lumba-lumba Lovina terlengkap. Mulai dari paket reguler, private boat, hingga kombinasi snorkeling. Cek harga terbaru dan pesan via WhatsApp.",
};

export default function PackagesPage() {

  const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": packagesData.map((pkg, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Product",
      "name": pkg.title,
      "image": pkg.images[0],
      "description": `${pkg.duration} tour including ${pkg.included.join(", ")}`,
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": pkg.sharingPrice,
        "highPrice": pkg.privatePrice,
        "priceCurrency": "IDR"
      }
    }
  }))
}; 

  return (
    <div className="min-h-screen">
      <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
      <Packages />
      <Contacts />
    </div>
  );
}
   