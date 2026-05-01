import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="footer-linea">
        <span style={{ color: 'var(--bronce)', fontWeight: 600 }}>Xylos Home</span>
        <span className="punto-separador">·</span>
        <span style={{ color: 'var(--gris-calido)' }}>Creamos espacios, construimos vidas</span>
      </div>

      <div className="footer-linea contacto">
        <a href="mailto:xyloshome25@gmail.com" className="link-contacto">xyloshome25@gmail.com</a>
        <span className="punto-separador">·</span>
        <a href="tel:+34610113451" className="link-contacto">+34 610 113 451</a>
        <span className="punto-separador">·</span>
        <span style={{ color: 'var(--gris-calido)' }}>Toledo, España</span>
      </div>

      <p className="footer-legal">© 2026 Xylos Home · Todos los derechos reservados</p>

      <div className="legal-links">
        <Link to="/legal/aviso-legal">Aviso Legal</Link>
        {' | '}
        <Link to="/legal/politica-privacidad">Política de Privacidad</Link>
        {' | '}
        <Link to="/legal/politica-cookies">Política de Cookies</Link>
      </div>
    </footer>
  )
}
