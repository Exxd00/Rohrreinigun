import { getGclid, getTrackingData } from "./gclid";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type TrackingEvent = "nuernberg_phone_click" | "kraft_thank_you";

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

// A click on a tel: link is an engagement signal, not proof that a call was
// connected. Keep this event secondary in GA4/Google Ads.
export const trackPhoneClick = (source: string) => {
  trackEvent("nuernberg_phone_click", {
    event_label: source,
    lead_type: "phone_click",
    contact_method: "phone",
    has_gclid: !!getGclid(),
  });
};

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
export const trackCallConfirmed = trackPhoneClick;
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
