# OnRide Ferry Portal (React + Vite)
```
npm install
npm run dev      # http://localhost:5173
npm run build
```
Pages: Home (search), Schedule, Book Tickets (4-step flow), Contact.
All rules live in `src/utils/validators.js`; routes, fares and branding in `src/data.js`.
Payment is a mock (1.4s delay). Wire `submit()` in `src/pages/Booking.jsx` to your real gateway/API.
