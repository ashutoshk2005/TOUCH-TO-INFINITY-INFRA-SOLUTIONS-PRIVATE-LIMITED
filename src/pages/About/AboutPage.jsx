import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { ABOUT, SITE } from "../../data/content";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <HeroSection />
      <StatsStrip />
      <MissionVision />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <AwardsSection />
      <CtaBanner navigate={navigate} />
      <Footer />
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────────── */
function HeroSection() {
  const { hero } = ABOUT;
  return (
    <div style={{ position: "relative", minHeight: 420, display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Background image — change ABOUT.hero.image in content.js */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${hero.image})`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.22,
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,35,64,0.95) 0%, rgba(26,35,64,0.7) 100%)" }} />
      <div className="page-container" style={{ position: "relative", zIndex: 2, padding: "72px 32px" }}>
        <div className="fade-up" style={{ maxWidth: 640 }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 18, letterSpacing: "1px", textTransform: "uppercase" }}>
            Home &nbsp;/&nbsp; About Us
          </div>
          <h1 className="hero-heading" style={{ color: "#fff", whiteSpace: "pre-line" }}>
            {hero.heading}
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginTop: 18, lineHeight: 1.7, fontWeight: 300, maxWidth: 520 }}>
            {hero.subtext}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <PillBadge>🏠 Est. 2025</PillBadge>
            <PillBadge>🌏 400+ Cities</PillBadge>
            <PillBadge>👨‍👩‍👧‍👦 2M+ Families</PillBadge>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stats strip ────────────────────────────────────────────────────────────── */
function StatsStrip() {
  return (
    <div style={{ background: "var(--blue)", padding: "0" }}>
      <div className="page-container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
          {ABOUT.stats.map((st, i) => (
            <div key={i} className={`fade-up d${i + 1}`}
              style={{ textAlign: "center", padding: "28px 20px", borderRight: i < ABOUT.stats.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
              <div style={{ fontSize: 30, marginBottom: 6 }}>{st.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "#fff" }}>{st.number}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 3 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mission / Vision ──────────────────────────────────────────────────────── */
function MissionVision() {
  const { mission, vision } = ABOUT;
  return (
    <section style={{ padding: "72px 0", background: "#fff" }}>
      <div className="page-container">
        <SectionHeader title="What Drives Us" sub="Our core purpose and long-term direction" />
        <div className="mission-grid">
          {[mission, vision].map((item, i) => (
            <div key={i} className={`fade-up d${i + 1}`}
              style={{ background: i === 0 ? "var(--navy)" : "var(--blue)", borderRadius: 18, padding: "40px 36px" }}>
              <div style={{ fontSize: "clamp(26px,5vw,44px)", marginBottom: 16 }}>{item.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 12 }}>{item.heading}</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.82)", lineHeight: 1.75 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Story ─────────────────────────────────────────────────────────────────── */
function StorySection() {
  const { story } = ABOUT;
  return (
    <section style={{ padding: "72px 0", background: "var(--bg)" }}>
      <div className="page-container">
        <div className="story-grid">
          {/* Image — change ABOUT.story.image in content.js */}
          <div className="fade-up" style={{ borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
            <img src={story.image} alt="Our team" style={{ width: "100%", height: 420, objectFit: "cover" }} />
          </div>
          {/* Text */}
          <div className="fade-up d1">
            <div style={{ fontSize: 12, color: "var(--blue)", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Our Story</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 24 }}>{story.heading}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {story.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.75 }}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Values ────────────────────────────────────────────────────────────────── */
function ValuesSection() {
  return (
    <section style={{ padding: "72px 0", background: "#fff" }}>
      <div className="page-container">
        <SectionHeader title="Our Values" sub="The principles that guide everything we do" />
        <div className="values-grid">
          {ABOUT.values.map((val, i) => (
            <ValueCard key={i} value={val} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ value, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`fade-up d${Math.min(delay, 6)}`}
      style={{ background: hov ? "var(--blue)" : "var(--bg)", border: `1.5px solid ${hov ? "var(--blue)" : "var(--border)"}`, borderRadius: 14, padding: "28px 24px", transition: "all 0.3s", cursor: "default" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ fontSize: 36, marginBottom: 14 }}>{value.icon}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: hov ? "#fff" : "var(--text)", marginBottom: 8 }}>{value.title}</div>
      <p style={{ fontSize: 14, color: hov ? "rgba(255,255,255,0.85)" : "var(--text-muted)", lineHeight: 1.65 }}>{value.desc}</p>
    </div>
  );
}

/* ── Team ──────────────────────────────────────────────────────────────────── */
function TeamSection() {
  return (
    <section style={{ padding: "72px 0", background: "var(--bg)" }}>
      <div className="page-container">
        <SectionHeader title="Meet the Team" sub="The people behind TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED" />
        <div className="team-grid">
          {ABOUT.team.map((member, i) => (
            <TeamCard key={i} member={member} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`fade-up d${Math.min(delay, 6)}`}
      style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: `1px solid ${hov ? "var(--blue)" : "var(--border)"}`, boxShadow: hov ? "var(--shadow-lg)" : "var(--shadow)", transition: "all 0.3s", transform: hov ? "translateY(-4px)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Photo — change member.img in ABOUT.team array in content.js */}
      <div style={{ height: 220, overflow: "hidden", background: "var(--navy)" }}>
        <img src={member.img} alt={member.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 0.4s", transform: hov ? "scale(1.05)" : "scale(1)" }} />
      </div>
      <div style={{ padding: "20px 22px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700 }}>{member.name}</div>
        <div style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.5px" }}>{member.role}</div>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, marginTop: 10 }}>{member.bio}</p>
        {member.linkedin && member.linkedin !== "#" && (
          <a href={member.linkedin} target="_blank" rel="noreferrer"
            style={{ display: "inline-block", marginTop: 12, fontSize: 12, color: "#0077b5", fontWeight: 600, textDecoration: "none" }}>
            🔗 LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Awards ────────────────────────────────────────────────────────────────── */
function AwardsSection() {
  return (
    <section style={{ padding: "60px 0", background: "var(--navy)" }}>
      <div className="page-container">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#fff", fontWeight: 700 }}>Recognition & Awards</h2>
          <div style={{ width: 48, height: 3, background: "var(--blue)", margin: "10px auto 0", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
          {ABOUT.awards.map((award, i) => (
            <div key={i}
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "20px 28px", textAlign: "center", minWidth: 180 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🏆</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{award.label}</div>
              <div style={{ fontSize: 12, color: "var(--blue)", marginTop: 4 }}>{award.org}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA banner ────────────────────────────────────────────────────────────── */
function CtaBanner({ navigate }) {
  return (
    <section style={{ padding: "72px 0", background: "var(--blue)" }}>
      <div className="page-container" style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "#fff" }}>
          Ready to Find Your Dream Home?
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginTop: 12 }}>
          Join 2 million+ Indians who found their home on TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
          <CtaBtn white onClick={() => navigate("/search")}>Browse Properties</CtaBtn>
          <CtaBtn onClick={() => navigate("/post")}>Post Your Property Free</CtaBtn>
          <CtaBtn onClick={() => navigate("/about#contact")}>Contact Us</CtaBtn>
        </div>
      </div>
    </section>
  );
}

/* ── Shared primitives ─────────────────────────────────────────────────────── */
function SectionHeader({ title, sub }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="fade-up" style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700 }}>{title}</h2>
      <div className="fade-up d1" style={{ width: 48, height: 3, background: "var(--blue)", margin: "10px auto 8px", borderRadius: 2 }} />
      {sub && <p className="fade-up d2" style={{ fontSize: 15, color: "var(--text-muted)" }}>{sub}</p>}
    </div>
  );
}

function PillBadge({ children }) {
  return (
    <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 13, padding: "6px 16px", borderRadius: 99 }}>
      {children}
    </span>
  );
}

function CtaBtn({ children, onClick, white }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      style={{ background: white ? (hov ? "#f0f0f0" : "#fff") : (hov ? "rgba(255,255,255,0.18)" : "transparent"), color: white ? "var(--blue)" : "#fff", border: white ? "none" : "2px solid rgba(255,255,255,0.7)", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", transform: hov ? "translateY(-2px)" : "none", boxShadow: hov && white ? "0 8px 24px rgba(0,0,0,0.15)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}
