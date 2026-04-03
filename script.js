// CARRUSEL HERO (INICIO)
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.slide-fondo');
    let slideActual = 0;

    // Solo funciona si encuentra las imágenes
    if (slides.length > 0) {
        setInterval(() => {
            // Apaga la foto actual
            slides[slideActual].classList.remove('activa');
            
            // Calcula cuál es la siguiente foto
            slideActual = (slideActual + 1) % slides.length;
            
            // Enciende la siguiente foto
            slides[slideActual].classList.add('activa');
        }, 5000); // 5000 = Cambia de foto cada 5 segundos
    }
});



// ── FORMULARIO MULTI-PASO ──────────────────────────────
let pasoActual = 1;
const totalPasos = 7;

// Inicializamos la UI al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    actualizarUI();
});

// Avanzar al siguiente paso
function pasoPosterior() {
    if (!validarPaso(pasoActual)) return;

    //  Si estamos en el último paso enviamos los datos en segundo plano ---
    if (pasoActual === totalPasos) {
        var form = document.getElementById('formularioProyecto');
        var botonContinuar = document.getElementById('btnContinuar');
        var botonAtras = document.getElementById('btnAtras');

        // 1. Cambiamos el botón para que el cliente vea que está cargando
        botonContinuar.textContent = 'Enviando...';
        botonContinuar.disabled = true; // Desactivamos el botón para que no haga doble clic
        botonAtras.style.visibility = 'hidden'; // Ocultamos el botón de atrás

        // 2. Recogemos todos los datos del formulario
        var datos = new FormData(form);

        // 3. Enviamos los datos a Formspree de forma invisible
        fetch(form.action, {
            method: form.method,
            body: datos,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // ÉXITO: Ocultamos todo el contenido del formulario y mostramos el mensaje de Gracias
                form.innerHTML = `
                    <div style="text-align: center; padding: 50px 20px;">
                        <h2 style="margin-bottom: 15px;">¡Mensaje enviado con éxito!</h2>
                        <p style="font-size: 18px; color: #555;">Gracias por contarnos sobre tu proyecto. El equipo de Xylos Home lo revisará y te llamaremos en el horario que has elegido.</p>
                    </div>
                `;
            } else {
                // SI ALGO FALLA (ej. Formspree pide captcha)
                alert("Hubo un problema al enviar. Por favor, inténtalo de nuevo.");
                botonContinuar.textContent = 'Enviar';
                botonContinuar.disabled = false;
                botonAtras.style.visibility = 'visible';
            }
        }).catch(error => {
            alert("Error de conexión. Comprueba tu internet.");
            botonContinuar.textContent = 'Enviar';
            botonContinuar.disabled = false;
            botonAtras.style.visibility = 'visible';
        });

        return; // Detenemos la ejecución aquí
    }
    if (pasoActual === 6) {
        document.getElementById('resumen-nombre').textContent = document.getElementById('nombre').value;
        document.getElementById('resumen-apellidos').textContent = document.getElementById('apellidos').value;
        document.getElementById('resumen-email').textContent = document.getElementById('email').value;
        document.getElementById('resumen-telefono').textContent = document.getElementById('telefono').value;
    }

    // Ocultamos el paso actual
    document.getElementById('paso' + pasoActual).classList.remove('activo');

    // Avanzamos
    pasoActual++;

    // Mostramos el siguiente (si existe)
    var siguiente = document.getElementById('paso' + pasoActual);
    if (siguiente) {
        siguiente.classList.add('activo');
    }

    actualizarUI();
}

// Retroceder al paso anterior
function pasoAnterior() {
    if (pasoActual === 1) return;

    document.getElementById('paso' + pasoActual).classList.remove('activo');
    pasoActual--;
    document.getElementById('paso' + pasoActual).classList.add('activo');

    actualizarUI();
}

// Actualiza la barra de progreso y el texto del botón
function actualizarUI() {
    var porcentaje = ((pasoActual - 1) / totalPasos) * 100;
    document.getElementById('progressFill').style.width = porcentaje + '%';
    document.getElementById('progressLabel').textContent = 'Paso ' + pasoActual + ' de ' + totalPasos;

    // Ocultar botón Atrás en el paso 1
    document.getElementById('btnAtras').style.visibility = pasoActual === 1 ? 'hidden' : 'visible';

    // Cambiar texto del botón en el último paso
    document.getElementById('btnContinuar').textContent = pasoActual === totalPasos ? 'Enviar' : 'Continuar';
}

