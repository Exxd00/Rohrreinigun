"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Phone, MessageCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { trackThankYouPage, trackPhoneClick, trackWhatsAppClick } from "@/lib/tracking";

export default function ThankYouPage() {
  useEffect(() => {
    // Track thank you page view for conversion tracking
    trackThankYouPage();
  }, []);

  const handlePhoneClick = () => {
    trackPhoneClick("thank_you_page");
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("thank_you_page");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center animate-bounce-once">
            <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Vielen Dank!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.
        </p>

        {/* Contact Info Box */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Für dringende Notfälle:
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Phone Button */}
            <a
              href={`tel:${company.contact.phone}`}
              onClick={handlePhoneClick}
              className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-green-700 dark:text-green-400 text-sm">
                Anrufen
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {company.contact.phoneDisplay}
              </span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${company.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-green-700 dark:text-green-400 text-sm">
                WhatsApp
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Jetzt schreiben
              </span>
            </a>
          </div>
        </div>

        {/* Back Home Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Zur Startseite
            </Link>
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          {company.name} - {company.tagline}
        </p>
      </div>
    </main>
  );
}
