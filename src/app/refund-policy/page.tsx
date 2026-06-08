import type { Metadata } from "next";
import PolicyLayout, { PolicySection } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Refund Policy | The Laundry Project",
  description: "The Laundry Project's refund and re-service policy. Service credit applies to completed orders. Cancelled prepaid bookings are refunded via Xendit to the original payment method.",
};

const UPDATED = "25 May 2026";
const EMAIL   = "info@thelaundryproject.ph";
const PHONE   = "0917 838 1596";

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy" lastUpdated={UPDATED}>

      <PolicySection heading="1. Our Commitment">
        <p>
          We take pride in delivering clean, carefully handled laundry every time. If something is not right,
          we want to make it right.
        </p>
        <p>
          This policy covers two distinct situations — <strong>issues with a completed service</strong> and{" "}
          <strong>cancellations of prepaid bookings</strong>. The resolution process and form of compensation
          differ between the two. Please read both sections to understand what applies to your situation.
        </p>
      </PolicySection>

      {/* ── TRACK A: Completed service ─────────────────────────── */}
      <div className="pt-10">
      <PolicySection heading="2. Completed Service — No Cash Refunds">
        <div
          className="rounded-xl p-4 mb-4"
          style={{ background: "rgba(253,202,0,0.06)", border: "1px solid rgba(253,202,0,0.25)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#92400e" }}>
            Important: once a service has been rendered, we do not issue cash refunds.
          </p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "#78350f" }}>
            Compensation for completed-service issues is provided exclusively as an equivalent service credit —
            a free re-clean, a priority redo, or service credit of equal value applied to your next order.
          </p>
        </div>
        <p>
          If you are unhappy with the result of a completed service, you are entitled to the following:
        </p>
        <ul className="space-y-2 pl-4 list-disc">
          <li>
            <strong>Free re-clean</strong> — we redo the affected item(s) at no charge, with priority
            turnaround and complimentary pickup and re-delivery.
          </li>
          <li>
            <strong>Service credit</strong> — if a re-clean is not feasible (e.g., the item was damaged
            beyond recovery), we will issue a credit equal to the cleaning fee paid for the affected item.
            This credit is applied to your next order and does not expire within 12 months.
          </li>
          <li>
            <strong>Extended service credit (serious damage or confirmed loss)</strong> — for verified cases
            of significant damage or lost items, we may issue a service credit of up to 5× the cleaning fee
            paid, at our sole discretion. This remains in the form of service credit, not cash.
          </li>
        </ul>
        <p className="text-xs" style={{ color: "#94A3B8" }}>
          We do not compensate for the full retail or replacement value of garments. If you have a
          high-value item, please inform us before drop-off so we can discuss appropriate handling.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="3. Completed Service — Claim Eligibility">
        <p>A service credit or re-clean applies in the following situations:</p>
        <ul className="space-y-2 pl-4 list-disc">
          <li>
            <strong>Incomplete cleaning</strong> — visible stains, soil, or odour that was present at drop-off
            and has not been removed, where the care label and fabric type permit the cleaning method used.
          </li>
          <li>
            <strong>Damage caused by our process</strong> — tears, burns, shrinkage, or colour transfer
            caused directly by our handling.
          </li>
          <li>
            <strong>Lost item</strong> — an item included in your drop-off that was not returned. We require an
            itemised list at drop-off; items not listed cannot be claimed as lost.
          </li>
          <li>
            <strong>Wrong item returned</strong> — you receive a garment that does not belong to you. We will
            also work to recover your original item.
          </li>
        </ul>

        <p className="font-medium mt-2" style={{ color: "#0F172A" }}>The following are not eligible:</p>
        <ul className="space-y-1.5 pl-4 list-disc">
          <li><strong>Pre-existing damage</strong> — stains, tears, or wear present before drop-off.</li>
          <li><strong>Missing or incorrect care labels</strong> — we follow manufacturer labels and are not liable if these are missing, inaccurate, or overridden at the customer&apos;s request.</li>
          <li><strong>Inherent fabric behaviour</strong> — natural shrinkage, pilling, or colour fading on ageing or delicate fabrics.</li>
          <li><strong>Claims after 24 hours</strong> — all completed-service claims must be raised within 24 hours of delivery.</li>
          <li><strong>Antiques or items of extraordinary sentimental value</strong> — these must be declared before drop-off.</li>
        </ul>
      </PolicySection>
      </div>

      {/* ── TRACK B: Cancellations ─────────────────────────────── */}
      <div className="pt-10">
      <PolicySection heading="4. Order Cancellations — Prepaid Bookings via Web or Messenger">
        <p>
          If you booked and paid in advance through our <strong>web booking system</strong> or{" "}
          <strong>Facebook Messenger</strong> and need to cancel before the service is rendered, a monetary
          refund to your original payment method may apply, subject to the following conditions:
        </p>

        <div className="rounded-xl overflow-hidden mt-3" style={{ border: "1px solid #e2e8f0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>When you cancel</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Refund</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              <tr>
                <td className="px-4 py-3">Before our rider has been dispatched for pickup</td>
                <td className="px-4 py-3 font-medium text-green-700">Full refund of amount paid</td>
              </tr>
              <tr style={{ background: "#fafafa" }}>
                <td className="px-4 py-3">After rider dispatch but before items reach our facility</td>
                <td className="px-4 py-3">Refund less a ₱100 dispatch fee</td>
              </tr>
              <tr>
                <td className="px-4 py-3">After items have been received and processing has begun</td>
                <td className="px-4 py-3 font-medium" style={{ color: "#92400e" }}>No monetary refund — service credit only</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl p-4 mt-4" style={{ background: "rgba(56,169,194,0.06)", border: "1px solid rgba(56,169,194,0.2)" }}>
          <p className="text-sm font-semibold mb-2" style={{ color: "#0F172A" }}>
            Payment refund processing — powered by Xendit
          </p>
          <p className="text-xs leading-relaxed mb-3" style={{ color: "#475569" }}>
            All online payments are processed through <strong>Xendit</strong>, our payment gateway. Approved
            cancellation refunds are returned to your <em>original payment method</em> and processed
            according to Xendit&apos;s standard timelines:
          </p>
          <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
            <table className="w-full text-xs">
              <thead style={{ background: "#f8fafc" }}>
                <tr>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: "#0F172A" }}>Payment method</th>
                  <th className="text-left px-3 py-2 font-semibold" style={{ color: "#0F172A" }}>Estimated refund timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
                <tr>
                  <td className="px-3 py-2">GCash</td>
                  <td className="px-3 py-2">1–5 business days to your GCash wallet</td>
                </tr>
                <tr style={{ background: "#fafafa" }}>
                  <td className="px-3 py-2">Maya</td>
                  <td className="px-3 py-2">1–5 business days to your Maya wallet</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Visa / Mastercard (credit or debit)</td>
                  <td className="px-3 py-2">5–15 business days, depending on your issuing bank</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] mt-3 leading-relaxed" style={{ color: "#94A3B8" }}>
            Timelines are governed by Xendit and your payment provider. We initiate the refund on our end
            within 1–2 business days of approving your cancellation. The payment transaction fee charged
            by Xendit is non-refundable and will be deducted from the refund amount. We have no control
            over processing times once the refund is submitted to Xendit.
          </p>
        </div>
      </PolicySection>
      </div>

      {/* ── How to claim ──────────────────────────────────────── */}
      <div className="pt-10">
      <PolicySection heading="5. How to File a Claim or Request a Cancellation">
        <ol className="space-y-3 pl-4 list-decimal">
          <li>
            <strong>Contact us within the applicable window</strong> — within 24 hours of delivery for
            service quality claims; before processing begins for cancellation requests.
          </li>
          <li>
            <strong>Provide your booking reference</strong> — found in your web booking confirmation email
            or your Messenger chat thread.
          </li>
          <li>
            <strong>For service quality claims</strong> — attach clear photos of the affected item(s)
            showing the issue.
          </li>
          <li>
            We will acknowledge your claim within <strong>1 business day</strong> and aim to resolve it
            within <strong>3 business days</strong>.
          </li>
          <li>
            Approved service credits will be logged to your account. Approved cancellation refunds will
            be submitted to Xendit within <strong>1–2 business days</strong> of approval.
          </li>
        </ol>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="6. Contact Us">
        <p>To raise a claim, request a cancellation, or ask about this policy:</p>
        <ul className="list-none space-y-1.5 pl-1">
          <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a></li>
          <li><strong>Phone / Messenger:</strong> <a href="tel:+639178381596" className="underline" style={{ color: "#38a9c2" }}>{PHONE}</a></li>
          <li><strong>Hours:</strong> Monday – Sunday, 9:00 AM – 6:00 PM</li>
        </ul>
      </PolicySection>
      </div>

    </PolicyLayout>
  );
}
