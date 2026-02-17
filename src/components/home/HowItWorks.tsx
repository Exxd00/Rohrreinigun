"use client";

import { Phone, Truck, CheckCircle } from "lucide-react";
import { howItWorks } from "@/data/company";

const iconMap: Record<string, React.ElementType> = {
  phone: Phone,
  truck: Truck,
  check: CheckCircle,
};

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            So einfach geht&apos;s
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            In nur 3 Schritten zur schnellen Lösung Ihres Rohrproblems
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-[16.5%] right-[16.5%] h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />

            {/* Always horizontal grid - 3 cols */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
              {howItWorks.map((step, index) => {
                const Icon = iconMap[step.icon] || Phone;
                return (
                  <div
                    key={step.step}
                    className="relative text-center group"
                  >
                    {/* Step number */}
                    <div className="relative inline-flex items-center justify-center mb-3 sm:mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full gradient-primary flex items-center justify-center shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-secondary text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-lg">
                        {step.step}
                      </div>
                    </div>

                    <h3 className="text-xs sm:text-base md:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3 line-clamp-2">
                      {step.title}
                    </h3>
                    <p className="hidden sm:block text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xs mx-auto line-clamp-2">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
