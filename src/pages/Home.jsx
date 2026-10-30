import { useState } from "react";
import heroBanner from "../assets/mumbai-harbor-sunset-ferry-panorama.jpg";
import mumbaiMandwaImage from "../assets/mumbai-mandwa.jpg";
import mumbaiAlibaugImage from "../assets/mumbai-alibaug.jpg";
import goaDivarImage from "../assets/goa-divar.jpg";
import kochiFortKochiImage from "../assets/kochi-fort-kochi.jpg";
import gatewayElephantaImage from "../assets/gateway-elephanta.jpg";
import { ORIGINS, ROUTES, BRAND } from "../data.js";
import { Field, Faq, Reveal, Img, Waves, FerrySvg } from "../components.jsx";
import { validateSearch, destinationsFor, todayISO, addDaysISO, MAX_ADVANCE_DAYS, MAX_PASSENGERS, inr, fmtDuration } from "../utils/validators.js";

const IMG = "https://onride.in/static/images/";
const ROUTE_IMG = [mumbaiMandwaImage, mumbaiAlibaugImage, goaDivarImage, kochiFortKochiImage, gatewayElephantaImage];
const ROUTE_EMOJI = ["⛴️", "🏝️", "🛶", "🏰", "🗿"];
const FEATURES = [
  ["↗", "Plan your crossing", "Compare available routes, departure times and journey durations."],
  ["◇", "Choose your seat class", "Select Economy or Premium Lounge when you book."],
  ["⌁", "Bring a vehicle", "Add a bike, car or heavy vehicle to eligible bookings."],
  ["▤", "Passenger details in one place", "Add traveller information before you reach the payment step."],
  ["₹", "See the fare breakdown", "Review the fare, vehicle charges, convenience fee and GST."],
  ["✓", "Keep your ticket handy", "Booking confirmation includes a reference you can print."],
];
const OFFERS = ["Mumbai · Mandwa", "Mumbai · Alibaug", "Goa · Divar Island", "Kochi · Fort Kochi", "Gateway of India · Elephanta Caves"];

