import { useState } from 'react'
import './Contacto.css'

interface FormData {
  firstname: string
  lastname: string
  email: string
  phone: string
  situacion_terreno: string
  estado_diseno_vivienda: string
  momento_actual_cliente: string
  presupuesto: string
  tiempo_inicio: string
  horario_llamada: string
  city: string
  politica_privacidad: boolean
}

const TOTAL_PASOS = 10

const initialFormData: FormData = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  situacion_terreno: '',
  estado_diseno_vivienda: '',
  momento_actual_cliente: '',
  presupuesto: '',
  tiempo_inicio: '',
  horario_llamada: '',
  city: '',
  politica_privacidad: false,
}

export default function Contacto() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const progressPercent = ((currentStep - 1) / TOTAL_PASOS) * 100

  function validarPaso(paso: number): boolean {
    setError('')

    if (paso === 1) {
      if (!formData.firstname.trim()) {
        alert('Por favor, dinos tu nombre.')
        return false
      }
      if (!formData.email.trim()) {
        alert('Por favor, introduce un correo válido.')
        return false
      }
      const regexTelefono = /^[0-9]{9}$/
      if (!formData.phone.trim()) {
        alert('Por favor, déjanos un teléfono de contacto.')
        return false
      }
      if (!regexTelefono.test(formData.phone.trim())) {
        alert('El teléfono debe contener exactamente 9 dígitos.')
        return false
      }
    }

    if (paso === 2) {
      if (!formData.situacion_terreno) {
        setError('Por favor, selecciona una opción para continuar.')
        return false
      }
    }

    if (paso === 3) {
      if (!formData.estado_diseno_vivienda) {
        setError('Por favor, selecciona una opción para continuar.')
        return false
      }
    }

    if (paso === 4) {
      if (!formData.momento_actual_cliente) {
        setError('Por favor, selecciona una opción para continuar.')
        return false
      }
    }

    if (paso === 5) {
      if (!formData.presupuesto) {
        setError('Por favor, selecciona un rango de presupuesto para continuar.')
        return false
      }
    }

    if (paso === 6) {
      if (!formData.tiempo_inicio) {
        setError('Por favor, indícanos cuándo planeas empezar para continuar.')
        return false
      }
    }

    if (paso === 7) {
      if (!formData.horario_llamada) {
        setError('Por favor, dinos a qué hora prefieres que te llamemos.')
        return false
      }
    }

    if (paso === 8) {
      if (!formData.city.trim()) {
        alert('Por favor, indícanos en qué ciudad quieres construir.')
        return false
      }
    }

    if (paso === 9) {
      if (!formData.politica_privacidad) {
        alert('Debes aceptar la política de privacidad para continuar.')
        return false
      }
    }

    return true
  }

  function pasoPosterior() {
    if (!validarPaso(currentStep)) return

    if (currentStep === TOTAL_PASOS) {
      submitForm()
      return
    }

    setCurrentStep(prev => prev + 1)
  }

  function pasoAnterior() {
    if (currentStep === 1) return
    setError('')
    setCurrentStep(prev => prev - 1)
  }

  function submitForm() {
    setSubmitting(true)

    const portalId = '148238965'
    const formGuid = '8838d4f3-370d-48f0-9db3-293641204f58'

    const datos = {
      fields: [
        { name: 'firstname', value: formData.firstname },
        { name: 'lastname', value: formData.lastname },
        { name: 'email', value: formData.email },
        { name: 'phone', value: formData.phone },
        { name: 'situacion_terreno', value: formData.situacion_terreno },
        { name: 'estado_diseno_vivienda', value: formData.estado_diseno_vivienda },
        { name: 'momento_actual_cliente', value: formData.momento_actual_cliente },
        { name: 'presupuesto', value: formData.presupuesto },
        { name: 'tiempo_inicio', value: formData.tiempo_inicio },
        { name: 'horario_llamada', value: formData.horario_llamada },
        { name: 'city', value: formData.city },
        { name: 'politica_privacidad', value: formData.politica_privacidad ? 'Aceptada' : '' },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    }

    fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      }
    )
      .then(response => {
        if (response.ok) {
          setSubmitted(true)
        } else {
          alert('Hubo un problema al enviar. Por favor, inténtalo de nuevo.')
          setSubmitting(false)
        }
      })
      .catch(() => {
        alert('Error de conexión. Comprueba tu internet.')
        setSubmitting(false)
      })
  }

  if (submitted) {
    return (
      <section id="contacto">
        <div className="exito-envio">
          <h2>¡Mensaje enviado con éxito!</h2>
          <p>
            Gracias por contarnos sobre tu proyecto. El equipo de Xylos Home lo revisará y te
            llamaremos en el horario que has elegido.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contacto">
      <h2>Hablemos de tu proyecto</h2>
      <p>Cuéntanos sobre ti y tu proyecto. Te llamamos cuando prefieras.</p>
      <form className="form-wizard" id="formularioProyecto" onSubmit={e => e.preventDefault()}>
        {/* BARRA DE PROGRESO */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="progress-label">Paso {currentStep} de {TOTAL_PASOS}</p>

        {/* PASO 1 */}
        <div className={`paso${currentStep === 1 ? ' activo' : ''}`} id="paso1">
          <h3 className="paso-titulo">Información de contacto</h3>
          <p className="paso-subtitulo">Esta información será usada para contactarte</p>
          <div className="campos-grupo">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Nombre"
              value={formData.firstname}
              onChange={e => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
            />
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Apellidos"
              value={formData.lastname}
              onChange={e => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Número de teléfono"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>

        {/* PASO 2 */}
        <div className={`paso${currentStep === 2 ? ' activo' : ''}`} id="paso2">
          <h3 className="paso-titulo centrado">¿En qué situación se encuentra tu terreno?</h3>
          <div className="opciones-grupo">
            {[
              'Terreno urbano listo para construir',
              'Terreno urbano pendiente de trámites',
              'Terreno rústico',
              'Aún no tengo terreno',
              'No lo sé / necesito asesoramiento',
            ].map(opcion => (
              <label className="opcion-tarjeta" key={opcion}>
                <span className="opcion-texto">{opcion} </span>
                <input
                  type="radio"
                  name="situacion_terreno"
                  value={opcion}
                  checked={formData.situacion_terreno === opcion}
                  onChange={e => setFormData(prev => ({ ...prev, situacion_terreno: e.target.value }))}
                />
                <span className="radio-personalizado"></span>
              </label>
            ))}
          </div>
        </div>

        {/* PASO 3 */}
        <div className={`paso${currentStep === 3 ? ' activo' : ''}`} id="paso3">
          <h3 className="paso-titulo centrado">¿En qué punto se encuentra el diseño de tu vivienda? </h3>
          <p className="paso-subtitulo">
            Trabajamos tanto con proyectos diseñados desde cero como con ideas o proyectos previos.
          </p>
          <div className="opciones-grupo">
            <select
              id="estado_diseno_vivienda"
              name="estado_diseno_vivienda"
              className="select-paso"
              value={formData.estado_diseno_vivienda}
              onChange={e => setFormData(prev => ({ ...prev, estado_diseno_vivienda: e.target.value }))}
            >
              <option value="" disabled>Selecciona una opción...</option>
              <option value="Sin proyecto">Sin proyecto</option>
              <option value="Anteproyecto">Anteproyecto</option>
              <option value="Proyecto básico">Proyecto básico</option>
              <option value="Proyecto de ejecución sin visar">Proyecto de ejecución (sin visar o incompleto)</option>
              <option value="Proyecto de ejecución completo y visado">Proyecto de ejecución completo y visado</option>
              <option value="Licencia solicitada">Licencia solicitada</option>
              <option value="Licencia concedida">Licencia concedida</option>
              <option value="Licencia concedida pendiente de financiación">Licencia concedida pero pendiente de financiación</option>
              <option value="Licencia caducada">Licencia caducada</option>
              <option value="Obra iniciada con otro constructor">Obra iniciada con otro constructor</option>
            </select>
          </div>
        </div>

        {/* PASO 4 */}
        <div className={`paso${currentStep === 4 ? ' activo' : ''}`} id="paso4">
          <h3 className="paso-titulo centrado">¿En qué punto te encuentras ahora mismo? </h3>
          <div className="opciones-grupo">
            {[
              { label: 'Tenemos claro que queremos construir y estamos valorando opciones ', value: 'Valorando opciones' },
              { label: 'Nos interesa la vivienda modular y queremos entender bien el proceso ', value: 'Interesado en modular' },
              { label: 'Estamos comparando empresas constructoras de casas modulares ', value: 'Comparando empresas' },
              { label: 'Solo estamos informándonos por ahora ', value: 'Informándose' },
            ].map(opcion => (
              <label className="opcion-tarjeta" key={opcion.value}>
                <span className="opcion-texto">{opcion.label}</span>
                <input
                  type="radio"
                  name="momento_actual_cliente"
                  value={opcion.value}
                  checked={formData.momento_actual_cliente === opcion.value}
                  onChange={e => setFormData(prev => ({ ...prev, momento_actual_cliente: e.target.value }))}
                />
                <span className="radio-personalizado"></span>
              </label>
            ))}
          </div>
        </div>

        {/* PASO 5 */}
        <div className={`paso${currentStep === 5 ? ' activo' : ''}`} id="paso5">
          <h3 className="paso-titulo centrado">¿Cuánto presupuesto aproximado tienes? </h3>
          <div className="opciones-grupo">
            {[
              { label: 'Menos de 200.000€ ', value: 'Menos de 200k' },
              { label: 'De 200.000 a 400.000€ ', value: '200k - 400k' },
              { label: 'De 400.000€ a 1 millón ', value: '400k - 1M' },
              { label: 'De 1 a 2 millones de € ', value: '1M - 2M' },
              { label: 'Más de 2 millones de € ', value: 'Mas de 2M' },
            ].map(opcion => (
              <label className="opcion-tarjeta" key={opcion.value}>
                <span className="opcion-texto">{opcion.label}</span>
                <input
                  type="radio"
                  name="presupuesto"
                  value={opcion.value}
                  checked={formData.presupuesto === opcion.value}
                  onChange={e => setFormData(prev => ({ ...prev, presupuesto: e.target.value }))}
                />
                <span className="radio-personalizado"></span>
              </label>
            ))}
          </div>
        </div>

        {/* PASO 6 */}
        <div className={`paso${currentStep === 6 ? ' activo' : ''}`} id="paso6">
          <h3 className="paso-titulo centrado">¿Cuándo planeas empezar a construir?</h3>
          <div className="opciones-grupo">
            {[
              { label: 'Quiero empezar ya', value: 'Quiero empezar' },
              { label: 'De 1 a 6 meses', value: '1 a 6 meses' },
              { label: 'De 7 a 12 meses', value: '7 a 12 meses' },
              { label: 'Más de 1 año', value: 'Mas de 1 año' },
            ].map(opcion => (
              <label className="opcion-tarjeta" key={opcion.value}>
                <span className="opcion-texto">{opcion.label}</span>
                <input
                  type="radio"
                  name="tiempo_inicio"
                  value={opcion.value}
                  checked={formData.tiempo_inicio === opcion.value}
                  onChange={e => setFormData(prev => ({ ...prev, tiempo_inicio: e.target.value }))}
                />
                <span className="radio-personalizado"></span>
              </label>
            ))}
          </div>
        </div>

        {/* PASO 7 */}
        <div className={`paso${currentStep === 7 ? ' activo' : ''}`} id="paso7">
          <h3 className="paso-titulo centrado">¿Cuándo prefieres que te llamemos?</h3>
          <div className="opciones-grupo">
            {[
              { label: '8 a 12h', value: 'Mañana (8-12h)' },
              { label: '12 a 16h', value: 'Mediodia (12-16h)' },
              { label: '16 a 21h', value: 'Tarde (16-21h)' },
            ].map(opcion => (
              <label className="opcion-tarjeta" key={opcion.value}>
                <span className="opcion-texto">{opcion.label}</span>
                <input
                  type="radio"
                  name="horario_llamada"
                  value={opcion.value}
                  checked={formData.horario_llamada === opcion.value}
                  onChange={e => setFormData(prev => ({ ...prev, horario_llamada: e.target.value }))}
                />
                <span className="radio-personalizado"></span>
              </label>
            ))}
          </div>
        </div>

        {/* PASO 8 */}
        <div className={`paso${currentStep === 8 ? ' activo' : ''}`} id="paso8">
          <h3 className="paso-titulo centrado">¿En qué ciudad quieres construir?</h3>
          <div className="caja-respuesta">
            <label htmlFor="ciudad" className="etiqueta-pequena">Tu respuesta</label>
            <input
              type="text"
              id="ciudad"
              name="city"
              placeholder="Ej: Toledo"
              value={formData.city}
              onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>
        </div>

        {/* PASO 9 */}
        <div className={`paso${currentStep === 9 ? ' activo' : ''}`} id="paso9">
          <h3 className="paso-titulo centrado">Casi hemos terminado</h3>
          <p className="paso-subtitulo">Para poder contactarte necesitamos tu consentimiento.</p>
          <div className="checkbox-privacidad">
            <label className="label-checkbox">
              <input
                type="checkbox"
                id="privacidad"
                name="politica_privacidad"
                checked={formData.politica_privacidad}
                onChange={e => setFormData(prev => ({ ...prev, politica_privacidad: e.target.checked }))}
              />
              <span className="check-personalizado"></span>
              <span className="check-texto">
                He leído y acepto la{' '}
                <a href="/legal/politica-privacidad" target="_blank">política de privacidad</a>
                {' '}y consiento el envío de comunicaciones relacionadas con mi proyecto.
              </span>
            </label>
          </div>
        </div>

        {/* PASO 10 */}
        <div className={`paso${currentStep === 10 ? ' activo' : ''}`} id="paso10">
          <h3 className="paso-titulo">Resumen de tu solicitud ⓘ</h3>
          <p className="paso-subtitulo">Revisa tu información antes de enviar</p>
          <div className="campos-grupo">
            <div className="resumen-tarjeta">
              <span className="resumen-etiqueta">Nombre</span>
              <div className="resumen-valor">{formData.firstname || '-'}</div>
            </div>
            <div className="resumen-tarjeta">
              <span className="resumen-etiqueta">Apellidos</span>
              <div className="resumen-valor">{formData.lastname || '-'}</div>
            </div>
            <div className="resumen-tarjeta">
              <span className="resumen-etiqueta">Correo electrónico</span>
              <div className="resumen-valor">{formData.email || '-'}</div>
            </div>
            <div className="resumen-tarjeta">
              <span className="resumen-etiqueta">Número de teléfono</span>
              <div className="resumen-valor">{formData.phone || '-'}</div>
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && <p className="error-paso">{error}</p>}

        {/* BOTONES */}
        <div className="wizard-botones" id="wizardBotones">
          <button
            type="button"
            className="btn-atras"
            style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
            onClick={pasoAnterior}
          >
            Atrás
          </button>
          <button
            type="button"
            className="btn-continuar"
            onClick={pasoPosterior}
            disabled={submitting}
          >
            {submitting ? 'Enviando...' : currentStep === TOTAL_PASOS ? 'Enviar' : 'Continuar'}
          </button>
        </div>
      </form>
    </section>
  )
}
