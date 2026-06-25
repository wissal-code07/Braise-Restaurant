import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock3, CheckCircle2, Bike, Package } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const STEPS = ["Mode", "Détails", "Confirmation"];

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [mode, setMode] = useState(null); // "livraison" | "emporter"
  const [form, setForm] = useState({ address: "", phone: "", note: "" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validateDetails = () => {
    const err = {};
    if (!form.phone.trim()) err.phone = "Numéro requis";
    if (mode === "livraison" && !form.address.trim()) err.address = "Adresse requise";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !mode) return;
    if (step === 1 && !validateDetails()) return;
    setStep((s) => s + 1);
  };

  const handleConfirm = () => {
    // Sauvegarder la commande dans l'historique
    const order = {
      id: Date.now(),
      items,
      total,
      mode,
      address: form.address,
      phone: form.phone,
      note: form.note,
      status: "en_preparation",
      createdAt: new Date().toISOString(),
    };
    const key = `braise_orders_${user.id}`;
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([order, ...prev]));
    clearCart();
    navigate(`/order/${order.id}`);
  };

  if (items.length === 0 && step < 2) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "32px" }}>Panier vide</h2>
          <p style={{ color: "var(--ash)", margin: "12px 0 24px" }}>Ajoutez des plats avant de commander.</p>
          <button className="btn-primary" onClick={() => navigate("/menu")}>Voir le menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Stepper */}
      <div className="stepper">
        {STEPS.map((s, i) => (
          <div key={s} className={`step ${i <= step ? "done" : ""} ${i === step ? "active" : ""}`}>
            <span className="step-num">{i < step ? <CheckCircle2 size={16} /> : i + 1}</span>
            <span className="step-label">{s}</span>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        {/* Colonne principale */}
        <div className="checkout-main">

          {/* Étape 0 : Mode de livraison */}
          {step === 0 && (
            <div className="checkout-block">
              <h2>Comment souhaitez-vous récupérer votre commande ?</h2>
              <div className="mode-grid">
                <button
                  className={`mode-card ${mode === "livraison" ? "selected" : ""}`}
                  onClick={() => setMode("livraison")}
                >
                  <Bike size={32} />
                  <strong>Livraison à domicile</strong>
                  <span>30 – 45 min · Frais de livraison 150 DA</span>
                </button>
                <button
                  className={`mode-card ${mode === "emporter" ? "selected" : ""}`}
                  onClick={() => setMode("emporter")}
                >
                  <Package size={32} />
                  <strong>À emporter</strong>
                  <span>Prêt en 8 min · Gratuit</span>
                </button>
              </div>
            </div>
          )}

          {/* Étape 1 : Détails */}
          {step === 1 && (
            <div className="checkout-block">
              <h2>{mode === "livraison" ? "Adresse de livraison" : "Vos coordonnées"}</h2>
              {mode === "livraison" && (
                <div className="form-row">
                  <label><MapPin size={14} /> Adresse complète</label>
                  <input
                    placeholder="Rue, numéro, quartier, Alger"
                    value={form.address}
                    onChange={set("address")}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>
              )}
              <div className="form-row">
                <label>Numéro de téléphone</label>
                <input
                  type="tel"
                  placeholder="05XX XX XX XX"
                  value={form.phone}
                  onChange={set("phone")}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
              <div className="form-row">
                <label>Instructions (optionnel)</label>
                <textarea
                  rows={3}
                  placeholder="Allergies, instructions particulières…"
                  value={form.note}
                  onChange={set("note")}
                />
              </div>
            </div>
          )}

          {/* Étape 2 : Confirmation */}
          {step === 2 && (
            <div className="checkout-block">
              <h2>Récapitulatif de la commande</h2>
              <ul className="recap-list">
                {items.map((item) => (
                  <li key={item.name} className="recap-item">
                    <img src={item.image} alt={item.name} />
                    <span className="recap-name">{item.name} <em>×{item.qty}</em></span>
                    <span className="mono">{item.price * item.qty} DA</span>
                  </li>
                ))}
              </ul>
              <div className="recap-meta">
                <div className="recap-row">
                  {mode === "livraison" ? <Bike size={15} /> : <Package size={15} />}
                  <span>{mode === "livraison" ? `Livraison → ${form.address}` : "À emporter"}</span>
                </div>
                {mode === "livraison" && (
                  <div className="recap-row">
                    <Clock3 size={15} /><span>30 – 45 min estimées</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation entre étapes */}
          <div className="checkout-nav">
            {step > 0 && (
              <button className="btn-ghost" onClick={() => setStep((s) => s - 1)}>← Retour</button>
            )}
            {step < 2 ? (
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={step === 0 && !mode}
              >
                Continuer →
              </button>
            ) : (
              <button className="btn-primary" onClick={handleConfirm}>
                Confirmer la commande 🔥
              </button>
            )}
          </div>
        </div>

        {/* Colonne récap prix */}
        <aside className="checkout-aside">
          <h3>Votre commande</h3>
          <ul className="aside-list">
            {items.map((item) => (
              <li key={item.name}>
                <span>{item.name} ×{item.qty}</span>
                <span className="mono">{item.price * item.qty} DA</span>
              </li>
            ))}
          </ul>
          <div className="aside-divider" />
          {mode === "livraison" && (
            <div className="aside-row">
              <span>Livraison</span><span className="mono">150 DA</span>
            </div>
          )}
          <div className="aside-total">
            <span>Total</span>
            <span className="mono">{mode === "livraison" ? total + 150 : total} DA</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
