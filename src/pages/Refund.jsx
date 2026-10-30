import { Logo } from "../Logo.jsx";

export default function Refund() {
  return (
    <section className="wrap section legal-page">
      <div className="legal-crumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Refund &amp; Cancellation Policy</span></div>
      <article className="legal-card">
        <header className="legal-header">
          <div className="legal-brand-row"><span className="legal-logo"><Logo h={42} /></span><span className="legal-brand-label">Clear sailing, clear cancellation terms</span></div>
          <div className="legal-banner-content">
            <div>
              <span className="legal-eyebrow">MANTHANPAY FERRY · BOOKINGS &amp; REFUNDS</span>
              <h1>Refund &amp; Cancellation Policy</h1>
              <p><strong>Effective Date:</strong> 05 August 2026</p>
            </div>
            <div className="legal-illustration" aria-hidden="true">
              <svg viewBox="0 0 180 130">
                <path className="legal-sun" d="M111 18a28 28 0 1 0 0 56 28 28 0 0 0 0-56Z" />
                <path className="legal-ship" d="M23 80h128l-18 27H48L23 80Z" />
                <path className="legal-ship-detail" d="M54 63h65v17H54zM72 46h30v17H72zM84 37h8v9h-8z" />
                <path className="legal-window" d="M61 68h11v8H61zm19 0h11v8H80zm19 0h11v8H99zm-20-17h11v8H79z" />
                <path className="legal-wave" d="M12 115c14-8 28-8 42 0s28 8 42 0 28-8 42 0 28-8 42 0" />
                <path className="legal-wave legal-wave-secondary" d="M0 126c14-8 28-8 42 0s28 8 42 0 28-8 42 0 28 8 42 0 28-8 42 0" />
              </svg>
              <span className="legal-shield">✓</span>
            </div>
          </div>
        </header>

        <div className="legal-content">
          <section><h2>1. Cancellation of Booking</h2><p>You may cancel a ferry booking subject to the cancellation rules of the relevant ferry operator. Submit cancellation requests before the scheduled departure time through the booking platform or our customer support team.</p></section>

          <section><h2>2. Refund Eligibility</h2><ul><li>Refunds are governed by the cancellation policy of the relevant ferry operator.</li><li>A booking cancelled within the eligible period may qualify for a full or partial refund.</li><li>Applicable cancellation charges may be deducted from the refund.</li><li>Convenience, payment gateway, and service charges may be non-refundable.</li></ul></section>

          <section><h2>3. Non-Refundable Situations</h2><p>A refund may not be available in circumstances such as:</p><ul><li>Not appearing at the boarding terminal (a no-show)</li><li>Arriving after the required reporting time</li><li>Providing incorrect passenger information during booking</li><li>A booking designated as non-refundable by the ferry operator</li><li>Not carrying valid identification documents</li></ul></section>

          <section><h2>4. Ferry Schedule Changes</h2><p>Ferry schedules may be delayed, changed, or cancelled because of weather conditions, tides, technical issues, government directions, or port authority instructions. Where reasonably possible, passengers will be notified using the contact details provided during booking.</p></section>

          <section><h2>5. Refund Processing Time</h2><p>Approved refunds are generally processed within <strong>7 to 10 business days</strong>. The time for the funds to appear in your account depends on your bank, card issuer, UPI application, or payment gateway provider.</p></section>

          <section><h2>6. Operator Cancellation</h2><p>If a ferry operator cancels a service for operational or safety reasons, eligible passengers may be offered a refund, rescheduling, or an alternative service in line with the operator’s policy.</p></section>

          <section><h2>7. Force Majeure</h2><p>ManthanPay is not responsible for cancellations or delays caused by events beyond its reasonable control, including:</p><ul><li>Adverse weather conditions</li><li>Natural disasters</li><li>Floods or cyclones</li><li>Government restrictions</li><li>Port closures or public emergencies</li><li>Technical failures of ferry operators</li></ul><p>Refunds in these cases are handled according to the applicable ferry operator’s policy.</p></section>

          <section><h2>8. Contact for Refund Assistance</h2><p>For cancellation requests, refund status, or booking assistance, contact the ManthanPay customer support team using the contact information on our website. We will make reasonable efforts to help in accordance with the applicable operator policies.</p></section>
        </div>
      </article>
    </section>
  );
}
