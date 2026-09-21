"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Trash2, Save, Eye, EyeOff, GripVertical,
  Clock, Tag, HelpCircle, FileText, LogOut, Check, X, Loader2,
  BarChart2, ExternalLink, LineChart as LineChartIcon, DollarSign,
  ShoppingBag, MousePointerClick, TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

// ── Types ────────────────────────────────────────────────────
type Category = { id: string; name: string; subtitle: string; sort_order: number; is_published: boolean };
type PricingItem = { id: string; category_id: string; item: string; price: string; sort_order: number; is_published: boolean };
type Hour = { id: string; day_of_week: number; day_name: string; open_time: string | null; close_time: string | null; is_closed: boolean };
type FaqItem = { id: string; question: string; answer: string; sort_order: number; is_published: boolean };
type ContentItem = { key: string; label: string; value: string; section: string };

const TABS = [
  { id: "pricing",   label: "Pricing",       icon: Tag },
  { id: "hours",     label: "Hours",         icon: Clock },
  { id: "faq",       label: "FAQ",           icon: HelpCircle },
  { id: "content",   label: "Content",       icon: FileText },
  { id: "insights",  label: "Insights",      icon: LineChartIcon },
  { id: "tracking",  label: "Tracking Setup", icon: BarChart2 },
] as const;
type Tab = (typeof TABS)[number]["id"];

