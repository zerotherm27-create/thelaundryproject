import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EVENT_TYPES = new Set(["page_view", "booking_click"]);
const CHANNELS = new Set(["messenger", "web"]);
const MAX_FIELD_LEN = 200;
const MAX_SESSION_LEN = 100;

function clip(value: unknown, maxLen: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLen);
}

// ── POST: log a page_view or booking_click event ────────────────
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event_type = body.event_type;
  if (typeof event_type !== "string" || !EVENT_TYPES.has(event_type)) {
    return NextResponse.json({ error: "Invalid event_type" }, { status: 400 });
  }

  const session_id = clip(body.session_id, MAX_SESSION_LEN);
  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  let channel: string | null = null;
  if (event_type === "booking_click") {
    if (typeof body.channel !== "string" || !CHANNELS.has(body.channel)) {
      return NextResponse.json({ error: "Invalid channel" }, { status: 400 });
    }
    channel = body.channel;
  }

  // Explicit whitelist — never spread the raw request body into the insert.
  const row = {
    event_type,
    session_id,
    channel,
    path: clip(body.path, MAX_FIELD_LEN),
    referrer: clip(body.referrer, MAX_FIELD_LEN),
    utm_source: clip(body.utm_source, MAX_FIELD_LEN),
    utm_medium: clip(body.utm_medium, MAX_FIELD_LEN),
    utm_campaign: clip(body.utm_campaign, MAX_FIELD_LEN),
    utm_content: clip(body.utm_content, MAX_FIELD_LEN),
    utm_term: clip(body.utm_term, MAX_FIELD_LEN),
  };

  const { error } = await supabase.from("marketing_events").insert(row);
  if (error) {
    // Duplicate page_view for an existing session (refresh) — treat as success.
    if (error.code === "23505") return NextResponse.json({ ok: true });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
