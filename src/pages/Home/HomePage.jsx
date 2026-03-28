import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Footer from "../../components/Footer/Footer";
import { PROPERTIES, CATEGORIES, LOCALITIES, BLOGS, STATS, HERO, COMMUNITY } from "../../data/content";

export default function HomePage() {
  const navigate = useNavigate();
  const featured = PROPERTIES.filter(p => p.featured);
  const recent   = PROPERTIES.slice(0, 4);

  return (
    <div>
      <CategorySection navigate={navigate} />
      <LocalitiesBar   navigate={navigate} />
      <HeroBanner      navigate={navigate} />
      <Section title="Hand Picked Projects for You" bg="var(--white)">
        <div className="grid-cards">
          {featured.map((p, i) => <PropertyCard key={p.id} prop={p} delay={i + 1} />)}
        </div>
        <Center mt={32}><ViewAllBtn onClick={() => navigate("/search")} /></Center>
      </Section>
      <Section title="Newly Added Blogs">
        <div className="blog-grid">
          {BLOGS.map(b => <BlogCard key={b.id} blog={b} />)}
        </div>
      </Section>
      {/* AppPromo removed */}
      <StatsBar />
      <Section title="Recently Added Properties" bg="var(--white)">
        <div className="grid-cards">
          {recent.map((p, i) => <PropertyCard key={p.id} prop={p} delay={(i % 4) + 1} />)}
        </div>
        <Center mt={32}><ViewAllBtn onClick={() => navigate("/search")} /></Center>
      </Section>
      <CommunitySection />
      <Footer />
    </div>
  );
}

