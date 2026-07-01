import { useEffect, useRef } from "react";

/**
 * Canvas de particules de feu réutilisable.
 * intensity : multiplicateur du nombre et taille des particules
 * spread    : largeur de la zone d'émission (0 = centre, 1 = plein écran)
 */
export default function FireCanvas({ intensity = 1, spread = 0.8, style = {} }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.floor(120 * intensity);

    class Particle {
      constructor(stagger = false) { this.init(stagger); }

      init(stagger = false) {
        const W = canvas.width;
        const H = canvas.height;
        this.x     = W / 2 + (Math.random() - 0.5) * W * spread;
        this.y     = H + Math.random() * 20;
        this.vx    = (Math.random() - 0.5) * 1.8 * intensity;
        this.vy    = -(1.2 + Math.random() * 3.5) * intensity;
        this.maxL  = 55 + Math.random() * 90;
        this.life  = stagger ? Math.random() * this.maxL : 0;
        this.size  = (2 + Math.random() * 7) * intensity;
        this.seed  = Math.random() * 100;
      }

      update() {
        this.x  += this.vx + Math.sin((this.life + this.seed) * 0.12) * 0.9;
        this.y  += this.vy;
        this.vy -= 0.025;
        this.life++;
        if (this.life >= this.maxL) this.init();
      }

      draw() {
        const t = this.life / this.maxL;
        const r = this.size * (1 - t * 0.65);
        if (r <= 0) return;

        let r_, g_, b_, a;
        if      (t < 0.25) { r_ = 255; g_ = 230; b_ = 80;  a = t * 4 * 0.9; }
        else if (t < 0.55) { r_ = 255; g_ = 110; b_ = 20;  a = 0.85; }
        else if (t < 0.80) { r_ = 220; g_ = 40;  b_ = 10;  a = (1 - (t - 0.55) / 0.25) * 0.7; }
        else               { r_ = 140; g_ = 20;  b_ = 5;   a = (1 - (t - 0.80) / 0.20) * 0.3; }

        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
        grd.addColorStop(0,   `rgba(${r_},${g_},${b_},${a})`);
        grd.addColorStop(0.5, `rgba(${r_},${g_},${b_},${a * 0.5})`);
        grd.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: COUNT }, () => new Particle(true));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, spread]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    />
  );
}