// Validación del paso actual antes de avanzar
function validarPaso(paso) {

    // --- VALIDACIÓN DEL PASO 1 ---
    if (paso === 1) {
        var nombre = document.getElementById('nombre');
        var email = document.getElementById('email');
        var telefono = document.getElementById('telefono');

        nombre.setCustomValidity('');
        email.setCustomValidity('');
        telefono.setCustomValidity('');

        if (!nombre.value.trim()) {
            nombre.setCustomValidity('Por favor, dinos tu nombre.');
            nombre.reportValidity();
            return false;
        }

        if (!email.value.trim()) {
            email.setCustomValidity('Por favor, introduce un correo válido.');
            email.reportValidity();
            return false;
        }

        var telValor = telefono.value.trim();
        var regexTelefono = /^[0-9]{9}$/;

        if (!telValor) {
            telefono.setCustomValidity('Por favor, déjanos un teléfono de contacto.');
            telefono.reportValidity();
            return false;
        } else if (!regexTelefono.test(telValor)) {
            telefono.setCustomValidity('El teléfono debe contener exactamente 9 dígitos.');
            telefono.reportValidity();
            return false;
        }
    }

    // --- VALIDACIÓN DEL PASO 2 ---
    if (paso === 2) {
        // Buscamos todas las opciones que tengan el nombre 'estado_proyecto'
        var opcionesProyecto = document.getElementsByName('estado_proyecto');
        var seleccionado = false;

        // Recorremos las opciones para ver si hay alguna marcada
        for (var i = 0; i < opcionesProyecto.length; i++) {
            if (opcionesProyecto[i].checked) {
                seleccionado = true;
                break; // Si encontramos una marcada, paramos de buscar
            }
        }

        // Si no hay ninguna marcada, mostramos error
        if (!seleccionado) {
            // Mostramos la burbuja en el primer elemento del grupo
            opcionesProyecto[0].setCustomValidity('Por favor, selecciona una opción para continuar.');
            opcionesProyecto[0].reportValidity();
            return false;
        } else {
            // Limpiamos el error por si acaso
            opcionesProyecto[0].setCustomValidity('');
        }
    }

    // --- VALIDACIÓN DEL PASO 3 ---
    if (paso === 3) {
        var opcionesPresupuesto = document.getElementsByName('presupuesto');
        var seleccionado = false;

        for (var i = 0; i < opcionesPresupuesto.length; i++) {
            if (opcionesPresupuesto[i].checked) {
                seleccionado = true;
                break;
            }
        }

        if (!seleccionado) {
            opcionesPresupuesto[0].setCustomValidity('Por favor, selecciona un rango de presupuesto para continuar.');
            opcionesPresupuesto[0].reportValidity();
            return false;
        } else {
            opcionesPresupuesto[0].setCustomValidity('');
        }
    }

    // --- VALIDACIÓN DEL PASO 4 ---
    if (paso === 4) {
        var opcionesTiempo = document.getElementsByName('tiempo_inicio');
        var seleccionado = false;

        for (var i = 0; i < opcionesTiempo.length; i++) {
            if (opcionesTiempo[i].checked) {
                seleccionado = true;
                break;
            }
        }

        if (!seleccionado) {
            opcionesTiempo[0].setCustomValidity('Por favor, indícanos cuándo planeas empezar para continuar.');
            opcionesTiempo[0].reportValidity();
            return false;
        } else {
            opcionesTiempo[0].setCustomValidity('');
        }
    }
    // --- VALIDACIÓN DEL PASO 5 (Horario) ---
    if (paso === 5) {
        var opcionesHorario = document.getElementsByName('horario_llamada');
        var seleccionado = false;

        for (var i = 0; i < opcionesHorario.length; i++) {
            if (opcionesHorario[i].checked) {
                seleccionado = true;
                break;
            }
        }

        if (!seleccionado) {
            opcionesHorario[0].setCustomValidity('Por favor, dinos a qué hora prefieres que te llamemos.');
            opcionesHorario[0].reportValidity();
            return false;
        } else {
            opcionesHorario[0].setCustomValidity('');
        }
    }

    // --- VALIDACIÓN DEL PASO 6 (Ciudad) ---
    if (paso === 6) {
        var ciudad = document.getElementById('ciudad');

        ciudad.setCustomValidity('');

        if (!ciudad.value.trim()) {
            ciudad.setCustomValidity('Por favor, indícanos en qué ciudad quieres construir.');
            ciudad.reportValidity();
            return false;
        }
    }

    // Aquí iremos añadiendo la validación del paso 3, 4, 5...
    return true;
}

// --- ACORDEÓN DE PREGUNTAS FRECUENTES ---
document.addEventListener("DOMContentLoaded", function() {
    // Buscamos todas las cajas de preguntas
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const titulo = item.querySelector('h3'); // Tu pregunta
        const respuesta = item.querySelector('p'); // Tu respuesta

        titulo.addEventListener('click', () => {
            const estaAbierto = item.classList.contains('abierto');

            // 1. Cerramos absolutamente todas las preguntas primero
            faqItems.forEach(otroItem => {
                otroItem.classList.remove('abierto');
                otroItem.querySelector('p').style.maxHeight = null;
            });

            // 2. Si la que hemos pinchado NO estaba abierta, la abrimos
            if (!estaAbierto) {
                item.classList.add('abierto');
                // scrollHeight calcula exactamente lo que mide el texto para que baje justo lo necesario
                respuesta.style.maxHeight = respuesta.scrollHeight + "px"; 
            }
        });
    });
});