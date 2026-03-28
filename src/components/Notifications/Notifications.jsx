import { useApp } from "../../context/AppContext";

const COLORS = {
  success: { bg: "#ecfdf5", border: "#10b981", text: "#065f46", icon: "✅" },
  error:   { bg: "#fef2f2", border: "#ef4444", text: "#991b1b", icon: "❌" },
  info:    { bg: "#eff6ff", border: "#3b82f6", text: "#1e40af", icon: "ℹ️" },
  warning: { bg: "#fffbeb", border: "#f59e0b", text: "#92400e", icon: "⚠️" },
};

export default function Notifications() {
  const { notifications } = useApp();
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {notifications.map((n) => {
        const c = COLORS[n.type] || COLORS.info;
        return (
          <div key={n.id} className="scale-in"
            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text, padding: "12px 18px", borderRadius: 10, boxShadow: "var(--shadow-lg)", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, maxWidth: 320, animation: "scaleIn 0.3s ease both" }}>
            <span>{c.icon}</span>
            {n.message}
          </div>
        );
      })}
    </div>
  );
}
