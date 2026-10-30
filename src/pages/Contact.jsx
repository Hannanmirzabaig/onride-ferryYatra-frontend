import { useState } from "react";
import { BRAND } from "../data.js";
import { Field } from "../components.jsx";

export default function Contact() {
  const [f, setF] = useState({ name: "", email: "", mobile: "", msg: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(f.name.trim())) er.name = "Enter your name (letters only)";
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(f.email.trim())) er.email = "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(f.mobile)) er.mobile = "Enter a valid 10-digit mobile number";
    if (f.msg.trim().length < 10) er.msg = "Message must be at least 10 characters";
    setErr(er);
    if (!Object.keys(er).length) setSent(true);
  };
  const on = (k) => (e) => setF({ ...f, [k]: k === "mobile" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value });
  return (
    <section className="wrap section narrow">
      <h2>Contact Support</h2>
      <p>{BRAND.address}<br />{BRAND.email} · {BRAND.phone}</p>
      {sent ? <div className="card ok">Thanks {f.name.split(" ")[0]}, our team will reach you within 24 hours.</div> :
        <form className="card form" onSubmit={submit} noValidate>
          <Field label="Name" error={err.name}><input value={f.name} onChange={on("name")} /></Field>
          <Field label="Email" error={err.email}><input type="email" value={f.email} onChange={on("email")} /></Field>
          <Field label="Mobile" error={err.mobile}><input inputMode="numeric" value={f.mobile} onChange={on("mobile")} /></Field>
          <Field label="Message" error={err.msg}><textarea rows="4" value={f.msg} onChange={on("msg")} /></Field>
          <button className="btn btn-primary">Send message</button>
        </form>}
    </section>
  );
}
