import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import CookieBanner from '../components/CookieBanner/CookieBanner'
import '../styles/legal.css'

export default function PoliticaPrivacidad() {
  return (
    <>
      <Navbar />
      <div className="legal-hero">
        <h1>Política de Privacidad</h1>
        <p>Protección de datos personales · RGPD</p>
      </div>
      <div className="legal-content">
        <h2>1. Responsable del tratamiento</h2>
        <div className="dato">
          <p><strong>Titular:</strong> Carlos Javier Vaquero Fernández</p>
          <p><strong>NIF/CIF:</strong> 03861975E</p>
          <p><strong>Domicilio:</strong> C/ Cristo 8. 45789 Turleque, Toledo</p>
          <p><strong>Correo electrónico:</strong> xyloshome25@gmail.com</p>
        </div>

        <h2>2. Finalidad del tratamiento</h2>
        <p>Los datos personales recabados a través del sitio web serán tratados con las siguientes finalidades:</p>
        <ul>
          <li>Atender consultas realizadas por el usuario</li>
          <li>Gestionar la relación comercial o profesional</li>
          <li>Envío de comunicaciones comerciales (si procede y con consentimiento expreso)</li>
        </ul>

        <h2>3. Legitimación</h2>
        <p>La base legal para el tratamiento de sus datos es:</p>
        <ul>
          <li>Consentimiento del interesado</li>
          <li>Ejecución de un contrato</li>
          <li>Cumplimiento de obligaciones legales</li>
        </ul>

        <h2>4. Conservación de los datos</h2>
        <p>
          Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y
          para determinar posibles responsabilidades derivadas de dicha finalidad y del tratamiento de los datos.
        </p>

        <h2>5. Destinatarios</h2>
        <p>
          No se cederán datos a terceros salvo obligación legal o cuando sea estrictamente necesario para la prestación
          del servicio contratado.
        </p>

        <h2>6. Derechos del usuario</h2>
        <p>El usuario puede ejercer los siguientes derechos en cualquier momento:</p>
        <ul>
          <li>Acceso a sus datos personales</li>
          <li>Rectificación de datos inexactos</li>
          <li>Supresión de sus datos</li>
          <li>Oposición al tratamiento</li>
          <li>Limitación del tratamiento</li>
          <li>Portabilidad de los datos</li>
        </ul>
        <p>
          Puede ejercer sus derechos enviando una solicitud escrita a{' '}
          <a href="mailto:xyloshome25@gmail.com" className="link-contacto">xyloshome25@gmail.com</a>,
          indicando el derecho que desea ejercer y adjuntando copia de su documento de identidad.
        </p>

        <h2>7. Medidas de seguridad</h2>
        <p>
          El responsable ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los
          datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
        </p>

        <h2>8. Cambios en la política de privacidad</h2>
        <p>
          El titular se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o
          jurisprudenciales. Los cambios serán publicados en esta misma página.
        </p>

        <div className="legal-footer-nav">
          <Link to="/legal/aviso-legal">Aviso legal</Link>
          <Link to="/legal/politica-privacidad" className="active">Política de privacidad</Link>
          <Link to="/legal/politica-cookies">Política de cookies</Link>
          <Link to="/">← Volver al inicio</Link>
        </div>
      </div>
      <Footer />
      <CookieBanner />
    </>
  )
}
