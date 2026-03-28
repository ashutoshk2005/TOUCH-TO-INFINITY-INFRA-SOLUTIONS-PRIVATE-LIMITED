import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Footer from "../../components/Footer/Footer";
import { PROPERTIES, CITIES } from "../../data/content";

const TYPES   = ["All","Apartment","Villa","Plot"];
const BHK_OPT = [1,2,3,4,5];
const SORT_OPT = [
  { label:"Relevance",        value:"relevance" },
  { label:"Price: Low → High",value:"price_asc" },
  { label:"Price: High → Low",value:"price_desc" },
  { label:"Top Rated",        value:"rating" },
];

export default function SearchPage() {
  const [params] = useSearchParams();
  const [sort, setSort]           = useState("relevance");
  const [viewMode, setViewMode]   = useState("grid");
  const [filterDrawer, setFilterDrawer] = useState(false); // mobile filter sheet
  const [filters, setFilters]     = useState({
    q:       params.get("q")       || "",
    listing: params.get("listing") || "Buy",
    type:    params.get("type")    || "All",
    city:    params.get("city")    || "All",
    bhk: [], priceMin: "", priceMax: "", status: "All",
  });

  const setF  = (k, v) => setFilters(f => ({ ...f, [k]: v }));
  const togArr = (k, v) => setFilters(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x=>x!==v) : [...f[k],v] }));
  const reset  = () => setFilters({ q:"", listing:"Buy", type:"All", city:"All", bhk:[], priceMin:"", priceMax:"", status:"All" });

  const results = useMemo(() => {
    let list = [...PROPERTIES];
    if (filters.q) { const q = filters.q.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.loc.toLowerCase().includes(q) || p.builder.toLowerCase().includes(q)); }
    if (filters.listing !== "All") list = list.filter(p => p.listingType === filters.listing);
    if (filters.type    !== "All") list = list.filter(p => p.type === filters.type);
    if (filters.city    !== "All") list = list.filter(p => p.city === filters.city);
    if (filters.status  !== "All") list = list.filter(p => p.status === filters.status);
    if (filters.bhk.length)        list = list.filter(p => filters.bhk.some(b => p.bhk.includes(b)));
    if (filters.priceMin)          list = list.filter(p => p.priceMin >= Number(filters.priceMin));
    if (filters.priceMax)          list = list.filter(p => p.priceMax <= Number(filters.priceMax));
    if (sort === "price_asc")  list.sort((a,b) => a.priceMin - b.priceMin);
    if (sort === "price_desc") list.sort((a,b) => b.priceMin - a.priceMin);
    if (sort === "rating")     list.sort((a,b) => (b.rating||0) - (a.rating||0));
    return list;
  }, [filters, sort]);

  const activeCount = [filters.type !== "All", filters.status !== "All", filters.bhk.length > 0, filters.priceMin, filters.priceMax].filter(Boolean).length;

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>
      {/* Search header */}
      <div style={{ background:"var(--navy)", padding:"16px 0" }}>
        <div className="page-container">
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center" }}>
            <div style={{ display:"flex", background:"rgba(255,255,255,0.1)", borderRadius:7, overflow:"hidden" }}>
              {["Buy","Rent"].map(l => (
                <button key={l} onClick={() => setF("listing", l)}
                  style={{ padding:"8px 16px", border:"none", background: filters.listing === l ? "var(--blue)" : "transparent", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  {l}
                </button>
              ))}
            </div>
            <div style={{ flex:1, display:"flex", background:"#fff", borderRadius:8, overflow:"hidden", minWidth:200 }}>
              <input value={filters.q} onChange={e => setF("q", e.target.value)} placeholder="Search project, locality…"
                style={{ flex:1, border:"none", outline:"none", padding:"9px 12px", fontSize:13 }} />
              {filters.q && <button onClick={() => setF("q","")} style={{ background:"none", border:"none", padding:"0 10px", cursor:"pointer", fontSize:15, color:"var(--text-muted)" }}>✕</button>}
            </div>
            <select value={filters.city} onChange={e => setF("city", e.target.value)}
              style={{ padding:"9px 12px", borderRadius:7, border:"1px solid rgba(255,255,255,0.2)", background:"rgba(255,255,255,0.1)", color:"#fff", fontSize:13, cursor:"pointer", outline:"none" }}>
              <option value="All">All Cities</option>
              {CITIES.map(c => <option key={c} value={c} style={{ color:"#000" }}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop:20, paddingBottom:48 }}>
        {/* Toolbar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {/* Mobile filter button */}
            <button onClick={() => setFilterDrawer(true)}
              style={{ display:"flex", alignItems:"center", gap:6, background:"var(--blue-light)", color:"var(--blue-dark)", border:"1px solid var(--blue-mid)", padding:"7px 14px", borderRadius:7, fontSize:13, fontWeight:600, cursor:"pointer" }}>
              ⚙️ Filters {activeCount > 0 && <span style={{ background:"var(--blue)", color:"#fff", borderRadius:99, fontSize:10, padding:"1px 6px", fontWeight:700 }}>{activeCount}</span>}
            </button>
            <span style={{ fontSize:13, color:"var(--text-muted)" }}>
              <strong style={{ color:"var(--text)" }}>{results.length}</strong> found
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ border:"1px solid var(--border)", borderRadius:7, padding:"7px 10px", fontSize:13, cursor:"pointer", outline:"none", maxWidth:160 }}>
              {SORT_OPT.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <div style={{ display:"flex", border:"1px solid var(--border)", borderRadius:7, overflow:"hidden" }}>
              {["grid","list"].map(v => (
                <button key={v} onClick={() => setViewMode(v)}
                  style={{ padding:"7px 11px", border:"none", background: viewMode===v ? "var(--navy)" : "#fff", color: viewMode===v ? "#fff" : "var(--text-muted)", cursor:"pointer", fontSize:15, transition:"all 0.2s" }}>
                  {v==="grid" ? "⊞" : "☰"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active chips */}
        {activeCount > 0 && (
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
            {filters.type !== "All"   && <ActiveChip label={filters.type}   onRemove={() => setF("type","All")} />}
            {filters.status !== "All" && <ActiveChip label={filters.status} onRemove={() => setF("status","All")} />}
            {filters.bhk.map(b => <ActiveChip key={b} label={`${b} BHK`} onRemove={() => togArr("bhk", b)} />)}
            {filters.priceMin && <ActiveChip label={`Min ₹${(filters.priceMin/100000).toFixed(0)}L`} onRemove={() => setF("priceMin","")} />}
            {filters.priceMax && <ActiveChip label={`Max ₹${(filters.priceMax/100000).toFixed(0)}L`} onRemove={() => setF("priceMax","")} />}
            <button onClick={reset} style={{ background:"none", border:"none", color:"var(--red)", fontSize:12, fontWeight:600, cursor:"pointer", padding:"4px 8px" }}>Clear all</button>
          </div>
        )}

        {/* Results */}
        {results.length === 0 ? (
          <EmptyState onClear={reset} />
        ) : viewMode === "grid" ? (
          <div className="grid-cards">
            {results.map((p,i) => <PropertyCard key={p.id} prop={p} delay={(i%4)+1} />)}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {results.map(p => <ListItem key={p.id} prop={p} />)}
          </div>
        )}
      </div>

      {/* Filter Drawer — slides from left/bottom on mobile */}
      {filterDrawer && (
        <FilterDrawer filters={filters} setF={setF} togArr={togArr} reset={reset} onClose={() => setFilterDrawer(false)} />
      )}

      <Footer />
    </div>
  );
}

/* ── Filter Drawer (works on all screen sizes) ─────────────────────────── */
function FilterDrawer({ filters, setF, togArr, reset, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:500 }} />
      {/* Panel */}
      <div className="scale-in" style={{ position:"fixed", top:0, left:0, bottom:0, width:300, maxWidth:"90vw", background:"#fff", zIndex:501, overflowY:"auto", boxShadow:"var(--shadow-xl)", display:"flex", flexDirection:"column" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 20px", borderBottom:"1px solid var(--border)", position:"sticky", top:0, background:"#fff", zIndex:1 }}>
          <div style={{ fontSize:16, fontWeight:700 }}>Filters</div>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={reset} style={{ background:"none", border:"none", color:"var(--blue)", fontSize:13, fontWeight:600, cursor:"pointer" }}>Reset</button>
            <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"var(--text-muted)", lineHeight:1 }}>✕</button>
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"0 20px 24px" }}>
          <FilterGroup title="Property Type">
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["All","Apartment","Villa","Plot"].map(t => (
                <Chip key={t} label={t} active={filters.type===t} onClick={() => setF("type",t)} />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="BHK">
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {[1,2,3,4,5].map(b => (
                <Chip key={b} label={`${b} BHK`} active={filters.bhk.includes(b)} onClick={() => togArr("bhk",b)} />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Status">
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["All","ONGOING","COMPLETED"].map(s => (
                <Chip key={s} label={s === "All" ? "All" : s.charAt(0)+s.slice(1).toLowerCase()} active={filters.status===s} onClick={() => setF("status",s)} />
              ))}
            </div>
          </FilterGroup>
          <FilterGroup title="Budget (₹)">
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <input type="number" placeholder="Min price" value={filters.priceMin} onChange={e => setF("priceMin",e.target.value)}
                style={{ border:"1.5px solid var(--border)", borderRadius:7, padding:"9px 12px", fontSize:14, outline:"none", width:"100%" }} />
              <input type="number" placeholder="Max price" value={filters.priceMax} onChange={e => setF("priceMax",e.target.value)}
                style={{ border:"1.5px solid var(--border)", borderRadius:7, padding:"9px 12px", fontSize:14, outline:"none", width:"100%" }} />
            </div>
          </FilterGroup>
        </div>
        <div style={{ padding:"14px 20px", borderTop:"1px solid var(--border)", position:"sticky", bottom:0, background:"#fff" }}>
          <button onClick={onClose}
            style={{ width:"100%", background:"var(--blue)", color:"#fff", border:"none", padding:"13px 0", borderRadius:9, fontSize:15, fontWeight:700, cursor:"pointer" }}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div style={{ marginTop:20, paddingBottom:18, borderBottom:"1px solid var(--border-light)" }}>
      <div style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:10 }}>{title}</div>
      {children}
    </div>
  );
}
function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      style={{ padding:"7px 13px", borderRadius:7, border:`1.5px solid ${active ? "var(--blue)" : "var(--border)"}`, background: active ? "var(--blue)" : "#fff", color: active ? "#fff" : "var(--text)", fontSize:13, fontWeight:500, cursor:"pointer", transition:"all 0.2s" }}>
      {label}
    </button>
  );
}
function ActiveChip({ label, onRemove }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:"var(--blue)", color:"#fff", padding:"4px 10px", borderRadius:20, fontSize:12, fontWeight:500 }}>
      {label}
      <button onClick={onRemove} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", fontSize:13, lineHeight:1, padding:0, opacity:0.8 }}>✕</button>
    </span>
  );
}
function EmptyState({ onClear }) {
  return (
    <div style={{ textAlign:"center", padding:"52px 0" }}>
      <div style={{ fontSize:48 }}>🔍</div>
      <div style={{ fontSize:18, fontWeight:600, marginTop:14 }}>No properties found</div>
      <div style={{ fontSize:14, color:"var(--text-muted)", marginTop:6 }}>Try adjusting your filters</div>
      <button onClick={onClear} style={{ marginTop:18, background:"var(--blue)", color:"#fff", border:"none", padding:"10px 24px", borderRadius:8, fontSize:14, fontWeight:600, cursor:"pointer" }}>
        Clear Filters
      </button>
    </div>
  );
}
function ListItem({ prop }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background:"#fff", borderRadius:11, border:"1px solid var(--border)", boxShadow: hov ? "var(--shadow-lg)" : "var(--shadow)", display:"flex", overflow:"hidden", transition:"all 0.25s", transform: hov ? "translateY(-2px)" : "none", cursor:"pointer" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ width:180, flexShrink:0, overflow:"hidden" }} className="hide-xs">
        <img src={prop.img} alt={prop.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s", transform: hov ? "scale(1.05)" : "scale(1)" }} />
      </div>
      <div style={{ flex:1, padding:"16px 18px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
        <div>
          <span style={{ background: prop.status === "COMPLETED" ? "#ecfdf5" : "#fff5f0", color: prop.status === "COMPLETED" ? "var(--green)" : "var(--orange)", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:5 }}>{prop.status}</span>
          <div style={{ fontSize:"clamp(15px,3vw,17px)", fontWeight:700, color:"var(--blue)", fontFamily:"var(--font-display)", marginTop:6 }}>{prop.price}</div>
          <div style={{ fontSize:15, fontWeight:600, marginTop:2 }}>{prop.name}</div>
          <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:3 }}>📍 {prop.loc}</div>
          <div style={{ display:"flex", gap:7, marginTop:8, flexWrap:"wrap" }}>
            {[prop.config.split(",")[0], prop.area && `📐 ${prop.area}`].filter(Boolean).map((t,i) => (
              <span key={i} style={{ background:"var(--blue-light)", color:"var(--blue-dark)", fontSize:11, padding:"3px 8px", borderRadius:5 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:12 }}>
          <div style={{ fontSize:12, color:"var(--text-muted)" }}>{prop.builder}</div>
          <button style={{ background:"var(--blue)", color:"#fff", border:"none", padding:"7px 16px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer" }}>CONTACT</button>
        </div>
      </div>
    </div>
  );
}
