import { Link } from "react-router-dom";
import { useState } from "react";
import { FOOTER_LINKS, SITE } from "../../data/content";

// ── Footer nav links — router-aware ──────────────────────────────────────────
const FOOTER_NAV = {
  Company: [
    { label: "About Us",           to: "/about"   },
    { label: "Blog",               to: "/blog"    },
    { label: "Contact Us",         to: "/contact" },
    { label: "Careers",            to: "#"        },
    { label: "Press & Media",      to: "#"        },
  ],
  Services: [
    { label: "Buy Property",       to: "/search?listing=Buy"  },
    { label: "Rent Property",      to: "/search?listing=Rent" },
    { label: "Post Property Free", to: "/post"                },
    
    { label: "Property Valuation", to: "#"                    },
  ],
  Legal: [
    { label: "Terms & Conditions", to: "#" },
    { label: "Privacy Policy",     to: "#" },
    { label: "Refund Policy",      to: "#" },
    { label: "Cookie Policy",      to: "#" },
  ],
};

export default function Footer() {
  return (
    <footer>
      {/* SEO city links */}
      <div style={{ background: "#fff", padding: "40px 0", borderTop: "1px solid var(--border)" }}>
        <div className="page-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 28, marginBottom: 28 }}>
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--text)", marginBottom: 10, borderLeft: "3px solid var(--blue)", paddingLeft: 8 }}>
                  {title}
                </div>
                <div style={{ fontSize: 12, lineHeight: 2 }}>
                  {links.map((link, i) => (
                    <span key={i}>
                      <a href="#" style={{ color: "var(--blue)", textDecoration: "none" }}
                        onMouseEnter={e => e.target.style.textDecoration = "underline"}
                        onMouseLeave={e => e.target.style.textDecoration = "none"}>
                        {link}
                      </a>
                      {i < links.length - 1 && <span style={{ color: "var(--text-light)" }}> / </span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", padding: "16px 0", borderTop: "1px solid var(--border)", lineHeight: 1.7 }}>
            Read More About TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED.*{" "}
            <a href="#" style={{ color: "var(--blue)" }}>Read more..</a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ background: "var(--navy)", padding: "48px 0 24px" }}>
        <div className="page-container">
          <div className="footer-main-cols">

            {/* Brand column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                <img src="src/data/logo.png" alt="Touch to Infinity" style={{ width: 100, height: 38, objectFit: 'contain', borderRadius: 9, background: '#fff', flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#fff", fontWeight: 700 }}>
                  
                </span>
              </Link>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 260 }}>
                India's most trusted real estate portal. Find your dream home across 400+ cities.
              </p>
              {/* Contact snippets */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <a href={`tel:${SITE.phone}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
                  📞 <span>{SITE.phone}</span>
                </a>
                <a href={`mailto:${SITE.email}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", textDecoration: "none", display: "flex", alignItems: "center", gap: 7 }}>
                  ✉️ <span>{SITE.email}</span>
                </a>
              </div>
              {/* Social */}
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", marginBottom: 8 }}>Follow Us</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { icon: "f",  href: SITE.social.facebook  },
                    { icon: "𝕏",  href: SITE.social.twitter   },
                    { icon: "in", href: SITE.social.linkedin   },
                    { icon: "▶",  href: SITE.social.youtube    },
                    { icon: "📸", href: SITE.social.instagram  },
                  ].map((s, i) => <SocialBtn key={i} icon={s.icon} href={s.href} />)}
                </div>
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(FOOTER_NAV).map(([title, links]) => (
              <FooterCol key={title} title={title} links={links} />
            ))}
          </div>

          {/* App download + bottom bar */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              © {new Date().getFullYear()} TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED · All rights reserved.
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
        {title}
      </div>
      <ul style={{ listStyle: "none" }}>
        {links.map(({ label, to }) => (
          <li key={label} style={{ marginBottom: 8 }}>
            <Link to={to} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialBtn({ icon, href }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      style={{ width: 32, height: 32, borderRadius: "50%", background: hov ? "var(--blue)" : "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: hov ? "#fff" : "rgba(255,255,255,0.65)", textDecoration: "none", transition: "all 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon}
    </a>
  );
}
