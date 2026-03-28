import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { getPostedProperties } from "../../utils/storage";
import { PROPERTIES } from "../../data/content";

export default function ProfilePage() {
  const { user, logout, updateProfile, wishlist } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ fontSize: 64 }}>🔐</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>Login to view your profile</div>
      <Link to="/login" style={{ background: "var(--blue)", color: "#fff", padding: "12px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>Login / Sign Up</Link>
    </div>
  );

  // My posted properties (from localStorage)
  const myListings = getPostedProperties().filter(p => p.postedBy === user.id);
  const wishedProps = PROPERTIES.filter(p => wishlist.includes(p.id));

  const TABS = [
    { key: "profile",  label: "👤 Profile"          },
    { key: "listings", label: `🏠 My Listings (${myListings.length})` },
    { key: "wishlist", label: `❤️ Wishlist (${wishedProps.length})` },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Profile banner */}
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)", padding: "36px 0 0" }}>
        <div className="page-container">
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, border: "3px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#fff" }}>{user.name}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>{user.email}</div>
              <div style={{ fontSize: 12, color: "var(--blue)", marginTop: 3 }}>
                Member since {new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </div>
            </div>
            <button onClick={() => { logout(); navigate("/"); }}
              style={{ marginLeft: "auto", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Logout 🚪
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0 }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                style={{ padding: "12px 22px", border: "none", background: "none", color: activeTab === t.key ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: activeTab === t.key ? 700 : 400, fontSize: 13, cursor: "pointer", borderBottom: activeTab === t.key ? "2px solid var(--blue)" : "2px solid transparent", transition: "all 0.2s" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="page-container" style={{ paddingTop: 32, paddingBottom: 52 }}>
        {activeTab === "profile"  && <ProfileTab user={user} updateProfile={updateProfile} />}
        {activeTab === "listings" && <ListingsTab listings={myListings} navigate={navigate} />}
        {activeTab === "wishlist" && <WishlistTab props={wishedProps} navigate={navigate} />}
      </div>
    </div>
  );
}

/* ── Profile editor ────────────────────────────────────────────────────────── */
function ProfileTab({ user, updateProfile }) {
  const [form,    setForm]    = useState({ name: user.name, phone: user.phone || "" });
  const [editing, setEditing] = useState(false);
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    updateProfile({ name: form.name.trim(), phone: form.phone.trim() });
    setEditing(false);
  };

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid var(--border)", boxShadow: "var(--shadow)", padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>Account Details</h2>
          <button onClick={() => setEditing(e => !e)}
            style={{ background: editing ? "var(--bg)" : "var(--blue-light)", color: editing ? "var(--text-muted)" : "var(--blue)", border: `1px solid ${editing ? "var(--border)" : "var(--blue-mid)"}`, padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {editing ? "Cancel" : "✏️ Edit"}
          </button>
        </div>

        {editing ? (
          <div>
            <FormField label="Full Name"     type="text" value={form.name}  onChange={set("name")}  placeholder="Your name" />
            <FormField label="Phone Number"  type="tel"  value={form.phone} onChange={set("phone")} placeholder="+91 XXXXX XXXXX" />
            <InfoRow label="Email" value={user.email} note="(cannot be changed)" />
            <button onClick={handleSave}
              style={{ background: "var(--blue)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
              Save Changes ✓
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <InfoRow label="Full Name"    value={user.name}           />
            <InfoRow label="Email"        value={user.email}          />
            <InfoRow label="Phone"        value={user.phone || "—"}   />
            <InfoRow label="Member Since" value={new Date(user.createdAt || Date.now()).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
            <InfoRow label="Account ID"   value={`#${user.id}`} note="(used for local storage)" />
          </div>
        )}
      </div>

      {/* Storage info */}
      <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: "14px 18px", marginTop: 20, fontSize: 13, color: "#92400e", lineHeight: 1.7 }}>
        <strong>📦 Where is my data stored?</strong><br />
        All your account info, wishlist, and posted properties are stored in your browser's <code style={{ background: "#fef3c7", padding: "1px 5px", borderRadius: 4 }}>localStorage</code>. This means:
        <ul style={{ marginTop: 8, paddingLeft: 18 }}>
          <li>Data persists across page refreshes ✅</li>
          <li>Data is browser-specific (won't sync to other devices) ⚠️</li>
          <li>Clearing browser data will erase your account ⚠️</li>
          <li>No server or internet needed for auth 🚀</li>
        </ul>
      </div>
    </div>
  );
}

/* ── My listings ──────────────────────────────────────────────────────────── */
function ListingsTab({ listings, navigate }) {
  if (listings.length === 0) return (
    <div style={{ textAlign: "center", padding: "52px 0" }}>
      <div style={{ fontSize: 64 }}>🏠</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, marginTop: 16 }}>No listings yet</div>
      <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Post your first property for free.</p>
      <button onClick={() => navigate("/post")}
        style={{ marginTop: 20, background: "var(--blue)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        + Post Property
      </button>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>My Listings ({listings.length})</h2>
        <button onClick={() => navigate("/post")}
          style={{ background: "var(--blue)", color: "#fff", border: "none", padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          + Add New
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {listings.map(p => <ListingCard key={p.id} prop={p} />)}
      </div>
    </div>
  );
}

function ListingCard({ prop }) {
  const [hov, setHov] = useState(false);
  const statusColor = prop.status === "ACTIVE" ? "var(--green)" : prop.status === "PENDING" ? "var(--orange)" : "var(--text-muted)";
  const statusBg    = prop.status === "ACTIVE" ? "#ecfdf5"     : prop.status === "PENDING" ? "#fff7ed"     : "var(--bg)";

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${hov ? "var(--blue)" : "var(--border)"}`, padding: "18px 22px", boxShadow: hov ? "var(--shadow)" : "var(--shadow-sm)", transition: "all 0.25s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ background: statusBg, color: statusColor, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 5 }}>{prop.status}</span>
            <span style={{ background: "var(--blue-light)", color: "var(--blue-dark)", fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 5 }}>{prop.listingType} · {prop.type}</span>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginTop: 8 }}>{prop.name || "Unnamed Property"}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 3 }}>📍 {[prop.locality, prop.city].filter(Boolean).join(", ") || "—"}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--blue)", fontFamily: "var(--font-display)" }}>{prop.price || "—"}</div>
          <div style={{ fontSize: 11, color: "var(--text-light)", marginTop: 4 }}>
            Listed: {new Date(prop.postedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {[prop.bhk, prop.area ? prop.area + " sq.ft" : null, prop.possession].filter(Boolean).map((tag, i) => (
          <span key={i} style={{ background: "var(--bg)", color: "var(--text-muted)", fontSize: 11, padding: "4px 10px", borderRadius: 5 }}>{tag}</span>
        ))}
        {prop.amenities?.length > 0 && (
          <span style={{ background: "var(--bg)", color: "var(--text-muted)", fontSize: 11, padding: "4px 10px", borderRadius: 5 }}>
            {prop.amenities.length} amenities
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-light)", marginTop: 10 }}>Listing ID: #{prop.id}</div>
    </div>
  );
}

/* ── Wishlist tab ─────────────────────────────────────────────────────────── */
function WishlistTab({ props, navigate }) {
  if (props.length === 0) return (
    <div style={{ textAlign: "center", padding: "52px 0" }}>
      <div style={{ fontSize: 64 }}>❤️</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, marginTop: 16 }}>No saved properties</div>
      <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Browse properties and tap ❤️ to save them.</p>
      <button onClick={() => navigate("/search")}
        style={{ marginTop: 20, background: "var(--blue)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Browse Properties
      </button>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Saved Properties ({props.length})</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 20 }}>
        {props.map(p => (
          <div key={p.id} onClick={() => navigate(`/property/${p.id}`)}
            style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", boxShadow: "var(--shadow)", cursor: "pointer" }}>
            <img src={p.img} alt={p.name} style={{ width: "100%", height: 170, objectFit: "cover" }} />
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--blue)", fontFamily: "var(--font-display)" }}>{p.price}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>📍 {p.loc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Primitives ──────────────────────────────────────────────────────────── */
function InfoRow({ label, value, note }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
      <span style={{ fontSize: 13, color: "var(--text-muted)", minWidth: 110 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{value} {note && <span style={{ color: "var(--text-light)", fontWeight: 400 }}>{note}</span>}</span>
    </div>
  );
}

function FormField({ label, type, placeholder, value, onChange }) {
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
