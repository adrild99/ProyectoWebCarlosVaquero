import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import CookieBanner from '../components/CookieBanner/CookieBanner'
import '../styles/legal.css'

export default function PoliticaCookies() {
  return (
    <>
      <Navbar />
      <div className="legal-hero">
        <h1>Política de Cookies</h1>
        <p>Información sobre el uso de cookies</p>
      </div>
      <div className="legal-content">
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario al visitar una página
          web. Sirven para recordar información sobre su visita y mejorar la experiencia de usuario en futuras visitas.
        </p>

        <h2>2. Tipos de cookies utilizadas</h2>
        <p>Este sitio web puede utilizar los siguientes tipos de cookies:</p>

        <table className="cookies-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Técnicas</strong></td>
              <td>Necesarias para el correcto funcionamiento del sitio web. Sin ellas la web no funciona correctamente.</td>
              <td><span className="badge badge-necesaria">Necesaria</span></td>
            </tr>
            <tr>
              <td><strong>Personalización</strong></td>
              <td>Permiten recordar preferencias del usuario como idioma o región.</td>
              <td><span className="badge badge-necesaria">Necesaria</span></td>
            </tr>
            <tr>
              <td><strong>Análisis</strong></td>
              <td>Permiten cuantificar el número de usuarios y realizar medición estadística del uso del sitio.</td>
              <td><span className="badge badge-analitica">Analítica</span></td>
            </tr>
            <tr>
              <td><strong>Publicitarias</strong></td>
              <td>Gestionan espacios publicitarios y permiten mostrar anuncios relevantes.</td>
              <td><span className="badge badge-marketing">Marketing</span></td>
            </tr>
          </tbody>
        </table>

        <h2>3. Cookies de terceros</h2>
        <p>
          Este sitio web puede utilizar servicios de terceros que recopilan información con fines estadísticos y de uso
          del sitio web, como Google Analytics. Estos servicios están sujetos a sus propias políticas de privacidad.
        </p>

        <h2>4. Consentimiento</h2>
        <p>
          Al acceder al sitio web, el usuario es informado del uso de cookies. La continuación de la navegación o la
          aceptación expresa a través del banner de cookies implica la aceptación de su uso en las condiciones contenidas
          en la presente política.
        </p>

        <h2>5. Cómo desactivar las cookies</h2>
        <p>
          El usuario puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo mediante la
          configuración de las opciones del navegador:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
          <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad</li>
          <li><strong>Microsoft Edge:</strong> Configuración → Privacidad, búsqueda y servicios</li>
        </ul>
        <p>La desactivación de cookies puede afectar al correcto funcionamiento de algunas secciones del sitio web.</p>

        <h2>6. Actualización de la política de cookies</h2>
        <p>
          El titular puede modificar esta política en función de exigencias legislativas o con la finalidad de adaptarla
          a las instrucciones dictadas por las autoridades competentes. Los cambios serán publicados en esta misma página.
        </p>

        <div className="legal-footer-nav">
          <Link to="/legal/aviso-legal">Aviso legal</Link>
          <Link to="/legal/politica-privacidad">Política de privacidad</Link>
          <Link to="/legal/politica-cookies" className="active">Política de cookies</Link>
          <Link to="/">← Volver al inicio</Link>
        </div>
      </div>
      <Footer />
      <CookieBanner />
    </>
  )
}
