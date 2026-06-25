import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Persister le panier en localStorage
  useEffect(() => {
    const stored = localStorage.getItem("braise_cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("braise_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (dish) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === dish.name);
      if (existing) {
        return prev.map((i) =>
          i.name === dish.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...dish, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (name) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  };

  const updateQty = (name, qty) => {
    if (qty <= 0) return removeItem(name);
    setItems((prev) => prev.map((i) => (i.name === name ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, total, count, isOpen, setIsOpen, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
