import { createContext, useContext, useState, useEffect, useRef } from "react";

const NotificationContext = createContext(null);

const FAKE_CLIENTS = ["Karim B.", "Amira L.", "Yacine D.", "Nour M.", "Riad K.", "Sara T."];
const FAKE_ITEMS   = ["Le Brasero ×2", "Tacos Flamme ×1", "Pizza Incandescente ×1", "Ailes de Feu ×3", "Tenders Grillés ×2"];
const FAKE_MODES   = ["livraison", "emporter"];

function fakeOrder() {
  const client = FAKE_CLIENTS[Math.floor(Math.random() * FAKE_CLIENTS.length)];
  const item   = FAKE_ITEMS[Math.floor(Math.random() * FAKE_ITEMS.length)];
  const mode   = FAKE_MODES[Math.floor(Math.random() * FAKE_MODES.length)];
  const total  = 400 + Math.floor(Math.random() * 900);
  return {
    id: Date.now(),
    client,
    item,
    mode,
    total,
    createdAt: new Date().toISOString(),
    read: false,
  };
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [toast, setToast]                 = useState(null);
  const [panelOpen, setPanelOpen]         = useState(false);
  const toastTimer = useRef(null);

  // Simuler une nouvelle commande toutes les ~30s
  useEffect(() => {
    const interval = setInterval(() => {
      const notif = fakeOrder();
      setNotifications((prev) => [notif, ...prev]);
      setToast(notif);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(null), 4500);
    }, 30000);
    // Première notif après 8s pour que l'admin voit vite le système
    const first = setTimeout(() => {
      const notif = fakeOrder();
      setNotifications([notif]);
      setToast(notif);
      toastTimer.current = setTimeout(() => setToast(null), 4500);
    }, 8000);
    return () => { clearInterval(interval); clearTimeout(first); clearTimeout(toastTimer.current); };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const dismissToast = () => {
    setToast(null);
    clearTimeout(toastTimer.current);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, toast, panelOpen, setPanelOpen, markAllRead, markRead, dismissToast }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() { return useContext(NotificationContext); }
