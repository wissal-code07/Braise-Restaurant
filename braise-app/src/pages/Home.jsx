import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Flame, ChevronDown } from "lucide-react";
import FlameEdge from "../components/FlameEdge";
import DishCard from "../components/DishCard";
import { useReveal } from "../hooks/useReveal";
import { CATEGORIES, DISHES } from "../data/menu";
import { FEATURES } from "../data/features";

export default function Home() {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const embers = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 4 + Math.round(Math.random() * 6),
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 8,
        drift: Math.round((Math.random() - 0.5) * 80),
      })),
    []
  );

  return (
    <div ref={rootRef}>
      <header className="hero">
        <div className="ember-field">
          {embers.map((p) => (
            <span
              key={p.id}
              className="ember"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--drift": `${p.drift}px`,
              }}
            />
          ))}
        </div>
        <div className="eyebrow">FAST FOOD COMME IL FAUT — ALGER</div>
        <h1>
          DU <span className="accent">FEU</span>.<br />
          DU GOÛT.<br />
          PAS DE CHICHIS.
        </h1>
        <p className="sub">
          Burgers, tacos, pizzas et poulet grillé, cuits au feu vif et servis en moins de 8 minutes.
          Pas de surgelé, pas de détour.
        </p>
        <div className="hero-actions">
          <Link to="/menu" className="btn-primary">Voir le menu</Link>
          <a
            href="#histoire"
            className="btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("histoire")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Notre histoire
          </a>
        </div>
        <ChevronDown className="scroll-hint" size={22} />
      </header>

      <div className="ticker">
        <div className="ticker-track">
          <span>{CATEGORIES.map((c, i) => <span key={i}>{c} <Flame size={16} /></span>)}</span>
          <span aria-hidden="true">{CATEGORIES.map((c, i) => <span key={i}>{c} <Flame size={16} /></span>)}</span>
        </div>
      </div>

      <FlameEdge color="var(--bg-smoke)" />

      <section className="section">
        <div className="section-head reveal">
          <div className="eyebrow">LA SÉLECTION</div>
          <h2>Nos incontournables</h2>
        </div>
        <div className="dishes-grid">
          {DISHES.map((d, i) => (
            <DishCard key={d.name} dish={d} delay={i * 90} />
          ))}
        </div>
        <div className="reveal" style={{ textAlign: "center", marginTop: "44px" }}>
          <Link to="/menu" className="btn-ghost">Voir le menu complet →</Link>
        </div>
      </section>

      <FlameEdge flip color="var(--bg-char)" />

      <section id="histoire" className="section alt">
        <div className="story">
          <div className="reveal">
            <blockquote>100% flamme. <span>0% surgelé.</span></blockquote>
            <p>
              Braise est né d'un constat simple : le fast food n'a pas besoin d'être un compromis.
              Chaque commande passe par le grill, jamais par un sachet sous vide. On garde la
              rapidité du fast food et on rend la cuisson au feu, comme dans un vrai resto.
            </p>
          </div>
          <div className="stat-grid reveal">
            <div><b>8 min</b><span>temps moyen de préparation</span></div>
            <div><b>100%</b><span>viande fraîche du jour</span></div>
            <div><b>1</b><span>seule source : le feu</span></div>
          </div>
        </div>
      </section>

      <FlameEdge color="var(--bg-smoke)" />

      <section className="section">
        <div className="section-head reveal">
          <div className="eyebrow">POURQUOI BRAISE</div>
          <h2>On ne triche pas sur la flamme</h2>
        </div>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div className="feature-card reveal" style={{ transitionDelay: `${i * 100}ms` }} key={f.title}>
              <div className="ic"><f.icon size={20} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
