function generarPlantilla() {
    return new Promise((resolve, reject) => {
        navigator.clipboard.readText()
            .then(text => {
                const contenido = text.trim().split('\t');
                if (contenido.length == 2) {
                    contenido.unshift("NETFLIX");
                } else if (contenido.length !== 3) {
                    reject("El contenido copiado no está en el formato esperado (deben ser tres columnas separadas por tabuladores).");
                    return;
                }
                
                const fecha = obtenerFechaFormateada();
                const partesFecha = fecha.split('/');
                const fechaReorganizada = `${partesFecha[1]}/${partesFecha[0]}/${partesFecha[2]}`;
                const [cuenta, correo, contrasena] = contenido;
                const perfil = document.getElementById('perfil').value.trim();
                const plantilla = `*${cuenta}*\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fecha}`;

                resolve(contenido); // Devolvemos el contenido generado
            })
            .catch(err => {
                reject('Error al leer el portapapeles:', err);
            });
    });
}

function copiarExcel(contenido) {
    const [cuenta, correo] = contenido;
    const texto = `${cuenta}\t${correo}\n`;
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado al portapapeles: " + texto);
        })
        .catch(err => {
            alert("Error al copiar al portapapeles: " + err);
        });
}

function copiarCuenta(contenido) {
    const [, correo, contrasena] = contenido;
    const texto = `${correo}\t${contrasena}\n`;
    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado al portapapeles: " + texto);
        })
        .catch(err => {
            alert("Error al copiar al portapapeles: " + err);
        });
}

async function procesarPlantilla() {
    try {
        const contenido = await generarPlantilla();
        console.log(contenido); // Aquí puedes hacer lo que necesites con el contenido, como copiarlo al portapapeles o mostrarlo en la página
        copiarExcel(contenido);
        copiarCuenta(contenido);
    } catch (error) {
        alert(error); // Maneja cualquier error que ocurra durante la generación de la plantilla
    }
}