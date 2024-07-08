window.onload = function () {
  actualizarContenidoCopiado();
  actualizarBotones();
  setInterval(actualizarContenidoCopiado, 0);
  setInterval(actualizarBotones, 0);
};
let plantillabool = 0;
function actualizarBotones() {
  // let contenidoG = contenido;
  // let filasG = filas;
  navigator.clipboard
    .readText()
    .then((text) => {
      let filasG = 0;
      let contenidoG = 0;
      let menuatras = 0;

      if (window.innerWidth > 600) {
        document.querySelectorAll(".botones button").forEach((button) => {
          button.style.display = "none";
        });
        document.querySelector(".contenedor-botones").style.display = "none";
      } else {
        document.querySelectorAll(".botones button").forEach((button) => {
          button.style.display = "inline-block";
        });
        document.querySelector(".contenedor-botones").style.display = "block";
      }

      // document.querySelectorAll(".botones button").forEach((button) => {
      //   button.style.display = "none";
      // });
      // document.querySelector(".contenedor-botones").style.display = "none";

      console.log(plantillabool);
      if (text.includes("\t")) {
        // Si el texto contiene tabuladores, mostrar como lista
        filasG = text.trim().split("\n").length;
        contenidoG = text.trim().split("\t").length;
      } else if (text.includes("*")) {
        contenidoG = "*";
      }

      if (contenidoG === 2) {
        document.getElementById("plantilladenuevo").style.display = "inline";
        document.getElementById("abrirpagina").style.display = "inline";
      } else if (contenidoG === 3) {
        document.querySelector(".contenedor-botones").style.display = "inline";
      } else if (
        (contenidoG + (filasG - 1)) % 4 === 0 &&
        (contenidoG + (filasG - 1)) / 4 === filasG
      ) {
        document.getElementById("nombresyprecios").style.display = "inline";
      } else if (contenidoG === 5) {
        document.getElementById("generarconcinco").style.display = "inline";
      } else if (
        contenidoG > 5 &&
        (contenidoG + (filasG - 1)) % 5 === 0 &&
        (contenidoG + (filasG - 1)) / 5 === filasG
      ) {
        document.getElementById("generarcombo").style.display = "inline";
      } else if (contenidoG === 6) {
        document.getElementById("recordardatos").style.display = "inline";
        document.getElementById("cambiocorreou").style.display = "inline";
        document.getElementById("cambiocontrau").style.display = "inline";
      } else if (
        contenidoG > 6 &&
        (contenidoG + (filasG - 1)) % 6 === 0 &&
        (contenidoG + (filasG - 1)) / 6 === filasG
      ) {
        // Si el número de celdas es múltiplo de 6
        document.getElementById("recordardatos").style.display = "inline";
        document.getElementById("cambiocorreo").style.display = "inline";
        document.getElementById("cambiocontra").style.display = "inline";
      } else if (contenidoG === 7) {
        document.getElementById("plantilladenuevo").style.display = "inline";
        document.getElementById("abrirpagina").style.display = "inline";
        document.getElementById("copiarcuenta").style.display = "inline";
        document.getElementById("contacto").style.display = "inline";
      } else if (contenidoG === "*") {
        if (plantillabool === 1) {
          document.getElementById("copiarexcel").style.display = "inline";
          document.getElementById("copiarcuenta").style.display = "inline";
          document.getElementById("abrirpagina").style.display = "inline";
          document.getElementById("contacto").style.display = "inline";
        } else if (combo === 1) {
          document.getElementById("copiarexcel").style.display = "inline";
        }
        // Si el texto contiene asteriscos, aplicar formato especial
      }
    })
    .catch((error) => {});
}

