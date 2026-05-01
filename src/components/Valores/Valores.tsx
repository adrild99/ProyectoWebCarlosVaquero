import './Valores.css'

export default function Valores() {
  return (
    <section id="valores">
      <h2>¿Por qué elegirnos?</h2>
      <div className="grid-3">
        <div className="card">
          <h3>Rapidez</h3>
          <p>
            Disfruta de tu nuevo hogar sin esperas interminables. Nuestro sistema reduce los plazos
            frente a la construcción tradicional, garantizando por contrato tu fecha de entrega.
          </p>
        </div>
        <div className="card">
          <h3>Proceso claro</h3>
          <p>
            Relájate, nosotros nos encargamos de todo. Desde los primeros trámites hasta que cruzas
            tu puerta, te acompañamos en cada fase con total transparencia y comunicación.
          </p>
        </div>
        <div className="card">
          <h3>Calidad</h3>
          <p>
            Desde el punto de vista del confort, este tipo de construcciones ofrecen excelentes
            propiedades térmicas y acústicas. La capacidad natural del material, combinada con
            soluciones de cerramiento adecuadas, permite alcanzar altos niveles de eficiencia
            energética y bienestar interior.
          </p>
        </div>
        <div className="card">
          <h3>Equipo</h3>
          <p>
            En Xylos Home, tenemos detrás un equipo de arquitectos y técnicos expertos trabajando
            codo con codo. Transformamos tu visión en realidad con precisión milimétrica y total
            dedicación.
          </p>
        </div>
      </div>
    </section>
  )
}
