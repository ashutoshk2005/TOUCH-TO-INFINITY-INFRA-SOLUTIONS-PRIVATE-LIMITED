import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROPERTIES, AMENITY_ICONS } from "../../data/content";
import { useApp } from "../../context/AppContext";
import Footer from "../../components/Footer/Footer";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted, user, addNotification } = useApp();
  const prop = PROPERTIES.find(p => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);
  const [tab, setTab] = useState("overview");

  if (!prop) return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{ fontSize: 48 }}>🏚️</div>
      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 16 }}>Property Not Found</div>
      <button onClick={() => navigate("/search")} style={{ marginTop: 20, background: "var(--blue)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
        Browse Properties
      </button>
    </div>
  );

  const wished = isWishlisted(prop.id);
  const similar = PROPERTIES.filter(p => p.id !== prop.id && (p.city === prop.city || p.type === prop.type)).slice(0, 3);

  const handleWish = () => {
    if (!user) { navigate("/login"); return; }
    toggleWishlist(prop.id);
    addNotification(wished ? "Removed from wishlist" : "Added to wishlist ❤️", wished ? "info" : "success");
  };

  const handleContact = () => {
    if (!user) { navigate("/login"); return; }
    setContactOpen(true);
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "10px 0" }}>
        <div className="page-container">
          <div style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", gap: 6, alignItems: "center" }}>
            <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "var(--blue)" }}>Home</span> /
            <span onClick={() => navigate("/search")} style={{ cursor: "pointer", color: "var(--blue)" }}>Properties</span> /
            <span>{prop.name}</span>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: 28, paddingBottom: 52 }}>
        <div className="detail-layout">
          {/* Left Column */}
          <div>
            {/* Image Gallery */}
            <div style={{ borderRadius: 16, overflow: "hidden", background: "#111", marginBottom: 24 }}>
              <img src={prop.images[activeImg]} alt={prop.name}
                style={{ width: "100%", height: "clamp(220px,50vw,420px)", objectFit: "cover" }} />
              <div style={{ display: "flex", gap: 8, padding: 12, background: "rgba(0,0,0,0.7)", overflowX: "auto" }} className="hide-scroll">
                {prop.images.map((img, i) => (
                  <img key={i} src={img} alt="" onClick={() => setActiveImg(i)}
                    style={{ width: 80, height: 56, objectFit: "cover", borderRadius: 7, cursor: "pointer", border: `2px solid ${i === activeImg ? "var(--blue)" : "transparent"}`, opacity: i === activeImg ? 1 : 0.65, transition: "all 0.2s", flexShrink: 0 }} />
                ))}
              </div>
            </div>

            {/* Header */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, marginBottom: 20, border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <StatusBadge status={prop.status} />
                    {prop.new && <span style={{ background: "var(--gold)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6 }}>NEW</span>}
                    <span style={{ background: "var(--blue-light)", color: "var(--blue-dark)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6 }}>{prop.type}</span>
                    <span style={{ background: "var(--blue-light)", color: "var(--blue-dark)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6 }}>{prop.listingType}</span>
                  </div>
                  <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px,4vw,28px)", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>{prop.name}</h1>
                  <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 6 }}>📍 {prop.loc}</div>
                  {prop.rating && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                      <span style={{ color: "var(--gold)", fontSize: 16 }}>{"★".repeat(Math.floor(prop.rating))}</span>
                      <span style={{ fontWeight: 700 }}>{prop.rating}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: 13 }}>({prop.reviews} reviews)</span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--blue)" }}>{prop.price}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>EMI from ₹32,450/mo</div>
                </div>
              </div>

              {/* Quick info chips */}
              <div style={{ display: "flex", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
                {[
                  { icon: "📐", label: "Area", val: prop.area },
                  { icon: "🏠", label: "Config", val: prop.config },
                  { icon: "📅", label: "Possession", val: prop.possession },
                  { icon: "🏗️", label: "Builder", val: prop.builder },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ background: "var(--bg)", borderRadius: 10, padding: "10px 14px", minWidth: 110 }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{icon} {label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid var(--border)", overflow: "hidden", marginBottom: 20 }}>
              <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
                {["overview", "amenities", "rera"].map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ flex: 1, padding: "14px 0", border: "none", background: "none", color: tab === t ? "var(--blue)" : "var(--text-muted)", fontWeight: tab === t ? 700 : 400, fontSize: 13, cursor: "pointer", borderBottom: tab === t ? "2px solid var(--blue)" : "2px solid transparent", textTransform: "capitalize", transition: "all 0.2s" }}>
                    {t === "rera" ? "RERA Info" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <div style={{ padding: 22 }}>
                {tab === "overview" && (
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 12 }}>About the Property</h3>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75 }}>{prop.description}</p>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.75, marginTop: 12 }}>
                      This project features modern architecture with contemporary interiors. The layout has been carefully designed to maximize natural light and ventilation. Every apartment comes with premium fittings and fixtures.
                    </p>
                  </div>
                )}
                {tab === "amenities" && (
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 16 }}>Amenities ({prop.amenities.length})</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                      {prop.amenities.map(a => (
                        <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--blue-light)", borderRadius: 9, padding: "10px 14px" }}>
                          <span style={{ fontSize: 20 }}>{AMENITY_ICONS[a] || "✓"}</span>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--blue-dark)" }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tab === "rera" && (
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, marginBottom: 16 }}>RERA Information</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {[
                        { label: "RERA Number",   val: prop.rera },
                        { label: "Builder",        val: prop.builder },
                        { label: "Project Status", val: prop.status },
                        { label: "Possession",     val: prop.possession },
                      ].map(({ label, val }) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "var(--bg)", borderRadius: 9 }}>
                          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{label}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)" }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, padding: 14, background: "var(--blue-light)", borderRadius: 10, fontSize: 12, color: "var(--blue-dark)", lineHeight: 1.6 }}>
                      ✅ This project is RERA registered. Always verify the RERA certificate before booking.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside style={{ className: "detail-sidebar" }}>
            {/* Contact Card */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid var(--border)", boxShadow: "var(--shadow)", padding: 24, marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--blue)", marginBottom: 4 }}>{prop.price}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>All inclusive price</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <SidebarBtn primary onClick={handleContact}>📞 Contact Builder</SidebarBtn>
                <SidebarBtn onClick={() => { if(!user) navigate("/login"); else addNotification("Schedule a visit email sent! 📅", "success"); }}>📅 Schedule Visit</SidebarBtn>
                <SidebarBtn onClick={handleWish}>{wished ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}</SidebarBtn>
              </div>

              <div style={{ marginTop: 18, padding: "14px 16px", background: "var(--bg)", borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Builder</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, background: "var(--blue-light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏗️</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{prop.builder}</div>
                    <div style={{ fontSize: 11, color: "var(--blue)" }}>Verified Builder</div>
                  </div>
                </div>
              </div>
            </div>

            {/* EMI Calculator */}
            <EmiCalculator price={prop.priceMin} />
          </aside>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, marginBottom: 8 }}>Similar Properties</h2>
            <div style={{ width: 48, height: 3, background: "var(--blue)", borderRadius: 2, marginBottom: 24 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {similar.map((p, i) => <PropertyCard key={p.id} prop={p} delay={i + 1} />)}
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {contactOpen && <ContactModal prop={prop} onClose={() => setContactOpen(false)} onSubmit={() => { setContactOpen(false); addNotification("🎉 Request sent! Builder will contact you within 24 hours.", "success"); }} />}

      <Footer />
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span style={{ background: status === "COMPLETED" ? "#ecfdf5" : "#fff5f0", color: status === "COMPLETED" ? "var(--green)" : "var(--orange)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.3px" }}>
      {status}
    </span>
  );
}