function actualizarContenidoCopiado() {
  navigator.clipboard
    .readText()
    .then((text) => {
      let contenidoVisualizado = "";

      if (!text) {
        contenidoVisualizado = `<h2>Debes tener celdas copiadas</h2>`;
      } else if (text.includes("\t")) {
        // Si el texto contiene tabuladores, mostrar como lista
        const filas = text.trim().split("\n");
        const contenido = text.trim().split("\t");

        if (contenido.length <= 3) {
          // Si hay 3 celdas, mostrarlas como lista
          contenidoVisualizado = `<p>${contenido.length} celdas copiadas.</p>`;
          contenidoVisualizado += '<div class="lista">';
          contenido.forEach((item) => {
            contenidoVisualizado += `<div>${item}</div>`;
          });
          contenidoVisualizado += "</div>";
        } else if ((contenido.length > 1) & (contenido.length < 4)) {
          contenidoVisualizado = `<p>${contenido.length} celdas copiadas.</p>`;
        } else if (
          (contenido.length + (filas.length - 1)) % 4 === 0 &&
          (contenido.length + (filas.length - 1)) / 4 === filas.length
        ) {
          if (contenido.length === 4) {
            contenidoVisualizado = `<p>${contenido.length} celdas copiadas.</p>`;
          } else {
            contenidoVisualizado = `<p>${filas.length} filas de 4 celdas.</p>`;
          }
        } else if (contenido.length === 5) {
          contenidoVisualizado = `<p>${contenido.length} celdas copiadas.</p>`;
        } else if (
          contenido.length > 5 &&
          (contenido.length + (filas.length - 1)) % 5 === 0 &&
          (contenido.length + (filas.length - 1)) / 5 === filas.length
        ) {
          contenidoVisualizado = `<p>${filas.length} filas de 5 celdas.</p>`;
        } else if (contenido.length >= 6) {
          // Si hay 6 o más celdas
          if ((contenido.length + (filas.length - 1)) % 6 === 0) {
            // Si el número de celdas es múltiplo de 6
            contenidoVisualizado = `<p>${filas.length} filas de 6 celdas.</p>`;
          } else if (contenido.length === 7) {
            contenidoVisualizado = `<p>(${contenido.length}) Celdas para pegar en excel</p>`;
          } else {
            // Si el número de celdas es mayor a 7 celdas
            contenidoVisualizado = `<p>Atención: El número de celdas copiadas (${contenido.length}) no funciona en ningun caso.</p>`;
          }
        }
        // actualizarBotones(contenido.length,filas.length);
      } else if (text.includes("*")) {
        // Si el texto contiene asteriscos, aplicar formato especial
        const contenido = text.trim().split("\n");
        contenido.forEach((linea) => {
          contenidoVisualizado +=
            linea.replace(/\*(.*?)\*/g, "<b>$1</b>") + "<br>";
        });
        // actualizarBotones('*',0);
      } else {
        // Si no se cumple ninguna condición, mostrar el texto sin formato especial
        contenidoVisualizado = `<p>${text}</p>`;
      }

      document.getElementById("contenido-copiado").innerHTML =
        contenidoVisualizado;
    })
    .catch((error) => {});
}

function obtenerFechaFormateada() {
  const fecha = new Date();
  const dia = fecha.getDate().toString().padStart(2, "0"); // Agrega un cero delante si es necesario
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Agrega un cero delante si es necesario
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}
let contenidoGenerado;
let plantillaG;
let fechaG;
let PerfilG;
let whatasappG;
let nump;
let cuentaG;
let correoG;
let contraG;
function generarPlantilla() {
  navigator.clipboard
    .readText()
    .then((text) => {
      const contenido = text.trim().split("\t");
      if (contenido.length !== 3) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser tres columnas separadas por tabuladores)."
        );
        return;
      }

      const fecha = obtenerFechaFormateada();
      const partesFecha = fecha.split("/");
      const fechaReorganizada = `${partesFecha[1]}/${partesFecha[0]}/${partesFecha[2]}`;
      const [cuenta, correo, contrasena] = contenido;
      contenidoGenerado = contenido;
      nump = 0;
      const perfil = document.getElementById("perfil").value.trim();
      let plantilla = `*${cuenta}*\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fecha}`;
      if (cuenta === "NETFLIX EXTRA") {
        plantilla = `*NETFLIX TV PERSONAL*\n*Correo:* \n\n*Fecha:* ${fecha}`;
      }

      if (cuenta === "COMBO PLUS") {
        plantilla = `*COMBO PLUS (DISNEY + STAR)*\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fecha}`;
      }

      PerfilG = perfil;
      plantillaG = plantilla;
      fechaG = fecha;
      cuentaG = cuenta;
      correoG = correo;
      contraG = contrasena;
      whatasappG = "";
      plantillabool = 1;
      console.log(plantillabool);
      navigator.clipboard
        .writeText(plantilla)
        .then(() => {
          // alert("La plantilla ha sido generada y copiada al portapapeles.");
          document.getElementById("perfil").value = "";
        })
        .catch((err) => console.error("Error al copiar al portapapeles:", err));
    })
    .catch((err) => console.error("Error al leer el portapapeles:", err));
}

