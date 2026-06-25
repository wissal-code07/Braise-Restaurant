import { useState, useRef } from "react";
import { MapPin, Clock3, Phone, Send, CheckCircle2 } from "lucide-react";
import FlameEdge from "../components/FlameEdge";
import { useReveal } from "../hooks/useReveal";
import { LOCATIONS } from "../data/menu";

export default function Contact() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <div ref={rootRef}>
      <header className="page-header">
        <div className="eyebrow reveal">NOUS TROUVER</div>
        <h1 className="reveal">Points de vente</h1>
        <p className="reveal">
          Trois adresses à Alger. Une seule promesse : tout sort du grill.
        </p>
        <div className="hours-badge reveal">
          <Clock3 size={14} /> Ouvert tous les jours, 11h – 23h
        </div>
      </header>

      <FlameEdge color="var(--bg-smoke)" />

      <section className="section">
        {/* Carte stylisée dot-grid */}
        <div className="map-panel reveal">
          {LOCATIONS.map((loc) => (
            <div className="pin" style={{ left: loc.pos.left, top: loc.pos.top }} key={loc.name}>
              <MapPin size={22} />
              <span className="ring" />
              <span className="label">{loc.name}</span>
            </div>
          ))}
        </div>

        {/* Cartes adresses */}
        <div className="dishes-grid" style={{ marginTop: "42px" }}>
          {LOCATIONS.map((loc, i) => (
            <div
              className="location-card reveal"
              style={{ transitionDelay: `${i * 90}ms` }}
              key={loc.name}
            >
              <h3>{loc.name}</h3>
              <div className="row"><MapPin size={15} /> {loc.address}</div>
              <div className="row"><Clock3 size={15} /> {loc.hours}</div>
              <div className="row"><Phone size={15} /> {loc.phone}</div>
            </div>
          ))}
        </div>

        {/* Formulaire de contact */}
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="section-head" style={{ marginBottom: "32px" }}>
            <div className="eyebrow">UNE QUESTION ?</div>
            <h2 style={{ fontSize: "32px" }}>Écrivez-nous</h2>
          </div>

          <div className="form-row">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Votre nom"
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="vous@exemple.com"
            />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Votre message..."
            />
          </div>

          <button type="submit" className="btn-primary form-submit" disabled={loading}>
            {loading ? "Envoi…" : <><Send size={15} /> Envoyer</>}
          </button>

          {sent && (
            <div className="form-success">
              <CheckCircle2 size={16} /> Message envoyé. On vous répond sous 24h.
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
