"use client";

import { Clock, Truck, Wrench, MessageSquare, Euro, Home } from "lucide-react";
import { company } from "@/data/company";

const iconMap: Record<string, React.ElementType> = {
  clock: Clock,
  truck: Truck,
  wrench: Wrench,
  chat: MessageSquare,
  euro: Euro,
  home: Home,
};

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Ihre Vorteile
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Warum Rohrreinigung Kraft?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Vertrauen Sie auf jahrelange Erfahrung und modernste Technik
          </p>
        </div>

        {/* Always horizontal grid - 2 cols on mobile, 3 on larger */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {company.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Clock;
            return (
              <div
                key={feature.title}
                className="group relative bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center mb-2 sm:mb-3 md:mb-5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 md:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {feature.title}
                </h3>
                <p className="hidden sm:block text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                  {feature.description}
                </p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
