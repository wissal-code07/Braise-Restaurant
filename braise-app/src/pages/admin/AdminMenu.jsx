import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { MENU as INITIAL_MENU, TABS } from "../../data/menu";

const EMPTY_DISH = { category: "Burgers", name: "", desc: "", price: "", image: "", signature: false };

export default function AdminMenu() {
  const storageKey = "braise_admin_menu";
  const load = () => JSON.parse(localStorage.getItem(storageKey) || "null") || INITIAL_MENU;

  const [dishes, setDishes]     = useState(load);
  const [tab, setTab]           = useState("Tout");
  const [modal, setModal]       = useState(null); // null | "add" | dish
  const [form, setForm]         = useState(EMPTY_DISH);
  const [deleteId, setDeleteId] = useState(null);
  const [saved, setSaved]       = useState(false);

  const save = (updated) => {
    setDishes(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const openAdd  = () => { setForm(EMPTY_DISH); setModal("add"); };
  const openEdit = (d) => { setForm({ ...d }); setModal(d.name); };
  const closeModal = () => setModal(null);

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return;
    const updated = modal === "add"
      ? [...dishes, { ...form, price: Number(form.price) }]
      : dishes.map((d) => d.name === modal ? { ...form, price: Number(form.price) } : d);
    save(updated);
    closeModal();
  };

  const handleDelete = () => {
    save(dishes.filter((d) => d.name !== deleteId));
    setDeleteId(null);
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const filtered = tab === "Tout" ? dishes : dishes.filter((d) => d.category === tab);

  const CATEGORIES_ADMIN = ["Burgers","Tacos","Pizzas","Poulet","Boissons"];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Menu</h1>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          {saved && <span style={{ color:"#2ecc71", fontSize:"13px", fontFamily:"monospace" }}><Check size={14}/> Sauvegardé</span>}
          <button className="btn-primary" onClick={openAdd}><Plus size={16}/> Ajouter un plat</button>
        </div>
      </div>

      {/* Onglets catégories */}
      <div className="menu-tabs" style={{ justifyContent:"flex-start", marginBottom:"24px" }}>
        {["Tout", ...CATEGORIES_ADMIN].map((t) => (
          <button key={t} className={`tab-btn ${tab===t?"active":""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {/* Grille des plats */}
      <div className="admin-menu-grid">
        {filtered.map((d) => (
          <div key={d.name} className="admin-dish-card">
            <div className="admin-dish-img-wrap">
              <img src={d.image} alt={d.name} className="dish-img" loading="lazy"
                onError={(e) => { e.target.style.display="none"; }} />
              {d.signature && <span className="dish-badge">Signature</span>}
            </div>
            <div className="admin-dish-body">
              <div className="admin-dish-meta">
                <span className="admin-dish-cat">{d.category}</span>
                <span className="mono admin-dish-price">{d.price} DA</span>
              </div>
              <h3>{d.name}</h3>
              <p>{d.desc}</p>
            </div>
            <div className="admin-dish-actions">
              <button className="admin-action-btn edit" onClick={() => openEdit(d)}><Pencil size={15}/> Modifier</button>
              <button className="admin-action-btn delete" onClick={() => setDeleteId(d.name)}><Trash2 size={15}/> Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajouter / Modifier */}
      {modal !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modal === "add" ? "Ajouter un plat" : "Modifier le plat"}</h2>
              <button className="icon-btn" onClick={closeModal}><X size={20}/></button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <label>Catégorie</label>
                <select value={form.category} onChange={set("category")}>
                  {CATEGORIES_ADMIN.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-row">
                <label>Nom du plat *</label>
                <input placeholder="Ex : Le Brasero" value={form.name} onChange={set("name")} />
              </div>
              <div className="form-row">
                <label>Description</label>
                <textarea rows={2} placeholder="Ingrédients, sauce…" value={form.desc} onChange={set("desc")} />
              </div>
              <div className="form-row">
                <label>Prix (DA) *</label>
                <input type="number" min="0" placeholder="650" value={form.price} onChange={set("price")} />
              </div>
              <div className="form-row">
                <label>URL de l'image (Unsplash ou autre)</label>
                <input placeholder="https://images.unsplash.com/…" value={form.image} onChange={set("image")} />
              </div>
              {form.image && (
                <img src={form.image} alt="Aperçu" className="modal-preview"
                  onError={(e) => e.target.style.display="none"} />
              )}
              <label className="checkbox-row">
                <input type="checkbox" checked={form.signature} onChange={set("signature")} />
                Plat signature (affiché sur l'accueil)
              </label>
            </div>
            <div className="modal-footer">
              <button className="btn-ghost" onClick={closeModal}>Annuler</button>
              <button className="btn-primary" onClick={handleSave}><Check size={15}/> Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Supprimer ce plat ?</h2>
              <button className="icon-btn" onClick={() => setDeleteId(null)}><X size={20}/></button>
            </div>
            <p style={{ padding:"0 28px 20px", color:"var(--ash)", fontSize:"14px" }}>
              <strong style={{ color:"var(--paper)" }}>{deleteId}</strong> sera supprimé définitivement du menu.
            </p>
            <div className="modal-footer">
              <button className="btn-ghost" onClick={() => setDeleteId(null)}>Annuler</button>
              <button className="btn-primary" style={{ background:"var(--ember)" }} onClick={handleDelete}><Trash2 size={15}/> Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
