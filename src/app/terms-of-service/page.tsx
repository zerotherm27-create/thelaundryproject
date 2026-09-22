import type { Metadata } from "next";
import PolicyLayout, { PolicySection } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms of Service | The Laundry Project",
  description: "Terms and conditions for using The Laundry Project's laundry, dry-cleaning, and delivery services in Metro Manila.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

const UPDATED = "25 May 2026";
const EMAIL   = "info@thelaundryproject.ph";
const PHONE   = "0917 838 1596";

export default function TermsOfServicePage() {
  return (
    <PolicyLayout title="Terms of Service" lastUpdated={UPDATED}>

      <PolicySection heading="1. Acceptance of Terms">
        <p>
          By booking a service with The Laundry Project (operated by Rinselab Inc., &ldquo;we&rdquo;, &ldquo;us&rdquo;,
          &ldquo;our&rdquo;), whether via Facebook Messenger, our website, or in person, you agree to these Terms of
          Service. If you do not agree, please do not use our services.
        </p>
        <p>
          We reserve the right to update these terms at any time. Continued use of our services after an update
          constitutes acceptance of the revised terms.
        </p>
      </PolicySection>

      <div className="pt-10">
      <PolicySection heading="2. Our Services">
        <p>The Laundry Project provides the following services in Metro Manila:</p>
        <ul className="space-y-1 pl-4 list-disc">
          <li>Machine wash, hand wash, and dry cleaning</li>
          <li>Press and ironing</li>
          <li>Express same-day service (subject to availability; drop-off before noon)</li>
          <li>Shoe and sneaker cleaning</li>
          <li>Pickup and delivery (within our service areas)</li>
        </ul>
        <p>
          Service availability, pricing, and turnaround times are subject to change. Current details are
          displayed on our website and communicated via Messenger at the time of booking.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="3. Booking and Orders">
        <p>
          Bookings can be made through two official channels:
        </p>
        <ul className="space-y-2 pl-4 list-disc">
          <li>
            <strong>Web Booking</strong> — via our online booking form at thelaundryproject.ph. Payment may
            be collected at the time of booking through our payment gateway (Xendit). A booking confirmation
            will be sent to your registered email or phone number.
          </li>
          <li>
            <strong>Facebook Messenger</strong> — via our automated booking assistant at{" "}
            <a
              href="https://m.me/thelaundryprojectph"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "#38a9c2" }}
            >
              m.me/thelaundryprojectph
            </a>
            . Payment may be arranged through Messenger or upon delivery, depending on the option selected.
          </li>
        </ul>
        <p>
          A booking is confirmed only when you receive an explicit confirmation — either a confirmation
          screen after web checkout, or a confirmation message in your Messenger thread. Unconfirmed
          bookings are not guaranteed.
        </p>
        <p>
          You are responsible for providing accurate pickup and delivery information (address, contact number,
          preferred schedule). We are not liable for failed pickups or deliveries caused by incorrect
          information provided by you.
        </p>
        <p>
          We reserve the right to decline or cancel any booking at our discretion (e.g., capacity constraints,
          items outside our accepted categories). In such cases, you will be notified promptly. Any prepayment
          will be refunded in accordance with our{" "}
          <a href="/refund-policy" className="underline" style={{ color: "#38a9c2" }}>Refund Policy</a>.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="4. Garment Care and Liability">
        <p>
          We take the utmost care with every garment. Our liability is limited as follows:
        </p>
        <ul className="space-y-2 pl-4 list-disc">
          <li>
            <strong>Loss or irreparable damage caused by us</strong> — we will reimburse you up to a maximum of
            five (5) times the cleaning price charged for that item. We are not liable for the full replacement
            value of garments unless we have agreed otherwise in writing.
          </li>
          <li>
            <strong>Pre-existing damage</strong> — we are not liable for damage that existed before the garment
            was received by us. We will document visible damage at pickup where possible.
          </li>
          <li>
            <strong>Care label compliance</strong> — we follow manufacturer care labels. We are not responsible
            for damage caused by garments whose care labels are missing, illegible, or inaccurate.
          </li>
          <li>
            <strong>Shrinkage or colour loss</strong> — due to the nature of some fabrics, we cannot guarantee
            against normal shrinkage or fading on delicate or older items. If in doubt, choose hand wash or
            dry cleaning.
          </li>
        </ul>
        <p>
          Claims must be raised within <strong>24 hours of delivery</strong>. See our{" "}
          <a href="/refund-policy" className="underline" style={{ color: "#38a9c2" }}>Refund Policy</a> for full
          details.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="5. Prohibited Items">
        <p>The following items are not accepted:</p>
        <ul className="space-y-1 pl-4 list-disc">
          <li>Items contaminated with hazardous substances (chemicals, biological matter)</li>
          <li>Items with severe pest infestation</li>
          <li>Items that require processes we do not offer</li>
          <li>Items whose value exceeds what our liability limits can cover, unless agreed in advance</li>
        </ul>
        <p>
          We reserve the right to refuse any item at pickup or to return it uncleaned if it is found to fall
          into a prohibited category after collection.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="6. Pricing and Payment">
        <p>
          Prices are displayed on our website and communicated at the time of booking. Final pricing may vary
          based on actual weight, garment count, or service type confirmed upon pickup.
        </p>
        <p>We accept the following payment methods:</p>
        <ul className="space-y-1 pl-4 list-disc">
          <li>GCash and Maya (mobile wallets)</li>
          <li>Visa and Mastercard (credit/debit cards)</li>
          <li>Cash on delivery</li>
        </ul>
        <p>
          For web bookings, payment is processed securely through <strong>Xendit</strong> at checkout.
          For Messenger bookings, payment is due upon delivery unless prepayment is agreed via Messenger.
          Unpaid orders may be subject to a storage fee of ₱50 per day after a 3-day grace period.
        </p>
        <p>
          Cancellations of prepaid orders are subject to our{" "}
          <a href="/refund-policy" className="underline" style={{ color: "#38a9c2" }}>Refund Policy</a>,
          which outlines the Xendit refund timelines per payment method.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="7. Uncollected Items">
        <p>
          Items not collected or delivered within <strong>14 days</strong> of the scheduled delivery date will be
          stored at your risk. Items uncollected for more than <strong>30 days</strong> may be donated to charity
          or disposed of, with prior notice sent to your registered contact number.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="8. Limitation of Liability">
        <p>
          To the fullest extent permitted by Philippine law, Rinselab Inc. is not liable for:
        </p>
        <ul className="space-y-1 pl-4 list-disc">
          <li>Indirect, incidental, or consequential losses (e.g., loss of use of clothing for a specific event)</li>
          <li>Force majeure events including natural disasters, flooding, extreme weather, or government-mandated shutdowns</li>
          <li>Delays caused by third-party couriers or logistics partners</li>
        </ul>
        <p>
          Our total liability for any claim arising from a single transaction shall not exceed the amount paid
          by you for that transaction.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="9. Complaints and Disputes">
        <p>
          If you are unhappy with any aspect of our service, please contact us within 24 hours of delivery:
        </p>
        <ul className="list-none space-y-1 pl-1">
          <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a></li>
          <li><strong>Phone / Messenger:</strong> <a href="tel:+639178381596" className="underline" style={{ color: "#38a9c2" }}>{PHONE}</a></li>
        </ul>
        <p>
          We aim to resolve all complaints within 3 business days. If we cannot resolve a dispute directly, it
          shall be settled by the appropriate courts in Makati City, Metro Manila, Philippines.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="10. Governing Law">
        <p>
          These terms are governed by the laws of the Republic of the Philippines. Any legal proceedings shall
          be brought in the courts of Makati City, Metro Manila.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="11. Contact Us">
        <ul className="list-none space-y-1.5 pl-1">
          <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a></li>
          <li><strong>Phone:</strong> <a href="tel:+639178381596" className="underline" style={{ color: "#38a9c2" }}>{PHONE}</a></li>
          <li><strong>Address:</strong> 7533 Santillan St., Makati City, Metro Manila, Philippines</li>
        </ul>
      </PolicySection>
      </div>

    </PolicyLayout>
  );
}
