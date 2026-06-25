# 🔥 BRAISE — Fast food au feu vif

Application web publique pour la marque fictive **BRAISE**, une enseigne de fast food algérienne basée à Alger. Projet académique / portfolio.

## Stack

- **React 19** + **Vite 8**
- **react-router-dom v7** (routing côté client)
- **lucide-react** (icônes)
- **context API** (gestion d'état: authentification et panier)
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
│   ├── FlameEdge.jsx         # Bordure SVG en dents de flamme
│   ├── Nav.jsx               # Navigation fixe avec NavLink
│   ├── Footer.jsx            # Pied de page
|   ├── CartDrawer.jsx        # Panier latéral
|   ├── DishCard.jsx          # Cart de plat 
|   ├── ProtectionRoute.jsx   # Protection des routes client
|   └──Admin/
|      ├── AdminRoute.jsx     # Protection des routes admin
|      └── AdminSidebar.jsx   # Sidebar administration
├── pages/
│   ├── Home.jsx            # Accueil (hero, plats signature, histoire)
│   ├── Menu.jsx            # Carte complète avec filtres par catégorie
│   ├── Contact.jsx         # Points de vente + formulaire contact
│   ├── Login.jsx           # Connexion client
│   ├── Register.jsx        # Inscription client
│   ├── Profile.jsx         # Profil client
│   ├── Checkout.jsx        # Paiement et validation commande
│   ├── OrderTracking.jsx   # Suivi de commande
│   └── admin/
│       ├── AdminLogin.jsx  # Connexion admin
│       ├── AdminDashboard.jsx # Tableau de bord admin
│       ├── AdminMenu.jsx   # Gestion du menu (CRUD)
│       └── AdminOrders.jsx # Gestion des commandes
├── context/
│   ├── AuthContext.jsx     # Contexte d'authentification
│   └── CartContext.jsx     # Contexte du panier
├── data/
│   ├── menu.js             # Données : plats, catégories
│   ├── features.js         # Données : avantages de la marque
│   └── seedOrders.js       # Données : commandes initiales
├── hooks/
│   └── useReveal.js    # Hook scroll-reveal (IntersectionObserver)
├── App.jsx             # Routeur principal
├── main.jsx            # Point d'entrée React
└── index.css           # CSS global (design system Braise)
```



## Pages disponibles

### Public

| Route         | Page                      |
| ------------- | ------------------------- |
| `/`         | Accueil                   |
| `/menu`     | Menu complet              |
| `/contact`  | Points de vente & contact |
| `/login`    | Connexion client          |
| `/register` | Inscription client        |

### Client (authentifié)

| Route               | Page                   |
| ------------------- | ---------------------- |
| `/profile`        | Profil client          |
| `/checkout`       | Validation de commande |
| `/order-tracking` | Suivi de commande      |

### Administration

| Route                | Page                   |
| -------------------- | ---------------------- |
| `/admin/login`     | Connexion admin        |
| `/admin/dashboard` | Tableau de bord        |
| `/admin/menu`      | Gestion du menu (CRUD) |
| `/admin/orders`    | Gestion des commandes  |

## Fonctionnalités implémentées

### Interface client

* 🔐 Authentification (connexion / inscription)
* 🛒 Panier d'achat avec gestion des quantités
* 📋 Menu complet avec filtrage par catégorie
* 📦 Validation de commande
* 📍 Suivi de commande
* 👤 Profil utilisateur

### Interface admin

* 🔐 Authentification administrateur
* 📊 Tableau de bord avec statistiques
* 📝 Gestion du menu (ajout, modification, suppression)
* 📋 Gestion des commandes (visualisation, mise à jour statut)

## Design system

| Token          | Valeur      | Usage                             |
| -------------- | ----------- | --------------------------------- |
| `--bg-char`  | `#0B0A09` | Fond principal (charbon)          |
| `--bg-smoke` | `#161310` | Fond sections alternées          |
| `--ember`    | `#FF4423` | Accent principal (braise)         |
| `--cheese`   | `#FFC23C` | Accent secondaire (fromage fondu) |
| `--paper`    | `#F5EFE6` | Texte principal                   |
| `--ash`      | `#8a8378` | Texte secondaire                  |

**Typographie :**

- `Bebas Neue` → titres display
- `Inter` → corps de texte
- `JetBrains Mono` → prix, labels, boutons

## Prochaines phases

- [ ] Connexion backend (API REST)
- [ ] Base de données (MongoDB/ PostgreSQL)
- [ ] Paiment en temps réel
- [ ] Notifications  en temps réel
- [ ] Tests unitaires et E2E
