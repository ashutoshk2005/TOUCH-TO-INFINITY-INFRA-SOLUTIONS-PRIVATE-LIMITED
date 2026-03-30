import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { registerUser, loginUser } from "../../utils/storage";

const delay = ms => new Promise(r => setTimeout(r, ms));

export default function LoginPage() {
  const [params]   = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") === "register" ? "register" : "login");
  const { login, user, addNotification } = useApp();
  const navigate   = useNavigate();
  const from       = params.get("from") || "/";

  useEffect(() => { if (user) navigate(from, { replace: true }); }, [user]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,var(--navy) 0%,var(--navy-light) 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ position: "fixed", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />

      <div className="scale-in" style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link to="/" style={{ display: "inline-block", textDecoration: "none" }}>
            <img src="src/images/logo.png" alt="Touch to Infinity" style={{ width: 150, height: 64, objectFit: 'contain', marginBottom: 8, borderRadius: 12, background: '#fff' }} />
          </Link>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 8 }}>India's most trusted property portal</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "clamp(20px, 5vw, 36px)", boxShadow: "var(--shadow-xl)" }}>
          {/* Tab switcher */}
          <div style={{ display: "flex", background: "var(--bg)", borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {[["login","Login"],["register","Create Account"]].map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)}
                style={{ flex: 1, padding: "9px 0", border: "none", borderRadius: 8, background: tab === key ? "#fff" : "transparent", color: tab === key ? "var(--navy)" : "var(--text-muted)", fontWeight: tab === key ? 700 : 400, fontSize: 14, cursor: "pointer", boxShadow: tab === key ? "var(--shadow-sm)" : "none", transition: "all 0.2s" }}>
                {label}
              </button>
            ))}
          </div>

          {tab === "login"
            ? <LoginForm    login={login} navigate={navigate} from={from} addNotification={addNotification} />
            : <RegisterForm login={login} navigate={navigate} from={from} addNotification={addNotification} />
          }

          <DemoBtn login={login} navigate={navigate} from={from} />
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
          By continuing you agree to our{' '}
          <Link to="/terms-and-conditions" style={{ color: "var(--blue)" }}>Terms</Link>
          {' '} &amp; {' '}
          <Link to="/privacy-policy" style={{ color: "var(--blue)" }}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

/* ── Login form ─────────────────────────────────────────────────────────── */
function LoginForm({ login, navigate, from, addNotification }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err,  setErr]  = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password) { setErr("Please fill in all fields."); return; }
    setLoading(true);
    await delay(650);
    const res = loginUser({ email: form.email, password: form.password });
    setLoading(false);
    if (res.error) { setErr(res.error); return; }
    login(res.user);
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormHeading>Welcome back!</FormHeading>
      <Field label="Email Address" type="email"    placeholder="your@email.com" value={form.email}    onChange={set("email")} />
      <Field label="Password"      type="password" placeholder="Your password"  value={form.password} onChange={set("password")} />
      <div style={{ textAlign: "right", marginTop: -8, marginBottom: 18 }}>
        <button type="button" onClick={() => addNotification("Re-register with a new account to reset your password.", "info")}
          style={{ background: "none", border: "none", color: "var(--blue)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          Forgot password?
        </button>
      </div>
      {err && <ErrBox>{err}</ErrBox>}
      <Btn loading={loading} label="Login" busy="Logging in…" />
      <InfoBox>New here? Switch to <strong>Create Account</strong> to register first, then log in.</InfoBox>
    </form>
  );
}

/* ── Register form ──────────────────────────────────────────────────────── */
function RegisterForm({ login, navigate, from, addNotification }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [err,  setErr]  = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    const { name, email, phone, password, confirm } = form;
    if (!name || !email || !phone || !password)     { setErr("Please fill in all required fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr("Please enter a valid email address."); return; }
    if (password.length < 6)                         { setErr("Password must be at least 6 characters."); return; }
    if (password !== confirm)                         { setErr("Passwords do not match."); return; }
    setLoading(true);
    await delay(750);
    const res = registerUser({ name, email, phone, password });
    setLoading(false);
    if (res.error) { setErr(res.error); return; }
    login(res.user);
    addNotification("🎉 Account created! Welcome to Touch to Infinity Infra Solutions Private LIMITED.", "success");
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormHeading>Create Account </FormHeading>
      <Field label="Full Name *"        type="text"     placeholder="Rahul Sharma"     value={form.name}     onChange={set("name")} />
      <Field label="Email Address *"    type="email"    placeholder="your@email.com"    value={form.email}    onChange={set("email")} />
      <Field label="Phone Number *"     type="tel"      placeholder="+91 98765 43210"   value={form.phone}    onChange={set("phone")} />
      <Field label="Password *"         type="password" placeholder="Min 6 characters"  value={form.password} onChange={set("password")} />
      <Field label="Confirm Password *" type="password" placeholder="Repeat password"   value={form.confirm}  onChange={set("confirm")} />
      {err && <ErrBox>{err}</ErrBox>}
      <Btn loading={loading} label="Create Account" busy="Creating account…" />
      <InfoBox>Your account is saved in your browser's <strong>localStorage</strong> — no server needed. It persists across page refreshes.</InfoBox>
    </form>
  );
}

/* ── Demo shortcut ──────────────────────────────────────────────────────── */
function DemoBtn({ login, navigate, from }) {
  // Demo account removed
  return null;
}

/* ── Reusable primitives ──────────────────────────────────────────────────── */
function FormHeading({ children }) {
  return <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 20 }}>{children}</div>;
}

function Field({ label, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const [show,    setShow]    = useState(false);
  const isPwd = type === "password";
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={isPwd ? (show ? "text" : "password") : type}
          placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: "100%", border: `1.5px solid ${focused ? "var(--blue)" : "var(--border)"}`, borderRadius: 9, padding: `11px ${isPwd ? 44 : 14}px 11px 14px`, fontSize: 14, outline: "none", transition: "border 0.2s" }}
        />
        {isPwd && (
          <button type="button" onClick={() => setShow(s => !s)}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "var(--text-muted)" }}>
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}

function ErrBox({ children }) {
  return (
    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", fontSize: 13, padding: "10px 14px", borderRadius: 8, marginBottom: 16, display: "flex", gap: 8 }}>
      <span>⚠️</span><span>{children}</span>
    </div>
  );
}

function InfoBox({ children }) {
  return (
    <div style={{ background: "var(--blue-light)", border: "1px solid var(--blue-mid)", color: "var(--blue-dark)", fontSize: 12, padding: "10px 14px", borderRadius: 8, marginTop: 12, lineHeight: 1.6 }}>
      💡 {children}
    </div>
  );
}

function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      <span style={{ fontSize: 11, color: "var(--text-light)", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

function Btn({ loading, label, busy }) {
  const [hov, setHov] = useState(false);
  return (
    <button type="submit" disabled={loading}
      style={{ width: "100%", background: hov && !loading ? "var(--blue-dark)" : "var(--blue)", color: "#fff", border: "none", padding: "13px 0", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", opacity: loading ? 0.85 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {loading ? <><Spinner />{busy}</> : label}
    </button>
  );
}

function Spinner() {
  return <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />;
}
