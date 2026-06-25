import { Plus, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function DishCard({ dish, delay = 0 }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="dish-card reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="dish-img-wrap">
        <img
          src={dish.image}
          alt={dish.name}
          className="dish-img"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="dish-img-fallback" style={{ display: "none" }}>🍽️</div>
        {dish.signature && <span className="dish-badge">Signature</span>}
      </div>
      <div className="dish-body">
        <h3>{dish.name}</h3>
        <p>{dish.desc}</p>
        <div className="dish-footer">
          <div className="dish-price mono">{dish.price} DA</div>
          <button
            className={`add-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
            aria-label={`Ajouter ${dish.name} au panier`}
          >
            {added ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
