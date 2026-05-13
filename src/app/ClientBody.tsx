"use client";

import { useEffect } from "react";
import { initGclidTracking } from "@/lib/gclid";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Remove any extension-added classes during hydration
    document.body.className = "antialiased";

    // Initialize GCLID and UTM tracking
    // This captures gclid from URL and stores session data
    initGclidTracking();
  }, []);

  return <div className="antialiased">{children}</div>;
}
