// ── FORMULARIO MULTI-PASO ──────────────────────────────
// Por ahora solo tenemos el paso 1.
// Iremos añadiendo pasos aquí uno a uno.

let pasoActual = 1;
const totalPasos = 7;

// Inicializamos la UI al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    actualizarUI();
});

// Avanzar al siguiente paso
function pasoPosterior() {
    if (!validarPaso(pasoActual)) return;

    if (pasoActual === totalPasos) {
        // En un caso real, esto envía los datos a la URL del "action" del form
        document.getElementById('formularioProyecto').submit();
        return; // Detenemos el código aquí
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
            telefono.setCustomValidity('El teléfono debe contener exactamente 9 números.');
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