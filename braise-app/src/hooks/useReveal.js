import { useEffect } from "react";

/**
 * Observe tous les éléments `.reveal` à l'intérieur du conteneur donné
 * et leur ajoute `.visible` quand ils entrent dans le viewport.
 * `deps` permet de relancer l'observation après un changement de route
 * ou de filtre (ex: changement d'onglet sur la page Menu).
 */
export function useReveal(containerRef, deps = []) {
  useEffect(() => {
    const els = containerRef.current?.querySelectorAll(".reveal");
    if (!els || els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
