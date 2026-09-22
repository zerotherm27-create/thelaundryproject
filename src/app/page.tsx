import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock, CreditCard, Leaf, WashingMachine, SportShoe, Timer,
  Zap, Star, ChevronRight, Phone, MessageCircle,
  MapPin, Banknote, Smartphone, Truck, Building2, Package,
} from "lucide-react";
import AnimateOnScroll, { StaggerContainer, StaggerItem, CountUp } from "@/components/AnimateOnScroll";
import BookingModal from "@/components/BookingModal";
import ContactForm from "@/components/ContactForm";
import MessengerMockup from "@/components/MessengerMockup";
import FAQLoader from "@/components/FAQLoader";
import PricingTablesLoader from "@/components/PricingTablesLoader";
import { createServerClient } from "@/lib/supabase";
import type { OperatingHour } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "The Laundry Project — Professional Laundry & Dry Cleaning in Metro Manila",
  description:
    "Professional laundry, dry cleaning & pickup/delivery across Metro Manila. Book in seconds via Facebook Messenger. GCash, Maya & cash accepted.",
  openGraph: {
    title: "The Laundry Project — Fresh Clothes, Zero Hassle.",
    description:
      "Professional laundry, dry cleaning & pickup/delivery across Metro Manila. Book in seconds via Facebook Messenger. GCash, Maya & cash accepted.",
    url: "https://www.thelaundryproject.ph",
    siteName: "The Laundry Project",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://www.thelaundryproject.ph/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Laundry Project — Professional Laundry & Dry Cleaning in Metro Manila",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Laundry Project — Fresh Clothes, Zero Hassle.",
    description:
      "Professional laundry, dry cleaning & pickup/delivery across Metro Manila. Book in seconds via Facebook Messenger.",
    images: ["https://www.thelaundryproject.ph/opengraph-image"],
  },
};

/* ── Custom service icons ───────────────────────────────────── */
type SvgIconProps = { className?: string; style?: React.CSSProperties };

function IconHandWash({ className, style }: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      {/* Three fingers dipping into water */}
      <line x1="9"  y1="11" x2="9"  y2="7"/>
      <line x1="12" y1="11" x2="12" y2="5"/>
      <line x1="15" y1="11" x2="15" y2="7"/>
      {/* Water surface / basin rim */}
      <line x1="4" y1="11" x2="20" y2="11"/>
      {/* Basin body */}
      <path d="M5 11l1.5 8h11L19 11"/>
    </svg>
  );
}

function IconDryCleaning({ className, style }: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      {/* Hook ring */}
      <circle cx="12" cy="4" r="2"/>
      {/* Stem */}
      <line x1="12" y1="6" x2="12" y2="9"/>
      {/* Shoulders + crossbar */}
      <path d="M3 19 L12 9 L21 19 H3"/>
    </svg>
  );
}

function IconIroning({ className, style }: SvgIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      {/* Iron body: sole → pointed tip → top surface → handle arch → back face */}
      <path d="M3 17H20L22 14L7 12Q5 9 3 12Z"/>
      {/* Steam rising from iron top */}
      <path d="M10 12c0-1 1-1 1-2s-1-1-1-2"/>
      <path d="M14 12c0-1 1-1 1-2s-1-1-1-2"/>
    </svg>
  );
}

/* ── DATA ──────────────────────────────────────────────────── */

const services = [
  { icon: WashingMachine,  name: "Machine Wash",    desc: "Freshen up everyday clothes, bed linens, comforters and casual wear. Washed, dried and folded with care." },
  { icon: IconHandWash,    name: "Hand Wash",       desc: "Gentle treatment for delicate fabrics including lace, silk and wool. Each piece handled individually." },
  { icon: IconDryCleaning, name: "Dry Cleaning",    desc: "Professional cleaning for suits, barongs, blazers, gowns and formal wear that needs careful, expert handling." },
  { icon: IconIroning,     name: "Press & Ironing", desc: "Crisp, wrinkle-free results for shirts, pants, uniforms and formal pieces. Ready to wear." },
  { icon: Timer,           name: "Express Service", desc: "Need it back fast? Drop off before noon and get your laundry returned the same day." },
  { icon: SportShoe,       name: "Shoe Cleaning",   desc: "Deep cleaning for sneakers, rubber shoes and slippers. Removes tough stains and restores the original look." },
];

const testimonials = [
  { name: "Zen Katsu",    location: "Sampaloc, Manila", rating: 5, text: "Never pa ako nawalan ng clothes, been months na using their delivery service. Thank you!" },
  { name: "Neil Allen",   location: "Makati",           rating: 5, text: "Excellent service, above and beyond my expectations. Thanks again po." },
  { name: "Simon Singh",  location: "Malaysia",         rating: 5, text: "I always use their service every time I go to Makati for my business trip. Happy with the quality — traditional laundry but they offer express service too." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Laundry Project",
  description: "Professional laundry, dry cleaning & pickup/delivery across Metro Manila.",
  url: "https://www.thelaundryproject.ph",
  telephone: "+639178381596",
  email: "washup@thelaundryproject.ph",
  address: { "@type": "PostalAddress", streetAddress: "7533 Santillan St.", addressLocality: "Makati City", addressRegion: "Metro Manila", addressCountry: "PH" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "18:00" }],
  sameAs: ["https://www.facebook.com/thelaundryprojectph","https://www.instagram.com/thelaundryprojectph"],
};

/* ── HOURS HELPERS ─────────────────────────────────────────── */

const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LONG_DAYS  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fmtTime(t: string | null): string {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}:00 ${ampm}` : `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatHoursSummary(hours: OperatingHour[]): {
  short: string;
  long: string;
  timeRange: string;
  closedNote: string;
} {
  const sorted = [...hours].sort((a, b) => a.day_of_week - b.day_of_week);
  const openDays = sorted.filter((h) => !h.is_closed && h.open_time && h.close_time);
  const closedDays = sorted.filter((h) => h.is_closed);

  if (!openDays.length) {
    return { short: "Closed", long: "Closed", timeRange: "", closedNote: "All days" };
  }

  // Use hours from the first open day as the primary display range
  const firstOpen = openDays[0];
  const timeRange = `${fmtTime(firstOpen.open_time)} – ${fmtTime(firstOpen.close_time)}`;

  // Group consecutive open days
  const groups: number[][] = [];
  let current = [openDays[0].day_of_week];
  for (let i = 1; i < openDays.length; i++) {
    if (openDays[i].day_of_week === current[current.length - 1] + 1) {
      current.push(openDays[i].day_of_week);
    } else {
      groups.push(current);
      current = [openDays[i].day_of_week];
    }
  }
  groups.push(current);

  const toLabel = (days: number[], map: string[]) =>
    days.length === 1
      ? map[days[0]]
      : `${map[days[0]]} – ${map[days[days.length - 1]]}`;

  const short = groups.map((g) => toLabel(g, SHORT_DAYS)).join(", ");
  const long  = groups.map((g) => toLabel(g, LONG_DAYS)).join(", ");

  const closedNote = closedDays.length
    ? `Closed on ${closedDays.map((h) => LONG_DAYS[h.day_of_week]).join(", ")} & public holidays`
    : "Closed on public holidays";

  return { short, long, timeRange, closedNote };
}

