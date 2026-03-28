import { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  loadSession, saveSession, clearSession,
  loadWishlist, saveWishlist,
} from "../utils/storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [wishlist, setWishlist] = useState(() =>
    loadSession() ? loadWishlist(loadSession().id) : []
  );
  const [city, setCity] = useState("Delhi");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) saveWishlist(user.id, wishlist);
  }, [wishlist, user]);

  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3500);
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
    saveSession(userData);
    setWishlist(loadWishlist(userData.id));
    addNotification("Welcome, " + userData.name + "! 👋", "success");
  }, [addNotification]);

  const logout = useCallback(() => {
    setUser(null);
    clearSession();
    setWishlist([]);
    addNotification("Logged out successfully.", "info");
  }, [addNotification]);

  const updateProfile = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      saveSession(updated);
      return updated;
    });
    addNotification("Profile updated ✅", "success");
  }, [addNotification]);

  const toggleWishlist = useCallback((propertyId) => {
    setWishlist(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  }, []);

  const isWishlisted = useCallback(
    (propertyId) => wishlist.includes(propertyId),
    [wishlist]
  );

  return (
    <AppContext.Provider value={{
      user, login, logout, updateProfile,
      wishlist, toggleWishlist, isWishlisted,
      city, setCity,
      notifications, addNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
