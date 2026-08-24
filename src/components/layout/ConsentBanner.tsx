"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ConsentChoice = "accepted" | "rejected";

const CONSENT_KEY = "rk_nuernberg_consent";

const updateConsent = (choice: ConsentChoice) => {
  const granted = choice === "accepted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: granted,
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
  });
  localStorage.setItem(CONSENT_KEY, choice);
};

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!localStorage.getItem(CONSENT_KEY));
  }, []);

  if (!isVisible) return null;

  const choose = (choice: ConsentChoice) => {
    updateConsent(choice);
    setIsVisible(false);
  };

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-3xl rounded-2xl border border-sky-200 bg-white/95 p-4 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 md:flex md:items-center md:gap-5 md:p-5"
      aria-label="Cookie-Einstellungen"
    >
      <div className="flex-1">
        <p className="font-semibold text-slate-950 dark:text-white">
          Datenschutz-Einstellungen
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Wir verwenden Google Analytics und Google Ads nur mit Ihrer
          Zustimmung. Notwendige Funktionen der Website bleiben immer aktiv.
          Mehr dazu in unserer{" "}
          <Link
            href="/datenschutz"
            className="font-medium text-primary underline"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:mt-0 md:w-72">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Ablehnen
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Zustimmen
        </button>
      </div>
    </aside>
  );
}
