import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import { SITE } from "../../data/content";

// ── FAQ data — edit directly here ──────────────────────────────────────────
const FAQS = [
  {
    q: "How do I list my property for free?",
    a: "Click 'Post Property' in the top navigation, register or log in, and fill out the 4-step listing wizard. Your property goes live within 24 hours after our team verifies it.",
  },
  {
    q: "Are all properties on Touch to Infinity Infra Solutions Private Limited verified?",
    a: "We verify every listing before it goes live. This includes document checks, RERA verification, and builder background checks. Look for the '✅ Verified' badge on any listing.",
  },
  {
    q: "How do I contact a builder or seller?",
    a: "Open any property listing and click 'Contact Builder'. Fill in your details and our system instantly notifies the builder. You can also schedule a site visit directly from the listing page.",
  },
  {
    q: "Is my personal data safe?",
    a: "Yes. We follow strict data privacy standards. Your contact details are only shared with the builder you choose to contact. We never sell your data to third parties.",
  },
  {
    q: "How does the EMI calculator work?",
    a: "The EMI calculator on each property detail page uses standard reducing-balance formula. You can adjust the loan amount, interest rate, and tenure with sliders to get an instant estimate.",
  },
  {
    q: "Can I save properties to view later?",
    a: "Yes — click the ❤️ icon on any property card to add it to your Wishlist. You need to be logged in. Your wishlist is saved in your browser and persists across sessions.",
  },
];

// ── Office locations — edit here ───────────────────────────────────────────
const OFFICES = [
  {
    city: "New Delhi",
    address: "New Delhi, India\n",
    phone: "+91 981 077 6604",
    email: "t2infinity25@gmail.com",
    icon: "🏢",
  },
];

export default function ContactPage() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PageHero />
      <div className="page-container" style={{ paddingTop: 52, paddingBottom: 64 }}>
        <div className="contact-layout">
          {/* Left — form + offices */}
          <div>
            <ContactForm />
            <OfficesSection />
          </div>
          {/* Right — quick links + FAQ */}
          <aside>
            <QuickContact />
            <FaqSection />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function PageHero() {
  return (
    <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)", padding: "56px 0 48px" }}>
      <div className="page-container" style={{ textAlign: "center" }}>
        <div className="fade-up" style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>
          Get In Touch
        </div>
        <h1 className="fade-up d1" style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
          We're Here to Help
        </h1>
        <p className="fade-up d2" style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginTop: 14, maxWidth: 420, margin: "14px auto 0" }}>
          Questions about a property, listing issues, or partnership enquiries — our team responds within 2 hours.
        </p>
        {/* Quick stat pills */}
        <div className="fade-up d3" style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          {[
            { icon: "⚡", label: "2-hr response" },
            { icon: "📞", label: "Mon–Sat 9AM–8PM" },
            { icon: "🌏", label: "400+ cities served" },
          ].map((p, i) => (
            <span key={i} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", fontSize: 13, padding: "7px 16px", borderRadius: 99, display: "inline-flex", alignItems: "center", gap: 6 }}>
              {p.icon} {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Contact Form ─────────────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "General Enquiry", message: "",
  });
  const [status, setStatus]   = useState("idle"); // idle | loading | success | error
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1000));
    setStatus("success");
  };

  if (status === "success") return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--border)", boxShadow: "var(--shadow)", padding: "48px 40px", textAlign: "center", marginBottom: 32 }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, marginBottom: 10 }}>Message Sent!</h2>
      <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, maxWidth: 340, margin: "0 auto 24px" }}>
        Thanks for reaching out. Our team will get back to you at <strong>{form.email}</strong> within 2 hours.
      </p>
      <button onClick={() => { setForm({ name: "", email: "", phone: "", subject: "General Enquiry", message: "" }); setStatus("idle"); }}
        style={{ background: "var(--blue)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Send Another Message
      </button>
    </div>
  );

  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--border)", boxShadow: "var(--shadow)", padding: "36px 40px", marginBottom: 32 }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Send Us a Message</h2>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28 }}>Fill in the form and we'll get back to you shortly.</p>

      <form onSubmit={handleSubmit}>
        <TwoCol>
          <Field label="Full Name *"    type="text"  placeholder="Rahul Sharma"        value={form.name}  onChange={set("name")} />
          <Field label="Email Address *" type="email" placeholder="your@email.com"      value={form.email} onChange={set("email")} />
        </TwoCol>
        <TwoCol>
          <Field label="Phone Number"   type="tel"   placeholder="+91 98765 43210"     value={form.phone} onChange={set("phone")} />
          <SelectField label="Subject" value={form.subject} onChange={set("subject")}
            options={["General Enquiry","Property Listing Issue","Partnership / Advertising","Press & Media","Careers","Technical Support"]} />
        </TwoCol>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Message *</label>
          <textarea placeholder="Tell us how we can help you…" value={form.message} onChange={e => set("message")(e.target.value)} rows={5}
            onFocus={e => e.target.style.borderColor = "var(--blue)"}
            onBlur={e  => e.target.style.borderColor = "var(--border)"}
            style={{ width: "100%", border: "1.5px solid var(--border)", borderRadius: 9, padding: "12px 14px", fontSize: 14, outline: "none", resize: "vertical", lineHeight: 1.6, fontFamily: "var(--font-body)" }} />
        </div>
        <SubmitButton loading={status === "loading"} />
      </form>
    </div>
  );
}

