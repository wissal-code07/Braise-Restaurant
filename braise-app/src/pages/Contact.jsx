import { useState, useRef } from "react";
import { MapPin, Clock3, Phone, Send, CheckCircle2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useReveal } from "../hooks/useReveal";
import { LOCATIONS } from "../data/menu";

// Fix icône Leaflet cassée par Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Marqueur personnalisé rouge BRAISE
const braiseIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="
      width:38px; height:38px;
      background:#FF2D55;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid #fff;
      box-shadow:0 4px 14px rgba(255,45,85,.5);
      display:flex; align-items:center; justify-content:center;
    ">
      <span style="transform:rotate(45deg); font-size:17px; margin-top:-2px;">🔥</span>
    </div>`,
  iconSize:    [38, 38],
  iconAnchor:  [19, 38],
  popupAnchor: [0, -42],
});

// Centre de la carte (milieu des 3 adresses)
const MAP_CENTER = [36.7415, 3.0975];

export default function Contact() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [active,  setActive]  = useState(null);

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
      {/* En-tête */}
      <header className="page-header">
        <div className="eyebrow reveal">NOUS TROUVER</div>
        <h1 className="reveal">Points de vente</h1>
        <p className="reveal">Trois adresses à Alger. Une seule promesse : tout sort du grill.</p>
        <div className="hours-badge reveal">
          <Clock3 size={14} /> Ouvert tous les jours, 11h – 23h
        </div>
      </header>

      <section className="section">

        {/* ── Carte Leaflet ── */}
        <div className="leaflet-wrap reveal">
          <MapContainer
            center={MAP_CENTER}
            zoom={12}
            style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {LOCATIONS.map((loc) => (
              <Marker
                key={loc.name}
                position={[loc.lat, loc.lng]}
                icon={braiseIcon}
                eventHandlers={{ click: () => setActive(loc.name) }}
              >
                <Popup className="braise-popup">
                  <div className="popup-inner">
                    <strong>{loc.name}</strong>
                    <span><MapPin size={12} /> {loc.address}</span>
                    <span><Clock3 size={12} /> {loc.hours}</span>
                    <span><Phone size={12} /> {loc.phone}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* ── Cartes adresses ── */}
        <div className="dishes-grid" style={{ marginTop: "36px" }}>
          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.name}
              className={`location-card reveal${active === loc.name ? " active-loc" : ""}`}
              style={{ transitionDelay: `${i * 80}ms`, cursor: "pointer" }}
              onClick={() => setActive(active === loc.name ? null : loc.name)}
            >
              <h3>{loc.name}</h3>
              <div className="row"><MapPin size={15} />{loc.address}</div>
              <div className="row"><Clock3 size={15} />{loc.hours}</div>
              <div className="row"><Phone  size={15} />{loc.phone}</div>
              <a
                className="loc-directions"
                href={`https://www.openstreetmap.org/?mlat=${loc.lat}&mlon=${loc.lng}&zoom=16`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Itinéraire →
              </a>
            </div>
          ))}
        </div>

        {/* ── Formulaire de contact ── */}
        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "32px" }}>
            <div className="eyebrow" style={{ marginBottom: "8px" }}>UNE QUESTION ?</div>
            <h2 style={{ fontSize: "36px" }}>Écrivez-nous</h2>
          </div>

          <div className="form-row">
            <label htmlFor="name">Nom</label>
            <input id="name" required placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required placeholder="vous@exemple.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" required rows={4} placeholder="Votre message…"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} />
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