function SidebarBtn({ children, primary, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      style={{ padding: "12px 0", borderRadius: 9, border: primary ? "none" : "1.5px solid var(--border)", background: primary ? (hov ? "var(--blue-dark)" : "var(--blue)") : (hov ? "var(--bg)" : "#fff"), color: primary ? "#fff" : "var(--text)", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", width: "100%" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}

function EmiCalculator({ price }) {
  const [loan, setLoan] = useState(Math.round(price * 0.8));
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;
  const emi = loan * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const formatNum = n => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : n >= 100000 ? `₹${(n / 100000).toFixed(1)} L` : `₹${Math.round(n).toLocaleString()}`;

  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid var(--border)", boxShadow: "var(--shadow)", padding: 22 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, marginBottom: 18 }}>📊 EMI Calculator</div>
      {[
        { label: "Loan Amount", val: loan, set: setLoan, min: 1000000, max: price, step: 100000, fmt: formatNum },
        { label: "Interest Rate (%)", val: rate, set: setRate, min: 6, max: 18, step: 0.1, fmt: v => `${v}%` },
        { label: "Tenure (Years)", val: tenure, set: setTenure, min: 1, max: 30, step: 1, fmt: v => `${v} yrs` },
      ].map(({ label, val, set, min, max, step, fmt }) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: "var(--text-muted)" }}>{label}</span>
            <span style={{ fontWeight: 700, color: "var(--blue)" }}>{fmt(val)}</span>
          </div>
          <input type="range" min={min} max={max} step={step} value={val} onChange={e => set(Number(e.target.value))}
            style={{ width: "100%", accentColor: "var(--blue)", cursor: "pointer" }} />
        </div>
      ))}
      <div style={{ background: "linear-gradient(135deg, var(--blue), var(--blue-dark))", borderRadius: 10, padding: "14px 18px", textAlign: "center", marginTop: 6 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Monthly EMI</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#fff", marginTop: 4 }}>
          ₹{isNaN(emi) ? "0" : Math.round(emi).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

function ContactModal({ prop, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: `I'm interested in ${prop.name}. Please share more details.` });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div className="scale-in" style={{ background: "#fff", borderRadius: 18, padding: 32, width: "100%", maxWidth: 440, boxShadow: "var(--shadow-xl)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>Contact Builder</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--text-muted)" }}>✕</button>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18, padding: "10px 14px", background: "var(--blue-light)", borderRadius: 8 }}>
          🏠 <strong>{prop.name}</strong> — {prop.price}
        </div>
        {[
          { key: "name",    label: "Full Name *",    type: "text",  ph: "Your name" },
          { key: "phone",   label: "Phone Number *", type: "tel",   ph: "+91 XXXXX XXXXX" },
          { key: "email",   label: "Email",          type: "email", ph: "your@email.com" },
        ].map(({ key, label, type, ph }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 5 }}>{label}</label>
            <input type={type} placeholder={ph} value={form[key]} onChange={e => set(key, e.target.value)}
              style={{ width: "100%", border: "1.5px solid var(--border)", borderRadius: 8, padding: "10px 13px", fontSize: 13, outline: "none", transition: "border 0.2s" }}
              onFocus={e => e.target.style.borderColor = "var(--blue)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"} />
          </div>
        ))}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 5 }}>Message</label>
          <textarea value={form.message} onChange={e => set("message", e.target.value)} rows={3}
            style={{ width: "100%", border: "1.5px solid var(--border)", borderRadius: 8, padding: "10px 13px", fontSize: 13, outline: "none", resize: "none" }}
            onFocus={e => e.target.style.borderColor = "var(--blue)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"} />
        </div>
        <button onClick={onSubmit} style={{ width: "100%", background: "var(--blue)", color: "#fff", border: "none", padding: "13px 0", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}
          onMouseEnter={e => e.target.style.background = "var(--blue-dark)"}
          onMouseLeave={e => e.target.style.background = "var(--blue)"}>
          📞 Send Request
        </button>
        <div style={{ fontSize: 11, color: "var(--text-light)", textAlign: "center", marginTop: 10 }}>
          By submitting you agree to our Terms &amp; Privacy Policy
        </div>
      </div>
    </div>
  );
}
