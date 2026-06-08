import { createServerClient } from "@/lib/supabase";
import FAQ from "./FAQ";

/**
 * Server component — fetches FAQ items from Supabase with 60s ISR revalidation
 * and passes them as props to the client-side FAQ accordion.
 */
export default async function FAQLoader() {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("faq_items")
    .select("question, answer")
    .eq("is_published", true)
    .order("sort_order");

  const faqs = data?.map((f) => ({ q: f.question, a: f.answer }));

  return <FAQ initialFaqs={faqs ?? undefined} />;
}
