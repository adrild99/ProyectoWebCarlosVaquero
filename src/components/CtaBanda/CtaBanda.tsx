import './CtaBanda.css'

interface CtaBandaProps {
  text: string
  cta: string
  dark?: boolean
}

export default function CtaBanda({ text, cta, dark = false }: CtaBandaProps) {
  return (
    <section className={`cta-banda${dark ? ' cta-banda-oscura' : ''}`}>
      <p className="cta-banda-texto">{text}</p>
      <a href="#contacto" className="cta-banda-btn">{cta}</a>
    </section>
  )
}
