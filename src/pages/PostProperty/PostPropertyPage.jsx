import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { savePostedProperty } from "../../utils/storage";

const STEPS = ["Basic Info", "Details & Price", "Amenities", "Review & Submit"];
const ALL_AMENITIES = [
  "Swimming Pool","Gym","Clubhouse","Children's Play Area","24/7 Security",
  "Power Backup","Parking","Garden","Spa","Tennis Court","Lift",
  "Smart Home","Concierge","Gated Community","Terrace Garden",
];
const delay = ms => new Promise(r => setTimeout(r, ms));

const BLANK = {
  listingType: "Buy", type: "Apartment", name: "", city: "", locality: "",
  bhk: "", area: "", price: "", builder: "", possession: "",
  description: "", amenities: [], phone: "", email: "",
};

export default function PostPropertyPage() {
  const { user, addNotification } = useApp();
  const navigate = useNavigate();
  const [step,      setStep]      = useState(0);
  const [form,      setForm]      = useState(BLANK);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [saved,     setSaved]     = useState(null); // the saved property object

  const set         = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleAmen  = (a)    => setForm(f => ({
    ...f,
    amenities: f.amenities.includes(a)
      ? f.amenities.filter(x => x !== a)
      : [...f.amenities, a],
  }));

  const handleSubmit = async () => {
    setLoading(true);
    await delay(1000);
    const prop = savePostedProperty({ ...form, postedBy: user.id, postedByName: user.name });
    setSaved(prop);
    setSubmitted(true);
    setLoading(false);
    addNotification("🎉 Property listed! It will go live within 24 hours.", "success");
  };

  if (!user) return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24 }}>
      <div style={{ fontSize: 64 }}>🔐</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, textAlign: "center" }}>Login to Post a Property</div>
      <p style={{ color: "var(--text-muted)", fontSize: 15, textAlign: "center" }}>Create a free account to list your property in minutes.</p>
      <Link to="/login?from=/post" style={{ background: "var(--blue)", color: "#fff", padding: "12px 36px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
        Login / Sign Up
      </Link>
    </div>
  );

  if (submitted) return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 80 }}>🎉</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700 }}>Property Listed!</div>
      <div style={{ background: "var(--blue-light)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "16px 28px", maxWidth: 420 }}>
        <div style={{ fontSize: 13, color: "var(--blue-dark)", lineHeight: 1.7 }}>
          <strong>📋 Listing ID:</strong> #{saved?.id}<br />
          <strong>🏠 Property:</strong> {saved?.name || "—"}<br />
          <strong>📍 Location:</strong> {[saved?.locality, saved?.city].filter(Boolean).join(", ") || "—"}<br />
          <strong>💰 Price:</strong> {saved?.price || "—"}<br />
          <strong>⏳ Status:</strong> <span style={{ color: "var(--orange)", fontWeight: 700 }}>PENDING REVIEW</span>
        </div>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 380 }}>
        Your property has been saved to your browser. It will go live once reviewed (in a real app this would notify the admin). View all your listings from your Profile.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <NavBtn onClick={() => navigate("/profile")}>View My Listings</NavBtn>
        <PrimaryBtn onClick={() => { setSubmitted(false); setStep(0); setForm(BLANK); }}>Post Another</PrimaryBtn>
        <NavBtn onClick={() => navigate("/")}>Go Home</NavBtn>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ background: "var(--navy)", padding: "24px 0" }}>
        <div className="page-container">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#fff", fontWeight: 700 }}>Post Your Property</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, marginTop: 4 }}>
            Free listing — reach thousands of buyers · Saved locally, no server needed
          </p>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: 32 }}>
        {/* Progress bar */}
        <div style={{ display: "flex", gap: 0, marginBottom: 32, background: "#fff", borderRadius: 12, padding: 6, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
          {STEPS.map((s, i) => (
            <button key={i} type="button"
              onClick={() => i < step && setStep(i)}
              style={{
                flex: 1, textAlign: "center", padding: "10px 6px", borderRadius: 9, border: "none",
                background: step === i ? "var(--blue)" : step > i ? "var(--blue-light)" : "transparent",
                cursor: i < step ? "pointer" : "default",
                transition: "all 0.25s",
              }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: step === i ? "#fff" : step > i ? "var(--blue-dark)" : "var(--text-muted)" }}>
                {step > i ? "✓ " : `${i + 1}. `}{s}
              </div>
            </button>
          ))}
        </div>

        {/* Progress line */}
        <div style={{ height: 4, background: "var(--border)", borderRadius: 99, marginBottom: 28, marginTop: -20 }}>
          <div style={{ height: "100%", width: `${((step) / (STEPS.length - 1)) * 100}%`, background: "var(--blue)", borderRadius: 99, transition: "width 0.4s ease" }} />
        </div>

        {/* Form card */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--border)", boxShadow: "var(--shadow)", padding: "36px 40px", maxWidth: 680, margin: "0 auto" }}>
          {step === 0 && <Step1 form={form} set={set} />}
          {step === 1 && <Step2 form={form} set={set} />}
          {step === 2 && <Step3 form={form} toggleAmen={toggleAmen} />}
          {step === 3 && <Step4 form={form} set={set} user={user} />}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
            {step > 0
              ? <NavBtn onClick={() => setStep(s => s - 1)}>← Back</NavBtn>
              : <div />
            }
            {step < STEPS.length - 1
              ? <PrimaryBtn onClick={() => setStep(s => s + 1)}>Continue →</PrimaryBtn>
              : <PrimaryBtn onClick={handleSubmit} loading={loading}>
                  {loading ? <><Spinner /> Submitting…</> : "🚀 Submit Listing"}
                </PrimaryBtn>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 1 ── Basic Info ─────────────────────────────────────────────────── */
function Step1({ form, set }) {
  return (
    <div>
      <StepTitle n={1} title="Basic Property Info" />
      <Row>
        <Select label="Listing Type *" value={form.listingType} onChange={v => set("listingType", v)}
          options={["Buy","Rent"]} />
        <Select label="Property Type *" value={form.type} onChange={v => set("type", v)}
          options={["Apartment","Villa","Plot","Office","Shop","Penthouse"]} />
      </Row>
      <Input label="Project / Property Name *" placeholder="e.g. Prestige Skyline"  value={form.name}     onChange={v => set("name", v)} />
      <Row>
        <Select label="City *" value={form.city} onChange={v => set("city", v)}
          options={["","Delhi","Mumbai","Bangalore","Pune","Hyderabad","Chennai","Kolkata","Noida","Gurgaon"]}
          placeholder="Select city" />
        <Input label="Locality *" placeholder="e.g. Koramangala"  value={form.locality} onChange={v => set("locality", v)} />
      </Row>
    </div>
  );
}

/* ── Step 2 ── Details & Price ────────────────────────────────────────────── */
function Step2({ form, set }) {
  return (
    <div>
      <StepTitle n={2} title="Details & Pricing" />
      <Row>
        <Select label="BHK / Config" value={form.bhk} onChange={v => set("bhk", v)}
          options={["","1 BHK","2 BHK","3 BHK","4 BHK","5+ BHK","Studio","N/A (Plot)"]} />
        <Input label="Area (sq.ft) *" placeholder="e.g. 1200" type="number" value={form.area} onChange={v => set("area", v)} />
      </Row>
      <Input label="Price / Rent *" placeholder="e.g. ₹85 Lakhs  or  ₹25,000 / month" value={form.price} onChange={v => set("price", v)} />
      <Row>
        <Input label="Builder / Owner Name" placeholder="e.g. Prestige Group"     value={form.builder}    onChange={v => set("builder", v)} />
        <Input label="Possession Date"      placeholder="e.g. Dec 2025 / Ready"   value={form.possession} onChange={v => set("possession", v)} />
      </Row>
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Description</label>
        <textarea placeholder="Describe your property — location advantages, nearby landmarks, special features…"
          value={form.description} onChange={e => set("description", e.target.value)} rows={4}
          style={{ width: "100%", border: "1.5px solid var(--border)", borderRadius: 9, padding: "11px 14px", fontSize: 13, outline: "none", resize: "vertical", lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = "var(--blue)"}
          onBlur={e  => e.target.style.borderColor = "var(--border)"} />
      </div>
    </div>
  );
}

/* ── Step 3 ── Amenities ──────────────────────────────────────────────────── */
function Step3({ form, toggleAmen }) {
  return (
    <div>
      <StepTitle n={3} title="Amenities" />
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>Select all amenities available in your property.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px,1fr))", gap: 10 }}>
        {ALL_AMENITIES.map(a => {
          const on = form.amenities.includes(a);
          return (
            <button key={a} type="button" onClick={() => toggleAmen(a)}
              style={{ padding: "10px 12px", border: `1.5px solid ${on ? "var(--blue)" : "var(--border)"}`, background: on ? "var(--blue)" : "#fff", color: on ? "#fff" : "var(--text)", borderRadius: 9, fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}>
              {on ? "✓ " : ""}{a}
            </button>
          );
        })}
      </div>
      {form.amenities.length > 0 && (
        <div style={{ marginTop: 16, fontSize: 13, color: "var(--blue)", fontWeight: 600 }}>
          ✅ {form.amenities.length} amenit{form.amenities.length === 1 ? "y" : "ies"} selected
        </div>
      )}
    </div>
  );
}

/* ── Step 4 ── Review & Submit ────────────────────────────────────────────── */
function Step4({ form, set, user }) {
  return (
    <div>
      <StepTitle n={4} title="Review & Submit" />

      {/* Summary card */}
      <div style={{ background: "var(--blue-light)", border: "1px solid var(--blue-mid)", borderRadius: 12, padding: "18px 22px", marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue-dark)", marginBottom: 12 }}>📋 Listing Summary</div>
        {[
          ["Property Name",  form.name       || "—"],
          ["Listing Type",   form.listingType + " · " + form.type],
          ["Location",       [form.locality, form.city].filter(Boolean).join(", ") || "—"],
          ["Config / BHK",   form.bhk        || "—"],
          ["Area",           form.area ? form.area + " sq.ft" : "—"],
          ["Price",          form.price      || "—"],
          ["Builder/Owner",  form.builder    || "—"],
          ["Possession",     form.possession || "—"],
          ["Amenities",      form.amenities.length + " selected"],
        ].map(([label, val]) => (
          <div key={label} style={{ display: "flex", gap: 10, fontSize: 13, marginBottom: 5 }}>
            <span style={{ color: "var(--text-muted)", minWidth: 110, flexShrink: 0 }}>{label}:</span>
            <span style={{ fontWeight: 500 }}>{val}</span>
          </div>
        ))}
      </div>

      {/* Contact details */}
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", marginBottom: 12 }}>Your Contact Details</div>
      <Row>
        <Input label="Your Phone *" type="tel"   placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={v => set("phone", v)} />
        <Input label="Your Email *" type="email" placeholder="you@email.com"   value={form.email} onChange={v => set("email", v)} />
      </Row>

      {/* Logged-in user info */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "#166534", lineHeight: 1.7 }}>
        ✅ Posting as <strong>{user.name}</strong> ({user.email})<br />
        📦 Property will be saved to your browser's localStorage under your account.<br />
        🔍 You can view all your listings from your <strong>Profile</strong> page.
      </div>
    </div>
  );
}

/* ── Reusable form elements ────────────────────────────────────────────────── */
function StepTitle({ n, title }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Step {n} of {STEPS.length}</div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 4 }}>{title}</h2>
    </div>
  );
}

function Row({ children }) {
  return <div className="two-col">{children}</div>;
}

function Input({ label, placeholder, value, onChange, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", border: `1.5px solid ${focused ? "var(--blue)" : "var(--border)"}`, borderRadius: 9, padding: "11px 14px", fontSize: 13, outline: "none", transition: "border 0.2s" }} />
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: "100%", border: `1.5px solid ${focused ? "var(--blue)" : "var(--border)"}`, borderRadius: 9, padding: "11px 14px", fontSize: 13, outline: "none", cursor: "pointer", background: "#fff", transition: "border 0.2s" }}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.filter(o => o !== "").map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function PrimaryBtn({ children, onClick, loading }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick} disabled={loading}
      style={{ background: hov && !loading ? "var(--blue-dark)" : "var(--blue)", color: "#fff", border: "none", padding: "12px 30px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8, opacity: loading ? 0.85 : 1 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

function NavBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="button" onClick={onClick}
      style={{ background: hov ? "var(--bg)" : "transparent", color: "var(--text-muted)", border: "1.5px solid var(--border)", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

function Spinner() {
  return <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />;
}
