import { useState, useEffect, useRef } from "react";
import { BRAND, FAQ } from "./data.js";
import { Logo } from "./Logo.jsx";

export function Header({ page, go }) {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 40);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const clear = page === "home" && !sc && !open;
  const links = [["home", "Home"], ["schedule", "Schedule"], ["book", "Book Tickets"], ["contact", "Contact"]];
  return (
    <header className={"header" + (clear ? " clear" : "")}>
      <div className="wrap header-in">
        <a className="logo" href="/" aria-label="FerryYatra home" onClick={(e) => { e.preventDefault(); go("home"); }}><Logo h={85} /></a>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
        <nav className={open ? "nav open" : "nav"}>
          {links.map(([k, l]) => (
            <a key={k} href={k === "home" ? "/" : `/${k}`} className={page === k ? "active" : ""}
              onClick={(e) => { e.preventDefault(); setOpen(false); go(k); }}>{l}</a>
          ))}
          <a className="btn btn-ghost" href={BRAND.holidays} target="_blank" rel="noreferrer">Holidays</a>
        </nav>
      </div>
    </header>
  );
}

export function Field({ label, error, children, hint }) {
  return (
    <label className={"field" + (error ? " has-error" : "")}>
      <span>{label}</span>
      {children}
      {error ? <em role="alert">{error}</em> : hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {FAQ.map(([q, a], i) => (
        <div key={q} className={open === i ? "faq-i open" : "faq-i"}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>{q}<span>{open === i ? "−" : "+"}</span></button>
          {open === i && <p>{a}</p>}
        </div>
      ))}
    </div>
  );
}

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => { const k = Math.min((t - t0) / 1400, 1); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

// Image with graceful gradient fallback if the remote image fails
export function Img({ src, alt, className = "", fallback = "🌊", priority = false }) {
  const [bad, setBad] = useState(false);
  return bad || !src
    ? <div className={`img-fb ${className}`} role="img" aria-label={alt}><span>{fallback}</span></div>
    : <img className={className} src={src} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" onError={() => setBad(true)} />;
}

export function Waves() {
  return (
    <svg className="waves" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <path className="w1" d="M0 70 C240 20 480 120 720 70 C960 20 1200 120 1440 70 L1440 140 L0 140Z" />
      <path className="w2" d="M0 90 C240 50 480 130 720 90 C960 50 1200 130 1440 90 L1440 140 L0 140Z" />
      <path className="w3" d="M0 110 C240 80 480 140 720 110 C960 80 1200 140 1440 110 L1440 140 L0 140Z" />
    </svg>
  );
}

export function FerrySvg() {
  return (
    <svg className="ferry" viewBox="0 0 220 110" aria-hidden="true">
      <path d="M10 70 H210 L188 100 H36Z" fill="#fff" />
      <path d="M10 70 H210 L204 78 H16Z" fill="#f5a623" />
      <rect x="48" y="40" width="112" height="30" rx="6" fill="#eaf6fa" />
      <rect x="78" y="18" width="62" height="24" rx="6" fill="#fff" />
      <rect x="104" y="4" width="14" height="16" rx="3" fill="#0e7c9b" />
      {[58, 78, 98, 118, 138].map((x) => <rect key={x} x={x} y="50" width="12" height="9" rx="2" fill="#0e7c9b" />)}
      {[88, 106, 124].map((x) => <rect key={x} x={x} y="24" width="10" height="8" rx="2" fill="#0b2a4a" />)}
    </svg>
  );
}
