"use client";

import { Phone, Mail } from "lucide-react";
import { company } from "@/data/company";
import { trackPhoneClick, trackCTAClick } from "@/lib/tracking";

export default function FloatingButtons() {
  const phoneLink = `tel:${company.contact.phone}`;

  const handlePhoneClick = () => {
    trackPhoneClick("floating_button");
  };

  const handleContactClick = () => {
    trackCTAClick("contact_form", "floating_button");
    // Scroll to contact form section
    const contactSection = document.getElementById("kontakt");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on homepage, navigate to kontakt page
      window.location.href = "/kontakt";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3">
      {/* Contact Form Button */}
      <button
        type="button"
        onClick={handleContactClick}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-110"
        aria-label="Kontaktformular"
      >
        <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />

        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />

        {/* Tooltip - hidden on mobile */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Anfrage senden
        </span>
      </button>

      {/* Phone Button */}
      <a
        href={phoneLink}
        onClick={handlePhoneClick}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 gradient-primary rounded-full shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 btn-shimmer"
        aria-label="Anrufen"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6 text-white animate-bounce-gentle" />

        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full gradient-primary animate-ping opacity-30" />

        {/* Tooltip - hidden on mobile */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Jetzt anrufen - 24/7
        </span>
      </a>
    </div>
  );
}
