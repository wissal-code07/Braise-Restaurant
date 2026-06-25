import { X, Bell, CheckCheck, Bike, Package } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 60)   return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  return `Il y a ${Math.floor(diff / 3600)}h`;
}

export default function NotificationPanel() {
  const { notifications, panelOpen, setPanelOpen, markAllRead, markRead, unreadCount } = useNotifications();

  return (
    <>
      {/* Overlay */}
      {panelOpen && (
        <div className="notif-overlay" onClick={() => setPanelOpen(false)} />
      )}

      {/* Panneau */}
      <aside className={`notif-panel ${panelOpen ? "open" : ""}`}>
        <div className="notif-panel-header">
          <span className="notif-panel-title">
            <Bell size={18} /> Notifications
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </span>
          <div style={{ display:"flex", gap:"8px" }}>
            {unreadCount > 0 && (
              <button className="notif-read-all" onClick={markAllRead} title="Tout marquer comme lu">
                <CheckCheck size={16} />
              </button>
            )}
            <button className="icon-btn" onClick={() => setPanelOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="notif-list">
          {notifications.length === 0 && (
            <div className="notif-empty">
              <Bell size={36} />
              <p>Aucune notification</p>
            </div>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`notif-item ${!n.read ? "unread" : ""}`}
              onClick={() => markRead(n.id)}
            >
              <div className="notif-ico">
                {n.mode === "livraison" ? <Bike size={16} /> : <Package size={16} />}
              </div>
              <div className="notif-body">
                <div className="notif-title">
                  Nouvelle commande — <strong>{n.client}</strong>
                </div>
                <div className="notif-desc">{n.item} · {n.total} DA</div>
                <div className="notif-time">{timeAgo(n.createdAt)}</div>
              </div>
              {!n.read && <span className="notif-dot" />}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