export default function Home({ go }) {
  const [f, setF] = useState({ origin: "", destination: "", date: todayISO(), passengers: 1 });
  const [err, setErr] = useState({});
  const set = (k, v) => {
    const n = { ...f, [k]: v };
    if (k === "origin") n.destination = "";
    setF(n);
    if (err[k]) setErr({ ...err, [k]: undefined });
  };
  const submit = (e) => {
    e.preventDefault();
    const er = validateSearch(f);
    setErr(er);
    if (!Object.keys(er).length) go("book", f);
  };
  const dests = f.origin ? destinationsFor(f.origin) : [];

  return (
    <>
      <section className="hero">
        <Img className="hero-bg" src={heroBanner} alt="Mumbai harbor ferry sailing across the water at sunset" fallback="" priority />
        <div className="hero-shade" />
        <svg className="hero-decor" viewBox="0 0 1920 780" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="hero-paper-grain" width="34" height="34" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="5" r="1" fill="#8bb7c9" opacity=".18" />
              <circle cx="23" cy="24" r=".8" fill="#d49b4b" opacity=".16" />
            </pattern>
          </defs>
          <path className="hero-texture" d="M0 0h850v780H0z" fill="url(#hero-paper-grain)" />
          <path className="hero-ribbon hero-ribbon-saffron" d="M-80 344C105 463 176 575 369 628s334 35 535 152" />
          <path className="hero-ribbon hero-ribbon-green" d="M526 702c138-58 246-49 371-4s186 83 292 129" />
        </svg>
        <div className="wrap hero-in">
          <span className="pill">⛴ Now sailing across India</span>
          <h1>Book Ferry Tickets<br />Across India</h1>
          <p>Fast, safe and seamless ferry travel experience. Pick a route, choose a time and board with your phone.</p>
          <div className="hero-cta">
            <button className="btn btn-accent" onClick={() => go("book")}>Book Now</button>
            <button className="btn btn-glass" onClick={() => go("schedule")}>View Schedule</button>
          </div>
        </div>
        <FerrySvg />
        <Waves />
      </section>

      <div className="wrap search-wrap">
        <form className="search" onSubmit={submit} noValidate>
          <Field label="From" error={err.origin}>
            <select value={f.origin} onChange={(e) => set("origin", e.target.value)}>
              <option value="">Select origin</option>
              {ORIGINS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="To" error={err.destination}>
            <select value={f.destination} onChange={(e) => set("destination", e.target.value)} disabled={!f.origin}>
              <option value="">{f.origin ? "Select destination" : "Pick origin first"}</option>
              {dests.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Date" error={err.date}>
            <input type="date" value={f.date} min={todayISO()} max={addDaysISO(MAX_ADVANCE_DAYS)} onChange={(e) => set("date", e.target.value)} />
          </Field>
          <Field label="Passengers" error={err.passengers}>
            <select value={f.passengers} onChange={(e) => set("passengers", +e.target.value)}>
              {Array.from({ length: MAX_PASSENGERS }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <button className="btn btn-primary" type="submit">Search ferries</button>
        </form>
      </div>

      <div className="marquee" aria-label="Offers">
        <div className="marquee-track">
          {[...OFFERS, ...OFFERS].map((o, i) => <span key={i}>✦ {o}</span>)}
        </div>
      </div>

      <section className="wrap section">
        <Reveal><h2 className="title">Popular Routes</h2><p className="sub">Most-booked crossings, ready when you are.</p></Reveal>
        <div className="routes">
          {ROUTES.map((r, i) => (
            <Reveal key={r.origin + r.destination} delay={i * 80} className={i === 0 ? "rc-wide" : ""}>
              <article className="rc" onClick={() => go("book", { origin: r.origin, destination: r.destination, date: todayISO(), passengers: 1 })}>
                <Img src={ROUTE_IMG[i]} alt={`${r.origin} to ${r.destination}`} fallback={ROUTE_EMOJI[i]} />
                <div className="rc-shade" />
                <div className="rc-body">
                  <span className="tag">{fmtDuration(r.duration)}</span>
                  <h3>{r.origin} to {r.destination}</h3>
                  <p>From <b>{inr(r.fare)}</b> · {r.times.length} sailings daily</p>
                  <span className="rc-go">Book now</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="wrap">
        <Reveal><h2 className="title">A simpler way to sail</h2><p className="sub">Everything you need to plan and book your ferry journey.</p></Reveal>
          <div className="features">
            {FEATURES.map(([ic, t, d], i) => (
              <Reveal key={t} delay={i * 70}><div className="feat"><span className="ic">{ic}</span><h3>{t}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="route-note" aria-label="Route network">
        <div className="wrap route-note-inner"><span className="route-note-label">SAIL TO SOMEWHERE NEW</span><strong>5 routes</strong><span>Connecting Mumbai, Goa, Kochi and Elephanta</span><button onClick={() => go("schedule")}>Explore schedules <span aria-hidden="true">↗</span></button></div>
      </section>

      <section className="wrap section">
        <Reveal><h2 className="title">How It Works</h2><p className="sub">Book your ferry in four quick steps.</p></Reveal>
        <div className="how">
          {[["🔎", "Search Route", "Select origin, destination, date and passengers"], ["🕘", "Select Schedule", "Choose your preferred ferry timing"], ["💳", "Make Payment", "Secure and fast online payment"], ["🌅", "Enjoy Journey", "Board the ferry and enjoy your trip"]].map(([ic, t, d], i) => (
            <Reveal key={t} delay={i * 120}><div className="how-i"><span className="how-ic">{ic}</span><h3>{t}</h3><p>{d}</p></div></Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <Reveal>
          <div className="promo">
            <div>
              <h2>Ready to Sail?</h2>
              <p>Book your ferry tickets in seconds and enjoy a smooth journey. Planning a longer trip? Explore OnRide Holidays packages.</p>
              <div className="hero-cta">
                <button className="btn btn-accent" onClick={() => go("book")}>Book Tickets</button>
                <a className="btn btn-glass" href={BRAND.holidays} target="_blank" rel="noreferrer">Explore Holidays</a>
              </div>
            </div>
            <span className="promo-art" aria-hidden="true">⛴️</span>
          </div>
        </Reveal>
      </section>

      <section className="wrap section narrow">
        <Reveal><h2 className="title">Frequently Asked Questions</h2></Reveal>
        <Faq />
      </section>
    </>
  );
}
