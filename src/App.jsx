import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import Navbar            from "./components/Navbar/Navbar";
import BottomNav         from "./components/BottomNav/BottomNav";
import Notifications     from "./components/Notifications/Notifications";
import HomePage           from "./pages/Home/HomePage";
import SearchPage         from "./pages/Search/SearchPage";
import PropertyDetailPage from "./pages/PropertyDetail/PropertyDetailPage";
import LoginPage          from "./pages/Login/LoginPage";
import WishlistPage       from "./pages/Wishlist/WishlistPage";
import PostPropertyPage   from "./pages/PostProperty/PostPropertyPage";
import ProfilePage        from "./pages/Profile/ProfilePage";
import AboutPage          from "./pages/About/AboutPage";
import { BlogListPage, BlogDetailPage } from "./pages/Blog/BlogPage";
import ContactPage        from "./pages/Contact/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="app-main-layout">{children}</main>
      <BottomNav />
    </>
  );
}

function NotFound() {
  return (
    <Layout>
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", padding: 24 }}>
        <div style={{ fontSize: 72 }}>🏚️</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700 }}>404 — Page Not Found</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 340 }}>The page you're looking for doesn't exist.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/" style={{ background: "var(--blue)", color: "#fff", padding: "11px 26px", borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Go Home</Link>
          <Link to="/search" style={{ background: "transparent", color: "var(--blue)", border: "2px solid var(--blue)", padding: "11px 26px", borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Browse Properties</Link>
        </div>
      </div>
    </Layout>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login"        element={<LoginPage />} />
        <Route path="/"             element={<Layout><HomePage /></Layout>} />
        <Route path="/search"       element={<Layout><SearchPage /></Layout>} />
        <Route path="/property/:id" element={<Layout><PropertyDetailPage /></Layout>} />
        <Route path="/wishlist"     element={<Layout><WishlistPage /></Layout>} />
        <Route path="/post"         element={<Layout><PostPropertyPage /></Layout>} />
        <Route path="/profile"      element={<Layout><ProfilePage /></Layout>} />
        <Route path="/about"        element={<Layout><AboutPage /></Layout>} />
        <Route path="/contact"      element={<Layout><ContactPage /></Layout>} />
        <Route path="/blog"         element={<Layout><BlogListPage /></Layout>} />
        <Route path="/blog/:id"     element={<Layout><BlogDetailPage /></Layout>} />
        <Route path="*"             element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
        <Notifications />
      </AppProvider>
    </BrowserRouter>
  );
}
