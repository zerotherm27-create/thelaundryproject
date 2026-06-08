"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, Globe, X, ChevronRight } from "lucide-react";

const DEFAULT_MESSENGER_URL = "https://m.me/thelaundryprojectph?ref=website";
const DEFAULT_WEB_URL       = "https://book.thelaundryproject.app";

interface BookingModalProps {
  /** Visual style of the trigger button */
  variant?: "primary" | "teal" | "ghost";
  /** Label shown on the trigger button */
  label?: string;
  className?: string;
  /** URLs fetched server-side from site_content (fall back to defaults if empty) */
  messengerUrl?: string;
  webUrl?: string;
}

export default function BookingModal({
  variant      = "primary",
  label        = "Book a Pickup Now",
  className    = "",
  messengerUrl = "",
  webUrl       = "",
}: BookingModalProps) {
  const MESSENGER_URL = messengerUrl || DEFAULT_MESSENGER_URL;
  const WEB_URL       = webUrl       || DEFAULT_WEB_URL;
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* ── Close on ESC ── */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  /* ── Prevent body scroll while open ── */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* ── Button styles ── */
  const btnStyle: Record<string, React.CSSProperties> = {
    primary: { background: "#fdca00", color: "#0F172A" },
    teal:    { background: "#38a9c2", color: "#ffffff"  },
    ghost:   { color: "#38a9c2", border: "2px solid #b3dde8" },
  };
  const btnBase =
    "btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base active:scale-95 cursor-pointer";

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        className={`${btnBase} ${className}`}
        style={btnStyle[variant]}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <MessageCircle className="w-5 h-5" aria-hidden="true" />
        {label}
      </button>

      {/* ── Modal overlay — rendered in a portal so navbar backdrop-filter can't trap it ── */}
      {open && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Card */}
          <div
            ref={dialogRef}
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: "#ffffff" }}
          >
            {/* Accent bar */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#38a9c2,#fdca00)" }} />

            <div className="p-6 sm:p-8">
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-slate-100"
                aria-label="Close"
              >
                <X className="w-4 h-4" style={{ color: "#64748B" }} />
              </button>

              {/* Heading */}
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#38a9c2" }}>
                Book a Pickup
              </p>
              <h2 id="booking-modal-title" className="text-xl font-bold mb-1" style={{ color: "#0F172A" }}>
                How would you like to book?
              </h2>
              <p className="text-sm mb-6" style={{ color: "#64748B" }}>
                Choose your preferred booking channel below.
              </p>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {/* Facebook Messenger */}
                <a
                  href={MESSENGER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: "#f0f7ff", border: "2px solid #1877f2" }}
                >
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#1877f2" }}
                  >
                    {/* Messenger icon */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
                      <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.918 1.448 5.522 3.716 7.229V22l3.389-1.86c.907.251 1.868.386 2.895.386 5.523 0 10-4.144 10-9.283C22 6.145 17.523 2 12 2zm1.008 12.5l-2.548-2.718-4.971 2.718 5.467-5.808 2.611 2.718 4.909-2.718-5.468 5.808z"/>
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: "#1877f2" }}>Facebook Messenger</p>
                    <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                      Chat with our booking assistant — confirmed in seconds, 24/7
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: "#1877f2" }} />
                </a>

                {/* Web Booking */}
                <a
                  href={WEB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: "#f0fbfd", border: "2px solid #38a9c2" }}
                >
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#38a9c2" }}
                  >
                    <Globe className="w-6 h-6 text-white" aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm" style={{ color: "#0d3d4f" }}>Web Booking</p>
                    <p className="text-xs mt-0.5" style={{ color: "#475569" }}>
                      Fill out our online booking form — great if you don&apos;t use Facebook
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: "#38a9c2" }} />
                </a>
              </div>

              <p className="text-[11px] text-center mt-5" style={{ color: "#94A3B8" }}>
                Both channels are monitored daily. Same great service, your choice of platform.
              </p>
            </div>
          </div>
        </div>
      , document.body)}
    </>
  );
}