function generarPlantilla2() {
  navigator.clipboard
    .readText()
    .then((text) => {
      const contenido = text.trim().split("\t");
      if (contenido.length !== 5) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser cinco columnas separadas por tabuladores)."
        );
        return;
      }

      const fecha = obtenerFechaFormateada();
      const partesFecha = fecha.split("/");
      const fechaReorganizada = `${partesFecha[1]}/${partesFecha[0]}/${partesFecha[2]}`;
      const [perfil, whatasapp, cuenta, correo, contrasena] = contenido;
      contenidoGenerado = contenido;
      nump = 1;
      let plantilla = `*${cuenta}*\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fecha}`;
      if (cuenta === "NETFLIX EXTRA") {
        plantilla = `*NETFLIX TV PERSONAL*\n*Correo:* \n\n*Fecha:* ${fecha}`;
      }

      if (cuenta === "COMBO PLUS") {
        plantilla = `*COMBO PLUS (DISNEY + STAR)*\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fecha}`;
      }

      PerfilG = perfil;
      plantillaG = plantilla;
      fechaG = fecha;
      cuentaG = cuenta;
      correoG = correo;
      contraG = contrasena;
      whatasappG = whatasapp;
      plantillabool = 1;
      navigator.clipboard
        .writeText(plantilla)
        .then(() => {
          // alert("La plantilla ha sido generada y copiada al portapapeles.");
          document.getElementById("perfil").value = "";
        })
        .catch((err) => console.error("Error al copiar al portapapeles:", err));
    })
    .catch((err) => console.error("Error al leer el portapapeles:", err));
}

function procesarFecha() {
  // Obtener el nombre del perfil y la fecha
  var perfil = PerfilG;
  var fecha = fechaG;

  // Separar el día de la fecha
  var dia = parseInt(fecha.split("/")[0]);

  // Crear el formato deseado para el día
  var diaFormato = "D";
  if (dia < 4) {
    diaFormato += "0" + dia;
  } else {
    diaFormato += dia;
  }

  // Crear el formato completo
  var formatoCompleto = perfil + " " + diaFormato + "\t" + whatasappG;

  // Copiar al portapapeles
  navigator.clipboard
    .writeText(formatoCompleto)
    .then(function () {
      console.log("Texto copiado al portapapeles: " + formatoCompleto);
      // Abrir la ventana de Google Contacts
      window.open("https://contacts.google.com/new", "_blank");
    })
    .catch(function (err) {
      console.error("Error al copiar al portapapeles: ", err);
    });
}

document
  .getElementById("perfil")
  .addEventListener("keypress", function (event) {
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
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      //alert("Texto copiado al portapapeles: " + texto);
    })
    .catch((err) => {
      alert("Error al copiar al portapapeles: " + err.message);
    });
}

function copiarcuenta() {
  if (!contenidoGenerado) {
    alert("Primero debes generar la plantilla.");
    return;
  }
  const texto = `${correoG}\t${contraG}`;
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      //alert("Texto copiado al portapapeles: " + texto);
    })
    .catch((err) => {
      alert("Error al copiar al portapapeles: " + err.message);
    });
}

