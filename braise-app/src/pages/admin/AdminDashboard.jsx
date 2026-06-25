import { useEffect, useState } from "react";
import { ShoppingBag, TrendingUp, Clock3, CheckCircle2, Bike, Package } from "lucide-react";
import { seedOrdersIfEmpty } from "../../data/seedOrders";

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ borderColor: color, color }}><Icon size={20} /></div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

const STATUS_MAP = {
  en_preparation: { label: "Reçue",        color: "var(--ash)" },
  en_cuisine:     { label: "En cuisine",    color: "var(--ember)" },
  en_route:       { label: "En route",      color: "var(--cheese)" },
  livree:         { label: "Livrée",        color: "#2ecc71" },
  pret:           { label: "Prête",         color: "#2ecc71" },
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    seedOrdersIfEmpty();
    const all = JSON.parse(localStorage.getItem("braise_all_orders") || "[]");
    setOrders(all);
  }, []);

  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === today);
  const revenue     = orders.reduce((s, o) => s + o.total + (o.mode === "livraison" ? 150 : 0), 0);
  const revenueToday= todayOrders.reduce((s, o) => s + o.total + (o.mode === "livraison" ? 150 : 0), 0);
  const active      = orders.filter((o) => ["en_preparation","en_cuisine","en_route"].includes(o.status));
  const done        = orders.filter((o) => ["livree","pret"].includes(o.status));

  // Top 5 plats les plus commandés
  const dishCount = {};
  orders.forEach((o) => o.items.forEach((it) => {
    dishCount[it.name] = (dishCount[it.name] || 0) + it.qty;
  }));
  const topDishes = Object.entries(dishCount).sort((a,b) => b[1]-a[1]).slice(0,5);
  const maxQty = topDishes[0]?.[1] || 1;

  // Répartition mode
  const livCount   = orders.filter((o) => o.mode === "livraison").length;
  const emportCount= orders.filter((o) => o.mode === "emporter").length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <span className="admin-date">{new Date().toLocaleDateString("fr-DZ", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}</span>
      </div>

      {/* Cartes stats */}
      <div className="stats-grid">
        <StatCard icon={ShoppingBag}  label="Commandes totales"    value={orders.length}          sub={`+${todayOrders.length} aujourd'hui`} color="var(--ember)" />
        <StatCard icon={TrendingUp}   label="Chiffre d'affaires"   value={`${revenue.toLocaleString()} DA`} sub={`${revenueToday.toLocaleString()} DA aujourd'hui`} color="var(--cheese)" />
        <StatCard icon={Clock3}       label="En cours"             value={active.length}           sub="commandes actives"  color="var(--ember)" />
        <StatCard icon={CheckCircle2} label="Livrées / Prêtes"     value={done.length}             sub="commandes terminées" color="#2ecc71" />
      </div>

      <div className="admin-two-col">
        {/* Commandes récentes */}
        <div className="admin-card">
          <h2 className="admin-card-title">Commandes récentes</h2>
          <table className="admin-table">
            <thead>
              <tr><th>#</th><th>Client</th><th>Montant</th><th>Mode</th><th>Statut</th></tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map((o) => {
                const s = STATUS_MAP[o.status] || { label: o.status, color: "var(--ash)" };
                return (
                  <tr key={o.id}>
                    <td className="mono" style={{ color:"var(--ash)", fontSize:"12px" }}>#{String(o.id).slice(-5)}</td>
                    <td>{o.clientName}</td>
                    <td className="mono" style={{ color:"var(--cheese)" }}>{o.total + (o.mode==="livraison"?150:0)} DA</td>
                    <td>
                      <span className="mode-chip">
                        {o.mode === "livraison" ? <Bike size={12}/> : <Package size={12}/>}
                        {o.mode === "livraison" ? "Livraison" : "Emporter"}
                      </span>
                    </td>
                    <td><span className="status-chip" style={{ color:s.color, borderColor:s.color }}>{s.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Panneau droit */}
        <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
          {/* Top plats */}
          <div className="admin-card">
            <h2 className="admin-card-title">Top plats commandés</h2>
            <ul className="top-dishes">
              {topDishes.map(([name, qty]) => (
                <li key={name}>
                  <span className="td-name">{name}</span>
                  <div className="td-bar-wrap">
                    <div className="td-bar" style={{ width:`${(qty/maxQty)*100}%` }} />
                  </div>
                  <span className="mono td-qty">{qty}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mode de commande */}
          <div className="admin-card">
            <h2 className="admin-card-title">Répartition des modes</h2>
            <div className="mode-split">
              <div className="mode-split-bar">
                <div style={{ width:`${(livCount/(livCount+emportCount||1))*100}%`, background:"var(--ember)" }} />
                <div style={{ width:`${(emportCount/(livCount+emportCount||1))*100}%`, background:"var(--cheese)" }} />
              </div>
              <div className="mode-split-legend">
                <span><i style={{ background:"var(--ember)" }} /> Livraison <b>{livCount}</b></span>
                <span><i style={{ background:"var(--cheese)" }} /> À emporter <b>{emportCount}</b></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
