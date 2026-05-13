"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Phone, Home, Zap } from "lucide-react";
import { company } from "@/data/company";
import { trackCTAClick } from "@/lib/tracking";
import CallConfirmModal from "./CallConfirmModal";

export default function FloatingButtons() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const handlePhoneClick = () => {
    setIsCallModalOpen(true);
  };

  const handleContactClick = () => {
    trackCTAClick("contact_form", "floating_button");
    const contactSection = document.getElementById("kontakt");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/kontakt";
    }
  };

  return (
    <>
      {/* Call Confirmation Modal */}
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source="floating_button"
      />

      {/* Back to Home Button - Only show on non-homepage */}
      {!isHomePage && (
        <div className="fixed bottom-20 left-3 md:bottom-6 md:left-6 z-50">
          <Link
            href="/"
            className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 rounded-full shadow-lg transition-colors"
            aria-label="Zurück zur Startseite"
          >
            <Home className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </Link>
        </div>
      )}

      {/* Right side buttons - Mobile optimized */}
      <div className="fixed bottom-3 right-3 md:bottom-6 md:right-6 z-50 flex flex-col gap-2 md:gap-3">
        {/* Soforthilfe Button */}
        <button
          type="button"
          onClick={handleContactClick}
          className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 gradient-primary rounded-full shadow-lg shadow-primary/30 transition-colors active:scale-95"
          aria-label="Soforthilfe anfordern"
        >
          <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>

        {/* Phone Button */}
        <button
          type="button"
          onClick={handlePhoneClick}
          className="flex items-center justify-center w-12 h-12 md:w-auto md:px-5 md:py-3 bg-[#3AB0FF] rounded-full shadow-lg shadow-[#3AB0FF]/30 transition-colors active:scale-95"
          aria-label="Jetzt anrufen"
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
          <span className="hidden md:inline text-white font-bold text-sm ml-2">
            Anrufen
          </span>
        </button>
      </div>
    </>
  );
}
