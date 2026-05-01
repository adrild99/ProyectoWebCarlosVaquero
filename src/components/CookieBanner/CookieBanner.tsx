import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CookieBanner.css'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookiesAceptadas')) {
      setVisible(true)
    }
  }, [])

  function aceptar() {
    localStorage.setItem('cookiesAceptadas', 'true')
    setVisible(false)
  }

  return (
    <div className={`banner-cookies${visible ? '' : ' oculto'}`} id="banner-cookies">
      <p>
        Utilizamos cookies propias y de terceros para mejorar nuestros servicios y analizar el
        tráfico de la web. Si continúas navegando, consideramos que aceptas su uso.
      </p>
      <div className="cookies-botones">
        <Link to="/legal/politica-cookies" className="link-cookies">Más información</Link>
        <button id="btn-aceptar-cookies" className="btn-cookies" onClick={aceptar}>Aceptar</button>
      </div>
    </div>
  )
}
