import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Flame, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <Flame size={20} /> BRAISE
        </Link>
        <h1 className="auth-title">Connexion</h1>
        <p className="auth-sub">Bienvenue ! Connectez-vous pour commander.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn-primary full" disabled={loading}>
            {loading ? "Connexion…" : <><LogIn size={15} /> Se connecter</>}
          </button>
        </form>

        <p className="auth-switch">
          Pas encore de compte ?{" "}
          <Link to="/register" state={location.state}>Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
