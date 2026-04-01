"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { beforeAfterGallery } from "@/data/company";

interface BeforeAfterSliderProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function BeforeAfterSlider({ isOpen, onClose, initialIndex = 0 }: BeforeAfterSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = beforeAfterGallery[currentIndex];

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let clientX: number;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = e.clientX;
      }

      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.min(Math.max(percentage, 5), 95));
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setSliderPosition(50);
  }, [initialIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? beforeAfterGallery.length - 1 : prev - 1));
    setSliderPosition(50);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === beforeAfterGallery.length - 1 ? 0 : prev + 1));
    setSliderPosition(50);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-1 -right-1 md:top-2 md:right-2 z-50 w-10 h-10 md:w-12 md:h-12 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center text-white transition-all shadow-lg"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
        </button>

        <div className="bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          {/* Comparison container */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] cursor-ew-resize select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            {/* After image */}
            <div className="absolute inset-0">
              <img src={currentItem.afterImage} alt="Nachher" className="w-full h-full object-cover" draggable={false} />
            </div>

            {/* Before image (clipped) */}
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <img
                src={currentItem.beforeImage}
                alt="Vorher"
                className="absolute inset-0 h-full object-cover"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%', maxWidth: 'none' }}
                draggable={false}
              />
            </div>

            {/* Labels */}
            <span className="absolute top-2 left-2 md:top-4 md:left-4 z-10 px-2 py-1 md:px-4 md:py-2 bg-orange-500 text-white font-bold text-xs md:text-sm rounded-md md:rounded-lg shadow-lg uppercase">Vorher</span>
            <span className="absolute top-2 right-10 md:top-4 md:right-14 z-10 px-2 py-1 md:px-4 md:py-2 bg-teal-500 text-white font-bold text-xs md:text-sm rounded-md md:rounded-lg shadow-lg uppercase">Nachher</span>

            {/* Navigation */}
            <button onClick={(e) => { e.stopPropagation(); goToPrevious(); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center text-white">
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goToNext(); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-500/90 hover:bg-teal-600 flex items-center justify-center text-white">
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Slider handle */}
            <div className="absolute top-0 bottom-0 z-30 pointer-events-none" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}>
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/80 -translate-x-1/2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-teal-500 pointer-events-auto cursor-ew-resize" onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
                <div className="grid grid-cols-2 gap-0.5 md:gap-1">
                  {[...Array(6)].map((_, i) => <div key={i} className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-teal-500" />)}
                </div>
              </div>
            </div>

            {/* Instruction */}
            <span className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 md:px-4 md:py-2 bg-gray-900/80 text-white text-xs md:text-sm rounded-full">Schieben zum Vergleichen</span>
          </div>

          {/* Project info - compact */}
          <div className="p-3 md:p-5 bg-gray-900 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                <span className="text-gray-400 text-xs">Projekt</span>
              </div>
              <h3 className="text-white text-sm md:text-lg font-bold truncate">{currentItem.title}</h3>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {beforeAfterGallery.map((_, index) => (
                <button key={index} onClick={() => { setCurrentIndex(index); setSliderPosition(50); }} className={`h-1.5 md:h-2 rounded-full transition-all ${index === currentIndex ? "bg-green-500 w-4 md:w-6" : "bg-gray-600 w-1.5 md:w-2"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
