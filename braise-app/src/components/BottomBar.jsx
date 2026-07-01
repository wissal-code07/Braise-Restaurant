import { NavLink, useNavigate } from "react-router-dom";
import { Home, UtensilsCrossed, ShoppingBag, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ITEMS = [
  { to: "/",       label: "Accueil", icon: Home,            end: true },
  { to: "/menu",   label: "Menu",    icon: UtensilsCrossed         },
];

export default function BottomBar() {
  const { count, setIsOpen } = useCart();
  const { user }             = useAuth();
  const navigate             = useNavigate();

  return (
    <nav className="bottom-bar">
      {ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end}
          className={({ isActive }) => `bb-item ${isActive ? "active" : ""}`}>
          <Icon size={22} />
          <span>{label}</span>
        </NavLink>
      ))}

      {/* Panier */}
      <button className="bb-item" onClick={() => setIsOpen(true)}>
        <span className="bb-cart-wrap">
          <ShoppingBag size={22} />
          {count > 0 && <span className="bb-badge">{count}</span>}
        </span>
        <span>Panier</span>
      </button>

      {/* Profil / Connexion */}
      {user ? (
        <NavLink to="/profile"
          className={({ isActive }) => `bb-item ${isActive ? "active" : ""}`}>
          <span className="bb-avatar">{user.name[0].toUpperCase()}</span>
          <span>Profil</span>
        </NavLink>
      ) : (
        <button className="bb-item" onClick={() => navigate("/login")}>
          <User size={22} />
          <span>Connexion</span>
        </button>
      )}
    </nav>
  );
}
