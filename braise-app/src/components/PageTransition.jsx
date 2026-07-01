import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rideau Split :
 *  - Panneau haut  descend du haut  → centre
 *  - Panneau bas   monte  du bas    → centre
 *  - Logo BRAISE apparaît au milieu
 *  - Puis les deux panneaux repartent et révèlent la page
 * Durée totale : ~1000ms
 */
export default function PageTransition() {
  const location  = useLocation();
  const prevPath  = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle | in | hold | out

  useEffect(() => {
    if (prevPath.current === null) { prevPath.current = location.pathname; return; }
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    setPhase("in");
    const t1 = setTimeout(() => setPhase("hold"), 380);
    const t2 = setTimeout(() => setPhase("out"),  580);
    const t3 = setTimeout(() => setPhase("idle"), 1020);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [location.pathname]);

  if (phase === "idle") return null;

  return (
    <div className="pt-root" aria-hidden="true">
      {/* Panneau haut */}
      <div className={`pt-panel pt-top pt-${phase}`}>
        <div className="pt-panel-inner" />
      </div>
      {/* Panneau bas */}
      <div className={`pt-panel pt-bot pt-${phase}`}>
        <div className="pt-panel-inner" />
      </div>
      {/* Logo au centre */}
      <div className={`pt-center pt-${phase}`}>
        <span className="pt-flame">🔥</span>
        <span className="pt-brand">BRAISE</span>
      </div>
    </div>
  );
}
