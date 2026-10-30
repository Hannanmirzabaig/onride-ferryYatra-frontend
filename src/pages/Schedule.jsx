import { useState } from "react";
import { ROUTES } from "../data.js";
import { Field } from "../components.jsx";
import { todayISO, addDaysISO, MAX_ADVANCE_DAYS, isDeparted, seatsLeft, inr, fmtDuration } from "../utils/validators.js";

export default function Schedule({ go }) {
  const [date, setDate] = useState(todayISO());
  const [q, setQ] = useState("");
  const rows = ROUTES.filter((r) => `${r.origin} ${r.destination}`.toLowerCase().includes(q.trim().toLowerCase()));
  const dateOk = date >= todayISO() && date <= addDaysISO(MAX_ADVANCE_DAYS);

  return (
    <section className="wrap section">
      <h2>Ferry Schedule</h2>
      <div className="filters">
        <Field label="Date" error={!dateOk ? "Pick a date within the next 60 days" : ""}>
          <input type="date" value={date} min={todayISO()} max={addDaysISO(MAX_ADVANCE_DAYS)} onChange={(e) => setDate(e.target.value)} />
        </Field>
        <Field label="Search route"><input placeholder="e.g. Mumbai" value={q} onChange={(e) => setQ(e.target.value)} /></Field>
      </div>
      {!dateOk ? null : rows.length === 0 ? <p className="empty">No routes match. Try another name.</p> :
        rows.map((r) => (
          <div className="card sched" key={r.origin + r.destination}>
            <div className="sched-h"><h3>{r.origin} to {r.destination}</h3><span>{inr(r.fare)} · {fmtDuration(r.duration)}</span></div>
            <div className="chips">
              {r.times.map((t) => {
                const closed = isDeparted(date, t);
                const left = seatsLeft(r, date, t);
                return (
                  <button key={t} disabled={closed} className={"chip" + (left < 10 ? " low" : "")}
                    onClick={() => go("book", { origin: r.origin, destination: r.destination, date, passengers: 1, time: t })}>
                    <b>{t}</b><small>{closed ? "Closed" : `${left} seats`}</small>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
    </section>
  );
}
