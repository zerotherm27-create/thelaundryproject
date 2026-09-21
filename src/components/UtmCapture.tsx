"use client";

/**
 * UtmCapture — silent client component, consent-gated the same way
 * Analytics.tsx gates GA4/Pixel. On a consented visit, captures any
 * utm_* params from the landing URL (first-touch, 30-day TTL) and fires
 * a "page_view" beacon to /api/track on load and on every client-side
 * route change.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureAttributionFromLocation, getAttribution, getOrCreateSessionId } from "@/lib/attribution";

function capture() {
  captureAttributionFromLocation();
  const attribution = getAttribution();
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event_type: "page_view",
      session_id: getOrCreateSessionId(),
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      utm_source: attribution?.utm_source,
      utm_medium: attribution?.utm_medium,
      utm_campaign: attribution?.utm_campaign,
      utm_content: attribution?.utm_content,
      utm_term: attribution?.utm_term,
    }),
  }).catch(() => {});
}

export default function UtmCapture() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (localStorage.getItem("tlp-cookie-consent") === "accepted") {
      capture();
    }
    const onAccept = () => capture();
    window.addEventListener("tlp-cookie-accepted", onAccept);
    return () => window.removeEventListener("tlp-cookie-accepted", onAccept);
  }, []);

  // Fire on every subsequent client-side route change (the effect above
  // already covers the first render).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (localStorage.getItem("tlp-cookie-consent") === "accepted") {
      capture();
    }
  }, [pathname]);

  return null;
}
