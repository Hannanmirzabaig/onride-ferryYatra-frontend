import { Logo } from "../Logo.jsx";

export default function Terms() {
  return (
    <section className="wrap section legal-page">
      <div className="legal-crumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Terms &amp; Conditions</span></div>
      <article className="legal-card">
        <header className="legal-header">
          <div className="legal-brand-row"><span className="legal-logo"><Logo h={42} /></span><span className="legal-brand-label">Ferry travel · clear by design</span></div>
          <div className="legal-banner-content">
            <div>
              <span className="legal-eyebrow">FerryYatra · TRAVEL POLICIES</span>
              <h1>Terms &amp; Conditions</h1>
              <p><strong>Effective Date:</strong> 05 August 2026</p>
            </div>
            <div className="legal-illustration" aria-hidden="true">
              <svg viewBox="0 0 180 130">
                <path className="legal-sun" d="M111 18a28 28 0 1 0 0 56 28 28 0 0 0 0-56Z" />
                <path className="legal-ship" d="M23 80h128l-18 27H48L23 80Z" />
                <path className="legal-ship-detail" d="M54 63h65v17H54zM72 46h30v17H72zM84 37h8v9h-8z" />
                <path className="legal-window" d="M61 68h11v8H61zm19 0h11v8H80zm19 0h11v8H99zm-20-17h11v8H79z" />
                <path className="legal-wave" d="M12 115c14-8 28-8 42 0s28 8 42 0 28-8 42 0 28 8 42 0" />
                <path className="legal-wave legal-wave-secondary" d="M0 126c14-8 28-8 42 0s28 8 42 0 28-8 42 0 28 8 42 0 28-8 42 0" />
              </svg>
              <span className="legal-shield">✓</span>
            </div>
          </div>
        </header>

        <div className="legal-content">
          <section><h2>1. Acceptance of Terms</h2><p>Welcome to ManthanPay. By accessing our website or booking ferry tickets through our platform, you agree to comply with these Terms &amp; Conditions. If you do not agree, please refrain from using our services.</p></section>

          <section><h2>2. Booking Confirmation</h2><ul><li>All bookings are subject to seat availability.</li><li>Your booking is confirmed only after successful payment and issuance of a booking confirmation.</li><li>Customers must verify passenger details before completing the booking.</li></ul></section>

          <section><h2>3. Passenger Responsibilities</h2><ul><li>Passengers must carry a valid government-issued photo ID during travel.</li><li>Passengers are requested to report at the boarding terminal at least 30 minutes before departure.</li><li>Late arrivals may result in denied boarding without refund.</li><li>Passengers must follow all safety instructions issued by ferry staff.</li></ul></section>

          <section><h2>4. Schedule Changes</h2><p>Ferry schedules may be modified, delayed, or cancelled due to weather conditions, tidal changes, port authority instructions, technical issues, or any circumstances beyond our reasonable control.</p></section>

          <section><h2>5. Payment</h2><ul><li>All payments must be completed using the available payment methods.</li><li>Booking confirmation will be issued only after successful payment.</li><li>Any failed or reversed payment may result in automatic cancellation.</li></ul></section>

          <section><h2>6. Cancellation &amp; Refunds</h2><p>Cancellation requests and refunds are governed by our Refund &amp; Cancellation Policy. Applicable cancellation charges may apply depending on the operator’s policy and the timing of cancellation.</p></section>

          <section><h2>7. Baggage</h2><p>Passengers are responsible for their personal belongings. ManthanPay is not liable for loss, theft, or damage to baggage during the journey unless required under applicable law.</p></section>

          <section><h2>8. Safety &amp; Conduct</h2><ul><li>Passengers must behave responsibly throughout the journey.</li><li>Smoking, alcohol consumption, and carrying prohibited items may not be permitted as per operator rules.</li><li>Any passenger creating a safety risk may be denied boarding.</li></ul></section>

          <section><h2>9. Limitation of Liability</h2><p>ManthanPay acts as a booking platform facilitating ferry reservations. We are not liable for delays, cancellations, operational decisions of ferry operators, weather disruptions, or any indirect losses arising from travel interruptions.</p></section>

          <section><h2>10. Force Majeure</h2><p>We shall not be responsible for delays, cancellations, or service interruptions caused by natural disasters, adverse weather, government restrictions, strikes, pandemics, port closures, or any event beyond our reasonable control.</p></section>

          <section><h2>11. Governing Law</h2><p>These Terms &amp; Conditions shall be governed by the laws of India. Any disputes arising from the use of our services shall be subject to the jurisdiction of the competent courts.</p></section>

          <section><h2>12. Contact Us</h2><p>For any queries regarding these Terms &amp; Conditions, please contact our customer support team using the contact information provided on our website.</p></section>
        </div>
      </article>
    </section>
  );
}
