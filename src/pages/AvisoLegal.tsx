import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import CookieBanner from '../components/CookieBanner/CookieBanner'
import '../styles/legal.css'

export default function AvisoLegal() {
  return (
    <>
      <Navbar />
      <div className="legal-hero">
        <h1>Aviso Legal</h1>
        <p>Información legal obligatoria</p>
      </div>
      <div className="legal-content">
        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento con el deber de información recogido en la normativa vigente, se informa que el presente sitio
          web es titularidad de:
        </p>
        <div className="dato">
          <p><strong>Titular:</strong> Carlos Javier Vaquero Fernández</p>
          <p><strong>NIF/CIF:</strong> 03861975E</p>
          <p><strong>Domicilio:</strong> C/ Cristo 8. 45789 Turleque, Toledo</p>
          <p><strong>Correo electrónico:</strong> xyloshome25@gmail.com</p>
          <p><strong>Teléfono:</strong> +34 610 11 34 51</p>
        </div>

        <h2>2. Usuarios</h2>
        <p>
          El acceso y/o uso de este sitio web atribuye la condición de usuario, que acepta, desde dicho acceso y/o uso,
          las condiciones aquí reflejadas.
        </p>

        <h2>3. Uso del sitio web</h2>
        <p>
          El sitio web proporciona el acceso a información, servicios o datos pertenecientes al titular. El usuario asume
          la responsabilidad del uso del portal.
        </p>

        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio web (textos, imágenes, diseño, etc.) son propiedad del titular o dispone de
          licencia para su uso, quedando prohibida su reproducción sin autorización.
        </p>

        <h2>5. Responsabilidad</h2>
        <p>
          El titular no se hace responsable de los daños y perjuicios que pudieran derivarse del uso del sitio web ni de
          la falta de disponibilidad del mismo.
        </p>

        <h2>6. Enlaces</h2>
        <p>
          En caso de que en el sitio web se dispusiesen enlaces a otros sitios de Internet, el titular no ejercerá ningún
          tipo de control sobre dichos sitios y contenidos.
        </p>

        <h2>7. Derecho de exclusión</h2>
        <p>
          El titular se reserva el derecho a denegar o retirar el acceso al portal sin necesidad de preaviso, a aquellos
          usuarios que incumplan las presentes condiciones.
        </p>

        <h2>8. Generalidades</h2>
        <p>
          El titular perseguirá el incumplimiento de las presentes condiciones así como cualquier utilización indebida de
          su portal.
        </p>

        <h2>9. Modificación de las condiciones</h2>
        <p>
          El titular podrá modificar en cualquier momento las condiciones aquí determinadas, siendo debidamente
          publicadas como aparecen en el presente documento.
        </p>

        <h2>10. Legislación aplicable y jurisdicción</h2>
        <p>
          La relación entre el titular y el usuario se regirá por la normativa española vigente y cualquier controversia
          se someterá a los Juzgados y Tribunales correspondientes.
        </p>

        <div className="legal-footer-nav">
          <Link to="/legal/aviso-legal" className="active">Aviso legal</Link>
          <Link to="/legal/politica-privacidad">Política de privacidad</Link>
          <Link to="/legal/politica-cookies">Política de cookies</Link>
          <Link to="/">← Volver al inicio</Link>
        </div>
      </div>
      <Footer />
      <CookieBanner />
    </>
  )
}
