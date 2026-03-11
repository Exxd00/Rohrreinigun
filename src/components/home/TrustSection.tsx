"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, Users, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    value: "10+",
    label: "Jahre Erfahrung",
    suffix: "",
  },
  {
    icon: Users,
    value: "2000+",
    label: "Zufriedene Kunden",
    suffix: "",
  },
  {
    icon: Award,
    value: "98",
    label: "Kundenzufriedenheit",
    suffix: "%",
  },
  {
    icon: Clock,
    value: "30-60",
    label: "Min Anfahrt",
    suffix: "",
  },
];

const partners = [
  "Professionelle Maschinen",
  "Moderne Hochdrucktechnik",
  "TV-Kamerainspektion",
  "Grabenlose Sanierung",
];

export default function TrustSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Stats Grid - Always horizontal 4 cols */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover-lift transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center mb-1 sm:mb-2 md:mb-4 shadow-lg shadow-primary/30">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                  </div>
                  <div className="text-base sm:text-xl md:text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1 md:mb-2">
                    {stat.value}
                    <span className="text-[#ffffff]">{stat.suffix}</span>
                  </div>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium line-clamp-2">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative corner - hidden on mobile */}
                <div className="hidden md:block absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rotate-45" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Partners / Technologies */}
        <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
              Unsere Ausstattung & Technologie
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Professionelle Maschinen & moderne Technik
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {partners.map((partner, index) => (
              <div
                key={partner}
                className={`px-6 py-3 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {partner}
                </span>
              </div>
            ))}
          </div>

          {/* Animated background */}
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}
