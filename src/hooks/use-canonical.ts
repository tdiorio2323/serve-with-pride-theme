import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://truthmatters.com';

/**
 * Custom hook to set canonical URL for the current page
 * This helps prevent duplicate content issues in search engines
 */
export function useCanonical() {
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname}`;

  useEffect(() => {
    // Remove existing canonical tag if present
    const existingLink = document.querySelector('link[rel="canonical"]');
    if (existingLink) {
      existingLink.setAttribute('href', canonicalUrl);
    } else {
      // Create new canonical tag
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      document.head.appendChild(link);
    }

    // Cleanup function
    return () => {
      const linkToRemove = document.querySelector('link[rel="canonical"]');
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [location.pathname, canonicalUrl]);

  return canonicalUrl;
}

