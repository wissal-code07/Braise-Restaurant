import { NavLink, Link, useNavigate } from "react-router-dom";
import { Flame, ShoppingBag, User, LogOut, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { count, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu utilisateur si clic extérieur
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="nav-logo">
        <Flame size={22} className="flame-ico" /> BRAISE
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Accueil</NavLink>
        <NavLink to="/menu" className={({ isActive }) => isActive ? "active" : ""}>Menu</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Points de vente</NavLink>
      </div>

      <div className="nav-actions">
        {/* Bouton panier */}
        <button className="cart-btn" onClick={() => setIsOpen(true)} aria-label="Ouvrir le panier">
          <ShoppingBag size={20} />
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>

        {/* Compte utilisateur */}
        {user ? (
          <div className="user-menu-wrap" ref={menuRef}>
            <button className="user-btn" onClick={() => setUserMenuOpen((v) => !v)}>
              <span className="user-avatar">{user.name[0].toUpperCase()}</span>
              <span className="user-name">{user.name.split(" ")[0]}</span>
              <ChevronDown size={14} className={userMenuOpen ? "rotated" : ""} />
            </button>
            {userMenuOpen && (
              <div className="user-dropdown">
                <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                  <User size={15} /> Mon compte
                </Link>
                <button onClick={handleLogout}>
                  <LogOut size={15} /> Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-cta">Connexion</Link>
        )}
      </div>
    </nav>
  );
}
