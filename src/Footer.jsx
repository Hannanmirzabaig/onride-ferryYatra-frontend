import { BRAND } from "./data.js";
import { Logo } from "./Logo.jsx";

const retailerUrl = (path) => new URL(path, BRAND.site).toString();

const QUICK_LINKS = [
    { label: "Home", page: "home", href: "/" },
    { label: "Schedule", page: "schedule", href: "/schedule" },
    { label: "Book Tickets", page: "book", href: "/book" },
    { label: "Contact", page: "contact", href: "/contact" },
];

const POLICY_LINKS = [
    { label: "Terms & Conditions", href: "/terms-and-conditions", page: "terms" },
    { label: "Privacy Policy", href: "/privacy-policy", page: "privacy" },
    { label: "Refund & Cancellation Policy", href: "/cancellation-refund-policy", page: "refund" },
];

export default function Footer({ go }) {
    const year = new Date().getFullYear();
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href={retailerUrl("/")} className="footer-logo" aria-label="ManthanPay home"><Logo h={70} /></a>
                        <div className="footer-description">
                            <p>At FerryYatra, we believe financial services should be simple, accessible, and convenient, no matter where you live or run your business.</p>
                        </div>
                    </div>
                    <nav className="footer-column" aria-label="Quick links">
                        <h3>Quick Links</h3><span className="footer-heading-line" />
                        <div className="footer-column-links">{QUICK_LINKS.map((link) => <a href={link.href} key={link.page} onClick={(event) => { event.preventDefault(); go(link.page); }}>{link.label}</a>)}</div>
                    </nav>
                    <nav className="footer-column" aria-label="Policies">
                        <h3>Policies</h3><span className="footer-heading-line" />
                        <div className="footer-column-links">{POLICY_LINKS.map((link) => <a href={link.page ? link.href : retailerUrl(link.href)} key={link.label} onClick={link.page ? (event) => { event.preventDefault(); go(link.page); } : undefined}>{link.label}</a>)}</div>
                    </nav>
                    <div className="footer-follow">
                        <h3>Contact</h3><span className="footer-heading-line" />
                        <div className="footer-contact-details">
                            <a href={`tel:${BRAND.phone}`}><strong>Call us</strong><span>{BRAND.phone}</span></a>
                            <div><strong>Registered Office</strong><span>{BRAND.address}</span></div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom"><span>© {year} <strong>FerryYatra</strong>. All rights reserved.</span></div>
            </div>
        </footer>
    );
}
