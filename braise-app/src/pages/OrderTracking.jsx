import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CheckCircle2, Clock3, Bike, Package, ChefHat, Flame } from "lucide-react";

const STATUSES = [
  { key: "en_preparation", label: "Commande reçue", desc: "Votre commande est confirmée.", icon: CheckCircle2, delay: 0 },
  { key: "en_cuisine", label: "En cuisine", desc: "Le chef prépare vos plats au feu vif.", icon: ChefHat, delay: 8000 },
  { key: "en_route", label: "En route", desc: "Votre commande est en chemin !", icon: Bike, delay: 20000 },
  { key: "livree", label: "Livrée 🎉", desc: "Bonne dégustation !", icon: Flame, delay: 35000 },
];

const STATUSES_EMPORTER = [
  { key: "en_preparation", label: "Commande reçue", desc: "Votre commande est confirmée.", icon: CheckCircle2, delay: 0 },
  { key: "en_cuisine", label: "En cuisine", desc: "Le chef prépare vos plats au feu vif.", icon: ChefHat, delay: 8000 },
  { key: "pret", label: "Prêt à emporter 🎉", desc: "Votre commande vous attend au comptoir !", icon: Package, delay: 16000 },
];

export default function OrderTracking() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(0);

  useEffect(() => {
    const key = `braise_orders_${user.id}`;
    const orders = JSON.parse(localStorage.getItem(key) || "[]");
    const found = orders.find((o) => String(o.id) === id);
    setOrder(found);
  }, [id, user.id]);

  const statuses = order?.mode === "emporter" ? STATUSES_EMPORTER : STATUSES;

  // Simuler la progression du statut
  useEffect(() => {
    if (!order) return;
    const timers = statuses.map((s, i) =>
      setTimeout(() => setCurrentStatus(i), s.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [order]);

  if (!order) return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <p style={{ color: "var(--ash)" }}>Commande introuvable.</p>
        <Link to="/" className="btn-primary" style={{ marginTop: "16px", display: "inline-flex" }}>Retour à l'accueil</Link>
      </div>
    </div>
  );

  const currentStep = statuses[currentStatus];

  return (
    <div className="tracking-page">
      <div className="tracking-card">
        {/* En-tête */}
        <div className="tracking-header">
          <div className="eyebrow">COMMANDE #{String(order.id).slice(-6)}</div>
          <h1 className="tracking-title">
            <currentStep.icon size={28} className="tracking-ico" />
            {currentStep.label}
          </h1>
          <p className="tracking-desc">{currentStep.desc}</p>
        </div>

        {/* Barre de progression */}
        <div className="progress-track">
          {statuses.map((s, i) => (
            <div key={s.key} className={`progress-step ${i <= currentStatus ? "done" : ""}`}>
              <div className="progress-dot">
                {i <= currentStatus ? <CheckCircle2 size={14} /> : <span />}
              </div>
              <span className="progress-label">{s.label}</span>
              {i < statuses.length - 1 && (
                <div className={`progress-line ${i < currentStatus ? "filled" : ""}`} />
              )}
            </div>
          ))}
        </div>

        {/* Temps estimé */}
        {currentStatus < statuses.length - 1 && (
          <div className="eta-badge">
            <Clock3 size={14} />
            {order.mode === "livraison"
              ? "Livraison estimée : 30 – 45 min"
              : "Prêt à emporter dans : ~8 min"}
          </div>
        )}

        {/* Détails commande */}
        <div className="tracking-details">
          <h3>Détail de la commande</h3>
          <ul className="recap-list">
            {order.items.map((item) => (
              <li key={item.name} className="recap-item">
                <img src={item.image} alt={item.name} />
                <span className="recap-name">{item.name} <em>×{item.qty}</em></span>
                <span className="mono">{item.price * item.qty} DA</span>
              </li>
            ))}
          </ul>
          <div className="aside-total" style={{ marginTop: "16px" }}>
            <span>Total payé</span>
            <span className="mono">
              {order.mode === "livraison" ? order.total + 150 : order.total} DA
            </span>
          </div>
        </div>

        <div className="tracking-actions">
          <Link to="/menu" className="btn-ghost">Repasser une commande</Link>
          <Link to="/profile" className="btn-ghost">Voir mes commandes</Link>
        </div>
      </div>
    </div>
  );
}
