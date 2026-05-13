"use client";

import { useEffect } from "react";
import { initGclidTracking } from "@/lib/gclid";

/**
 * TrackingInit Component
 * Initializes GCLID and UTM parameter tracking on page load
 * This captures Google Ads click IDs and campaign parameters
 */
export default function TrackingInit() {
  useEffect(() => {
    // Initialize GCLID and UTM tracking
    // This captures gclid from URL and stores session data for conversion tracking
    initGclidTracking();

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Tracking] GCLID and UTM tracking initialized");
    }
  }, []);

  // This component doesn't render anything
  return null;
}
