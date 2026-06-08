"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from "lucide-react";

function FbIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d3d4f 0%, #38a9c2 100%)" }}
      >
        <div className="bubble-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
            We&apos;d Love to Hear from You
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.82)" }}>
            Have a question, special request, or want to book a service? Reach out — we&apos;re happy to help.
          </p>
        </div>
      </section>

      {/* CONTACT LAYOUT */}
      <section className="py-16 lg:py-20" style={{ background: "#dff0f7" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* FORM */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12" role="alert" aria-live="polite">
                  <CheckCircle className="w-16 h-16 mb-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                  <h2 className="text-2xl font-bold mb-3" style={{ color: "#0F172A" }}>Message Sent!</h2>
                  <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#64748B" }}>
                    Thanks for reaching out! We&apos;ll get back to you within 24 hours. For a faster response, message us on Messenger.
                  </p>
                  <a
                    href="https://m.me/thelaundryprojectph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-all"
                    style={{ background: "#38a9c2" }}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" /> Open Messenger
                  </a>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#0F172A" }}>Send Us a Message</h2>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                          Full Name <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="name" name="name" type="text" required autoComplete="name"
                          value={form.name} onChange={handleChange}
                          placeholder="Maria Santos"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all"
                          style={{ color: "#0F172A" }}
                          onFocus={(e) => { e.target.style.borderColor = "#38a9c2"; e.target.style.boxShadow = "0 0 0 3px rgba(56,169,194,0.15)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                          Email Address <span className="text-red-500" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="email" name="email" type="email" required autoComplete="email"
                          value={form.email} onChange={handleChange}
                          placeholder="maria@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all"
                          style={{ color: "#0F172A" }}
                          onFocus={(e) => { e.target.style.borderColor = "#38a9c2"; e.target.style.boxShadow = "0 0 0 3px rgba(56,169,194,0.15)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                        Phone Number
                      </label>
                      <input
                        id="phone" name="phone" type="tel" autoComplete="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder="0917 xxx xxxx"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all"
                        style={{ color: "#0F172A" }}
                        onFocus={(e) => { e.target.style.borderColor = "#38a9c2"; e.target.style.boxShadow = "0 0 0 3px rgba(56,169,194,0.15)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                        Message <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message" name="message" required rows={5}
                        value={form.message} onChange={handleChange}
                        placeholder="Tell us what you need — service type, pickup area, special instructions..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all resize-none"
                        style={{ color: "#0F172A" }}
                        onFocus={(e) => { e.target.style.borderColor = "#38a9c2"; e.target.style.boxShadow = "0 0 0 3px rgba(56,169,194,0.15)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
                      style={{ background: "#38a9c2" }}
                    >
                      {loading ? (
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      ) : (
                        <Send className="w-4 h-4" aria-hidden="true" />
                      )}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* CONTACT INFO */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Contact Details */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <h2 className="text-lg font-bold mb-5" style={{ color: "#0F172A" }}>Contact Details</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#dff0f7" }}>
                      <MapPin className="w-4 h-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#94A3B8" }}>Address</p>
                      <p className="text-sm" style={{ color: "#475569" }}>7533 Santillan St., Makati City</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#dff0f7" }}>
                      <Phone className="w-4 h-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#94A3B8" }}>Phone</p>
                      <a href="tel:+639178381596" className="text-sm hover:underline" style={{ color: "#475569" }}>
                        0917 838 1596
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#dff0f7" }}>
                      <Mail className="w-4 h-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#94A3B8" }}>Email</p>
                      <a href="mailto:washup@thelaundryproject.ph" className="text-sm hover:underline break-all" style={{ color: "#475569" }}>
                        washup@thelaundryproject.ph
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Messenger CTA */}
              <a
                href="https://m.me/thelaundryprojectph"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:opacity-95 hover:shadow-md"
                style={{ background: "#38a9c2" }}
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="text-white">
                  <p className="font-semibold text-sm">Chat on Messenger</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>Fastest way to book or inquire</p>
                </div>
              </a>

              {/* Social Links */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <p className="text-sm font-semibold mb-4" style={{ color: "#0F172A" }}>Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/thelaundryprojectph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-all"
                    style={{ color: "#475569" }}
                  >
                    <span style={{ color: "#38a9c2" }}><FbIcon /></span>
                    Facebook
                  </a>
                  <a
                    href="https://www.instagram.com/thelaundryprojectph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 flex-1 px-3 py-2.5 rounded-xl text-xs font-medium border border-slate-200 hover:bg-slate-50 transition-all"
                    style={{ color: "#475569" }}
                  >
                    <span style={{ color: "#38a9c2" }}><IgIcon /></span>
                    Instagram
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <p className="text-sm font-semibold mb-3" style={{ color: "#0F172A" }}>Business Hours</p>
                <div className="space-y-2 text-sm" style={{ color: "#475569" }}>
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span className="font-medium" style={{ color: "#38a9c2" }}>9am – 6pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium" style={{ color: "#38a9c2" }}>9am – 6pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium" style={{ color: "#94A3B8" }}>Closed</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