/* ── Layout helpers ───────────────────────────────────────────────────────── */
function Section({ title, children, bg }) {
  return (
    <section className="section-pad" style={{ background: bg || "var(--bg)" }}>
      <div className="page-container">
        <SectionHeader title={title} />
        {children}
      </div>
    </section>
  );
}
function SectionHeader({ title }) {
  return (
    <div style={{ textAlign:"center", marginBottom:32 }}>
      <h2 className="fade-up" style={{ fontFamily:"var(--font-display)", fontSize:"clamp(20px,4vw,28px)", fontWeight:600, color:"var(--text)" }}>{title}</h2>
      <div className="fade-up d1" style={{ width:48, height:3, background:"var(--blue)", margin:"10px auto 0", borderRadius:2 }} />
    </div>
  );
}
function Center({ children, mt = 0 }) {
  return <div style={{ textAlign:"center", marginTop:mt }}>{children}</div>;
}
function ViewAllBtn({ onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      style={{ background: h?"var(--blue)":"transparent", color: h?"#fff":"var(--blue)", border:"2px solid var(--blue)", padding:"11px 32px", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      View All Properties →
    </button>
  );
}

/* ── Category Section ─────────────────────────────────────────────────────── */
function CategorySection({ navigate }) {
  return (
    <div style={{ background:"#fff", padding:"20px 0 0", borderBottom:"1px solid var(--border)" }}>
      <div className="page-container">
        <div className="cat-scroll hide-scroll">
          {CATEGORIES.map((cat, i) => <CatCard key={i} cat={cat} navigate={navigate} />)}
        </div>
      </div>
    </div>
  );
}
function CatCard({ cat, navigate }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={() => navigate(`/search?listing=${cat.listing}&type=${cat.type}`)}
      style={{ display:"flex", alignItems:"center", gap:12, background: cat.luxury?"linear-gradient(135deg,#fffde7,#fff8e1)":"#fff", border:`1.5px solid ${h?(cat.luxury?"var(--gold)":"var(--blue)"):(cat.luxury?"var(--gold)":"var(--border)")}`, borderRadius:12, padding:"12px 16px", cursor:"pointer", minWidth:190, flexShrink:0, transform:h?"translateY(-3px)":"none", boxShadow:h?`0 6px 20px rgba(21,101,192,0.14)`:"none", transition:"all 0.25s" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ width:48, height:48, borderRadius:8, background:"var(--blue-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{cat.icon}</div>
      <div>
        <div style={{ fontSize:13, fontWeight:600, color: cat.luxury?"var(--gold)":"var(--blue)" }}>{cat.title}</div>
        <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:3, lineHeight:1.6 }}>{cat.prices.join(" · ")}</div>
      </div>
    </div>
  );
}

/* ── Localities Bar ───────────────────────────────────────────────────────── */
function LocalitiesBar({ navigate }) {
  return (
    <div style={{ background:"#fff", padding:"0 0 16px", borderBottom:"1px solid var(--border)" }}>
      <div className="page-container">
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {LOCALITIES.map((l, i) => <LocalityChip key={i} loc={l} navigate={navigate} />)}
        </div>
      </div>
    </div>
  );
}
function LocalityChip({ loc, navigate }) {
  const [h, setH] = useState(false);
  return (
    <div onClick={() => navigate(`/search?q=${loc.name}&city=${loc.city}`)}
      style={{ background:h?"var(--blue-light)":"#fff", border:`1.5px solid ${h?"var(--blue)":"var(--border)"}`, borderRadius:8, padding:"9px 14px", cursor:"pointer", transition:"all 0.2s" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", letterSpacing:"0.3px" }}>{loc.name.toUpperCase()}</div>
      <div style={{ fontSize:11, color:"var(--blue)", fontWeight:500, marginTop:2 }}>{loc.count}</div>
    </div>
  );
}

/* ── Hero Banner ──────────────────────────────────────────────────────────── */
function HeroBanner({ navigate }) {
  return (
    <div className="hero-banner">
      <div style={{ position:"absolute", inset:0, backgroundImage:`url(${HERO.image})`, backgroundSize:"cover", backgroundPosition:"center", opacity:0.28 }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(13,27,62,0.92) 0%,rgba(13,27,62,0.4) 100%)" }} />
      <div className="page-container" style={{ position:"relative", zIndex:2, width:"100%" }}>
        <div className="hero-content fade-up">
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,5vw,42px)", color:"#fff", lineHeight:1.2, fontWeight:700 }}>
            Find Your <span style={{ color:"var(--blue-mid)" }}>Dream Home</span><br className="hide-mobile" />
            In India's Best Cities
          </h1>
          <p style={{ fontSize:"clamp(13px,2vw,15px)", color:"rgba(255,255,255,0.72)", marginTop:12, fontWeight:300 }}>
            {HERO.subtext}
          </p>
          <div style={{ display:"flex", gap:12, marginTop:24, flexWrap:"wrap" }}>
            <HeroBtn primary onClick={() => navigate("/search")}>{HERO.cta1}</HeroBtn>
            <HeroBtn onClick={() => navigate("/post")}>{HERO.cta2}</HeroBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
function HeroBtn({ children, primary, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      style={{ background: primary?(h?"var(--blue-dark)":"var(--blue)"):(h?"rgba(255,255,255,0.14)":"transparent"), color:"#fff", border: primary?"none":`1.5px solid rgba(255,255,255,${h?1:0.55})`, padding:"12px 26px", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer", transform:h?"translateY(-1px)":"none", transition:"all 0.2s" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
    </button>
  );
}

/* ── Blog Card ────────────────────────────────────────────────────────────── */
function BlogCard({ blog }) {
  const [h, setH] = useState(false);
  return (
    <div style={{ background:"#fff", borderRadius:12, overflow:"hidden", border:`1px solid ${h?"var(--blue)":"var(--border)"}`, boxShadow:h?"var(--shadow-lg)":"var(--shadow)", cursor:"pointer", transition:"all 0.25s", transform:h?"translateY(-4px)":"none" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ height:160, overflow:"hidden" }}>
        <img src={blog.img} alt={blog.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s", transform:h?"scale(1.06)":"scale(1)" }} />
      </div>
      <div style={{ padding:16 }}>
        <div style={{ display:"flex", gap:8, marginBottom:8 }}>
          <span style={{ background:"var(--blue-light)", color:"var(--blue-dark)", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:99 }}>{blog.category}</span>
          <span style={{ color:"var(--text-light)", fontSize:11 }}>{blog.readTime}</span>
        </div>
        <div style={{ fontSize:14, fontWeight:600, color:"var(--text)", lineHeight:1.45 }}>{blog.title}</div>
        <div style={{ fontSize:12, color:"var(--text-muted)", marginTop:6, lineHeight:1.55, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{blog.excerpt}</div>
        <div style={{ fontSize:11, color:"var(--text-light)", marginTop:10 }}>📅 {blog.date}</div>
      </div>
    </div>
  );
}

// AppPromo component removed

/* ── Stats Bar ────────────────────────────────────────────────────────────── */
function StatsBar() {
  return (
    <div style={{ background:"#fff", padding:"48px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
      <div className="page-container">
        <div style={{ display:"flex", justifyContent:"center", gap:"clamp(24px,6vw,80px)", flexWrap:"wrap" }}>
          {STATS.map((st, i) => (
            <div key={i} className={`fade-up d${i+1}`} style={{ textAlign:"center" }}>
              <div style={{ width:76, height:76, margin:"0 auto 12px", background:"var(--blue-light)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:30 }}>{st.icon}</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(24px,3vw,32px)", fontWeight:700, color:"var(--navy)" }}>{st.number}</div>
              <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:4 }}>{st.label}</div>
              {st.sub && <div style={{ fontSize:11, color:"var(--blue)", marginTop:2 }}>{st.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Community Section ────────────────────────────────────────────────────── */
function CommunitySection() {
  return (
    <section className="section-pad" style={{ background:"var(--bg)" }}>
      <div className="page-container">
        <SectionHeader title="Our Community" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24, maxWidth:820, margin:"0 auto" }}>
          {COMMUNITY.map((it, i) => <CommCard key={i} item={it} />)}
        </div>
      </div>
    </section>
  );
}
function CommCard({ item }) {
  const [h, setH] = useState(false);
  const [bh, setBh] = useState(false);
  return (
    <div style={{ background:"#fff", border:`1.5px solid ${h?"var(--blue)":"var(--border)"}`, borderRadius:14, padding:24, display:"flex", gap:16, alignItems:"flex-start", transition:"all 0.25s", cursor:"default", boxShadow:h?"var(--shadow)":"none" }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={{ width:60, height:60, borderRadius:10, background:"var(--blue-light)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{item.icon}</div>
      <div>
        <div style={{ fontSize:16, fontWeight:700 }}>{item.title}</div>
        <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:4, lineHeight:1.6 }}>{item.desc}</div>
        <a href={item.href}
          style={{ display:"inline-block", marginTop:12, border:"1.5px solid var(--blue)", color:bh?"#fff":"var(--blue)", background:bh?"var(--blue)":"transparent", padding:"6px 16px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer", transition:"all 0.2s", textDecoration:"none" }}
          onMouseEnter={() => setBh(true)} onMouseLeave={() => setBh(false)}>
          {item.btn}
        </a>
      </div>
    </div>
  );
}
