// Funciones ya no necesarias
function cambioDisney() {
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
        (contenido.length !== 9) &
        ((contenido.length + (filas.length - 1)) % 9 !== 0)
      ) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser filas de 9 celdas)."
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
        const costo = parseInt(fila[6].replace("$", "").replace(",", ""), 10);
        const dias = Math.max(fila[8], 0);
        const telefono = fila[1].replace(/\s+/g, ""); // Eliminar espacios en blanco del número de teléfono
        const telefonoSinPlus = telefono.replace(/^\+/, ""); // Eliminar el símbolo "+" del número de teléfono si está presente
        let restante = Math.round(((11000 - costo) / 30 / 100) * dias) * 100;

        if (restante <= 0) {
          restante = 11000;
        }

        console.log(costo, dias);
        let saldo = Math.max(Math.round(costo / 30 / 100) * 100 * dias, 0);
        console.log(saldo);
        // Formatear el mensaje de cambio de contraseña con el perfil y el nombre en negrita
        const mensaje = `Hola,
  
  Debido a que el día 26 de junio Star se unirá a Disney, quedando en una sola app, se dejó de vender Disney y Star por separado.
  
  Tu cuenta de ${cuenta} - Perfil: ${nombre} se cerrará en los próximos días.
  Para ofrecerte una solución óptima, tenemos 4 alternativas:
  
  1. Si tu ya cuentas con disney y star pero en diferentes cuentas o fechas, simplemente se juntarían para quedar con una cuenta para ambas plataformas (En Combo plus).
  2. Devolución del dinero de los días restantes (${dias} días = $${saldo}) de tu cuenta de ${cuenta}.
  3. Tu completas el restante para comprar la cuenta en Combo Plus (Disney + Star). 
  Restante = ($${restante}). Este precio es el equivalente a ${dias} días de servicio.
  4. Cambiarte a otra cuenta de ${cuenta} que esté disponible (puede estar sujeta a varios cambios en el mes). Ten en cuenta que si te envío otra cuenta que esté disponible, en la próxima renovación ya sí se tendrá que cerrar.
  
  De no contestar este mensaje, se dejara a favor en *saldo*. Saldo: $${saldo}.
  
  Todo esto se hace para garantizar un óptimo servicio y poder renovar sin problemas el proximo mes. `;
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
        `*Cambio Disney/Star - ${filas[0].split("\t")[3]}*\n` +
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

function cambioDisney2() {
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
        (contenido.length !== 9) &
        ((contenido.length + (filas.length - 1)) % 9 !== 0)
      ) {
        alert(
          "El contenido copiado no está en el formato esperado (deben ser filas de 9 celdas)."
        );
        return;
      }

      // Iterar sobre cada fila y generar un enlace de WhatsApp para cada una
      for (let i = 0; i < filas.length; i++) {
        const fila = filas[i].split("\t"); // Dividir la fila en elementos separados por tabuladores

        // Obtener los valores relevantes
        // const perfil = fila[2];
        const nombre = fila[0];
        const cuenta = fila[3];
        const correo = fila[4];
        const contraseña = fila[5];
        const costo = parseInt(fila[6].replace("$", "").replace(",", ""), 10);
        const dias = Math.max(fila[8], 0);
        const telefono = fila[1].replace(/\s+/g, ""); // Eliminar espacios en blanco del número de teléfono
        const telefonoSinPlus = telefono.replace(/^\+/, ""); // Eliminar el símbolo "+" del número de teléfono si está presente
        let restante = Math.round(((11000 - costo) / 30 / 100) * dias) * 100;

        if (restante <= 0) {
          restante = 11000;
        }

        console.log(costo, dias);
        let saldo = Math.max(Math.round(costo / 30 / 100) * 100 * dias, 0);
        console.log(saldo);
        // Formatear el mensaje de cambio de contraseña con el perfil y el nombre en negrita
        const mensaje = `Hola,
  
  Debido a que el día 26 de junio Star se unirá a Disney, quedando en una sola app, se dejó de vender Disney y Star por separado.
  
  Tu cuenta de ${cuenta} - Perfil: ${nombre} se cerrará en los próximos días.
  Para ofrecerte una solución óptima, tenemos 4 alternativas:
  
  1. Si tu ya cuentas con disney y star pero en diferentes cuentas o fechas, simplemente se juntarían para quedar con una cuenta para ambas plataformas (En Combo plus).
  2. Devolución del dinero de los días restantes (${dias} días = $${saldo}) de tu cuenta de ${cuenta}.
  3. Tu completas el restante para comprar la cuenta en Combo Plus (Disney + Star). 
  Restante = ($${restante}). Este precio es el equivalente a ${dias} días de servicio.
  4. Cambiarte a otra cuenta de ${cuenta} que esté disponible (puede estar sujeta a varios cambios en el mes). Ten en cuenta que si te envío otra cuenta que esté disponible, en la próxima renovación ya sí se tendrá que cerrar.
  
  De no contestar este mensaje, se dejara a favor en *saldo*. Saldo: $${saldo}.
  
  Todo esto se hace para garantizar un óptimo servicio y poder renovar sin problemas el proximo mes. `;
        // Copiar los enlaces al portapapeles
        return navigator.clipboard.writeText(mensaje);
      }
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
