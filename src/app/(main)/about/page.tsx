
import Contacts from "@/section/contacts";
import Features from "@/section/Features";

import Overview from "@/section/Overview";  
import Testimonials from "@/section/Testimonial";


export const metadata = {
  title: "Meet Captain Ketut | 10+ Years Experience at Lovina Dolphin Port",
  description: "Learn more about Captain Ketut Suirta and our safety-certified boats. We prioritize your comfort and safety for the best dolphin watching experience in North Bali.",
};

export default function AboutPage() {

  const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Captain Ketut Suirta",
  "jobTitle": "Professional Boat Captain",
  "knowsAbout": ["Dolphin Watching", "Marine Navigation", "Lovina Tourism"],
  "image": "https://res.cloudinary.com/dv7z1c2xj/image/upload/v1773589359/kaptenketut_dttfdw.jpg",
    "worksFor": {
    "@type": "LocalBusiness",
    "name": "Lovina Dolphin Port"
  }
};
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Features />
      <Testimonials />
      <Overview />
      <Contacts />
    </div>
  );
}

