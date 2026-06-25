import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { items, total, count, isOpen, setIsOpen, updateQty, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`drawer-overlay ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Panneau latéral */}
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <span className="cart-title">
            <ShoppingBag size={18} /> Panier
            {count > 0 && <span className="cart-count">{count}</span>}
          </span>
          <button className="icon-btn" onClick={() => setIsOpen(false)} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={42} />
              <p>Votre panier est vide</p>
              <button className="btn-ghost sm" onClick={() => { setIsOpen(false); navigate("/menu"); }}>
                Voir le menu →
              </button>
            </div>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.name} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price mono">{item.price * item.qty} DA</span>
                  </div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.name, item.qty - 1)}>
                      <Minus size={13} />
                    </button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.name, item.qty + 1)}>
                      <Plus size={13} />
                    </button>
                  </div>
                  <button className="icon-btn danger" onClick={() => removeItem(item.name)}>
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span className="mono">{total} DA</span>
            </div>
            <button className="btn-primary full" onClick={handleCheckout}>
              Commander →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
