import { createServerClient } from "@/lib/supabase";
import PricingTables from "./PricingTables";

/**
 * Server component — fetches pricing data from Supabase with 60s ISR revalidation
 * and passes it as props to the client-side PricingTables component.
 */
export default async function PricingTablesLoader() {
  const supabase = createServerClient();

  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase.from("pricing_categories").select("*").order("sort_order"),
    supabase.from("pricing_items").select("*").order("sort_order"),
  ]);

  return (
    <PricingTables
      dbCategories={categories ?? undefined}
      dbItems={items ?? undefined}
    />
  );
}
