window.onload = function() {
    actualizarContenidoCopiado();
    setInterval(actualizarContenidoCopiado, 0);
};

function actualizarContenidoCopiado() {
    navigator.clipboard.readText()
        .then(text => {
            let contenidoVisualizado = '';
            if (text.includes('\t')) { // Si el texto contiene tabuladores, mostrar como lista
                const filas = text.trim().split('\n');
                const contenido = text.trim().split('\t');
                if (contenido.length <= 3) { // Si hay 3 celdas, mostrarlas como lista
                    contenidoVisualizado = '<p>Contenido copiado:</p>';
                    contenidoVisualizado += '<div class="lista">';
                    contenido.forEach(item => {
                        contenidoVisualizado += `<div>${item}</div>`;
                    });
                    contenidoVisualizado += '</div>';
                } else if ((contenido.length > 3 & contenido.length < 6)){
                    contenidoVisualizado = `<p>${contenido.length} celda(s) copiada(s).</p>`;    
                }else if (contenido.length >= 6) { // Si hay 6 o más celdas
                    if ((contenido.length + (filas.length-1))% 6 === 0) { // Si el número de celdas es múltiplo de 6
                        contenidoVisualizado = `<p>${filas.length} fila(s) copiada(s).</p>`;
                    } else { // Si el número de celdas no es múltiplo de 6
                        contenidoVisualizado = `<p>Atención: El número de celdas copiadas (${contenido.length}) no es un múltiplo de 6, por lo tanto, no se puede formar un número entero de filas.</p>`;
                    }}
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
let fechaG;
let PerfilG;
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
            PerfilG = perfil;
            plantillaG = plantilla;
            fechaG = fecha;
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
    const [fecha] = fechaG
    const [cuenta, correo] = contenidoGenerado;
    const texto = `${PerfilG}\t\t${fechaG}\t${cuenta}\t${correo}`;
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

    copiarcuenta()

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
            url = 'https://paramountplus.com';
            break;
        case 'NETFLIX EXTRA':
            url = 'https://netflix.com';
            break;
        case 'NETFLIX TELEVISOR':
            url = 'https://netflix.com';
            break;
        case 'NETFLIX CELULAR/PC':
            url = 'https://netflix.com';
            break;
        case 'NETFLIX':
            url = 'https://netflix.com';
            break;    
        default:
            alert("Tipo de cuenta no reconocido");
            return;
    }
    window.open(url, '_blank'); // Abre la URL en una nueva pestaña
}

function recordarDatos() {
    // Obtener el texto del portapapeles
    navigator.clipboard.readText().then(text => {
        // Dividir la cadena en elementos separados por tabuladores
        const filas = text.trim().split('\n');
        
        // Verificar el formato esperado
        const contenido = text.trim().split('\t');
        if (contenido.length !== 6 && (contenido.length + (filas.length - 1)) % 6 !== 0) {
            alert("El contenido copiado no está en el formato esperado (deben ser filas de 6 celdas).");
            return;
        }

        // Procesar cada fila
        const salidaFormateada = filas.map(fila => {
            // Dividir la fila en elementos separados por tabuladores
            const datos = fila.split('\t');
            
            // Obtener los valores relevantes
            let perfil = datos[3];
            const nombre = datos[0];
            const correo = datos[4];
            const contraseña = datos[5];

            // Reemplazar "NETFLIX EXTRA" con "NETFLIX TELEVISOR"
            if (perfil === "NETFLIX EXTRA") {
                perfil = "NETFLIX TELEVISOR";
            }

            // Formatear la salida de esta fila
            return `*${perfil.toUpperCase()} ${nombre.toUpperCase()}*\n` +
                `*Correo:* ${correo}\n` +
                `*Contraseña:* ${contraseña}`;
        }).join('\n\n'); // Unir las salidas de cada fila separadas por dos saltos de línea

        // Colocar la salida formateada en el portapapeles
        return navigator.clipboard.writeText(salidaFormateada);
    }).then(() => {
        console.log('La salida formateada se ha copiado correctamente al portapapeles.');
    }).catch(err => {
        console.error('Error:', err);
    });
}


function obtenerNombresYSumaPrecios() {
    navigator.clipboard.readText().then(text => {
        // Dividir el texto en filas
        const filas = text.trim().split('\n');
        
        // Inicializar variables para nombres y suma de precios
        let nombres = [];
        let sumaPrecios = 0;
        
        // Objeto para mantener un registro de las cuentas y su número total de repeticiones
        const cuentasRepetidas = {};
        
        // Iterar sobre cada fila
        filas.forEach(fila => {
            // Dividir la fila en elementos separados por tabuladores
            const datos = fila.split('\t');
            
            // Extraer el nombre y el precio de la fila actual
            let nombreCuenta = datos[0];
            const precio = parseFloat(datos[3].replace(/[^\d.]/g, ''));
            
            // Si el nombre es "NETFLIX EXTRA", reemplazarlo por "NETFLIX TELEVISOR"
            if (nombreCuenta === "NETFLIX EXTRA") {
                nombreCuenta = "NETFLIX TELEVISOR";
            }
            
            // Agregar el nombre de la cuenta al registro y contar repeticiones
            cuentasRepetidas[nombreCuenta] = (cuentasRepetidas[nombreCuenta] || 0) + 1;
            
            // Sumar el precio al total
            sumaPrecios += precio;
        });
        
        // Construir la lista de nombres concatenados con el número total de repeticiones
        nombres = Object.entries(cuentasRepetidas).map(([nombre, repeticiones]) => {
            return repeticiones > 1 ? `${repeticiones} ${nombre}` : nombre;
        });
        
        // Concatenar los nombres de las cuentas separados por '+'
        const nombresConcatenados = nombres.join(' + ');
        
        // Formatear la suma de precios en pesos colombianos
        const sumaFormateada = sumaPrecios.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0});
        
        // Formatear la salida con los nombres concatenados y la suma de precios
        const salida = `${nombresConcatenados}\n${sumaFormateada}`;
        
        // Colocar la salida formateada en el portapapeles
        return navigator.clipboard.writeText(salida);
    }).catch(err => {
        console.error('Error:', err);
    });
}

