// Marketing-attribution helpers: capture UTM params on landing, persist them
// (first-touch, 30-day TTL) across the visit, and forward them into the
// outbound Messenger / Web Booking links so downstream systems have a shot
// at recording them too.

export type UtmBundle = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

type StoredAttribution = UtmBundle & {
  landing_path?: string;
  referrer?: string;
  captured_at: string;
};

const ATTRIBUTION_KEY = "tlp_attribution";
const ATTRIBUTION_TTL_DAYS = 30;
const SESSION_KEY = "tlp_session_id";

const UTM_FIELDS: (keyof UtmBundle)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

function safeGetStorage(kind: "local" | "session"): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Reads UTM params from the current URL, storing them as first-touch attribution
 *  if none is stored yet (or the stored one has expired). Never overwrites a
 *  still-valid first-touch record. No-op if the URL carries no utm_source. */
export function captureAttributionFromLocation(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source");
  if (!source) return;

  const existing = getAttribution();
  if (existing) return; // still-valid first-touch record wins

  const bundle: StoredAttribution = { captured_at: new Date().toISOString() };
  for (const field of UTM_FIELDS) {
    const value = params.get(field);
    if (value) bundle[field] = value;
  }
  bundle.landing_path = window.location.pathname;
  bundle.referrer = document.referrer || undefined;

  const storage = safeGetStorage("local");
  try {
    storage?.setItem(ATTRIBUTION_KEY, JSON.stringify(bundle));
  } catch {
    // storage unavailable (private mode, quota, etc.) — attribution just won't persist
  }
}

/** Returns the stored attribution bundle, or null if none exists or it has expired. */
export function getAttribution(): StoredAttribution | null {
  const storage = safeGetStorage("local");
  if (!storage) return null;
  try {
    const raw = storage.getItem(ATTRIBUTION_KEY);
    if (!raw) return null;
    const parsed: StoredAttribution = JSON.parse(raw);
    const ageMs = Date.now() - new Date(parsed.captured_at).getTime();
    if (ageMs > ATTRIBUTION_TTL_DAYS * 24 * 60 * 60 * 1000) {
      storage.removeItem(ATTRIBUTION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Get-or-create a per-visit (per-tab) session id, used to join a page_view
 *  to a later booking_click in marketing_events. Falls back to an ephemeral
 *  in-memory id (not persisted) when sessionStorage is unavailable. */
let inMemorySessionId: string | null = null;
export function getOrCreateSessionId(): string {
  const storage = safeGetStorage("session");
  if (storage) {
    try {
      const existing = storage.getItem(SESSION_KEY);
      if (existing) return existing;
      const created = crypto.randomUUID();
      storage.setItem(SESSION_KEY, created);
      return created;
    } catch {
      // fall through to in-memory id
    }
  }
  if (!inMemorySessionId) inMemorySessionId = crypto.randomUUID();
  return inMemorySessionId;
}

/** Facebook's m.me `ref` param only reliably supports alnum + a small set of
 *  symbols. Strip everything else and cap length so campaign/content values
 *  with spaces or punctuation survive as best they can. */
function sanitizeRefSegment(value: string): string {
  return value.replace(/[^A-Za-z0-9]/g, "").slice(0, 20);
}

/** Packs a UTM bundle into a compact string for the Messenger `ref=` param.
 *  Prefixed with "w-" so it's distinguishable from existing manual referral
 *  codes (BOOK, WEBSITE, GOOGLE, ...), which never contain a hyphen.
 *  Returns null when there's no utm_source to encode (organic/direct visit) —
 *  callers should leave the configured ref untouched in that case. */
export function encodeMessengerRef(utm: UtmBundle | null | undefined): string | null {
  if (!utm?.utm_source) return null;
  const segments = [
    "w",
    sanitizeRefSegment(utm.utm_source),
    sanitizeRefSegment(utm.utm_medium ?? ""),
    sanitizeRefSegment(utm.utm_campaign ?? ""),
    sanitizeRefSegment(utm.utm_content ?? ""),
  ];
  return segments.join("-");
}

/** Inverse of encodeMessengerRef, best-effort. Returns null if `ref` doesn't
 *  match our encoding (e.g. it's a legacy manual code like "BOOK"). */
export function decodeMessengerRef(ref: string | null | undefined): UtmBundle | null {
  if (!ref || !ref.startsWith("w-")) return null;
  const [, source, medium, campaign, content] = ref.split("-");
  if (!source) return null;
  const bundle: UtmBundle = { utm_source: source };
  if (medium) bundle.utm_medium = medium;
  if (campaign) bundle.utm_campaign = campaign;
  if (content) bundle.utm_content = content;
  return bundle;
}

/** Builds the final Messenger URL, overriding `ref=` with the encoded UTM
 *  bundle when one is available; otherwise leaves the configured URL as-is. */
export function buildMessengerUrl(baseUrl: string, utm: UtmBundle | null | undefined): string {
  const encoded = encodeMessengerRef(utm);
  if (!encoded) return baseUrl;
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("ref", encoded);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/** Builds the final Web Booking URL, appending UTM params as plain query
 *  params on top of whatever the admin has configured. */
export function buildWebBookingUrl(baseUrl: string, utm: UtmBundle | null | undefined): string {
  if (!utm) return baseUrl;
  try {
    const url = new URL(baseUrl);
    for (const field of UTM_FIELDS) {
      const value = utm[field];
      if (value) url.searchParams.set(field, value);
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}
