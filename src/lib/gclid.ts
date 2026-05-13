/**
 * GCLID Tracking Utility
 * Captures Google Click ID from URL and stores for conversion tracking
 */

const GCLID_KEY = 'rk_gclid';
const GCLID_TIMESTAMP_KEY = 'rk_gclid_ts';
const SESSION_DATA_KEY = 'rk_session';
const GCLID_EXPIRY_DAYS = 90; // Google Ads attribution window

export interface SessionData {
  gclid: string | null;
  gclidTimestamp: number | null;
  firstPage: string;
  landingPage: string;
  referrer: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
}

/**
 * Initialize GCLID tracking - call on page load
 */
export function initGclidTracking(): void {
  if (typeof window === 'undefined') return;

  // Capture GCLID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const gclid = urlParams.get('gclid');

  // Always save GCLID if present (even if session exists)
  if (gclid) {
    saveGclid(gclid);
  }

  // Get current session data
  const sessionData = getSessionData();

  // Update UTM parameters if present in URL (might be a new campaign)
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const utmContent = urlParams.get('utm_content');
  const utmTerm = urlParams.get('utm_term');

  // If this is the first visit OR we have new UTM/GCLID parameters
  const hasNewTrackingParams = gclid || utmSource || utmMedium || utmCampaign;

  if (!sessionData.firstPage || hasNewTrackingParams) {
    saveSessionData({
      // Keep existing data unless we have new params
      firstPage: sessionData.firstPage || window.location.pathname,
      landingPage: hasNewTrackingParams ? window.location.href : (sessionData.landingPage || window.location.href),
      referrer: sessionData.referrer || document.referrer || 'direct',
      // Update UTM params if new ones are present
      utmSource: utmSource || sessionData.utmSource,
      utmMedium: utmMedium || sessionData.utmMedium,
      utmCampaign: utmCampaign || sessionData.utmCampaign,
      utmContent: utmContent || sessionData.utmContent,
      utmTerm: utmTerm || sessionData.utmTerm,
    });
  }
}

/**
 * Save GCLID to localStorage
 */
export function saveGclid(gclid: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(GCLID_KEY, gclid);
    localStorage.setItem(GCLID_TIMESTAMP_KEY, Date.now().toString());

    // Also update session data with new GCLID
    const session = getSessionData();
    saveSessionData({
      ...session,
      gclid: gclid,
      gclidTimestamp: Date.now(),
    });
  } catch (e) {
    console.warn('Failed to save GCLID:', e);
  }
}

/**
 * Get stored GCLID (if not expired)
 */
export function getGclid(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const gclid = localStorage.getItem(GCLID_KEY);
    const timestamp = localStorage.getItem(GCLID_TIMESTAMP_KEY);

    if (!gclid || !timestamp) return null;

    // Check if expired
    const expiryTime = GCLID_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    if (Date.now() - parseInt(timestamp) > expiryTime) {
      clearGclid();
      return null;
    }

    return gclid;
  } catch (e) {
    return null;
  }
}

/**
 * Clear stored GCLID
 */
export function clearGclid(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(GCLID_KEY);
    localStorage.removeItem(GCLID_TIMESTAMP_KEY);
  } catch (e) {
    // Ignore
  }
}

/**
 * Get session data
 */
export function getSessionData(): SessionData {
  if (typeof window === 'undefined') {
    return {
      gclid: null,
      gclidTimestamp: null,
      firstPage: '',
      landingPage: '',
      referrer: '',
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
    };
  }

  try {
    const stored = localStorage.getItem(SESSION_DATA_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Always get fresh GCLID (might have been updated)
      return {
        ...parsed,
        gclid: getGclid(),
      };
    }
  } catch (e) {
    // Ignore
  }

  return {
    gclid: getGclid(),
    gclidTimestamp: null,
    firstPage: '',
    landingPage: '',
    referrer: '',
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
    utmContent: null,
    utmTerm: null,
  };
}

/**
 * Save session data
 */
export function saveSessionData(data: Partial<SessionData>): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getSessionData();
    const currentGclid = getGclid();
    const updated = {
      ...existing,
      ...data,
      gclid: data.gclid || currentGclid,
    };
    localStorage.setItem(SESSION_DATA_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save session data:', e);
  }
}

/**
 * Get all tracking data for form submission
 */
export function getTrackingData(): {
  gclid: string | null;
  source: string;
  medium: string;
  campaign: string;
  landingPage: string;
  currentPage: string;
  referrer: string;
} {
  const session = getSessionData();
  const currentGclid = getGclid(); // Always get fresh GCLID

  // Determine source - use UTM if available, otherwise check GCLID
  let source = 'direct';
  let medium = 'none';

  if (session.utmSource) {
    source = session.utmSource;
    medium = session.utmMedium || 'none';
  } else if (currentGclid) {
    source = 'google';
    medium = 'cpc';
  } else if (session.referrer && session.referrer !== 'direct') {
    // Try to determine source from referrer
    try {
      const refUrl = new URL(session.referrer);
      if (refUrl.hostname.includes('google')) {
        source = 'google';
        medium = 'organic';
      } else if (refUrl.hostname.includes('facebook') || refUrl.hostname.includes('fb.')) {
        source = 'facebook';
        medium = 'social';
      } else if (refUrl.hostname.includes('instagram')) {
        source = 'instagram';
        medium = 'social';
      } else {
        source = refUrl.hostname;
        medium = 'referral';
      }
    } catch (e) {
      source = 'referral';
      medium = 'referral';
    }
  }

  return {
    gclid: currentGclid,
    source,
    medium,
    campaign: session.utmCampaign || '',
    landingPage: session.landingPage || '',
    currentPage: typeof window !== 'undefined' ? window.location.href : '',
    referrer: session.referrer || '',
  };
}

/**
 * Check if user came from Google Ads
 */
export function isFromGoogleAds(): boolean {
  return !!getGclid();
}
