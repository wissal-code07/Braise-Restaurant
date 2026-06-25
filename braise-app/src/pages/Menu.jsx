import { useState, useRef, useEffect } from "react";
import FlameEdge from "../components/FlameEdge";
import DishCard from "../components/DishCard";
import { useReveal } from "../hooks/useReveal";
import { MENU, TABS } from "../data/menu";

export default function Menu() {
  const [tab, setTab] = useState("Tout");
  const rootRef = useRef(null);
  useReveal(rootRef, [tab]);

  const filtered = tab === "Tout" ? MENU : MENU.filter((m) => m.category === tab);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => el.classList.remove("visible"));
    const t = setTimeout(() => els?.forEach((el) => el.classList.add("visible")), 50);
    return () => clearTimeout(t);
  }, [tab]);

  return (
    <div ref={rootRef}>
      <header className="page-header">
        <div className="eyebrow reveal">LA CARTE</div>
        <h1 className="reveal">Le menu</h1>
        <p className="reveal">Tout est grillé à la commande. Composez votre repas, sans chichis.</p>
      </header>

      <FlameEdge color="var(--bg-smoke)" />

      <section className="section">
        <div className="menu-tabs reveal">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tab-btn ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="dishes-grid">
          {filtered.map((d, i) => (
            <DishCard key={d.name} dish={d} delay={(i % 6) * 70} />
          ))}
        </div>
      </section>
    </div>
  );
}
