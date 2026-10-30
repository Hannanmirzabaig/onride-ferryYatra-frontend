import { ROUTES, CLASSES, VEHICLES } from "../data.js";

export const todayISO = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
export const addDaysISO = (n) => { const d = new Date(todayISO()); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
export const MAX_ADVANCE_DAYS = 60;
export const MAX_PASSENGERS = 6;
export const CUTOFF_MINUTES = 60; // booking closes 60 min before departure

export const findRoute = (o, d) => ROUTES.find((r) => r.origin === o && r.destination === d);
export const destinationsFor = (o) => ROUTES.filter((r) => r.origin === o).map((r) => r.destination);

// ---- Search ----
export function validateSearch({ origin, destination, date, passengers }) {
  const e = {};
  if (!origin) e.origin = "Select an origin";
  if (!destination) e.destination = "Select a destination";
  if (origin && destination && !findRoute(origin, destination)) e.destination = "No ferry runs on this route";
  if (!date) e.date = "Select a travel date";
  else if (date < todayISO()) e.date = "Date cannot be in the past";
  else if (date > addDaysISO(MAX_ADVANCE_DAYS)) e.date = `Bookings open only ${MAX_ADVANCE_DAYS} days in advance`;
  const p = Number(passengers);
  if (!Number.isInteger(p) || p < 1 || p > MAX_PASSENGERS) e.passengers = `Choose 1 to ${MAX_PASSENGERS} passengers`;
  return e;
}

// ---- Schedule rules ----
export const isDeparted = (date, time) => {
  const dep = new Date(`${date}T${time}:00`);
  return dep.getTime() - Date.now() < CUTOFF_MINUTES * 60000;
};
// Deterministic fake seat availability
export function seatsLeft(route, date, time) {
  let h = 0;
  for (const c of `${route.origin}${route.destination}${date}${time}`) h = (h * 31 + c.charCodeAt(0)) % 997;
  return 4 + (h % 60);
}

// ---- Passenger ----
const ID_RULES = {
  aadhaar: [/^[2-9]\d{11}$/, "Aadhaar must be 12 digits (cannot start with 0 or 1)"],
  pan: [/^[A-Z]{5}\d{4}[A-Z]$/, "PAN format: ABCDE1234F"],
  passport: [/^[A-PR-WY][1-9]\d{6}$/, "Passport format: A1234567"],
  dl: [/^[A-Z]{2}\d{2}\s?\d{11}$/, "Driving licence format: MH12 20190001234"],
  voter: [/^[A-Z]{3}\d{7}$/, "Voter ID format: ABC1234567"],
};

export function validatePassenger(p, idx) {
  const e = {};
  const name = p.name.trim();
  if (!name) e.name = "Enter full name as on ID";
  else if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(name) || name.split(/\s+/).length < 2) e.name = "Enter first and last name (letters only)";
  const age = Number(p.age);
  if (p.age === "" ) e.age = "Enter age";
  else if (!Number.isInteger(age) || age < 0 || age > 100) e.age = "Age must be 0 to 100";
  if (!p.gender) e.gender = "Select gender";
  // ID needed for 12+
  if (age >= 12) {
    if (!p.idType) e.idType = "Select ID type";
    else {
      const [re, msg] = ID_RULES[p.idType];
      if (!re.test(p.idNumber.trim().toUpperCase())) e.idNumber = msg;
    }
  }
  return e;
}

export function validatePassengers(list) {
  const errors = list.map(validatePassenger);
  const general = [];
  const ages = list.map((p) => Number(p.age));
  if (ages.every((a) => !Number.isNaN(a))) {
    const adults = ages.filter((a) => a >= 18).length;
    const infants = ages.filter((a) => a < 5).length;
    if (adults === 0) general.push("At least one passenger must be 18 or older");
    else if (infants > adults) general.push("Each adult can carry only one child under 5");
  }
  const ids = list.filter((p) => p.idNumber).map((p) => `${p.idType}:${p.idNumber.trim().toUpperCase()}`);
  if (new Set(ids).size !== ids.length) general.push("Duplicate ID numbers found. Each passenger needs a unique ID");
  return { errors, general, ok: errors.every((e) => !Object.keys(e).length) && !general.length };
}

// ---- Contact + vehicle ----
export function validateContact(c, vehicle) {
  const e = {};
  if (!/^[6-9]\d{9}$/.test(c.mobile)) e.mobile = "Enter a valid 10-digit Indian mobile number";
  if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(c.email.trim())) e.email = "Enter a valid email address";
  if (vehicle.type !== "none") {
    if (!/^[A-Z]{2}\d{2}[A-Z]{1,3}\d{4}$/.test(vehicle.reg.replace(/[\s-]/g, "").toUpperCase())) e.reg = "Registration format: MH12AB1234";
  }
  return e;
}

// ---- Payment ----
export const luhn = (num) => {
  let sum = 0, alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = +num[i];
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return sum % 10 === 0;
};

export function validatePayment(p) {
  const e = {};
  if (p.method === "upi") {
    if (!/^[a-zA-Z0-9._-]{2,256}@[a-zA-Z]{2,64}$/.test(p.upi.trim())) e.upi = "Enter a valid UPI ID, e.g. name@okbank";
  } else {
    const num = p.card.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(num) || !luhn(num)) e.card = "Enter a valid card number";
    if (!/^[A-Za-z .]{3,40}$/.test(p.holder.trim())) e.holder = "Enter name on card";
    const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(p.expiry);
    if (!m) e.expiry = "Use MM/YY";
    else {
      const exp = new Date(2000 + +m[2], +m[1], 0, 23, 59);
      if (exp < new Date()) e.expiry = "Card has expired";
    }
    if (!/^\d{3}$/.test(p.cvv)) e.cvv = "CVV must be 3 digits";
  }
  return e;
}

// ---- Pricing ----
export function calcFare({ route, cls, passengers, vehicle }) {
  const c = CLASSES.find((x) => x.id === cls);
  const v = VEHICLES.find((x) => x.id === vehicle.type);
  let base = 0;
  passengers.forEach((p) => {
    const a = Number(p.age);
    const f = route.fare * c.mult;
    base += a < 5 ? 0 : a < 12 ? f * 0.5 : a >= 60 ? f * 0.9 : f; // child half, senior 10% off
  });
  const vehicleFee = v.fee;
  const sub = base + vehicleFee;
  const gst = Math.round(sub * 0.05);
  const convenience = Math.round(passengers.length * 15);
  return { base: Math.round(base), vehicleFee, gst, convenience, total: Math.round(sub) + gst + convenience };
}

export const inr = (n) => `Rs ${n.toLocaleString("en-IN")}`;
export const fmtDuration = (m) => (m >= 60 ? `${Math.floor(m / 60)}h ${m % 60 ? (m % 60) + "m" : ""}`.trim() : `${m}m`);
export const genRef = () => "ONR" + Date.now().toString(36).toUpperCase().slice(-6) + Math.floor(Math.random() * 90 + 10);
