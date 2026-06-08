import Link from "next/link";

interface Section {
  heading: string;
  children: React.ReactNode;
}

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function PolicySection({ heading, children }: Section) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3" style={{ color: "#0F172A" }}>{heading}</h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#475569" }}>
        {children}
      </div>
    </section>
  );
}

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <>
      {/* Header */}
      <section style={{ background: "#0d3d4f" }} className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium mb-5 transition-colors"
            style={{ color: "#38a9c2" }}
          >
            ← Back to home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">{title}</h1>
          <p className="text-slate-400 text-sm mt-2">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16" style={{ background: "#f8fafc" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="space-y-10 divide-y" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
            {children}
          </article>

          {/* Policy nav */}
          <nav aria-label="Other policies" className="mt-12 pt-8 border-t" style={{ borderColor: "#e2e8f0" }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#94A3B8" }}>
              Other Policies
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/privacy-policy",   label: "Privacy Policy"    },
                { href: "/terms-of-service", label: "Terms of Service"  },
                { href: "/refund-policy",    label: "Refund Policy"     },
                { href: "/data-deletion",    label: "Data Deletion"     },
              ].map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:text-white"
                  style={{ background: "rgba(56,169,194,0.08)", color: "#38a9c2", border: "1px solid rgba(56,169,194,0.2)" }}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