/* ── SHARED COMPONENTS ─────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#38a9c2" }}>
      {children}
    </span>
  );
}

/* ── Payment brand SVG icons ─────────────────────────────── */

function GCashSVG() {
  /* Real GCash wordmark — Wikimedia Commons (public domain) */
  return (
    <svg viewBox="0 0 64 40" aria-hidden="true" className="w-full h-full">
      <rect width="64" height="40" rx="6" fill="white"/>
      <svg width="64" height="40" viewBox="0 0 1792 422" preserveAspectRatio="xMidYMid meet">
        <path fill="#007cff" d="M 148.8 12.6 C 173.9 4.4 200.6 1.0 227.0 2.7 C 265.7 4.8 303.5 18.5 335.0 41.0 C 338.4 43.5 342.1 45.8 345.0 49.0 C 350.0 54.7 352.0 62.8 350.2 70.2 C 348.4 78.2 342.1 85.0 334.3 87.4 C 326.7 89.8 318.0 88.2 311.9 83.1 C 288.4 65.0 259.8 53.6 230.3 50.8 C 219.5 49.6 208.5 49.6 197.7 50.8 C 166.6 53.9 136.5 66.4 112.3 86.3 C 85.0 108.6 65.1 140.0 57.3 174.4 C 50.1 205.6 52.3 239.0 63.9 268.9 C 76.1 300.7 98.8 328.2 127.4 346.6 C 148.8 360.3 173.5 368.8 198.7 371.2 C 208.5 372.4 218.5 372.4 228.2 371.3 C 258.7 368.7 288.2 357.0 312.4 338.3 C 318.5 333.5 327.2 332.1 334.6 334.6 C 344.8 338.1 352.1 349.0 350.8 359.8 C 350.2 366.1 346.9 372.1 341.9 375.9 C 322.7 390.9 300.9 402.4 277.7 409.8 C 247.8 419.4 215.6 421.9 184.5 417.6 C 150.0 412.8 116.8 399.0 89.0 378.0 C 62.0 357.8 40.0 330.9 25.5 300.4 C 11.3 270.5 4.4 237.1 5.6 204.0 C 6.7 163.3 20.2 123.1 44.0 90.0 C 69.6 54.0 106.7 26.3 148.8 12.6 Z"/>
        <path fill="#6fbaf7" d="M 441.4 69.4 C 451.8 66.3 464.0 71.2 469.0 81.0 C 493.0 127.9 503.5 181.5 499.2 234.0 C 496.2 271.4 485.9 308.3 468.6 341.6 C 462.3 353.5 445.4 357.3 434.5 349.5 C 424.4 343.0 421.1 328.5 427.1 318.0 C 460.5 252.4 460.8 171.1 427.8 105.3 C 424.8 99.9 423.2 93.5 424.7 87.4 C 426.4 78.9 433.1 71.7 441.4 69.4 Z"/>
        <path fill="#6fbaf7" d="M 376.4 110.6 C 386.7 107.9 398.4 113.2 403.2 122.7 C 429.2 177.7 429.2 244.3 403.2 299.3 C 399.9 305.8 393.3 310.6 386.0 311.8 C 377.5 313.3 368.4 309.7 363.1 302.9 C 357.6 295.8 356.6 285.6 360.6 277.6 C 380.0 235.5 379.7 185.0 360.1 143.0 C 354.2 130.1 362.6 113.6 376.4 110.6 Z"/>
        <path fill="#002cb8" d="M 145.6 97.5 C 188.0 71.9 245.3 72.6 286.5 100.5 C 296.7 108.0 298.8 124.0 290.9 133.9 C 283.8 143.6 269.1 146.5 259.0 140.0 C 243.0 129.8 223.6 125.4 204.8 127.6 C 186.0 129.6 168.0 138.3 154.8 151.8 C 141.6 164.9 133.0 182.5 130.9 201.0 C 129.0 216.0 131.5 231.5 137.7 245.3 C 145.9 263.5 160.8 278.6 179.0 287.0 C 197.6 295.8 219.4 297.2 239.0 291.1 C 265.2 283.1 286.9 261.4 294.4 235.1 C 275.6 235.2 256.8 235.1 238.0 235.1 C 229.0 235.1 220.3 229.5 216.6 221.4 C 212.0 212.1 214.4 200.0 222.2 193.2 C 226.2 189.6 231.5 187.2 236.9 187.0 C 265.3 186.8 293.6 186.9 322.0 186.9 C 331.3 186.6 340.3 192.4 344.0 200.9 C 347.2 207.5 346.2 215.0 345.8 222.1 C 343.3 252.9 329.4 282.6 307.4 304.4 C 286.3 325.6 257.8 339.3 228.0 342.3 C 198.7 345.5 168.4 338.4 143.5 322.5 C 118.4 306.6 98.8 281.9 89.2 253.7 C 79.4 225.2 79.9 193.3 90.1 165.0 C 100.1 137.0 120.1 112.8 145.6 97.5 Z"/>
        <path fill="#002cb8" d="M 722.8 80.5 C 743.4 78.2 764.6 79.9 784.2 86.7 C 807.6 94.8 828.8 109.5 843.6 129.4 C 846.8 133.1 848.3 138.6 846.1 143.2 C 843.5 149.2 836.6 151.1 831.5 154.5 C 825.7 157.4 820.1 163.0 813.0 161.3 C 807.5 160.6 804.8 155.3 801.4 151.5 C 788.3 137.0 769.5 128.2 750.1 126.2 C 734.7 124.7 718.8 126.4 704.4 132.4 C 687.5 139.5 673.4 152.6 664.6 168.6 C 655.9 184.5 653.1 203.1 654.8 221.0 C 656.0 235.2 660.8 249.2 669.1 260.9 C 680.5 277.0 697.5 289.1 716.7 294.2 C 730.3 297.6 744.8 298.8 758.6 295.3 C 776.1 291.1 792.8 282.4 805.2 269.1 C 814.0 259.7 820.0 247.7 822.5 235.1 C 798.5 233.1 774.1 233.0 749.8 233.1 C 744.5 232.1 739.9 227.5 739.6 222.0 C 739.3 217.0 739.6 212.0 739.5 207.0 C 739.5 203.4 739.1 199.4 741.2 196.2 C 743.6 192.1 748.3 189.9 752.9 190.2 C 786.3 190.2 819.7 190.2 853.1 190.2 C 862.0 189.9 869.9 198.1 869.2 207.0 C 868.8 219.6 869.1 232.5 866.0 244.8 C 862.3 260.5 856.0 275.6 847.0 289.0 C 839.5 300.3 829.4 309.6 818.3 317.3 C 803.8 327.2 787.6 334.5 770.6 338.7 C 747.8 344.5 723.6 343.1 701.0 337.0 C 669.9 328.5 642.8 307.4 625.9 280.1 C 607.7 250.9 603.2 214.5 610.2 181.2 C 617.0 148.4 638.1 119.4 665.8 100.8 C 682.7 89.5 702.5 82.7 722.8 80.5 Z"/>
        <path fill="#002cb8" d="M 1014.3 80.2 C 1032.5 78.5 1051.2 79.8 1068.7 85.3 C 1095.3 93.5 1119.6 110.6 1135.0 134.0 C 1138.0 138.4 1136.6 145.2 1131.9 147.9 C 1125.3 151.9 1118.4 155.7 1111.7 159.7 C 1108.7 161.4 1105.6 163.6 1102.0 163.1 C 1098.6 163.0 1095.9 160.6 1094.1 157.9 C 1083.5 142.1 1066.2 131.4 1047.8 127.5 C 1032.8 124.5 1017.0 125.2 1002.3 129.3 C 986.0 133.9 971.5 144.0 961.4 157.4 C 951.7 169.9 946.2 185.3 944.9 201.0 C 943.2 218.9 945.8 237.6 954.4 253.6 C 962.7 269.1 976.0 281.9 992.1 288.9 C 1007.1 295.5 1023.9 297.2 1040.0 295.6 C 1059.5 293.5 1078.4 284.1 1090.8 268.8 C 1093.2 265.9 1094.8 262.2 1098.0 260.1 C 1101.2 258.1 1105.5 258.4 1108.7 260.4 C 1116.3 264.8 1124.0 269.1 1131.6 273.5 C 1135.5 275.6 1137.5 280.6 1136.3 284.9 C 1135.1 288.2 1132.7 290.9 1130.7 293.7 C 1107.4 324.7 1068.6 342.8 1030.0 342.3 C 999.9 342.8 969.2 333.5 945.7 314.3 C 932.0 303.2 920.4 289.5 912.1 273.9 C 903.4 257.6 898.7 239.4 897.6 220.9 C 896.3 201.0 898.7 180.6 905.8 161.8 C 916.2 134.6 936.5 111.3 961.7 96.7 C 977.7 87.4 995.9 82.0 1014.3 80.2 Z"/>
        <path fill="#002cb8" d="M 1235.6 134.8 C 1254.5 131.0 1274.9 132.1 1292.3 140.8 C 1305.3 147.2 1316.3 158.3 1321.0 172.2 C 1321.6 163.2 1320.9 154.1 1321.3 145.0 C 1321.4 140.1 1326.1 136.0 1331.0 136.0 C 1340.4 135.9 1349.7 135.9 1359.1 136.0 C 1364.4 135.9 1369.1 140.6 1368.9 146.0 C 1368.9 205.3 1368.9 264.6 1368.9 324.0 C 1368.9 326.6 1369.0 329.3 1368.7 332.0 C 1368.0 336.6 1363.6 340.0 1359.0 340.0 C 1351.3 340.1 1343.7 339.9 1336.0 340.0 C 1333.4 340.0 1330.8 340.2 1328.4 339.6 C 1324.5 338.5 1321.5 335.0 1321.3 331.0 C 1321.0 324.9 1321.4 318.8 1321.1 312.8 C 1315.9 317.4 1311.1 322.4 1305.4 326.4 C 1291.2 337.0 1273.7 343.2 1256.0 343.2 C 1236.5 343.4 1217.0 337.3 1201.3 325.7 C 1186.0 314.6 1174.5 298.7 1167.7 281.2 C 1159.5 260.3 1157.8 237.2 1161.5 215.2 C 1165.0 194.7 1174.3 174.9 1189.0 160.0 C 1201.6 147.2 1218.1 138.4 1235.6 134.8 M 1255.4 175.5 C 1241.1 177.6 1228.0 185.9 1219.9 197.9 C 1205.1 219.4 1204.5 249.3 1217.0 272.0 C 1223.8 284.8 1235.6 295.3 1249.8 299.1 C 1267.9 304.3 1288.6 299.3 1302.2 286.2 C 1314.1 275.2 1320.2 259.0 1321.0 243.0 C 1322.2 224.5 1317.2 204.6 1303.8 191.2 C 1291.5 178.4 1272.8 172.7 1255.4 175.5 Z"/>
        <path fill="#002cb8" d="M 1472.3 133.3 C 1493.3 131.4 1515.5 134.1 1533.6 145.5 C 1549.8 155.5 1560.5 173.2 1562.8 192.0 C 1563.4 197.5 1558.6 202.9 1553.1 202.7 C 1544.4 202.8 1535.6 202.7 1527.0 202.8 C 1524.0 202.9 1520.8 202.5 1518.6 200.4 C 1515.5 197.9 1515.3 193.7 1513.7 190.3 C 1510.7 183.3 1504.3 178.2 1497.1 175.9 C 1489.5 173.5 1481.4 173.4 1473.6 174.4 C 1467.2 175.3 1460.6 177.3 1456.2 182.3 C 1451.4 187.6 1451.2 196.6 1455.9 202.0 C 1460.8 207.7 1468.1 210.5 1475.0 213.0 C 1494.7 219.6 1515.5 223.1 1534.1 232.8 C 1544.9 238.4 1554.9 246.6 1560.4 257.6 C 1569.1 274.9 1567.6 296.7 1556.6 312.6 C 1547.3 326.4 1532.2 335.1 1516.4 339.4 C 1497.1 344.6 1476.3 344.5 1457.1 339.1 C 1442.4 334.9 1428.5 327.1 1418.2 315.8 C 1410.1 307.0 1404.3 295.9 1402.4 284.0 C 1401.4 278.4 1406.3 272.8 1412.0 272.8 C 1421.7 272.7 1431.4 272.8 1441.0 272.8 C 1445.6 272.6 1449.9 275.7 1451.1 280.1 C 1452.6 285.2 1455.6 289.9 1459.7 293.3 C 1468.0 300.3 1479.3 302.8 1490.0 302.1 C 1498.3 301.7 1507.0 300.0 1513.5 294.5 C 1519.1 289.8 1521.2 281.0 1517.2 274.7 C 1513.7 269.4 1507.5 266.6 1501.7 264.2 C 1484.9 257.9 1467.1 255.0 1450.3 248.7 C 1438.0 244.2 1425.8 238.0 1417.0 228.0 C 1404.2 213.6 1401.5 191.9 1408.2 174.2 C 1413.8 159.6 1426.1 148.5 1440.0 142.0 C 1450.1 137.1 1461.2 134.4 1472.3 133.3 Z"/>
        <path fill="#002cb8" d="M 1601.8 75.8 C 1602.9 71.4 1607.3 68.1 1612.0 68.3 C 1621.0 68.3 1630.0 68.2 1639.0 68.3 C 1644.2 68.1 1649.0 72.7 1649.0 77.9 C 1649.2 104.3 1648.9 130.7 1649.1 157.0 C 1662.2 145.2 1679.2 138.4 1696.6 136.7 C 1716.3 134.7 1737.1 138.1 1753.8 149.2 C 1774.7 162.8 1786.2 187.5 1788.1 211.8 C 1788.7 235.2 1788.3 258.6 1788.4 282.0 C 1788.3 299.0 1788.6 316.1 1788.2 333.1 C 1786.9 337.4 1782.5 340.2 1778.1 340.0 C 1769.4 340.0 1760.6 340.1 1751.9 340.0 C 1747.2 340.2 1742.8 336.7 1741.8 332.2 C 1741.9 301.8 1741.8 271.4 1741.8 241.0 C 1741.8 234.9 1742.0 228.8 1741.4 222.7 C 1740.2 207.8 1734.6 192.0 1722.0 182.9 C 1711.8 175.3 1698.2 173.6 1685.9 175.7 C 1676.3 177.4 1667.3 182.5 1661.1 190.1 C 1652.5 200.7 1649.2 214.6 1649.1 228.0 C 1649.0 262.0 1649.1 296.1 1649.0 330.1 C 1649.1 335.1 1644.9 339.6 1639.9 339.9 C 1632.9 340.2 1626.0 339.9 1619.0 340.0 C 1615.7 340.0 1612.5 340.2 1609.3 339.7 C 1605.6 338.9 1602.6 335.8 1601.8 332.2 C 1601.8 246.7 1601.8 161.3 1601.8 75.8 Z"/>
      </svg>
    </svg>
  );
}

