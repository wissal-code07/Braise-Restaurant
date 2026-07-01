import { NavLink, Link, useNavigate } from "react-router-dom";
import { Flame, ShoppingBag, User, LogOut, ChevronDown, Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart }  from "../context/CartContext";
import { useAuth }  from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const LINKS = [
  { to: "/",       label: "Accueil", end: true },
  { to: "/menu",   label: "Menu" },
  { to: "/contact",label: "Points de vente" },
];

export default function Nav() {
  const [scrolled,     setScrolled]     = useState(false);
  const [userOpen,     setUserOpen]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const { count, setIsOpen } = useCart();
  const { user, logout }     = useAuth();
  const { dark, toggle }     = useTheme();
  const navigate  = useNavigate();
  const menuRef   = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Fermer le menu mobile à chaque navigation
  useEffect(() => { setMobileOpen(false); }, [navigate]);

  const handleLogout = () => { logout(); setUserOpen(false); navigate("/"); };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <Link to="/" className="nav-logo">
          <Flame size={22} className="flame-ico" /> BRAISE
        </Link>

        {/* Liens desktop */}
        <div className="nav-links">
          {LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => isActive ? "active" : ""}>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          {/* Toggle dark/light */}
          <button className="theme-btn" onClick={toggle} aria-label="Changer le thème">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Panier */}
          <button className="cart-btn" onClick={() => setIsOpen(true)} aria-label="Panier">
            <ShoppingBag size={20} />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>

          {/* Compte — desktop uniquement */}
          {user ? (
            <div className="user-menu-wrap nav-desktop-only" ref={menuRef}>
              <button className="user-btn" onClick={() => setUserOpen((v) => !v)}>
                <span className="user-avatar">{user.name[0].toUpperCase()}</span>
                <span className="user-name">{user.name.split(" ")[0]}</span>
                <ChevronDown size={14} className={userOpen ? "rotated" : ""} />
              </button>
              {userOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={() => setUserOpen(false)}>
                    <User size={15} /> Mon compte
                  </Link>
                  <button onClick={handleLogout}>
                    <LogOut size={15} /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-cta nav-desktop-only">Connexion</Link>
          )}

          {/* Burger mobile */}
          <button
            className="burger-btn"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile slide-down */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-links">
          {LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="mobile-menu-footer">
          {user ? (
            <>
              <Link to="/profile" className="mobile-link" onClick={() => setMobileOpen(false)}>
                <User size={16} /> Mon compte
              </Link>
              <button className="mobile-link" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                <LogOut size={16} /> Déconnexion
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary full" onClick={() => setMobileOpen(false)}>
              Connexion
            </Link>
          )}
        </div>
      </div>

      {/* Overlay menu mobile */}
      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
