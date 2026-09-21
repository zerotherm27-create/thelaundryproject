-- Documents the marketing_events table applied directly to the live
-- "laundrobot" Supabase project (this repo has no Supabase CLI wired up,
-- so this file is a readable record, not something auto-applied by a
-- migration runner).
--
-- Purpose: capture on-site UTM/campaign attribution (e.g. Meta ads) and
-- log page_view / booking_click events so The Laundry Project's admin
-- dashboard can report reliable click/campaign metrics without depending
-- on the external Messenger bot or booking app to persist anything.

create table public.marketing_events (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  -- This Supabase project is shared by several tenants' bot backends.
  -- Default + RLS check both pin every row to The Laundry Project's tenant.
  tenant_id    uuid not null default '8d545ba2-8262-4bf3-aba1-109528789213'
               references public.tenants(id),
  event_type   text not null check (event_type in ('page_view', 'booking_click')),
  session_id   text not null,
  channel      text check (channel in ('messenger', 'web')), -- null for page_view rows
  path         text,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text
);

-- Dedupe page_view rows fired again on refresh within the same session.
create unique index marketing_events_one_pageview_per_session
  on public.marketing_events (session_id) where event_type = 'page_view';

create index marketing_events_created_at_idx on public.marketing_events (created_at);
create index marketing_events_utm_idx on public.marketing_events (utm_source, utm_medium, utm_campaign, utm_content);
create index marketing_events_session_idx on public.marketing_events (session_id);

alter table public.marketing_events enable row level security;

-- Public (anon) may INSERT only — no SELECT/UPDATE/DELETE. Aggregation
-- reads happen server-side via a service-role key (see
-- src/app/api/admin/analytics/route.ts).
create policy "public insert marketing_events"
  on public.marketing_events for insert
  to anon
  with check (tenant_id = '8d545ba2-8262-4bf3-aba1-109528789213');
