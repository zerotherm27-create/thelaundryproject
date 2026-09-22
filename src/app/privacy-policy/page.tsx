import type { Metadata } from "next";
import PolicyLayout, { PolicySection } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | The Laundry Project",
  description: "How The Laundry Project collects, uses, and protects your personal data. Compliant with the Philippines Data Privacy Act (RA 10173) and GDPR.",
  alternates: {
    canonical: "/privacy-policy",
  },
  robots: { index: true, follow: true },
};

const UPDATED = "25 May 2026";
const EMAIL    = "info@thelaundryproject.ph";
const PHONE    = "0917 838 1596";
const ADDRESS  = "7533 Santillan St., Makati City, Metro Manila, Philippines";

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated={UPDATED}>

      <PolicySection heading="1. Who We Are">
        <p>
          The Laundry Project is operated by Rinselab Inc., a company registered in the Philippines. We provide
          professional laundry, dry-cleaning, and garment-care services with pickup and delivery across Metro Manila.
        </p>
        <p>
          We act as the <strong>Data Controller</strong> of the personal information you share with us.
          For all privacy matters, contact us at:
        </p>
        <ul className="list-none space-y-1 pl-1">
          <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a></li>
          <li><strong>Phone:</strong> <a href="tel:+639178381596" className="underline" style={{ color: "#38a9c2" }}>{PHONE}</a></li>
          <li><strong>Address:</strong> {ADDRESS}</li>
        </ul>
      </PolicySection>

      <div className="pt-10">
      <PolicySection heading="2. Data We Collect">
        <p>We collect the following categories of personal data:</p>

        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Category</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Data collected</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Source</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              <tr>
                <td className="px-4 py-3 font-medium">Booking data</td>
                <td className="px-4 py-3">Name, delivery address, phone number, order details, preferred schedule</td>
                <td className="px-4 py-3">You (via Facebook Messenger)</td>
              </tr>
              <tr style={{ background: "#fafafa" }}>
                <td className="px-4 py-3 font-medium">Contact form</td>
                <td className="px-4 py-3">Name, email address, message content</td>
                <td className="px-4 py-3">You (via our website contact form)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Payment data</td>
                <td className="px-4 py-3">Payment method selected (GCash, Maya, card, cash). Card numbers and wallet credentials are handled solely by the payment provider.</td>
                <td className="px-4 py-3">You (at point of transaction)</td>
              </tr>
              <tr style={{ background: "#fafafa" }}>
                <td className="px-4 py-3 font-medium">Technical data</td>
                <td className="px-4 py-3">IP address, browser type, device type, pages visited, session duration, referral source</td>
                <td className="px-4 py-3">Automatically (cookies & analytics)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do not collect sensitive personal information (e.g., health data, government ID numbers, financial
          account credentials) and do not knowingly collect data from children under 13.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="3. How We Use Your Data">
        <p>Your data is used only for the purposes described below:</p>
        <ul className="space-y-2 pl-4 list-disc">
          <li><strong>Service delivery</strong> — process your booking, coordinate pickup, complete delivery, confirm your order via Messenger.</li>
          <li><strong>Customer support</strong> — respond to inquiries and resolve complaints submitted via our contact form or Messenger.</li>
          <li><strong>Payment processing</strong> — record which payment method was used and confirm settlement with the payment provider.</li>
          <li><strong>Analytics & improvement</strong> — understand how visitors use our website so we can improve it (via Google Analytics and Hotjar/Clarity).</li>
          <li><strong>Marketing</strong> — show relevant ads on Facebook and Instagram to people who have visited our site (via Meta Pixel). You can opt out at any time.</li>
          <li><strong>Legal & compliance</strong> — maintain records as required by Philippine law (e.g., BIR, SEC obligations).</li>
        </ul>
        <p>We will never sell, rent, or trade your personal data to any third party for their own marketing purposes.</p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="4. Legal Basis for Processing (GDPR)">
        <p>For users in the European Economic Area (EEA) or where GDPR applies, our legal bases are:</p>
        <ul className="space-y-2 pl-4 list-disc">
          <li><strong>Performance of a contract</strong> (Art. 6(1)(b)) — processing your booking and delivering the service.</li>
          <li><strong>Legitimate interests</strong> (Art. 6(1)(f)) — analytics, fraud prevention, and improving our service.</li>
          <li><strong>Consent</strong> (Art. 6(1)(a)) — marketing cookies and remarketing ads. You may withdraw consent at any time via our cookie banner or by emailing us.</li>
          <li><strong>Legal obligation</strong> (Art. 6(1)(c)) — retaining financial records as required by Philippine tax law.</li>
        </ul>
        <p>
          For Philippine residents, processing is conducted in accordance with the <strong>Data Privacy Act of 2012
          (Republic Act No. 10173)</strong> and its Implementing Rules and Regulations.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="5. Cookies and Tracking Technologies">
        <p>
          We use cookies and similar tracking technologies when you visit our website. A cookie is a small file stored
          on your device. We use four categories:
        </p>
        <ul className="space-y-2 pl-4 list-disc">
          <li>
            <strong>Strictly necessary</strong> — essential for the website to function (e.g., session management).
            These cannot be disabled.
          </li>
          <li>
            <strong>Analytics</strong> — <em>Google Analytics (GA4)</em> tracks page visits, session duration, and
            traffic sources in aggregate to help us improve the site. IP addresses are anonymized.
          </li>
          <li>
            <strong>Session recording</strong> — <em>Hotjar / Microsoft Clarity</em> records anonymized mouse
            movement, clicks, and scroll depth to help us understand usability issues.
          </li>
          <li>
            <strong>Marketing</strong> — the <em>Meta Pixel</em> records page visits so we can show relevant ads on
            Facebook and Instagram and measure their effectiveness.
          </li>
        </ul>
        <p>
          On your first visit, a cookie consent banner will ask for your preference. You can accept all, decline
          non-essential cookies, or change your preference at any time by clearing your browser&apos;s local storage
          or contacting us at <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a>.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="6. Third-Party Services">
        <p>We share data with the following third parties only to the extent necessary:</p>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
          <table className="w-full text-xs">
            <thead style={{ background: "#f1f5f9" }}>
              <tr>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Provider</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Purpose</th>
                <th className="text-left px-4 py-3 font-semibold" style={{ color: "#0F172A" }}>Privacy policy</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#f1f5f9" }}>
              <tr>
                <td className="px-4 py-3 font-medium">Meta (Facebook)</td>
                <td className="px-4 py-3">Messenger booking, ad retargeting (Meta Pixel)</td>
                <td className="px-4 py-3"><a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#38a9c2" }}>facebook.com/privacy</a></td>
              </tr>
              <tr style={{ background: "#fafafa" }}>
                <td className="px-4 py-3 font-medium">Google LLC</td>
                <td className="px-4 py-3">Website analytics (Google Analytics 4)</td>
                <td className="px-4 py-3"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#38a9c2" }}>policies.google.com</a></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Hotjar / Microsoft Clarity</td>
                <td className="px-4 py-3">Session recording & heatmaps (analytics only, no PII recorded)</td>
                <td className="px-4 py-3"><a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#38a9c2" }}>hotjar.com/legal</a></td>
              </tr>
              <tr style={{ background: "#fafafa" }}>
                <td className="px-4 py-3 font-medium">Supabase</td>
                <td className="px-4 py-3">Secure cloud database for booking records and pricing data</td>
                <td className="px-4 py-3"><a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#38a9c2" }}>supabase.com/privacy</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          All third-party providers are required to process your data only as instructed and maintain appropriate
          security standards. We do not authorise them to use your data for their own marketing purposes.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="7. Data Retention">
        <ul className="space-y-2 pl-4 list-disc">
          <li><strong>Booking records</strong> — retained for 3 years from the date of service to support any disputes, warranty claims, or tax audits.</li>
          <li><strong>Contact form submissions</strong> — retained for 12 months, then deleted.</li>
          <li><strong>Analytics data</strong> — Google Analytics data is retained for 14 months per Google&apos;s default settings. Hotjar/Clarity session recordings are retained for 365 days.</li>
          <li><strong>Marketing pixel data</strong> — Meta Pixel events are retained for up to 180 days.</li>
        </ul>
        <p>You may request early deletion at any time. See our <a href="/data-deletion" className="underline" style={{ color: "#38a9c2" }}>Data Deletion Policy</a>.</p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="8. Your Rights">
        <p>Under GDPR and the Philippines Data Privacy Act, you have the right to:</p>
        <ul className="space-y-2 pl-4 list-disc">
          <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
          <li><strong>Rectification</strong> — ask us to correct inaccurate or incomplete data.</li>
          <li><strong>Erasure (&ldquo;right to be forgotten&rdquo;)</strong> — request deletion of your data where there is no legal obligation to retain it.</li>
          <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
          <li><strong>Object</strong> — object to processing based on legitimate interests or for direct marketing.</li>
          <li><strong>Withdraw consent</strong> — withdraw consent for marketing cookies or remarketing at any time.</li>
          <li><strong>Lodge a complaint</strong> — with the <a href="https://www.privacy.gov.ph" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#38a9c2" }}>National Privacy Commission</a> (Philippines) or your local data protection authority (for EEA residents).</li>
        </ul>
        <p>
          To exercise any right, email us at{" "}
          <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a>{" "}
          with the subject line <em>&ldquo;Data Rights Request&rdquo;</em>. We will respond within 30 days.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="9. Data Security">
        <p>
          We implement appropriate technical and organisational measures to protect your personal data against
          unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission
          (HTTPS/TLS), access controls on our database, and regular security reviews.
        </p>
        <p>
          In the event of a data breach that is likely to affect your rights and freedoms, we will notify the
          National Privacy Commission within 72 hours and inform affected individuals without undue delay.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="10. International Data Transfers">
        <p>
          Some of our third-party service providers (Google, Meta, Supabase, Hotjar) process data outside the
          Philippines. Where data is transferred to countries without an adequate level of data protection, we rely
          on Standard Contractual Clauses or other appropriate safeguards as permitted under GDPR and RA 10173.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="11. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last
          updated&rdquo; date at the top of this page. For significant changes, we will post a notice on our
          website. Continued use of our services after changes are posted constitutes acceptance of the updated
          policy.
        </p>
      </PolicySection>
      </div>

      <div className="pt-10">
      <PolicySection heading="12. Contact Us">
        <p>For any privacy-related questions, requests, or complaints:</p>
        <ul className="list-none space-y-1.5 pl-1">
          <li><strong>Email:</strong> <a href={`mailto:${EMAIL}`} className="underline" style={{ color: "#38a9c2" }}>{EMAIL}</a></li>
          <li><strong>Phone:</strong> <a href="tel:+639178381596" className="underline" style={{ color: "#38a9c2" }}>{PHONE}</a></li>
          <li><strong>Address:</strong> {ADDRESS}</li>
        </ul>
        <p className="text-xs" style={{ color: "#94A3B8" }}>
          This policy applies to the website at thelaundryproject.ph and all services provided by Rinselab Inc.
        </p>
      </PolicySection>
      </div>

    </PolicyLayout>
  );
}
