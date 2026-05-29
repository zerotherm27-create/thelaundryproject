export default function MessengerMockup() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 276, flexShrink: 0, position: "relative" }}>
        {/* Volume buttons — left */}
        <div style={{ position: "absolute", left: -2.5, top: 108, width: 2.5, height: 28, background: "linear-gradient(180deg,#5a5a5c,#3a3a3c)", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -2.5, top: 148, width: 2.5, height: 28, background: "linear-gradient(180deg,#5a5a5c,#3a3a3c)", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -2.5, top: 188, width: 2.5, height: 28, background: "linear-gradient(180deg,#5a5a5c,#3a3a3c)", borderRadius: "2px 0 0 2px" }} />
        {/* Power button — right */}
        <div style={{ position: "absolute", right: -2.5, top: 140, width: 2.5, height: 52, background: "linear-gradient(180deg,#5a5a5c,#3a3a3c)", borderRadius: "0 2px 2px 0" }} />

        {/* iPhone frame — thin titanium ring */}
        <div style={{
          background: "linear-gradient(160deg,#4a4a4c,#1c1c1e)",
          borderRadius: 46,
          padding: "2px",
          boxShadow: "0 32px 80px rgba(0,0,0,.5), 0 0 0 0.5px rgba(255,255,255,.1), inset 0 1px 0 rgba(255,255,255,.15)",
        }}>
          {/* Inner black bezel */}
          <div style={{ background: "#000", borderRadius: 44, padding: "4px 3px 5px" }}>
            {/* Screen */}
            <div style={{ borderRadius: 42, overflow: "hidden", height: 574, position: "relative", background: "#000" }}>
              {/* Dynamic Island */}
              <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)", width: 80, height: 22, background: "#000", borderRadius: 18, zIndex: 20, pointerEvents: "none" }} />
              {/* Video */}
              <video
                src="/herovideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Home indicator */}
              <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", width: 80, height: 3.5, background: "#fff", borderRadius: 3, opacity: 0.25, zIndex: 10, pointerEvents: "none" }} />
            </div>
          </div>
        </div>

        {/* "Live demo" badge below phone */}
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#38a9c2", background: "#dff0f7", padding: "4px 14px", borderRadius: 20, border: "1px solid #b3dde8" }}>
            Live Messenger demo
          </span>
        </div>
      </div>
    </div>
  );
}
