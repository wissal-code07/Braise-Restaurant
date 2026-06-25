import { X, Bike, Package, ShoppingBag } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";

export default function NotificationToast() {
  const { toast, dismissToast } = useNotifications();

  return (
    <div className={`notif-toast ${toast ? "visible" : ""}`}>
      {toast && (
        <>
          <div className="notif-toast-ico">
            <ShoppingBag size={18} />
          </div>
          <div className="notif-toast-body">
            <div className="notif-toast-title">Nouvelle commande 🔥</div>
            <div className="notif-toast-desc">
              {toast.client} — {toast.item}
            </div>
            <div className="notif-toast-meta">
              {toast.mode === "livraison"
                ? <><Bike size={12} /> Livraison</>
                : <><Package size={12} /> À emporter</>}
              <span className="mono"> · {toast.total} DA</span>
            </div>
          </div>
          <button className="icon-btn" onClick={dismissToast}>
            <X size={16} />
          </button>
        </>
      )}
    </div>
  );
}
