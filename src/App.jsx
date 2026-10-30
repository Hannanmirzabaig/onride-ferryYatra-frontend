import { useState, useEffect } from "react";
import { Header } from "./components.jsx";
import Footer from "./Footer.jsx";
import Home from "./pages/Home.jsx";
import Schedule from "./pages/Schedule.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Refund from "./pages/Refund.jsx";

const PAGES = ["home", "schedule", "book", "contact", "terms", "privacy", "refund"];
const PAGE_PATHS = { home: "/", schedule: "/schedule", book: "/book", contact: "/contact", terms: "/terms-and-conditions", privacy: "/privacy-policy", refund: "/cancellation-refund-policy" };
const readPath = () => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return PAGES.find((page) => PAGE_PATHS[page] === path) || "home";
};

export default function App() {
  const [page, setPage] = useState(readPath);
  const [prefill, setPrefill] = useState(null); // {origin,destination,date,passengers,time}

  useEffect(() => {
    const f = () => setPage(readPath());
    window.addEventListener("popstate", f);
    return () => window.removeEventListener("popstate", f);
  }, []);

  const go = (p, data = null) => {
    setPrefill(data);
    window.history.pushState({}, "", PAGE_PATHS[p] || "/");
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Header page={page} go={go} />
      <main className={page === "home" ? "" : "pad"}>
        {page === "home" && <Home go={go} />}
        {page === "schedule" && <Schedule go={go} />}
        {page === "book" && <Booking key={JSON.stringify(prefill)} prefill={prefill} go={go} />}
        {page === "contact" && <Contact />}
        {page === "terms" && <Terms />}
        {page === "privacy" && <Privacy />}
        {page === "refund" && <Refund />}
      </main>
      <Footer go={go} />
    </>
  );
}
