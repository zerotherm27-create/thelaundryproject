"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "tlp-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Slight delay so it doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    // Notify Analytics component (same session, already mounted)
    window.dispatchEvent(new Event("tlp-cookie-accepted"));
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 md:bottom-5 md:left-5 md:right-auto md:max-w-sm animate-in"
    >
      <div
        className="rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: "#0d3d4f",
          border: "1px solid rgba(56,169,194,0.25)",
        }}
      >
        {/* Accent bar */}
        <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #38a9c2, #fdca00)" }} />

        <div className="p-5">
          {/* Icon + heading */}
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base"
              style={{ background: "rgba(56,169,194,0.15)" }}
              aria-hidden="true"
            >
              🍪
            </span>
            <p className="font-semibold text-white text-sm">We use cookies</p>
          </div>

          {/* Body */}
          <p className="text-xs leading-relaxed mb-1" style={{ color: "#94A3B8" }}>
            We and our partners (Google Analytics, Meta Pixel, Hotjar) use cookies to improve your experience,
            analyse traffic, and show relevant ads.
          </p>
          <p className="text-xs mb-4" style={{ color: "#64748B" }}>
            <Link
              href="/privacy-policy"
              className="underline transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            {" · "}
            <Link
              href="/privacy-policy#5-cookies-and-tracking-technologies"
              className="underline transition-colors hover:text-slate-300"
            >
              Cookie details
            </Link>
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:brightness-110 active:scale-95"
              style={{ background: "#38a9c2", color: "white" }}
            >
              Accept All
            </button>
            <button
              onClick={decline}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-white/5 active:scale-95"
              style={{ color: "#94A3B8", border: "1px solid rgba(56,169,194,0.2)" }}
            >
              Decline
            </button>
          </div>

          <p className="text-[10px] mt-3 text-center" style={{ color: "#475569" }}>
            You can change your preference at any time by clearing site data.
          </p>
        </div>
      </div>
    </div>
  );
}
