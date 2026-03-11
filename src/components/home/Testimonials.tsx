"use client";

import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/company";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Kundenstimmen
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Das sagen unsere Kunden
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Überzeugen Sie sich selbst von unserem Service
          </p>
        </div>

        {/* Always horizontal grid - 3 cols on all sizes */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover-lift transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-2 sm:-top-3 md:-top-4 left-3 sm:left-4 md:left-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                  <Quote className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 sm:gap-1 mb-2 sm:mb-3 md:mb-4 pt-3 sm:pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${
                      i < testimonial.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed italic line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 dark:text-white truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-full">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              4.9/5 basierend auf über 200 Bewertungen
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
