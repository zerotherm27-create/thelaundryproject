// Traffic-source classification for the admin Insights tab. Runs at
// aggregation read-time (not stored per-row), so the rules below can be
// refined later without needing to backfill existing marketing_events rows.

export type TrafficSource =
  | "Direct"
  | "Paid Search"
  | "Paid Social"
  | "Organic Search"
  | "Organic Social"
  | "Referral";

const SEARCH_ENGINE_HOSTS = ["google.", "bing.", "yahoo.", "duckduckgo."];
const SOCIAL_HOSTS = ["facebook.", "instagram.", "tiktok.", "twitter.", "x.com", "linkedin."];
const PAID_SEARCH_MEDIUMS = ["cpc", "ppc", "paid_search"];
const PAID_SOCIAL_MEDIUMS = ["paid_social", "paid"];

function referrerHost(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return referrer.toLowerCase();
  }
}

function hostMatches(host: string, list: string[]): boolean {
  return list.some((entry) => host.includes(entry));
}

export function classifyTrafficSource(
  referrer: string | null,
  utm_source: string | null,
  utm_medium: string | null
): TrafficSource {
  const medium = utm_medium?.toLowerCase() ?? null;

  if (utm_source) {
    if (medium && PAID_SEARCH_MEDIUMS.includes(medium)) return "Paid Search";
    if (medium && PAID_SOCIAL_MEDIUMS.includes(medium)) return "Paid Social";
    // Attributed (has a utm_source) but not one of the two paid buckets above
    // (e.g. utm_medium=email, or a mistagged campaign) — treat as Referral
    // rather than inventing a new bucket for it.
    return "Referral";
  }

  const host = referrerHost(referrer);
  if (!host) return "Direct";
  if (hostMatches(host, SEARCH_ENGINE_HOSTS)) return "Organic Search";
  if (hostMatches(host, SOCIAL_HOSTS)) return "Organic Social";
  return "Referral";
}
