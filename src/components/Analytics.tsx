"use client";

/**
 * Analytics — consent-gated tracker loader
 *
 * IDs are fetched server-side (layout.tsx → Supabase site_content table)
 * and passed as props. Scripts only inject after the user clicks
 * "Accept All" on the cookie banner.
 *
 * Fallback: if a prop is empty, checks NEXT_PUBLIC_* env vars.
 * An empty/missing value disables that tracker entirely.
 */

import Script from "next/script";
import { useState, useEffect } from "react";

interface AnalyticsProps {
  gaId?:      string;
  pixelId?:   string;
  hotjarId?:  string;
  clarityId?: string;
}

export default function Analytics({
  gaId      = "",
  pixelId   = "",
  hotjarId  = "",
  clarityId = "",
}: AnalyticsProps) {
  // Env-var fallbacks (used when DB rows are empty)
  const GA_ID      = gaId      || process.env.NEXT_PUBLIC_GA_ID           || "";
  const PIXEL_ID   = pixelId   || process.env.NEXT_PUBLIC_META_PIXEL_ID   || "";
  const HOTJAR_ID  = hotjarId  || process.env.NEXT_PUBLIC_HOTJAR_ID       || "";
  const CLARITY_ID = clarityId || process.env.NEXT_PUBLIC_CLARITY_ID      || "";

  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("tlp-cookie-consent") === "accepted") {
      setConsented(true);
    }
    const onAccept = () => setConsented(true);
    window.addEventListener("tlp-cookie-accepted", onAccept);
    return () => window.removeEventListener("tlp-cookie-accepted", onAccept);
  }, []);

  if (!consented) return null;

  return (
    <>
      {/* ── Google Analytics 4 ─────────────────────────────────────────── */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}</Script>
        </>
      )}

      {/* ── Meta Pixel ─────────────────────────────────────────────────── */}
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){
            if(f.fbq)return;
            n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
            t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
          }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${PIXEL_ID}');
          fbq('track','PageView');
        `}</Script>
      )}

      {/* ── Hotjar ─────────────────────────────────────────────────────── */}
      {HOTJAR_ID && (
        <Script id="hotjar-init" strategy="afterInteractive">{`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${HOTJAR_ID},hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}</Script>
      )}

      {/* ── Microsoft Clarity ──────────────────────────────────────────── */}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${CLARITY_ID}");
        `}</Script>
      )}
    </>
  );
}
