import { useEffect, useState } from "react";
import { seedOrdersIfEmpty } from "../../data/seedOrders";
import { Bike, Package, ChevronDown, Search } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "en_preparation", label: "Reçue",       color: "var(--ash)" },
  { value: "en_cuisine",     label: "En cuisine",  color: "var(--ember)" },
  { value: "en_route",       label: "En route",    color: "var(--cheese)" },
  { value: "livree",         label: "Livrée",      color: "#2ecc71" },
  { value: "pret",           label: "Prête",       color: "#2ecc71" },
];

const FILTER_TABS = ["Toutes", "Actives", "Livrées"];

export default function AdminOrders() {
  const [orders, setOrders]   = useState([]);
  const [tab, setTab]         = useState("Toutes");
  const [search, setSearch]   = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    seedOrdersIfEmpty();
    setOrders(JSON.parse(localStorage.getItem("braise_all_orders") || "[]"));
  }, []);

  const save = (updated) => {
    setOrders(updated);
    localStorage.setItem("braise_all_orders", JSON.stringify(updated));
  };

  const updateStatus = (id, status) => {
    save(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const filtered = orders
    .filter((o) => {
      if (tab === "Actives") return ["en_preparation","en_cuisine","en_route"].includes(o.status);
      if (tab === "Livrées") return ["livree","pret"].includes(o.status);
      return true;
    })
    .filter((o) =>
      !search ||
      o.clientName?.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search)
    );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Commandes</h1>
        <span className="admin-date">{orders.length} commandes au total</span>
      </div>

      {/* Filtres */}
      <div className="orders-toolbar">
        <div className="filter-tabs">
          {FILTER_TABS.map((t) => (
            <button key={t} className={`tab-btn ${tab===t?"active":""}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="search-box">
          <Search size={15} />
          <input placeholder="Rechercher par client ou #ID…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table commandes */}
      <div className="admin-card" style={{ padding:0, overflow:"hidden" }}>
        <table className="admin-table full">
          <thead>
            <tr>
              <th>#</th><th>Client</th><th>Date</th><th>Mode</th>
              <th>Montant</th><th>Statut</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign:"center", padding:"32px", color:"var(--ash)" }}>Aucune commande trouvée.</td></tr>
            )}
            {filtered.map((o) => {
              const s = STATUS_OPTIONS.find((s) => s.value === o.status) || STATUS_OPTIONS[0];
              const isOpen = expanded === o.id;
              const amount = o.total + (o.mode === "livraison" ? 150 : 0);
              return (
                <>
                  <tr key={o.id} className={`order-row ${isOpen?"open":""}`} onClick={() => setExpanded(isOpen ? null : o.id)}>
                    <td className="mono" style={{ fontSize:"12px", color:"var(--ash)" }}>#{String(o.id).slice(-5)}</td>
                    <td style={{ fontWeight:500 }}>{o.clientName}</td>
                    <td style={{ fontSize:"13px", color:"var(--ash)" }}>
                      {new Date(o.createdAt).toLocaleString("fr-DZ", { day:"2-digit", month:"short", hour:"2-digit", minute:"2-digit" })}
                    </td>
                    <td>
                      <span className="mode-chip">
                        {o.mode === "livraison" ? <Bike size={12}/> : <Package size={12}/>}
                        {o.mode === "livraison" ? "Livraison" : "Emporter"}
                      </span>
                    </td>
                    <td className="mono" style={{ color:"var(--cheese)" }}>{amount} DA</td>
                    <td><span className="status-chip" style={{ color:s.color, borderColor:s.color }}>{s.label}</span></td>
                    <td><ChevronDown size={16} style={{ color:"var(--ash)", transform: isOpen?"rotate(180deg)":"none", transition:"transform .2s" }} /></td>
                  </tr>

                  {isOpen && (
                    <tr key={`${o.id}-detail`} className="order-detail-row">
                      <td colSpan={7}>
                        <div className="order-detail">
                          <div className="order-detail-items">
                            <strong>Plats commandés</strong>
                            <ul>
                              {o.items.map((it) => (
                                <li key={it.name}>
                                  <img src={it.image} alt={it.name} />
                                  <span>{it.name} <em>×{it.qty}</em></span>
                                  <span className="mono">{it.price * it.qty} DA</span>
                                </li>
                              ))}
                            </ul>
                            {o.address && <p className="detail-address">📍 {o.address}</p>}
                            {o.phone   && <p className="detail-address">📞 {o.phone}</p>}
                            {o.note    && <p className="detail-address">📝 {o.note}</p>}
                          </div>
                          <div className="order-detail-status">
                            <strong>Changer le statut</strong>
                            <div className="status-buttons">
                              {STATUS_OPTIONS.filter((s) =>
                                o.mode === "emporter"
                                  ? s.value !== "en_route" && s.value !== "livree"
                                  : s.value !== "pret"
                              ).map((s) => (
                                <button
                                  key={s.value}
                                  className={`status-btn ${o.status === s.value ? "active" : ""}`}
                                  style={{ "--sc": s.color }}
                                  onClick={(e) => { e.stopPropagation(); updateStatus(o.id, s.value); }}
                                >
                                  {s.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
