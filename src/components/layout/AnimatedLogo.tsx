"use client";

import { useState, useEffect } from "react";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function AnimatedLogo({ size = "md" }: AnimatedLogoProps) {
  const [activeShape, setActiveShape] = useState(0);
  const shapes = ["pipe", "water", "tool"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveShape((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      {/* Background circle */}
      <div className="absolute inset-0 gradient-primary rounded-xl shadow-lg shadow-primary/30" />

      {/* Animated shapes */}
      <svg
        viewBox="0 0 40 40"
        className="relative w-full h-full p-2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pipe Shape */}
        <g
          className={`transition-all duration-500 ${
            activeShape === 0 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M8 12h8v4H8v-4zM16 8h8v4h-8V8zM24 12h8v4h-8v-4zM16 12h4v12h-4V12zM12 24h16v4H12v-4z"
            fill="white"
            className="animate-pulse-slow"
          />
        </g>

        {/* Water Drop Shape */}
        <g
          className={`transition-all duration-500 ${
            activeShape === 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M20 4c0 0-10 12-10 20 0 5.5 4.5 10 10 10s10-4.5 10-10C30 16 20 4 20 4z"
            fill="white"
            className="animate-float"
          />
          <ellipse
            cx="16"
            cy="22"
            rx="3"
            ry="4"
            fill="rgba(58, 176, 255, 0.5)"
          />
        </g>

        {/* Cleaning Tool Shape */}
        <g
          className={`transition-all duration-500 ${
            activeShape === 2 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{ transformOrigin: "center" }}
        >
          <rect x="18" y="4" width="4" height="20" rx="2" fill="white" />
          <path
            d="M10 24h20v4c0 4-4 8-10 8s-10-4-10-8v-4z"
            fill="white"
            className="animate-bounce-gentle"
          />
          <circle cx="14" cy="28" r="2" fill="rgba(58, 176, 255, 0.5)" />
          <circle cx="20" cy="30" r="2" fill="rgba(58, 176, 255, 0.5)" />
          <circle cx="26" cy="28" r="2" fill="rgba(58, 176, 255, 0.5)" />
        </g>
      </svg>

      {/* Pulse effect */}
      <div className="absolute inset-0 gradient-primary rounded-xl animate-ping opacity-20" />
    </div>
  );
}
