import { useState, useEffect, useRef } from 'react'
import './Galeria.css'

const SLIDES = [
  { src: '/img/render1.jpeg', num: '01', titulo: 'Villa Contemporánea', desc: 'Diseño modular a medida con máxima eficiencia energética. Cada espacio pensado para quien lo habita.', tag: 'Vivienda unifamiliar' },
  { src: '/img/construccion3.jpeg', num: '02', titulo: 'Proyecto en Sierra', desc: 'Integración perfecta con el entorno natural, respetando la topografía y maximizando las vistas.', tag: 'Entorno natural' },
  { src: '/img/render2.jpeg', num: '03', titulo: 'Residencial Lujo', desc: 'Acabados premium y espacios abiertos que convierten cada estancia en una experiencia.', tag: 'Premium' },
  { src: '/img/construccion4.jpeg', num: '04', titulo: 'Montaje Modular', desc: 'Ejecución rápida y limpia en parcela. Del proyecto a la entrega en plazos cerrados por contrato.', tag: 'Proceso constructivo' },
  { src: '/img/renderHero.jpeg', num: '05', titulo: 'Vivienda Unifamiliar', desc: 'Amplitud y luz natural como protagonistas. Arquitectura que respira y conecta interior con exterior.', tag: 'Diseño abierto' },
  { src: '/img/construccion1.jpeg', num: '06', titulo: 'Estructura Base', desc: 'Materiales de alta durabilidad y resistencia certificados bajo norma EN 14080, con Marcado CE.', tag: 'Ingeniería' },
]

export default function Galeria() {
  const [indice, setIndice] = useState(0)
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchXRef = useRef<number | null>(null)

  function irA(nuevoIndice: number) {
    setIndice((nuevoIndice + SLIDES.length) % SLIDES.length)
  }

  function iniciarAuto() {
    intervaloRef.current = setInterval(() => {
      setIndice(prev => (prev + 1) % SLIDES.length)
    }, 5000)
  }

  function reiniciarAuto() {
    if (intervaloRef.current) clearInterval(intervaloRef.current)
    iniciarAuto()
  }

  useEffect(() => {
    iniciarAuto()
    return () => { if (intervaloRef.current) clearInterval(intervaloRef.current) }
  }, [])

  function handleTouchStart(e: React.TouchEvent) {
    touchXRef.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchXRef.current === null) return
    const diff = touchXRef.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) { irA(diff > 0 ? indice + 1 : indice - 1); reiniciarAuto() }
    touchXRef.current = null
  }

  return (
    <section id="galeria">
      <div className="galeria-cabecera">
        <span className="galeria-etiqueta">Nuestro trabajo</span>
        <h2>Proyectos realizados</h2>
        <p className="galeria-subtitulo">Cada vivienda es el resultado de escuchar, diseñar y construir sin compromisos.</p>
      </div>

      <div className="carrusel-wrapper">
        <div
          className="carrusel-pista"
          style={{ transform: `translateX(-${indice * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {SLIDES.map(slide => (
            <div className="carrusel-slide" key={slide.num}>
              <div className="carrusel-imagen">
                <img src={slide.src} alt={slide.titulo} />
              </div>
              <div className="carrusel-ficha">
                <span className="ficha-numero">{slide.num}</span>
                <h3 className="ficha-titulo">{slide.titulo}</h3>
                <p className="ficha-descripcion">{slide.desc}</p>
                <span className="ficha-tag">{slide.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="carrusel-btn carrusel-btn--prev" aria-label="Anterior"
          onClick={() => { irA(indice - 1); reiniciarAuto() }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button className="carrusel-btn carrusel-btn--next" aria-label="Siguiente"
          onClick={() => { irA(indice + 1); reiniciarAuto() }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        <div className="carrusel-puntos">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`carrusel-punto${i === indice ? ' activo' : ''}`}
              aria-label={`Ir al proyecto ${i + 1}`}
              onClick={() => { irA(i); reiniciarAuto() }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
