/**
 * Google Auth & Console Integration Utility
 * Manages Google Sign-In, One-Tap, and Google Cloud Console OAuth integration.
 */

import { identifyVisitor } from './visitorTracker';

const STORAGE_KEY_GOOGLE_USER = 'blackcat_google_user';
const STORAGE_KEY_GOOGLE_CLIENT_ID = 'blackcat_google_client_id';
const STORAGE_KEY_GOOGLE_SEARCH_TAG = 'blackcat_google_search_tag';

// Decode Google JWT Token (Credential)
export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.warn('Failed to parse JWT token:', e);
    return null;
  }
}

// Get Saved Google User
export function getSavedGoogleUser() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY_GOOGLE_USER);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// Save Google User & Automatically Identify in Visitor Tracker
export function saveGoogleUser(userData) {
  if (typeof localStorage === 'undefined' || !userData) return;
  try {
    const user = {
      id: userData.sub || userData.id || 'goog_' + Date.now(),
      name: userData.name || userData.displayName || 'Google User',
      email: userData.email || '',
      picture: userData.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name || 'G')}`,
      signedInAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_GOOGLE_USER, JSON.stringify(user));

    // Link into Visitor Tracker
    identifyVisitor({
      name: user.name,
      email: user.email,
      phone: userData.phone || ''
    });

    return user;
  } catch (e) {
    console.warn('Could not save Google user:', e);
  }
}

// Logout Google User
export function logoutGoogleUser() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_GOOGLE_USER);
}

// Get / Save Google Cloud Console OAuth Client ID
export function getGoogleClientId() {
  if (typeof localStorage === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY_GOOGLE_CLIENT_ID) || '';
}

export function saveGoogleClientId(clientId) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_GOOGLE_CLIENT_ID, (clientId || '').trim());
}

// Get / Save Google Search Console Verification Meta Tag
export function getGoogleSearchConsoleTag() {
  if (typeof localStorage === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY_GOOGLE_SEARCH_TAG) || '';
}

export function saveGoogleSearchConsoleTag(tag) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_GOOGLE_SEARCH_TAG, (tag || '').trim());
}

// Initialize Official Google Identity Services SDK if Client ID is configured
export function initGoogleIdentityServices(onSuccess) {
  if (typeof window === 'undefined') return;
  const clientId = getGoogleClientId();
  if (!clientId || !window.google?.accounts?.id) return;

  try {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (response?.credential) {
          const profile = parseJwt(response.credential);
          if (profile) {
            const saved = saveGoogleUser({
              sub: profile.sub,
              name: profile.name,
              email: profile.email,
              picture: profile.picture
            });
            if (onSuccess) onSuccess(saved);
          }
        }
      },
      auto_select: false
    });

    // Attempt Google One-Tap prompt
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // Fallback gracefully
      }
    });
  } catch (err) {
    console.warn('Google Identity Services init error:', err);
  }
}