function cambioContra() {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = obtenerFechaFormateada();

    // Obtener el texto del portapapeles
    navigator.clipboard.readText().then(text => {
        // Dividir el texto del portapapeles en filas
        const contenido = text.trim().split('\t');
        const filas = text.trim().split('\n'); 
        if ((contenido.length !== 6) & (contenido.length + (filas.length-1)) % 6 !== 0){
                alert("El contenido copiado no está en el formato esperado (deben ser filas de 6 celdas).");
                return;
        } 

        // Array para almacenar los enlaces de WhatsApp con el perfil y el nombre
        const enlacesConPerfil = [];

        // Iterar sobre cada fila y generar un enlace de WhatsApp para cada una
        for (let i = 0; i < filas.length; i++) {
            const fila = filas[i].split('\t'); // Dividir la fila en elementos separados por tabuladores

            // Obtener los valores relevantes
            // const perfil = fila[2];
            const nombre = fila[0];
            const cuenta = fila[3];
            const correo = fila[4];
            const contraseña = fila[5];
            const telefono = fila[1].replace(/\s+/g, ''); // Eliminar espacios en blanco del número de teléfono
            const telefonoSinPlus = telefono.replace(/^\+/, ''); // Eliminar el símbolo "+" del número de teléfono si está presente

            // Formatear el mensaje de cambio de contraseña con el perfil y el nombre en negrita
            const mensaje = `Hola, te informo que la contraseña de ${cuenta} cambió.\n\n` +
                            `*${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n` +
                            `*Correo:* ${correo}\n` +
                            `*Contraseña:* ${contraseña}`;

            // Crear el enlace de WhatsApp sin el símbolo "+"
            const enlaceWhatsApp = `https://wa.me/${telefonoSinPlus}?text=${encodeURIComponent(mensaje)}`;

            // Almacenar el enlace junto con el perfil y el nombre
            enlacesConPerfil.push(`*Perfil: ${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n${enlaceWhatsApp}`);
        }

        // Concatenar el mensaje de cambio de contraseña al principio de la cadena de enlaces
        const mensajeCambio = `*Cambio contraseña - ${filas[0].split('\t')[3]}*\n` +
                            `${filas[0].split('\t')[4]}\n` + `*Fecha del cambio:* ${fechaActual}\n\n`;
        const enlacesConPerfilTexto = mensajeCambio + enlacesConPerfil.join('\n\n');
        
        // Copiar los enlaces al portapapeles
        return navigator.clipboard.writeText(enlacesConPerfilTexto);
    }).then(() => {
        console.log('Los enlaces de WhatsApp con el mensaje de cambio de contraseña se han copiado correctamente al portapapeles.');
    }).catch(err => {
        console.error('Error:', err);
    });
}
