"use client";

import { useState } from "react";
import { CheckCircle, Loader } from "lucide-react";

const services = [
  "Machine Wash",
  "Hand Wash",
  "Dry Cleaning",
  "Press & Ironing",
  "Express Service",
  "Shoe Cleaning",
  "Beddings / Comforters",
  "Other / Special Item",
];

const timeSlots = [
  "9:00 AM – 12:00 PM",
  "12:00 PM – 3:00 PM",
  "3:00 PM – 6:00 PM",
];

const inputBase =
  "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all bg-white";

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#38a9c2";
    e.target.style.boxShadow = "0 0 0 3px rgba(56,169,194,0.14)";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#e2e8f0";
    e.target.style.boxShadow = "none";
  },
};

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "", phone: "", service: "", date: "", time: "", address: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-14 px-6 rounded-3xl"
        style={{ background: "#dff0f7", border: "1px solid #b3dde8" }}
        role="alert"
        aria-live="polite"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
          style={{ background: "#38a9c2" }}
        >
          <CheckCircle className="w-8 h-8 text-white" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: "#0F172A" }}>
          Booking Received!
        </h3>
        <p className="text-sm leading-relaxed max-w-sm mb-1" style={{ color: "#475569" }}>
          LaundroBot has logged your booking for{" "}
          <span className="font-semibold" style={{ color: "#38a9c2" }}>{form.service}</span> on{" "}
          <span className="font-semibold" style={{ color: "#38a9c2" }}>{form.date}</span>.
        </p>
        <p className="text-sm" style={{ color: "#64748B" }}>
          We&apos;ll confirm via <span className="font-medium">SMS or Messenger</span> within the hour.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", service: "", date: "", time: "", address: "", notes: "" }); }}
          className="mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#38a9c2" }}
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="bf-name" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Full Name <span style={{ color: "#38a9c2" }} aria-hidden="true">*</span>
          </label>
          <input
            id="bf-name" name="name" type="text" required autoComplete="name"
            value={form.name} onChange={handleChange} placeholder="Maria Santos"
            className={inputBase} style={{ color: "#0F172A" }} {...focusHandlers}
          />
        </div>
        <div>
          <label htmlFor="bf-phone" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Mobile Number <span style={{ color: "#38a9c2" }} aria-hidden="true">*</span>
          </label>
          <input
            id="bf-phone" name="phone" type="tel" required autoComplete="tel"
            value={form.phone} onChange={handleChange} placeholder="0917 xxx xxxx"
            className={inputBase} style={{ color: "#0F172A" }} {...focusHandlers}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="bf-service" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
          Service Type <span style={{ color: "#38a9c2" }} aria-hidden="true">*</span>
        </label>
        <select
          id="bf-service" name="service" required
          value={form.service} onChange={handleChange}
          className={inputBase} style={{ color: form.service ? "#0F172A" : "#94A3B8" }}
          {...focusHandlers}
        >
          <option value="" disabled>Select a service…</option>
          {services.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="bf-date" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Preferred Pickup Date <span style={{ color: "#38a9c2" }} aria-hidden="true">*</span>
          </label>
          <input
            id="bf-date" name="date" type="date" required
            value={form.date} onChange={handleChange}
            className={inputBase} style={{ color: "#0F172A" }} {...focusHandlers}
          />
        </div>
        <div>
          <label htmlFor="bf-time" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
            Preferred Time <span style={{ color: "#38a9c2" }} aria-hidden="true">*</span>
          </label>
          <select
            id="bf-time" name="time" required
            value={form.time} onChange={handleChange}
            className={inputBase} style={{ color: form.time ? "#0F172A" : "#94A3B8" }}
            {...focusHandlers}
          >
            <option value="" disabled>Select time slot…</option>
            {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="bf-address" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
          Pickup Address <span style={{ color: "#38a9c2" }} aria-hidden="true">*</span>
        </label>
        <input
          id="bf-address" name="address" type="text" required autoComplete="street-address"
          value={form.address} onChange={handleChange}
          placeholder="Unit / House No., Street, Barangay, City"
          className={inputBase} style={{ color: "#0F172A" }} {...focusHandlers}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="bf-notes" className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
          Special Instructions <span className="font-normal" style={{ color: "#94A3B8" }}>(optional)</span>
        </label>
        <textarea
          id="bf-notes" name="notes" rows={3}
          value={form.notes} onChange={handleChange}
          placeholder="Delicate items, allergies, preferred detergent, extra notes…"
          className={`${inputBase} resize-none`} style={{ color: "#0F172A" }}
          {...focusHandlers}
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed active:scale-95"
        style={{ background: "#fdca00", color: "#0F172A" }}
      >
        {loading
          ? <Loader className="w-5 h-5 animate-spin" aria-hidden="true" />
          : null
        }
        {loading ? "LaundroBot is processing…" : "Confirm Booking"}
      </button>

      <p className="text-center text-xs mt-3" style={{ color: "#94A3B8" }}>
        By submitting, you agree to be contacted via SMS or Messenger for booking confirmation.
      </p>
    </form>
  );
}
