import { NavLink, useNavigate } from "react-router-dom";
import { Flame, LayoutDashboard, ClipboardList, UtensilsCrossed, LogOut, ExternalLink, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";

const NAV = [
  { to: "/admin",        label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Commandes", icon: ClipboardList },
  { to: "/admin/menu",   label: "Menu",      icon: UtensilsCrossed },
];

export default function AdminSidebar() {
  const { user, logout }                    = useAuth();
  const { unreadCount, setPanelOpen }       = useNotifications();
  const navigate                            = useNavigate();

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <Flame size={20} className="admin-logo-ico" /> BRAISE
        <span className="admin-badge">ADMIN</span>
      </div>

      <nav className="admin-nav">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to} to={to} end={end}
            className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}
          >
            <Icon size={18} /> {label}
          </NavLink>
        ))}

        {/* Bouton notifications */}
        <button
          className="admin-link notif-trigger"
          onClick={() => setPanelOpen((v) => !v)}
        >
          <span className="notif-bell-wrap">
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="notif-bell-badge">{unreadCount}</span>
            )}
          </span>
          Notifications
        </button>
      </nav>

      <div className="admin-sidebar-footer">
        <div className="admin-user">
          <span className="admin-user-avatar">{user?.name?.[0]?.toUpperCase()}</span>
          <div>
            <div className="admin-user-name">{user?.name}</div>
            <div className="admin-user-role">Administrateur</div>
          </div>
        </div>
        <div className="admin-sidebar-actions">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-link-small">
            <ExternalLink size={14} /> Voir le site
          </a>
          <button onClick={handleLogout} className="admin-link-small danger">
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}
