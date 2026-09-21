import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client — used on the website for SELECTs
export const supabase = createClient(url, anonKey);

// Server client — revalidates every 60 seconds (Next.js ISR)
export function createServerClient() {
  return createClient(url, anonKey, {
    global: {
      fetch: (input, init) =>
        fetch(input as string, {
          ...(init as RequestInit),
          next: { revalidate: 60 },
        } as RequestInit),
    },
  });
}

// Types
export type PricingCategory = {
  id: string;
  name: string;
  subtitle: string;
  sort_order: number;
  is_published: boolean;
};

export type PricingItem = {
  id: string;
  category_id: string;
  item: string;
  price: string;
  sort_order: number;
  is_published: boolean;
};

export type OperatingHour = {
  id: string;
  day_of_week: number;
  day_name: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
};

export type SiteContent = {
  key: string;
  label: string;
  value: string;
  section: string;
};

export type MarketingEvent = {
  id: string;
  created_at: string;
  event_type: "page_view" | "booking_click";
  session_id: string;
  channel: "messenger" | "web" | null;
  path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
};
