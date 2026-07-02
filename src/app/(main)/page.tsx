
import IntroSection from "@/section/Intro";
import Features from "@/section/Features";
import PackagesSection from "@/section/Packages";
import Overview from "@/section/Overview";
import Terms from "@/section/Terms";
import Testimonials from "@/section/Testimonial";
import Contacts from "@/section/contacts";

import HeroSection from "@/section/Hero";



export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lovina Dolphin Port",
    "image": "https://res.cloudinary.com/dv7z1c2xj/image/upload/v1773589366/Lovina-Dolphin_jjlu3b.png",
    "telephone": "+6282266003334",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pantai Lovina",
      "addressLocality": "Buleleng",
      "addressRegion": "Bali",
      "postalCode": "81152",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -8.1611,
      "longitude": 115.0233
    },
    "url": "https://lovinadolphinport.com"
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
     
      
      <HeroSection />

      <IntroSection />
      <Features />
      <PackagesSection />
      <Overview />
      <Terms />
      <Testimonials />
      <Contacts />
    
      
      
    </div>
  );
}