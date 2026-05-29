"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import BookingModal from "./BookingModal";

const navLinks = [
  { href: "/",          label: "Home"      },
  { href: "#services",  label: "Services"  },
  { href: "#book",      label: "Book"      },
  { href: "#pricing",   label: "Pricing"   },
  { href: "#faq",       label: "FAQ"       },
  { href: "#locations", label: "Location"  },
  { href: "#contact",   label: "Contact"   },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const ids = ["services", "book", "pricing", "faq", "locations", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const close = () => setIsOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/96 backdrop-blur-md shadow-md" : "bg-white shadow-sm"
      }`}
      style={scrolled ? { boxShadow: "0 4px 20px rgba(56,169,194,0.12)" } : {}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">

          {/* Logo */}
          <Link href="/" onClick={close} aria-label="The Laundry Project — Home">
            <Logo variant="color" size="sm" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive  = link.href === "/" ? active === "" : active === sectionId;
              return (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  style={isActive ? { background: "#38a9c2" } : {}}
                  onClick={close}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <BookingModal variant="primary" label="Book Now" className="px-4 py-2.5 text-sm" />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t py-3 pb-4"
            style={{ borderColor: "#b3dde8" }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive  = link.href === "/" ? active === "" : active === sectionId;
              return (
                <a
                  key={link.href}
                  href={resolveHref(link.href)}
                  onClick={close}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium mb-1 transition-colors ${
                    isActive ? "text-white" : "text-slate-700 hover:bg-slate-50"
                  }`}
                  style={isActive ? { background: "#38a9c2" } : {}}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="mt-2" onClick={close}>
              <BookingModal variant="primary" label="Book Now" className="w-full px-4 py-3 text-sm" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
