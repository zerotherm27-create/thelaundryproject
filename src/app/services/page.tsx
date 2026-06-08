import type { Metadata } from "next";
import Link from "next/link";
import { WashingMachine, Hand, Shirt, Zap, Footprints, Star, MessageCircle, ChevronRight } from "lucide-react";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "Laundry Services — Machine Wash, Dry Cleaning & More | The Laundry Project",
  description:
    "Professional machine wash, hand wash, dry cleaning, press/ironing, express service & shoe cleaning in Makati City.",
};

const services = [
  {
    icon: WashingMachine,
    name: "Machine Wash",
    desc: "Our state-of-the-art machines use eco-friendly, auto-dosed detergents to give your everyday clothes a thorough, gentle clean. Perfect for shirts, jeans, casual wear, and more.",
    pricing: "From ₱330 (small bag)",
    tags: ["Everyday Wear", "Eco-Friendly", "Gentle Cycle"],
  },
  {
    icon: Hand,
    name: "Hand Wash",
    desc: "For delicate fabrics, lace, wool, and special-care garments, our hand washing service ensures your items receive the careful attention they deserve without any damage.",
    pricing: "₱480 (3 kg min)",
    tags: ["Delicate Fabrics", "Special Care", "Gentle Handling"],
  },
  {
    icon: Shirt,
    name: "Dry Cleaning",
    desc: "Professional solvent-based cleaning for your finest garments — suits, barongs, gowns, blazers, coats, and formal wear. We restore them to their best condition.",
    pricing: "From ₱350 per piece",
    tags: ["Formal Wear", "Suits & Gowns", "Barong"],
  },
  {
    icon: Zap,
    name: "Press & Ironing",
    desc: "Crisp, perfectly pressed results for your shirts, trousers, dresses, and uniforms. Our professional finishing service makes you look sharp and ready for anything.",
    pricing: "From ₱55 per piece",
    tags: ["Shirts & Tops", "Uniforms", "Formal Attire"],
  },
  {
    icon: Star,
    name: "Express Service",
    desc: "Need your laundry done fast? Our same-day express service ensures quick turnaround without sacrificing quality. Rush orders welcome — just let us know!",
    pricing: "Rush fee applies",
    tags: ["Same Day", "Fast Turnaround", "Priority Queue"],
  },
  {
    icon: Footprints,
    name: "Shoe Cleaning",
    desc: "Complete footwear restoration for sneakers, leather shoes, canvas shoes, and more. We clean, deodorize, and restore your shoes to their original glory.",
    pricing: "Sneakers ₱800 · Rubber shoes ₱900",
    tags: ["Sneakers", "Rubber Shoes", "Slippers"],
  },
];

export default function ServicesPage() {
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
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff" }}
            >
              What We Offer
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Our Laundry Services</h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.82)" }}>
              From everyday garments to specialty items — professional care for every fabric, every time.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 lg:py-20" style={{ background: "#dff0f7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => (
              <StaggerItem key={s.name}>
                <article
                  className="bg-white rounded-2xl p-7 hover:shadow-lg transition-all flex flex-col h-full group"
                  style={{ border: "1px solid #b3dde8" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: "#dff0f7" }}
                  >
                    <s.icon className="w-7 h-7" style={{ color: "#38a9c2" }} aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: "#0F172A" }}>{s.name}</h2>
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#64748B" }}>{s.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: "#dff0f7", color: "#38a9c2", border: "1px solid #b3dde8" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-semibold" style={{ color: "#38a9c2" }}>{s.pricing}</span>
                    <Link href="/pricing" className="text-xs font-medium hover:underline" style={{ color: "#64748B" }}>
                      Full price list →
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ALSO AVAILABLE */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "#0F172A" }}>Also Available</h2>
          </AnimateOnScroll>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {["Beddings & Towels","Comforters","Blankets","Stuffed Toys","Rugs & Carpets","Sofa Covers","Curtains","Backpacks & Bags","Pillows & Bolsters","Helmets & Caps"].map((item) => (
              <StaggerItem key={item}>
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                  style={{ background: "#dff0f7", color: "#0d3d4f", border: "1px solid #b3dde8" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#38a9c2" }} aria-hidden="true" />
                  {item}
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
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Ready to Book a Service?</h2>
            <p className="mb-7" style={{ color: "rgba(255,255,255,0.8)" }}>
              Message us on Messenger or check our full price list.
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
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white border-2 border-white/50 text-sm hover:bg-white/10 transition-all"
              >
                See Pricing <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
