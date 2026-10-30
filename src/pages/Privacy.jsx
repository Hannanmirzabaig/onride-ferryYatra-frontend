import { Logo } from "../Logo.jsx";

export default function Privacy() {
  return (
    <section className="wrap section legal-page">
      <div className="legal-crumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Privacy Policy</span></div>
      <article className="legal-card">
        <header className="legal-header">
          <div className="legal-brand-row"><span className="legal-logo"><Logo h={42} /></span><span className="legal-brand-label">Your journey, with privacy in mind</span></div>
          <div className="legal-banner-content">
            <div>
              <span className="legal-eyebrow">MANTHANPAY FERRY · YOUR PRIVACY</span>
              <h1>Privacy Policy</h1>
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
          <section><h2>1. Introduction</h2><p>Welcome to ManthanPay. We respect your privacy. This policy describes how we collect, use, store, and protect personal information when you visit our website or book ferry tickets through our platform.</p></section>

          <section><h2>2. Information We Collect</h2><p>To support bookings and improve your experience, we may collect information such as:</p><ul><li>Full name and mobile number</li><li>Email address</li><li>Passenger details</li><li>Booking information, including journey date and time</li><li>Payment transaction details</li><li>Device, browser, and IP address information</li></ul></section>

          <section><h2>3. How We Use Your Information</h2><p>We use the information we collect to:</p><ul><li>Process ferry ticket bookings and issue confirmations</li><li>Send booking updates and service notifications</li><li>Respond to support requests</li><li>Maintain and improve our website and services</li><li>Help detect fraud and prevent unauthorized transactions</li><li>Meet applicable legal and regulatory requirements</li></ul></section>

          <section><h2>4. Payment Information</h2><p>Online payments are handled by secure payment gateway providers. ManthanPay does not store your debit or credit card number, CVV, UPI PIN, or internet banking credentials on its servers.</p></section>

          <section><h2>5. Sharing of Information</h2><p>We share personal information only where it is needed to provide or support our services, including with:</p><ul><li>Ferry operators, to fulfil your booking</li><li>Payment gateway providers, to process transactions</li><li>Technology service providers that support our platform</li><li>Government or regulatory authorities when required by law</li></ul><p>We do not sell or rent your personal information to third parties for their marketing purposes.</p></section>

          <section><h2>6. Cookies</h2><p>Our website may use cookies and similar technologies to remember preferences, understand website traffic, improve performance, and make browsing more convenient. You can manage cookies through your browser settings.</p></section>

          <section><h2>7. Data Security</h2><p>We use appropriate technical and organizational measures to help protect personal information against unauthorized access, misuse, alteration, or loss. No method of transmitting or storing data online can be guaranteed to be completely secure.</p></section>

          <section><h2>8. Data Retention</h2><p>We keep booking records and related information only for as long as reasonably needed to provide our services, meet legal obligations, resolve disputes, and maintain required business records.</p></section>

          <section><h2>9. Your Rights</h2><p>Subject to applicable law, you may contact us to request that we:</p><ul><li>Provide access to your personal information</li><li>Correct information that is inaccurate</li><li>Delete personal information where deletion is permitted</li><li>Stop sending promotional communications</li></ul></section>

          <section><h2>10. Changes to this Policy</h2><p>We may revise this Privacy Policy from time to time. Any changes will be published on this page along with the updated effective date.</p></section>

          <section><h2>11. Contact Us</h2><p>If you have questions about this Privacy Policy or how your personal information is handled, please contact the ManthanPay customer support team using the contact details on our website.</p></section>
        </div>
      </article>
    </section>
  );
}
