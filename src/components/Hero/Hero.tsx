import { useState, useEffect } from 'react'
import './Hero.css'

const SLIDES = ['/img/renderHero.jpeg', '/img/render1.jpeg', '/img/render2.jpeg']

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero">
      <div className="fondo-carrusel">
        {SLIDES.map((src, i) => (
          <div
            key={src}
            className={`slide-fondo${i === activeIndex ? ' activa' : ''}`}
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>
      <div className="capa-oscura"></div>
      <h1>Tu vivienda a medida<br />desde el primer día</h1>
      <p>
        Creamos espacios, construimos vidas.<br />
        Cuéntanos cómo imaginas tu hogar ideal y nuestro equipo de expertos lo hará realidad.
      </p>
      <a href="#contacto">Solicita presupuesto</a>
    </section>
  )
}
