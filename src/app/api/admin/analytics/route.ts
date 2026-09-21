import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { decodeMessengerRef } from "@/lib/attribution";
import { classifyTrafficSource } from "@/lib/analytics";

// This Supabase project ("laundrobot") is shared by several tenants' bot
// backends. Every query against shared tables MUST filter to this tenant,
// or the dashboard will eventually mix in other businesses' data.
const TLP_TENANT_ID = "8d545ba2-8262-4bf3-aba1-109528789213";

// orders/marketing_events have RLS with no anon SELECT policy — a service
// role key is required to read them. Server-only; never expose to the client.
// Built lazily inside the handler (not at module scope) so a missing env var
// only breaks this route at request time, not the whole build.
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function checkAuth(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

type OrderRow = {
  created_at: string;
  price: number | null;
  status: string | null;
  paid: boolean | null;
  source: string | null;
  referral_ref: string | null;
  delivery_fee: number | null;
};

type EventRow = {
  event_type: "page_view" | "booking_click";
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  channel: "messenger" | "web" | null;
  created_at: string;
  session_id: string;
  path: string | null;
  referrer: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  os: string | null;
  browser: string | null;
  device_type: "mobile" | "tablet" | "desktop" | null;
};

function dayKey(iso: string) {
  return iso.slice(0, 10); // YYYY-MM-DD
}

function utmKey(u: { utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; utm_content: string | null }) {
  return [u.utm_source ?? "(none)", u.utm_medium ?? "(none)", u.utm_campaign ?? "(none)", u.utm_content ?? "(none)"].join(" / ");
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();

  const now = new Date();
  const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const from = req.nextUrl.searchParams.get("from") ?? defaultFrom;
  const to = req.nextUrl.searchParams.get("to") ?? now.toISOString();

  const supabaseAdmin = getSupabaseAdmin();
  const [ordersRes, eventsRes] = await Promise.all([
    supabaseAdmin
      .from("orders")
      .select("created_at, price, status, paid, source, referral_ref, delivery_fee")
      .eq("tenant_id", TLP_TENANT_ID)
      .gte("created_at", from)
      .lte("created_at", to)
      .order("created_at")
      .limit(5000),
    supabaseAdmin
      .from("marketing_events")
      .select("event_type, utm_source, utm_medium, utm_campaign, utm_content, utm_term, channel, created_at, session_id, path, referrer, country, region, city, os, browser, device_type")
      .eq("tenant_id", TLP_TENANT_ID)
      .gte("created_at", from)
      .lte("created_at", to)
      .order("created_at")
      .limit(20000),
  ]);

  if (ordersRes.error) return NextResponse.json({ error: ordersRes.error.message }, { status: 500 });
  if (eventsRes.error) return NextResponse.json({ error: eventsRes.error.message }, { status: 500 });

  const orders = (ordersRes.data ?? []) as OrderRow[];
  const events = (eventsRes.data ?? []) as EventRow[];

  // ── Orders summary ──────────────────────────────────────────
  const total_orders = orders.length;
  const total_revenue = orders.reduce((sum, o) => sum + (o.price ?? 0), 0);
  const paid_orders = orders.filter((o) => o.paid).length;
  const unpaid_orders = total_orders - paid_orders;
  const avg_order_value = total_orders ? total_revenue / total_orders : 0;

  const status_breakdown: Record<string, number> = {};
  const source_breakdown: Record<string, number> = {};
  const byDayOrders = new Map<string, { count: number; revenue: number }>();

  for (const o of orders) {
    const status = o.status ?? "(unknown)";
    status_breakdown[status] = (status_breakdown[status] ?? 0) + 1;
    const source = o.source ?? "(unknown)";
    source_breakdown[source] = (source_breakdown[source] ?? 0) + 1;

    const day = dayKey(o.created_at);
    const bucket = byDayOrders.get(day) ?? { count: 0, revenue: 0 };
    bucket.count += 1;
    bucket.revenue += o.price ?? 0;
    byDayOrders.set(day, bucket);
  }

  const orders_over_time = [...byDayOrders.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => ({ date, count: v.count, revenue: v.revenue }));

  // ── Approximate referral_ref → UTM reconciliation (Messenger only) ──
  const referralGroups = new Map<string, { order_count: number; revenue: number; decoded_utm: ReturnType<typeof decodeMessengerRef> }>();
  for (const o of orders) {
    const decoded = decodeMessengerRef(o.referral_ref);
    const label = decoded ? utmKey({ ...decoded, utm_source: decoded.utm_source ?? null, utm_medium: decoded.utm_medium ?? null, utm_campaign: decoded.utm_campaign ?? null, utm_content: decoded.utm_content ?? null }) : (o.referral_ref ? `Manual/legacy referral: ${o.referral_ref}` : "Unknown/Direct");
    const bucket = referralGroups.get(label) ?? { order_count: 0, revenue: 0, decoded_utm: decoded };
    bucket.order_count += 1;
    bucket.revenue += o.price ?? 0;
    referralGroups.set(label, bucket);
  }
  const referral_breakdown = [...referralGroups.entries()]
    .map(([referral_ref, v]) => ({ referral_ref, order_count: v.order_count, revenue: v.revenue, decoded_utm: v.decoded_utm }))
    .sort((a, b) => b.order_count - a.order_count);

  // ── Tracking (marketing_events) summary ─────────────────────
  const pageViews = events.filter((e) => e.event_type === "page_view");
  const bookingClicks = events.filter((e) => e.event_type === "booking_click");
  const total_page_views = pageViews.length;
  const total_booking_clicks = bookingClicks.length;

  // A session can now produce several page_view rows (every route change
  // logs one), so distinct sessions — not raw page_view rows — is the right
  // denominator for click-through rate.
  const sessionIds = new Set(pageViews.map((e) => e.session_id));
  const total_sessions = sessionIds.size;
  const click_through_rate = total_sessions ? total_booking_clicks / total_sessions : 0;

  // One row per session (its first page view) — visitor-level attributes
  // (referrer/utm/device/geo) are constant across a session, so classifying
  // off just the first view avoids letting an active session's later page
  // views skew source/device/location splits.
  const sessionsFirstView = new Map<string, EventRow>();
  for (const e of [...pageViews].sort((a, b) => a.created_at.localeCompare(b.created_at))) {
    if (!sessionsFirstView.has(e.session_id)) sessionsFirstView.set(e.session_id, e);
  }

  const pageViewsPerSession = new Map<string, number>();
  for (const e of pageViews) {
    pageViewsPerSession.set(e.session_id, (pageViewsPerSession.get(e.session_id) ?? 0) + 1);
  }
  const bouncedSessions = [...pageViewsPerSession.values()].filter((count) => count === 1).length;
  const bounce_rate = total_sessions ? bouncedSessions / total_sessions : 0;
  const avg_pages_per_session = total_sessions ? total_page_views / total_sessions : 0;

  const pageCounts = new Map<string, number>();
  for (const e of pageViews) {
    const path = e.path ?? "(unknown)";
    pageCounts.set(path, (pageCounts.get(path) ?? 0) + 1);
  }
  const top_pages = [...pageCounts.entries()]
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const sourceCounts = new Map<string, number>();
  const osCounts = new Map<string, number>();
  const browserCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  const locationCounts = new Map<string, { country: string; city: string; sessions: number }>();
  for (const e of sessionsFirstView.values()) {
    const source = classifyTrafficSource(e.referrer, e.utm_source, e.utm_medium);
    sourceCounts.set(source, (sourceCounts.get(source) ?? 0) + 1);

    const os = e.os ?? "(unknown)";
    osCounts.set(os, (osCounts.get(os) ?? 0) + 1);

    const browser = e.browser ?? "(unknown)";
    browserCounts.set(browser, (browserCounts.get(browser) ?? 0) + 1);

    const device = e.device_type ?? "(unknown)";
    deviceCounts.set(device, (deviceCounts.get(device) ?? 0) + 1);

    const country = e.country ?? "(unknown)";
    const city = e.city ?? "(unknown)";
    const locKey = `${city}, ${country}`;
    const locBucket = locationCounts.get(locKey) ?? { country, city, sessions: 0 };
    locBucket.sessions += 1;
    locationCounts.set(locKey, locBucket);
  }
  const by_traffic_source = [...sourceCounts.entries()]
    .map(([source, sessions]) => ({ source, sessions }))
    .sort((a, b) => b.sessions - a.sessions);
  const by_os = [...osCounts.entries()]
    .map(([label, sessions]) => ({ label, sessions }))
    .sort((a, b) => b.sessions - a.sessions);
  const by_browser = [...browserCounts.entries()]
    .map(([label, sessions]) => ({ label, sessions }))
    .sort((a, b) => b.sessions - a.sessions);
  const by_device = [...deviceCounts.entries()]
    .map(([label, sessions]) => ({ label, sessions }))
    .sort((a, b) => b.sessions - a.sessions);
  const by_location = [...locationCounts.values()]
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 10);

  const by_channel = { messenger: 0, web: 0 };
  for (const c of bookingClicks) {
    if (c.channel === "messenger") by_channel.messenger += 1;
    else if (c.channel === "web") by_channel.web += 1;
  }

  const byUtm = new Map<string, { utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; utm_content: string | null; page_views: number; booking_clicks: number }>();
  for (const e of events) {
    const key = utmKey(e);
    const bucket = byUtm.get(key) ?? { utm_source: e.utm_source, utm_medium: e.utm_medium, utm_campaign: e.utm_campaign, utm_content: e.utm_content, page_views: 0, booking_clicks: 0 };
    if (e.event_type === "page_view") bucket.page_views += 1;
    else bucket.booking_clicks += 1;
    byUtm.set(key, bucket);
  }
  const by_utm = [...byUtm.values()].sort((a, b) => b.booking_clicks - a.booking_clicks || b.page_views - a.page_views);

  const byDayEvents = new Map<string, { page_views: number; booking_clicks: number }>();
  for (const e of events) {
    const day = dayKey(e.created_at);
    const bucket = byDayEvents.get(day) ?? { page_views: 0, booking_clicks: 0 };
    if (e.event_type === "page_view") bucket.page_views += 1;
    else bucket.booking_clicks += 1;
    byDayEvents.set(day, bucket);
  }
  const clicks_over_time = [...byDayEvents.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => ({ date, page_views: v.page_views, booking_clicks: v.booking_clicks }));

  return NextResponse.json({
    range: { from, to },
    orders: {
      total_orders,
      total_revenue,
      paid_orders,
      unpaid_orders,
      avg_order_value,
      status_breakdown,
      source_breakdown,
      orders_over_time,
    },
    referral_breakdown,
    tracking: {
      total_page_views,
      total_booking_clicks,
      total_sessions,
      click_through_rate,
      bounce_rate,
      avg_pages_per_session,
      by_channel,
      by_utm,
      clicks_over_time,
      top_pages,
      by_traffic_source,
      by_os,
      by_browser,
      by_device,
      by_location,
    },
  });
}
