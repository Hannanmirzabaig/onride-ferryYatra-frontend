import { useState, useMemo } from "react";
import { ORIGINS, CLASSES, VEHICLES, ID_TYPES } from "../data.js";
import { Field } from "../components.jsx";
import {
  validateSearch, validatePassengers, validateContact, validatePayment, destinationsFor, findRoute, calcFare,
  todayISO, addDaysISO, MAX_ADVANCE_DAYS, MAX_PASSENGERS, isDeparted, seatsLeft, inr, fmtDuration, genRef,
} from "../utils/validators.js";

const blankPax = () => ({ name: "", age: "", gender: "", idType: "aadhaar", idNumber: "" });
const STEPS = ["Trip", "Passengers", "Contact", "Payment"];

export default function Booking({ prefill, go }) {
  const [step, setStep] = useState(0);
  const [trip, setTrip] = useState({
    origin: prefill?.origin || "", destination: prefill?.destination || "",
    date: prefill?.date || todayISO(), time: prefill?.time || "", cls: "economy",
    count: prefill?.passengers || 1,
  });
  const [pax, setPax] = useState(Array.from({ length: trip.count }, blankPax));
  const [contact, setContact] = useState({ mobile: "", email: "" });
  const [vehicle, setVehicle] = useState({ type: "none", reg: "" });
  const [pay, setPay] = useState({ method: "upi", upi: "", card: "", holder: "", expiry: "", cvv: "" });
  const [agree, setAgree] = useState(false);
  const [errs, setErrs] = useState({});
  const [paxErr, setPaxErr] = useState({ errors: [], general: [] });
  const [busy, setBusy] = useState(false);
  const [ticket, setTicket] = useState(null);

  const route = findRoute(trip.origin, trip.destination);
  const fare = useMemo(() => (route && pax.every((p) => p.age !== "" && !isNaN(p.age)) ? calcFare({ route, cls: trip.cls, passengers: pax, vehicle }) : null),
    [route, trip.cls, pax, vehicle]);

  const setT = (k, v) => {
    const n = { ...trip, [k]: v };
    if (k === "origin") { n.destination = ""; n.time = ""; }
    if (k === "destination" || k === "date") n.time = "";
    setTrip(n);
    if (k === "count") setPax((p) => Array.from({ length: v }, (_, i) => p[i] || blankPax()));
    setErrs({ ...errs, [k]: undefined, time: undefined });
  };
  const setP = (i, k, v) => setPax(pax.map((p, j) => (j === i ? { ...p, [k]: v } : p)));

  const next = () => {
    if (step === 0) {
      const e = validateSearch({ ...trip, passengers: trip.count });
      if (!e.date && !e.origin && !e.destination) {
        if (!trip.time) e.time = "Select a departure time";
        else if (isDeparted(trip.date, trip.time)) e.time = "Booking closed for this departure (60 min cut-off)";
        else if (seatsLeft(route, trip.date, trip.time) < trip.count) e.time = "Not enough seats left on this departure";
      }
      setErrs(e);
      if (Object.keys(e).length) return;
    }
    if (step === 1) {
      const r = validatePassengers(pax);
      setPaxErr(r);
      if (!r.ok) return;
    }
    if (step === 2) {
      const e = validateContact(contact, vehicle);
      setErrs(e);
      if (Object.keys(e).length) return;
    }
    setStep(step + 1);
    window.scrollTo({ top: 0 });
  };

  const submit = (e) => {
    e.preventDefault();
    const er = validatePayment(pay);
    if (!agree) er.agree = "Accept the terms to continue";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    setTimeout(() => { // mock payment gateway
      setTicket({ ref: genRef(), trip, route, pax, contact, vehicle, fare, paidVia: pay.method === "upi" ? `UPI (${pay.upi})` : `Card ending ${pay.card.replace(/\s/g, "").slice(-4)}` });
      setBusy(false);
    }, 1400);
  };

  if (ticket) return <Ticket t={ticket} go={go} />;

  const times = route ? route.times : [];
  return (
    <section className="wrap section">
      <h2>Book Tickets</h2>
      <ol className="steps">{STEPS.map((s, i) => <li key={s} className={i === step ? "on" : i < step ? "done" : ""}>{s}</li>)}</ol>
      <div className="book-grid">
        <div className="card form">
          {step === 0 && (<>
            <div className="row2">
              <Field label="Origin" error={errs.origin}>
                <select value={trip.origin} onChange={(e) => setT("origin", e.target.value)}>
                  <option value="">Select origin</option>{ORIGINS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Destination" error={errs.destination}>
                <select value={trip.destination} disabled={!trip.origin} onChange={(e) => setT("destination", e.target.value)}>
                  <option value="">Select destination</option>{destinationsFor(trip.origin).map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Date" error={errs.date}>
                <input type="date" value={trip.date} min={todayISO()} max={addDaysISO(MAX_ADVANCE_DAYS)} onChange={(e) => setT("date", e.target.value)} />
              </Field>
              <Field label="Passengers" error={errs.passengers}>
                <select value={trip.count} onChange={(e) => setT("count", +e.target.value)}>
                  {Array.from({ length: MAX_PASSENGERS }, (_, i) => i + 1).map((n) => <option key={n}>{n}</option>)}
                </select>
              </Field>
              <Field label="Class">
                <select value={trip.cls} onChange={(e) => setT("cls", e.target.value)}>
                  {CLASSES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </Field>
            </div>
            <div className={"field" + (errs.time ? " has-error" : "")}>
              <span>Departure</span>
              {route ? <div className="chips">
                {times.map((t) => {
                  const closed = isDeparted(trip.date, t);
                  return <button type="button" key={t} disabled={closed} className={"chip" + (trip.time === t ? " sel" : "")} onClick={() => setT("time", t)}>
                    <b>{t}</b><small>{closed ? "Closed" : `${seatsLeft(route, trip.date, t)} seats`}</small></button>;
                })}
              </div> : <small>Choose a route to see timings</small>}
              {errs.time && <em role="alert">{errs.time}</em>}
            </div>
          </>)}

          {step === 1 && (<>
            {paxErr.general.map((g) => <p className="alert" key={g}>{g}</p>)}
            {pax.map((p, i) => {
              const e = paxErr.errors[i] || {};
              return (
                <fieldset key={i}>
                  <legend>Passenger {i + 1}</legend>
                  <div className="row2">
                    <Field label="Full name" error={e.name}><input value={p.name} onChange={(ev) => setP(i, "name", ev.target.value)} /></Field>
                    <Field label="Age" error={e.age} hint="Under 5 travel free, 5 to 11 pay half"><input inputMode="numeric" value={p.age} onChange={(ev) => setP(i, "age", ev.target.value.replace(/\D/g, "").slice(0, 3))} /></Field>
                    <Field label="Gender" error={e.gender}>
                      <select value={p.gender} onChange={(ev) => setP(i, "gender", ev.target.value)}>
                        <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                      </select>
                    </Field>
                    {Number(p.age) >= 12 && <>
                      <Field label="ID type" error={e.idType}>
                        <select value={p.idType} onChange={(ev) => setP(i, "idType", ev.target.value)}>
                          {ID_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                        </select>
                      </Field>
                      <Field label="ID number" error={e.idNumber}><input value={p.idNumber} onChange={(ev) => setP(i, "idNumber", ev.target.value.toUpperCase())} /></Field>
                    </>}
                  </div>
                </fieldset>
              );
            })}
          </>)}

          {step === 2 && (<>
            <div className="row2">
              <Field label="Mobile number" error={errs.mobile} hint="E-ticket details are sent here">
                <input inputMode="numeric" value={contact.mobile} onChange={(e) => setContact({ ...contact, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
              </Field>
              <Field label="Email" error={errs.email}><input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></Field>
              <Field label="Vehicle transport">
                <select value={vehicle.type} onChange={(e) => setVehicle({ type: e.target.value, reg: "" })}>
                  {VEHICLES.map((v) => <option key={v.id} value={v.id}>{v.label}{v.fee ? ` (+${inr(v.fee)})` : ""}</option>)}
                </select>
              </Field>
              {vehicle.type !== "none" && (
                <Field label="Registration number" error={errs.reg}>
                  <input value={vehicle.reg} placeholder="MH12AB1234" onChange={(e) => setVehicle({ ...vehicle, reg: e.target.value.toUpperCase() })} />
                </Field>
              )}
            </div>
          </>)}

          {step === 3 && (
            <form onSubmit={submit} noValidate>
              <div className="tabs">
                {["upi", "card"].map((m) => <button type="button" key={m} className={pay.method === m ? "on" : ""} onClick={() => { setPay({ ...pay, method: m }); setErrs({}); }}>{m === "upi" ? "UPI" : "Debit / Credit card"}</button>)}
              </div>
              {pay.method === "upi" ? (
                <Field label="UPI ID" error={errs.upi}><input placeholder="name@okbank" value={pay.upi} onChange={(e) => setPay({ ...pay, upi: e.target.value })} /></Field>
              ) : (
                <div className="row2">
                  <Field label="Card number" error={errs.card}>
                    <input inputMode="numeric" value={pay.card} onChange={(e) => setPay({ ...pay, card: e.target.value.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ") })} />
                  </Field>
                  <Field label="Name on card" error={errs.holder}><input value={pay.holder} onChange={(e) => setPay({ ...pay, holder: e.target.value })} /></Field>
                  <Field label="Expiry (MM/YY)" error={errs.expiry}>
                    <input value={pay.expiry} placeholder="MM/YY" onChange={(e) => { let v = e.target.value.replace(/\D/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2); setPay({ ...pay, expiry: v }); }} />
                  </Field>
                  <Field label="CVV" error={errs.cvv}><input type="password" inputMode="numeric" value={pay.cvv} onChange={(e) => setPay({ ...pay, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })} /></Field>
                </div>
              )}
              <label className={"check" + (errs.agree ? " has-error" : "")}>
                <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErrs({ ...errs, agree: undefined }); }} />
                I accept the Terms &amp; Conditions and the Refund &amp; Cancellation Policy
              </label>
              {errs.agree && <em className="err" role="alert">{errs.agree}</em>}
              <div className="actions">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-primary" disabled={busy}>{busy ? "Processing..." : `Pay ${fare ? inr(fare.total) : ""}`}</button>
              </div>
            </form>
          )}

          {step < 3 && (
            <div className="actions">
              {step > 0 && <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>Back</button>}
              <button className="btn btn-primary" onClick={next}>Continue</button>
            </div>
          )}
        </div>

        <aside className="card summary">
          <h3>Trip summary</h3>
          {route ? <>
            <p><b>{route.origin} to {route.destination}</b></p>
            <p>{trip.date}{trip.time && ` at ${trip.time}`} · {fmtDuration(route.duration)}</p>
            <p>{trip.count} passenger(s) · {CLASSES.find((c) => c.id === trip.cls).label}</p>
            {fare ? <dl>
              <dt>Ferry fare</dt><dd>{inr(fare.base)}</dd>
              {fare.vehicleFee > 0 && <><dt>Vehicle</dt><dd>{inr(fare.vehicleFee)}</dd></>}
              <dt>Convenience fee</dt><dd>{inr(fare.convenience)}</dd>
              <dt>GST (5%)</dt><dd>{inr(fare.gst)}</dd>
              <dt className="tot">Total</dt><dd className="tot">{inr(fare.total)}</dd>
            </dl> : <p className="muted">Fare is calculated once ages are entered. Adult fare: {inr(route.fare)}</p>}
          </> : <p className="muted">Select a route to see the fare.</p>}
        </aside>
      </div>
    </section>
  );
}

function Ticket({ t, go }) {
  return (
    <section className="wrap section narrow">
      <div className="card ticket">
        <h2>Booking confirmed</h2>
        <p className="ref">Booking ID: <b>{t.ref}</b></p>
        <p><b>{t.route.origin} to {t.route.destination}</b></p>
        <p>{t.trip.date} at {t.trip.time} · {CLASSES.find((c) => c.id === t.trip.cls).label}</p>
        <ul>{t.pax.map((p, i) => <li key={i}>{p.name} · {p.age} yrs · {p.gender}</li>)}</ul>
        {t.vehicle.type !== "none" && <p>Vehicle: {t.vehicle.reg.toUpperCase()}</p>}
        <p>Paid {inr(t.fare.total)} via {t.paidVia}</p>
        <p className="muted">E-ticket sent to {t.contact.email} and +91 {t.contact.mobile}. Show it at the boarding gate.</p>
        <div className="actions">
          <button className="btn btn-ghost" onClick={() => window.print()}>Print</button>
          <button className="btn btn-primary" onClick={() => go("home")}>Back to home</button>
        </div>
      </div>
    </section>
  );
}
