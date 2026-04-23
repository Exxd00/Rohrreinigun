"use client";

import Image from "next/image";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function AnimatedLogo({ size = "md" }: AnimatedLogoProps) {
  const sizeClasses = {
    sm: { container: "w-10 h-10", image: 40 },
    md: { container: "w-12 h-12", image: 48 },
    lg: { container: "w-16 h-16", image: 64 },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`relative ${currentSize.container} flex items-center justify-center`}>
      <Image
        src="/logo.png"
        alt="Rohrreinigung Kraft Logo"
        width={currentSize.image}
        height={currentSize.image}
        className="object-contain"
        priority
      />
    </div>
  );
}
