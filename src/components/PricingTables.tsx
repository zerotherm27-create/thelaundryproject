"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ── Data ─────────────────────────────────────────────────────── */

const basicServices = [
  { item: "Small Bag (5 kg max)",            price: "₱330"       },
  { item: "Large Bag (8 kg max)",            price: "₱440"       },
  { item: "Beddings / Towels (3 kg max)",    price: "₱440"       },
  { item: "Comforter — Twin / Single",       price: "₱350"       },
  { item: "Comforter — Full Size",           price: "₱400"       },
  { item: "Comforter — Queen Size",          price: "₱500"       },
  { item: "Comforter — King Size",           price: "₱600"       },
  { item: "Blanket — Single / Twin",         price: "₱200"       },
  { item: "Blanket — Queen / King",          price: "₱250"       },
  { item: "Hand Wash (3 kg min; +₱160/kg)", price: "₱480"       },
];

const ironingServices = [
  { item: "Tops — Short Sleeves", price: "₱58"  },
  { item: "Tops — Long Sleeves",  price: "₱68"  },
  { item: "Pants",                price: "₱68"  },
  { item: "Shorts",               price: "₱55"  },
  { item: "Long Skirts",          price: "₱68"  },
  { item: "Mini Skirts",          price: "₱58"  },
  { item: "Short Dress",          price: "₱250" },
  { item: "Long Dress",           price: "₱350" },
  { item: "Jackets",              price: "₱280" },
  { item: "Handkerchief",         price: "₱20"  },
  { item: "Hangers",              price: "₱15"  },
];

const dryCleanServices = [
  { item: "Men's Coat (S–XL)",              price: "₱650–₱1,600" },
  { item: "Women's Blazer (S–XL)",          price: "₱550–₱1,500" },
  { item: "Polo / Dress Shirt",             price: "₱600–₱800"   },
  { item: "Short Dress",                    price: "₱1,400"       },
  { item: "Long Dress",                     price: "₱1,800"       },
  { item: "Barong Tagalog",                 price: "₱350–₱650"   },
  { item: "Leather / Winter / Puffer Jacket", price: "₱1,400–₱2,100" },
  { item: "Trench Coat",                    price: "₱2,000"       },
  { item: "Pants / Trousers",               price: "₱750"         },
  { item: "Vest",                           price: "₱500"         },
  { item: "Tie",                            price: "₱250"         },
  { item: "Gowns",                          price: "Custom"       },
];

const footwearItems = [
  { item: "Rubber Shoes",          price: "₱900"  },
  { item: "Sneakers",              price: "₱800"  },
  { item: "Slippers",              price: "₱400"  },
  { item: "Water Repellant Add-on", price: "+₱100" },
];

const specialItems = [
  { item: "Jacket Machine Wash (S–L)",          price: "₱400–₱650"   },
  { item: "Sweatshirt / Hoodie",                price: "₱350"         },
  { item: "Stuffed Toy — Small (10–20 cm)",     price: "₱200"         },
  { item: "Stuffed Toy — Medium (20–45 cm)",    price: "₱350"         },
  { item: "Stuffed Toy — Large (40–65 cm)",     price: "₱800"         },
  { item: "Stuffed Toy — XL (65–95 cm)",        price: "₱1,300"       },
  { item: "Stuffed Toy — Life Size (100 cm+)",  price: "₱2,200–₱3,000"},
  { item: "Rugs / Bath Mat — Regular",          price: "₱80"          },
  { item: "Rugs / Bath Mat — Long",             price: "₱120"         },
  { item: "Bolsters",                           price: "₱440–₱540"   },
  { item: "Feather Pillows",                    price: "₱270–₱420"   },
  { item: "Memory Pillows",                     price: "₱250–₱400"   },
  { item: "Deco Pillows",                       price: "₱200–₱300"   },
  { item: "Travel Pillow",                      price: "₱180"         },
  { item: "Sofa Cover (1–3 seater)",            price: "₱105–₱145"   },
  { item: "Sofa Cover L-Shape",                 price: "₱215"         },
  { item: "Cap",                                price: "₱250"         },
  { item: "Helmet",                             price: "₱800"         },
  { item: "Backpacks (S–XL)",                   price: "₱600–₱1,500" },
  { item: "Messenger Bag",                      price: "₱350"         },
  { item: "Tote Bag",                           price: "₱500"         },
  { item: "Knapsack",                           price: "₱400"         },
  { item: "Duffle Bag",                         price: "₱650"         },
  { item: "Curtains (3 kg min)",                price: "₱600"         },
  { item: "Carpet",                             price: "Custom"       },
];

type Card = {
  id: string;
  title: string;
  subtitle: string;
  items: { item: string; price: string }[];
  accent?: boolean;
};

const CARDS: Card[] = [
  { id: "machine-wash", title: "Machine Wash",    subtitle: "Everyday laundry & beddings",  items: basicServices    },
  { id: "ironing",      title: "Press & Ironing", subtitle: "Professional finishing",        items: ironingServices  },
  { id: "dry-cleaning", title: "Dry Cleaning",    subtitle: "Formal & delicate wear",        items: dryCleanServices },
  { id: "footwear",     title: "Footwear",        subtitle: "Sneakers, shoes & slippers",    items: footwearItems    },
];

/* ── DB prop types ────────────────────────────────────────────── */

type DbCategory = {
  id: string;
  name: string;
  subtitle: string;
  sort_order: number;
  is_published: boolean;
};

type DbItem = {
  id: string;
  category_id: string;
  item: string;
  price: string;
  sort_order: number;
  is_published: boolean;
};

