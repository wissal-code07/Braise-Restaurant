import { Link } from "react-router-dom";
import { MapPin, Globe, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link to="/" className="footer-wordmark">BRAISE</Link>
        <div className="footer-meta">
          <div className="loc"><MapPin size={16} /> Alger, Algérie</div>
          <div className="footer-socials">
            <a href="#" aria-label="Réseaux sociaux"><Globe size={16} /></a>
            <a href="#" aria-label="Partager"><Share2 size={16} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BRAISE — Fast food au feu vif</span>
        <span>Alger · Bientôt dans votre quartier</span>
      </div>
    </footer>
  );
}
