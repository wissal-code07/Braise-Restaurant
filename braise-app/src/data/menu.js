export const CATEGORIES = ["BURGERS", "TACOS", "PIZZAS", "POULET FRIT", "WRAPS", "BOISSONS"];
export const TABS = ["Tout", "Burgers", "Tacos", "Pizzas", "Poulet", "Boissons"];

export const MENU = [
  // ── BURGERS ──
  {
    category: "Burgers",
    name: "Le Brasero",
    desc: "Double smash, cheddar fondu, sauce braise maison",
    price: 650,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
    signature: true,
  },
  {
    category: "Burgers",
    name: "Le Classique",
    desc: "Steak haché grillé, salade, tomate, oignon confit",
    price: 480,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop&auto=format",
  },
  {
    category: "Burgers",
    name: "Le Forestier",
    desc: "Steak grillé, champignons, fromage fumé",
    price: 580,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop&auto=format",
  },

  // ── TACOS ──
  {
    category: "Tacos",
    name: "Tacos Flamme",
    desc: "Poulet mariné grillé, frites, sauce fromagère",
    price: 550,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop&auto=format",
    signature: true,
  },
  {
    category: "Tacos",
    name: "Tacos Viande Hachée",
    desc: "Viande hachée épicée, frites, sauce algérienne",
    price: 520,
    image: "https://images.unsplash.com/photo-1640719028782-8230a5480157?w=400&h=300&fit=crop&auto=format",
  },
  {
    category: "Tacos",
    name: "Tacos Mixte",
    desc: "Poulet et viande hachée, double fromage",
    price: 620,
    // Photo tacos garni bien visible, pas de saumon
    image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&h=300&fit=crop&auto=format",
  },

  // ── PIZZAS ──
  {
    category: "Pizzas",
    name: "Pizza Incandescente",
    desc: "Pepperoni, piment doux, filet de miel chaud",
    price: 900,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&auto=format",
    signature: true,
  },
  {
    category: "Pizzas",
    name: "Margherita Braise",
    desc: "Mozzarella, basilic frais, tomates rôties",
    price: 750,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format",
  },
  {
    category: "Pizzas",
    name: "Quatre Fromages",
    desc: "Mozzarella, cheddar, gorgonzola, parmesan",
    price: 850,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
  },

  // ── POULET ──
  {
    category: "Poulet",
    name: "Ailes de Feu",
    desc: "Ailes croustillantes, sauce piquante caramélisée",
    price: 600,
    // Vraies ailes de poulet sauce buffalo
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop&auto=format",
    signature: true,
  },
  {
    category: "Poulet",
    name: "Tenders Grillés",
    desc: "Filets de poulet marinés, sauce au choix",
    price: 550,
    // Tenders / strips de poulet (remplace la photo de saumon)
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format",
  },
  {
    category: "Poulet",
    name: "Poulet Braisé Entier",
    desc: "Demi-poulet grillé au feu de bois",
    price: 1100,
    // Poulet rôti entier sur grille
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c2?w=400&h=300&fit=crop&auto=format",
  },

  // ── BOISSONS ──
  {
    category: "Boissons",
    name: "Limonade Maison",
    desc: "Pressée minute, peu sucrée",
    price: 150,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop&auto=format",
  },
  {
    category: "Boissons",
    name: "Citronnade Menthe",
    desc: "Citron frais, menthe fraîche",
    price: 180,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&auto=format",
  },
  {
    category: "Boissons",
    name: "Soda 33cl",
    desc: "Coca-Cola, Fanta ou Sprite",
    price: 120,
    image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=300&fit=crop&auto=format",
  },
];

export const DISHES = MENU.filter((d) => d.signature);

export const LOCATIONS = [
  { name: "Braise Hydra",        address: "Rue Mohamed Khoudi, Hydra, Alger",          hours: "11h – 23h",    phone: "021 23 45 67", pos: { left: "20%", top: "65%" } },
  { name: "Braise Bab Ezzouar", address: "Centre commercial, Bab Ezzouar, Alger",      hours: "11h – 23h30",  phone: "021 34 56 78", pos: { left: "58%", top: "32%" } },
  { name: "Braise Alger Centre",address: "Rue Didouche Mourad, Alger Centre",          hours: "11h – 22h30",  phone: "021 45 67 89", pos: { left: "80%", top: "68%" } },
];
