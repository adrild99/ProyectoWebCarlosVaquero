import { useState, useRef } from 'react'
import './FAQ.css'

interface FaqItem {
  pregunta: string
  respuesta: string | React.ReactNode
}

const FAQ_ITEMS: FaqItem[] = [
  {
    pregunta: '¿Cuánto tiempo tarda el proceso?',
    respuesta:
      'El tiempo exacto depende del tamaño y los detalles de tu proyecto, pero nuestro sistema modular nos permite reducir los plazos casi a la mitad en comparación con la obra tradicional. Una vez cerrado el diseño y obtenida la licencia, construimos tu casa en un entorno controlado y te la entregamos en unos plazos cerrados por contrato, sin retrasos inesperados.',
  },
  {
    pregunta: '¿El diseño es personalizado?',
    respuesta:
      'Por supuesto. Aunque optimizamos la construcción mediante nuestro sistema modular, tu casa será única. Partimos de tus gustos, las características de tu terreno y tus necesidades reales para diseñar espacios a medida que encajen con tu estilo de vida.',
  },
  {
    pregunta: '¿Qué garantías ofrecéis?',
    respuesta:
      'Tu tranquilidad es nuestra prioridad. Nuestras viviendas cumplen con el Código Técnico de la Edificación (CTE), ofreciéndote la misma seguridad que cualquier construcción tradicional. Trabajamos con materiales diseñados para garantizar la durabilidad y un mantenimiento mínimo a lo largo de los años. Las condiciones y garantías específicas quedarán reflejadas por contrato',
  },
  {
    pregunta: '¿Trabajáis en toda España?',
    respuesta:
      'Sí, llevamos la experiencia Xylos Home a cualquier punto de la península. Nos encargamos de todo, garantizando que todo el proceso fluya sin complicaciones hasta la entrega de las llaves de tu nuevo hogar.',
  },
  {
    pregunta: '¿Son casa de madera?',
    respuesta:
      'No, nosotros no construimos casas de madera prefabricadas, diseñamos hogares con estructura de madera en su interior, sustituyendo el hormigón, acero o ladrillo. La madera tiene una forma muy particular de "abrazar" el espacio, el aire no se siente rígido ni frío como en una construcción de hormigón.',
  },
  {
    pregunta: '¿Cómo es el proceso constructivo?',
    respuesta: (
      <>
        El proceso comienza como en cualquier construcción tradicional: con un proyecto arquitectónico diseñado a
        medida y adaptado a tus gustos. Una vez aprobado, la construcción se realiza in situ en tu parcela,
        siendo una alternativa eficiente, sostenible y avanzada. <br /><br />Utilizamos madera estructural con
        excelentes prestaciones mecánicas y una gran ligereza, lo que reduce las cargas y permite cimentaciones más
        económicas y menos invasivas.
        <br /><br /> Una vez finalizada la fase estructural de madera, el proceso de acabados interiores es idéntico al de
        la obra tradicional. El resultado final es indistinguible; podrás personalizar cada espacio a tu gusto utilizando los
        mismos materiales que en una vivienda convencional, ya sea mármol, cerámica o cualquier otro revestimiento que
        desees para tu nuevo hogar.
      </>
    ),
  },
  {
    pregunta: '¿Son igual de resistentes que una casa de ladrillo tradicional?',
    respuesta: (
      <>
        Sí, la estructura de estas viviendas es madera homologada GL24 Abeto, una madera cuperizada que se emplea para
        este tipo de construcciones en toda Europa, avalada por el Marcado CE bajo la norma EN 14080:
        <br /><br />Madera laminada de alta resistencia y durabilidad que, como resultado final, consigue una vivienda
        ejecutada en plazos de tiempo cortos, entre 2 y 3 meses, con una eficiencia energética tipo A o A++.
        <br /><br />
        <img src="/logos/SVG/C-E-logo.svg" alt="Marcado CE" style={{ height: '60px', verticalAlign: 'middle', marginBottom: '8px' }} />
      </>
    ),
  },
  {
    pregunta: '¿Me ayudáis con el papeleo y las licencias?',
    respuesta:
      'Sí. Sabemos que la burocracia puede ser abrumadora, por eso ofrecemos un servicio integral. Nuestro equipo se encarga de gestionar el proyecto básico, el de ejecución, los visados y la solicitud de licencias en tu ayuntamiento para que tú solo tengas que preocuparte de elegir los acabados.',
  },
  {
    pregunta: '¿Puedo conseguir una hipoteca para este tipo de casa?',
    respuesta:
      'Sí. Al ser bienes inmuebles anclados al terreno y cumplir con el CTE, nuestras casas son 100% hipotecables. El formato que conceden los bancos para estos casos se llama "Hipoteca Autopromotor", y funcionan igual que si construyeras una casa tradicional.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const answerRefs = useRef<(HTMLParagraphElement | null)[]>([])

  function toggle(index: number) {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section id="faq">
      <h2>Preguntas frecuentes</h2>
      {FAQ_ITEMS.map((item, i) => (
        <div className={`faq-item${openIndex === i ? ' abierto' : ''}`} key={item.pregunta}>
          <h3 onClick={() => toggle(i)}>{item.pregunta}</h3>
          <p
            ref={el => { answerRefs.current[i] = el }}
            style={{
              maxHeight: openIndex === i ? `${answerRefs.current[i]?.scrollHeight ?? 0}px` : '0',
            }}
          >
            {item.respuesta}
          </p>
        </div>
      ))}
    </section>
  )
}
