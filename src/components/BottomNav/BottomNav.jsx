import { NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const ITEMS = [
  { to: "/", label: "Home", icon: "🏠", end: true },
  { to: "/search", label: "Search", icon: "🔍" },
  { to: "/post", label: "Post", icon: "➕" },
  { to: "/wishlist", label: "Saved", icon: "♡", badge: "wishlist" },
  { to: "/profile", label: "You", icon: "👤" },
];

export default function BottomNav() {
  const { wishlist } = useApp();

  return (
    <nav
      className="show-mobile-flex"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 150,
        background: "var(--navy)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "5px 2px calc(5px + env(safe-area-inset-bottom, 0px))",
        justifyContent: "space-between",
        alignItems: "stretch",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
      }}
      aria-label="Mobile navigation"
    >
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            textDecoration: "none",
            fontSize: 9,
            fontWeight: 600,
            color: isActive ? "var(--blue-mid)" : "rgba(255,255,255,0.62)",
            flex: "1 1 0",
            minWidth: 0,
            padding: "3px 1px",
            borderRadius: 8,
            background: isActive ? "rgba(144,202,249,0.12)" : "transparent",
          })}
        >
          <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 17, lineHeight: 1 }} aria-hidden>{item.icon}</span>
            {item.badge === "wishlist" && wishlist.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -8,
                  minWidth: 15,
                  height: 15,
                  padding: "0 4px",
                  borderRadius: 99,
                  background: "var(--orange)",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 700,
                  lineHeight: "15px",
                  textAlign: "center",
                }}
              >
                {wishlist.length > 9 ? "9+" : wishlist.length}
              </span>
            )}
          </span>
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