function generarCombo() {
  combo = 1;
  // Obtener el texto del portapapeles
  navigator.clipboard
    .readText()
    .then((text) => {
      // Dividir la cadena en elementos separados por tabuladores
      const filas = text.trim().split("\n");

      // Verificar el formato esperado
      const contenido = text.trim().split("\t");
      if (
        contenido.length !== 5 &&
        (contenido.length + (filas.length - 1)) % 5 !== 0
      ) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser filas de 6 celdas)."
        );
        return;
      }

      // Procesar cada fila
      let fechaActual = obtenerFechaFormateada();
      const salidacombo =
        filas
          .map((fila) => {
            // Dividir la fila en elementos separados por tabuladores
            const datos = fila.split("\t");

            // Obtener los valores relevantes
            let perfil = datos[2];
            let whatasapp = datos[1];
            const nombre = datos[0];
            const correo = datos[3];
            const contraseña = datos[4];

            // Reemplazar "NETFLIX EXTRA" con "NETFLIX TELEVISOR"
            if (perfil === "NETFLIX EXTRA") {
              perfil = "NETFLIX TELEVISOR";
            }

            if (perfil === "COMBO PLUS") {
              perfil = "COMBO PLUS (DISNEY + STAR)";
            }

            // Formatear la salida de esta fila
            return (
              `*${perfil.toUpperCase()} ${nombre.toUpperCase()}*\n` +
              `*Correo:* ${correo}\n` +
              `*Contraseña:* ${contraseña}`
            );
          })
          .join("\n\n") + `\n\n*Fecha de venta:* ${fechaActual}`; // Unir las salidas de cada fila separadas por dos saltos de línea

      // Colocar la salida formateada en el portapapeles
      return navigator.clipboard.writeText(salidacombo);
    })
    .then(() => {
      console.log(
        "La salida formateada se ha copiado correctamente al portapapeles."
      );
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

let combo = 0;
function copiarexcel() {
  if (!contenidoGenerado && combo === 0) {
    alert("Primero debes generar la plantilla.");
    return;
  } else if (combo === 0) {
  }

  let precioG;

  if (cuentaG === "NETFLIX TELEVISOR") {
    precioG = 15000;
  } else if (cuentaG === "NETFLIX EXTRA") {
    precioG = 15000;
  } else if (cuentaG === "NETFLIX CELULAR/PC") {
    precioG = 12000;
  } else if (cuentaG === "PLEX") {
    precioG = 8000;
  } else if (cuentaG === "PLEX 2") {
    precioG = 14000;
  } else if (cuentaG === "PLEX 4") {
    precioG = 20000;
  } else if (cuentaG === "IPTV") {
    precioG = 12000;
  } else if (cuentaG === "COMBO PLUS") {
    precioG = 11000;
  } else {
    precioG = 6000;
  }

  const texto = `${PerfilG}\t${whatasappG}\t${fechaG}\t${cuentaG}\t${correoG}\t"=+BUSCARV([@CORREO],'HOJA OCULTA CON TODOS LOS CORRE'!C:D,2,FALSO)"\t${precioG}`;
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      //alert("Texto copiado al portapapeles: " + texto);
    })
    .catch((err) => {
      alert("Error al copiar al portapapeles: " + err.message);
    });
}

function abrirCuentaDesdeBoton() {
  if (!contenidoGenerado) {
    alert("Primero debes generar la plantilla.");
    return;
  }

  copiarcuenta();

  const tipoCuenta = cuentaG;
  let url;
  switch (tipoCuenta.toLowerCase()) {
    case "max":
      url = "https://play.max.com";
      break;
    case "amazon":
      url = "https://primevideo.com";
      break;
    case "crunchyroll":
      url = "https://crunchyroll.com";
      break;
    case "vix":
      url = "https://vix.com";
      break;
    case "disney":
      url = "https://disneyplus.com";
      break;
    case "star":
      url = "https://starplus.com";
      break;
    case "paramount":
      url = "https://paramountplus.com";
      break;
    case "netflix extra":
      url = "https://netflix.com";
      break;
    case "netflix televisor":
      url = "https://netflix.com";
      break;
    case "netflix celular/pc":
      url = "https://netflix.com";
      break;
    case "combo plus":
      window.open("https://disneyplus.com", "_blank");
      window.open("https://starplus.com", "_blank");
      return;
    case "netflix":
      url = "https://netflix.com";
      break;
    default:
      alert("Tipo de cuenta no reconocido");
      return;
  }
  window.open(url, "_blank"); // Abre la URL en una nueva pestaña
}