// ── API helpers ───────────────────────────────────────────────
function apiHeaders(pw: string) {
  return { "Content-Type": "application/json", "x-admin-password": pw };
}
async function apiFetch(pw: string, table: string) {
  const r = await fetch(`/api/admin?table=${table}`, { headers: apiHeaders(pw) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiPost(pw: string, table: string, row: object) {
  const r = await fetch("/api/admin", { method: "POST", headers: apiHeaders(pw), body: JSON.stringify({ table, row }) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiPatch(pw: string, table: string, id: string | null, row: object, key?: string) {
  const r = await fetch("/api/admin", { method: "PATCH", headers: apiHeaders(pw), body: JSON.stringify({ table, id, key, row }) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
async function apiDelete(pw: string, table: string, id: string) {
  const r = await fetch("/api/admin", { method: "DELETE", headers: apiHeaders(pw), body: JSON.stringify({ table, id }) });
  if (!r.ok) throw new Error(await r.text());
}

// ── Small UI pieces ───────────────────────────────────────────
function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium text-white transition-all ${ok ? "bg-teal-600" : "bg-red-500"}`}>
      {ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      {msg}
    </div>
  );
}

function Spinner() {
  return <Loader2 className="w-4 h-4 animate-spin" />;
}

function Badge({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} title={on ? "Published" : "Hidden"} className={`w-8 h-5 rounded-full transition-colors flex items-center ${on ? "bg-teal-500" : "bg-slate-300"}`}>
      <span className={`w-4 h-4 rounded-full bg-white shadow transition-transform mx-0.5 ${on ? "translate-x-3" : "translate-x-0"}`} />
    </button>
  );
}

// ── Login screen ──────────────────────────────────────────────
function LoginScreen({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(false);
    try {
      const r = await fetch("/api/admin?table=site_content", { headers: apiHeaders(pw) });
      if (r.ok) { onAuth(pw); }
      else setErr(true);
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d3d4f" }}>
      <div className="bg-white rounded-3xl p-10 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#dff0f7" }}>
            <Tag className="w-7 h-7" style={{ color: "#38a9c2" }} />
          </div>
          <h1 className="text-xl font-bold" style={{ color: "#0F172A" }}>Admin Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>The Laundry Project</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className="w-full px-4 py-3 rounded-xl text-sm border outline-none focus:ring-2"
            style={{ borderColor: err ? "#ef4444" : "#b3dde8" }}
            autoFocus
          />
          {err && <p className="text-xs text-red-500">Incorrect password.</p>}
          <button
            type="submit"
            disabled={loading || !pw}
            className="w-full py-3 rounded-xl font-bold text-sm text-white transition-opacity disabled:opacity-50"
            style={{ background: "#38a9c2" }}
          >
            {loading ? "Checking…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── PRICING TAB ───────────────────────────────────────────────
function PricingTab({ pw, toast }: { pw: string; toast: (m: string, ok?: boolean) => void }) {
  const [cats, setCats] = useState<Category[]>([]);
  const [items, setItems] = useState<PricingItem[]>([]);
  const [selCat, setSelCat] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string>("");
  const [newItem, setNewItem] = useState({ item: "", price: "" });
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [catDragIdx, setCatDragIdx] = useState<number | null>(null);
  const [catDragOverIdx, setCatDragOverIdx] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [c, i] = await Promise.all([apiFetch(pw, "pricing_categories"), apiFetch(pw, "pricing_items")]);
      setCats(c);
      setItems(i);
      if (!selCat && c.length) setSelCat(c[0].id);
    } catch { toast("Failed to load pricing", false); }
    finally { setLoading(false); }
  }, [pw, selCat, toast]);

  useEffect(() => { load(); }, []);

  const catItems = items.filter(i => i.category_id === selCat).sort((a, b) => a.sort_order - b.sort_order);
  const selCatData = cats.find(c => c.id === selCat);

  async function updateItem(id: string, field: string, value: string | boolean) {
    setSaving(id);
    try {
      await apiPatch(pw, "pricing_items", id, { [field]: value });
      setItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
      toast("Saved");
    } catch { toast("Save failed", false); }
    finally { setSaving(""); }
  }

  async function addItem() {
    if (!newItem.item || !newItem.price) return;
    setSaving("new");
    try {
      const row = await apiPost(pw, "pricing_items", {
        category_id: selCat, item: newItem.item, price: newItem.price,
        sort_order: catItems.length, is_published: true,
      });
      setItems(prev => [...prev, row]);
      setNewItem({ item: "", price: "" });
      toast("Item added");
    } catch { toast("Add failed", false); }
    finally { setSaving(""); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    try {
      await apiDelete(pw, "pricing_items", id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast("Deleted");
    } catch { toast("Delete failed", false); }
  }

  function handleDrop(toIdx: number) {
    if (dragIdx === null || dragIdx === toIdx) { setDragIdx(null); setDragOverIdx(null); return; }
    const reordered = [...catItems];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(toIdx, 0, moved);
    // Optimistic local update
    setItems(prev => [
      ...prev.filter(i => i.category_id !== selCat),
      ...reordered.map((item, i) => ({ ...item, sort_order: i })),
    ]);
    // Persist new sort_orders
    reordered.forEach((item, i) => {
      apiPatch(pw, "pricing_items", item.id, { sort_order: i }).catch(() => {});
    });
    setDragIdx(null);
    setDragOverIdx(null);
  }

  function handleCatDrop(toIdx: number) {
    if (catDragIdx === null || catDragIdx === toIdx) { setCatDragIdx(null); setCatDragOverIdx(null); return; }
    const sorted = [...cats].sort((a, b) => a.sort_order - b.sort_order);
    const [moved] = sorted.splice(catDragIdx, 1);
    sorted.splice(toIdx, 0, moved);
    setCats(sorted.map((c, i) => ({ ...c, sort_order: i })));
    sorted.forEach((c, i) => {
      apiPatch(pw, "pricing_categories", c.id, { sort_order: i }).catch(() => {});
    });
    setCatDragIdx(null);
    setCatDragOverIdx(null);
  }

  async function updateCat(field: string, value: string) {
    if (!selCat) return;
    try {
      await apiPatch(pw, "pricing_categories", selCat, { [field]: value });
      setCats(prev => prev.map(c => c.id === selCat ? { ...c, [field]: value } : c));
      toast("Saved");
    } catch { toast("Save failed", false); }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Category sidebar */}
      <div className="lg:col-span-1">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#94A3B8" }}>Categories</p>
        <p className="text-[10px] mb-3" style={{ color: "#b3c4cf" }}>Drag to reorder</p>
        <div className="space-y-1">
          {[...cats].sort((a, b) => a.sort_order - b.sort_order).map((c, idx) => (
            <div
              key={c.id}
              draggable
              onDragStart={() => setCatDragIdx(idx)}
              onDragOver={e => { e.preventDefault(); setCatDragOverIdx(idx); }}
              onDrop={() => handleCatDrop(idx)}
              onDragEnd={() => { setCatDragIdx(null); setCatDragOverIdx(null); }}
              style={{
                opacity: catDragIdx === idx ? 0.4 : 1,
                borderTop: catDragOverIdx === idx && catDragIdx !== null && catDragIdx !== idx ? "2px solid #38a9c2" : undefined,
                cursor: "grab",
              }}
            >
              <button
                onClick={() => setSelCat(c.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                style={{
                  background: selCat === c.id ? "#38a9c2" : "#f8fafc",
                  color: selCat === c.id ? "#fff" : "#0F172A",
                  border: "1px solid",
                  borderColor: selCat === c.id ? "#38a9c2" : "#e2e8f0",
                }}
              >
                <GripVertical className="w-3.5 h-3.5 shrink-0 opacity-40" />
                <div className="min-w-0">
                  <span className="block truncate">{c.name}</span>
                  <span className="text-[10px] opacity-70">{items.filter(i => i.category_id === c.id).length} items</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Items panel */}
      <div className="lg:col-span-3 space-y-4">
        {selCatData && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#94A3B8" }}>Category info</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#64748B" }}>Name</label>
                <input
                  defaultValue={selCatData.name}
                  onBlur={e => updateCat("name", e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                  style={{ borderColor: "#b3dde8" }}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#64748B" }}>Subtitle</label>
                <input
                  defaultValue={selCatData.subtitle}
                  onBlur={e => updateCat("subtitle", e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                  style={{ borderColor: "#b3dde8" }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>Items ({catItems.length})</p>
            <p className="text-xs" style={{ color: "#94A3B8" }}>Click a value to edit it</p>
          </div>

          {/* Item rows */}
          <div className="divide-y divide-slate-100">
            {catItems.map((item, idx) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => setDragIdx(idx)}
                onDragOver={e => { e.preventDefault(); setDragOverIdx(idx); }}
                onDrop={() => handleDrop(idx)}
                onDragEnd={() => { setDragIdx(null); setDragOverIdx(null); }}
                className="flex items-center gap-3 px-5 py-3 transition-colors"
                style={{
                  opacity: dragIdx === idx ? 0.4 : 1,
                  background: dragOverIdx === idx && dragIdx !== idx ? "#f0fbfd" : undefined,
                  borderTop: dragOverIdx === idx && dragIdx !== null && dragIdx !== idx ? "2px solid #38a9c2" : undefined,
                  cursor: "grab",
                }}
              >
                <GripVertical className="w-4 h-4 shrink-0" style={{ color: "#94a3b8" }} />
                <input
                  defaultValue={item.item}
                  onBlur={e => { if (e.target.value !== item.item) updateItem(item.id, "item", e.target.value); }}
                  className="flex-1 text-sm px-2 py-1 rounded border-transparent border focus:border-teal-300 outline-none bg-transparent"
                  style={{ color: "#0F172A" }}
                />
                <input
                  defaultValue={item.price}
                  onBlur={e => { if (e.target.value !== item.price) updateItem(item.id, "price", e.target.value); }}
                  className="w-32 text-sm px-2 py-1 rounded border-transparent border focus:border-teal-300 outline-none bg-transparent font-semibold"
                  style={{ color: "#1a7a94" }}
                />
                <Badge on={item.is_published} onClick={() => updateItem(item.id, "is_published", !item.is_published)} />
                {saving === item.id ? <Spinner /> : (
                  <button onClick={() => deleteItem(item.id)} className="text-slate-300 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add new item */}
          <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex gap-3 items-center">
            <Plus className="w-4 h-4 shrink-0" style={{ color: "#38a9c2" }} />
            <input
              placeholder="Item name"
              value={newItem.item}
              onChange={e => setNewItem(p => ({ ...p, item: e.target.value }))}
              className="flex-1 text-sm px-3 py-2 border rounded-lg outline-none focus:border-teal-400"
              style={{ borderColor: "#e2e8f0" }}
              onKeyDown={e => e.key === "Enter" && addItem()}
            />
            <input
              placeholder="Price (e.g. ₱330)"
              value={newItem.price}
              onChange={e => setNewItem(p => ({ ...p, price: e.target.value }))}
              className="w-36 text-sm px-3 py-2 border rounded-lg outline-none focus:border-teal-400"
              style={{ borderColor: "#e2e8f0" }}
              onKeyDown={e => e.key === "Enter" && addItem()}
            />
            <button
              onClick={addItem}
              disabled={saving === "new" || !newItem.item || !newItem.price}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-opacity"
              style={{ background: "#38a9c2" }}
            >
              {saving === "new" ? <Spinner /> : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HOURS TAB ─────────────────────────────────────────────────
function HoursTab({ pw, toast }: { pw: string; toast: (m: string, ok?: boolean) => void }) {
  const [hours, setHours] = useState<Hour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string>("");

  useEffect(() => {
    apiFetch(pw, "operating_hours")
      .then(setHours)
      .catch(() => toast("Failed to load hours", false))
      .finally(() => setLoading(false));
  }, []);

  async function update(id: string, field: string, value: string | boolean) {
    setSaving(id);
    try {
      const updated = await apiPatch(pw, "operating_hours", id, { [field]: value });
      setHours(prev => prev.map(h => h.id === id ? { ...h, ...updated } : h));
      toast("Hours saved");
    } catch { toast("Save failed", false); }
    finally { setSaving(""); }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-xl">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>Operating Hours</p>
          <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>Changes save automatically on blur</p>
        </div>
        <div className="divide-y divide-slate-100">
          {hours.sort((a, b) => a.day_of_week - b.day_of_week).map(h => (
            <div key={h.id} className="flex items-center gap-4 px-6 py-4">
              <span className="w-24 text-sm font-semibold" style={{ color: h.is_closed ? "#94A3B8" : "#0F172A" }}>{h.day_name}</span>
              {h.is_closed ? (
                <span className="flex-1 text-sm" style={{ color: "#94A3B8" }}>Closed</span>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="time"
                    defaultValue={h.open_time ?? "09:00"}
                    onBlur={e => update(h.id, "open_time", e.target.value)}
                    className="text-sm px-2 py-1.5 border rounded-lg outline-none focus:border-teal-400"
                    style={{ borderColor: "#b3dde8" }}
                  />
                  <span className="text-xs" style={{ color: "#94A3B8" }}>to</span>
                  <input
                    type="time"
                    defaultValue={h.close_time ?? "18:00"}
                    onBlur={e => update(h.id, "close_time", e.target.value)}
                    className="text-sm px-2 py-1.5 border rounded-lg outline-none focus:border-teal-400"
                    style={{ borderColor: "#b3dde8" }}
                  />
                </div>
              )}
              <div className="flex items-center gap-2 shrink-0">
                {saving === h.id && <Spinner />}
                <label className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: "#64748B" }}>
                  <input
                    type="checkbox"
                    checked={h.is_closed}
                    onChange={e => update(h.id, "is_closed", e.target.checked)}
                    className="accent-teal-500"
                  />
                  Closed
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs mt-3" style={{ color: "#94A3B8" }}>
        The website will reflect these hours within 60 seconds of saving.
      </p>
    </div>
  );
}

// ── FAQ TAB ───────────────────────────────────────────────────
function FaqTab({ pw, toast }: { pw: string; toast: (m: string, ok?: boolean) => void }) {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string>("");
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState({ question: "", answer: "" });
  const [isAdding, setIsAdding] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });

  useEffect(() => {
    apiFetch(pw, "faq_items")
      .then(data => setItems(data.sort((a: FaqItem, b: FaqItem) => a.sort_order - b.sort_order)))
      .catch(() => toast("Failed to load FAQ", false))
      .finally(() => setLoading(false));
  }, []);

  async function saveEdit(id: string) {
    setSaving(id);
    try {
      await apiPatch(pw, "faq_items", id, { ...draft, updated_at: new Date().toISOString() });
      setItems(prev => prev.map(i => i.id === id ? { ...i, ...draft } : i));
      setEditing(null);
      toast("Saved");
    } catch { toast("Save failed", false); }
    finally { setSaving(""); }
  }

  async function togglePublish(id: string, val: boolean) {
    setSaving(id);
    try {
      await apiPatch(pw, "faq_items", id, { is_published: val });
      setItems(prev => prev.map(i => i.id === id ? { ...i, is_published: val } : i));
      toast(val ? "Published" : "Hidden");
    } catch { toast("Save failed", false); }
    finally { setSaving(""); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this FAQ?")) return;
    try {
      await apiDelete(pw, "faq_items", id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast("Deleted");
    } catch { toast("Delete failed", false); }
  }

  async function addFaq() {
    if (!newFaq.question || !newFaq.answer) return;
    setSaving("new");
    try {
      const row = await apiPost(pw, "faq_items", {
        ...newFaq, sort_order: items.length, is_published: true,
      });
      setItems(prev => [...prev, row]);
      setNewFaq({ question: "", answer: "" });
      setIsAdding(false);
      toast("FAQ added");
    } catch { toast("Add failed", false); }
    finally { setSaving(""); }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="space-y-3 max-w-3xl">
      {items.map(item => (
        <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {editing === item.id ? (
            <div className="p-5 space-y-3">
              <input
                value={draft.question}
                onChange={e => setDraft(p => ({ ...p, question: e.target.value }))}
                className="w-full px-3 py-2 text-sm font-semibold border rounded-lg outline-none focus:border-teal-400"
                style={{ borderColor: "#b3dde8" }}
                placeholder="Question"
              />
              <textarea
                value={draft.answer}
                onChange={e => setDraft(p => ({ ...p, answer: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-teal-400 resize-none"
                style={{ borderColor: "#b3dde8" }}
                placeholder="Answer"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(item.id)}
                  disabled={saving === item.id}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "#38a9c2" }}
                >
                  {saving === item.id ? <Spinner /> : <Save className="w-3.5 h-3.5" />} Save
                </button>
                <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-sm border" style={{ borderColor: "#e2e8f0" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold mb-1" style={{ color: item.is_published ? "#0F172A" : "#94A3B8" }}>{item.question}</p>
                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#64748B" }}>{item.answer}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {saving === item.id && <Spinner />}
                  <Badge on={item.is_published} onClick={() => togglePublish(item.id, !item.is_published)} />
                  <button
                    onClick={() => { setEditing(item.id); setDraft({ question: item.question, answer: item.answer }); }}
                    className="text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors hover:bg-slate-50"
                    style={{ borderColor: "#b3dde8", color: "#38a9c2" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="text-slate-300 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add new */}
      {isAdding ? (
        <div className="bg-white rounded-2xl border border-teal-200 p-5 space-y-3">
          <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>New FAQ</p>
          <input
            value={newFaq.question}
            onChange={e => setNewFaq(p => ({ ...p, question: e.target.value }))}
            className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-teal-400"
            style={{ borderColor: "#b3dde8" }}
            placeholder="Question"
            autoFocus
          />
          <textarea
            value={newFaq.answer}
            onChange={e => setNewFaq(p => ({ ...p, answer: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-teal-400 resize-none"
            style={{ borderColor: "#b3dde8" }}
            placeholder="Answer"
          />
          <div className="flex gap-2">
            <button
              onClick={addFaq}
              disabled={saving === "new" || !newFaq.question || !newFaq.answer}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40"
              style={{ background: "#38a9c2" }}
            >
              {saving === "new" ? <Spinner /> : <Plus className="w-3.5 h-3.5" />} Add FAQ
            </button>
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-lg text-sm border" style={{ borderColor: "#e2e8f0" }}>Cancel</button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-dashed text-sm font-medium w-full justify-center transition-colors hover:bg-slate-50"
          style={{ borderColor: "#b3dde8", color: "#38a9c2" }}
        >
          <Plus className="w-4 h-4" /> Add new FAQ
        </button>
      )}
    </div>
  );
}

// ── CONTENT TAB ───────────────────────────────────────────────
function ContentTab({ pw, toast }: { pw: string; toast: (m: string, ok?: boolean) => void }) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string>("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    apiFetch(pw, "site_content")
      .then(data => {
        setItems(data);
        const d: Record<string, string> = {};
        data.forEach((c: ContentItem) => { d[c.key] = c.value; });
        setDrafts(d);
      })
      .catch(() => toast("Failed to load content", false))
      .finally(() => setLoading(false));
  }, []);

  async function save(key: string) {
    setSaving(key);
    try {
      await apiPatch(pw, "site_content", null, { value: drafts[key] }, key);
      setItems(prev => prev.map(i => i.key === key ? { ...i, value: drafts[key] } : i));
      toast("Saved");
    } catch { toast("Save failed", false); }
    finally { setSaving(""); }
  }

  const sections = [...new Set(items.map(i => i.section))];

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-2xl space-y-6">
      {sections.map(section => (
        <div key={section} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-widest capitalize" style={{ color: "#38a9c2" }}>{section}</p>
          </div>
          <div className="divide-y divide-slate-100">
            {items.filter(i => i.section === section).map(item => {
              const isLong = item.value.length > 80 || item.key.includes("body") || item.key.includes("subtext");
              const changed = drafts[item.key] !== item.value;
              return (
                <div key={item.key} className="px-5 py-4">
                  <label className="text-xs font-medium block mb-2" style={{ color: "#64748B" }}>{item.label}</label>
                  {isLong ? (
                    <textarea
                      value={drafts[item.key] ?? item.value}
                      onChange={e => setDrafts(p => ({ ...p, [item.key]: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-teal-400 resize-none"
                      style={{ borderColor: "#b3dde8" }}
                    />
                  ) : (
                    <input
                      value={drafts[item.key] ?? item.value}
                      onChange={e => setDrafts(p => ({ ...p, [item.key]: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-teal-400"
                      style={{ borderColor: "#b3dde8" }}
                    />
                  )}
                  {changed && (
                    <button
                      onClick={() => save(item.key)}
                      disabled={saving === item.key}
                      className="mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: "#38a9c2" }}
                    >
                      {saving === item.key ? <Spinner /> : <Save className="w-3 h-3" />} Save changes
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── INSIGHTS TAB ──────────────────────────────────────────────
type AnalyticsPayload = {
  range: { from: string; to: string };
  orders: {
    total_orders: number;
    total_revenue: number;
    paid_orders: number;
    unpaid_orders: number;
    avg_order_value: number;
    status_breakdown: Record<string, number>;
    source_breakdown: Record<string, number>;
    orders_over_time: { date: string; count: number; revenue: number }[];
  };
  referral_breakdown: {
    referral_ref: string;
    order_count: number;
    revenue: number;
    decoded_utm: { utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_content?: string } | null;
  }[];
  tracking: {
    total_page_views: number;
    total_booking_clicks: number;
    click_through_rate: number;
    by_channel: { messenger: number; web: number };
    by_utm: {
      utm_source: string | null;
      utm_medium: string | null;
      utm_campaign: string | null;
      utm_content: string | null;
      page_views: number;
      booking_clicks: number;
    }[];
    clicks_over_time: { date: string; page_views: number; booking_clicks: number }[];
  };
};

function peso(n: number) {
  return `₱${Math.round(n).toLocaleString("en-PH")}`;
}

function KpiCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: color + "18" }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </span>
        <p className="text-xs font-medium" style={{ color: "#64748B" }}>{label}</p>
      </div>
      <p className="text-2xl font-bold" style={{ color: "#0F172A" }}>{value}</p>
    </div>
  );
}

function InsightsTab({ pw, toast }: { pw: string; toast: (m: string, ok?: boolean) => void }) {
  const [data, setData] = useState<AnalyticsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/analytics", { headers: apiHeaders(pw) })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then(setData)
      .catch(() => { setError(true); toast("Failed to load insights", false); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;
  if (error || !data) return <p className="text-sm" style={{ color: "#64748B" }}>Couldn&apos;t load insights right now.</p>;

  const utmLabel = (row: { utm_source: string | null; utm_medium: string | null; utm_campaign: string | null; utm_content: string | null }) =>
    row.utm_content || row.utm_campaign || row.utm_source || "(direct/organic)";

  const utmChartData = data.tracking.by_utm
    .filter((r) => r.utm_source)
    .slice(0, 10)
    .map((r) => ({ name: utmLabel(r), "Page views": r.page_views, "Booking clicks": r.booking_clicks }));

  return (
    <div className="space-y-6 max-w-5xl">
      <p className="text-xs" style={{ color: "#94A3B8" }}>
        Last 30 days · {new Date(data.range.from).toLocaleDateString()} – {new Date(data.range.to).toLocaleDateString()}
      </p>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KpiCard icon={ShoppingBag} label="Orders" value={String(data.orders.total_orders)} color="#38a9c2" />
        <KpiCard icon={DollarSign} label="Revenue" value={peso(data.orders.total_revenue)} color="#16a34a" />
        <KpiCard icon={TrendingUp} label="Avg order value" value={peso(data.orders.avg_order_value)} color="#0d3d4f" />
        <KpiCard icon={MousePointerClick} label="Booking clicks" value={String(data.tracking.total_booking_clicks)} color="#fdca00" />
        <KpiCard icon={LineChartIcon} label="Click-through rate" value={`${(data.tracking.click_through_rate * 100).toFixed(1)}%`} color="#1877f2" />
      </div>

      {/* Orders over time */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <p className="text-sm font-semibold mb-4" style={{ color: "#0F172A" }}>Orders &amp; revenue over time</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data.orders.orders_over_time}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value, name) => (name === "Revenue" ? peso(Number(value)) : value)} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="count" name="Orders" stroke="#38a9c2" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="#fdca00" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Booking clicks by campaign */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <p className="text-sm font-semibold mb-1" style={{ color: "#0F172A" }}>Booking clicks by campaign</p>
        <p className="text-xs mb-4" style={{ color: "#94A3B8" }}>
          Reliable — sourced from this site&apos;s own click tracking, e.g. a Meta ad with <code>utm_content=ad1</code>.
        </p>
        {utmChartData.length === 0 ? (
          <p className="text-sm py-8 text-center" style={{ color: "#94A3B8" }}>No UTM-tagged traffic yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={utmChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Page views" fill="#b3dde8" />
              <Bar dataKey="Booking clicks" fill="#38a9c2" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* UTM breakdown table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>Traffic by source / medium / campaign / content</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left" style={{ color: "#94A3B8" }}>
                <th className="px-5 py-2 font-medium">Source</th>
                <th className="px-5 py-2 font-medium">Medium</th>
                <th className="px-5 py-2 font-medium">Campaign</th>
                <th className="px-5 py-2 font-medium">Content</th>
                <th className="px-5 py-2 font-medium text-right">Page views</th>
                <th className="px-5 py-2 font-medium text-right">Booking clicks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.tracking.by_utm.map((row, i) => (
                <tr key={i}>
                  <td className="px-5 py-2.5">{row.utm_source ?? "(direct)"}</td>
                  <td className="px-5 py-2.5">{row.utm_medium ?? "—"}</td>
                  <td className="px-5 py-2.5">{row.utm_campaign ?? "—"}</td>
                  <td className="px-5 py-2.5">{row.utm_content ?? "—"}</td>
                  <td className="px-5 py-2.5 text-right">{row.page_views}</td>
                  <td className="px-5 py-2.5 text-right font-semibold" style={{ color: "#38a9c2" }}>{row.booking_clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approximate: orders reconciled via Messenger referral code */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#f1f5f9", background: "#f8fafc" }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
          <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>Orders by referral (approximate)</p>
          <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
            Best-effort match via the Messenger referral code — only covers bookings made through Messenger,
            and isn&apos;t guaranteed. Not available for Web Booking orders.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left" style={{ color: "#94A3B8" }}>
                <th className="px-5 py-2 font-medium">Referral</th>
                <th className="px-5 py-2 font-medium text-right">Orders</th>
                <th className="px-5 py-2 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.referral_breakdown.map((row, i) => (
                <tr key={i}>
                  <td className="px-5 py-2.5">{row.referral_ref}</td>
                  <td className="px-5 py-2.5 text-right">{row.order_count}</td>
                  <td className="px-5 py-2.5 text-right">{peso(row.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── ANALYTICS TAB ────────────────────────────────────────────
const TRACKERS = [
  {
    key:         "ga_id",
    label:       "Google Analytics 4",
    placeholder: "G-XXXXXXXXXX",
    hint:        "analytics.google.com → Admin → Data Streams → Measurement ID",
    link:        "https://analytics.google.com",
    color:       "#e37400",
    badge:       "GA4",
  },
  {
    key:         "meta_pixel_id",
    label:       "Meta Pixel",
    placeholder: "1234567890123456",
    hint:        "business.facebook.com → Events Manager → Pixels → Pixel ID",
    link:        "https://business.facebook.com/events_manager",
    color:       "#1877f2",
    badge:       "META",
  },
  {
    key:         "hotjar_id",
    label:       "Hotjar",
    placeholder: "1234567",
    hint:        "hotjar.com → Sites → your site → Site ID (leave blank if using Clarity)",
    link:        "https://insights.hotjar.com",
    color:       "#fd3a5c",
    badge:       "HJ",
  },
  {
    key:         "clarity_id",
    label:       "Microsoft Clarity",
    placeholder: "abc123xyz0",
    hint:        "clarity.microsoft.com → your project → Settings → Project ID (leave blank if using Hotjar)",
    link:        "https://clarity.microsoft.com",
    color:       "#0078d4",
    badge:       "MS",
  },
] as const;

function AnalyticsTab({ pw, toast }: { pw: string; toast: (m: string, ok?: boolean) => void }) {
  const [drafts,  setDrafts]  = useState<Record<string, string>>({});
  const [saved,   setSaved]   = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState<string>("");

  useEffect(() => {
    apiFetch(pw, "site_content")
      .then((data: ContentItem[]) => {
        const analytics = data.filter(d => d.section === "analytics");
        const vals: Record<string, string> = {};
        analytics.forEach(r => { vals[r.key] = r.value; });
        setDrafts(vals);
        setSaved({ ...vals });
      })
      .catch(() => toast("Failed to load analytics settings", false))
      .finally(() => setLoading(false));
  }, []);

  async function saveKey(key: string) {
    setSaving(key);
    try {
      await apiPatch(pw, "site_content", null, { value: drafts[key] ?? "" }, key);
      setSaved(prev => ({ ...prev, [key]: drafts[key] ?? "" }));
      toast("Saved — changes live on next page load");
    } catch { toast("Save failed", false); }
    finally { setSaving(""); }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="max-w-2xl space-y-4">
      {/* Status banner */}
      <div className="rounded-2xl p-4 flex gap-3 items-start" style={{ background: "rgba(56,169,194,0.07)", border: "1px solid rgba(56,169,194,0.2)" }}>
        <BarChart2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#38a9c2" }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>Consent-gated tracking</p>
          <p className="text-xs leading-relaxed mt-0.5" style={{ color: "#64748B" }}>
            Scripts only load after a visitor clicks <strong>Accept All</strong> on the cookie banner.
            Paste your IDs below — they go live immediately, no redeploy required.
          </p>
        </div>
      </div>

      {/* Tracker cards */}
      {TRACKERS.map(t => {
        const current = drafts[t.key] ?? "";
        const original = saved[t.key] ?? "";
        const changed = current !== original;
        const active = original.trim().length > 0;

        return (
          <div key={t.key} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: active ? "#b3dde8" : "#e2e8f0" }}>
            <div className="px-5 py-4 flex items-center gap-3 border-b" style={{ borderColor: "#f1f5f9" }}>
              {/* Badge */}
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0"
                style={{ background: t.color + "18", color: t.color }}
              >
                {t.badge}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>{t.label}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {active ? (
                  <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#f1f5f9", color: "#94A3B8" }}>
                    Not configured
                  </span>
                )}
                <a
                  href={t.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  title={`Open ${t.label}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="px-5 py-4 space-y-3">
              <p className="text-[11px] leading-relaxed" style={{ color: "#94A3B8" }}>{t.hint}</p>
              <div className="flex gap-2">
                <input
                  value={current}
                  onChange={e => setDrafts(p => ({ ...p, [t.key]: e.target.value }))}
                  placeholder={t.placeholder}
                  className="flex-1 text-sm px-3 py-2 border rounded-lg outline-none focus:border-teal-400 font-mono"
                  style={{ borderColor: "#b3dde8", color: "#0F172A" }}
                  onKeyDown={e => e.key === "Enter" && changed && saveKey(t.key)}
                />
                <button
                  onClick={() => saveKey(t.key)}
                  disabled={!changed || saving === t.key}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-30"
                  style={{ background: "#38a9c2" }}
                >
                  {saving === t.key ? <Spinner /> : <Save className="w-3.5 h-3.5" />}
                  Save
                </button>
              </div>
              {active && current === original && (
                <p className="text-[11px]" style={{ color: "#16a34a" }}>
                  ✓ Tracking active — ID: <span className="font-mono">{original}</span>
                </p>
              )}
            </div>
          </div>
        );
      })}

      <p className="text-xs px-1" style={{ color: "#94A3B8" }}>
        To disable a tracker, clear its ID and save. The script will stop loading immediately.
      </p>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────
export default function AdminPage() {
  const [pw, setPw] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("pricing");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Persist auth in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) setPw(saved);
  }, []);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  function onAuth(password: string) {
    sessionStorage.setItem("admin_pw", password);
    setPw(password);
  }

  function logout() {
    sessionStorage.removeItem("admin_pw");
    setPw(null);
  }

  if (!pw) return <LoginScreen onAuth={onAuth} />;

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#0d3d4f" }}>
              <Tag className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight" style={{ color: "#0F172A" }}>Admin Dashboard</p>
              <p className="text-[10px]" style={{ color: "#94A3B8" }}>The Laundry Project</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-slate-50"
              style={{ borderColor: "#e2e8f0", color: "#64748B" }}
            >
              <Eye className="w-3.5 h-3.5" /> View site
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-50 hover:text-red-500 hover:border-red-200"
              style={{ borderColor: "#e2e8f0", color: "#64748B" }}
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors"
              style={{
                borderBottomColor: tab === id ? "#38a9c2" : "transparent",
                color: tab === id ? "#38a9c2" : "#64748B",
              }}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {tab === "pricing"   && <PricingTab   pw={pw} toast={showToast} />}
        {tab === "hours"     && <HoursTab     pw={pw} toast={showToast} />}
        {tab === "faq"       && <FaqTab       pw={pw} toast={showToast} />}
        {tab === "content"   && <ContentTab   pw={pw} toast={showToast} />}
        {tab === "insights"  && <InsightsTab  pw={pw} toast={showToast} />}
        {tab === "tracking"  && <AnalyticsTab pw={pw} toast={showToast} />}
      </main>

      {toast && <Toast msg={toast.msg} ok={toast.ok} />}
    </div>
  );
}
