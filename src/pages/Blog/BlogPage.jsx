import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { BLOGS } from "../../data/content";

const CATEGORIES = ["All", ...Array.from(new Set(BLOGS.map(b => b.category)))];

/* ════════════════════════════════════════════════════════════
   BLOG LIST PAGE  — /blog
════════════════════════════════════════════════════════════ */
export function BlogListPage() {
  const navigate = useNavigate();
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");

  const filtered = BLOGS.filter(b => {
    const matchCat = category === "All" || b.category === category;
    const q = search.toLowerCase();
    const matchQ = !q || b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q) || b.tags?.some(t => t.toLowerCase().includes(q));
    return matchCat && matchQ;
  });

  const featured = BLOGS[0]; // first blog is featured

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)", padding: "56px 0 48px" }}>
        <div className="page-container" style={{ textAlign: "center" }}>
          <div className="fade-up" style={{ fontSize: 11, color: "var(--blue)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>
            TOUCH TO INFINITY INFRA SOLUTIONS PRIVATE LIMITED Blog
          </div>
          <h1 className="fade-up d1" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,5vw,42px)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            Real Estate Insights &amp;<br />Expert Guides
          </h1>
          <p className="fade-up d2" style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginTop: 14, maxWidth: 480, margin: "14px auto 0" }}>
            Stay informed with the latest market trends, buying guides, and investment tips from our experts.
          </p>

          {/* Search */}
          <div className="fade-up d3" style={{ display: "flex", maxWidth: 480, margin: "28px auto 0", background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles, topics, tags…"
              style={{ flex: 1, border: "none", outline: "none", padding: "13px 18px", fontSize: 14 }} />
            {search && (
              <button onClick={() => setSearch("")} style={{ background: "none", border: "none", padding: "0 12px", color: "var(--text-muted)", cursor: "pointer", fontSize: 16 }}>✕</button>
            )}
            <button style={{ background: "var(--blue)", border: "none", padding: "0 20px", color: "#fff", fontSize: 18, cursor: "pointer" }}>🔍</button>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {/* Category pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {CATEGORIES.map(cat => (
            <CategoryPill key={cat} label={cat} active={category === cat} onClick={() => setCategory(cat)} />
          ))}
        </div>

        {/* Featured post (shown only when no filter) */}
        {!search && category === "All" && (
          <FeaturedPost blog={featured} navigate={navigate} />
        )}

        {/* Results count */}
        <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20, marginTop: 8 }}>
          {filtered.length === 0
            ? "No articles found."
            : <><strong style={{ color: "var(--text)" }}>{filtered.length}</strong> article{filtered.length !== 1 ? "s" : ""} found</>
          }
        </div>

        {/* Grid */}
        {filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {filtered.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} delay={(i % 4) + 1} navigate={navigate} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "52px 0" }}>
            <div style={{ fontSize: 56 }}>📰</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, marginTop: 16 }}>No articles found</div>
            <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Try a different search term or category.</p>
            <button onClick={() => { setSearch(""); setCategory("All"); }}
              style={{ marginTop: 20, background: "var(--blue)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 9, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   BLOG DETAIL PAGE  — /blog/:id
════════════════════════════════════════════════════════════ */
export function BlogDetailPage() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const blog       = BLOGS.find(b => b.id === Number(id));
  const related    = BLOGS.filter(b => b.id !== Number(id) && b.category === blog?.category).slice(0, 3);

  if (!blog) return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ fontSize: 64 }}>📄</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>Article Not Found</div>
      <button onClick={() => navigate("/blog")}
        style={{ background: "var(--blue)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 9, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
        Back to Blog
      </button>
    </div>
  );

  // Parse simple markdown-ish: **bold**, numbered lists, paragraphs
  const renderBody = (text) => {
    return text.split("\n\n").map((block, i) => {
      if (block.startsWith("**") && block.endsWith("**")) {
        return <h3 key={i} style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginTop: 28, marginBottom: 10, color: "var(--navy)" }}>{block.replace(/\*\*/g, "")}</h3>;
      }
      if (/^\d+\./.test(block.trim())) {
        const items = block.trim().split("\n").filter(l => /^\d+\./.test(l.trim()));
        return (
          <ol key={i} style={{ paddingLeft: 22, margin: "14px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((item, j) => (
              <li key={j} style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7 }}>
                {item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
              </li>
            ))}
          </ol>
        );
      }
      // Handle bullet lists
      if (block.trim().startsWith("-")) {
        const items = block.trim().split("\n").filter(l => l.trim().startsWith("-"));
        return (
          <ul key={i} style={{ paddingLeft: 22, margin: "14px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((item, j) => {
              const cleaned = item.replace(/^-\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1");
              return <li key={j} style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7 }}>{cleaned}</li>;
            })}
          </ul>
        );
      }
      // Bold inline
      const parts = block.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 4 }}>
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: "var(--text)", fontWeight: 700 }}>{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero image — change blog.img in BLOGS array in content.js */}
      <div style={{ position: "relative", height: 420, overflow: "hidden", background: "var(--navy)" }}>
        <img src={blog.img} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,35,64,0.95) 0%, rgba(26,35,64,0.3) 100%)" }} />
        <div className="page-container" style={{ position: "absolute", bottom: 36, left: 0, right: 0 }}>
          <div className="fade-up">
            <Link to="/blog" style={{ fontSize: 13, color: "var(--blue)", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5, marginBottom: 14 }}>
              ← Back to Blog
            </Link>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{ background: "var(--blue)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 }}>{blog.category}</span>
              <span style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", fontSize: 11, padding: "4px 12px", borderRadius: 99 }}>{blog.readTime}</span>
            </div>
            <h1 className="hero-heading" style={{ color: "#fff", maxWidth: 760 }}>{blog.title}</h1>
          </div>
        </div>
      </div>

      <div className="page-container" style={{ paddingTop: 36, paddingBottom: 60 }}>
        <div className="blog-detail-layout">
          {/* Article */}
          <article>
            {/* Author + date */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 0", borderBottom: "1px solid var(--border)", marginBottom: 32 }}>
              {/* Author image — change blog.authorImg in BLOGS in content.js */}
              <img src={blog.authorImg} alt={blog.author}
                style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--blue)" }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{blog.author}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📅 {blog.date}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                <ShareBtn label="Share" icon="📤" />
              </div>
            </div>

            {/* Body */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {renderBody(blog.body)}
            </div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>Tags:</span>
                {blog.tags.map(tag => (
                  <span key={tag} style={{ background: "var(--blue-light)", color: "var(--blue-dark)", fontSize: 12, padding: "4px 12px", borderRadius: 99 }}>{tag}</span>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: 90 }}>
            {/* Author card */}
            <div style={{ background: "#fff", borderRadius: 14, border: "1px solid var(--border)", padding: 22, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", color: "var(--text-muted)", marginBottom: 14 }}>About the Author</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <img src={blog.authorImg} alt={blog.author} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{blog.author}</div>
                  <div style={{ fontSize: 12, color: "var(--blue)", fontWeight: 500 }}>Real Estate Expert</div>
                </div>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid var(--border)", padding: 22 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", color: "var(--text-muted)", marginBottom: 14 }}>Related Articles</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {related.map(r => (
                    <Link key={r.id} to={`/blog/${r.id}`}
                      style={{ display: "flex", gap: 12, textDecoration: "none", alignItems: "flex-start" }}>
                      <img src={r.img} alt={r.title} style={{ width: 64, height: 50, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{r.title}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>{r.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────────── */
function FeaturedPost({ blog, navigate }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="fade-up featured-post-grid"
      onClick={() => navigate(`/blog/${blog.id}`)}
      style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: `1px solid ${hov ? "var(--blue)" : "var(--border)"}`, boxShadow: hov ? "var(--shadow-lg)" : "var(--shadow)", cursor: "pointer", marginBottom: 36, transition: "all 0.3s", transform: hov ? "translateY(-3px)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Image — change BLOGS[0].img in content.js */}
      <div style={{ overflow: "hidden", height: 280 }}>
        <img src={blog.img} alt={blog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", transform: hov ? "scale(1.05)" : "scale(1)" }} />
      </div>
      <div style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <span style={{ background: "var(--blue)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 99 }}>FEATURED</span>
          <span style={{ background: "var(--blue-light)", color: "var(--blue-dark)", fontSize: 10, fontWeight: 600, padding: "4px 10px", borderRadius: 99 }}>{blog.category}</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, lineHeight: 1.35, marginBottom: 12 }}>{blog.title}</h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{blog.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
          <img src={blog.authorImg} alt={blog.author} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>{blog.author}</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>· {blog.date} · {blog.readTime}</span>
        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog, delay, navigate }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`fade-up d${delay}`}
      onClick={() => navigate(`/blog/${blog.id}`)}
      style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: `1px solid ${hov ? "var(--blue)" : "var(--border)"}`, boxShadow: hov ? "var(--shadow-lg)" : "var(--shadow)", cursor: "pointer", transition: "all 0.3s", transform: hov ? "translateY(-4px)" : "none" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Image — change blog.img in BLOGS array in content.js */}
      <div style={{ height: 190, overflow: "hidden" }}>
        <img src={blog.img} alt={blog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <span style={{ background: "var(--blue-light)", color: "var(--blue-dark)", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>{blog.category}</span>
          <span style={{ color: "var(--text-light)", fontSize: 11 }}>{blog.readTime}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, lineHeight: 1.4, color: "var(--text)", marginBottom: 8 }}>{blog.title}</h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{blog.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border-light)" }}>
          <img src={blog.authorImg} alt={blog.author} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{blog.author}</span>
          <span style={{ fontSize: 11, color: "var(--text-light)", marginLeft: "auto" }}>{blog.date}</span>
        </div>
      </div>
    </div>
  );
}

function CategoryPill({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      style={{ padding: "7px 18px", borderRadius: 99, border: `1.5px solid ${active ? "var(--blue)" : "var(--border)"}`, background: active ? "var(--blue)" : "#fff", color: active ? "#fff" : "var(--text)", fontSize: 13, fontWeight: active ? 700 : 400, cursor: "pointer", transition: "all 0.2s" }}>
      {label}
    </button>
  );
}

function ShareBtn({ label, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", border: `1px solid ${hov ? "var(--blue)" : "var(--border)"}`, borderRadius: 8, background: hov ? "var(--blue-light)" : "#fff", color: hov ? "var(--blue)" : "var(--text-muted)", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => { navigator.clipboard?.writeText(window.location.href); }}>
      {icon} {label}
    </button>
  );
}
