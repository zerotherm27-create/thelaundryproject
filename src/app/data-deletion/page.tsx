import type { Metadata } from "next";
import PolicyLayout, { PolicySection } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Data Deletion Policy | The Laundry Project",
  description: "How to request deletion of your personal data held by The Laundry Project. Your right to erasure under GDPR and the Philippines Data Privacy Act.",
  alternates: {
    canonical: "/data-deletion",
  },
};

const UPDATED = "25 May 2026";
const EMAIL   = "info@thelaundryproject.ph";
const PHONE   = "0917 838 1596";

export default function DataDeletionPage() {
  return (
    <PolicyLayout title="Data Deletion Policy" lastUpdated={UPDATED}>

      <PolicySection heading="1. Your Right to Erasure">
        <p>
          You have the right to request that we delete the personal data we hold about you. This right is
          recognised under:
        </p>
        <ul className="space-y-1 pl-4 list-disc">
          <li><strong>General Data Protection Regulation (GDPR)</strong>, Article 17 — &ldquo;Right to erasure (right to be forgotten)&rdquo;</li>
          <li><strong>Philippines Data Privacy Act of 2012 (RA 10173)</strong>, Section 16 — Right to erasure or blocking</li>
        </ul>
        <p>
          We are committed to honouring deletion requests promptly and transparently.
        </p>
      </PolicySection>

      <div className="pt-10">
      <PolicySection heading="2. What Personal Data We Hold">
        <p>Depending on how you have interacted with us, we may hold:</p>
        <ul className="space-y-1.5 pl-4 list-disc">
          <li>Your name, delivery address, and contact number (from bookings made via Messenger)</li>
          <li>Your name and email address (from our website contact form)</li>
          <li>Your booking and order history (dates, services, amounts paid)</li>
          <li>Technical data such as your IP address and browser information (collected via analytics tools)</li>
        </ul>
        <p>
          We do not store credit card or bank account numbers. Payment credentials are handled directly by
          your payment provider (GCash, Maya, card network).
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="3. What We Can Delete">
        <p>Upon a valid deletion request, we will:</p>
        <ul className="space-y-1.5 pl-4 list-disc">
          <li>Delete or anonymise your name, address, and contact details from our booking records</li>
          <li>Delete your contact form submission(s)</li>
          <li>Remove your data from our internal customer database (Supabase)</li>
          <li>Request deletion from analytics tools where technically feasible (Google Analytics, Hotjar)</li>
        </ul>
        <p>
          Note: analytics data collected before your request may already have been aggregated or anonymised
          and cannot be individually identified for deletion.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="4. What We May Retain (Legal Exceptions)">
        <p>
          Under the Philippines Data Privacy Act and applicable tax laws, we are required to retain certain
          records even after a deletion request:
        </p>
        <ul className="space-y-2 pl-4 list-disc">
          <li>
            <strong>Financial transaction records</strong> — the fact that a transaction occurred, the amount,
            and the date, are retained for <strong>10 years</strong> as required by the Bureau of Internal
            Revenue (BIR) and general accounting obligations. Personal identifiers in these records will be
            minimised or anonymised where legally permissible.
          </li>
          <li>
            <strong>Active disputes or legal proceedings</strong> — if your data is relevant to an ongoing
            dispute or legal claim, we will retain the relevant records until the matter is resolved.
          </li>
          <li>
            <strong>Fraud prevention</strong> — data required to prevent or investigate fraudulent activity
            may be retained for a limited period.
          </li>
        </ul>
        <p>
          We will inform you clearly of any data we are unable to delete and the legal basis for retaining it.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="5. Third-Party Data">
        <p>
          We will pass your deletion request on to relevant third-party processors where we have the ability
          to do so:
        </p>
        <ul className="space-y-1.5 pl-4 list-disc">
          <li><strong>Supabase</strong> — data deleted from our database is purged from Supabase storage.</li>
          <li><strong>Meta (Facebook)</strong> — we can remove custom audience data linked to your profile from our ad account. Your Facebook/Messenger data is governed by Meta&apos;s own privacy policy.</li>
          <li><strong>Google Analytics</strong> — we can submit a user deletion request to Google for your data.</li>
          <li><strong>Hotjar / Clarity</strong> — we can submit a deletion request for any recorded sessions associated with your visit.</li>
        </ul>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="6. How to Request Deletion">
        <p>To submit a data deletion request:</p>
        <ol className="space-y-3 pl-4 list-decimal">
          <li>
            Email us at{" "}
            <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a>{" "}
            with the subject line <em>&ldquo;Data Deletion Request&rdquo;</em>.
          </li>
          <li>
            Include:
            <ul className="mt-1 pl-4 list-disc space-y-0.5">
              <li>Your full name</li>
              <li>The phone number or email address used when booking</li>
              <li>A brief description of what you would like deleted</li>
            </ul>
          </li>
          <li>
            We may ask you to verify your identity to protect against unauthorised deletion requests. This is
            done by confirming details from a previous booking.
          </li>
        </ol>
        <p>
          You may also call us on{" "}
          <a href="tel:+639178381596" className="underline" style={{ color: "#38a9c2" }}>{PHONE}</a>{" "}
          during business hours (Mon–Sat, 9:00 AM – 6:00 PM) and we will guide you through the process.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="7. Processing Timeline">
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Step</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              <tr>
                <td className="px-4 py-3">Acknowledgement of your request</td>
                <td className="px-4 py-3 font-medium">Within 3 business days</td>
              </tr>
              <tr style={{ background: "#fafafa" }}>
                <td className="px-4 py-3">Identity verification (if required)</td>
                <td className="px-4 py-3 font-medium">Within 5 business days</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Data deletion completed</td>
                <td className="px-4 py-3 font-medium">Within 30 calendar days of verified request</td>
              </tr>
              <tr style={{ background: "#fafafa" }}>
                <td className="px-4 py-3">Deletion confirmation sent to you</td>
                <td className="px-4 py-3 font-medium">Within 30 calendar days</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If we cannot fulfil your request in full (due to legal retention obligations), we will notify you
          within the same timeframe and explain which data is retained and why.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="8. Contact Us">
        <ul className="list-none space-y-1.5 pl-1">
          <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a></li>
          <li><strong>Phone:</strong> <a href="tel:+639178381596" className="underline" style={{ color: "#38a9c2" }}>{PHONE}</a></li>
          <li><strong>Address:</strong> 7533 Santillan St., Makati City, Metro Manila, Philippines</li>
        </ul>
        <p>
          For complaints about how we have handled your deletion request, you may also contact the{" "}
          <a href="https://www.privacy.gov.ph" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#38a9c2" }}>
            National Privacy Commission of the Philippines
          </a>.
        </p>
      </PolicySection>
      </div>

    </PolicyLayout>
  );
}
