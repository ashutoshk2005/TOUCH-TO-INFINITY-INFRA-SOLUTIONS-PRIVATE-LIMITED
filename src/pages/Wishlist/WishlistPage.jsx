import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { PROPERTIES } from "../../data/content";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Footer from "../../components/Footer/Footer";

export default function WishlistPage() {
  const { wishlist, user } = useApp();
  const navigate = useNavigate();
  const wishedProps = PROPERTIES.filter(p => wishlist.includes(p.id));

  if (!user) return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <div style={{ fontSize: 64 }}>🔐</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>Login to view your wishlist</div>
      <p style={{ color: "var(--text-muted)", fontSize: 15 }}>Save properties and come back to them anytime.</p>
      <button onClick={() => navigate("/login")} style={{ background: "var(--blue)", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
        Login / Sign Up
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="page-container" style={{ paddingTop: 36, paddingBottom: 52 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>My Wishlist</h1>
          <div style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 6 }}>
            {wishedProps.length === 0 ? "You haven't saved any properties yet." : `${wishedProps.length} saved ${wishedProps.length === 1 ? "property" : "properties"}`}
          </div>
        </div>

        {wishedProps.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0" }}>
            <div style={{ fontSize: 80 }}>🏠</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, marginTop: 20 }}>No saved properties yet</div>
            <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: 15 }}>Browse properties and tap ❤️ to save them here.</p>
            <button onClick={() => navigate("/search")} style={{ marginTop: 24, background: "var(--blue)", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Browse Properties
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
            {wishedProps.map((p, i) => <PropertyCard key={p.id} prop={p} delay={(i % 4) + 1} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
