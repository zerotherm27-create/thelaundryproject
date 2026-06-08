import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import { createServerClient } from "@/lib/supabase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laundry & Dry Cleaning Service in Makati | The Laundry Project",
  description:
    "Professional laundry, dry cleaning & pickup/delivery service in Makati & Sampaloc, Manila. Book online in seconds — The Laundry Project.",
  keywords: "laundry service Makati, dry cleaning Manila, laundromat Sampaloc, pickup delivery laundry Philippines",
  openGraph: {
    title: "The Laundry Project | Where Freshness Meets Convenience",
    description: "Professional laundry, dry cleaning & pickup/delivery in Makati & Sampaloc, Manila.",
    url: "https://www.thelaundryproject.ph",
    siteName: "The Laundry Project",
    locale: "en_PH",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch analytics IDs from Supabase (admin-editable, no redeploy needed)
  let analyticsIds = { gaId: "", pixelId: "", hotjarId: "", clarityId: "" };
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("site_content")
      .select("key, value")
      .eq("section", "analytics");
    if (data) {
      const get = (k: string) => data.find((r) => r.key === k)?.value ?? "";
      analyticsIds = {
        gaId:      get("ga_id"),
        pixelId:   get("meta_pixel_id"),
        hotjarId:  get("hotjar_id"),
        clarityId: get("clarity_id"),
      };
    }
  } catch {
    // Non-fatal — falls back to env vars inside Analytics component
  }

  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics {...analyticsIds} />
      </body>
    </html>
  );
}
