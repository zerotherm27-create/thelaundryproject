import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ChevronRight } from "lucide-react";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "@/components/AnimateOnScroll";
import PricingTables from "@/components/PricingTables";

export const metadata: Metadata = {
  title: "Laundry Price List — Affordable Rates | The Laundry Project",
  description:
    "Transparent, affordable pricing for machine wash, dry cleaning, ironing, shoe cleaning & more in Makati City.",
};

export default function PricingPage() {
  return (
    <>
      {/* PAGE HEADER */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d3d4f 0%, #38a9c2 100%)" }}
      >
        <div className="bubble-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll variant="fade-up">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
              No Hidden Fees
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.82)" }}>
              Affordable rates for every laundry need. What you see is what you pay.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* PRICING TABLES */}
      <section className="py-10 lg:py-14" style={{ background: "#dff0f7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingTables />
        </div>
      </section>

      {/* NOTES */}
      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <h2 className="text-sm font-bold mb-4 text-center" style={{ color: "#0F172A" }}>Good to Know</h2>
          </AnimateOnScroll>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Pickup & delivery available in select areas",
              "Express / same-day service available (rush fee applies)",
              "We accept GCash, Maya, cash, credit/debit cards",
              "Items are inspected upon receipt",
              "Turnaround time: 1–3 business days (standard)",
              "For bulk or commercial orders, contact us for special rates",
            ].map((note) => (
              <StaggerItem key={note}>
                <div
                  className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
                  style={{ background: "#dff0f7", border: "1px solid #b3dde8" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: "#38a9c2" }}
                    aria-hidden="true"
                  />
                  <p className="text-xs leading-relaxed" style={{ color: "#475569" }}>{note}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d3d4f 0%, #38a9c2 100%)" }}
      >
        <div className="bubble-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll variant="scale">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Ready to Get Started?</h2>
            <p className="mb-7" style={{ color: "rgba(255,255,255,0.8)" }}>
              Book now or reach out for a custom quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://m.me/thelaundryprojectph"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm hover:shadow-xl transition-all active:scale-95"
                style={{ background: "#fdca00", color: "#0F172A" }}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" /> Book via Messenger
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white border-2 border-white/50 text-sm hover:bg-white/10 transition-all"
              >
                Contact Us <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
