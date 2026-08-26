import { getGclid, getTrackingData } from "./gclid";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingEvent = "kraft_thank_you";

const trackEvent = (
  eventName: TrackingEvent,
  eventParams: Record<string, unknown>,
) => {
  if (typeof window === "undefined") return;

  const tracking = getTrackingData();
  const params = {
    event_category: "lead",
    currency: "EUR",
    gclid: tracking.gclid || undefined,
    gbraid: tracking.gbraid || undefined,
    wbraid: tracking.wbraid || undefined,
    traffic_source: tracking.source,
    traffic_medium: tracking.medium,
    traffic_campaign: tracking.campaign || undefined,
    ...eventParams,
  };

  window.gtag?.("event", eventName, params);

  if (process.env.NODE_ENV === "development") {
    console.log(`[GA4] ${eventName}`, params);
  }
};

const postDirectCallClickToSheets = (source: string) => {
  if (typeof window === "undefined") return;

  const tracking = getTrackingData();
  const body = JSON.stringify({
    eventType: "direct_call_click",
    eventId: crypto.randomUUID(),
    source,
    utmSource: tracking.source,
    utmMedium: tracking.medium,
    utmCampaign: tracking.campaign,
    landingPage: tracking.landingPage,
    currentPage: tracking.currentPage,
    referrer: tracking.referrer,
  });

  if (
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon(
      "/api/call-event",
      new Blob([body], { type: "application/json" }),
    )
  ) {
    return;
  }

  void fetch("/api/call-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch((error) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[Sheets] direct_call_click", error);
    }
  });
};

// Basic engagement event for the final button in the floating call dialog.
// It is intentionally not a key event and has no Google Ads send_to target.
export const trackDirectCallClick = (source: string) => {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "direct_call_click", {
    event_category: "engagement",
    event_label: source,
    interaction_type: "direct_call",
    interaction_location: "floating_call_modal",
    contact_method: "phone",
    site: "nuernberg",
  });

  postDirectCallClickToSheets(source);
};

// Compatibility for existing imports. The final modal button still produces
// exactly one GA4 event.
export const trackPhoneClick = trackDirectCallClick;

// Emitted only after /api/contact succeeds and the guarded thank-you page is
// reached. This is the reliable website-form lead event.
export const trackThankYouPage = (eventId?: string) => {
  const tracking = getTrackingData();
  trackEvent("kraft_thank_you", {
    event_label: "contact_form_success",
    lead_type: "contact_form",
    contact_method: "form",
    event_id: eventId,
    landing_page: tracking.landingPage,
  });
};

// Compatibility exports for existing UI imports. They intentionally do not
// create additional GA4 conversions, preventing duplicate or false leads.
export const trackCallConfirmed = trackDirectCallClick;
export const trackCallIntent = (_source: string) => {};
export const trackEmailIntent = (_source: string) => {};
export const trackEmailConfirmed = (_source: string) => {};
export const trackFormConfirmed = (_data?: Record<string, unknown>) => {};
export const trackGenerateLead = (_source: string, _location?: string) => {};
export const trackCityView = (_name: string, _slug: string) => {};
export const trackServiceView = (_name: string, _slug: string) => {};
export const trackWhatsAppClick = (_source: string) => {};
export const trackCTAClick = (_name: string, _location?: string) => {};
export const trackFormSubmit = trackFormConfirmed;
export const trackLead = (_data?: Record<string, unknown>) => {};

export const getCompleteTrackingData = () => getTrackingData();
