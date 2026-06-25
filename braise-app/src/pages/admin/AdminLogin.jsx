import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flame, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const u = await login(form);
      if (u.role !== "admin") {
        throw new Error("Accès réservé aux administrateurs.");
      }
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="auth-card">
        <div className="auth-logo"><Flame size={20} /> BRAISE ADMIN</div>
        <h1 className="auth-title">Espace administrateur</h1>
        <p className="auth-sub">Connectez-vous pour gérer le restaurant.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input type="email" required placeholder="admin@braise.dz"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-row">
            <label>Mot de passe</label>
            <input type="password" required placeholder="••••••••"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn-primary full" disabled={loading}>
            {loading ? "Connexion…" : <><LogIn size={15} /> Accéder au dashboard</>}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:"20px", fontSize:"13px", color:"var(--ash)" }}>
          Identifiants démo : <span style={{color:"var(--cheese)", fontFamily:"monospace"}}>admin@braise.dz / braise2024</span>
        </p>
      </div>
    </div>
  );
}