/* ── CollapsibleCard ──────────────────────────────────────────── */

function CollapsibleCard({
  card,
  isOpen,
  onToggle,
}: {
  card: Card;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { title, subtitle, items, accent } = card;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={accent
        ? { border: "2px solid #38a9c2", boxShadow: "0 4px 20px rgba(56,169,194,0.15)" }
        : { border: "1px solid #b3dde8" }
      }
    >
      {/* ── Header (toggle button) ── */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`pricing-${card.id}`}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors"
        style={{ background: accent ? "#38a9c2" : isOpen ? "#d8eef5" : "#dff0f7" }}
      >
        <div className="min-w-0">
          <p
            className="text-sm font-bold leading-tight"
            style={{ color: accent ? "#ffffff" : "#0F172A" }}
          >
            {title}
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: accent ? "rgba(255,255,255,0.8)" : "#64748B" }}
          >
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: accent ? "rgba(255,255,255,0.2)" : "#b3dde8",
              color: accent ? "#ffffff" : "#0d3d4f",
            }}
          >
            {items.length} items
          </span>
          <ChevronDown
            className="w-4 h-4 transition-transform duration-200"
            style={{
              color: accent ? "#ffffff" : "#38a9c2",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* ── Collapsible body ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`pricing-${card.id}`}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="bg-white columns-1 sm:columns-2 gap-0">
              {items.map((row, i) => (
                <div
                  key={row.item}
                  className="flex justify-between items-center px-4 py-1.5 text-xs border-b border-slate-100 break-inside-avoid"
                >
                  <span style={{ color: "#475569" }}>{row.item}</span>
                  <span
                    className="font-semibold tabular-nums shrink-0 ml-2"
                    style={{ color: "#1a7a94" }}
                  >
                    {row.price}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────── */

export default function PricingTables({
  dbCategories,
  dbItems,
}: {
  dbCategories?: DbCategory[];
  dbItems?: DbItem[];
} = {}) {
  // ── Build card list from DB if available, else use hardcoded ──
  const specialCatId = dbCategories?.find((c) => c.name === "Special Items")?.id;

  const cards: Card[] =
    dbCategories && dbItems
      ? dbCategories
          .filter((c) => c.is_published && c.name !== "Special Items")
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((c) => ({
            id: c.id,
            title: c.name,
            subtitle: c.subtitle,
            items: dbItems
              .filter((i) => i.category_id === c.id && i.is_published)
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((i) => ({ item: i.item, price: i.price })),
          }))
      : CARDS;

  const specialItemsToShow: { item: string; price: string }[] =
    dbCategories && dbItems && specialCatId
      ? dbItems
          .filter((i) => i.category_id === specialCatId && i.is_published)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((i) => ({ item: i.item, price: i.price }))
      : specialItems;

  // Open the first card by default
  const [open, setOpen] = useState<Set<string>>(
    new Set([cards[0]?.id ?? "machine-wash"])
  );
  const [specialOpen, setSpecialOpen] = useState(false);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const allOpen = open.size === cards.length;

  return (
    <div>
      {/* ── Top bar: note + expand controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <p className="text-xs" style={{ color: "#64748B" }}>
          All prices in Philippine Peso (₱). May vary by garment condition &amp; size.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => { setOpen(new Set(cards.map((c) => c.id))); setSpecialOpen(true); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
            style={{ background: "#dff0f7", border: "1px solid #b3dde8", color: "#0d3d4f" }}
          >
            <ChevronDown className="w-3 h-3" aria-hidden="true" />
            Expand all
          </button>
          <button
            type="button"
            onClick={() => { setOpen(new Set()); setSpecialOpen(false); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
            style={{ background: "#dff0f7", border: "1px solid #b3dde8", color: "#0d3d4f" }}
          >
            <ChevronDown className="w-3 h-3 rotate-180" aria-hidden="true" />
            Collapse all
          </button>
        </div>
      </div>

      {/* ── Stacked list — collapse actually saves vertical space ── */}
      <div className="flex flex-col gap-2 mb-3">
        {cards.map((card) => (
          <CollapsibleCard
            key={card.id}
            card={card}
            isOpen={open.has(card.id)}
            onToggle={() => toggle(card.id)}
          />
        ))}
      </div>

      {/* ── Special Items (full-width collapsible) ── */}
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #b3dde8" }}>
        <button
          type="button"
          onClick={() => setSpecialOpen((v) => !v)}
          aria-expanded={specialOpen}
          aria-controls="pricing-special"
          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition-colors"
          style={{ background: specialOpen ? "#d8eef5" : "#dff0f7" }}
        >
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight" style={{ color: "#0F172A" }}>
              Special Items
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
              Jackets, stuffed toys, pillows, bags, curtains &amp; more
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#b3dde8", color: "#0d3d4f" }}
            >
              {specialItemsToShow.length} items
            </span>
            <ChevronDown
              className="w-4 h-4 transition-transform duration-200"
              style={{
                color: "#38a9c2",
                transform: specialOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
              aria-hidden="true"
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {specialOpen && (
            <motion.div
              id="pricing-special"
              key="special-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="bg-white">
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-0">
                  {specialItemsToShow.map((row, i) => (
                    <div
                      key={row.item}
                      className="flex justify-between items-center px-4 py-1.5 text-xs border-b border-slate-100 break-inside-avoid"
                    >
                      <span style={{ color: "#475569" }}>{row.item}</span>
                      <span
                        className="font-semibold tabular-nums shrink-0 ml-2"
                        style={{ color: "#0F172A" }}
                      >
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
