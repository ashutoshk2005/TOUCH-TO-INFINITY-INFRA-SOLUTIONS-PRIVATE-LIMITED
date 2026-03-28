// ─── localStorage helpers ───────────────────────────────────────────────────
// All data is namespaced under "hq_" to avoid collisions.

export const LS = {
  get(key) {
    try { return JSON.parse(localStorage.getItem("hq_" + key)); }
    catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem("hq_" + key, JSON.stringify(value)); }
    catch (e) { console.warn("localStorage write failed:", e); }
  },
  remove(key) {
    localStorage.removeItem("hq_" + key);
  },
};

// ─── User store ──────────────────────────────────────────────────────────────
// users: [{ id, name, email, phone, password, createdAt }]
export function getUsers() {
  return LS.get("users") || [];
}
export function saveUsers(users) {
  LS.set("users", users);
}
export function findUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}
export function registerUser({ name, email, phone, password }) {
  const users = getUsers();
  if (findUserByEmail(email)) return { error: "An account with this email already exists." };
  const user = { id: Date.now(), name, email: email.toLowerCase(), phone, password, createdAt: new Date().toISOString() };
  saveUsers([...users, user]);
  return { user: sanitize(user) };
}
export function loginUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) return { error: "No account found with this email." };
  if (user.password !== password) return { error: "Incorrect password." };
  return { user: sanitize(user) };
}
function sanitize(u) {
  const { password, ...safe } = u; // never expose password in state
  return safe;
}

// ─── Session ─────────────────────────────────────────────────────────────────
export function saveSession(user) { LS.set("session", user); }
export function loadSession()    { return LS.get("session"); }
export function clearSession()   { LS.remove("session"); }

// ─── Wishlist ────────────────────────────────────────────────────────────────
export function loadWishlist(userId) { return LS.get("wishlist_" + userId) || []; }
export function saveWishlist(userId, list) { LS.set("wishlist_" + userId, list); }

// ─── Posted properties ───────────────────────────────────────────────────────
export function getPostedProperties() { return LS.get("posted_props") || []; }
export function savePostedProperty(prop) {
  const all = getPostedProperties();
  const newProp = { ...prop, id: Date.now(), postedAt: new Date().toISOString(), status: "PENDING" };
  LS.set("posted_props", [newProp, ...all]);
  return newProp;
}
