import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Package, Clock3, Bike, User } from "lucide-react";

function statusLabel(s) {
  const map = {
    en_preparation: "Reçue",
    en_cuisine: "En cuisine",
    en_route: "En route",
    livree: "Livrée",
    pret: "Prête",
  };
  return map[s] || s;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem(`braise_orders_${user.id}`) || "[]");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      {/* En-tête compte */}
      <div className="profile-header">
        <div className="profile-avatar">{user.name[0].toUpperCase()}</div>
        <div>
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-since">
            Membre depuis {new Date(user.createdAt).toLocaleDateString("fr-DZ", { year: "numeric", month: "long" })}
          </p>
        </div>
        <button className="btn-ghost logout-btn" onClick={handleLogout}>
          <LogOut size={16} /> Déconnexion
        </button>
      </div>

      {/* Stats rapides */}
      <div className="profile-stats">
        <div className="pstat">
          <b>{orders.length}</b>
          <span>commandes</span>
        </div>
        <div className="pstat">
          <b>{orders.reduce((s, o) => s + o.total, 0)} DA</b>
          <span>dépensés</span>
        </div>
        <div className="pstat">
          <b>{orders.filter((o) => o.mode === "livraison").length}</b>
          <span>livraisons</span>
        </div>
        <div className="pstat">
          <b>{orders.filter((o) => o.mode === "emporter").length}</b>
          <span>à emporter</span>
        </div>
      </div>

      {/* Historique */}
      <div className="orders-section">
        <h2>Historique des commandes</h2>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <Package size={40} />
            <p>Vous n'avez pas encore passé de commande.</p>
            <Link to="/menu" className="btn-primary" style={{ display: "inline-flex", marginTop: "16px" }}>
              Voir le menu
            </Link>
          </div>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-card">
                <div className="order-card-top">
                  <span className="mono order-id">#{String(order.id).slice(-6)}</span>
                  <span className={`order-status ${order.status}`}>{statusLabel(order.status)}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString("fr-DZ", {
                      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </span>
                </div>
                <div className="order-card-body">
                  <div className="order-mode">
                    {order.mode === "livraison" ? <Bike size={14} /> : <Package size={14} />}
                    {order.mode === "livraison" ? "Livraison" : "À emporter"}
                  </div>
                  <ul className="order-items-mini">
                    {order.items.map((item) => (
                      <li key={item.name}>{item.name} ×{item.qty}</li>
                    ))}
                  </ul>
                </div>
                <div className="order-card-foot">
                  <span className="mono order-total">{order.mode === "livraison" ? order.total + 150 : order.total} DA</span>
                  <Link to={`/order/${order.id}`} className="btn-ghost sm">
                    Suivre →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