function recordarDatos() {
  // Obtener el texto del portapapeles
  navigator.clipboard
    .readText()
    .then((text) => {
      // Dividir la cadena en elementos separados por tabuladores
      const filas = text.trim().split("\n");

      // Verificar el formato esperado
      const contenido = text.trim().split("\t");
      if (
        contenido.length !== 6 &&
        (contenido.length + (filas.length - 1)) % 6 !== 0
      ) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser filas de 6 celdas)."
        );
        return;
      }

      // Procesar cada fila
      const salidaFormateada = filas
        .map((fila) => {
          // Dividir la fila en elementos separados por tabuladores
          const datos = fila.split("\t");

          // Obtener los valores relevantes
          let perfil = datos[3];
          const nombre = datos[0];
          const correo = datos[4];
          const contraseña = datos[5];

          // Reemplazar "NETFLIX EXTRA" con "NETFLIX TELEVISOR"
          if (perfil === "NETFLIX EXTRA") {
            perfil = "NETFLIX TELEVISOR";
          }

          if (perfil === "COMBO PLUS") {
            perfil = "COMBO PLUS (DISNEY + STAR)";
          }

          // Formatear la salida de esta fila
          return (
            `*${perfil.toUpperCase()} ${nombre.toUpperCase()}*\n` +
            `*Correo:* ${correo}\n` +
            `*Contraseña:* ${contraseña}`
          );
        })
        .join("\n\n"); // Unir las salidas de cada fila separadas por dos saltos de línea

      // Colocar la salida formateada en el portapapeles
      return navigator.clipboard.writeText(salidaFormateada);
    })
    .then(() => {
      console.log(
        "La salida formateada se ha copiado correctamente al portapapeles."
      );
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function obtenerNombresYSumaPrecios() {
  navigator.clipboard
    .readText()
    .then((text) => {
      // Dividir el texto en filas
      const filas = text.trim().split("\n");

      // Inicializar variables para nombres y suma de precios
      let nombres = [];
      let sumaPrecios = 0;

      // Objeto para mantener un registro de las cuentas y su número total de repeticiones
      const cuentasRepetidas = {};

      // Iterar sobre cada fila
      filas.forEach((fila) => {
        // Dividir la fila en elementos separados por tabuladores
        const datos = fila.split("\t");

        // Extraer el nombre y el precio de la fila actual
        let nombreCuenta = datos[0];
        const precio = parseFloat(datos[3].replace(/[^\d.]/g, ""));

        // Si el nombre es "NETFLIX EXTRA", reemplazarlo por "NETFLIX TELEVISOR"
        if (nombreCuenta === "NETFLIX EXTRA") {
          nombreCuenta = "NETFLIX TELEVISOR";
        }

        // Agregar el nombre de la cuenta al registro y contar repeticiones
        cuentasRepetidas[nombreCuenta] =
          (cuentasRepetidas[nombreCuenta] || 0) + 1;

        // Sumar el precio al total
        sumaPrecios += precio;
      });

      // Construir la lista de nombres concatenados con el número total de repeticiones
      nombres = Object.entries(cuentasRepetidas).map(
        ([nombre, repeticiones]) => {
          return repeticiones > 1 ? `${repeticiones} ${nombre}` : nombre;
        }
      );

      // Concatenar los nombres de las cuentas separados por '+'
      const nombresConcatenados = nombres.join(" + ");

      // Formatear la suma de precios en pesos colombianos
      const sumaFormateada = sumaPrecios.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      // Formatear la salida con los nombres concatenados y la suma de precios
      const salida = `${nombresConcatenados}\n${sumaFormateada}`;

      // Colocar la salida formateada en el portapapeles
      return navigator.clipboard.writeText(salida);
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function cambioContra() {
  // Obtener la fecha actual en formato YYYY-MM-DD
  const fechaActual = obtenerFechaFormateada();

  // Obtener el texto del portapapeles
  navigator.clipboard
    .readText()
    .then((text) => {
      // Dividir el texto del portapapeles en filas
      const contenido = text.trim().split("\t");
      const filas = text.trim().split("\n");
      if (
        (contenido.length !== 6) &
        ((contenido.length + (filas.length - 1)) % 6 !== 0)
      ) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser filas de 6 celdas)."
        );
        return;
      }

      // Array para almacenar los enlaces de WhatsApp con el perfil y el nombre
      const enlacesConPerfil = [];

      // Iterar sobre cada fila y generar un enlace de WhatsApp para cada una
      for (let i = 0; i < filas.length; i++) {
        const fila = filas[i].split("\t"); // Dividir la fila en elementos separados por tabuladores

        // Obtener los valores relevantes
        // const perfil = fila[2];
        const nombre = fila[0];
        const cuenta = fila[3];
        const correo = fila[4];
        const contraseña = fila[5];
        const telefono = fila[1].replace(/\s+/g, ""); // Eliminar espacios en blanco del número de teléfono
        const telefonoSinPlus = telefono.replace(/^\+/, ""); // Eliminar el símbolo "+" del número de teléfono si está presente

        // Formatear el mensaje de cambio de contraseña con el perfil y el nombre en negrita
        const mensaje =
          `Hola, te informo que la contraseña de ${cuenta} cambió.\n\n` +
          `*${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n` +
          `*Correo:* ${correo}\n` +
          `*Contraseña:* ${contraseña}\n\n` +
          `*No necesariamente significa que se te cerro sesion, se envia para que siempre tengas la ultima contraseña*`;

        // Crear el enlace de WhatsApp sin el símbolo "+"
        const enlaceWhatsApp = `https://wa.me/${telefonoSinPlus}?text=${encodeURIComponent(
          mensaje
        )}`;

        // Almacenar el enlace junto con el perfil y el nombre
        enlacesConPerfil.push(
          `*Perfil: ${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n${enlaceWhatsApp}`
        );
      }

      // Concatenar el mensaje de cambio de contraseña al principio de la cadena de enlaces
      const mensajeCambio =
        `*Cambio contraseña - ${filas[0].split("\t")[3]}*\n` +
        `${filas[0].split("\t")[4]}\n` +
        `*Fecha del cambio:* ${fechaActual}\n\n`;
      const enlacesConPerfilTexto =
        mensajeCambio + enlacesConPerfil.join("\n\n");

      // Copiar los enlaces al portapapeles
      return navigator.clipboard.writeText(enlacesConPerfilTexto);
    })
    .then(() => {
      console.log(
        "Los enlaces de WhatsApp con el mensaje de cambio de contraseña se han copiado correctamente al portapapeles."
      );
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function cambioCorreo() {
  // Obtener la fecha actual en formato YYYY-MM-DD
  const fechaActual = obtenerFechaFormateada();

  // Obtener el texto del portapapeles
  navigator.clipboard
    .readText()
    .then((text) => {
      // Dividir el texto del portapapeles en filas
      const contenido = text.trim().split("\t");
      const filas = text.trim().split("\n");
      if (
        (contenido.length !== 6) &
        ((contenido.length + (filas.length - 1)) % 6 !== 0)
      ) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser filas de 6 celdas)."
        );
        return;
      }

      // Array para almacenar los enlaces de WhatsApp con el perfil y el nombre
      const enlacesConPerfil = [];

      // Iterar sobre cada fila y generar un enlace de WhatsApp para cada una
      for (let i = 0; i < filas.length; i++) {
        const fila = filas[i].split("\t"); // Dividir la fila en elementos separados por tabuladores

        // Obtener los valores relevantes
        // const perfil = fila[2];
        const nombre = fila[0];
        const cuenta = fila[3];
        const correo = fila[4];
        const contraseña = fila[5];
        const telefono = fila[1].replace(/\s+/g, ""); // Eliminar espacios en blanco del número de teléfono
        const telefonoSinPlus = telefono.replace(/^\+/, ""); // Eliminar el símbolo "+" del número de teléfono si está presente

        // Formatear el mensaje de cambio de contraseña con el perfil y el nombre en negrita
        const mensaje =
          `Hola, previniendo un problema con ${cuenta} se hara un cambio de cuenta.\n\n` +
          `*${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n` +
          `*Correo:* ${correo}\n` +
          `*Contraseña:* ${contraseña}\n\n` +
          `*Si se te llega a cerrar sesión, ingresa de nuevo con esta cuenta porfa.*`;

        // Crear el enlace de WhatsApp sin el símbolo "+"
        const enlaceWhatsApp = `https://wa.me/${telefonoSinPlus}?text=${encodeURIComponent(
          mensaje
        )}`;

        // Almacenar el enlace junto con el perfil y el nombre
        enlacesConPerfil.push(
          `*Perfil: ${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n${enlaceWhatsApp}`
        );
      }

      // Concatenar el mensaje de cambio de contraseña al principio de la cadena de enlaces
      const mensajeCambio =
        `*Cambio Correo - cuenta - ${filas[0].split("\t")[3]}*\n` +
        `${filas[0].split("\t")[4]}\n` +
        `*Fecha del cambio:* ${fechaActual}\n\n`;
      const enlacesConPerfilTexto =
        mensajeCambio + enlacesConPerfil.join("\n\n");

      // Copiar los enlaces al portapapeles
      return navigator.clipboard.writeText(enlacesConPerfilTexto);
    })
    .then(() => {
      console.log(
        "Los enlaces de WhatsApp con el mensaje de cambio de contraseña se han copiado correctamente al portapapeles."
      );
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function cambioContrau() {
  // Obtener el texto del portapapeles
  navigator.clipboard
    .readText()
    .then((text) => {
      // Dividir el texto del portapapeles en filas
      const contenido = text.trim().split("\t");

      console.log(contenido);

      if ((contenido.length !== 6) & (contenido.length % 6 !== 0)) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser 6 celdas)."
        );
        return;
      }

      // Iterar sobre cada fila y generar un enlace de WhatsApp para cada una

      const fila = contenido; // Dividir la fila en elementos separados por tabuladores

      console.log(fila);
      // Obtener los valores relevantes
      // const perfil = fila[2];
      const nombre = fila[0];
      const cuenta = fila[3];
      const correo = fila[4];
      const contraseña = fila[5];
      const telefono = fila[1].replace(/\s+/g, ""); // Eliminar espacios en blanco del número de teléfono
      const telefonoSinPlus = telefono.replace(/^\+/, ""); // Eliminar el símbolo "+" del número de teléfono si está presente
      plantillabool = 2;

      // Formatear el mensaje de cambio de contraseña con el perfil y el nombre en negrita
      const mensaje =
        `Hola, te informo que la contraseña de ${cuenta} cambió.\n\n` +
        `*${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n` +
        `*Correo:* ${correo}\n` +
        `*Contraseña:* ${contraseña}\n\n` +
        `*No necesariamente significa que se te cerro sesion, se envia para que siempre tengas la ultima contraseña*`;

      // Copiar los enlaces al portapapeles
      return navigator.clipboard.writeText(mensaje);
    })
    .then(() => {
      console.log(
        "Los enlaces de WhatsApp con el mensaje de cambio de contraseña se han copiado correctamente al portapapeles."
      );
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}

function cambioCorreou() {
  // Obtener el text del portapapeles
  navigator.clipboard
    .readText()
    .then((text) => {
      // Dividir el texto del portapapeles en filas
      const contenido = text.trim().split("\t");
      if ((contenido.length !== 6) & (contenido.length % 6 !== 0)) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser filas de 6 celdas)."
        );
        return;
      }

      // Iterar sobre cada fila y generar un enlace de WhatsApp para cada una

      const fila = contenido; // Dividir la fila en elementos separados por tabuladores

      // Obtener los valores relevantes
      // const perfil = fila[2];
      const nombre = fila[0];
      const cuenta = fila[3];
      const correo = fila[4];
      const contraseña = fila[5];
      const telefono = fila[1].replace(/\s+/g, ""); // Eliminar espacios en blanco del número de teléfono
      const telefonoSinPlus = telefono.replace(/^\+/, ""); // Eliminar el símbolo "+" del número de teléfono si está presente

      plantillabool = 2;
      // Formatear el mensaje de cambio de contraseña con el perfil y el nombre en negrita
      const mensaje =
        `Hola, previniendo un problema con ${cuenta} se hara un cambio de cuenta.\n\n` +
        `*${cuenta.toUpperCase()} ${nombre.toUpperCase()}*\n` +
        `*Correo:* ${correo}\n` +
        `*Contraseña:* ${contraseña}\n\n` +
        `*Si se te llega a cerrar sesión, ingresa de nuevo con esta cuenta porfa.*`;

      // Copiar los enlaces al portapapeles
      return navigator.clipboard.writeText(mensaje);
    })
    .then(() => {
      console.log(
        "Los enlaces de WhatsApp con el mensaje de cambio de contraseña se han copiado correctamente al portapapeles."
      );
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}
