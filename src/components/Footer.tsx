import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";

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
function TkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34l-.05-7.59a8.21 8.21 0 0 0 4.8 1.53V5.8a4.85 4.85 0 0 1-1-.11z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#0d3d4f" }} className="text-white">
      {/* Wave top */}
      <div className="w-full overflow-hidden leading-none" style={{ marginTop: -1 }}>
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 40L48 34.7C96 29.3 192 18.7 288 16C384 13.3 480 18.7 576 21.3C672 24 768 24 864 21.3C960 18.7 1056 13.3 1152 13.3C1248 13.3 1344 18.7 1392 21.3L1440 24V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V40Z" fill="#38a9c2" fillOpacity="0.2"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

          {/* Left: Identity + nav */}
          <div>
            <Logo variant="white" size="md" className="mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Fresh laundry, dry cleaning & shoe care — right to your door. Serving Metro Manila since 2016.
            </p>
            <div className="flex gap-2.5 mb-8">
              {[
                { href: "https://www.facebook.com/thelaundryprojectph",  icon: <FbIcon />, label: "Facebook"  },
                { href: "https://www.instagram.com/thelaundryprojectph", icon: <IgIcon />, label: "Instagram" },
                { href: "https://www.tiktok.com/@thelaundryprojectph",   icon: <TkIcon />, label: "TikTok"    },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:-translate-y-px"
                  style={{ background: "rgba(56,169,194,0.12)", color: "#38a9c2", border: "1px solid rgba(56,169,194,0.2)" }}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-5">
                {[
                  { href: "#services",  label: "Services"  },
                  { href: "#pricing",   label: "Pricing"   },
                  { href: "#locations", label: "Location"  },
                  { href: "#contact",   label: "Contact"   },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#475569" }}>Legal</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                {[
                  { href: "/privacy-policy",   label: "Privacy Policy"   },
                  { href: "/terms-of-service", label: "Terms of Service" },
                  { href: "/refund-policy",    label: "Refund Policy"    },
                  { href: "/data-deletion",    label: "Data Deletion"    },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-slate-600 hover:text-slate-300 text-xs transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right: Contact + hours */}
          <div className="flex flex-col gap-5">
            <ul className="space-y-3.5">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#38a9c2" }} aria-hidden="true" />
                <span className="text-slate-400 text-sm">7533 Santillan St., Makati City</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 shrink-0" style={{ color: "#38a9c2" }} aria-hidden="true" />
                <a href="tel:+639178381596" className="text-slate-400 hover:text-white text-sm transition-colors">0917 838 1596</a>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#38a9c2" }} aria-hidden="true" />
                <a href="mailto:washup@thelaundryproject.ph" className="text-slate-400 hover:text-white text-sm transition-colors break-all">washup@thelaundryproject.ph</a>
              </li>
            </ul>

            <div className="rounded-xl p-4" style={{ background: "rgba(56,169,194,0.07)", border: "1px solid rgba(56,169,194,0.15)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#38a9c2" }}>Business Hours</p>
              <p className="text-sm text-slate-300">Monday – Sunday &nbsp;·&nbsp; 9:00 AM – 6:00 PM</p>
              <p className="text-xs text-slate-500 mt-1">Closed on public holidays</p>
            </div>

            <a
              href="https://laundrobot.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg self-start transition-opacity hover:opacity-80"
              style={{ background: "rgba(253,202,0,0.08)", border: "1px solid rgba(253,202,0,0.2)" }}
            >
              <span className="text-xs font-semibold" style={{ color: "#fdca00" }}>Powered by LaundroBot</span>
            </a>
          </div>
        </div>

        <div className="mt-10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2" style={{ borderTop: "1px solid rgba(56,169,194,0.12)" }}>
          <p className="text-slate-600 text-xs">© 2026 Rinselab Inc. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Serving Metro Manila since 2016</p>
        </div>
      </div>
    </footer>
  );
}
