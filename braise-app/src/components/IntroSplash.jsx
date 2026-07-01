import { useState, useEffect, useRef } from "react";

export default function IntroSplash() {
  const canvasRef = useRef(null);
  const [leaving, setLeaving] = useState(false);
  const [gone,    setGone]    = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 3400);
    const t2 = setTimeout(() => setGone(true),    4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── Canvas particules de feu ── */
  useEffect(() => {
    if (gone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d");
    const W   = () => canvas.width;
    const H   = () => canvas.height;

    const mkP = (stagger) => {
      const maxL = 60 + Math.random() * 90;
      return {
        x:    W() / 2 + (Math.random() - 0.5) * W() * 0.9,
        y:    H() + 10,
        vx:   (Math.random() - 0.5) * 2,
        vy:   -(1.4 + Math.random() * 3.5),
        life: stagger ? Math.random() * maxL : 0,
        maxL,
        size: 2.5 + Math.random() * 7,
        seed: Math.random() * 100,
      };
    };

    const particles = Array.from({ length: 150 }, () => mkP(true));

    const draw = (p) => {
      const t = p.life / p.maxL;
      const r = p.size * (1 - t * 0.65);
      if (r <= 0) return;
      let c;
      if      (t < 0.25) c = `rgba(255,230,60,${(t / 0.25) * 0.9})`;
      else if (t < 0.55) c = `rgba(255,100,20,0.85)`;
      else               c = `rgba(200,30,10,${(1 - (t - 0.55) / 0.45) * 0.65})`;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, c); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    };

    const reset = (p) => Object.assign(p, mkP(false));

    let id;
    const loop = () => {
      ctx.clearRect(0, 0, W(), H());
      for (const p of particles) {
        p.x += p.vx + Math.sin((p.life + p.seed) * 0.12) * 0.8;
        p.y += p.vy; p.vy -= 0.022; p.life++;
        if (p.life >= p.maxL) reset(p);
        draw(p);
      }
      id = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, [gone]);

  if (gone) return null;

  return (
    <div className={`intro-root${leaving ? " intro-leaving" : ""}`}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="fmorph" x="-20%" y="-30%" width="140%" height="160%">
            <feTurbulence type="turbulence" baseFrequency="0.013 0.065"
              numOctaves="4" seed="5" result="turb">
              <animate attributeName="baseFrequency"
                values="0.013 0.065;0.024 0.115;0.016 0.085;0.013 0.065"
                dur="2.2s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turb"
              scale="24" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale"
                values="0;30;18;26;14;24" dur="2.2s" repeatCount="indefinite"/>
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <canvas ref={canvasRef} className="intro-canvas" />
      <div className="intro-glow" />

      <div className="intro-body">
        <p  className="intro-eye">FAST FOOD AU FEU VIF · ALGER</p>
        <h1 className="intro-logo" style={{ filter:"url(#fmorph)" }}>BRAISE</h1>
        <p  className="intro-tag">Du feu. Du goût. Pas de chichis.</p>
        <div className="intro-bar"><div className="intro-bar-fill" /></div>
      </div>
    </div>
  );
}