// CARRUSEL HERO (INICIO)
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.slide-fondo');
    let slideActual = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[slideActual].classList.remove('activa');
            slideActual = (slideActual + 1) % slides.length;
            slides[slideActual].classList.add('activa');
        }, 5000);
    }
});


// ── FORMULARIO MULTI-PASO ──────────────────────────────
let pasoActual = 1;
const totalPasos = 10;

document.addEventListener("DOMContentLoaded", function () {
    actualizarUI();
});

function pasoPosterior() {
    if (!validarPaso(pasoActual)) return;

    if (pasoActual === totalPasos) {
        var botonContinuar = document.getElementById('btnContinuar');
        var botonAtras = document.getElementById('btnAtras');

        botonContinuar.textContent = 'Enviando...';
        botonContinuar.disabled = true;
        botonAtras.style.visibility = 'hidden';

        // ── ENVÍO A HUBSPOT ──────────────────────────────
        var portalId = '148238965';
        var formGuid = '8838d4f3-370d-48f0-9db3-293641204f58';

        var datos = {
            fields: [
                { name: 'firstname', value: document.getElementById('firstname').value },
                { name: 'lastname', value: document.getElementById('lastname').value },
                { name: 'email', value: document.getElementById('email').value },
                { name: 'phone', value: document.getElementById('phone').value },
                { name: 'situacion_terreno', value: document.querySelector('input[name="situacion_terreno"]:checked')?.value || '' },
                { name: 'estado_diseno_vivienda', value: document.querySelector('input[name="estado_diseno_vivienda"]:checked')?.value || '' },
                { name: 'momento_actual_cliente', value: document.querySelector('input[name="momento_actual_cliente"]:checked')?.value || '' },
                { name: 'presupuesto', value: document.querySelector('input[name="presupuesto"]:checked')?.value || '' },
                { name: 'tiempo_inicio', value: document.querySelector('input[name="tiempo_inicio"]:checked')?.value || '' },
                { name: 'horario_llamada', value: document.querySelector('input[name="horario_llamada"]:checked')?.value || '' },
                { name: 'city', value: document.getElementById('ciudad').value },
                { name: 'politica_privacidad', value: document.getElementById('privacidad').checked ? 'Aceptada' : '' },
            ],
            context: {
                pageUri: window.location.href,
                pageName: document.title
            }
        };

        fetch('https://api.hsforms.com/submissions/v3/integration/submit/' + portalId + '/' + formGuid, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }).then(response => {
            if (response.ok) {
                var form = document.getElementById('formularioProyecto');
                form.innerHTML = `
                    <div style="text-align: center; padding: 50px 20px;">
                        <h2 style="margin-bottom: 15px;">¡Mensaje enviado con éxito!</h2>
                        <p style="font-size: 18px; color: #555;">Gracias por contarnos sobre tu proyecto. El equipo de Xylos Home lo revisará y te llamaremos en el horario que has elegido.</p>
                    </div>
                `;
            } else {
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

        return;
    }

    if (pasoActual === 9) {
        document.getElementById('resumen-nombre').textContent = document.getElementById('firstname').value;
        document.getElementById('resumen-apellidos').textContent = document.getElementById('lastname').value;
        document.getElementById('resumen-email').textContent = document.getElementById('email').value;
        document.getElementById('resumen-telefono').textContent = document.getElementById('phone').value;
    }

    document.getElementById('paso' + pasoActual).classList.remove('activo');
    pasoActual++;
    var siguiente = document.getElementById('paso' + pasoActual);
    if (siguiente) {
        siguiente.classList.add('activo');
    }

    actualizarUI();
}

function pasoAnterior() {
    if (pasoActual === 1) return;

    document.getElementById('paso' + pasoActual).classList.remove('activo');
    pasoActual--;
    document.getElementById('paso' + pasoActual).classList.add('activo');

    actualizarUI();
}

function actualizarUI() {
    var porcentaje = ((pasoActual - 1) / totalPasos) * 100;
    document.getElementById('progressFill').style.width = porcentaje + '%';
    document.getElementById('progressLabel').textContent = 'Paso ' + pasoActual + ' de ' + totalPasos;

    document.getElementById('btnAtras').style.visibility = pasoActual === 1 ? 'hidden' : 'visible';
    document.getElementById('btnContinuar').textContent = pasoActual === totalPasos ? 'Enviar' : 'Continuar';
}

function validarPaso(paso) {

    if (paso === 1) {
        var nombre = document.getElementById('firstname');
        var email = document.getElementById('email');
        var telefono = document.getElementById('phone');

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

    if (paso === 2) {
        var opciones = document.getElementsByName('situacion_terreno');
        var seleccionado = false;
        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) { seleccionado = true; break; }
        }
        if (!seleccionado) {
            opciones[0].setCustomValidity('Por favor, selecciona una opción para continuar.');
            opciones[0].reportValidity();
            return false;
        } else {
            opciones[0].setCustomValidity('');
        }
    }

    if (paso === 3) {
        var opciones = document.getElementsByName('estado_diseno_vivienda');
        var seleccionado = false;
        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) { seleccionado = true; break; }
        }
        if (!seleccionado) {
            opciones[0].setCustomValidity('Por favor, selecciona una opción para continuar.');
            opciones[0].reportValidity();
            return false;
        } else {
            opciones[0].setCustomValidity('');
        }
    }

    if (paso === 4) {
        var opciones = document.getElementsByName('momento_actual_cliente');
        var seleccionado = false;
        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) { seleccionado = true; break; }
        }
        if (!seleccionado) {
            opciones[0].setCustomValidity('Por favor, selecciona una opción para continuar.');
            opciones[0].reportValidity();
            return false;
        } else {
            opciones[0].setCustomValidity('');
        }
    }

    if (paso === 5) {
        var opciones = document.getElementsByName('presupuesto');
        var seleccionado = false;
        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) { seleccionado = true; break; }
        }
        if (!seleccionado) {
            opciones[0].setCustomValidity('Por favor, selecciona un rango de presupuesto para continuar.');
            opciones[0].reportValidity();
            return false;
        } else {
            opciones[0].setCustomValidity('');
        }
    }

    if (paso === 6) {
        var opciones = document.getElementsByName('tiempo_inicio');
        var seleccionado = false;
        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) { seleccionado = true; break; }
        }
        if (!seleccionado) {
            opciones[0].setCustomValidity('Por favor, indícanos cuándo planeas empezar para continuar.');
            opciones[0].reportValidity();
            return false;
        } else {
            opciones[0].setCustomValidity('');
        }
    }

    if (paso === 7) {
        var opciones = document.getElementsByName('horario_llamada');
        var seleccionado = false;
        for (var i = 0; i < opciones.length; i++) {
            if (opciones[i].checked) { seleccionado = true; break; }
        }
        if (!seleccionado) {
            opciones[0].setCustomValidity('Por favor, dinos a qué hora prefieres que te llamemos.');
            opciones[0].reportValidity();
            return false;
        } else {
            opciones[0].setCustomValidity('');
        }
    }

    if (paso === 8) {
        var ciudad = document.getElementById('ciudad');
        ciudad.setCustomValidity('');
        if (!ciudad.value.trim()) {
            ciudad.setCustomValidity('Por favor, indícanos en qué ciudad quieres construir.');
            ciudad.reportValidity();
            return false;
        }
    }

    if (paso === 9) {
        var privacidad = document.getElementById('privacidad');
        if (!privacidad.checked) {
            alert('Debes aceptar la política de privacidad para continuar.');
            return false;
        }
    }

    return true;
}


// --- ACORDEÓN DE PREGUNTAS FRECUENTES ---
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const titulo = item.querySelector('h3');
        const respuesta = item.querySelector('p');

        titulo.addEventListener('click', () => {
            const estaAbierto = item.classList.contains('abierto');

            faqItems.forEach(otroItem => {
                otroItem.classList.remove('abierto');
                otroItem.querySelector('p').style.maxHeight = null;
            });

            if (!estaAbierto) {
                item.classList.add('abierto');
                respuesta.style.maxHeight = respuesta.scrollHeight + "px";
            }
        });
    });
});


// --- LÓGICA DE COOKIES ---
document.addEventListener("DOMContentLoaded", function () {
    const bannerCookies = document.getElementById('banner-cookies');
    const btnAceptar = document.getElementById('btn-aceptar-cookies');

    if (!localStorage.getItem('cookiesAceptadas')) {
        bannerCookies.classList.remove('oculto');
    }

    btnAceptar.addEventListener('click', () => {
        localStorage.setItem('cookiesAceptadas', 'true');
        bannerCookies.classList.add('oculto');
    });
});