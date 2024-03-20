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
                if (contenido.length === 2){
                    contenido.unshift("NETFLIX")
                }
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

function generarPlantilla() {
    navigator.clipboard.readText()
        .then(text => {
            const contenido = text.trim().split('\t');
            if (contenido.length == 2) {
                contenido.unshift("NETFLIX");
            }
            else if (contenido.length !== 3) {
                alert("El contenido copiado no está en el formato esperado (deben ser tres columnas separadas por tabuladores).");
                return;
            }
            
            const fecha = new Date().toLocaleDateString();
            const partesFecha = fecha.split('/');
            const fechaReorganizada = `${partesFecha[1]}/${partesFecha[0]}/${partesFecha[2]}`;
            const [cuenta, correo, contrasena] = contenido;
            const perfil = document.getElementById('perfil').value.trim();
            const plantilla = `*${cuenta}*\n*Correo:* ${correo}\n*Contrasena:* ${contrasena}\n\n*Perfil:* ${perfil}\n*Fecha:* ${fecha}`;

            navigator.clipboard.writeText(plantilla)
                .then(() => {
                    // alert("La plantilla ha sido generada y copiada al portapapeles.");
                    document.getElementById('perfil').value = ""; }
                    )
                .catch(err => console.error('Error al copiar al portapapeles:', err));
        })
        .catch(err => console.error('Error al leer el portapapeles:', err));
}
