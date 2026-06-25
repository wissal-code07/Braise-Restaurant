import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Compte admin par défaut (en prod ce serait côté serveur)
const ADMIN_CREDENTIALS = { email: "admin@braise.dz", password: "braise2024", role: "admin", name: "Admin Braise", id: "admin_001" };

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("braise_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("braise_users") || "[]");
    if (users.find((u) => u.email === email)) throw new Error("Cet email est déjà utilisé.");
    const newUser = { id: Date.now(), name, email, password, role: "client", createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("braise_users", JSON.stringify(users));
    const { password: _, ...safe } = newUser;
    localStorage.setItem("braise_user", JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const login = ({ email, password }) => {
    // Vérifier compte admin d'abord
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const safe = { id: ADMIN_CREDENTIALS.id, name: ADMIN_CREDENTIALS.name, email, role: "admin", createdAt: new Date().toISOString() };
      localStorage.setItem("braise_user", JSON.stringify(safe));
      setUser(safe);
      return safe;
    }
    // Comptes clients
    const users = JSON.parse(localStorage.getItem("braise_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Email ou mot de passe incorrect.");
    const { password: _, ...safe } = found;
    localStorage.setItem("braise_user", JSON.stringify(safe));
    setUser(safe);
    return safe;
  };

  const logout = () => { localStorage.removeItem("braise_user"); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }
