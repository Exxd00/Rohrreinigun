"use client";

import { useState, ReactNode } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import CallConfirmModal from "@/components/layout/CallConfirmModal";

interface PhoneCallButtonProps {
  source: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
}

export default function PhoneCallButton({
  source,
  children,
  className = "",
  variant = "default",
  size = "default",
  showIcon = true,
}: PhoneCallButtonProps) {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  return (
    <>
      <CallConfirmModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        source={source}
      />

      <Button
        variant={variant}
        size={size}
        onClick={() => setIsCallModalOpen(true)}
        className={className}
      >
        {showIcon && <Phone className="w-5 h-5 mr-2" />}
        {children || "Jetzt anrufen"}
      </Button>
    </>
  );
}
