"use client";

import { useState } from "react";
import { Send, CheckCircle, MessageCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm]           = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const focusStyle = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = "#38a9c2";
      e.target.style.boxShadow   = "0 0 0 3px rgba(56,169,194,0.15)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = "#e2e8f0";
      e.target.style.boxShadow   = "none";
    },
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12" role="alert" aria-live="polite">
        <CheckCircle className="w-16 h-16 mb-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
        <h3 className="text-2xl font-bold mb-3" style={{ color: "#0F172A" }}>Message Sent!</h3>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#64748B" }}>
          Thanks for reaching out! We&apos;ll reply within 24 hours. For a faster response, chat with us on Messenger.
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
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Full Name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name" name="name" type="text" required autoComplete="name"
            value={form.name} onChange={handleChange}
            placeholder="Maria Santos"
            className={inputClass}
            style={{ color: "#0F172A" }}
            {...focusStyle}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Email Address <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email" name="email" type="email" required autoComplete="email"
            value={form.email} onChange={handleChange}
            placeholder="maria@email.com"
            className={inputClass}
            style={{ color: "#0F172A" }}
            {...focusStyle}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="cf-phone" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
          Phone Number
        </label>
        <input
          id="cf-phone" name="phone" type="tel" autoComplete="tel"
          value={form.phone} onChange={handleChange}
          placeholder="0917 xxx xxxx"
          className={inputClass}
          style={{ color: "#0F172A" }}
          {...focusStyle}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="cf-message" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
          Message <span className="text-red-400" aria-hidden="true">*</span>
        </label>
        <textarea
          id="cf-message" name="message" required rows={5}
          value={form.message} onChange={handleChange}
          placeholder="Tell us what you need — service type, pickup area, special instructions..."
          className={`${inputClass} resize-none`}
          style={{ color: "#0F172A" }}
          {...focusStyle}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
        style={{ background: "#38a9c2" }}
      >
        {loading
          ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
          : <Send className="w-4 h-4" aria-hidden="true" />
        }
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