/* ── Offices ──────────────────────────────────────────────────────────────── */
function OfficesSection() {
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 18 }}>Our Offices</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {OFFICES.map((office, i) => (
          <OfficeCard key={i} office={office} />
        ))}
      </div>
    </div>
  );
}

function OfficeCard({ office }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: `1.5px solid ${hov ? "var(--blue)" : "var(--border)"}`, padding: "20px 22px", transition: "all 0.25s", boxShadow: hov ? "var(--shadow)" : "var(--shadow-sm)" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{office.icon}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{office.city}</div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, whiteSpace: "pre-line", marginBottom: 10 }}>{office.address}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <a href={`tel:${office.phone}`} style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>📞 {office.phone}</a>
        <a href={`mailto:${office.email}`} style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>✉️ {office.email}</a>
      </div>
    </div>
  );
}

/* ── Quick Contact sidebar ────────────────────────────────────────────────── */
function QuickContact() {
  return (
    <div style={{ background: "var(--navy)", borderRadius: 16, padding: "28px 26px", marginBottom: 24, color: "#fff" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Quick Contact</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { icon: "📞", label: "Call Us",       val: SITE.phone,   href: `tel:${SITE.phone}` },
          { icon: "✉️", label: "Email Us",      val: SITE.email,   href: `mailto:${SITE.email}` },
          { icon: "📍", label: "Headquarters",  val: SITE.address, href: SITE.mapEmbed },
        ].map(({ icon, label, val, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            style={{ display: "flex", gap: 14, alignItems: "flex-start", textDecoration: "none", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>{val}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Social links */}
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", marginBottom: 12 }}>Follow Us</div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { icon: "f",  href: SITE.social.facebook,  label: "Facebook" },
            { icon: "𝕏",  href: SITE.social.twitter,   label: "Twitter"  },
            { icon: "in", href: SITE.social.linkedin,   label: "LinkedIn" },
            { icon: "▶",  href: SITE.social.youtube,    label: "YouTube"  },
          ].map(({ icon, href, label }) => (
            <SocialBtn key={label} icon={icon} href={href} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
function FaqSection() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--border)", padding: "26px 24px" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 18 }}>Frequently Asked</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {FAQS.map((faq, i) => (
          <FaqItem key={i} faq={faq} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </div>
    </div>
  );
}

function FaqItem({ faq, isOpen, onToggle }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ borderRadius: 9, overflow: "hidden", border: `1px solid ${isOpen ? "var(--blue)" : "var(--border)"}`, marginBottom: 6, transition: "border 0.2s" }}>
      <button onClick={onToggle}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", background: isOpen ? "var(--blue-light)" : hov ? "var(--bg)" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: 10, transition: "background 0.2s" }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
        <span style={{ fontSize: 13, fontWeight: 600, color: isOpen ? "var(--blue-dark)" : "var(--text)", lineHeight: 1.4, flex: 1 }}>{faq.q}</span>
        <span style={{ fontSize: 18, color: "var(--blue)", flexShrink: 0, transition: "transform 0.25s", transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {isOpen && (
        <div style={{ padding: "12px 16px 16px", background: "var(--blue-light)", borderTop: "1px solid var(--blue-mid)" }}>
          <p style={{ fontSize: 13, color: "var(--blue-dark)", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

/* ── Shared primitives ────────────────────────────────────────────────────── */
const labelStyle = { fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 };

function TwoCol({ children }) {
  return <div className="two-col">{children}</div>;
}

function Field({ label, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", border: `1.5px solid ${focused ? "var(--blue)" : "var(--border)"}`, borderRadius: 9, padding: "11px 14px", fontSize: 14, outline: "none", transition: "border 0.2s", fontFamily: "var(--font-body)" }} />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", border: `1.5px solid ${focused ? "var(--blue)" : "var(--border)"}`, borderRadius: 9, padding: "11px 14px", fontSize: 14, outline: "none", cursor: "pointer", background: "#fff", fontFamily: "var(--font-body)", transition: "border 0.2s" }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function SubmitButton({ loading }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit" disabled={loading}
      style={{ width: "100%", background: hov && !loading ? "var(--blue-dark)" : "var(--blue)", color: "#fff", border: "none", padding: "14px 0", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", opacity: loading ? 0.85 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {loading ? <><Spinner />Sending…</> : "Send Message 📤"}
    </button>
  );
}

function Spinner() {
  return <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.35)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />;
}

function SocialBtn({ icon, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      style={{ width: 36, height: 36, borderRadius: "50%", background: hov ? "var(--blue)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", textDecoration: "none", transition: "all 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon}
    </a>
  );
}
