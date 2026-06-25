import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Flame, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      return setError("Les mots de passe ne correspondent pas.");
    }
    if (form.password.length < 6) {
      return setError("Le mot de passe doit contenir au moins 6 caractères.");
    }
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <Flame size={20} /> BRAISE
        </Link>
        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-sub">Rejoignez Braise pour commander en quelques clics.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Nom complet</label>
            <input id="name" required placeholder="Karim Benali" value={form.name} onChange={set("name")} />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required placeholder="vous@exemple.com" value={form.email} onChange={set("email")} />
          </div>
          <div className="form-row">
            <label htmlFor="password">Mot de passe</label>
            <input id="password" type="password" required placeholder="6 caractères minimum" value={form.password} onChange={set("password")} />
          </div>
          <div className="form-row">
            <label htmlFor="confirm">Confirmer le mot de passe</label>
            <input id="confirm" type="password" required placeholder="••••••••" value={form.confirm} onChange={set("confirm")} />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn-primary full" disabled={loading}>
            {loading ? "Création…" : <><UserPlus size={15} /> Créer mon compte</>}
          </button>
        </form>

        <p className="auth-switch">
          Déjà un compte ?{" "}
          <Link to="/login" state={location.state}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