function MayaSVG() {
  /* Real Maya wordmark — Wikimedia Commons (CC BY 4.0, Maya Philippines Inc.) */
  return (
    <svg viewBox="0 0 64 40" aria-hidden="true" className="w-full h-full">
      <rect width="64" height="40" rx="6" fill="white"/>
      <svg width="64" height="40" viewBox="0 0 148 43" preserveAspectRatio="xMidYMid meet">
        <path fill="#75EEA5" d="M33.225.246C29.843.245 26.595 1.568 24.175 3.932l1.312 2.491-.538.433C23.813 4.887 22.184 3.248 20.223 2.098 18.261.948 16.035.328 13.762.299 6.627.299.856 6.541.856 13.86v15.738a.76.76 0 00.767.77h5.167a.76.76 0 00.768-.77V13.69c0-3.633 2.203-6.558 5.954-6.558 3.502 0 6.007 2.623 6.007 6.492v13.115a.74.74 0 00.743.763h4.892a.74.74 0 00.743-.763V13.624a7.62 7.62 0 012.708-5.594 7.57 7.57 0 012.44-.932c3.738 0 5.823 2.977 5.823 6.558v15.955a.743.743 0 00.743.745h5.115a.746.746 0 00.768-.745V13.834C45.829 6.489 40.307.246 33.225.246z"/>
        <path fill="#75EEA5" d="M79.561.836h-4.696a.761.761 0 00-.762.957v.643l1.666 2.623-.459.446C73.687 3.884 71.981 2.577 70.057 1.672 68.134.767 66.04.285 63.914.259c-3.962.188-7.7 1.891-10.441 4.757-2.742 2.866-4.277 6.676-4.289 10.642-.012 3.966 1.501 7.785 4.225 10.668 2.725 2.882 6.453 4.607 10.413 4.819a16.15 16.15 0 009.122-3.262l.393.315-1.665 2.728v.604a.761.761 0 00.762.763h4.787a.761.761 0 00.762-.763V1.793A.762.762 0 0079.561.836zm-15.74 23.673a9.302 9.302 0 01-6.226-2.576 9.316 9.316 0 01-2.723-6.224 9.316 9.316 0 012.723-6.224 9.302 9.302 0 016.226-2.576 9.302 9.302 0 016.226 2.576 9.316 9.316 0 012.723 6.224 9.316 9.316 0 01-2.723 6.224 9.302 9.302 0 01-6.226 2.576z"/>
        <path fill="#75EEA5" d="M146.66.836h-4.695a.761.761 0 00-.762.957v.643l1.666 2.623-.459.446c-1.375-1.621-3.082-2.928-5.005-3.833a15.896 15.896 0 00-6.401-1.414c-4.101 0-8.034 1.629-10.934 4.529-2.9 2.9-4.529 6.833-4.529 10.934 0 4.101 1.629 8.034 4.529 10.934 2.9 2.9 6.833 4.529 10.934 4.529a16.162 16.162 0 009.176-2.97l.393.315-1.666 2.728v.603a.761.761 0 00.762.763h4.696a.761.761 0 00.762-.763V1.793a.762.762 0 00-.762-.957zm-15.646 23.673a9.302 9.302 0 01-6.226-2.576 9.316 9.316 0 01-2.723-6.224 9.316 9.316 0 012.723-6.224 9.302 9.302 0 016.226-2.576 9.302 9.302 0 016.226 2.576 9.316 9.316 0 012.723 6.224 9.316 9.316 0 01-2.723 6.224 9.302 9.302 0 01-6.226 2.576z"/>
        <path fill="#75EEA5" d="M111.692.837h-4.813a.856.856 0 00-.855.826v14.519a6.986 6.986 0 01-2.04 4.932 6.976 6.976 0 01-4.953 2.04c-4.223 0-6.951-3.148-6.951-7.673V1.663a.856.856 0 00-.856-.826h-5.246a.856.856 0 00-.856.826v14.427c-.042 3.771 1.41 7.406 4.04 10.109 2.63 2.703 6.222 4.256 9.993 4.318 3.603.003 7.083-1.312 9.784-3.699l.275.25-2.138 2.911v1.167c0 2.977-4.472 4.643-7.082 4.643h-1.666a.856.856 0 00-.856.856v4.748a.856.856 0 00.856.856h1.666c7.974 0 13.797-4.643 13.797-13.391V1.663a.856.856 0 00-.898-.826z"/>
      </svg>
    </svg>
  );
}

