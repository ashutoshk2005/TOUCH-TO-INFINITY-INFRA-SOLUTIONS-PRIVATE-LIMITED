import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { CITIES, SITE } from "../../data/content";

const NAV_ITEMS = [
  { label: "Projects",   path: "/search?listing=Buy&type=Apartment" },
  { label: "Luxury",     path: "/search?listing=Buy&type=Villa", badge: "HOT" },

  { label: "Blog",       path: "/blog" },
  { label: "About Us",   path: "/about" },
  { label: "Contact",    path: "/contact" },
];

export default function Navbar() {
  const { user, logout, wishlist, city, setCity } = useApp();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [searchType, setSearchType] = useState("Buy");
  const [query,     setQuery]       = useState("");
  const [cityOpen,  setCityOpen]    = useState(false);
  const [userOpen,  setUserOpen]    = useState(false);
  const [menuOpen,  setMenuOpen]    = useState(false);
  const [scrolled,  setScrolled]    = useState(false);
  const cityRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) setCityOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    p.set("listing", searchType);
    p.set("city", city);
    navigate(`/search?${p.toString()}`);
    setQuery("");
  };

  return (
    <nav style={{
      background: "var(--navy)",
      position: "sticky", top: 0, zIndex: 200,
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.35)" : "0 2px 12px rgba(0,0,0,0.2)",
      transition: "box-shadow 0.3s",
    }}>
      {/* ── TOP ROW ─────────────────────────────────────────────────────────── */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 20px", height:64, maxWidth:1440, margin:"0 auto" }}>

        {/* Logo */}
        <Link to="/" style={{ display:"flex", alignItems:"center", gap:8, textDecoration:"none", flexShrink:0, marginRight:4 }}>
          <img src="/images/logo.png" alt="Touch to Infinity" style={{ width: 70, height: 38, objectFit: 'contain', borderRadius: 9, background: '#fff', flexShrink: 0 }} />
        </Link>

        {/* City picker — hidden on mobile */}
        <div ref={cityRef} style={{ position:"relative", flexShrink:0 }} className="hide-mobile">
          <button onClick={() => setCityOpen(!cityOpen)}
            style={navBtn}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.18)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
            📍 {city} <span style={{ fontSize:9, opacity:0.7 }}>▾</span>
          </button>
          {cityOpen && (
            <div className="scale-in" style={{ position:"absolute", top:"calc(100% + 8px)", left:0, background:"#fff", borderRadius:12, boxShadow:"var(--shadow-xl)", minWidth:155, overflow:"hidden", zIndex:300 }}>
              {CITIES.map(c => (
                <button key={c} onClick={() => { setCity(c); setCityOpen(false); }}
                  style={{ display:"block", width:"100%", padding:"9px 14px", textAlign:"left", background: c===city ? "var(--blue-light)" : "transparent", color: c===city ? "var(--blue-dark)" : "var(--text)", fontSize:13, fontWeight: c===city ? 600 : 400, border:"none", cursor:"pointer", transition:"background 0.15s" }}
                  onMouseEnter={e=>{ if(c!==city) e.currentTarget.style.background="#f5f8ff"; }}
                  onMouseLeave={e=>{ if(c!==city) e.currentTarget.style.background="transparent"; }}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search bar — hidden on mobile */}
        <form onSubmit={handleSearch}
          style={{ flex:1, display:"flex", background:"#fff", borderRadius:10, overflow:"hidden", height:40, maxWidth:540, boxShadow:"0 2px 12px rgba(21,101,192,0.18)" }}
          className="hide-mobile">
          <select value={searchType} onChange={e => setSearchType(e.target.value)}
            style={{ background:"var(--blue-light)", border:"none", borderRight:"1px solid var(--border)", padding:"0 10px", fontSize:12, color:"var(--blue-dark)", fontWeight:600, cursor:"pointer", outline:"none" }}>
            <option>Buy</option><option>Rent</option>
          </select>
          <input value={query} onChange={e => setQuery(e.target.value)} type="text"
            placeholder="Search locality, project, builder..."
            style={{ flex:1, border:"none", outline:"none", padding:"0 12px", fontSize:13, color:"var(--text)" }} />
          <button type="submit"
            style={{ background:"var(--blue)", border:"none", padding:"0 16px", color:"#fff", fontSize:16, cursor:"pointer", transition:"background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background="var(--blue-dark)"}
            onMouseLeave={e => e.currentTarget.style.background="var(--blue)"}>
            🔍
          </button>
        </form>

        {/* Right actions */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginLeft:"auto", flexShrink:0 }}>

          {/* Wishlist */}
          <Link to="/wishlist"
            style={{ position:"relative", ...iconBtn }}
            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
            ❤️
            {wishlist.length > 0 && (
              <span style={{ position:"absolute", top:-5, right:-5, background:"var(--blue-bright)", color:"#fff", fontSize:9, fontWeight:700, width:17, height:17, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User dropdown */}
          <div ref={userRef} style={{ position:"relative" }}>
            <button onClick={() => setUserOpen(!userOpen)}
              style={{ display:"flex", alignItems:"center", gap:6, ...navBtn, padding:"0 10px", height:36, whiteSpace:"nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}>
              👤 <span className="hide-mobile" style={{ fontSize:12 }}>{user ? user.name.split(" ")[0] : "Login"}</span>
            </button>
            {userOpen && (
              <div className="scale-in" style={{ position:"absolute", top:"calc(100% + 8px)", right:0, background:"#fff", borderRadius:12, boxShadow:"var(--shadow-xl)", minWidth:185, overflow:"hidden", zIndex:300 }}>
                {user ? (
                  <>
                    <div style={{ padding:"14px 16px", borderBottom:"1px solid var(--border)", background:"var(--blue-light)" }}>
                      <div style={{ fontSize:14, fontWeight:700, color:"var(--blue-dark)" }}>{user.name}</div>
                      <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:1 }}>{user.email}</div>
                    </div>
                    <DropItem label="My Profile"    icon="👤" onClick={() => { navigate("/profile");  setUserOpen(false); }} />
                    <DropItem label="My Wishlist"   icon="❤️" onClick={() => { navigate("/wishlist"); setUserOpen(false); }} />
                    <DropItem label="My Listings"   icon="🏠" onClick={() => { navigate("/profile");  setUserOpen(false); }} />
                    <DropItem label="Post Property" icon="➕" onClick={() => { navigate("/post");     setUserOpen(false); }} />
                    <div style={{ height:1, background:"var(--border)", margin:"4px 0" }} />
                    <DropItem label="Logout" icon="🚪" onClick={() => { logout(); setUserOpen(false); }} danger />
                  </>
                ) : (
                  <>
                    <DropItem label="Login"    icon="🔐" onClick={() => { navigate("/login");             setUserOpen(false); }} />
                    <DropItem label="Register" icon="✍️" onClick={() => { navigate("/login?tab=register"); setUserOpen(false); }} />
                  </>
                )}
              </div>
            )}
          </div>

          {/* Post Property — desktop */}
          <Link to="/post" className="hide-mobile"
            style={{ background:"var(--blue-bright)", color:"#fff", padding:"0 14px", height:36, borderRadius:8, fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:4, textDecoration:"none", transition:"background 0.2s", whiteSpace:"nowrap" }}
            onMouseEnter={e => e.currentTarget.style.background="var(--blue)"}
            onMouseLeave={e => e.currentTarget.style.background="var(--blue-bright)"}>
            + POST
          </Link>

          {/* Hamburger — mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            style={{ ...iconBtn, fontSize:18 }}
            className="show-mobile-flex">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ── NAV LINKS (desktop) ─────────────────────────────────────────────── */}
      <div style={{ background:"var(--navy-light)", borderTop:"1px solid rgba(255,255,255,0.07)" }} className="hide-mobile">
        <div className="hide-scroll" style={{ display:"flex", padding:"0 20px", maxWidth:1440, margin:"0 auto", overflowX:"auto" }}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.label} item={item}
              active={location.pathname === item.path.split("?")[0]} />
          ))}
        </div>
      </div>

      {/* ── MOBILE SEARCH BAR ───────────────────────────────────────────────── */}
      <div style={{ padding:"10px 16px", background:"var(--navy-light)", borderTop:"1px solid rgba(255,255,255,0.07)" }} className="show-mobile">
        <form onSubmit={handleSearch} style={{ display:"flex", background:"#fff", borderRadius:9, overflow:"hidden", height:40 }}>
          <select value={searchType} onChange={e => setSearchType(e.target.value)}
            style={{ background:"var(--blue-light)", border:"none", borderRight:"1px solid var(--border)", padding:"0 8px", fontSize:12, color:"var(--blue-dark)", fontWeight:600, cursor:"pointer", outline:"none" }}>
            <option>Buy</option><option>Rent</option>
          </select>
          <input value={query} onChange={e => setQuery(e.target.value)} type="text"
            placeholder="Search locality or project..."
            style={{ flex:1, border:"none", outline:"none", padding:"0 10px", fontSize:13 }} />
          <button type="submit"
            style={{ background:"var(--blue)", border:"none", padding:"0 14px", color:"#fff", fontSize:15, cursor:"pointer" }}>
            🔍
          </button>
        </form>
      </div>

      {/* ── MOBILE FULL MENU ────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="fade-in" style={{ background:"var(--navy)", borderTop:"1px solid rgba(255,255,255,0.1)", paddingBottom:12 }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.label} to={item.path}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 20px", color:"rgba(255,255,255,0.88)", fontSize:14, fontWeight:500, textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,0.05)" }}
              onClick={() => setMenuOpen(false)}>
              {item.label}
              {item.badge && (
                <span style={{ background:"var(--orange)", color:"#fff", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:4 }}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <div style={{ padding:"14px 16px 4px" }}>
            <Link to="/post" onClick={() => setMenuOpen(false)}
              style={{ display:"block", background:"var(--blue)", color:"#fff", padding:"13px 0", borderRadius:9, fontSize:14, fontWeight:700, textAlign:"center", textDecoration:"none" }}>
              + POST PROPERTY FREE
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Shared style objects ─────────────────────────────────────────────────── */
const navBtn = {
  display: "flex", alignItems: "center", gap: 5,
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 8, padding: "7px 10px", color: "#fff", fontSize: 12,
  cursor: "pointer", transition: "background 0.2s",
};
const iconBtn = {
  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8, width: 36, height: 36,
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 16, color: "#fff", textDecoration: "none", transition: "background 0.2s",
};

function NavLink({ item, active }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={item.path}
      style={{ display:"flex", alignItems:"center", gap:5, padding:"10px 16px", color: active ? "var(--blue-mid)" : hov ? "#fff" : "rgba(255,255,255,0.72)", fontSize:13, fontWeight:500, borderBottom: active ? "2px solid var(--blue-mid)" : "2px solid transparent", transition:"color 0.2s", textDecoration:"none", whiteSpace:"nowrap" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {item.label}
      {item.badge && (
        <span style={{ background:"var(--orange)", color:"#fff", fontSize:9, fontWeight:700, padding:"1px 5px", borderRadius:4 }}>
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function DropItem({ label, icon, onClick, danger }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 16px", background: hov ? (danger ? "#fff0f0" : "var(--blue-light)") : "transparent", color: danger ? "var(--red)" : "var(--text)", fontSize:13, border:"none", cursor:"pointer", textAlign:"left", transition:"background 0.15s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon} {label}
    </button>
  );
}
