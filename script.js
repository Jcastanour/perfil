window.onload = function() {
    actualizarContenidoCopiado();
    setInterval(actualizarContenidoCopiado, 0);
};

function actualizarContenidoCopiado() {
    navigator.clipboard.readText()
        .then(text => {
            let contenidoVisualizado = '';
            if (text.includes('\t')) { // Si el texto contiene tabuladores, mostrar como lista
                const contenido = text.trim().split('\t');
                contenidoVisualizado = `<p>${contenido.length} celdas copiadas:</p>`;
                contenidoVisualizado += '<div class="lista">';
                contenido.forEach(item => {
                    contenidoVisualizado += `<div>${item}</div>`;
                });
                contenidoVisualizado += '</div>';
            } else if (text.includes('*')) { // Si el texto contiene asteriscos, aplicar formato especial
                const contenido = text.trim().split('\n');
                contenido.forEach(linea => {
                    contenidoVisualizado += linea.replace(/\*(.*?)\*/g, '<b>$1</b>') + '<br>';
                });
            } else { // Si no se cumple ninguna condición, mostrar el texto sin formato especial
                contenidoVisualizado = text;
            }
            document.getElementById('contenido-copiado').innerHTML = contenidoVisualizado;
        })
        .catch(err => console.error('Error al leer el portapapeles:', err));
}

function obtenerFechaFormateada() {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0'); // Agrega un cero delante si es necesario
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Agrega un cero delante si es necesario
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}
let contenidoGenerado;
let plantillaG;
function generarPlantilla() {
    navigator.clipboard.readText()
        .then(text => {
            const contenido = text.trim().split('\t');
            if (contenido.length !== 3) {
                alert("El contenido copiado no está en el formato esperado (deben ser tres columnas separadas por tabuladores).");
                return;
            }
            
            const fecha = obtenerFechaFormateada();
            const partesFecha = fecha.split('/');
            const fechaReorganizada = `${partesFecha[1]}/${partesFecha[0]}/${partesFecha[2]}`;
            const [cuenta, correo, contrasena] = contenido;
            contenidoGenerado = contenido;
            const perfil = document.getElementById('perfil').value.trim();
            const plantilla = `*${cuenta}*\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fecha}`;
            plantillaG = plantilla;
            navigator.clipboard.writeText(plantilla)
                .then(() => {
                    // alert("La plantilla ha sido generada y copiada al portapapeles.");
                    document.getElementById('perfil').value = ""; }
                    )
                .catch(err => console.error('Error al copiar al portapapeles:', err));
        })
        .catch(err => console.error('Error al leer el portapapeles:', err));
}

document.getElementById("perfil").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      generarPlantilla();
    }
  });

function plantilladenuevo() {
    if (!plantillaG) {
        //alert("Primero debes generar la plantilla.");
        return;
    }

    const texto = plantillaG;
    navigator.clipboard.writeText(texto)
        .then(() => {
            //alert("Texto copiado al portapapeles: " + texto);
        })
        .catch(err => {
            alert("Error al copiar al portapapeles: " + err.message);
        });
}

function copiarcuenta() {
    if (!contenidoGenerado) {
        alert("Primero debes generar la plantilla.");
        return;
    }

    const [, correo, contrasena] = contenidoGenerado;
    const texto = `${correo}\t${contrasena}`;
    navigator.clipboard.writeText(texto)
        .then(() => {
            //alert("Texto copiado al portapapeles: " + texto);
        })
        .catch(err => {
            alert("Error al copiar al portapapeles: " + err.message);
        });
}

function copiarexcel() {
    if (!contenidoGenerado) {
        alert("Primero debes generar la plantilla.");
        return;
    }

    const [cuenta, correo] = contenidoGenerado;
    const texto = `${cuenta}\t${correo}`;
    navigator.clipboard.writeText(texto)
        .then(() => {
            //alert("Texto copiado al portapapeles: " + texto);
        })
        .catch(err => {
            alert("Error al copiar al portapapeles: " + err.message);
        });
}

function abrircuenta() {
    if (!contenidoGenerado) {
        alert("Primero debes generar la plantilla.");
        return;
    }

    const [cuenta, correo] = contenidoGenerado;
    const texto = `${cuenta}\t${correo}`;
    navigator.clipboard.writeText(texto)
        .then(() => {
            //alert("Texto copiado al portapapeles: " + texto);
        })
        .catch(err => {
            alert("Error al copiar al portapapeles: " + err.message);
        });
}

function abrirCuentaDesdeBoton() {
    if (!contenidoGenerado) {
        alert("Primero debes generar la plantilla.");
        return;
    }

    const [tipoCuenta] = contenidoGenerado;
    let url;
    switch (tipoCuenta.toLowerCase()) {
        case 'max':
            url = 'https://play.max.com';
            break;
        case 'amazon':
            url = 'https://primevideo.com';
            break;
        case 'crunchyroll':
            url = 'https://crunchyroll.com';
            break;
        case 'vix':
            url = 'https://vix.com';
            break;
        case 'disney':
            url = 'https://disneyplus.com';
            break;
        case 'star':
            url = 'https://starplus.com';
            break;
        case 'paramount':
            url = 'https://paramount.com';
            break;
        case 'netflix':
            url = 'https://netflix.com';
            break;
        case 'netflix tv':
            url = 'https://netflix.com';
            break;
        case 'netflix cel/pc':
            url = 'https://netflix.com';
            break;
        default:
            alert("Tipo de cuenta no reconocido");
            return;
    }
    window.open(url, '_blank'); // Abre la URL en una nueva pestaña
}
