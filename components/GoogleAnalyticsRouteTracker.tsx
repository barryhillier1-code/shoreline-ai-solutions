'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleAnalyticsRouteTrackerProps = {
  measurementId: string;
};

export default function GoogleAnalyticsRouteTracker({
  measurementId,
}: GoogleAnalyticsRouteTrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const pagePath = search ? `${pathname}?${search}` : pathname;

    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title,
      send_to: measurementId,
    });
  }, [measurementId, pathname, search]);

  return null;
}