function VisaSVG() {
  /* Real Visa wordmark path — Simple Icons (CC0) */
  return (
    <svg viewBox="0 0 64 40" aria-hidden="true" className="w-full h-full">
      <rect width="64" height="40" rx="6" fill="#1A1F71"/>
      {/* Crop viewBox to the glyph band (y 7–17 in the original 24×24 icon) */}
      <svg x="4" y="10" width="56" height="20" viewBox="0 7 24 10" preserveAspectRatio="xMidYMid meet">
        <path fill="white" d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564zm5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/>
      </svg>
    </svg>
  );
}

function MastercardSVG() {
  /* Mastercard two-circle mark — corrected lens intersection geometry
     Circles: cx=26 r=10 & cx=38 r=10 → intersect at x=32, y=12 & y=28 */
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" className="w-full h-full">
      <rect width="64" height="40" rx="6" fill="#252525"/>
      <circle cx="26" cy="20" r="10" fill="#EB001B"/>
      <circle cx="38" cy="20" r="10" fill="#F79E1B"/>
      {/* Right arc of left circle (sweep=1) + left arc of right circle (sweep=0) */}
      <path d="M32 12 A10 10 0 0 1 32 28 A10 10 0 0 0 32 12Z" fill="#FF5F00"/>
    </svg>
  );
}

