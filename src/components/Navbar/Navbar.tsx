import './Navbar.css'

export default function Navbar() {
  return (
    <nav>
      <a href="/" className="logo">
        <img src="/logos/SVG/logoIsotipo.svg" alt="Xylos Home" style={{ height: '35px' }} />
      </a>
      <ul>
        <li><a href="#intro">Inicio</a></li>
        <li><a href="#valores">Servicios</a></li>
        <li><a href="#galeria">Proyectos</a></li>
      </ul>
      <a href="#contacto" className="cta">CONTACTO</a>
    </nav>
  )
}
