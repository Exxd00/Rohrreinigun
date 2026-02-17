// Conversion Tracking Events Utility
// Google Analytics 4 + Google Ads Ready
// Events: generate_lead, form_submit, thank_you_page, whatsapp_click, phone_click, cta_click

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
  // Google Analytics 4 / Google Tag Manager
  if (typeof window !== 'undefined') {
    // Push to dataLayer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams,
      });
    }

    // Direct gtag call for GA4
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }

    // Console log for debugging (can be removed in production)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Tracking] ${eventName}`, eventParams);
    }
  }
};

// Lead generation event - primary conversion
export const trackLead = (leadData?: Record<string, unknown>) => {
  trackEvent('generate_lead', {
    event_category: 'conversion',
    currency: 'EUR',
    value: 50, // Estimated lead value
    ...leadData,
  });
};

// Form submission event
export const trackFormSubmit = (formData?: Record<string, unknown>) => {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
    ...formData,
  });

  // Also track as lead
  trackLead({
    lead_source: 'contact_form',
    ...formData,
  });
};

// Thank you page view - conversion confirmation
export const trackThankYouPage = () => {
  trackEvent('thank_you_page', {
    event_category: 'conversion',
    event_label: 'form_success',
  });

  // Track as conversion for Google Ads
  trackEvent('conversion', {
    send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual Google Ads conversion ID
    event_category: 'conversion',
    event_label: 'lead_form_submission',
    value: 50,
    currency: 'EUR',
  });
};

// WhatsApp click - engagement
export const trackWhatsAppClick = (source?: string) => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: source || 'floating_button',
    contact_method: 'whatsapp',
  });

  // Track as lead for WhatsApp contact
  trackLead({
    lead_source: 'whatsapp',
    source_location: source,
  });
};

// Phone click - engagement
export const trackPhoneClick = (source?: string) => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: source || 'floating_button',
    contact_method: 'phone',
  });

  // Track as lead for phone contact
  trackLead({
    lead_source: 'phone_call',
    source_location: source,
  });
};

// CTA click
export const trackCTAClick = (ctaName: string, ctaLocation?: string) => {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    cta_location: ctaLocation,
  });
};

// Page view with custom parameters
export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

// Service page view - for targeting
export const trackServiceView = (serviceName: string, cityName?: string) => {
  trackEvent('view_item', {
    event_category: 'service',
    item_name: serviceName,
    item_category: cityName || 'general',
  });
};
