import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import ContactForm from "@/components/home/ContactForm";
import HowItWorks from "@/components/home/HowItWorks";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";
import CTASection from "@/components/home/CTASection";
import { company } from "@/data/company";

// JSON-LD Schema for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  description: company.seo.defaultDescription,
  telephone: company.contact.phone,
  email: company.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    addressCountry: company.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.4521,
    longitude: 11.0767,
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 49.4521,
      longitude: 11.0767,
    },
    geoRadius: "100000",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "$$",
  image: "https://rohrreinigung-kraft.de/og-image.jpg",
  url: "https://rohrreinigung-kraft.de",
  sameAs: [],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Rohrreinigung Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Rohrreinigung",
          description: "Professionelle Beseitigung von Rohrverstopfungen",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kanalreinigung",
          description: "Komplette Reinigung von Kanalsystemen",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Notdienst 24/7",
          description: "Rund um die Uhr erreichbar für Notfälle",
        },
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Section */}
      <TrustSection />

      {/* 3. Contact Form */}
      <ContactForm />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Why Us */}
      <WhyUs />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. Gallery */}
      <Gallery />

      {/* 8. CTA Section */}
      <CTASection />
    </>
  );
}
