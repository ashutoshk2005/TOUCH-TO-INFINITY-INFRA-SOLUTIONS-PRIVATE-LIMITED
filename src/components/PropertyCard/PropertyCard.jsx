import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function PropertyCard({ prop, delay = 1, compact = false }) {
  const [hov, setHov] = useState(false);
  const { toggleWishlist, isWishlisted, user, addNotification } = useApp();
  const navigate = useNavigate();
  const wished = isWishlisted(prop.id);

  const handleWish = (e) => {
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    toggleWishlist(prop.id);
    addNotification(wished ? "Removed from wishlist" : "Added to wishlist ❤️", wished ? "info" : "success");
  };
  const handleContact = (e) => {
    e.stopPropagation();
    navigate("/contact");
  };

  return (
    <div className={`fade-up d${delay}`}
      onClick={() => navigate(`/property/${prop.id}`)}
      style={{ background:"#fff", borderRadius:14, overflow:"hidden", boxShadow:hov?"var(--shadow-lg)":"var(--shadow)", border:`1px solid ${hov?"var(--blue)":"var(--border)"}`, cursor:"pointer", transition:"all 0.3s", transform:hov?"translateY(-5px)":"none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Image */}
      <div style={{ position:"relative", height:compact?155:192, overflow:"hidden", background:"#dde8f5" }}>
        <img src={prop.img} alt={prop.name}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s", transform:hov?"scale(1.07)":"scale(1)" }} />
        <span style={{ position:"absolute", top:12, left:12, background: prop.status==="COMPLETED"?"rgba(46,125,50,0.92)":"rgba(230,81,0,0.92)", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:6, backdropFilter:"blur(4px)", letterSpacing:"0.5px" }}>
          {prop.status}
        </span>
        {prop.new && (
          <span style={{ position:"absolute", top:12, left: prop.status ? 100 : 12, background:"rgba(255,160,0,0.92)", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 8px", borderRadius:6 }}>NEW</span>
        )}
        <button onClick={handleWish}
          style={{ position:"absolute", top:10, right:12, background:wished?"var(--blue)":"rgba(255,255,255,0.92)", border:"none", width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.15)", transition:"all 0.25s", transform:hov?"scale(1.1)":"scale(1)" }}>
          {wished ? "❤️" : "🤍"}
        </button>
        {prop.images?.length > 1 && (
          <span style={{ position:"absolute", bottom:10, right:12, background:"rgba(0,0,0,0.55)", color:"#fff", fontSize:10, padding:"3px 8px", borderRadius:5 }}>
            📷 {prop.images.length}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding:"14px 16px" }}>
        <div style={{ fontSize:15, fontWeight:700, color:"var(--blue)", fontFamily:"var(--font-display)", lineHeight:1.2 }}>{prop.price}</div>
        <div style={{ fontSize:15, fontWeight:600, color:"var(--text)", marginTop:3 }}>{prop.name}</div>
        <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:4 }}>📍 {prop.loc}</div>
        <div style={{ display:"flex", gap:6, marginTop:8, flexWrap:"wrap" }}>
          {[prop.type, prop.config.split(",")[0].trim(), prop.area && `📐 ${prop.area}`].filter(Boolean).map((t, i) => (
            <span key={i} style={{ background:"var(--blue-light)", color:"var(--blue-dark)", fontSize:11, fontWeight:500, padding:"3px 8px", borderRadius:5 }}>{t}</span>
          ))}
        </div>
        {prop.rating && (
          <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:8 }}>
            <span style={{ color:"var(--gold)", fontSize:12 }}>{"★".repeat(Math.floor(prop.rating))}</span>
            <span style={{ fontSize:12, fontWeight:600 }}>{prop.rating}</span>
            <span style={{ fontSize:11, color:"var(--text-muted)" }}>({prop.reviews})</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", borderTop:"1px solid var(--border)", background:"#fafcff" }}>
        <div>
          <div style={{ fontSize:10, color:"var(--text-light)", textTransform:"uppercase", letterSpacing:"0.5px" }}>Builder</div>
          <div style={{ fontSize:12, color:"var(--text-muted)", fontWeight:500, marginTop:1 }}>{prop.builder}</div>
        </div>
        <ContactBtn onClick={handleContact} />
      </div>
    </div>
  );
}

function ContactBtn({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      style={{ background:h?"var(--blue)":"transparent", color:h?"#fff":"var(--blue)", border:"1.5px solid var(--blue)", padding:"6px 14px", borderRadius:7, fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      CONTACT
    </button>
  );
}