function CashSVG() {
  /* Banknote design: bill outline + oval seals + ₱ centre */
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden="true" className="w-full h-full">
      <rect width="64" height="40" rx="6" fill="#16A34A"/>
      {/* Bill body */}
      <rect x="7" y="9" width="50" height="22" rx="2.5" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5"/>
      {/* Inner decorative border */}
      <rect x="10.5" y="12" width="43" height="16" rx="1.5" stroke="white" strokeWidth="0.75" strokeOpacity="0.55"/>
      {/* Oval seal — left */}
      <ellipse cx="17.5" cy="20" rx="3.5" ry="5.5" stroke="white" strokeWidth="0.75" strokeOpacity="0.65"/>
      {/* Oval seal — right */}
      <ellipse cx="46.5" cy="20" rx="3.5" ry="5.5" stroke="white" strokeWidth="0.75" strokeOpacity="0.65"/>
      {/* ₱ vertical stroke */}
      <line x1="32" y1="14" x2="32" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {/* P belly: right to (35.5,14) → semicircle to (35.5,21) → back to (32,21) */}
      <path d="M32 14 H35.5 A3.5 3.5 0 0 1 35.5 21 H32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Two crossbars */}
      <line x1="28" y1="17" x2="40" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="20.5" x2="40" y2="20.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

/* ── PAGE ──────────────────────────────────────────────────── */

export default async function HomePage() {
  // Fetch operating hours + booking URLs in parallel
  let hoursData: OperatingHour[] = [];
  let messengerUrl = "";
  let webUrl       = "";
  try {
    const supabase = createServerClient();
    const [{ data: hrs }, { data: content }] = await Promise.all([
      supabase.from("operating_hours").select("*").order("day_of_week"),
      supabase.from("site_content").select("key, value").eq("section", "booking"),
    ]);
    hoursData    = hrs ?? [];
    messengerUrl = content?.find(r => r.key === "booking_messenger_url")?.value ?? "";
    webUrl       = content?.find(r => r.key === "booking_web_url")?.value       ?? "";
  } catch {
    // Fall back to static strings / default URLs below
  }

  const hrs = hoursData.length ? formatHoursSummary(hoursData) : null;
  const shortDays  = hrs?.short     ?? "Mon – Sun";
  const longDays   = hrs?.long      ?? "Monday – Sunday";
  const timeRange  = hrs?.timeRange ?? "9:00 AM – 6:00 PM";
  const closedNote = hrs?.closedNote ?? "Closed on public holidays";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ════════════════════════════════════════════════════════
          HERO — depth impression technique
          Three animation effects:
          1. Steam wisps  (.animate-steam)
          2. Drum depth pulse (.animate-drum-depth)
          3. Wave breathing (.animate-wave-breathe)
      ════════════════════════════════════════════════════════ */}
      <section id="home" className="relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Full-bleed staff photo. object-position keeps the staff member in frame on narrow/tall
            viewports, where object-cover would otherwise crop to the image's horizontal center
            (the hallway/fans behind her) and cut her out of the shot entirely. */}
        <div className="absolute inset-0 z-0 bg-[#0d3d4f]">
          <Image
            src="/images/hero-full-bleed.jpg"
            alt="The Laundry Project staff member loading a washing machine in the Makati shop"
            fill
            sizes="100vw"
            className="object-cover object-[72%_center] lg:object-center"
            preload
          />
        </div>

        {/* Legibility scrim — darkest where the text sits (left), fading toward the photo */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(115deg, rgba(13,61,79,0.88) 0%, rgba(13,61,79,0.55) 42%, rgba(13,61,79,0.15) 70%, rgba(13,61,79,0.35) 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(13,61,79,0.55) 0%, transparent 35%)" }}
          aria-hidden="true"
        />

        {/* ── Far depth layer: dot grid ── */}
        <div className="hero-grid-far absolute inset-0 z-[3]" aria-hidden="true" />

        {/* Floating bubbles */}
        {([
          { size: 16, top: "10%", left: "4%",  delay: "0s",   dur: "3.5s" },
          { size: 10, top: "6%",  left: "84%", delay: "0.9s", dur: "4.2s" },
          { size: 20, top: "28%", left: "92%", delay: "1.5s", dur: "3.8s" },
        ] as { size: number; top: string; left: string; delay: string; dur: string }[]).map((b, i) => (
          <div
            key={i}
            className="bubble absolute pointer-events-none z-[4]"
            style={{
              width: b.size, height: b.size,
              top: b.top, left: b.left,
              animationDelay: b.delay, animationDuration: b.dur,
              background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(56,169,194,0.4))",
              border: "1px solid rgba(255,255,255,0.4)",
            }}
            aria-hidden="true"
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
            <AnimateOnScroll variant="fade-up" className="max-w-xl">
              {/* Location pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <MapPin className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                <span className="text-xs font-semibold text-white">Serving Metro Manila</span>
              </div>

              {/* Headline */}
              <h1
                id="hero-heading"
                className="text-5xl sm:text-6xl lg:text-[5.25rem] font-bold leading-[1.05] mb-6 text-white"
              >
                Fresh Clothes,<br />
                <span style={{ color: "#fdca00" }}>Zero Hassle.</span>
              </h1>

              {/* Sub */}
              <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: "rgba(255,255,255,0.82)" }}>
                Professional laundry, dry cleaning and shoe cleaning across Metro Manila.
                Book on Messenger and get confirmed in seconds, any time of day.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <BookingModal variant="primary" label="Book a Pickup Now" messengerUrl={messengerUrl} webUrl={webUrl} />
                <a
                  href="#pricing"
                  className="btn-ghost-white inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 active:scale-95 text-white"
                  style={{ borderColor: "rgba(255,255,255,0.4)" }}
                >
                  View Prices <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-7">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: "#fdca00" }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>Same-day express</span>
                </div>
                <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 shrink-0" style={{ color: "#fdca00" }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>GCash, Maya & cash</span>
                </div>
                <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true">·</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: "#fdca00" }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>9 years in Metro Manila</span>
                </div>
              </div>
            </AnimateOnScroll>

            {/* 9+ years badge — desktop only; on mobile the same info is in the trust-badges row above, and the text column has no headroom for an absolutely-positioned badge without overlap */}
            <div
              className="hidden lg:block absolute bottom-8 right-6 lg:right-12 z-10 rounded-2xl shadow-xl px-4 py-3 text-center text-white"
              style={{ background: "linear-gradient(135deg, #0d3d4f, #38a9c2)", border: "2px solid rgba(255,255,255,0.18)" }}
            >
              <p className="text-3xl font-bold leading-none">9+</p>
              <p className="text-[10px] font-semibold tracking-wide mt-0.5 opacity-90">YEARS IN</p>
              <p className="text-[10px] opacity-70">MAKATI</p>
            </div>
          </div>

        {/* Wave → benefits */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none" style={{ height: 80 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,55 Q720,0 1440,55 L1440,80 L0,80 Z" fill="#dff0f7"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BENEFITS
      ════════════════════════════════════════════════════════ */}
      <section aria-label="Key benefits" className="py-12 pb-24 relative overflow-hidden" style={{ background: "#dff0f7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Clock,       title: "Save Time",          desc: "Pickup and delivery included. No more trips to the laundromat."       },
              { icon: CreditCard,  title: "All Payments",       desc: "GCash, Maya, Visa, Mastercard and cash all accepted."                  },
              { icon: Leaf,        title: "Eco-Friendly",       desc: "Auto-dosing machines dispense the right amount of detergent every wash."},
              { icon: Zap,         title: "24/7 Booking",       desc: "Message us on Messenger anytime. Your pickup is confirmed right away."  },
            ].map((b) => (
              <StaggerItem key={b.title}>
                <div
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl h-full"
                  style={{ border: "1px solid #b3dde8" }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#c5e8f0" }}>
                    <b.icon className="w-5 h-5" style={{ color: "#38a9c2" }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "#0F172A" }}>{b.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{b.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Wave → how it works */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 80 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,80 720,0 1080,60 C1280,85 1380,35 1440,55 L1440,80 L0,80 Z" fill="#f8fffe"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: "#f8fffe" }}
        aria-labelledby="how-heading"
      >
        {/* Suds dots on dark bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(56,169,194,0.08) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #38a9c2, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: "rgba(56,169,194,0.1)", border: "1px solid rgba(56,169,194,0.25)" }}>
                <MessageCircle className="w-3.5 h-3.5" style={{ color: "#38a9c2" }} aria-hidden="true" />
                <span className="text-xs font-semibold" style={{ color: "#38a9c2" }}>Via Facebook Messenger</span>
              </div>
              <h2 id="how-heading" className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
                Book in Seconds, Completely Hassle-Free
              </h2>
              <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: "#64748B" }}>
                No app download, no sign-up required. Just send us a message and we take care of everything, 24 hours a day, 7 days a week.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: MessageCircle, step: "01", title: "Message Us",      desc: "Send us a message on Facebook Messenger. No app download required." },
              { Icon: Zap,           step: "02", title: "We Confirm",     desc: "Your request is confirmed right away. Slot locked in, no waiting."   },
              { Icon: Truck,         step: "03", title: "We Pick Up",     desc: "Our team arrives at your door at your chosen schedule."               },
              { Icon: Package,       step: "04", title: "Fresh Delivery", desc: "Clean, freshly folded laundry delivered back to you on time."         },
            ].map(({ Icon, step, title, desc }, idx) => (
              <StaggerItem key={step}>
                <div
                  className="relative text-center p-6 rounded-2xl group transition-all hover:border-opacity-60"
                  style={{ background: "#ffffff", border: "1px solid #b3dde8" }}
                >
                  {idx < 3 && (
                    <div
                      className="hidden lg:block absolute top-10 left-[calc(100%)] w-5 border-t border-dashed"
                      style={{ borderColor: "rgba(56,169,194,0.25)" }}
                      aria-hidden="true"
                    />
                  )}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform"
                    style={{ background: "#dff0f7" }}
                  >
                    <Icon className="w-6 h-6" style={{ color: "#38a9c2" }} aria-hidden="true" />
                  </div>
                  <p className="text-[10px] font-bold tracking-[0.18em] mb-2" style={{ color: "#fdca00" }}>
                    STEP {step}
                  </p>
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll variant="fade-up" delay={0.4}>
            <div className="text-center mt-10">
              <BookingModal variant="teal" label="Book Now" className="px-7 py-3.5 text-sm" messengerUrl={messengerUrl} webUrl={webUrl} />
            </div>
          </AnimateOnScroll>
        </div>

        {/* Wave → services */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 80 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C400,80 700,10 1000,65 C1200,90 1350,30 1440,55 L1440,80 L0,80 Z" fill="#dff0f7"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════════════════════ */}
      <section id="services" className="py-16 lg:py-20 relative overflow-hidden" style={{ background: "#dff0f7" }} aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="mb-10">
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: "#0F172A" }}>
                Our Services
              </h2>
              <p className="text-sm leading-relaxed max-w-lg" style={{ color: "#64748B" }}>
                From everyday loads to specialty pieces, every garment is treated with care, the right product, and years of experience.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Featured top row: 2 main services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {services.slice(0, 2).map((s) => (
              <AnimateOnScroll key={s.name} variant="fade-up">
                <article
                  className="bg-white rounded-2xl p-7 flex gap-5 items-start group transition-shadow hover:shadow-md"
                  style={{ border: "1px solid #b3dde8" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "#dff0f7", border: "1px solid #b3dde8" }}
                  >
                    <s.icon className="w-6 h-6" style={{ color: "#38a9c2" }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1.5" style={{ color: "#0F172A" }}>{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{s.desc}</p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Remaining services — 2 then 2 (not rigid 3-col) */}
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {services.slice(2).map((s) => (
              <StaggerItem key={s.name}>
                <article
                  className="bg-white rounded-2xl p-5 h-full flex flex-col group transition-shadow hover:shadow-sm"
                  style={{ border: "1px solid #b3dde8" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 shrink-0"
                    style={{ background: "#dff0f7" }}
                  >
                    <s.icon className="w-4 h-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-xs mb-1.5 leading-snug" style={{ color: "#0F172A" }}>{s.name}</h3>
                  <p className="text-[11px] leading-relaxed flex-1" style={{ color: "#94A3B8" }}>{s.desc}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll variant="fade-up" delay={0.25}>
            <div className="mt-8 p-5 rounded-2xl bg-white" style={{ border: "1px solid #b3dde8" }}>
              <p className="text-xs font-semibold text-center mb-3" style={{ color: "#0F172A" }}>Also Available</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Beddings & Towels","Comforters","Blankets","Stuffed Toys","Rugs & Carpets","Sofa Covers","Curtains","Backpacks & Bags","Pillows","Helmets & Caps"].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{ background: "#dff0f7", color: "#38a9c2", border: "1px solid #b3dde8" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          BOOK VIA MESSENGER
      ════════════════════════════════════════════════════════ */}
      <section id="book" className="py-20 lg:py-28 bg-white relative overflow-hidden" aria-labelledby="book-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — copy */}
            <AnimateOnScroll variant="fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: "#dff0f7", border: "1px solid #b3dde8" }}>
                <Zap className="w-3.5 h-3.5" style={{ color: "#38a9c2" }} aria-hidden="true" />
                <span className="text-xs font-semibold" style={{ color: "#38a9c2" }}>Responds in seconds, any time of day</span>
              </div>
              <h2 id="book-heading" className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "#0F172A" }}>
                Book Instantly on<br />
                <span style={{ color: "#38a9c2" }}>Facebook Messenger</span>
              </h2>
              <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: "#64748B" }}>
                Our booking assistant on Messenger confirms your slot in seconds, 24 hours a day. Tap the button below and you will be greeted right away, ready to book.
              </p>

              {/* Steps */}
              <div className="space-y-5 mb-10">
                {[
                  { step: "01", title: "Tap to Open the Chat",   desc: "No searching, no typing the page name. The button takes you straight to the conversation."    },
                  { step: "02", title: "Choose Your Service",   desc: "Select your laundry type, address and preferred pickup schedule."                             },
                  { step: "03", title: "Confirmed in Seconds",  desc: "Our system locks in your booking right away, day or night, including weekends."               },
                  { step: "04", title: "We Handle the Rest",    desc: "We pick up or you drop off. Your clean laundry is returned to your door."                    },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{ background: "#dff0f7", color: "#38a9c2", border: "1px solid #b3dde8" }}
                    >
                      {step}
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5" style={{ color: "#0F172A" }}>{title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <BookingModal variant="primary" label="Start Booking Now" className="px-7 py-4 text-sm" messengerUrl={messengerUrl} webUrl={webUrl} />
                <a
                  href="tel:+639178381596"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm border-2 transition-all hover:bg-slate-50 active:scale-95"
                  style={{ color: "#38a9c2", borderColor: "#b3dde8" }}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call Us Instead
                </a>
              </div>
            </AnimateOnScroll>

            {/* Right — iPhone Messenger mockup */}
            <AnimateOnScroll variant="fade-left" delay={0.2}>
              <MessengerMockup />
            </AnimateOnScroll>

          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-16 lg:py-20" style={{ background: "#dff0f7" }} aria-labelledby="pricing-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10">
              <h2 id="pricing-heading" className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: "#0F172A" }}>
                Clear Pricing Before You Drop Off
              </h2>
              <p className="text-sm leading-relaxed max-w-xl mx-auto mb-5" style={{ color: "#64748B" }}>
                All our prices are listed by item or by bag. Pickup and delivery fee applies. All prices are in Philippine Peso.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "₱ Priced by item or bag",
                  "Pickup & delivery fee applies",
                  "All prices in Philippine Peso",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "#ffffff", border: "1px solid #b3dde8", color: "#0d3d4f" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#38a9c2" }} aria-hidden="true" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <PricingTablesLoader />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ABOUT + STATS
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: "#dff0f7" }} aria-labelledby="about-heading">
        {/* Suds dot texture */}
        <div className="suds-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — store photo */}
            <AnimateOnScroll variant="fade-up">
              <div className="relative">
                <Image
                  src="/images/store-interior.png"
                  alt="The Laundry Project store interior in Makati — professional laundry facility"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl w-full object-cover"
                  style={{ border: "2px solid rgba(56,169,194,0.25)" }}
                />
                {/* Since 2016 badge */}
                <div
                  className="absolute -bottom-4 -right-4 rounded-2xl shadow-xl px-4 py-3 text-center text-white"
                  style={{ background: "linear-gradient(135deg, #0d3d4f, #38a9c2)", border: "2px solid rgba(255,255,255,0.18)" }}
                >
                  <p className="text-2xl font-bold leading-none">2016</p>
                  <p className="text-[10px] font-semibold tracking-wide mt-0.5 opacity-90">EST. IN</p>
                  <p className="text-[10px] opacity-75">MAKATI</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right — copy + stats */}
            <AnimateOnScroll variant="fade-left" delay={0.2}>
              <SectionLabel>About Us</SectionLabel>
              <h2 id="about-heading" className="text-3xl lg:text-4xl font-bold mt-2 mb-5" style={{ color: "#0F172A" }}>
                Metro Manila&apos;s Trusted<br />Laundry Partner
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748B" }}>
                We have been serving Metro Manila for over 9 years, handling everything from everyday machine wash to premium dry cleaning, shoe restoration and specialty items. Every garment gets the right treatment, every single time.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#64748B" }}>
                Walk in or let us come to you. Pay with GCash, Maya, card or cash. Our booking assistant is available 24 hours a day if you have a question.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { end: 500,  suffix: "+",  label: "Happy Customers"  },
                  { end: 9,    suffix: "+",  label: "Years in Service" },
                  { end: 10,   suffix: "K+", label: "Orders Completed" },
                  { end: 100,  suffix: "%",  label: "Quality Assured"  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl p-5 flex flex-col items-center justify-center text-center bg-white"
                    style={{ border: "1px solid #b3dde8" }}
                  >
                    <p className="text-3xl font-bold leading-none" style={{ color: "#38a9c2" }}>
                      <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
                    </p>
                    <p className="text-xs mt-2" style={{ color: "#64748B" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PAYMENT METHODS
      ════════════════════════════════════════════════════════ */}
      <section className="py-14 relative overflow-hidden" style={{ background: "#dff0f7" }} aria-labelledby="payment-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10">
              <h2 id="payment-heading" className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>
                We Accept Almost Every Payment
              </h2>
              <p className="text-sm" style={{ color: "#64748B" }}>Pay how you want — digital, card, or cash.</p>
            </div>
          </AnimateOnScroll>
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {([
              { logo: <GCashSVG />,  name: "GCash", sub: "Scan QR or send link"   },
              { logo: <MayaSVG />,   name: "Maya",  sub: "Instant digital payment" },
              { logo: <CashSVG />,   name: "Cash",  sub: "Walk-in & pickup"        },
            ] as { logo: React.ReactNode; name: string; sub: string }[]).map((p) => (
              <StaggerItem key={p.name} variant="scale">
                <div
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white text-center transition-shadow hover:shadow-md"
                  style={{ border: "1px solid #b3dde8" }}
                >
                  <div className="w-16 h-10 rounded-lg overflow-hidden">
                    {p.logo}
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-0.5" style={{ color: "#0F172A" }}>{p.name}</p>
                    <p className="text-[11px] leading-snug" style={{ color: "#64748B" }}>{p.sub}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}

            {/* Visa + Mastercard combined card */}
            <StaggerItem variant="scale">
              <div
                className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white text-center transition-shadow hover:shadow-md"
                style={{ border: "1px solid #b3dde8" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-14 h-9 rounded-lg overflow-hidden">
                    <VisaSVG />
                  </div>
                  <div className="w-14 h-9 rounded-lg overflow-hidden">
                    <MastercardSVG />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: "#0F172A" }}>Visa / Mastercard</p>
                  <p className="text-[11px] leading-snug" style={{ color: "#64748B" }}>Credit &amp; debit cards</p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white relative overflow-hidden" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-12">
              <SectionLabel>Customer Reviews</SectionLabel>
              <h2 id="testimonials-heading" className="text-3xl lg:text-4xl font-bold mt-2 mb-4" style={{ color: "#0F172A" }}>
                What Our Customers Say
              </h2>
              {/* Social proof bar */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-5 py-3 rounded-2xl" style={{ background: "#dff0f7", border: "1px solid #b3dde8" }}>
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4" style={{ fill: "#fdca00", color: "#fdca00" }} aria-hidden="true" />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>4.9 out of 5</span>
                <span className="hidden sm:inline text-xs" style={{ color: "#94A3B8" }}>·</span>
                <span className="text-xs" style={{ color: "#64748B" }}>Loved by customers across Metro Manila since 2016</span>
              </div>
            </div>
          </AnimateOnScroll>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((r) => (
              <StaggerItem key={r.name}>
                <figure
                  className="rounded-2xl p-6 bg-white h-full flex flex-col"
                  style={{ border: "1px solid #b3dde8" }}
                >
                  <div className="flex gap-0.5 mb-4" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4" style={{ fill: "#fdca00", color: "#fdca00" }} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed flex-1 italic mb-5" style={{ color: "#475569" }}>
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ background: "#38a9c2" }}
                      aria-hidden="true"
                    >
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#0F172A" }}>{r.name}</p>
                      <p className="text-xs" style={{ color: "#94A3B8" }}>{r.location}</p>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-16 lg:py-20 relative overflow-hidden" style={{ background: "#dff0f7" }} aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10">
              <h2 id="faq-heading" className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: "#0F172A" }}>
                Frequently Asked Questions
              </h2>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Can&apos;t find your answer?{" "}
                <a href="#contact" className="font-semibold underline" style={{ color: "#38a9c2" }}>
                  Send us a message.
                </a>
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll variant="fade-up" delay={0.1}>
            <FAQLoader />
          </AnimateOnScroll>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          LOCATION
      ════════════════════════════════════════════════════════ */}
      <section id="locations" className="py-16 lg:py-20 bg-white relative overflow-hidden" aria-labelledby="location-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10">
              <h2 id="location-heading" className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: "#0F172A" }}>
                Visit Our Makati Shop
              </h2>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Can&apos;t make it? We offer pickup & delivery in select areas.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Map placeholder */}
              <div className="lg:col-span-3 rounded-2xl overflow-hidden" style={{ border: "1px solid #b3dde8", minHeight: 260 }}>
                <iframe
                  title="The Laundry Project Makati location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.0!2d121.016!3d14.554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s7533+Santillan+St+Makati+City!5e0!3m2!1sen!2sph!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 260, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Branch info */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div
                  className="rounded-2xl p-6 flex-1"
                  style={{ background: "#dff0f7", border: "1px solid #b3dde8" }}
                >
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#38a9c2" }}>
                      <Building2 className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base" style={{ color: "#0F172A" }}>Makati</h3>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white mt-1" style={{ background: "#38a9c2" }}>
                        Open Now
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-3 items-start text-sm">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#38a9c2" }} aria-hidden="true" />
                      <span style={{ color: "#475569" }}>7533 Santillan St., Makati City</span>
                    </li>
                    <li className="flex gap-3 items-start text-sm">
                      <Clock className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#38a9c2" }} aria-hidden="true" />
                      <div style={{ color: "#475569" }}>
                        <p className="font-medium" style={{ color: "#0F172A" }}>{shortDays}</p>
                        <p>{timeRange}</p>
                      </div>
                    </li>
                    <li className="flex gap-3 items-center text-sm">
                      <Phone className="w-4 h-4 shrink-0" style={{ color: "#38a9c2" }} aria-hidden="true" />
                      <a href="tel:+639178381596" className="hover:underline" style={{ color: "#475569" }}>0917 838 1596</a>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://maps.google.com/?q=7533+Santillan+St,+Makati+City,+Philippines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "#38a9c2" }}
                  >
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    Open in Google Maps
                  </a>
                  <a
                    href="https://m.me/thelaundryprojectph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                    style={{ background: "#fdca00", color: "#0F172A" }}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    Schedule Pickup
                  </a>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-16 lg:py-20 pb-28 relative overflow-hidden" style={{ background: "#dff0f7" }} aria-labelledby="contact-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center mb-10">
              <h2 id="contact-heading" className="text-3xl lg:text-4xl font-bold mb-3" style={{ color: "#0F172A" }}>
                We&apos;d Love to Hear from You
              </h2>
              <p className="text-sm" style={{ color: "#64748B" }}>
                Questions, special requests, or corporate inquiries — we&apos;re here to help.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <AnimateOnScroll variant="fade-up" className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-7" style={{ border: "1px solid #b3dde8" }}>
                <h3 className="text-base font-bold mb-5" style={{ color: "#0F172A" }}>Send Us a Message</h3>
                <ContactForm />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-left" delay={0.15} className="lg:col-span-2">
              <div className="flex flex-col gap-4 h-full">
                <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #b3dde8" }}>
                  <h3 className="text-sm font-bold mb-4" style={{ color: "#0F172A" }}>Contact Details</h3>
                  <ul className="space-y-3.5">
                    {[
                      { Icon: MapPin,         label: "Address", value: "7533 Santillan St., Makati City",   href: undefined },
                      { Icon: Phone,          label: "Phone",   value: "0917 838 1596",                     href: "tel:+639178381596" },
                      { Icon: MessageCircle,  label: "Email",   value: "washup@thelaundryproject.ph",       href: "mailto:washup@thelaundryproject.ph" },
                    ].map(({ Icon, label, value, href }) => (
                      <li key={label} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#dff0f7" }}>
                          <Icon className="w-4 h-4" style={{ color: "#38a9c2" }} aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#94A3B8" }}>{label}</p>
                          {href
                            ? <a href={href} className="text-xs hover:underline break-all" style={{ color: "#475569" }}>{value}</a>
                            : <p className="text-xs" style={{ color: "#475569" }}>{value}</p>
                          }
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="https://m.me/thelaundryprojectph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:opacity-90"
                  style={{ background: "#38a9c2" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="text-white">
                    <p className="font-semibold text-sm">Chat on Messenger</p>
                    <p className="text-xs opacity-75">Fastest way to book or inquire</p>
                  </div>
                </a>

                <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #b3dde8" }}>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#0F172A" }}>Business Hours</p>
                  <div className="flex justify-between text-xs" style={{ color: "#475569" }}>
                    <span>{longDays}</span>
                    <span className="font-semibold">{timeRange}</span>
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: "#94A3B8" }}>{closedNote}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* Wave → CTA */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 90 }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C480,0 960,90 1440,30 L1440,90 L0,90 Z" fill="#38a9c2"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════════ */}
      <section
        className="py-16 lg:py-20 relative overflow-hidden"
        style={{ background: "#38a9c2" }}
        aria-labelledby="cta-heading"
      >
        <div className="bubble-bg absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll variant="scale">
            <h2 id="cta-heading" className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready for Fresh Laundry?
            </h2>
            <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.72)" }}>
              Book a pickup in seconds — we handle the washing, folding & delivery right to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <BookingModal variant="primary" label="Book a Pickup Now" className="px-8 py-4 text-sm hover:scale-105 hover:shadow-2xl" />
              <a
                href="tel:+639178381596"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/30 text-sm hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Call 0917 838 1596
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

