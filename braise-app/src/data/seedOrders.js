/**
 * Génère des commandes fictives pour que le dashboard admin
 * ait des données à afficher dès le premier lancement.
 */
const SAMPLE_NAMES = ["Karim B.", "Amira L.", "Yacine D.", "Nour M.", "Riad K.", "Sara T.", "Amine O.", "Lyna C."];
const SAMPLE_ITEMS = [
  [{ name: "Le Brasero", price: 650, qty: 2, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" }],
  [{ name: "Tacos Flamme", price: 550, qty: 1, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop" }, { name: "Soda 33cl", price: 120, qty: 2, image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=300&fit=crop" }],
  [{ name: "Pizza Incandescente", price: 900, qty: 1, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop" }],
  [{ name: "Ailes de Feu", price: 600, qty: 3, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop" }, { name: "Limonade Maison", price: 150, qty: 2, image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop" }],
  [{ name: "Le Classique", price: 480, qty: 2, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop" }, { name: "Tenders Grillés", price: 550, qty: 1, image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&h=300&fit=crop" }],
];
const STATUSES = ["en_preparation", "en_cuisine", "en_route", "livree", "livree", "livree"];
const MODES = ["livraison", "livraison", "emporter", "livraison", "emporter"];

export function seedOrdersIfEmpty() {
  const KEY = "braise_admin_seeded";
  if (localStorage.getItem(KEY)) return;

  const now = Date.now();
  const orders = Array.from({ length: 24 }).map((_, i) => {
    const items = SAMPLE_ITEMS[i % SAMPLE_ITEMS.length];
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const mode = MODES[i % MODES.length];
    const status = i < 3 ? ["en_preparation", "en_cuisine", "en_route"][i] : STATUSES[i % STATUSES.length];
    const hoursAgo = i * 1.8;
    return {
      id: now - i * 3600000,
      clientName: SAMPLE_NAMES[i % SAMPLE_NAMES.length],
      clientId: `client_${i}`,
      items,
      total,
      mode,
      address: mode === "livraison" ? `Rue ${i + 1}, Alger` : "",
      phone: `055${String(i).padStart(7, "0")}`,
      status,
      createdAt: new Date(now - hoursAgo * 3600000).toISOString(),
    };
  });

  localStorage.setItem("braise_all_orders", JSON.stringify(orders));
  localStorage.setItem(KEY, "1");
}
