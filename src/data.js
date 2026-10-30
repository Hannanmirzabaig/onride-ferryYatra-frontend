// Brand + route data taken from onride.in
export const BRAND = {
  name: "ManthanPay",
  logo: "https://onride.in/static/uploads/ChatGPT-Image-Jun-29--2026--10_27_40-AM.png",
  poweredBy: "RKSLR PAYMENTS PVT. LTD.",
  email: "Support@onride.in",
  phone: "+91-8920980000",
  address: "Unit 03-04 ,Floor 17, Gold Tower Wave One, Sector 18, Noida, Uttar Pradesh 201301",
  site: "https://www.manthanpay.com",
  holidays: "https://holidays.onride.in",
};

export const ORIGINS = ["Mumbai", "Goa", "Kochi", "Gateway of India"];
export const DESTINATIONS = ["Mandwa", "Alibaug", "Divar Island", "Fort Kochi", "Elephanta Caves"];

// fare = adult fare in Rs, duration in minutes
export const ROUTES = [
  { origin: "Mumbai", destination: "Mandwa", fare: 450, duration: 90, times: ["06:30", "09:00", "12:30", "16:00", "18:30"] },
  { origin: "Mumbai", destination: "Alibaug", fare: 400, duration: 75, times: ["07:00", "10:30", "14:00", "17:30"] },
  { origin: "Goa", destination: "Divar Island", fare: 300, duration: 45, times: ["08:00", "11:00", "15:00", "18:00"] },
  { origin: "Kochi", destination: "Fort Kochi", fare: 200, duration: 30, times: ["06:00", "08:30", "11:30", "14:30", "17:00", "19:00"] },
  { origin: "Gateway of India", destination: "Elephanta Caves", fare: 250, duration: 60, times: ["09:00", "10:30", "12:00", "13:30", "15:00"] },
];

export const CLASSES = [
  { id: "economy", label: "Economy", mult: 1 },
  { id: "premium", label: "Premium Lounge", mult: 1.5 },
];

export const VEHICLES = [
  { id: "none", label: "No vehicle", fee: 0 },
  { id: "bike", label: "Bike / Scooter", fee: 250 },
  { id: "car", label: "Car", fee: 900 },
  { id: "heavy", label: "Heavy vehicle", fee: 2200 },
];

export const ID_TYPES = [
  { id: "aadhaar", label: "Aadhaar" },
  { id: "pan", label: "PAN" },
  { id: "passport", label: "Passport" },
  { id: "dl", label: "Driving Licence" },
  { id: "voter", label: "Voter ID" },
];

export const FAQ = [
  ["How do I book a ticket?", "Select your route, date, passenger count and preferred schedule, then pay online."],
  ["Can I cancel my booking?", "Yes, up to 24 hours before departure for a full refund. Later cancellations may include a fee."],
  ["Do I need to print my ticket?", "No, show your e-ticket on your mobile at the boarding gate."],
  ["Are pets allowed on board?", "Small pets are allowed in carriers. Please inform support before travel."],
];
