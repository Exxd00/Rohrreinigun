"use client";

import { Phone, MessageCircle } from "lucide-react";
import { company } from "@/data/company";
import { trackPhoneClick, trackWhatsAppClick } from "@/lib/tracking";

export default function FloatingButtons() {
  const phoneLink = `tel:${company.contact.phone}`;
  const whatsappLink = `https://wa.me/${company.contact.whatsapp.replace(/\+|\s/g, "")}?text=Hallo, ich benötige Hilfe bei einer Rohrverstopfung.`;

  const handlePhoneClick = () => {
    trackPhoneClick("floating_button");
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("floating_button");
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp Kontakt"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />

        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />

        {/* Tooltip - hidden on mobile */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp schreiben
        </span>
      </a>

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
