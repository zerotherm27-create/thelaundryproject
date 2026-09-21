// Dependency-free User-Agent classifier. Good enough for a small-business
// dashboard (broad OS/browser families, not forensic precision) — e.g.
// Chromium forks like Brave/Opera read as "Chrome". Order matters: more
// specific tokens are checked before generic ones that would otherwise
// shadow them.

export type DeviceType = "mobile" | "tablet" | "desktop";

export type UaInfo = {
  os: string | null;
  browser: string | null;
  device_type: DeviceType;
};

function detectOs(ua: string): string | null {
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Android/.test(ua)) return "Android";
  if (/Windows/.test(ua)) return "Windows";
  if (/Mac OS X|Macintosh/.test(ua)) return "macOS";
  if (/Linux/.test(ua)) return "Linux";
  return null;
}

function detectBrowser(ua: string): string | null {
  if (/Edg\//.test(ua)) return "Edge";
  if (/SamsungBrowser/.test(ua)) return "Samsung Internet";
  if (/Firefox\/|FxiOS\//.test(ua)) return "Firefox";
  if (/CriOS\/|Chrome\//.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return null;
}

function detectDeviceType(ua: string): DeviceType {
  if (/iPad|Tablet|(Android(?!.*Mobile))/.test(ua)) return "tablet";
  if (/Mobi|iPhone|iPod|Android/.test(ua)) return "mobile";
  return "desktop";
}

export function classifyUserAgent(ua: string | null): UaInfo {
  if (!ua) return { os: null, browser: null, device_type: "desktop" };
  return {
    os: detectOs(ua),
    browser: detectBrowser(ua),
    device_type: detectDeviceType(ua),
  };
}
