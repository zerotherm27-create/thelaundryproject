import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function checkAuth(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  return pw === process.env.ADMIN_PASSWORD;
}

const unauthorized = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// ── GET: fetch any table ──────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  const table = req.nextUrl.searchParams.get("table");
  if (!table) return NextResponse.json({ error: "Missing table" }, { status: 400 });

  let query = supabase.from(table).select("*");

  if (table === "pricing_items") {
    query = supabase
      .from("pricing_items")
      .select("*, pricing_categories(name)")
      .order("sort_order");
  } else if (table === "pricing_categories") {
    query = supabase.from("pricing_categories").select("*").order("sort_order");
  } else if (table === "operating_hours") {
    query = supabase.from("operating_hours").select("*").order("day_of_week");
  } else if (table === "faq_items") {
    query = supabase.from("faq_items").select("*").order("sort_order");
  } else if (table === "site_content") {
    query = supabase.from("site_content").select("*").order("section");
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// ── POST: insert row ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  const { table, row } = await req.json();
  const { data, error } = await supabase.from(table).insert(row).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// ── PATCH: update row ─────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  const { table, id, key, row } = await req.json();

  let q;
  if (key) {
    // site_content uses text PK (key)
    q = supabase.from(table).update({ ...row, updated_at: new Date().toISOString() }).eq("key", key);
  } else {
    q = supabase.from(table).update(row).eq("id", id);
  }

  const { data, error } = await q.select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// ── DELETE: remove row ────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return unauthorized();
  const { table, id } = await req.json();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
