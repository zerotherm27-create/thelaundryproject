"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I book a laundry service?",
    a: "You can book directly through our web form on this page. Fill in your name, contact number, preferred service, and pickup details — LaundroBot will confirm your slot within the hour. You can also message us on Facebook Messenger anytime.",
  },
  {
    q: "Do you offer pickup and delivery?",
    a: "Yes! We offer pickup and delivery for residential and corporate clients in select areas around Makati City. Message us or use the booking form to check if we cover your area.",
  },
  {
    q: "How long does laundry take?",
    a: "Standard service takes 1 to 3 business days. If you need it sooner, our Express Service offers same-day turnaround when items are dropped off or picked up before noon. Rush fees apply.",
  },
  {
    q: "Do you offer same-day express service?",
    a: "Yes. Drop off or schedule your pickup before 12:00 PM and we'll have your laundry ready the same day. An express / rush fee is added on top of the base service price.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept GCash, Maya, cash, credit cards, and debit cards (Visa & Mastercard). You can pay on pickup, on delivery, or through our cashless options.",
  },
  {
    q: "Can you handle delicate and special care items?",
    a: "Absolutely. We offer hand washing for delicate fabrics like lace, wool, and silk, as well as professional dry cleaning for suits, barongs, gowns, blazers, and leather pieces. Just let us know when you book.",
  },
  {
    q: "What detergents and products do you use?",
    a: "We use high-quality, eco-friendly detergents and fabric softeners. Our machines use auto-dosing systems to ensure the right amount every wash — no waste, no residue.",
  },
  {
    q: "Is my laundry safe with you?",
    a: "Yes. All items are inspected and logged upon receipt. We are fully accountable for every garment we receive. If you have concerns about specific items, just let us know and we will handle them with extra care.",
  },
  {
    q: "Is there a minimum order?",
    a: "Machine wash has a minimum load of 5 kg (small bag). Hand wash minimum is 3 kg. Dry cleaning and specialty items are charged per piece — there is no minimum for those.",
  },
];

export default function FAQ({
  initialFaqs,
}: {
  initialFaqs?: { q: string; a: string }[];
} = {}) {
  const data = initialFaqs ?? faqs;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {data.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="rounded-2xl overflow-hidden transition-all"
            style={{ border: `1px solid ${isOpen ? "#38a9c2" : "#b3dde8"}`, background: "#ffffff" }}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left transition-colors"
              style={{ background: isOpen ? "#dff0f7" : "transparent" }}
            >
              <span className="text-sm font-semibold leading-snug" style={{ color: "#0F172A" }}>
                {faq.q}
              </span>
              <ChevronDown
                className="w-5 h-5 shrink-0 transition-transform duration-200"
                style={{
                  color: "#38a9c2",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1">
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{faq.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
