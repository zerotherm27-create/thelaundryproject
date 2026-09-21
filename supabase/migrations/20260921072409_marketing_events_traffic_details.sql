-- Documents a schema change applied directly to the live "laundrobot"
-- Supabase project (this repo has no Supabase CLI wired up, so this file
-- is a readable record, not something auto-applied by a migration runner).
--
-- Purpose: support native site-traffic analytics in the admin "Insights"
-- tab (page views, bounce rate, traffic source, device/OS, location),
-- extending the marketing_events table added in an earlier migration.

-- Previously, marketing_events had a unique index limiting each session to
-- at most one page_view row, since the table only needed to support
-- first-touch UTM attribution. That now actively blocks tracking multiple
-- page views per visit (needed for page-view counts, top pages, and bounce
-- rate), so it's removed.
drop index if exists public.marketing_events_one_pageview_per_session;

-- Device + location, populated only from server-side request headers in
-- src/app/api/track/route.ts (User-Agent, and Vercel's built-in
-- x-vercel-ip-country/-country-region/-city geolocation headers) — never
-- from the client's POST body, and no raw visitor IP address is ever
-- stored or seen by the application.
alter table public.marketing_events
  add column country     text,
  add column region      text,
  add column city        text,
  add column os          text,
  add column browser     text,
  add column device_type text check (device_type in ('mobile', 'tablet', 'desktop'));
