import type { Metadata } from "next";
import { MapPin, Clock, Phone, MessageCircle, Truck } from "lucide-react";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Our Location — Makati City | The Laundry Project",
  description:
    "Visit The Laundry Project at 7533 Santillan St., Makati City. Open Monday–Sunday, 9am–6pm. Pickup & delivery available across Metro Manila.",
  alternates: {
    canonical: "/locations",
  },
};

const hours = [
  { day: "Monday",    time: "9:00 AM – 6:00 PM", open: true  },
  { day: "Tuesday",   time: "9:00 AM – 6:00 PM", open: true  },
  { day: "Wednesday", time: "9:00 AM – 6:00 PM", open: true  },
  { day: "Thursday",  time: "9:00 AM – 6:00 PM", open: true  },
  { day: "Friday",    time: "9:00 AM – 6:00 PM", open: true  },
  { day: "Saturday",  time: "9:00 AM – 6:00 PM", open: true  },
  { day: "Sunday",    time: "9:00 AM – 6:00 PM", open: true  },
];

const deliveryAreas = [
  "Makati", "BGC / Taguig", "Pasay", "Pasig",
  "Mandaluyong", "San Juan", "Quezon City", "Manila",
  "Paranaque", "Las Piñas", "Muntinlupa", "Marikina",
  "Pateros", "Valenzuela", "Caloocan", "Malabon",
];

export default function LocationsPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section
        className="py-16 lg:py-20 pb-24 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d3d4f 0%, #38a9c2 100%)" }}
      >
        <div className="bubble-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll variant="fade-up">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff" }}
            >
              Makati City
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Find Us</h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
              One branch, expertly run — based in Makati City, serving Metro Manila.
              Can&apos;t visit? We&apos;ll come to you.
            </p>
          </AnimateOnScroll>
        </div>

        {/* Wave → branch section */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 80 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,50 C300,10 700,75 1100,30 C1280,10 1380,55 1440,40 L1440,80 L0,80 Z" fill="#dff0f7"/>
          </svg>
        </div>
      </section>

      {/* BRANCH + MAP */}
      <section className="py-16 lg:py-20" style={{ background: "#dff0f7" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Map embed */}
            <AnimateOnScroll variant="fade-left">
              <div className="rounded-3xl overflow-hidden shadow-lg border" style={{ borderColor: "#b3dde8" }}>
                <iframe
                  title="The Laundry Project — Makati Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.7929053!2d121.00547!3d14.55394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c96547e69e35%3A0x0!2s7533+Santillan+St%2C+Makati%2C+Metro+Manila!5e0!3m2!1sen!2sph!4v1718000000000"
                  width="100%"
                  height="360"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="px-5 py-4" style={{ background: "#ffffff" }}>
                  <a
                    href="https://maps.google.com/?q=7533+Santillan+St,+Makati+City,+Philippines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline"
                    style={{ color: "#38a9c2" }}
                  >
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Branch info */}
            <AnimateOnScroll variant="fade-right">
              <div className="bg-white rounded-3xl border p-7 shadow-sm" style={{ borderColor: "#b3dde8" }}>
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: "#0F172A" }}>Makati</h2>
                    <p className="text-sm" style={{ color: "#64748B" }}>7533 Santillan St., Makati City</p>
                  </div>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white shrink-0 ml-3"
                    style={{ background: "#38a9c2" }}
                  >
                    Open Now
                  </span>
                </div>

                {/* Contact row */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <a
                    href="tel:+639178381596"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-slate-50"
                    style={{ color: "#0F172A", borderColor: "#b3dde8" }}
                  >
                    <Phone className="w-4 h-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                    0917 838 1596
                  </a>
                  <a
                    href="https://m.me/thelaundryprojectph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "#38a9c2" }}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Message Us
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                    <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>Operating Hours</span>
                  </div>
                  <ul className="space-y-1.5">
                    {hours.map(({ day, time, open }) => (
                      <li key={day} className="flex items-center justify-between text-sm">
                        <span style={{ color: open ? "#0F172A" : "#94A3B8" }} className="font-medium">{day}</span>
                        <span
                          className="font-semibold"
                          style={{ color: open ? "#38a9c2" : "#94A3B8" }}
                        >
                          {time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* DELIVERY COVERAGE */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up" className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
              style={{ background: "#dff0f7" }}
            >
              <Truck className="w-6 h-6" style={{ color: "#38a9c2" }} aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#0F172A" }}>
              Metro Manila Pickup &amp; Delivery
            </h2>
            <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: "#64748B" }}>
              We pick up and deliver across Metro Manila. Not on the list?
              Message us — we&apos;ll check if we can reach you.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
            {deliveryAreas.map((area) => (
              <StaggerItem key={area}>
                <div
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-center border"
                  style={{ background: "#dff0f7", borderColor: "#b3dde8", color: "#0d3d4f" }}
                >
                  {area}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll variant="scale" className="text-center">
            <a
              href="https://m.me/thelaundryprojectph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
              style={{ background: "#fdca00", color: "#0F172A" }}
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Schedule a Pickup via Messenger
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
