import { useMemo } from "react";

/**
 * Bordure en dents de flamme utilisée entre les sections, à la place
 * d'un simple <hr>. C'est l'élément signature de l'identité Braise.
 */
export default function FlameEdge({ flip = false, color = "var(--bg-char)" }) {
  const w = 1200;
  const h = 34;
  const teeth = 22;
  const step = w / teeth;

  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= teeth; i++) {
      const x = i * step;
      const y = i % 2 === 0 ? 0 : h * 0.55;
      arr.push(`${x},${y}`);
    }
    return flip
      ? [`0,${h}`, ...arr.reverse(), `${w},${h}`].join(" ")
      : [`0,${h}`, ...arr, `${w},${h}`].join(" ");
  }, [flip]);

  return (
    <svg
      className="flame-edge"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ transform: flip ? "rotate(180deg)" : "none" }}
      aria-hidden="true"
    >
      <polygon points={points} fill={color} />
    </svg>
  );
}
