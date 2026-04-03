"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Phone, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company } from "@/data/company";
import { trackThankYouPage, trackPhoneClick } from "@/lib/tracking";

export default function ThankYouPage() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check if user came from form submission
    const formSubmitted = sessionStorage.getItem("form_submitted");

    if (formSubmitted === "true") {
      setIsValid(true);
      // Track thank you page view for conversion tracking
      trackThankYouPage();
      // Clear the flag after successful access
      sessionStorage.removeItem("form_submitted");
    } else {
      // Redirect to home if accessed directly
      router.replace("/");
    }
  }, [router]);

  const handlePhoneClick = () => {
    trackPhoneClick("thank_you_page");
  };

  // Don't render anything while checking or if invalid
  if (!isValid) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </main>
    );
  }

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

          <div className="flex justify-center">
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
