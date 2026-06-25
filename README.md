# 🔥 BRAISE — Fast food au feu vif

Application web publique pour la marque fictive **BRAISE**, une enseigne de fast food algérienne basée à Alger. Projet académique / portfolio.

## Stack

- **React 19** + **Vite 8**
- **react-router-dom v7** (routing côté client)
- **lucide-react** (icônes)
- CSS vanilla avec variables custom (pas de framework CSS)

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir : [http://localhost:5173](http://localhost:5173)

## Structure du projet

```
src/
├── components/
│   ├── FlameEdge.jsx   # Bordure SVG en dents de flamme
│   ├── Nav.jsx         # Navigation fixe avec NavLink
│   └── Footer.jsx      # Pied de page
├── pages/
│   ├── Home.jsx        # Accueil (hero, plats signature, histoire)
│   ├── Menu.jsx        # Carte complète avec filtres par catégorie
│   └── Contact.jsx     # Points de vente + formulaire contact
├── data/
│   ├── menu.js         # Données : plats, catégories, adresses
│   └── features.js     # Données : avantages de la marque
├── hooks/
│   └── useReveal.js    # Hook scroll-reveal (IntersectionObserver)
├── App.jsx             # Routeur principal
├── main.jsx            # Point d'entrée React
└── index.css           # CSS global (design system Braise)
```

## Pages disponibles

| Route | Page |
|-------|------|
| `/` | Accueil |
| `/menu` | Menu complet |
| `/contact` | Points de vente & contact |

## Design system

| Token | Valeur | Usage |
|-------|--------|-------|
| `--bg-char` | `#0B0A09` | Fond principal (charbon) |
| `--bg-smoke` | `#161310` | Fond sections alternées |
| `--ember` | `#FF4423` | Accent principal (braise) |
| `--cheese` | `#FFC23C` | Accent secondaire (fromage fondu) |
| `--paper` | `#F5EFE6` | Texte principal |
| `--ash` | `#8a8378` | Texte secondaire |

**Typographie :**
- `Bebas Neue` → titres display
- `Inter` → corps de texte
- `JetBrains Mono` → prix, labels, boutons

## Prochaines phases

- [ ] Interface client (compte, panier, commande)
- [ ] Interface admin (gestion des commandes)
- [ ] Connexion backend (API REST ou Next.js)
