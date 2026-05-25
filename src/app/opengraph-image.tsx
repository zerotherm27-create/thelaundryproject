import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Laundry Project — Professional Laundry & Dry Cleaning in Metro Manila";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d3d4f 0%, #0a2e3a 50%, #062028 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(56,169,194,0.18) 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Teal glow blob */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(56,169,194,0.22) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #38a9c2, #fdca00)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            position: "relative",
            zIndex: 10,
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "8px",
            }}
          >
            {/* Washing machine icon */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "18px",
                background: "rgba(56,169,194,0.25)",
                border: "2px solid rgba(56,169,194,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
              }}
            >
              🫧
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <span style={{ color: "#38a9c2", fontSize: "14px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                THE LAUNDRY PROJECT
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", letterSpacing: "0.1em" }}>
                EST. 2016 · MAKATI CITY
              </span>
            </div>
          </div>

          {/* Main headline */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Fresh Clothes,{" "}
            <span style={{ color: "#fdca00" }}>Zero Hassle.</span>
          </div>

          {/* Subtext */}
          <div
            style={{
              fontSize: "26px",
              color: "rgba(255,255,255,0.65)",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            Professional laundry, dry cleaning &amp; pickup/delivery across Metro Manila
          </div>

          {/* Pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {["🚚 Pickup & Delivery", "⚡ Same-Day Express", "💳 GCash · Maya · Cash"].map((text) => (
              <div
                key={text}
                style={{
                  background: "rgba(56,169,194,0.15)",
                  border: "1px solid rgba(56,169,194,0.4)",
                  borderRadius: "100px",
                  padding: "10px 22px",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "18px",
                  fontWeight: 500,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            color: "rgba(255,255,255,0.3)",
            fontSize: "16px",
            letterSpacing: "0.05em",
          }}
        >
          www.thelaundryproject.ph
        </div>

        {/* Accent bar bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #fdca00, #38a9c2)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
