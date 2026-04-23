// =====================================================
// ROHRREINIGUNG KRAFT - CONVERSION TRACKING SYSTEM
// 5 Main Conversion Events for Google Ads
// =====================================================
//
// 🎯 MAIN CONVERSIONS (Mark these in GA4 → Import to Google Ads):
//
// 1. call_confirmed      - User confirmed phone call (Value: €25)
// 2. email_confirmed     - User confirmed email contact (Value: €25)
// 3. form_confirmed      - Form successfully submitted (Value: €50)
// 4. thank_you_page      - Thank you page reached (Value: €50)
// 5. generate_lead       - Lead generated (Primary conversion)
//
// =====================================================

import { getGclid, getTrackingData } from './gclid';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Base event tracking function
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  const trackingData = getTrackingData();

  const enrichedParams = {
    ...eventParams,
    gclid: trackingData.gclid || undefined,
    traffic_source: trackingData.source,
    traffic_medium: trackingData.medium,
    traffic_campaign: trackingData.campaign || undefined,
  };

  // Push to dataLayer for GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...enrichedParams,
    });
  }

  // Direct gtag call for GA4
  if (window.gtag) {
    window.gtag('event', eventName, enrichedParams);
  }

  // Console log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Tracking] ${eventName}`, enrichedParams);
  }
};

// =====================================================
// 🎯 CONVERSION 1: CALL CONFIRMED
// Triggered when user confirms phone call in modal
// =====================================================
export const trackCallConfirmed = (source: string) => {
  const gclid = getGclid();

  trackEvent('call_confirmed', {
    event_category: 'conversion',
    event_label: source,
    contact_method: 'phone',
    currency: 'EUR',
    value: 25,
    has_gclid: !!gclid,
  });

  // Also trigger generate_lead
  trackGenerateLead('phone_call', source);
};

// =====================================================
// 🎯 CONVERSION 2: EMAIL CONFIRMED
// Triggered when user confirms email contact in modal
// =====================================================
export const trackEmailConfirmed = (source: string) => {
  const gclid = getGclid();

  trackEvent('email_confirmed', {
    event_category: 'conversion',
    event_label: source,
    contact_method: 'email',
    currency: 'EUR',
    value: 25,
    has_gclid: !!gclid,
  });

  // Also trigger generate_lead
  trackGenerateLead('email_click', source);
};

// =====================================================
// 🎯 CONVERSION 3: FORM CONFIRMED
// Triggered when contact form is successfully submitted
// =====================================================
export const trackFormConfirmed = (formData: {
  service?: string;
  city?: string;
  hasImages?: boolean;
  imageCount?: number;
}) => {
  const gclid = getGclid();
  const trackingData = getTrackingData();

  trackEvent('form_confirmed', {
    event_category: 'conversion',
    event_label: 'contact_form',
    contact_method: 'form',
    currency: 'EUR',
    value: 50,
    has_gclid: !!gclid,
    service_type: formData.service || 'unknown',
    city: formData.city || 'unknown',
    has_images: formData.hasImages || false,
    image_count: formData.imageCount || 0,
    landing_page: trackingData.landingPage,
    current_page: trackingData.currentPage,
  });

  // Also trigger generate_lead
  trackGenerateLead('contact_form', formData.city);
};

// =====================================================
// 🎯 CONVERSION 4: THANK YOU PAGE
// Triggered when user reaches thank you page
// =====================================================
export const trackThankYouPage = () => {
  const gclid = getGclid();
  const trackingData = getTrackingData();

  trackEvent('thank_you_page', {
    event_category: 'conversion',
    event_label: 'form_success',
    currency: 'EUR',
    value: 50,
    has_gclid: !!gclid,
    source: trackingData.source,
    medium: trackingData.medium,
  });
};

// =====================================================
// 🎯 CONVERSION 5: GENERATE LEAD (Primary)
// Main conversion event - triggered by call, email & form
// =====================================================
export const trackGenerateLead = (leadSource: string, location?: string) => {
  const gclid = getGclid();

  trackEvent('generate_lead', {
    event_category: 'conversion',
    lead_source: leadSource,
    location: location || 'unknown',
    currency: 'EUR',
    value: 50,
    has_gclid: !!gclid,
  });
};

// =====================================================
// ENGAGEMENT EVENTS (For analytics)
// =====================================================

// Call intent - when call modal opens
export const trackCallIntent = (source: string) => {
  trackEvent('call_intent', {
    event_category: 'engagement',
    event_label: source,
  });
};

// Email intent - when email modal opens
export const trackEmailIntent = (source: string) => {
  trackEvent('email_intent', {
    event_category: 'engagement',
    event_label: source,
  });
};

// City page view - track which cities users visit
export const trackCityView = (cityName: string, citySlug: string) => {
  trackEvent('city_view', {
    event_category: 'engagement',
    city_name: cityName,
    city_slug: citySlug,
  });
};

// Service page view
export const trackServiceView = (serviceName: string, serviceSlug: string) => {
  trackEvent('service_view', {
    event_category: 'engagement',
    service_name: serviceName,
    service_slug: serviceSlug,
  });
};

// Phone click - general phone clicks (without modal)
export const trackPhoneClick = (source: string) => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: source,
    contact_method: 'phone',
  });
};

// WhatsApp click
export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
    contact_method: 'whatsapp',
  });
};

// CTA click
export const trackCTAClick = (ctaName: string, location?: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    cta_location: location,
  });
};

// =====================================================
// LEGACY EXPORTS (for backward compatibility)
// =====================================================
export const trackFormSubmit = trackFormConfirmed;
export const trackLead = (data?: Record<string, unknown>) => {
  trackGenerateLead(data?.lead_source as string || 'unknown', data?.city as string);
};

// Get complete tracking data
export const getCompleteTrackingData = () => {
  return getTrackingData();
};
